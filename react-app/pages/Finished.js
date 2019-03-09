import React from 'react';
import { Button, StyleSheet, Platform, Image, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { AppRegistry, TextInput } from 'react-native';
import { Dimensions } from 'react-native';
import firebase from 'react-native-firebase';
import { connect } from 'react-redux';
import { getPantryItemsToRemove } from '../redux/actions/PantryAction';
import { BUTTON_BACKGROUND_COLOR } from '../common/SousChefColors';
import {
  getIsFavorited,
  saveIsFavorited,
  saveIsRecent,
} from '../redux/actions/FavoritedAction';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';

class Finished extends React.Component {
  static navigationOptions = {
    title: "Finished",
    headerVisible: true,
    headerTintColor: "white",
    headerLeft: null,
    headerStyle: {
      backgroundColor: BUTTON_BACKGROUND_COLOR,
    },
    headerTitleStyle: {
      fontFamily: "Avenir",
      fontSize: 30,
      textAlign: 'left',
    },
  }
  constructor(props) {
    super(props);
    this.state = {
      recipeID: null,
      ingredients: null,
      isFavorited: null,
    };
    this.listIngredients = this.listIngredients.bind(this);
  }

  componentWillMount(){
    this.setState({
      recipeID: this.props.navigation.getParam("recipeID"),
      // TODO: fix getIngredientsToRemove
      ingredients: this.props.navigation.getParam("ingredients"),
      // ingredients: this.props.getPantryItemsToRemove(),
    });
    console.log(this.state.ingredients)
    console.log("items to remove", this.props.getPantryItemsToRemove(this.props.userID, this.props.navigation.getParam("ingredients")))
    this.props.getIsFavorited(this.props.userID, this.props.navigation.getParam("recipeID"))
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.isFavorited !== this.props.isFavorited) {
      this.setState({isFavorited: nextProps.isFavorited})
    }
    console.log(this.state.ingredients)
    console.log("items to remove", this.props.getPantryItemsToRemove(this.props.userID, this.props.navigation.getParam("ingredients")))
    
    console.log("finished state", this.state)
  }


  removeItem(ingredientIndex){
    var newIngredients = [...this.state.ingredients];
    newIngredients.splice(ingredientIndex, 1);
    this.setState({
      ingredients: newIngredients
    });
  }

  updatePantry() {
    this.props.saveIsFavorited(
      this.props.userID, 
      this.state.recipeID, 
      this.state.isFavorited
    )
    this.props.saveIsRecent(this.props.userID, this.state.recipeID)

    const ingredients = this.state.ingredients.reduce(function(map, item) {
        map[item.ingredient] = item;
        return map;
    }, {});
    this.props.setIngredientsToRemove(this.state.ingredients);
    this.props.navigation.navigate('Pantry', {
      ingredientsToRemove: this.state.ingredients
    });
  }

  listIngredients(){
    if(this.state.ingredients == null){
      console.warn("null");
    }
    return this.state.ingredients.map((ingredient, index) => {
      if(!ingredient.ingredient){
        return null;
      }

      return (
        <View style={{flexDirection: 'row',}}>
          <Text style={styles.detail}>{ingredient.ingredient}</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.removeItem(index)}
            >
            <Text> Delete Item </Text>
          </TouchableOpacity>
        </View>
      );
    });
  }

  render() {
    return (
      <View>
        <ScrollView>
          <View style={styles.container}>
            {this.listIngredients()}
            <TouchableOpacity
              style={styles.buttonBig}
              onPress={() => this.updatePantry()}
              >
              <Text>Update Pantry</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <ActionButton 
          buttonColor={BUTTON_BACKGROUND_COLOR} 
          onPress={() => {
            this.setState({
              isFavorited: !this.state.isFavorited
            })
          }}
          renderIcon={() => {
            if (this.state.isFavorited)
                return (
                    <Icon 
                        name="md-heart" 
                        style={styles.actionButtonIcon}
                    />
                );
            else 
                return (
                    <Icon 
                        name="md-heart-empty" 
                        style={styles.actionButtonIcon}
                    />
                ); 
            }}
          />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: BUTTON_BACKGROUND_COLOR,
    paddingTop: 40,
    paddingLeft: 10,
    paddingBottom: 10,
    paddingRight: 10,
  },
  input: {
    height: 30,
    width: Dimensions.get('window').width - 20,
    borderColor: 'gray',
    borderWidth: 1,
  },
  multilineInput: {
    height: 60,
    width: Dimensions.get('window').width - 20,
    borderColor: 'gray',
    borderWidth: 1,
  },
  detail:{
    fontSize: 15,
    fontFamily: "Avenir",

  },
  title: {
    fontSize: 20,
  },
  button: {
    alignItems: 'center',
    backgroundColor: BUTTON_BACKGROUND_COLOR,
    padding: 3,
    width: 120,
    borderRadius:5,
    margin: 5,
  },
  buttonBig: {
    alignItems: 'center',
    backgroundColor: BUTTON_BACKGROUND_COLOR,
    padding: 10,
    width: 200,
    borderRadius:5,
    margin: 5,
  },
});

const mapStateToProps = state => {
  return {
    userID: state.userInfo.userID,
    isFavorited: state.favoritedTracker.isFavorited
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getPantryItemsToRemove: (userID, ingredients) => {
      getPantryItemsToRemove(userID, ingredients);
    },
    getIsFavorited: (userID, recipeID) => {
      dispatch(getIsFavorited(userID, recipeID))
    },
    saveIsFavorited: (userID, recipeID, isFavorited) => {
      saveIsFavorited(userID, recipeID, isFavorited)
    },
    saveIsRecent: (userID, recipeID) => {
      saveIsRecent(userID, recipeID)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Finished)
