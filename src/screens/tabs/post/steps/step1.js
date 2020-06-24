import React, { Component } from 'react';
import { Image, View, TouchableOpacity, Text, Picker } from 'react-native';

import styles from './styles';
import {
  TextInput,
  Modal,
  List,
  Provider,
  Portal,
  Dialog,
  Paragraph,
  Button,
} from 'react-native-paper';

class step1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalSteps: '',
      currentStep: '',
      visible: false,
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
    const options = [
      { value: 0, label: 'Beginer' },
      { value: 1, label: 'Inermediate' },
      { value: 2, label: 'Advanced' },
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
        <TextInput
          label="Skill Level"
          mode="outlined"
          style={styles.input}
          value={this.state.text}
          onFocus={this._showDialog}
        />
        <Dialog
          visible={this.state.visible}
          onDismiss={this._hideDialog}
          style={{ position: 'relative' }}>
          <Dialog.Title>Alert</Dialog.Title>
          <Dialog.Content>
            <Paragraph>This is simple dialog</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={this._hideDialog}>Done</Button>
          </Dialog.Actions>
        </Dialog>
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
