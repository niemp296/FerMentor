import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
// import Home from '../screens/Home';
// import Tracking from '../screens/Tracking';
// import Profile from '../screens/Profile';
import {Home, Tracking, Profile, SignIn} from '../screens/';


const createStackNavigatorOptions = {
    headershown : false
}

const AppNavigator = createStackNavigator({
    Home:{screen:Home},
    Tracking:{screen:Tracking},
    Profile:{screen:Profile},
    SignIn:{screen:SignIn}
},

{
    defaultNavigationOptions:createStackNavigatorOptions
});

export default createAppContainer(AppNavigator)

