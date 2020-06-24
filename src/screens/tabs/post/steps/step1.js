import React, { Component } from 'react';
import { Image, View, TouchableOpacity, Text, Picker } from 'react-native';

import styles from './styles';
import { TextInput } from 'react-native-paper';

class step1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalSteps: '',
      currentStep: '',
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
    const { next, saveState } = this.props;
    // Save state for use in other steps
    saveState({ name: 'samad' });

    // Go to next step
    next();
  };

  goBack() {
    const { back } = this.props;
    // Go to previous step
    back();
  }

  render() {
    const { currentStep, totalSteps } = this.state;
    const options = [
      { value: 0, label: 'Skill level' },
      { value: 1, label: 'Beginer' },
      { value: 2, label: 'Inermediate' },
      { value: 3, label: 'Advanced' },
    ];
    return (
      <View>
        <View>
          <Text style={styles.currentStepText}>Skill details</Text>
        </View>
        <TextInput
          label="Skill name"
          mode="outlined"
          style={styles.input}
          value={this.state.text}
          onChangeText={text => this.setState({ text })}
        />
        {/* <SelectInput
          placeholder="Skill Level"
          placeholderTextColor="#444"
          style={styles.input}
          value={0}
          options={options}
        /> */}
        <TextInput
          label="Course Duration"
          style={styles.input}
          mode="outlined"
          onChangeText={text => this.setState({ text })}
          value={this.state.text}
          placeholder={'Course Duration'}
        />
        <TextInput
          label="Price"
          mode="outlined"
          style={styles.input}
          onChangeText={text => this.setState({ text })}
          value={this.state.text}
          placeholder={'Price'}
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
