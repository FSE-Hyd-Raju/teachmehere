import React, { Component } from 'react';
import {
  Image,
  View,
  TouchableOpacity,
  ScrollView,
  Keyboard,
} from 'react-native';

import styles from './styles';
import { Portal, Text, Checkbox, Chip, List } from 'react-native-paper';
import { TextInput } from 'react-native-paper';

class step2 extends Component {
  constructor(props) {
    props.saveState({
      languages: ['English', 'Hindi', 'Telugu'],
      isGroupSelected: false,
    });
    super(props);
    this.state = {
      totalSteps: '',
      currentStep: '',
      countries: require('../../../../assets/countries.json') || [],
      allLaunguages: require('../../../../assets/languages.json') || [],
      filteredCountries: [],
      filteredLanguages: [],
      languages: props.getState().languages || [],
      isGroupSelected: props.getState().isGroupSelected || false,
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
    saveState({
      languages: this.state.languages,
      isGroupSelected: this.state.isGroupSelected,
    });
    // Go to next step
    next();
  };

  goBack() {
    const { back, saveState } = this.props;
    // Go to previous step
    // saveState({
    //   languages: this.state.languages,
    //   isGroupSelected: this.state.isGroupSelected,
    // });
    back();
  }

  selectCountry = value => {
    const languages = this.state.languages;
    const { saveState } = this.props;
    saveState({ country: value });
    const index = languages.indexOf(value.language.name);
    if (index === -1) {
      languages.push(value.language.name);
    }
    this.setState({
      filteredCountries: [],
      languages: languages,
    });
  };

  selectLanguage = value => {
    const languages = this.state.languages;
    const index = languages.indexOf(value);
    if (index === -1) {
      languages.push(value);
    }
    this.setState({
      languages: languages,
      filteredLanguages: [],
    });
  };

  removeLanguage = Language => {
    const languages = this.state.languages;
    const index = languages.indexOf(Language);
    if (index !== -1) {
      languages.splice(index, 1);
    }
    this.setState({ languages: languages });
  };

  filterCountries = value => {
    const filteredCountries = this.state.countries.filter(country => {
      return (
        country && country.name.toLowerCase().includes(value.toLowerCase())
      );
    });
    this.setState({ filteredCountries: filteredCountries });
  };

  filterLanguages = value => {
    const filteredLanguages = this.state.allLaunguages.filter(language => {
      return (
        language && language.name.toLowerCase().includes(value.toLowerCase())
      );
    });
    this.setState({ filteredLanguages: filteredLanguages });
  };

  render() {
    const {
      filteredCountries,
      languages,
      filteredLanguages,
      isGroupSelected,
    } = this.state;
    const { saveState, getState } = this.props;
    const { country, individualPrice, groupPrice, noOfPeople } = getState();
    return (
      <View style={{ alignItems: 'center' }}>
        <View>
          <Text style={styles.currentStepText}>Pricing</Text>
        </View>
        <TextInput
          label="Country"
          mode="outlined"
          selectionColor={'red'}
          style={styles.price}
          value={country && country.name}
          onChangeText={text => this.filterCountries(text)}
        />
        {filteredCountries &&
          filteredCountries.map(country => {
            return (
              <List.Item
                style={{
                  backgroundColor: 'white',
                  width: '80%',
                  elevation: 5,
                }}
                key={country.code}
                title={country.name}
                onPress={this.selectCountry.bind(this, country)}
              />
            );
          })}
        <TextInput
          label="One to one price"
          placeholder="Price per head"
          keyboardType="numeric"
          mode="outlined"
          style={styles.price}
          value={individualPrice}
          onChangeText={price =>
            saveState({
              individualPrice: price,
            })
          }
        />
        <View
          style={{
            flexDirection: 'row',
            marginTop: 20,
          }}>
          <Checkbox
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            title="checkbox 1"
            onPress={() => this.setState({ isGroupSelected: !isGroupSelected })}
            status={isGroupSelected ? 'checked' : 'unchecked'}
          />
          <Text style={{ marginTop: 10 }}>
            Interested in teaching group of people?
          </Text>
        </View>
        {isGroupSelected && (
          <View style={{ flexDirection: 'row', width: '80%' }}>
            <TextInput
              label="# of people"
              placeholder="No of people"
              keyboardType="numeric"
              mode="outlined"
              style={{ width: 120, marginTop: '3%', height: 48 }}
              value={noOfPeople}
              onChangeText={people => saveState({ noOfPeople: people })}
            />
            <TextInput
              label="Group price"
              placeholder="Price per head"
              keyboardType="numeric"
              mode="outlined"
              style={{
                width: 220,
                marginLeft: 15,
                height: 48,
                marginTop: '3%',
              }}
              value={groupPrice}
              onChangeText={price => saveState({ groupPrice: price })}
            />
          </View>
        )}
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
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            width: '80%',
            marginTop: 10,
          }}>
          {languages &&
            languages.map(lan => {
              return (
                <Chip
                  mode="outlined"
                  style={{ padding: 2, margin: 5 }}
                  onClose={() => this.removeLanguage(lan)}>
                  {lan}
                </Chip>
              );
            })}
        </View>
        <TextInput
          label="Search languages"
          mode="outlined"
          style={{ width: '80%', marginTop: '2%', height: 48 }}
          onChangeText={text => this.filterLanguages(text)}
        />
        {filteredLanguages &&
          filteredLanguages.map(language => {
            return (
              <List.Item
                style={{
                  backgroundColor: 'white',
                  width: '80%',
                  elevation: 5,
                }}
                key={language.code}
                title={language.name}
                onPress={this.selectLanguage.bind(this, language.name)}
              />
            );
          })}
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
