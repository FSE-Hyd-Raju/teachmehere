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

  _showDialog = () => this.setState({ visible: true });
  _hideDialog = () => this.setState({ visible: false });

  render() {
    const { currentStep, totalSteps, visible } = this.state;
    ('');
    const options = [
      { value: 0, label: 'Skill Level' },
      { value: 1, label: 'Beginer' },
      { value: 2, label: 'Inermediate' },
      { value: 3, label: 'Advanced' },
    ];
    return (
      <View style={{ alignItems: 'center' }}>
        <View>
          <Text style={styles.currentStepText}>Skill details</Text>
        </View>
        <TextInput
          label="Skill Name"
          mode="outlined"
          style={styles.input}
          value={this.state.text}
          onChangeText={text => this.setState({ text })}
        />
        <SelectInput
          label="Skill Level"
          placeholderTextColor="lightgray"
          style={styles.selectInput}
          value={this.state.skillLevel}
          onChangeText={text => this.setState({ skillLevel: text })}
          options={options}
        />
        <TextInput
          label="Description"
          style={styles.input}
          mode="outlined"
          onChangeText={text => this.setState({ text })}
          value={this.state.text}
          multiline={true}
          numberOfLines={8}
          scrollEnabled={true}
          placeholder={'Course Description'}
        />
        <TextInput
          label="Price"
          mode="outlined"
          style={styles.input}
          onChangeText={text => this.setState({ text })}
          value={this.state.text}
          placeholder={'Price'}
        />
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            marginTop: 15,
            flexWrap: 'wrap',
            alignItems: 'flex-start',
          }}>
          <CheckBox
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            title="checkbox 1"
            checkedColor="red"
            checked={true}
          />
          <Text style={{ marginTop: 5, marginRight: 5 }}>
            Can teach to Group 
          </Text>
        </View>
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
