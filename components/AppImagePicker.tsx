import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, Text, Image, Button, Alert, TouchableWithoutFeedback} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import colors from '../constants/colors'
import { ImageInfo } from 'expo-image-picker/build/ImagePicker.types';

const AppImagePicker: React.FC<{
    onImageSelected: (uri: string) => void
}> = ({onImageSelected}) => {
    const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);

    const openImagePickerAsync = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL)

        if (status !== ImagePicker.PermissionStatus.GRANTED) {
            Alert.alert("Permission to access camera roll is required!");
            return;
        }
    
        let pickerResult = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [16, 9],
            quality: 0.5
        });
        if (pickerResult.cancelled) {
            return;
        }
      
       setSelectedImage(pickerResult.uri);
       onImageSelected(pickerResult.uri);
    }

    return (
        <ScrollView contentContainerStyle={styles.imagePicker}>
            <TouchableWithoutFeedback onPress={() => openImagePickerAsync()}>
                <View style={styles.imagePreview}>
                    {
                        !selectedImage ? 
                                (<Text>No image selected</Text>) 
                            :   (<Image source={{
                                    uri: selectedImage
                                }} style={styles.image} />)

                    }
                </View>
            </TouchableWithoutFeedback>
            <Button title='Take Image' color={colors.primary} onPress={() => openImagePickerAsync()} />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    imagePicker: {
        alignItems: 'center',
        marginTop: 20
    },
    imagePreview: {
        width: '100%',
        height: 200,
        marginVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: '#ccc',
        borderBottomWidth: 2,
        overflow: 'hidden'
    },
    image: {
        width: '100%',
        height: '100%'
    }

})

export default AppImagePicker
