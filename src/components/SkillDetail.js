import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  ScrollView,
  Image,
} from 'react-native';
import { Icon, Rating } from 'react-native-elements';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';

const SkillDetail = ({ route, navigation }) => {
  const { title } = route.params;
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.header}>
          <Icons
            name={'keyboard-backspace'}
            size={27}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.headerTitle}>{title}</Text>
        </View>
      </View>
      <ScrollView
        style={{
          padding: 5,
        }}>
        <Text>asdasd</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 13,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    marginLeft: 20,
    color: 'gray',
  },
  listview: {
    flexDirection: 'row',
    paddingBottom: 20,
    marginTop: 20,
  },
  skillName: {
    fontWeight: 'bold',
    color: '#444',
    fontSize: 20,
  },
  teacherName: {
    marginTop: 5,
    color: '#444',
    textTransform: 'capitalize',
  },
});

export default SkillDetail;
