import React from 'react';
import { connect } from 'react-redux';
import { View, ScrollView, StyleSheet, Image, Text } from 'react-native';
import { logOutUser } from '../actions/AuthActions';
import { AppText,AppButton, PageSpinner } from '../components/common';
import BlockButton from '../components/BlockButton';
import withDelayedLoading from '../components/hoc/withDelayedLoading';
import Theme from '../Theme';
import RouteNames from '../RouteNames';

import { Avatar, ListItem  } from 'react-native-elements';

class Settings extends React.Component {
  static navigationOptions = {
    header: null,
  };
  onSignOutPress = () => {
    const { navigation, logOutUser } = this.props;
    logOutUser(navigation);
  };
  

  onAccountPress = () => this.props.navigation.navigate(RouteNames.UpdateProfile);
  renderSectionTitle = title => (
    <AppText style={styles.sectionTitle} type="headline">
      {title}
    </AppText>
  );

  render() {
    const { user } = this.props;

    return (
      <View style={styles.container}>
        <ScrollView>
        {/* <AppButton

         text="Account"
        //  subtext={`You are logged in as ${user.username || 'guest'}`}
         color={Theme.colors.danger}
         onPress={this.onAccountPress}
            
         /> */}
        {/* <Avatar
         rounded
         size="xlarge"
         onPress={() => console.log("Works!")}
         activeOpacity={0.7}
          source={{
            uri:
              'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
          }}
          showAccessory
        /> */}
         <View style={styles.header}>
            {/* <View style={styles.headerContent}>
                <Image style={styles.avatar} source={{uri: 'https://bootdey.com/img/Content/avatar/avatar3.png'}}/>
                <Text style={styles.title}>Sucharitha</Text>
            </View> */}
          </View>
          <BlockButton
            text="Account"
            color={Theme.colors.success}
            onPress={this.onAccountPress}
          />
          {/* {this.renderSectionTitle('Account')} */}
          <BlockButton
            text="Sign Out"
            subtext={`You are logged in as ${user.email || 'guest'}`}
            color={Theme.colors.danger}
            onPress={this.onSignOutPress}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background
  },
  sectionTitle: {
    marginLeft: Theme.spacing.base,
    marginVertical: Theme.spacing.tiny,
    fontSize: 18
  },
  header:{
    backgroundColor: Theme.colors.background
  },
  headerContent:{
    padding:30,
    alignItems: 'center',
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "#FF6347",
    marginBottom:10,
  },
  icon:{
    width: 40,
    height: 40,
  },
  title:{
    fontSize:18,
    color:"#EE82EE",
    marginLeft:4
  },
  btn:{
    marginLeft: 'auto',
     width: 40,
    height: 40,
  },
  body: {
    backgroundColor :"#E6E6FA",
  },
  box: {
    padding:5,
    marginBottom:2,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    shadowColor: 'black',
    shadowOpacity: .2,
    shadowOffset: {
      height:1,
      width:-2
    },
    elevation:2
  },
  username:{
    color: "#20B2AA",
    fontSize:22,
    alignSelf:'center',
    marginLeft:10
  }
  
});

const mapStateToProps = ({ auth }) => ({ user: auth.user });

export default connect(
  mapStateToProps,
  { logOutUser }
)(withDelayedLoading(Settings));
