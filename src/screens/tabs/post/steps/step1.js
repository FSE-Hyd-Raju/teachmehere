import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  TextInput,
  Text,
  Keyboard,
} from 'react-native';
import styles from './styles';
import { Formik } from 'formik';
import { Dialog, Portal, List, Button, Appbar } from 'react-native-paper';
import { postStep1ValidationSchema } from '../../../../utils/validations';
import {
  DefaultTheme,
  DarkTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
import { withTheme } from 'react-native-paper';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
//import Header from '../../../../components/common/Header';
import { Header } from 'react-native-elements';

const Step1 = props => {
  const [showDailog, setshowDailog] = useState(false);
  const { colors } = props.theme;
  console.log('POS', props);
  const options = [
    { value: 'basic', label: 'Basic' },
    { value: 'intermediate', label: 'Inermediate' },
    { value: 'advanced', label: 'Advanced' },
  ];

  return (
    <View>
      <Appbar.Header theme={DarkTheme}>
        <Appbar.BackAction onPress={props.backFromSteps} />
        <Appbar.Content title="Skill Details" />
      </Appbar.Header>
      <View style={styles.container}>
        <Formik
          initialValues={{
            skillName: '',
            skillLevel: '',
            totalHours: '',
            contents: '',
          }}
        //  validationSchema={postStep1ValidationSchema}
          onSubmit={values => {
            props.next();
            props.saveState(values);
          }}>
          {formProps => (
            <View style={styles.container}>
              <Text style={styles.label}>Skill Name*</Text>
              <TextInput
                placeholder="Name of the skill you are offering"
                placeholderTextColor={'#7777'}
                style={styles.input}
                onChangeText={formProps.handleChange('skillName')}
                onBlur={formProps.handleBlur('skillName')}
                value={formProps.values.skillName}
              />
              <Text style={styles.errorText}>
                {formProps.touched.skillName && formProps.errors.skillName}
              </Text>
              <Text style={styles.label}>Skill Level*</Text>
              <TextInput
                placeholder="Skill level"
                placeholderTextColor={'#7777'}
                style={styles.input}
                onFocus={() => {
                  Keyboard.dismiss();
                  setshowDailog(true);
                }}
                onBlur={formProps.handleBlur('skillLevel')}
                value={formProps.values.skillLevel}
              />
              <Portal>
                <Dialog
                  visible={showDailog}
                  onDismiss={() => setshowDailog(false)}>
                  <Dialog.Title>Select Skill Level</Dialog.Title>
                  <Dialog.Content>
                    {options.map(data => {
                      return (
                        <List.Item
                          key={data.key}
                          title={data.label}
                          onPress={() => {
                            setshowDailog(false);
                            formProps.setFieldValue('skillLevel', data.label);
                          }}
                        />
                      );
                    })}
                  </Dialog.Content>
                </Dialog>
              </Portal>
              <Text style={styles.errorText}>
                {formProps.touched.skillLevel && formProps.errors.skillLevel}
              </Text>
              <Text style={styles.label}>Total Hours*</Text>
              <TextInput
                placeholder="# of hrs to complete the course"
                placeholderTextColor={'#7777'}
                style={styles.input}
                keyboardType={'numeric'}
                onChangeText={formProps.handleChange('totalHours')}
                onBlur={formProps.handleBlur('totalHours')}
                value={formProps.values.totalHours}
              />
              <Text style={styles.errorText}>
                {formProps.touched.totalHours && formProps.errors.totalHours}
              </Text>
              <Text style={styles.label}>Contents</Text>
              <TextInput
                placeholderTextColor={'#7777'}
                style={styles.input}
                onChangeText={formProps.handleChange('contents')}
                value={formProps.values.contents}
                multiline={true}
                numberOfLines={7}
                scrollEnabled={true}
                placeholder={
                  'contents to cover \n  example: \n 1. Agenda \n 2. Introduction\n 3. etc. '
                }
              />
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

export default withTheme(Step1);
