import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { StyleSheet } from 'react-native';
import MapView, {Marker, MapEvent} from 'react-native-maps';
import { ILocation } from '../models/location';
import { INavigationOptions, IRootStackParamList } from '../models/navigation';
import { useNavigationState } from '@react-navigation/native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import IoniconsHeaderButton from '../navigation/CustomNavigationButtons/IoniconsHeaderButton';

const MapScreen: React.FC<INavigationOptions<"Map">> = ({navigation, route}) => {
    const navigationState  = useNavigationState(state => state);
    const [location, setLocation] = useState<ILocation|undefined>(route.params.location);


    const initialRegion = useMemo(() => {
       return {
        latitude: location?.lat || 37.78825,
        longitude: location?.lng || -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
       }
    }, [location]);

    const onLocationPress = useCallback((event: MapEvent) => {
        setLocation({
            lat: event.nativeEvent.coordinate.latitude,
            lng: event.nativeEvent.coordinate.longitude
        })
    }, [setLocation]);

    React.useLayoutEffect(() => {
        navigation.setOptions({
          title: route.params.title,
          headerRight: () => {
                if(route.params.readonly)
                    return null;

                return (
                    <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
                        <Item title='Save' iconName='ios-save' onPress={() => {
                            const route = navigationState.routes[navigationState.routes.length - 2];
                            navigation.navigate(route.name as keyof IRootStackParamList, {
                                location: location
                            });
                        }}/>
                    </HeaderButtons>
                )
          }
        });
      }, [navigation, navigationState.routes.length, location, route.params.readonly])

    return (
 
           <MapView style={styles.mapView} region={initialRegion} onPress={(event) => {!route.params.readonly && onLocationPress(event)}}>
               {
                   location? <Marker coordinate={{latitude: location.lat, longitude: location.lng}}  /> : null
               }
           </MapView>
       
    )
}

const styles = StyleSheet.create({
    mapView: {
        width: '100%',
        height: '100%'
    }
})

export default MapScreen
