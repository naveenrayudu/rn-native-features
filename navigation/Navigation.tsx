import React from 'react';
import { NavigationContainer, Route, RouteProp, NavigationProp } from '@react-navigation/native';
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';
import { IRootStackParamList, INavigationOptions } from '../models/navigation';
import PlaceListScreen from '../screens/PlaceListScreen';
import PlaceDetailsScreen from '../screens/PlaceDetailsScreen';
import NewPlaceScreen from '../screens/NewPlaceScreen';
import MapScreen from '../screens/MapScreen';
import { Platform } from 'react-native';
import colors from '../constants/colors';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import IoniconsHeaderButton from './CustomNavigationButtons/IoniconsHeaderButton';

const Stack = createStackNavigator<IRootStackParamList>();

const screenOptions = (props: {
    route: Pick<Route<keyof IRootStackParamList>, "key" | "name">;
    navigation: any;
}): StackNavigationOptions => {
    return {
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? colors.primary : 'white'
        },
        headerTintColor: Platform.OS === 'android' ? 'white' : colors.primary
    }
}


const placeScreenOptions = (screenProps: INavigationOptions<"Places">): StackNavigationOptions => ({
    title: 'Places',
    headerRight: (props) => {
        return (
            <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
                <Item title='Add Place' iconName='ios-add-circle-outline' onPress={() => screenProps.navigation.navigate('NewPlace')}/>
            </HeaderButtons>
        )
    }
})

const mapScreenOptions = (screenProps: INavigationOptions<"Map">): StackNavigationOptions => ({
    title: 'Choose a Location'
})

const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Places' screenOptions={screenOptions}>
                <Stack.Screen name='Places' component={PlaceListScreen} options={placeScreenOptions}  />
                <Stack.Screen name='PlaceDetails' component={PlaceDetailsScreen} options={(props) => {
                    return {
                        title: props.route.params.title
                    }
                }} />   
                <Stack.Screen name='NewPlace' component={NewPlaceScreen} options={{
                    title: 'Add Place'
                }} initialParams={{location: undefined}} />
                <Stack.Screen name='Map' component={MapScreen} options={mapScreenOptions} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation
