import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  TextInput,
  Text,
  Keyboard,
  Icon,
} from 'react-native';
import styles from './styles';
import { Formik } from 'formik';
import {
  Dialog,
  Portal,
  List,
  Button,
  Appbar,
  Chip,
  Switch,
} from 'react-native-paper';
import { postStep2ValidationSchema } from '../../../../utils/validations';
import {
  DefaultTheme,
  DarkTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
import { withTheme } from 'react-native-paper';
import TextInputWithIcon from '../../../../components/common/TextInputWithIcon';

const Step3 = props => {
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
  const { colors } = props.theme;

  return (
    <View>
      <Appbar.Header theme={DarkTheme}>
        <Appbar.BackAction onPress={props.back} />
        <Appbar.Content title="Plan Your Time" />
        <Text style={styles.skipButton} onPress={props.next}>
          Skip
        </Text>
        <Appbar.Action icon="skip-next" onPress={props.next} />
      </Appbar.Header>
      <View style={styles.container}>
        <Formik
          initialValues={{
            startDate: '',
            endDate: '',
            startTime: '',
            endTime: '',
          }}
          validationSchema={postStep2ValidationSchema}
          onSubmit={values => {
            props.next();
            props.saveState(values);
          }}>
          {formProps => (
            <View style={styles.container}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View style={{ width: '48%' }}>
                  <Text style={styles.label}>Start Date</Text>
                  <TextInputWithIcon
                    placeholder={'Start date'}
                    placeholderTextColor={'#7777'}
                    keyboardType={'numeric'}
                    onChangeText={formProps.handleChange('startDate')}
                    onBlur={formProps.handleBlur('startDate')}
                    value={formProps.values.startDate}
                    iconName={'date-range'}
                    iconColor={'#777'}
                  />
                  <Text style={styles.errorText}>
                    {formProps.touched.startDate && formProps.errors.startDate}
                  </Text>
                </View>
                <View style={{ width: '48%' }}>
                  <Text style={styles.label}>End Date</Text>
                  <TextInputWithIcon
                    placeholder={'End date'}
                    placeholderTextColor={'#7777'}
                    keyboardType={'numeric'}
                    onChangeText={formProps.handleChange('endDate')}
                    onBlur={formProps.handleBlur('endDate')}
                    value={formProps.values.endDate}
                    iconName={'date-range'}
                    iconColor={'#777'}
                  />
                  <Text style={styles.errorText}>
                    {formProps.touched.endDate && formProps.errors.endDate}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View style={{ width: '48%' }}>
                  <Text style={styles.label}>Start Time</Text>
                  <TextInputWithIcon
                    placeholder={'Start Time'}
                    placeholderTextColor={'#7777'}
                    keyboardType={'numeric'}
                    onChangeText={formProps.handleChange('startTime')}
                    onBlur={formProps.handleBlur('startTime')}
                    value={formProps.values.startTime}
                    iconName={'timer'}
                    iconColor={'#777'}
                  />
                  <Text style={styles.errorText}>
                    {formProps.touched.startTime && formProps.errors.startTime}
                  </Text>
                </View>
                <View style={{ width: '48%' }}>
                  <Text style={styles.label}>End Time</Text>
                  <TextInputWithIcon
                    placeholder={'End Time'}
                    placeholderTextColor={'#7777'}
                    keyboardType={'numeric'}
                    onChangeText={formProps.handleChange('endTime')}
                    onBlur={formProps.handleBlur('endTime')}
                    value={formProps.values.endTime}
                    iconName={'timer'}
                    iconColor={'#777'}
                  />
                  <Text style={styles.errorText}>
                    {formProps.touched.endTime && formProps.errors.endTime}
                  </Text>
                </View>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginBottom: 8,
                }}>
                <Text style={{ fontSize: 13, margin: 5 }}>
                  My Schedule is Tentetive
                </Text>
                <Switch
                  value={isSwitchOn}
                  onValueChange={onToggleSwitch}
                  color={'black'}
                />
              </View>
              <View style={styles.btnContainer}>
                <Text />
                <TouchableOpacity style={styles.btnStyle}>
                  <Button
                    mode="contained"
                    color={'black'}
                    onPress={formProps.handleSubmit}>
                    Next
                  </Button>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Formik>
      </View>
    </View>
  );
};

export default withTheme(Step3);

// import React, { Component } from 'react';
// import { Image, View, TouchableOpacity, Text } from 'react-native';
// import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import {
//   TextInput,
//   RadioButton,
//   Paragraph,
//   Checkbox,
// } from 'react-native-paper';
// import moment from 'moment';

// import styles from './styles';

// export class step3 extends Component {
//   constructor(props) {
//     props.saveState({
//       daysOfTheWeek: [
//         { name: 'Sun', checked: false },
//         { name: 'Mon', checked: false },
//         { name: 'Tue', checked: false },
//         { name: 'Wed', checked: false },
//         { name: 'Thurs', checked: false },
//         { name: 'Fri', checked: false },
//         { name: 'Sat', checked: false },
//       ],
//       onDays: 'Daily',
//     });
//     super(props);
//     this.state = {
//       totalSteps: '',
//       currentStep: '',
//       showDatePicker: false,
//       dateTimeType: '',
//     };
//   }

//   static getDerivedStateFromProps = props => {
//     const { getTotalSteps, getCurrentStep } = props;
//     return {
//       totalSteps: getTotalSteps(),
//       currentStep: getCurrentStep(),
//     };
//   };

//   nextStep = () => {
//     const { next } = this.props;
//     next();
//   };

//   setDateTimeValue = (event, selectedDate) => {
//     console.log('TIMNE', event, selectedDate);
//     const { dateTimeType } = this.state;
//     const { saveState } = this.props;
//     if (event.type === 'set') {
//       switch (dateTimeType) {
//         case 'startDate':
//           saveState({
//             startDate: moment(selectedDate).format('L'),
//           });
//           break;
//         case 'endDate':
//           saveState({
//             endDate: moment(selectedDate).format('L'),
//           });
//           break;
//         case 'startTime':
//           saveState({
//             startTime: moment(event.nativeEvent.timeStamp).format('LT'),
//           });
//           break;
//         case 'endTime':
//           saveState({
//             endTime: moment(event.nativeEvent.timeStamp).format('LT'),
//           });
//           break;
//         default:
//           this.setState({ showDatePicker: false });
//       }
//     }
//     this.setState({ showDatePicker: false });
//   };

//   getDateTime = () => {
//     const { dateTimeType } = this.state;
//     const { getState } = this.props;
//     switch (dateTimeType) {
//       case 'startDate':
//         return getState().startDate;
//       case 'endDate':
//         return getState().endDate;
//       case 'startTime':
//         return getState().startTime;
//       case 'endTime':
//         return getState().endTime;
//     }
//     this.setState({ showDatePicker: false });
//   };

//   updateState = day => {
//     const { saveState, getState } = this.props;
//     const { daysOfTheWeek } = getState();
//     const i = daysOfTheWeek.findIndex(weekDay => weekDay.name === day.name);
//     daysOfTheWeek[i].checked = true;
//     saveState({ daysOfTheWeek: daysOfTheWeek });
//   };

//   render() {
//     const { showDatePicker, days, dateTimeType } = this.state;
//     const { saveState, getState } = this.props;
//     const {
//       startDate,
//       endDate,
//       startTime,
//       endTime,
//       onDays,
//       daysOfTheWeek,
//       tentativeScedule,
//       totalHours,
//     } = getState();
//     return (
//       <View>
//         <TouchableOpacity
//           onPress={this.nextStep}
//           style={{
//             flexDirection: 'row',
//             position: 'absolute',
//             marginLeft: 360,
//           }}>
//           <Text style={{ fontSize: 17, fontWeight: 'bold' }}>Skip</Text>
//           <IconFontAwesome
//             style={{ marginTop: 7, marginLeft: 5 }}
//             name="forward"
//           />
//         </TouchableOpacity>
//         <View style={{ alignItems: 'center' }}>
//           <View>
//             <Text style={styles.currentStepText}>
//               Plan Your <Text style={{color: 'green'}}>{totalHours} hrs</Text>
//             </Text>
//           </View>
//           <View style={{ flexDirection: 'row', marginTop: 20 }}>
//             <>
//               <TextInput
//                 label="From Date"
//                 mode="outlined"
//                 style={{ width: '40%', padding: 10, height: 40 }}
//                 value={startDate}
//                 onFocus={() =>
//                   this.setState({
//                     showDatePicker: true,
//                     dateTimeType: 'startDate',
//                   })
//                 }
//               />
//               <IconFontAwesome
//                 name="calendar"
//                 style={{ position: 'absolute', marginTop: 28, marginLeft: 130 }}
//                 size={18}
//               />
//             </>
//             <>
//               <TextInput
//                 label="To Date"
//                 mode="outlined"
//                 style={{ width: '40%', padding: 10, height: 40 }}
//                 value={endDate}
//                 onFocus={() =>
//                   this.setState({
//                     showDatePicker: true,
//                     dateTimeType: 'endDate',
//                   })
//                 }
//               />
//               <IconFontAwesome
//                 name="calendar"
//                 style={{ position: 'absolute', marginTop: 28, marginLeft: 300 }}
//                 size={18}
//               />
//             </>
//           </View>
//           <View style={{ flexDirection: 'row', marginTop: 10 }}>
//             <RadioButton.Group
//               onValueChange={value => saveState({ onDays: value })}
//               value={onDays}>
//               <>
//                 <RadioButton value="Daily" />
//                 <Text style={{ marginTop: 8, marginRight: 20 }}>Daily</Text>
//               </>
//               <>
//                 <RadioButton value="Weekends" />
//                 <Text style={{ marginTop: 8, marginRight: 20 }}>Weekends</Text>
//               </>
//               <>
//                 <RadioButton value="specificDays" />
//                 <Text style={{ marginTop: 8, marginRight: 20 }}>
//                   Specific Days
//                 </Text>
//               </>
//             </RadioButton.Group>
//           </View>
//           {onDays === 'specificDays' && (
//             <View
//               style={{
//                 flex: 1,
//                 flexDirection: 'row',
//                 marginTop: 10,
//                 alignItems: 'center',
//                 width: '80%',
//                 flexWrap: 'wrap',
//               }}>
//               {daysOfTheWeek &&
//                 daysOfTheWeek.map(day => {
//                   return (
//                     <>
//                       <Checkbox
//                         checkedIcon="dot-circle-o"
//                         uncheckedIcon="circle-o"
//                         title="checkbox 1"
//                         checkedColor="red"
//                         onPress={() => this.updateState(day)}
//                         status={day.checked ? 'checked' : 'unchecked'}
//                       />
//                       <Text style={{ marginTop: 5 }}>{day.name}</Text>
//                     </>
//                   );
//                 })}
//             </View>
//           )}
//           <View style={{ flexDirection: 'row' }}>
//             <>
//               <TextInput
//                 label="Start Time"
//                 mode="outlined"
//                 style={{ width: '40%', padding: 10, height: 40 }}
//                 value={startTime}
//                 onFocus={() =>
//                   this.setState({
//                     showDatePicker: true,
//                     dateTimeType: 'startTime',
//                   })
//                 }
//               />
//               <Ionicons
//                 name="md-time"
//                 style={{ position: 'absolute', marginTop: 28, marginLeft: 130 }}
//                 size={18}
//               />
//             </>
//             <>
//               <TextInput
//                 label="End Time"
//                 mode="outlined"
//                 style={{ width: '40%', padding: 10, height: 40 }}
//                 value={endTime}
//                 onFocus={() =>
//                   this.setState({
//                     showDatePicker: true,
//                     dateTimeType: 'endTime',
//                   })
//                 }
//               />
//               <Ionicons
//                 name="md-time"
//                 style={{ position: 'absolute', marginTop: 28, marginLeft: 300 }}
//                 size={18}
//               />
//             </>
//           </View>
//           <View style={{ alignItems: 'center', width: '80%', marginTop: 25 }}>
//             <Paragraph style={{ fontSize: 12 }}>
//               The schedule might change depending on you and your student
//               availability. Unless you are not strict about the timings, Please
//               check the below check box to show it as tentative.
//             </Paragraph>
//             <Text style={{ marginTop: 10, fontSize: 12.5, color: '#d04437' }}>
//               Skipping this page is considered as tentative schedule.
//             </Text>
//             <View
//               style={{
//                 flex: 1,
//                 flexDirection: 'row',
//                 marginTop: 25,
//                 flexWrap: 'wrap',
//                 alignItems: 'flex-start',
//               }}>
//               <Checkbox
//                 checkedIcon="dot-circle-o"
//                 uncheckedIcon="circle-o"
//                 title="checkbox 1"
//                 onPress={() =>
//                   saveState({ tentativeScedule: !tentativeScedule })
//                 }
//                 status={tentativeScedule ? 'checked' : 'unchecked'}
//               />
//               <Text style={{ marginTop: 10, marginRight: 5 }}>
//                 My schedule is tentative
//               </Text>
//             </View>
//           </View>
//           {showDatePicker && (
//             <DateTimePicker
//               value={this.getDateTime}
//               is24Hour={true}
//               mode={
//                 dateTimeType === 'startDate' || dateTimeType === 'endDate'
//                   ? 'date'
//                   : 'time'
//               }
//               display={
//                 dateTimeType === 'startDate' || dateTimeType === 'endDate'
//                   ? 'calendar'
//                   : 'clock'
//               }
//               onChange={(event, selectedDate) => {
//                 this.setState({ showDatePicker: false });
//                 this.setDateTimeValue(event, selectedDate);
//               }}
//             />
//           )}
//           <View style={[styles.btnContainer, styles.marginAround]}>
//             <TouchableOpacity onPress={this.props.back} style={styles.btnStyle}>
//               <Image
//                 source={require('../../../../assets/img/right-black-arrow-md.png')}
//                 style={[styles.btnImage, styles.backBtn]}
//                 resizeMode="cover"
//               />
//             </TouchableOpacity>
//             <TouchableOpacity onPress={this.nextStep} style={styles.btnStyle}>
//               <Image
//                 source={require('../../../../assets/img/right-black-arrow-md.png')}
//                 style={styles.btnImage}
//                 resizeMode="cover"
//               />
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>
//     );
//   }
// }

// export default step3;
