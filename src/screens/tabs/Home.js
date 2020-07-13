import React from 'react';
import { withNavigationFocus } from 'react-navigation';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import Theme from '../../Theme';



class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.bottomContainer}>
         <Text>Home</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    //backgroundColor: Theme.colors.background,
  },
  search: {
    marginVertical: Theme.spacing.tiny,
  },
  bottomContainer: {
    flex: 1,
  },
});

export default Home;
