import React, { Component } from 'react';
import { Image, View, TouchableOpacity, Text, CheckBox } from 'react-native';

import styles from './styles';
import { TextInput } from 'react-native-paper';
import SelectInput from 'react-native-select-input-ios';

class step2 extends Component {
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

  render() {
    const { saveState } = this.state;
    ('');
    const options = [
      { value: 0, label: '\u20B9' },
      { value: 1, label: '\u0024' },
      { value: 2, label: '\u20AC' },
      { value: 3, label: '\u00A5' },
      { value: 4, label: '\u00A3' },
    ];
    return (
      <View style={{ alignItems: 'center' }}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.currentStepText}>Price</Text>
          <SelectInput
            label="Currency"
            placeholderTextColor="lightgray"
            style={styles.selectInputPrice}
            value={this.state.skillLevel}
            options={options}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 20,
            marginLeft: -250,
          }}>
          <CheckBox
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            title="checkbox 1"
            checkedColor="red"
            checked="true"
          />
          <Text style={{ marginTop: 5, marginRight: 5 }}>One on One</Text>
        </View>
        <View style={{ flexDirection: 'row', width: '80%' }}>
          <TextInput
            label="Price"
            mode="outlined"
            style={styles.price}
            value={this.state.IndividualPrice}
            onChangeText={price => saveState({ IndividualPrice: price })}
          />
          <Text style={{ marginTop: 20, fontSize: 15 }}> / per head.</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 20,
            marginLeft: -280,
            alignItems: 'flex-start',
          }}>
          <CheckBox
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            title="checkbox 1"
            checkedColor="red"
            checked={true}
          />
          <Text style={{ marginTop: 5, marginRight: 5 }}>Group</Text>
        </View>
        <View style={{ flexDirection: 'row', width: '80%' }}>
          <TextInput
            label="Price"
            mode="outlined"
            style={styles.price}
            value={this.state.groupPrice}
            onChangeText={price => saveState({ groupPrice: price })}
          />
          <Text style={{ marginTop: 20, fontSize: 15 }}> / per head.</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 20,
            marginLeft: -220,
          }}>
          <Text style={{ marginTop: 5, marginRight: 5 }}>
            Speaking Languages
          </Text>
        </View>
        {['English', 'Hindhi', 'Telugu', 'Other'].map(lan => {
          return (
            <View style={{ flexDirection: 'row', marginLeft: -250 }}>
              <CheckBox
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
                title="checkbox 1"
                checkedColor="red"
                checked={true}
              />
              <Text style={{ marginTop: 5, marginRight: 5 }}>{lan}</Text>
            </View>
          );
        })}
        <TextInput
          label="Language"
          mode="outlined"
          style={styles.price}
          value={this.state.text}
          onChangeText={text => this.setState({ text })}
        />
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
