import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Modal,
  BackHandler,
} from 'react-native';
import { ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Steps from './steps/steps';
import { ScrollView } from 'react-native-gesture-handler';
import { Provider } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { homeSelector } from '../../../redux/slices/homeSlice';
import { loginSelector } from '../../../redux/slices/loginSlice';

export default function Post(props) {
  const { homeData } = useSelector(homeSelector);
  const categories = homeData['categories'];
  const { userInfo } = useSelector(loginSelector);

  const [state, setState] = useState({
    showMainCategories: true,
    showSubCategories: false,
    showSteps: false,
    activeCategory: {},
    activeSubCategory: {},
  });

  const backButtonHandler = () => {
    return BackHandler.addEventListener('hardwareBackPress', () => {
      if (showSubCategories) {
        goToMainCategories();
        return true;
      } else if (showSteps) {
        backFromSteps();
        return true;
      }
      return false;
    });
  };

  useEffect(() => {
    console.log(activeCategory);
    let backhandler = backButtonHandler();
    return () => {
      backhandler.remove();
    };
  });

  const showSubCategoriesFun = category => {
    if (userInfo._id) {
      setState({
        ...state,
        activeCategory: category,
        showMainCategories: false,
        showSubCategories: true,
        showSteps: false,
      });
    } else {
      props.navigation.navigate('Login');
      return;
    }
  };

  const showStepsFun = subCategory => {
    setState({
      ...state,
      showMainCategories: false,
      showSubCategories: false,
      showSteps: true,
      activeSubCategory: subCategory,
    });
  };

  const keyExtractor = (item, index) => index.toString();

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => showStepsFun(item)}>
      <ListItem title={item.name} bottomDivider chevron />
    </TouchableOpacity>
  );

  const goToMainCategories = () => {
    setState({
      ...state,
      activeCategory: {},
      activeSubCategory: {},
      showMainCategories: true,
      showSubCategories: false,
      showSteps: false,
    });
  };

  const backFromSteps = () => {
    setState({
      ...state,
      showSteps: false,
      showMainCategories: false,
      showSubCategories: true,
    });
  };

  const {
    showMainCategories,
    showSubCategories,
    activeCategory,
    activeSubCategory,
    showSteps,
  } = state;

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      {showMainCategories && (
        <Text style={styles.heading}>What do you want to teach?</Text>
      )}
      {!!showSubCategories && (
        <View>
          <TouchableOpacity
            onPress={goToMainCategories}
            style={styles.backButton}>
            <Icon name="arrow-back" size={28} color="#000" />
          </TouchableOpacity>
          <Text style={styles.heading}>{activeCategory.category}</Text>
        </View>
      )}

      <ScrollView contentContainerStyle={styles.container}>
        {showMainCategories &&
          categories &&
          categories.map(category => (
            <TouchableOpacity
              key={category.id}
              style={styles.category}
              onPress={() => showSubCategoriesFun(category)}>
              <View key={category.id} style={styles.IconAndName}>
                <IconMaterialIcons
                  name={category.icon}
                  color="#000"
                  size={30}
                />
                <Text style={{ textAlign: 'center' }}>{category.category}</Text>
              </View>
            </TouchableOpacity>
          ))}
        {showSubCategories && (
          <FlatList
            keyExtractor={keyExtractor}
            data={activeCategory.subCategories}
            renderItem={renderItem}
          />
        )}
      </ScrollView>
      {showSteps && (
        <View style={{ flex: 2000 }}>
          <Provider>
            <Steps
              backFromSteps={backFromSteps}
              category={activeCategory.category}
              subCategory={activeSubCategory.name}
              navigation={props.navigation}
              goToMainCategories={goToMainCategories}
            />
          </Provider>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    color: '#444',
    fontSize: 20,
    padding: 25,
    textAlign: 'center',
  },
  container: {
    backgroundColor: 'white',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  category: {
    width: Dimensions.get('window').width / 2,
    borderRightWidth: 0.8,
    borderBottomWidth: 0.8,
    borderColor: '#C0C0C0',
    padding: 30,
    alignItems: 'center',
  },
  IconAndName: {
    alignItems: 'center',
  },
  backButton: {
    zIndex: 1,
    position: 'absolute',
    margin: 27,
  },
  subCategoryHeading: {
    marginLeft: 20,
    marginTop: 20,
  },
});
