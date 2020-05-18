import React from 'react'
import { View, Image, StyleSheet, ViewStyle } from 'react-native'
import { ILocation } from '../models/location'
import env from '../env';

const MapPreview: React.FC<{
    locationProps: ILocation | undefined,
    stylesProp?: ViewStyle
}> = ({ locationProps, children, stylesProp }) => {
    const url = `https://maps.googleapis.com/maps/api/staticmap?center=${locationProps?.lat},${locationProps?.lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:C%7C${locationProps?.lat},${locationProps?.lng}&key=${env.googleAPIKey}`;
    return (
        <View style={{...styles.mapPreview, ...stylesProp}}>
            {
                locationProps !== undefined ? (<Image style={styles.mapPreview} source={{
                    uri: url
                }} />) : children 
            }
        </View>
    )
}

const styles = StyleSheet.create({
    mapPreview: {
        width: '100%',
        height: '100%'
    }
})

export default MapPreview
