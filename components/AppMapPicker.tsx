import React, { useState, useCallback } from 'react';
import { View, Button, Alert, Text, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';
import colors from '../constants/colors';
import { ILocation } from '../models/location';
import MapPreview from './MapPreview';
import { useNavigation } from '@react-navigation/native';

const AppMapPicker: React.FC<{
    location: ILocation | undefined, 
    setLocation: (location: ILocation) => void
}> = ({location, setLocation}) => {

    const [isPickingLocation, setIsPickingLocation] = useState(false);
    const navigation = useNavigation();

    const onPickLocation = async () => {
        const { status } = await Location.requestPermissionsAsync();
        if (status !== Location.PermissionStatus.GRANTED) {
           Alert.alert('Location permissions needed', 'This app needs location permissions to get your location', [{
               text: 'Ok'
           }]);
           return;
        }

        setIsPickingLocation(true);
        let pickedLocation;
        try {
            pickedLocation = await Location.getCurrentPositionAsync({
                timeout: 5000,
                accuracy: 5
            })
        } catch (error) {
           
        }
       
        setIsPickingLocation(false);
        if(!pickedLocation) {
            Alert.alert('Unable to fetch location', 'Unable to fetch your location', [{
                text: 'Ok'
            }]);  
            return;
        }
        setLocation({
            lat: pickedLocation.coords.latitude,
            lng: pickedLocation.coords.longitude
        })
    }

    const onLocationPress = useCallback(() => {
        navigation.navigate('Map', {
            readOnly: false,
            location: location,
            title: 'Choose a Location'
        })
    }, [navigation, location])

    return (
       <View>
            <TouchableOpacity onPress={onLocationPress}>
                <View style={styles.mapPickerView}>
                        <MapPreview stylesProp={styles.locationStyles} locationProps={location} >
                                {
                                    isPickingLocation ? (<ActivityIndicator size='large' color={colors.primary} />)
                                    : <Text>No location chosen yet...</Text>
                                }
                        </MapPreview>
                </View>
           </TouchableOpacity>
           <View style={styles.buttonContainer}>
               <View style={{
                   width: '45%'
               }}>
                    <Button title='Choose my Location' onPress={onPickLocation} color={colors.primary} />
               </View>
               <View style={{
                   width: '45%'
               }}>
                    <Button color={colors.primary} title='Pick a Location' onPress={onLocationPress} />
               </View>
           </View>
       </View>
    )
}

const styles = StyleSheet.create({
    mapPickerView: {
        width: '100%',
        height: 200,
        borderColor: '#ccc',
        borderWidth: 1,
        marginVertical: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    locationStyles: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    buttonContainer: {
       flexDirection:  'row',
       flex: 1,
       justifyContent: 'space-between'
    }
})

export default AppMapPicker
