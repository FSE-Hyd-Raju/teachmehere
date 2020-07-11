import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    padding: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    fontSize: 14,
    borderRadius: 6,
    flex: 1,
    height: 47,
  },
  inputTextArea: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    fontSize: 14,
    borderRadius: 6,
    flex: 1,
  },
  label: {
    fontSize: 12,
    padding: 5,
    color: '#777',
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '10%',
  },
  errorText: {
    fontSize: 12,
    marginTop: 6,
    color: 'crimson',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  skipButton: {
    fontSize: 15,
    color: 'white',
  },
  btnStyle: {
    width: '30%',
  },
  btnImage: {
    width: '100%',
    height: '100%',
  },
  backBtn: {
    transform: [{ rotate: '180deg' }],
  },
  marginAround: {
    width: '40%',
    justifyContent: 'space-between',
  },
  currentStepText: {
    color: '#444',
    fontSize: 22,
    fontWeight: 'bold',
  },
  datePicker: {
    flex: 1,
    alignItems: 'center',
    marginTop: '6%',
    backgroundColor: '#FFFFFF',
  },

  surface: {
    margin: 10,
    elevation: 4,
  },
  inputDate: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    backgroundColor: '#fff',
    color: '#424242',
  },
});
