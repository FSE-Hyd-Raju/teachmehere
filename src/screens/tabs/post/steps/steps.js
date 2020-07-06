import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AnimatedMultistep from '../stepper';
import { Dispatch, AnyAction } from 'redux';
import { connect } from 'react-redux';
import { postSkill } from '../../../../redux/actions/SkillActions';

import Step1 from './step1';
import Step2 from './step2';
import Step3 from './step3';
import Step4 from './step4';
import { ScrollView } from 'react-native-gesture-handler';

const allSteps = [
  { name: 'step 1', component: Step1 },
  { name: 'step 2', component: Step2 },
  { name: 'step 3', component: Step3 },
  { name: 'step 4', component: Step4 },
];

class Steps extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  onNext = () => {
    console.log('Next');
  };
  onBack = () => {
    console.log('Back');
  };

  finish = state => {
    const { category, subCategory } = this.props || {};
    const {
      skillName,
      skillLevel,
      content,
      totalHours,
      experience,
      languages,
      platform,
      tags,
      meetingUrl,
      linkedInProfile,
      individualPrice,
    } = state;
    const postData = {
      coursename: skillName,
      courselevel: skillLevel,
      category: category,
      subcategory: subCategory,
      content: content,
      totalhours: totalHours,
      price: individualPrice,
      experience: experience,
      demo: true,
      speakinglanguages: languages,
      platform: platform,
      meetingUrl: meetingUrl,
      tags: tags,
      linkedinprofile: linkedInProfile,
      availability: {},
    };
    this.props.actions.postSkill(postData);
  };

  render() {
    return (
      <View style={{ flex: 30 }}>
        <ScrollView>
          <AnimatedMultistep
            steps={allSteps}
            onFinish={this.finish}
            animate={true}
            onBack={this.onBack}
            onNext={this.onNext}
            // comeInOnNext="bounceInRight"
            // OutOnNext="bounceOutLeft"
            // comeInOnBack="bounceInLeft"
            // OutOnBack="bounceOutRight"
          />
        </ScrollView>
      </View>
    );
  }
}
const mapStateToProps = state => ({
  //isBasketCleared: state.basket.isBasketCleared,
});

const mapDispatchToProps = dispatch => ({
  actions: {
    postSkill: skill => {
      dispatch(postSkill(skill));
    },
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Steps);
