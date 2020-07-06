import React from 'react';
import SkillDeck from './SkillDeck';
import withRefetch from '../hoc/withRefetch';
import {
  fetchSkillToExplore,
  changeSkillWatchlistStatus,
  changeSkillFavoriteStatus
} from '../../api/services';
import { getCurrentUsersAccountId, getCurrentUsersSessionId } from '../../utils/store';
import {
  stGetExploredSkills,
  stGetCurrentSkills,
  stGetRequests,
  stSaveRequests,
  stSaveCurrentSkills,
  stSaveExploredSkills
} from '../../utils/storage';
import { skillKeyExtractor } from '../../utils/skills';

class ExploreSkillDeck extends React.PureComponent {
  state = {
    skills: []
  };

  componentDidMount = async () => {
    this.timerIds = [];
    this.isFillingExploreSkills = false;
    this.isResolvingRequests = false;

    let skillsToExplore = null;
    [skillsToExplore, this.exploredSkills, this.requests] = await Promise.all([
      stGetCurrentSkills(),
      stGetExploredSkills(),
      stGetRequests()
    ]);

    skillsToExplore = skillsToExplore || [];
    this.exploredSkills = this.exploredSkills || {};
    this.requests = this.requests || [];

    this.setState({ skills: skillsToExplore });
    this.runtimeLaunch(this.checkSkillsFullness);
    this.checkRequests();
  };

  componentWillUnmount() {
    this.timerIds.forEach(id => clearInterval(id));
  }

  onSwipedLeft = skill => {
    this.addToExplored(skill);
    this.skipTopSkill();
  };

  onSwipedTop = skill => {
    this.addRequest(skill, 'favorite');
    this.skipTopSkill();
  };

  onSwipedRight = skill => {
    this.addRequest(skill, 'watchlist');
    this.skipTopSkill();
  };

  skipTopSkill = () => {
    this.setState(
      prevState => ({ skills: prevState.skills.slice(1, prevState.skills.length) }),
      () => stSaveCurrentSkills(this.state.skills)
    );
  };

  addRequest = async (skill, type) => {
    this.requests.push({
      type,
      skill,
      accountId: getCurrentUsersAccountId(),
      sessionId: getCurrentUsersSessionId()
    });

    await stSaveRequests(this.requests);
    this.checkRequests();
  };

  addToExplored = async skill =>
    new Promise(async resolve => {
      this.exploredSkills[skillKeyExtractor(skill)] = true;
      await stSaveExploredSkills(this.exploredSkills);
      resolve();
    });

  isSkillSeen = skill => {
    const { skills } = this.state;
    const key = skillKeyExtractor(skill);
    const isInCurrentSkills = !!skills.find(cSkill => skillKeyExtractor(cSkill) === key);
    const isInRequests = !!this.requests.find(({ rqSkill }) => skillKeyExtractor(rqSkill) === key);
    const wasExplored = this.exploredSkills[key];
    return isInCurrentSkills || isInRequests || wasExplored;
  };

  checkRequests = () => {
    if (!this.isResolvingRequests && this.requests.length > 0) {
      this.isResolvingRequests = true;
      this.recursiveResolve(this.requests[0]);
    }
  };

  recursiveResolve = request => {
    const {
      refetch: { fetchUntilSuccess }
    } = this.props;

    fetchUntilSuccess(() => this.resolveRequest(request)).then(async () => {
      this.requests.splice(0, 1);
      await stSaveRequests(this.requests);
      await this.addToExplored(request.skill);

      if (this.requests.length > 0) {
        this.recursiveResolve(this.requests[0]);
      } else {
        this.isResolvingRequests = false;
      }
    });
  };

  resolveRequest = request => {
    const { type, skill, accountId, sessionId } = request;
    const rqFunction =
      type === 'watchlist' ? changeSkillWatchlistStatus : changeSkillFavoriteStatus;

    return rqFunction({ skill, watchlist: true, favorite: true, accountId, sessionId });
  };

  checkSkillsFullness = () => {
    this.state.skills.length < 10 && this.fillSkillsToExplore();
  };

  fillSkillsToExplore = async () => {
    if (this.isFillingExploreSkills) return;
    this.isFillingExploreSkills = true;

    const {
      refetch: { fetchUntilSuccess }
    } = this.props;

    const toAddSkills = await fetchUntilSuccess(() => fetchSkillToExplore(this.isSkillSeen));
    this.setState(
      prevState => ({ skills: [...prevState.skills, ...toAddSkills] }),
      () => stSaveCurrentSkills(this.state.skills)
    );
    this.isFillingExploreSkills = false;
  };

  runtimeLaunch(functionToExecute, intervalTime = 1000) {
    functionToExecute();
    this.timerIds.push(setInterval(() => functionToExecute(), intervalTime));
  }

  render() {
    const { skills } = this.state;

    return (
      <SkillDeck
        skills={skills}
        onSwipedTop={this.onSwipedTop}
        onSwipedLeft={this.onSwipedLeft}
        onSwipedRight={this.onSwipedRight}
      />
    );
  }
}

export default withRefetch(ExploreSkillDeck);
