import React from 'react';
import Welcome from './pages/Welcome'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import Logout from './pages/Logout'
import DiscoverRecipes from './pages/DiscoverRecipes'
import PreviewRecipe from './pages/PreviewRecipe'
import Pantry from './pages/Pantry';
import GroceryList from './pages/GroceryList';
import { createStackNavigator, createDrawerNavigator, createAppContainer } from "react-navigation";
import { Provider } from 'react-redux';
import { YellowBox, View, TouchableOpacity, Button } from 'react-native';
import store from './redux/store';
import Icon from 'react-native-vector-icons/Ionicons';
import { DARK_GREEN_BACKGROUND } from './common/SousChefColors';

YellowBox.ignoreWarnings(['ListView is deprecated']);

const AppNavigator = createAppContainer(createStackNavigator({
    Welcome: Welcome,
PreviewRecipe: PreviewRecipe,
    SignUp: SignUp,
    Login: Login,
    Main: {
        screen: createDrawerNavigator(
        {
            DiscoverRecipes: {
                screen: createStackNavigator(
                    {
                        DiscoverRecipes:{
                            screen: DiscoverRecipes,
                            navigationOptions: ({ navigation }) => ({
                                headerLeft: (
                                    <View>
                                        <TouchableOpacity
                                            onPress={() => {navigation.openDrawer()}}
                                        >
                                            <Icon
                                                name="md-menu"
                                                style={{
                                                    color: 'white',
                                                    padding: 10,
                                                    marginLeft:10,
                                                    fontSize: 20
                                                }}/>
                                        </TouchableOpacity>
                                    </View>
                                )
                            })
                        }
                    },
                    {
                        initialRouteName: "DiscoverRecipes"
                    }
                ),
                navigationOptions: {
                    drawerLabel: "Discover"
                },
            },
PreviewRecipe: {
screen: createStackNavigator(
{
PreviewRecipe:{
screen: PreviewRecipe,
navigationOptions: ({ navigation }) => ({
headerLeft: (
<View>
<TouchableOpacity
onPress={() => {navigation.openDrawer()}}
>
<Icon
name="md-menu"
style={{
color: 'white',
padding: 10,
marginLeft:10,
fontSize: 20
}}/>
</TouchableOpacity>
</View>
)
})
}
},
{
initialRouteName: "PreviewRecipe"
}
),
navigationOptions: {
drawerLabel: "Preview"
},
},
            Pantry: createStackNavigator(
                {
                    Pantry:{
                        screen: Pantry,
                        navigationOptions: ({ navigation }) => ({
                            headerLeft: (
                                <View>
                                    <TouchableOpacity
                                        onPress={() => {navigation.openDrawer()}}
                                    >
                                        <Icon
                                            name="md-menu"
                                            style={{
                                                color: 'white',
                                                padding: 10,
                                                marginLeft:10,
                                                fontSize: 20
                                            }}/>
                                    </TouchableOpacity>
                                </View>
                            ),
                            drawerLabel: "Pantry"
                        })
                    }
                },
                {
                    initialRouteName: "Pantry"
                }
            ),
            GroceryList: createStackNavigator(
                {
                    GroceryList:{
                        screen: GroceryList,
                        navigationOptions: ({ navigation }) => ({
                            headerLeft: (
                                <View>
                                    <TouchableOpacity
                                        onPress={() => {navigation.openDrawer()}}
                                    >
                                        <Icon
                                            name="md-menu"
                                            style={{
                                                color: 'white',
                                                padding: 10,
                                                marginLeft:10,
                                                fontSize: 20
                                            }}/>
                                    </TouchableOpacity>
                                </View>
                            ),
                            drawerLabel: "Grocery List"
                        })
                    }
                },
                {
                    initialRouteName: "GroceryList"
                }
            ),
            Logout: createStackNavigator(
                {
                    Logout:{
                        screen: Logout,
                        navigationOptions: ({ navigation }) => ({
                            headerLeft: (
                                <View>
                                    <TouchableOpacity
                                        onPress={() => {navigation.openDrawer()}}
                                    >
                                        <Icon
                                            name="md-menu"
                                            style={{
                                                color: 'white',
                                                padding: 10,
                                                marginLeft:10,
                                                fontSize: 20
                                            }}/>
                                    </TouchableOpacity>
                                </View>
                            ),
                            drawerLabel: "Logout"
                        })
                    }
                },
                {
                    initialRouteName: "Logout"
                }
            )
        },
        {
            initialRouteName: "DiscoverRecipes",
            drawerBackgroundColor: DARK_GREEN_BACKGROUND,
            contentOptions: {
                activeTintColor: "lightgrey",
                inactiveTintColor: "white"
            }
        }
        ),
        navigationOptions: ({ navigation }) => ({
            header: null
        }),
    }
},
{
    initialRouteName: "PreviewRecipe"
}
));

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppNavigator/>
      </Provider>
    );
  }
}
