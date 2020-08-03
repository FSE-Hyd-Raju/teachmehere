import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Modal,
} from 'react-native';
import { ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Steps from './steps/steps';
import { ScrollView } from 'react-native-gesture-handler';
import { Provider } from 'react-native-paper';
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

  backFromSteps = () => {
    this.setState({
      showSteps: false,
      showMainCategories: false,
      showSubCategories: true,
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
      <View style={{ flex: 1, backgroundColor: 'white' }}>
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
                onPress={() => this.showSubCategories(category)}>
                <View key={category.id} style={styles.IconAndName}>
                  <IconMaterialIcons
                    name={category.icon}
                    color="#000"
                    size={30}
                  />
                  <Text>{category.category}</Text>
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
          <Modal animationType="slide" visible={showSteps}>
            <Provider>
              <Steps
                backFromSteps={this.backFromSteps}
                category={activeCategory.category}
                subCategory={activeSubCategory.name}
              />
            </Provider>
          </Modal>
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
