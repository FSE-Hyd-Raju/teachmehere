import React, { Component } from 'react';
import {
  Image,
  View,
  TouchableOpacity,
  TextInput,
  Text,
  Picker,
} from 'react-native';

import styles from './styles';
import SelectInput from 'react-native-select-input-ios';

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
      { value: 0, label: 'Selwe sdfsd dsd' },
      { value: 1, label: '1' },
    ];
    return (
      <View style={[styles.container, styles.step1]}>
        <View>
          <Text style={styles.currentStepText}>Skill details</Text>
        </View>
        <TextInput
          style={styles.input}
          onChangeText={text => this.setState({ text })}
          value={this.state.text}
          placeholder={'Skill Name'}
          placeholderTextColor="#444"
        />
        <SelectInput style={styles.input} value={0} options={options} />
        <TextInput
          style={styles.input}
          onChangeText={text => this.setState({ text })}
          value={this.state.text}
          placeholder={'Sub Category'}
          placeholderTextColor="#444"
        />
        <TextInput
          style={styles.input}
          onChangeText={text => this.setState({ text })}
          value={this.state.text}
          placeholder={'Skill Level'}
          placeholderTextColor="#444"
        />
        <View style={styles.btnContainer}>
          <TouchableOpacity onPress={this.nextStep} style={styles.btnStyle}>
            <Image
              source={require('../../../../assets/img/arrow.png')}
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
