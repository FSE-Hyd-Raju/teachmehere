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

const Step2 = props => {
  //   props.saveState({ languages: ['English'] });
  //   const languages1 = props.getState().languages || [];
  const [languages, setLanguages] = useState(['English']);
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [countries] = useState(
    require('../../../../assets/countries.json') || [],
  );
  const [allLaunguages] = useState(
    require('../../../../assets/languages.json') || [],
  );
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [filteredLanguages, setFilteredLanguages] = useState([]);
  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
  const { colors } = props.theme;

  const filterCountries = value => {
    const filteredCountries = countries.filter(country => {
      return (
        country && country.name.toLowerCase().includes(value.toLowerCase())
      );
    });
    setFilteredCountries(filteredCountries);
  };

  const selectLanguage = value => {
    const index = languages.indexOf(value);
    if (index === -1) {
      languages.push(value);
    }
    setLanguages([...languages]);
    setFilteredLanguages([]);
  };

  const removeLanguage = Language => {
    const index = languages.indexOf(Language);
    if (index !== -1) {
      languages.splice(index, 1);
    }
    setLanguages([...languages]);
  };

  const filterLanguages = value => {
    const filteredLanguages = allLaunguages.filter(language => {
      return (
        language && language.name.toLowerCase().includes(value.toLowerCase())
      );
    });
    setFilteredLanguages(filteredLanguages);
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
            country: '',
            individualPrice: '',
            noOfPeople: '',
            groupPrice: '',
            languages: languages,
          }}
         // validationSchema={postStep2ValidationSchema}
          onSubmit={values => {
            props.next();
            props.saveState(values);
          }}>
          {formProps => (
            <View style={styles.container}>
              <Text style={styles.label}>Country*</Text>
              <TextInput
                placeholder="Country"
                placeholderTextColor={'#7777'}
                style={styles.input}
                onChangeText={text => filterCountries(text)}
                onBlur={formProps.handleBlur('country')}
                value={formProps.values.country.name}
              />
              {filteredCountries &&
                filteredCountries.map(country => {
                  return (
                    <List.Item
                      style={{
                        backgroundColor: 'white',
                        elevation: 5,
                      }}
                      key={country.code}
                      title={country.name}
                      onPress={() => {
                        formProps.setFieldValue('country', country);
                        setFilteredCountries([]);
                      }}
                    />
                  );
                })}
              <Text style={styles.errorText}>
                {formProps.touched.country && formProps.errors.country}
              </Text>
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
                  value={isSwitchOn}
                  onValueChange={onToggleSwitch}
                  color={'black'}
                />
              </View>
              {isSwitchOn && (
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
                  margin: 10,
                }}>
                {languages &&
                  languages.map(lan => {
                    return (
                      <Chip
                        mode="outlined"
                        style={{ padding: 2, margin: 5 }}
                        onClose={() => removeLanguage(lan)}>
                        {lan}
                      </Chip>
                    );
                  })}
              </View>
              <Text style={styles.errorText}>
                {formProps.touched.languages && formProps.errors.languages}
              </Text>
              <TextInput
                placeholderTextColor={'#7777'}
                style={styles.input}
                onChangeText={text => filterLanguages(text)}
                onBlur={() => {
                  formProps.handleBlur('languages');
                  formProps.setFieldValue('languages', languages);
                }}
                placeholder={'Search languages'}
              />
              {filteredLanguages &&
                filteredLanguages.map(language => {
                  return (
                    <List.Item
                      style={{
                        backgroundColor: 'white',
                        elevation: 5,
                      }}
                      key={language.code}
                      title={language.name}
                      onPress={() => selectLanguage(language.name)}
                    />
                  );
                })}
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

// import React, { Component } from 'react';
// import {
//   Image,
//   View,
//   TouchableOpacity,
//   ScrollView,
//   Keyboard,
// } from 'react-native';

// import styles from './styles';
// import { Portal, Text, Checkbox, Chip, List } from 'react-native-paper';
// import { TextInput } from 'react-native-paper';

// class step2 extends Component {
//   constructor(props) {
//     props.saveState({
//       languages: ['English', 'Hindi', 'Telugu'],
//       isGroupSelected: false,
//     });
//     super(props);
//     this.state = {
//       totalSteps: '',
//       currentStep: '',
//       countries: require('../../../../assets/countries.json') || [],
//       allLaunguages: require('../../../../assets/languages.json') || [],
//       filteredCountries: [],
//       filteredLanguages: [],
//       languages: props.getState().languages || [],
//       isGroupSelected: props.getState().isGroupSelected || false,
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
//     const { next, saveState } = this.props;
//     saveState({
//       languages: this.state.languages,
//       isGroupSelected: this.state.isGroupSelected,
//     });
//     // Go to next step
//     next();
//   };

//   goBack() {
//     const { back, saveState } = this.props;
//     // Go to previous step
//     // saveState({
//     //   languages: this.state.languages,
//     //   isGroupSelected: this.state.isGroupSelected,
//     // });
//     back();
//   }

//   selectCountry = value => {
//     const languages = this.state.languages;
//     const { saveState } = this.props;
//     saveState({ country: value });
//     const index = languages.indexOf(value.language.name);
//     if (index === -1) {
//       languages.push(value.language.name);
//     }
//     this.setState({
//       filteredCountries: [],
//       languages: languages,
//     });
//   };

//   selectLanguage = value => {
//     const languages = this.state.languages;
//     const index = languages.indexOf(value);
//     if (index === -1) {
//       languages.push(value);
//     }
//     this.setState({
//       languages: languages,
//       filteredLanguages: [],
//     });
//   };

//   removeLanguage = Language => {
//     const languages = this.state.languages;
//     const index = languages.indexOf(Language);
//     if (index !== -1) {
//       languages.splice(index, 1);
//     }
//     this.setState({ languages: languages });
//   };

//   filterCountries = value => {
//     const filteredCountries = this.state.countries.filter(country => {
//       return (
//         country && country.name.toLowerCase().includes(value.toLowerCase())
//       );
//     });
//     this.setState({ filteredCountries: filteredCountries });
//   };

//   filterLanguages = value => {
//     const filteredLanguages = this.state.allLaunguages.filter(language => {
//       return (
//         language && language.name.toLowerCase().includes(value.toLowerCase())
//       );
//     });
//     this.setState({ filteredLanguages: filteredLanguages });
//   };

//   render() {
//     const {
//       filteredCountries,
//       languages,
//       filteredLanguages,
//       isGroupSelected,
//     } = this.state;
//     const { saveState, getState } = this.props;
//     const { country, individualPrice, groupPrice, noOfPeople } = getState();
//     return (
//       <View style={{ alignItems: 'center' }}>
//         <View>
//           <Text style={styles.currentStepText}>Pricing</Text>
//         </View>
//         <TextInput
//           label="Country"
//           mode="outlined"
//           selectionColor={'red'}
//           style={styles.price}
//           value={country && country.name}
//           onChangeText={text => this.filterCountries(text)}
//         />
//         {filteredCountries &&
//           filteredCountries.map(country => {
//             return (
//               <List.Item
//                 style={{
//                   backgroundColor: 'white',
//                   width: '80%',
//                   elevation: 5,
//                 }}
//                 key={country.code}
//                 title={country.name}
//                 onPress={this.selectCountry.bind(this, country)}
//               />
//             );
//           })}
//         <TextInput
//           label="One to one price"
//           placeholder="Price per head"
//           keyboardType="numeric"
//           mode="outlined"
//           style={styles.price}
//           value={individualPrice}
//           onChangeText={price =>
//             saveState({
//               individualPrice: price,
//             })
//           }
//         />
//         <View
//           style={{
//             flexDirection: 'row',
//             marginTop: 20,
//           }}>
//           <Checkbox
//             checkedIcon="dot-circle-o"
//             uncheckedIcon="circle-o"
//             title="checkbox 1"
//             onPress={() => this.setState({ isGroupSelected: !isGroupSelected })}
//             status={isGroupSelected ? 'checked' : 'unchecked'}
//           />
//           <Text style={{ marginTop: 10 }}>
//             Interested in teaching group of people?
//           </Text>
//         </View>
//         {isGroupSelected && (
//           <View style={{ flexDirection: 'row', width: '80%' }}>
//             <TextInput
//               label="# of people"
//               placeholder="No of people"
//               keyboardType="numeric"
//               mode="outlined"
//               style={{ width: 120, marginTop: '3%', height: 48 }}
//               value={noOfPeople}
//               onChangeText={people => saveState({ noOfPeople: people })}
//             />
//             <TextInput
//               label="Group price"
//               placeholder="Price per head"
//               keyboardType="numeric"
//               mode="outlined"
//               style={{
//                 width: 220,
//                 marginLeft: 15,
//                 height: 48,
//                 marginTop: '3%',
//               }}
//               value={groupPrice}
//               onChangeText={price => saveState({ groupPrice: price })}
//             />
//           </View>
//         )}
//         <View
//           style={{
//             flexDirection: 'row',
//             marginTop: 20,
//             marginLeft: -220,
//           }}>
//           <Text style={{ marginTop: 5, marginRight: 5 }}>
//             Speaking Languages
//           </Text>
//         </View>
//         <View
//           style={{
//             flexDirection: 'row',
//             flexWrap: 'wrap',
//             width: '80%',
//             marginTop: 10,
//           }}>
//           {languages &&
//             languages.map(lan => {
//               return (
//                 <Chip
//                   mode="outlined"
//                   style={{ padding: 2, margin: 5 }}
//                   onClose={() => this.removeLanguage(lan)}>
//                   {lan}
//                 </Chip>
//               );
//             })}
//         </View>
//         <TextInput
//           label="Search languages"
//           mode="outlined"
//           style={{ width: '80%', marginTop: '2%', height: 48 }}
//           onChangeText={text => this.filterLanguages(text)}
//         />
//         {filteredLanguages &&
//           filteredLanguages.map(language => {
//             return (
//               <List.Item
//                 style={{
//                   backgroundColor: 'white',
//                   width: '80%',
//                   elevation: 5,
//                 }}
//                 key={language.code}
//                 title={language.name}
//                 onPress={this.selectLanguage.bind(this, language.name)}
//               />
//             );
//           })}
//         <View style={[styles.btnContainer, styles.marginAround]}>
//           <TouchableOpacity onPress={this.props.back} style={styles.btnStyle}>
//             <Image
//               source={require('../../../../assets/img/right-black-arrow-md.png')}
//               style={[styles.btnImage, styles.backBtn]}
//               resizeMode="cover"
//             />
//           </TouchableOpacity>
//           <TouchableOpacity onPress={this.nextStep} style={styles.btnStyle}>
//             <Image
//               source={require('../../../../assets/img/right-black-arrow-md.png')}
//               style={styles.btnImage}
//               resizeMode="cover"
//             />
//           </TouchableOpacity>
//         </View>
//       </View>
//     );
//   }
// }

// export default step2;
