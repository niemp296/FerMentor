import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { Home, Tracking, Profile, 
  Recipes, Conversion, Discussion, RecipeDetail, SignIn, SignUp } from './src/screens';
import Tabs from './src/navigations/tabs';
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";

const loadFonts = () => {
  return Font.loadAsync({
    "Poppins-SemiBold": require("./assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf")
  });
}

const Stack = createStackNavigator();

const App = () => {
  const [fontLoaded, setFontLoaded] = useState(false);
  //AppLoading till fonts are loaded
  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={loadFonts} //calling the loadFonts helper function
        onFinish={() => setFontLoaded(true)} //set fontLoaded to true
        onError={(err) => console.error(err)}
      />
    );
  }
  return (
    <NavigationContainer>
      <Stack.Navigator
      screenOptions={{
                headerShown: false
              }}
              initialRouteName={"SignIn"}>
        <Stack.Screen name="SignIn" component={SignIn}/>
        <Stack.Screen name="SignUp" component={SignUp}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
  // return (
  //   <NavigationContainer>
  //     <Stack.Navigator
  //       screenOptions={{
  //         headerShown: false
  //       }}
  //       initialRouteName={"Home"}>
  //       <Stack.Screen name="Home" component={Tabs}/>
  //       <Stack.Screen name="Tracking" component={Tracking}/>
  //       <Stack.Screen name="Profile" component={Profile}/>
  //       <Stack.Screen name="Recipes" component={Recipes}/>
  //       <Stack.Screen name="Conversion" component={Conversion}/>
  //       <Stack.Screen name="Discussion" component={Discussion}/>
  //       <Stack.Screen name="RecipeDetail" component={RecipeDetail}/>
  //       <Stack.Screen name="SignIn" component={SignIn}/>
  //     </Stack.Navigator>
  //   </NavigationContainer>
  // )
}

export default App;