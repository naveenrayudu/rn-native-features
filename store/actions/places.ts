import { IThunkPromiseAction, IThunkDispatch } from "../../models/store";
import { ADD_PLACES, SET_PLACES } from "./types";
import * as FileSystem from 'expo-file-system';
import db from "../../storage/db";
import { Place } from "../../models/places";
import env from "../../env";
import { ILocation } from "../../models/location";

export const addPlaceAction = (placeName: string, uri: string, location: ILocation): IThunkPromiseAction<void, Place> => async (dispath): Promise<void> => {
    
    const fileName = uri.split('/').pop();
    const currentDirectory = FileSystem.documentDirectory;

    if(!fileName || !currentDirectory)
        throw new Error('Unable to save the file');

    try {
        const geoInfo =  await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${env.googleAPIKey}`)
        const response = await geoInfo.json();
        if(!response.results || !response.results[0].formatted_address) {
            throw new Error('Unable to fetch the saved location info')
        }

        const address = response.results[0].formatted_address;

        await FileSystem.copyAsync({
            from: uri,
            to: currentDirectory + fileName
        })

       const resultSet = await db.insertPlace(placeName, uri, address, location.lat, location.lng);

       dispath({
        type: ADD_PLACES,
        payload: new Place(resultSet.insertId.toString(), placeName, uri, address, location.lat, location.lng)
      })

    } catch (error) {
        throw new Error(error);
    }
}

export const getAllPlacesFromDbAction = (): IThunkPromiseAction<void, Place[]>  =>  async (dispath): Promise<void> => {
    try {
        const dbPlaces =  await db.getPlaces();
        const places = dbPlaces.map(t => new Place(t.id.toString(), t.title, t.imageUri, t.address, t.lat, t.lng));
        dispath({
            type: SET_PLACES,
            payload: places
        })

    } catch (error) {
        throw new Error('Unable to retrieve places');
    }
   
}