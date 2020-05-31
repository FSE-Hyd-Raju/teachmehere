import React from 'react';
import { View, StyleSheet } from 'react-native';
import SkillFetchList from '../../components/SkillComponents/SkillFetchList';
import withDelayedLoading from '../../components/hoc/withDelayedLoading';
import Theme from '../../Theme';

class SkillsListScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('title', ' '),
  });

  render() {
    const { fetchFunction } = this.props;
    return (
      <View style={styles.container}>
        <SkillFetchList fetchFunction={fetchFunction} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
});

export default withDelayedLoading(SkillsListScreen);
