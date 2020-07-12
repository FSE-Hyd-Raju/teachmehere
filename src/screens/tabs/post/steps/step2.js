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
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Header } from 'react-native-elements';
import AutoCompleteTextInput from '../../../../components/common/autoComplete/AutoCompleteTextInput';

const Step2 = props => {
  //   props.saveState({ languages: ['English'] });
  //   const languages1 = props.getState().languages || [];
  const [languages, setLanguages] = useState([]);
  //const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [countries] = useState(
    require('../../../../assets/countries.json') || [],
  );
  const [allLaunguages] = useState(
    require('../../../../assets/languages.json') || [],
  );
  const { getState, saveState } = props;
  const onToggleSwitch = () => {
    saveState({ isGroupSelected: !getState().isGroupSelected });
  };
  const { colors } = props.theme;

  const selectLanguage = lang => {
    const index = languages && languages.indexOf(lang);
    if (index === -1) {
      languages.push(lang);
    }
    setLanguages([...languages]);
    saveState({ languages: languages });
  };

  const removeLanguage = Language => {
    const index = languages.indexOf(Language);
    if (index !== -1) {
      languages.splice(index, 1);
    }
    setLanguages([...languages]);
    saveState({ languages: languages });
  };

  return (
    <View>
      <Appbar.Header theme={DarkTheme}>
        <Appbar.BackAction onPress={props.back} />
        <Appbar.Content title="Pricing" />
      </Appbar.Header>
      <View style={styles.container}>
        <Formik
          initialValues={{
            country: getState().country || '',
            individualPrice: getState().individualPrice || '',
            noOfPeople: getState().noOfPeople || '',
            groupPrice: getState().groupPrice || '',
            languages: getState().languages || [],
          }}
          // validationSchema={postStep2ValidationSchema}
          onSubmit={values => {
            props.next();
            props.saveState(values);
            if (!getState().daysOfTheWeek) {
              props.saveState({
                onDays: 'Daily',
                daysOfTheWeek: [
                  { name: 'Sun', checked: false },
                  { name: 'Mon', checked: false },
                  { name: 'Tue', checked: false },
                  { name: 'Wed', checked: false },
                  { name: 'Thu', checked: false },
                  { name: 'Fri', checked: false },
                  { name: 'Sat', checked: false },
                ],
                isTentativeSchedule: false,
              });
            }
          }}>
          {formProps => (
            <View style={styles.container}>
              <View>
                <AutoCompleteTextInput
                  data={countries}
                  displayKey="name"
                  label={'Country*'}
                  placeholder="Select a country"
                  value={formProps.values.country}
                  onSelect={value => {
                    formProps.setFieldValue('country', value);
                    setLanguages([
                      ...(getState().languages || []),
                      value.language.name,
                    ]);
                  }}
                  maxHeight={200}
                />
                <Text style={styles.errorText}>
                  {formProps.touched.country && formProps.errors.country}
                </Text>
              </View>
              <Text style={styles.label}>Individual Price*</Text>
              <TextInput
                placeholder="Individual Price"
                placeholderTextColor={'#7777'}
                style={styles.input}
                onChangeText={formProps.handleChange('individualPrice')}
                onBlur={formProps.handleBlur('individualPrice')}
                value={formProps.values.individualPrice}
                keyboardType={'numeric'}
              />
              <Text style={styles.errorText}>
                {formProps.touched.individualPrice &&
                  formProps.errors.individualPrice}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginBottom: 8,
                }}>
                <Text style={{ fontSize: 13, margin: 5 }}>
                  Interested to teach group as well?
                </Text>
                <Switch
                  value={getState().isGroupSelected}
                  onValueChange={onToggleSwitch}
                  color={'black'}
                />
              </View>
              {getState().isGroupSelected && (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{ width: '35%' }}>
                    <Text style={styles.label}># Of People</Text>
                    <TextInput
                      placeholder="# of people"
                      placeholderTextColor={'#7777'}
                      style={styles.input}
                      keyboardType={'numeric'}
                      onChangeText={formProps.handleChange('noOfPeople')}
                      onBlur={formProps.handleBlur('noOfPeople')}
                      value={formProps.values.noOfPeople}
                    />
                    <Text style={styles.errorText}>
                      {formProps.touched.noOfPeople &&
                        formProps.errors.noOfPeople}
                    </Text>
                  </View>
                  <View style={{ width: '60%' }}>
                    <Text style={styles.label}>Group Price</Text>
                    <TextInput
                      placeholder="Group price"
                      placeholderTextColor={'#7777'}
                      style={styles.input}
                      keyboardType={'numeric'}
                      onChangeText={formProps.handleChange('groupPrice')}
                      onBlur={formProps.handleBlur('groupPrice')}
                      value={formProps.values.groupPrice}
                    />
                    <Text style={styles.errorText}>
                      {formProps.touched.groupPrice &&
                        formProps.errors.groupPrice}
                    </Text>
                  </View>
                </View>
              )}
              <Text style={styles.label}>Speaking Languages*</Text>
              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  padding: 5,
                }}>
                {languages &&
                  languages.map(lan => {
                    return (
                      <Chip
                        mode="outlined"
                        style={{ padding: 2, margin: 3 }}
                        onClose={() => removeLanguage(lan)}>
                        {lan}
                      </Chip>
                    );
                  })}
              </View>
              {formProps.errors.languages && (
                <Text style={styles.errorText}>
                  {formProps.touched.languages && formProps.errors.languages}
                </Text>
              )}
              <View style={{ marginTop: 7 }}>
                <AutoCompleteTextInput
                  data={allLaunguages}
                  displayKey="name"
                  placeholder="Select Language"
                  onSelect={lang => selectLanguage(lang.name)}
                  maxHeight={200}
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

export default withTheme(Step2);
