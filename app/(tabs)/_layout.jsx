import {View, Text, Image} from 'react-native'
import React from 'react';
import {Tabs, Redirect} from 'expo-router';
import {icons} from '../../constants';

const TabIcon = ({icon, color, name, focused}) => {

    return (
        <View className="items-center justify-center gap-2 ">
            <Image source={icon} resizeMode="contain" tintColor={color} className="w-6 h-6"></Image>
            <Text
                className={`${focused
                    ? 'font-psemibold '
                    : 'font-pregular '} text-xs`}
                style={{
                    color: color
                }}>
                {name}
            </Text>
        </View>
    )
}

const TabsLayout = () => {
    return (
        <> 
        < Tabs screenOptions = {{
            tabBarShowLabel:false,
            tabBarActiveTintColor: '#A7C7E7',
            tabBarInactiveTintColor: '#CDCDE0',
            tabBarStyle:{
                backgroundColor:'#161622',
                height:84,
            }
        }} > <Tabs.Screen
            name="home"
            options={{
                title: 'Home',
                headerShown: false,
                tabBarIcon: ({color, focused}) => (
                    <TabIcon icon={icons.home} color={color} name="Home" focused={focused}/>
                )
            }}></Tabs.Screen>
        <Tabs.Screen
            name="medication"
            options={{
                title: 'Medication',
                headerShown: false,
                tabBarIcon: ({color, focused}) => (
                    <TabIcon
                        icon={icons.medication}
                        color={color}
                        name="Medication"
                        focused={focused}/>
                )
            }}></Tabs.Screen>
        <Tabs.Screen
            name="symptoms"
            options={{
                title: 'Symptoms',
                headerShown: false,
                tabBarIcon: ({color, focused}) => (
                    <TabIcon icon={icons.symptoms} color={color} name="Symptoms" focused={focused}/>
                )
            }}></Tabs.Screen>
        <Tabs.Screen
            name="reminders"
            options={{
                title: 'Reminders',
                headerShown: false,
                tabBarIcon: ({color, focused}) => (
                    <TabIcon
                        icon={icons.reminders}
                        color={color}
                        name="Reminders"
                        focused={focused}/>
                )
            }}></Tabs.Screen>
        <Tabs.Screen
            name="news"
            options={{
                title: 'news',
                headerShown: false,
                tabBarIcon: ({color, focused}) => (
                    <TabIcon icon={icons.news} color={color} name="News" focused={focused}/>
                )
            }}></Tabs.Screen>
    </Tabs>
</>
    )
}

export default TabsLayout