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
    super(props);
    this.state = {
      totalSteps: '',
      currentStep: '',
      isGroupSelected: false,
      showCountrySelectionDailog: false,
      skillLevel: '',
      countries: require('../../../../assets/countries.json') || [],
      filteredCountries: [],
      languages: ['English', 'Hindi', 'Telugu'],
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
    // Go to next step
    next();
  };

  goBack() {
    const { back } = this.props;
    // Go to previous step
    back();
  }

  countryDailogHide = () => {
    this.setState({ showCountrySelectionDailog: false });
  };

  selectCountry(value) {
    const { saveState } = this.props;
    //this.countryDailogHide();
    saveState({ country: value });
    this.setState({ filteredCountries: [] });
  }

  filterCountries = value => {
    const filteredCountries = this.state.countries.filter(country => {
      return (
        country && country.name.toLowerCase().includes(value.toLowerCase())
      );
    });
    this.setState({ filteredCountries: filteredCountries });
  };

  render() {
    const { isGroupSelected, filteredCountries, languages } = this.state;
    const { saveState, getState } = this.props;
    const { country } = getState();
    return (
      <View style={{ alignItems: 'center' }}>
        <Text style={styles.currentStepText}>Pricing</Text>
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
          value={this.state.IndividualPrice}
          onChangeText={price => saveState({ IndividualPrice: price })}
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
            onPress={() =>
              this.setState({ isGroupSelected: !this.state.isGroupSelected })
            }
            status={isGroupSelected ? 'checked' : 'unchecked'}
          />
          <Text style={{ marginTop: 10 }}>
            Interested in teaching group of people?
          </Text>
        </View>
        {isGroupSelected && (
          <View style={{ flexDirection: 'row' }}>
            <TextInput
              label="# of people"
              placeholder="No of people"
              keyboardType="numeric"
              mode="outlined"
              style={{ width: 120, marginTop: '3%', height: 48 }}
              value={this.state.groupPrice}
              onChangeText={price => saveState({ groupPrice: price })}
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
              value={this.state.groupPrice}
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
        <View style={{ flexDirection: 'row', marginTop: 10 }}>
          {languages &&
            languages.map(lan => {
              return (
                <Chip
                  mode="outlined"
                  style={{ padding: 2, margin: 5 }}
                  onClose={text => console.log('hjg', text)}>
                  {lan}
                </Chip>
              );
            })}
        </View>
        <TextInput
          label="Language"
          mode="outlined"
          style={{ width: '80%', marginTop: '2%', height: 48 }}
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
