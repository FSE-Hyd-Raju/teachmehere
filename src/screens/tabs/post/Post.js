import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Modal,
  BackHandler
} from 'react-native';
import { ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Steps from './steps/steps';
import { ScrollView } from 'react-native-gesture-handler';
import { Provider } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import {
  homeSelector
} from '../../../redux/slices/homeSlice';

export default function Post(props) {
  // constructor(props) {
  //   super(props);
  const { homeData } = useSelector(homeSelector);
  const categories = homeData["categories"];

  const [state, setState] = useState(
    {
      showMainCategories: true,
      showSubCategories: false,
      showSteps: false,
      activeCategory: {},
      activeSubCategory: {},
    }
  );

  // const [showSubCategories, setShowSubCategories] = useState(false);
  // const [showMainCategories, setShowMainCategories] = useState(true);
  // const [showSteps, setShowSteps] = useState(false);
  // const [activeCategory, setActiveCategory] = useState({});
  // const [activeSubCategory, setActiveSubCategory] = useState({});



  // this.state = {
  //   showMainCategories: true,
  //   showSubCategories: false,
  //   showSteps: false,
  //   activeCategory: {},
  //   activeSubCategory: {},
  // };
  // }


  const backButtonHandler = () => {
    return BackHandler.addEventListener('hardwareBackPress', () => {
      if (showSubCategories) {
        goToMainCategories()
        return true;
      } else if (showSteps) {
        backFromSteps();
        return true;
      }
      return false;
    });
  };

  useEffect(() => {
    console.log(activeCategory)
    let backhandler = backButtonHandler();
    return () => {
      backhandler.remove();
    };
  });

  const showSubCategoriesFun = category => {
    // alert(JSON.stringify(category))
    setState({
      ...state,
      activeCategory: category,
      showMainCategories: false,
      showSubCategories: true,
      showSteps: false,
    });
    // setState({
    // setActiveCategory(category)
    // setShowMainCategories(false)
    // setShowSubCategories(true)
    // setShowSteps(false)
    // alert(showSubCategories)

    // });
  };

  const showStepsFun = subCategory => {
    setState({
      // setActiveSubCategory(subCategory)
      // setShowMainCategories(false)
      // setShowSubCategories(false)
      // setShowSteps(true)
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
    // setActiveSubCategory({})
    // setActiveCategory({})
    // setShowMainCategories(true)
    // setShowSubCategories(false)
    // setShowSteps(false)
    setState({
      ...state,
      activeCategory: {},
      activeSubCategory: {},
      showMainCategories: true,
      showSubCategories: false,
      showSteps: false,
    });
  };

  // const goToSubCategories = () => {
  //   setState({
  //     activeSubCategory: {},
  //     showMainCategories: false,
  //     showSubCategories: true,
  //     showSteps: false,
  //   });
  // };

  const backFromSteps = () => {
    // setShowMainCategories(false)
    // setShowSubCategories(true)
    // setShowSteps(false)
    setState({
      ...state,
      showSteps: false,
      showMainCategories: false,
      showSubCategories: true,
    });
  };

  // render() {
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
                <Text style={{ textAlign: "center" }}>{category.category}</Text>
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
            />
          </Provider>
        </View>
      )}

    </View>
  );
}
// }

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
