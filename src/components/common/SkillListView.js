import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  ScrollView,
  Dimensions,
  Image,
} from 'react-native';
import { Icon, Rating } from 'react-native-elements';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import Price from './Price';
import { random_rgba } from '../../utils/random_rgba';
import { Divider } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import CategoryChipView from './CategoryChipView';
import CourseCard from './coursecard';
import { Chip, ActivityIndicator } from 'react-native-paper';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';

const screenWidth = Dimensions.get('screen').width;

export default function SkillListView({ route, navigation }) {
  const { category, skills, title } = route.params;
  const [subCatSelected, setSubCatSelected] = useState([]);
  const [categorySkills, setCategorySkills] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!skills) fetchCategoryData();
    else setCategorySkills(skills);
  }, [subCatSelected]);

  const loadingComponent = () => {
    return (
      <View style={styles.loadingBar}>
        <ActivityIndicator size={35} animating={true} color={'black'} />
      </View>
    );
  };

  const fetchCategoryData = () => {
    setLoading(true);
    fetch('https://teachmeproject.herokuapp.com/getCourseDetailsByCategory', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        category: category.category,
        subcategory: subCatSelected,
      }),
    })
      .then(response => response.json())
      .then(requestedJson => {
        setCategorySkills(requestedJson);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  };

  const showDetails = skill => {
    navigation.navigate('SkillDetail', {
      skill: skill,
    });
  };

  const headerComponent = () => {
    return (
      <View style={styles.header}>
        <Icons
          name={'keyboard-backspace'}
          size={27}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitle}>{title}</Text>
        {/* <Icons
        name={'filter'}
        size={27}
      // onPress={() => props.navigation.goBack()}
      /> */}
      </View>
    );
  };

  const subCategoriesComponent = () => {
    const subCategoryClicked = item => {
      var ind = subCatSelected.indexOf(item);
      if (ind === -1) setSubCatSelected([...subCatSelected, item]);
      else {
        subCatSelected.splice(ind, 1);
        setSubCatSelected([...subCatSelected]);
      }
    };

    return (
      category && (
        <View style={{ marginBottom: 10 }}>
          {!!category.subCategories && !!category.subCategories.length && (
            <Text
              style={{
                padding: 10,
                paddingTop: 0,
                fontSize: 15,
                letterSpacing: 1,
                color: 'black',
                marginTop: 10,
              }}>
              Sub Categories
            </Text>
          )}
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{ marginTop: 5 }}>
            {!!category.subCategories &&
              !!category.subCategories.length &&
              category.subCategories.map((item, index) => {
                return (
                  <Chip
                    style={{
                      color: 'black',
                      margin: 5,
                      padding: 3,
                      borderColor: 'lightgrey',
                      borderWidth: 0.3,
                      backgroundColor: 'rgba(243, 246, 252, 0.7)',
                    }}
                    avatar={
                      item.icon ? (
                        <IconMaterialIcons name={item.icon} size={20} />
                      ) : null
                    }
                    onPress={() => subCategoryClicked(item.name)}
                    selected={subCatSelected.indexOf(item.name) > -1}
                  // selectedColor="green"
                  >
                    {item.name}
                  </Chip>
                );
              })}
          </ScrollView>
          {/* <CategoryChipView data={category.subCategories} keyProp={'name'} /> */}
        </View>
      )
    );
  };

  const noDataComponent = () => {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 120,
        }}>
        <Text style={{ fontSize: 20, letterSpacing: 1 }}>No skills found!</Text>
      </View>
    );
  };

  const skillsListComponent = () => {
    return (
      <View>
        {!!categorySkills &&
          !!categorySkills.length &&
          categorySkills.map(skill => {
            return (
              <CourseCard
                course={skill}
                courseClicked={() => showDetails(skill)}
                cardWidth={screenWidth - 50}
              />
            );
          })}
        {loading && loadingComponent()}
        {(!categorySkills || (categorySkills && !categorySkills.length)) &&
          !loading &&
          !skills &&
          noDataComponent()}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {headerComponent()}
      <ScrollView style={{ padding: 5 }} showsVerticalScrollIndicator={false}>
        {subCategoriesComponent()}
        {skillsListComponent()}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 13,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingBottom: 15,
  },
  headerTitle: {
    fontSize: 19,
    // fontWeight: 'bold',
    marginLeft: 30,
    letterSpacing: 1,
    // color: 'gray',
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
  loadingBar: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
    flex: 1,
  },
});
