import React, { Component } from 'react';
import { Image, View, TouchableOpacity, Text } from 'react-native';

import styles from './styles';
import { TextInput } from 'react-native-paper';

export class step4 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalSteps: '',
      currentStep: '',
      selectedStartDate: new Date(),
      selectedEndDate: '',
    };
    this.onDateChange = this.onDateChange.bind(this);
  }

  onDateChange(date, type) {
    if (type === 'END_DATE') {
      this.setState({
        selectedEndDate: date,
      });
    } else {
      this.setState({
        selectedStartDate: date,
        selectedEndDate: null,
      });
    }
  }

  static getDerivedStateFromProps = props => {
    const { getTotalSteps, getCurrentStep } = props;
    return {
      totalSteps: getTotalSteps(),
      currentStep: getCurrentStep(),
    };
  };

  postSkill = () => {
    const { next } = this.props;
    next();
  };

  render() {
    const { getState, saveState } = this.props;
    const {
      platform,
      meetingUrl,
      tags,
      experience,
      linkedInProfile,
    } = getState();
    return (
      <View style={{ alignItems: 'center' }}>
        <View>
          <Text style={styles.currentStepText}>Where can we connect ?</Text>
        </View>
        <TextInput
          label="Platform"
          mode="outlined"
          placeholder="Place to connect. Ex: Skype, Zoom, etc."
          style={styles.input}
          value={platform}
          onChangeText={text => saveState({ platform: text })}
        />
        <TextInput
          label="Meeting URL"
          mode="outlined"
          placeholder="Meeting URL"
          style={styles.input}
          value={meetingUrl}
          onChangeText={text => saveState({ meetingUrl: text })}
        />
        <TextInput
          label="tags"
          placeholder="add tags for search. Ex: angular, react etc"
          mode="outlined"
          style={styles.input}
          value={tags}
          onChangeText={text => saveState({ tags: text })}
        />
        <TextInput
          label="Experience"
          placeholder="2 years, 2.5 years etc."
          mode="outlined"
          style={styles.input}
          value={experience}
          onChangeText={text => saveState({ experience: text })}
        />
        <TextInput
          label="LinkedIn Profile"
          mode="outlined"
          style={styles.input}
          value={linkedInProfile}
          onChangeText={text => saveState({ linkedInProfile: text })}
        />
        <View style={[styles.btnContainer]}>
          <TouchableOpacity onPress={this.props.back} style={styles.btnStyle}>
            <Image
              source={require('../../../../assets/img/right-black-arrow-md.png')}
              style={[styles.btnImage, styles.backBtn]}
              resizeMode="cover"
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              borderWidth: 1,
              borderColor: 'rgba(0,0,0,0.8)',
              alignItems: 'flex-end',
              justifyContent: 'flex-end',
              backgroundColor: '#444',
              borderRadius: 50,
              marginLeft: 45,
              alignSelf: 'flex-end',
            }}
            onPress={this.postSkill}>
            <Text style={{ padding: 18, color: 'white' }}>Post My Skill</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default step4;
