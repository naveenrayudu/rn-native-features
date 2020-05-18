import React from 'react'
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { INavigationOptions } from '../models/navigation'
import { useSelector } from 'react-redux'
import { IRootState } from '../models/store'
import MapPreview from '../components/MapPreview'
import colors from '../constants/colors'
import { ILocation } from '../models/location'

const PlaceDetailsScreen: React.FC<INavigationOptions<"PlaceDetails">> = ({ navigation, route }) => {
    const placeInfo = useSelector((state: IRootState) => state.places.places.find(t => t.id === route.params.id));


    if (!placeInfo)
        return (<View style={styles.detailsContainer}>
            <Text style={styles.address}>No Place found!!!</Text>
        </View>)

    const onLocationPress = () => {
        navigation.navigate('Map', {
            readonly: true,
            location: {
                lat: placeInfo.lat,
                lng: placeInfo.lng
            },
            title: placeInfo.address
        })
    }

    return (
        <ScrollView contentContainerStyle={styles.detailsContainer}>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={{
                    uri: placeInfo.uri
                }} />
            </View>

            <TouchableOpacity style={{
                width: '90%',
                marginTop: 20
            }} onPress={onLocationPress}>
                <View style={styles.addressContainer}>
                    <View>
                        <Text style={styles.address}>{placeInfo.address}</Text>
                    </View>

                    <MapPreview locationProps={{
                        lat: placeInfo.lat,
                        lng: placeInfo.lng
                    }} stylesProp={styles.mapStyle} />

                </View>
            </TouchableOpacity>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    detailsContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageContainer: {
        width: '100%',
        height: 250
    },
    image: {
        height: '100%',
        width: '100%'
    },
    addressContainer: {
        marginVertical: 10,
        width: '100%',
        padding: 10,
        backgroundColor: 'white'
    },
    address: {
        fontSize: 18,
        textAlign: 'center',
        lineHeight: 26,
        color: colors.primary
    },
    mapStyle: {
        height: 200,
        width: '100%',
        marginTop: 20,
        borderColor: '#ccc',
        borderWidth: 2
    }
})

export default PlaceDetailsScreen
