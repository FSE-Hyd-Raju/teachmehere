import React, { Component } from 'react';
import { Image, View, TouchableOpacity, Text, CheckBox } from 'react-native';

import styles from './styles';
import { TextInput } from 'react-native-paper';
import SelectInput from 'react-native-select-input-ios';

class step1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalSteps: '',
      currentStep: '',
      visible: false,
      skillLevel: '',
    };
  }

  static getDerivedStateFromProps = props => {
    const { getTotalSteps, getCurrentStep } = props;
    return {
      totalSteps: getTotalSteps(),
      currentStep: getCurrentStep(),
    };
  };

  nextStep = () => {
    const { next } = this.props;
    // Go to next step
    next();
  };

  goBack() {
    const { back } = this.props;
    // Go to previous step
    back();
  }


  render() {
    const { saveState } = this.props;
    const options = [
      { value: 0, label: 'Skill Level' },
      { value: 1, label: 'Beginer' },
      { value: 2, label: 'Inermediate' },
      { value: 3, label: 'Advanced' },
    ];
    return (
      <View style={{ alignItems: 'center' }}>
        <View>
          <Text style={styles.currentStepText}>Skill Details</Text>
        </View>
        <TextInput
          label="Skill Name"
          mode="outlined"
          style={styles.input}
          value={this.state.text}
          onChangeText={text => saveState({ skillName: text })}
        />
        <SelectInput
          label="Skill Level"
          placeholderTextColor="lightgray"
          style={styles.selectInput}
          value={this.state.skillLevel}
          onChangeText={text => saveState({ skillLevel: text })}
          options={options}
        />
        <TextInput
          label="Description"
          style={styles.description}
          mode="outlined"
          onChangeText={text => saveState({ description: text })}
          value={this.state.description}
          multiline={true}
          numberOfLines={10}
          scrollEnabled={true}
          placeholder="Course Description"
        />
        <View style={styles.btnContainer}>
          <TouchableOpacity onPress={this.nextStep} style={styles.btnStyle}>
            <Image
              source={require('../../../../assets/img/right-black-arrow-md.png')}
              style={styles.btnImage}
              resizeMode="cover"
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default step1;
