import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';
import { TextInput, StyleSheet, View, BackHandler } from 'react-native';
import { AppText, TouchableScale } from '../../components/common';
import { getFontStyleObject } from '../../utils/font';
import {
  getSearchInputBackIcon,
  getSearchInputCloseIcon,
  getSearchInputLabelIcon,
} from '../../utils/icons';
import Theme from '../../Theme';
import Config from '../../Config';

export default class Search extends Component {
  render() {
    return (
      <View style={[styles.container]}>
        <View style={styles.inputContainer}>
          <TextInput
            selectionColor={Theme.colors.textInputSelection}
            autoCorrect={false}
            spellCheck={false}
            style={styles.input}
          />
          {/* {value.length > 0 && (
            <TouchableScale
              onPress={this.onClearPress}
              style={styles.touchableInputIcon}>
              {getSearchInputCloseIcon()}
            </TouchableScale>
          )} */}
        </View>

        {/* {showSearchHelpLabel && ( */}
        <TouchableScale
          onPress={this.onSearchLabelPress}
          style={styles.labelTouchable}
          scaleFactor={0.98}>
          <View style={styles.labelWrapper}>
            {getSearchInputLabelIcon()}
            <AppText style={styles.labelText} type="headline">
              Search for Skills
            </AppText>
          </View>
        </TouchableScale>
        {/* )} */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    borderRadius: 4,
    marginHorizontal: Theme.spacing.small,
    backgroundColor: Theme.gray.lightest,
  },
  touchableInputIcon: {
    paddingHorizontal: Theme.spacing.tiny,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    flex: 1,
    color: Theme.gray.darkest,
    paddingVertical: Config.isAndroid ? 0 : 12,
    ...Theme.typography.body,
    ...getFontStyleObject(),
  },
  labelTouchable: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelText: {
    color: Theme.gray.darkest,
    ...getFontStyleObject({ weight: 'Bold' }),
  },
});
