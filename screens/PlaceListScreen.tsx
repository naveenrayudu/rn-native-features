import React, { useEffect } from 'react'
import { FlatList } from 'react-native'
import { useSelector } from 'react-redux'
import { IRootState } from '../models/store'
import PlaceItem from '../components/PlaceItem'
import { INavigationOptions } from '../models/navigation'
import { getAllPlacesFromDbAction } from '../store/actions/places'
import useThunkDispatch from '../components/useThunkDispatch'

const PlaceListScreen: React.FC<INavigationOptions<"Places">> = ({navigation}) => {
   const places = useSelector((state: IRootState) => state.places.places);
   const dispatch = useThunkDispatch();

   useEffect(() => {
      dispatch(getAllPlacesFromDbAction())
         .then(() => console.log('Places loaded'))
         .catch(() => console.log('Error occured while loading places'));
   }, [])

   console.log(places);

    return (
       <FlatList data={places} keyExtractor={(item, index) => item.id} renderItem={({item}) => (
           <PlaceItem 
            onSelect={() => {
               navigation.navigate("PlaceDetails", {
                id: item.id,
                title: item.name
                })
            }} 
            image= {item.uri}
            address={item.address}
            title={item.name} />
       )} />
    )
}

export default PlaceListScreen
