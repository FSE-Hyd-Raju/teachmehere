import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';

const TextInputWithIcon = props => {
  const {
    placeholder,
    placeholderTextColor,
    keyboardType,
    iconName,
    iconColor,
    handleChange,
    handleBlur,
    value,
  } = props;
  return (
    <View style={styles.inputWithIcon}>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        style={styles.inputIconTextBox}
        keyboardType={keyboardType}
        onChangeText={handleChange}
        onBlur={handleBlur}
        value={value}
      />
      <IconMaterialIcons
        style={{ padding: 10 }}
        name={iconName}
        color={iconColor}
        size={23}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputWithIcon: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 14,
    borderRadius: 6,
    height: 47,
  },
  inputStyle: {
    flex: 1,
  },
  inputIconTextBox: {
    fontSize: 14,
    flex: 1,
  },
});

export default TextInputWithIcon;
