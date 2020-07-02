import React, { Component } from 'react';
import { Image, View, TouchableOpacity, Text, CheckBox } from 'react-native';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TextInput, RadioButton, Paragraph, Button } from 'react-native-paper';
import moment from 'moment';

import styles from './styles';

export class step3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalSteps: '',
      currentStep: '',
      showDatePicker: false,
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
    const { next } = this.props;
    next();
  };

  setValue = value => {
    this.setState({ value: value });
  };

  setDateTimeValue = (event, selectedDate) => {
    console.log('TIMNE', event, selectedDate);
    const { dateTimeType } = this.state;
    const { saveState } = this.props;
    if (event.type === 'set') {
      switch (dateTimeType) {
        case 'startDate':
          saveState({
            startDate: moment(selectedDate).format('L'),
          });
          break;
        case 'endDate':
          saveState({
            endDate: moment(selectedDate).format('L'),
          });
          break;
        case 'startTime':
          saveState({
            startTime: moment(event.nativeEvent.timeStamp).format('LT'),
          });
          break;
        case 'endTime':
          saveState({
            endTime: moment(event.nativeEvent.timeStamp).format('LT'),
          });
          break;
        default:
          this.setState({ showDatePicker: false });
      }
    }
    this.setState({ showDatePicker: false });
  };

  getDateTime = () => {
    const { dateTimeType } = this.state;
    const { getState } = this.props;
    switch (dateTimeType) {
      case 'startDate':
        return getState().startDate;
      case 'endDate':
        return getState().endDate;
      case 'startTime':
        return getState().startTime;
      case 'endTime':
        return getState().endTime;
    }
    this.setState({ showDatePicker: false });
  };

  render() {
    const { showDatePicker, value, dateTimeType } = this.state;
    const { getState } = this.props;
    const daysOfTheWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const { startDate, endDate, startTime, endTime } = getState();
    return (
      <View>
        <TouchableOpacity
          onPress={this.nextStep}
          style={{
            flexDirection: 'row',
            position: 'absolute',
            marginLeft: 360,
          }}>
          <Text style={{ fontSize: 17, fontWeight: 'bold' }}>Skip</Text>
          <IconFontAwesome
            style={{ marginTop: 7, marginLeft: 5 }}
            name="forward"
          />
        </TouchableOpacity>
        <View style={{ alignItems: 'center' }}>
          <View>
            <Text style={styles.currentStepText}>Plan Your Time</Text>
          </View>
          <View style={{ flexDirection: 'row', marginTop: 20 }}>
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
                  this.setState({
                    showDatePicker: true,
                    dateTimeType: 'endDate',
                  })
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
                      <Text style={{ marginTop: 5 }}>
                        {day}
                      </Text>
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
                  this.setState({
                    showDatePicker: true,
                    dateTimeType: 'endTime',
                  })
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
              availability. Unless your not strict about the timings, Please
              check the below check box to show it as tentative.
            </Paragraph>
            <Text style={{ marginTop: 10, fontSize: 12.5, color: '#d04437' }}>
              Skipping this page is considered as tentative schedule.
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
              value={this.getDateTime}
              is24Hour={true}
              mode={
                dateTimeType === 'startDate' || dateTimeType === 'endDate'
                  ? 'date'
                  : 'time'
              }
              display={
                dateTimeType === 'startDate' || dateTimeType === 'endDate'
                  ? 'calendar'
                  : 'clock'
              }
              onChange={(event, selectedDate) => {
                this.setState({ showDatePicker: false });
                this.setDateTimeValue(event, selectedDate);
              }}
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
      </View>
    );
  }
}

export default step3;
