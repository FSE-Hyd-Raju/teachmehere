import React, { Component } from 'react';
import {
  Image,
  View,
  TouchableOpacity,
  Text,
  CheckBox,
  Button,
} from 'react-native';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SelectInput from 'react-native-select-input-ios';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TextInput, RadioButton, Paragraph, Icon } from 'react-native-paper';
import moment from 'moment';

import styles from './styles';

export class step2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalSteps: '',
      currentStep: '',
      showDatePicker: false,
      startDate: '',
      endDate: '',
      startTime: '',
      endTime: '',
      dateTimeType: '',
      value: 'Daily',
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

  setValue = value => {
    this.setState({ value: value });
  };

  setDateTimeValue = value => {
    const { dateTimeType } = this.state;
    switch (dateTimeType) {
      case 'startDate':
        this.setState({
          startDate: moment(value).format('L'),
          showDatePicker: false,
        });
        break;
      case 'endDate':
        this.setState({
          endDate: moment(value).format('L'),
          showDatePicker: false,
        });
        break;
      case 'startTime':
        this.setState({
          startTime: moment(value).format('L'),
          showDatePicker: false,
        });
        break;
      case 'endTime':
        this.setState({
          endTime: moment(value).format('L'),
          showDatePicker: false,
        });
        break;
    }
  };

  render() {
    const {
      showDatePicker,
      startDate,
      endDate,
      startTime,
      endTime,
      value,
      dateTimeType,
    } = this.state;
    const daysOfTheWeek = [
      'Sun',
      'Mon',
      'Tue',
      'Wed',
      'Thu  ',
      'Fri  ',
      'Sat ',
    ];
    return (
      <View style={{ alignItems: 'center' }}>
        <View>
          <Text style={styles.currentStepText}>My Schedule</Text>
        </View>
        <View style={{ flexDirection: 'row', marginTop: 10 }}>
          <>
            <TextInput
              label="From Date"
              mode="outlined"
              style={{ width: '40%', padding: 10, height: 40 }}
              value={startDate}
              onFocus={() =>
                this.setState({
                  showDatePicker: true,
                  dateTimeType: 'startDate',
                })
              }
            />
            <IconFontAwesome
              name="calendar"
              style={{ position: 'absolute', marginTop: 28, marginLeft: 130 }}
              size={18}
            />
          </>
          <>
            <TextInput
              label="To Date"
              mode="outlined"
              style={{ width: '40%', padding: 10, height: 40 }}
              value={endDate}
              onFocus={() =>
                this.setState({ showDatePicker: true, dateTimeType: 'endDate' })
              }
            />
            <IconFontAwesome
              name="calendar"
              style={{ position: 'absolute', marginTop: 28, marginLeft: 300 }}
              size={18}
            />
          </>
        </View>
        <View style={{ flexDirection: 'row', marginTop: 10 }}>
          <RadioButton.Group
            onValueChange={value => this.setValue(value)}
            value={value}>
            <>
              <RadioButton value="Daily" />
              <Text style={{ marginTop: 8, marginRight: 20 }}>Daily</Text>
            </>
            <>
              <RadioButton value="Weekends" />
              <Text style={{ marginTop: 8, marginRight: 20 }}>Weekends</Text>
            </>
            <>
              <RadioButton value="specificDays" />
              <Text style={{ marginTop: 8, marginRight: 20 }}>
                Specific Days
              </Text>
            </>
          </RadioButton.Group>
        </View>
        {value === 'specificDays' && (
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              marginTop: 10,
              alignItems: 'center',
              width: '80%',
              flexWrap: 'wrap',
            }}>
            {daysOfTheWeek &&
              daysOfTheWeek.map(day => {
                return (
                  <>
                    <CheckBox
                      checkedIcon="dot-circle-o"
                      uncheckedIcon="circle-o"
                      title="checkbox 1"
                      checkedColor="red"
                      checked={true}
                    />
                    <Text style={{ marginTop: 5, marginRight: 5 }}>{day}</Text>
                  </>
                );
              })}
          </View>
        )}
        <View style={{ flexDirection: 'row' }}>
          <>
            <TextInput
              label="Start Time"
              mode="outlined"
              style={{ width: '40%', padding: 10, height: 40 }}
              value={startTime}
              onFocus={() =>
                this.setState({
                  showDatePicker: true,
                  dateTimeType: 'startTime',
                })
              }
            />
            <Ionicons
              name="md-time"
              style={{ position: 'absolute', marginTop: 28, marginLeft: 130 }}
              size={18}
            />
          </>
          <>
            <TextInput
              label="End Time"
              mode="outlined"
              style={{ width: '40%', padding: 10, height: 40 }}
              value={endTime}
              onFocus={() =>
                this.setState({ showDatePicker: true, dateTimeType: 'endTime' })
              }
            />
            <Ionicons
              name="md-time"
              style={{ position: 'absolute', marginTop: 28, marginLeft: 300 }}
              size={18}
            />
          </>
        </View>
        <View style={{ alignItems: 'center', width: '80%', marginTop: 25 }}>
          <Paragraph style={{ fontSize: 12 }}>
            The schedule might change depending on you and your student
            availability. Unless your not strict about the timings, Please check
            the below check box to show it as tentative.
          </Paragraph>
          <Text style={{ marginTop: 10, fontSize: 12.5 }}>
            Also skipping this page is considered as tentative schedule.
          </Text>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              marginTop: 25,
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
              My schedule is tentative
            </Text>
          </View>
        </View>

        {showDatePicker && (
          <DateTimePicker
            value={new Date()}
            mode={
              dateTimeType === 'startDate' || dateTimeType === 'endDate'
                ? 'calendar'
                : 'clock'
            }
            display={
              dateTimeType === 'startDate' || dateTimeType === 'endDate'
                ? 'calendar'
                : 'clock'
            }
            onChange={date => this.setDateTimeValue(date)}
          />
        )}
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
