import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import { ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Steps from './steps/steps';
import { ScrollView } from 'react-native-gesture-handler';
const categories = require('./categories.json');

export default class Post extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showMainCategories: true,
      showSubCategories: false,
      showSteps: false,
      activeCategory: {},
      activeSubCategory: {},
    };
  }

  showSubCategories = category => {
    this.setState({
      activeCategory: category,
      showMainCategories: false,
      showSubCategories: true,
      showSteps: false,
    });
  };

  showSteps = subCategory => {
    this.setState({
      showMainCategories: false,
      showSubCategories: false,
      showSteps: true,
      activeSubCategory: subCategory,
    });
  };

  keyExtractor = (item, index) => index.toString();
  renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => this.showSteps(item)}>
      <ListItem title={item.name} bottomDivider chevron />
    </TouchableOpacity>
  );

  goToMainCategories = () => {
    this.setState({
      activeCategory: {},
      activeSubCategory: {},
      showMainCategories: true,
      showSubCategories: false,
      showSteps: false,
    });
  };

  goToSubCategories = () => {
    this.setState({
      activeSubCategory: {},
      showMainCategories: false,
      showSubCategories: true,
      showSteps: false,
    });
  };

  render() {
    const {
      showMainCategories,
      showSubCategories,
      activeCategory,
      activeSubCategory,
      showSteps,
    } = this.state;

    return (
      <View style={{ flex: 1, backgroundColor: '#F5FCFF' }}>
        {showMainCategories && (
          <Text style={styles.heading}>What do you want to teach?</Text>
        )}
        {showSubCategories && (
          <View>
            <TouchableOpacity
              onPress={this.goToMainCategories}
              style={styles.backButton}>
              <Icon name="md-arrow-round-back" size={28} color="#000" />
            </TouchableOpacity>
            <Text style={styles.heading}>{activeCategory.categoryName}</Text>
          </View>
        )}
        {showSteps && (
          <View>
            <TouchableOpacity
              onPress={this.goToSubCategories}
              style={styles.backButton}>
              <Icon name="md-arrow-round-back" size={28} color="#000" />
            </TouchableOpacity>
            <Text style={styles.subCategoryHeading}>
              {activeCategory.categoryName}
              {`  >  ${activeSubCategory.name}`}
            </Text>
          </View>
        )}

        <ScrollView contentContainerStyle={styles.container}>
          {showMainCategories &&
            categories &&
            categories.map(category => (
              <TouchableOpacity
                key={category.id}
                style={styles.category}
                onPress={() => this.showSubCategories(category)}>
                <View key={category.id} style={styles.IconAndName}>
                  <IconMaterialIcons
                    name={category.iconName}
                    color="#000"
                    size={30}
                  />
                  <Text>{category.categoryName}</Text>
                </View>
              </TouchableOpacity>
            ))}
          {showSubCategories && (
            <FlatList
              keyExtractor={this.keyExtractor}
              data={activeCategory.subCategories}
              renderItem={this.renderItem}
            />
          )}
        </ScrollView>
        {showSteps && (
          <Steps category={activeCategory} subCategory={activeSubCategory} />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  heading: {
    color: '#444',
    fontSize: 22,
    padding: 25,
    textAlign: 'center',
  },
  container: {
    backgroundColor: '#F5FCFF',
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
    color: '#444',
    fontSize: 15,
    padding: 30,
    marginLeft: 40,
  },
});
