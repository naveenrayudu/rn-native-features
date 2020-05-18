import React, { useState, useCallback, useEffect } from 'react'
import { View, Text, KeyboardAvoidingView, ScrollView, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native'
import colors from '../constants/colors';
import useThunkDispatch from '../components/useThunkDispatch';
import { addPlaceAction } from '../store/actions/places';
import { INavigationOptions } from '../models/navigation';
import AppImagePicker from '../components/AppImagePicker';
import AppMapPicker from '../components/AppMapPicker';
import { ILocation } from '../models/location';


const NewPlaceScreen: React.FC<INavigationOptions<"NewPlace">> = ({navigation, route}) => {

    const [placeValue, setPlaceValue] = useState('');
    const [selectedImage, setSelectedImage] = useState('');
    const [pickedLocation, setPickedLocation] = useState(route.params.location)

    const thunkDispatch = useThunkDispatch();

    const onButtonPress = useCallback((value: string, selectedImage: string, pickedLocation: ILocation) => {
        thunkDispatch(addPlaceAction(value, selectedImage, pickedLocation))
            .then(() => {
                navigation.navigate("Places")
            })
            .catch(e => console.log(e))
    }, [thunkDispatch])

    useEffect(() => {
        setPickedLocation(route.params.location);
    }, [route.params.location])

 
    return (
        <KeyboardAvoidingView style={{
            flex: 1
        }}>
            <ScrollView contentContainerStyle={styles.form}>
                <View>
                    <Text style={styles.label}>Place Name</Text>
                    <TextInput style={styles.input} value={placeValue} onChangeText={setPlaceValue} />
                </View>
                <AppImagePicker onImageSelected={setSelectedImage} />
                
                <AppMapPicker location={pickedLocation} setLocation={setPickedLocation} />
               
                <View style={styles.buttonContainer}>
                    <Button color={colors.primary} disabled={!placeValue.trim() || !selectedImage || !pickedLocation} title='Save Place' onPress={() => onButtonPress(placeValue, selectedImage, pickedLocation!)} />    
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}


const styles  = StyleSheet.create({
    form: {
        margin: 20,
        backgroundColor: 'white',
        padding: 20
    },
    label: {
        fontSize: 16,
        marginBottom: 15,
        color: '#787a79'
    },
    input: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 2
    },
    buttonContainer: {
        marginVertical: 15
    }
})

export default NewPlaceScreen
