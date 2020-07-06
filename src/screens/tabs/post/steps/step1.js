import React, { Component } from 'react';
import {
  Image,
  View,
  TouchableOpacity,
  Text,
  CheckBox,
  Keyboard,
} from 'react-native';

import styles from './styles';
import {
  TextInput,
  Dialog,
  Portal,
  Button,
  List,
  Provider,
  TextInputMask,
} from 'react-native-paper';

class step1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalSteps: '',
      currentStep: '',
      showSelectSkillLevelDailog: false,
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

  skillLevelDialogHide = () => {
    this.setState({ showSelectSkillLevelDailog: false });
  };

  selectSkillLevel(value) {
    const { saveState } = this.props;
    this.skillLevelDialogHide();
    saveState({ skillLevel: value });
  }

  render() {
    const { saveState, getState } = this.props;
    const options = [
      { value: 'basic', label: 'Basic' },
      { value: 'intermediate', label: 'Inermediate' },
      { value: 'advanced', label: 'Advanced' },
    ];

    const { skillName, skillLevel, contents } = getState();

    return (
      <View style={{ alignItems: 'center' }}>
        <View>
          <Text style={styles.currentStepText}>Skill Details</Text>
        </View>
        <TextInput
          label="Skill Name"
          placeholder="Title for the skill you are offering"
          mode="outlined"
          inlineImageLeft="search_icon"
          style={styles.input}
          value={skillName}
          selectTextOnFocus={true}
          onChangeText={text => saveState({ skillName: text })}
        />
        <TextInput
          label="Skill Level"
          placeholder="Level of skill"
          mode="outlined"
          style={styles.input}
          value={skillLevel}
          onFocus={() => {
            Keyboard.dismiss();
            this.setState({ showSelectSkillLevelDailog: true });
          }}
        />
        <Portal>
          <Dialog
            visible={this.state.showSelectSkillLevelDailog}
            onDismiss={this.skillLevelDialogHide}>
            <Dialog.Title>Select Skill Level</Dialog.Title>
            <Dialog.Content>
              {options.map(data => {
                return (
                  <List.Item
                    key={data.key}
                    title={data.label}
                    onPress={this.selectSkillLevel.bind(this, data.label)}
                  />
                );
              })}
            </Dialog.Content>
          </Dialog>
        </Portal>
        <TextInput
          label="Contents"
          style={styles.description}
          mode="outlined"
          onChangeText={text => saveState({ contents: text })}
          value={contents}
          multiline={true}
          numberOfLines={10}
          scrollEnabled={true}
          placeholder={
            'contents to cover \n  example: \n 1. Agenda \n 2. Introduction\n 3. etc. '
          }
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
