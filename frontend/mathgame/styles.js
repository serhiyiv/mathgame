
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  loginView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },

  scoreView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },

  gameCaption: {
    fontWeight: 'bold',
    fontSize: 20,
    margin: 10
  },
  input: {
    borderRadius: 5,
    borderColor: "#adadad",
    borderWidth: 2,
    marginTop: 15,
    marginLeft: 15,
    marginRight: 15,
    paddingLeft: 15,
    alignSelf: 'stretch'
  },
  buttonStyle: {
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    height: 40,
    width: 100,
    marginLeft: 5,
    marginRight: 5,

    borderColor: 'black',
    borderWidth: 2,
    backgroundColor: '#ffb408'
  },
  buttonCaption: {
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  urlCaption: {
    color: 'black',
    textAlign: 'center',
    fontSize: 12,
    fontWeight: 'bold'
  },
  navButtonStyle: {
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    height: 30,
    width: 100,
    marginLeft: 5,
    marginRight: 5,

    borderColor: 'black',
    borderWidth: 2,
    backgroundColor: '#ffb408'
  },
  toolbarStyle: {
    minHeight: 40,
    backgroundColor: '#1ebcdb',
    borderBottomColor: '#007cb3',
    borderBottomWidth: 3,
    borderBottomWidth: 2,
    borderBottomStyle: 'solid'
  },

  aboutLogo: {
    width: 120,
    height:120
  },
  textInput: {
    width: 300,
    borderWidth: 2,
    height: 40,
    borderColor: 'black',
    borderRadius: 10,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 5,
    paddingLeft: 20,
    backgroundColor: '#e2e2e2'
  },
  errorFont: {

    fontSize: 15,
    margin: 10,
    color: 'red'
  },
  numberDisplay: {
    height: 100,
    width: 100,
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    borderColor: 'black',
    borderWidth: 3,
    borderRadius: 10,
    margin: 10
  },
  numberText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 30
  },
  leaderItem: {
    borderColor: 'black',
    borderRadius: 5,
    height: 34,
    margin: 3,
    paddingLeft: 10,
    padding: 4,
    width: 300
  },
  leaderItemText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#484848'
  }


});

export { styles }