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
      country,
      individualPrice,
      groupPrice,
      noOfPeople,
      languages,
      startDate,
      endDate,
      startTime,
      endTime,
      onDays,
      daysOfTheWeek,
      tentativeScedule,
      platform,
      tags,
      experience,
      linkedInProfile,
      availableForDemo,
    } = state;

    const postData = {
      uid: '12122',
      coursename: skillName,
      courselevel: skillLevel,
      content: content || '',
      category: category,
      subcategory: subCategory,
      totalhours: totalHours,
      country: country && country.name,
      currency: country && country.currency && country.currency.symbol,
      price: {
        oneonone: individualPrice,
        group: {
          members: noOfPeople || '',
          price: groupPrice || '',
        },
      },
      speakinglanguages: languages,
      availability: {
        coursestartdate: startDate || '',
        courseenddate: endDate || '',
        ondays: {
          availableon: onDays || '',
          daysofweek: daysOfTheWeek || [],
        },
        coursestarttime: startTime || '',
        coursesendtime: endTime || '',
        tentativeschedule: tentativeScedule,
      },
      platform: platform,
      tags: tags.split(','),
      experience: experience,
      linkedinprofile: linkedInProfile,
      demo: availableForDemo,
    };

    console.log('POST FORMED', postData);
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
