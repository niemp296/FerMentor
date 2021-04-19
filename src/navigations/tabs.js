import React from 'react';
import {
    View,
    Image,
    TouchableOpacity
} from 'react-native';
import { createBottomTabNavigator, BottomTabBar } from "@react-navigation/bottom-tabs";

import { Home, Tracking, Profile, Shop} from "../screens"
import { COLORS, icons } from "../../constants";
import Svg, { Path } from 'react-native-svg';
const Tab = createBottomTabNavigator();

const Tabs = () => {
    return (
        <Tab.Navigator
            tabBarOptions={{
                showLabel: false,
            }}>
            <Tab.Screen 
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: ({focused}) => (
                        <Image 
                            source={icons.home}
                            resizeMode="contain"
                            style={{
                                width: 30,
                                height: 30,
                                tintColor: focused ? COLORS.secondary : COLORS.primary
                            }}
                        />
                    ),
                }}
            />
            <Tab.Screen 
                name="Tracking"
                component={Tracking}
                options={{
                    tabBarIcon: ({focused}) => (
                        <Image 
                            source={icons.tracking}
                            resizeMode="contain"
                            style={{
                                width: 43,
                                height: 43,
                                tintColor: focused ? COLORS.secondary : COLORS.primary
                            }}
                        />
                    ),
                }}
            />
            <Tab.Screen 
                name="Shop"
                component={Shop}
                options={{
                    tabBarIcon: ({focused}) => (
                        <Image 
                            source={icons.shop}
                            resizeMode="contain"
                            style={{
                                width: 30,
                                height: 30,
                                tintColor: focused ? COLORS.secondary : COLORS.primary
                            }}
                        />
                    ),
                }}
            />
            <Tab.Screen 
                name="Profile"
                component={Profile}
                options={{
                    tabBarIcon: ({focused}) => (
                        <Image 
                            source={icons.profile}
                            resizeMode="contain"
                            style={{
                                width: 30,
                                height: 30,
                                tintColor: focused ? COLORS.secondary : COLORS.primary
                            }}
                        />
                    ),
                }}
            />
        </Tab.Navigator>
    )
}

export default Tabs;
