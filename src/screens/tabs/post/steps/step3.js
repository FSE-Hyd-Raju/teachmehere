import React, { Component } from 'react';
import {
  Image,
  View,
  TouchableOpacity,
  TextInput,
  Text,
  Button,
  CheckBox,
  ListView,
} from 'react-native';
import InputRange from 'react-input-range';

import styles from './styles';
import * as moment from 'moment';
import CalendarPicker from 'react-native-calendar-picker';
import {
  FormLabel,
  FormInput,
  FormValidationMessage,
} from 'react-native-elements';

export class step3 extends Component {
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

  render() {
    const { selectedStartDate, selectedEndDate } = this.state;
    const minDate = new Date(); // Today
    const maxDate = new Date(2021, 1, 1);
    const startDate = selectedStartDate ? selectedStartDate.toString() : '';
    const endDate = selectedEndDate ? selectedEndDate.toString() : '';
    const daysOfTheWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return (
      <View style={[styles.container, styles.step1]}>
        <View>
          <Text style={styles.currentStepText}>Place and Time</Text>
        </View>
        <View style={styles.datePicker}>
          <CalendarPicker
            startFromMonday={true}
            allowRangeSelection={true}
            minDate={minDate}
            maxDate={maxDate}
            startDate={startDate}
            endDate={endDate}
            todayBackgroundColor="#f2e6ff"
            selectedDayColor="#7300e6"
            selectedDayTextColor="#FFFFFF"
            allowBackwardRangeSelect={true}
            onDateChange={this.onDateChange}
          />
        </View>
        <View style={{ flex: 1, flexDirection: 'row', marginTop: 20 }}>
          {daysOfTheWeek &&
            daysOfTheWeek.map(day => {
              return (
                <>
                  <Text style={{ marginTop: 5, marginRight: 5 }}>{day}</Text>
                  <CheckBox
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-o"
                    title="checkbox 1"
                    checkedColor="red"
                    checked={true}
                  />
                </>
              );
            })}
        </View>
        <TextInput
          style={styles.input}
          onChangeText={text => this.setState({ text })}
          value={this.state.text}
          placeholder={'Where ?'}
          placeholderTextColor="#444"
        />
        <TextInput
          style={styles.input}
          onChangeText={text => this.setState({ text })}
          value={this.state.text}
          placeholder={'Tags'}
          placeholderTextColor="#444"
        />
        <TextInput
          style={styles.input}
          onChangeText={text => this.setState({ text })}
          value={this.state.text}
          placeholder={'LinkedIn Profile'}
          placeholderTextColor="#444"
        />
        <View style={[styles.btnContainer, styles.marginAround]}>
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
              borderColor: 'rgba(0,0,0,0.2)',
              alignItems: 'flex-end',
              justifyContent: 'flex-end',
              backgroundColor: '#444',
              borderRadius: 50,
            }}>
            <Text style={{ padding: 18, color: 'white' }}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default step3;
