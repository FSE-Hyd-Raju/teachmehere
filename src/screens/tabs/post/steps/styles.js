import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: '6%',
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: '10%',
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
  input: {
    width: '80%',
    marginTop: '6%',
    height: 48,
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
    borderColor: '#fff',
    borderWidth: 2,
    borderRadius: 100,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
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
