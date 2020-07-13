import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AnimatedMultistep from '../stepper';

import Step1 from './step1';
import Step2 from './step2';
import Step3 from './step3';
import Step4 from './step4';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';

import {
  fetchPost,
  postSelector,
  postNewSkill,
} from '../../../../redux/slices/post';

const allSteps = [
  { name: 'step 1', component: Step1 },
  { name: 'step 2', component: Step2 },
  { name: 'step 3', component: Step3 },
  { name: 'step 4', component: Step4 },
];

const Steps = props => {
  const dispatch = useDispatch();
  const { postResponse, isPostQueryActive, hasErrors } = useSelector(
    postSelector,
  );
  const onNext = () => {
    console.log('Next');
  };
  const onBack = () => {
    console.log('Back');
  };

  const finish = state => {
    const { category, subCategory } = props || {};
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
      isTentativeSchedule,
      platform,
      tags,
      experience,
      profilesummary,
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
      totalhours: parseInt(totalHours),
      country: country && country.name,
      currency: country && country.currency && country.currency.symbol,
      price: {
        oneonone: parseInt(individualPrice),
        group: {
          members: parseInt(noOfPeople) || 0,
          price: parseInt(groupPrice) || 0,
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
        tentativeschedule: isTentativeSchedule,
      },
      platform: platform,
      tags: tags && tags.split(','),
      experience: parseInt(experience),
      profilesummary: profilesummary,
      linkedinprofile: linkedInProfile,
      demo: availableForDemo,
    };
    dispatch(postNewSkill(postData));
    if (postResponse === 'successfull') {
      alert("Post Succussfull")
    }
  };

  return (
    <ScrollView>
      <AnimatedMultistep
        steps={allSteps}
        onFinish={finish}
        animate={true}
        onBack={onBack}
        onNext={onNext}
        backFromSteps={props.backFromSteps}
      />
    </ScrollView>
  );
};

export default Steps;
