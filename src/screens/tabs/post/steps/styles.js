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


  step1: {
    flex: 1,
  },
  step2: {
    flex: 1,
  },
  step3: {
    flex: 1,
  },
  step4: {
    flex: 1,
  },
  description: {
    width: '80%',
    marginTop: '6%',
  },
  price: {
    width: '80%',
    marginTop: '4%',
    height: 48,
  },
  selectInput: {
    width: '80%',
    borderColor: 'darkgray',
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 8,
    marginTop: '6%',
  },
  selectInputPrice: {
    width: 80,
    height: 50,
    borderColor: 'darkgray',
    backgroundColor: 'white',
    borderWidth: 1,
    marginLeft: 70,
    fontSize: 25,
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
