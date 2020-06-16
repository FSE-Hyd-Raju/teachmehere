import React, { Component } from 'react';
import {
  Image,
  View,
  TouchableOpacity,
  TextInput,
  Text,
  CheckBox,
} from 'react-native';
import SelectInput from 'react-native-select-input-ios';

import styles from './styles';

export class step2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalSteps: '',
      currentStep: '',
      checkboxes: [
        {
          id: 1,
          title: 'Telugu',
          checked: false,
        },
        {
          id: 2,
          title: 'Hindi',
          checked: false,
        },
        {
          id: 3,
          title: 'English',
          checked: false,
        },
      ],
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
    saveState({ email: 'sam@test.com' });
    next();
  };

  render() {
    const { currentStep, totalSteps } = this.state;
    return (
      <View style={[styles.container, styles.step1]}>
        <View>
          <Text style={styles.currentStepText}>Content Description</Text>
        </View>
        <TextInput
          style={styles.input}
          onChangeText={text => this.setState({ text })}
          value={this.state.text}
          placeholder={'Content'}
          placeholderTextColor="#444"
          numberOfLines={10}
          multiline={true}
        />
        <View style={{ marginTop: '5%' }}>
          <Text>Languages :</Text>
          {this.state.checkboxes.map(cb => {
            return (
              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  alignItems: 'flex-start',
                }}>
                <CheckBox
                  value={cb.checked}
                  // onValueChange={() =>
                  //   this.setState({ checked: !this.state.checked })
                  // }
                />
                <Text style={{ marginTop: 5 }}>{cb.title}</Text>
              </View>
            );
          })}
        </View>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'flex-start',
            marginTop: '5%',
          }}>
          <CheckBox
            value={true}
            // onValueChange={() =>
            //   this.setState({ checked: !this.state.checked })
            // }
          />
          <Text style={{ marginTop: 5 }}>
            {' '}
            I am available for a quick Demo my course
          </Text>
        </View>
        <View style={[styles.btnContainer, styles.marginAround]}>
          <TouchableOpacity onPress={this.props.back} style={styles.btnStyle}>
            <Image
              source={require('../../../../assets/img/right-black-arrow-md.png')}
              style={[styles.btnImage, styles.backBtn]}
              resizeMode="cover"
            />
          </TouchableOpacity>
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

export default step2;
