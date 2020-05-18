import * as SQLite from 'expo-sqlite';
import { Place, dbPlace } from '../models/places';
const database = SQLite.openDatabase('places.db');

const init = () => {
    return new Promise((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql("CREATE TABLE IF NOT EXISTS places (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, imageUri TEXT NOT NULL, address TEXT NOT NULL, lat REAL NOT NULL, lng REAL NOT NULL)", 
            [],
            () => {resolve()},
            (_, err) => {
                reject(err);
                return false;
            } )
        })
    });
}


const insertPlace = (title: string, image: string, address: string, lat: number, lng: number): Promise<SQLResultSet> => {
    return new Promise((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql("INSERT INTO places(title, imageUri, address, lat, lng) values(?, ?, ?, ?, ?)", 
            [title, image, address, lat, lng],
            (_, result) => {resolve(result)},
            (_, err) => {
                reject(err);
                return false;
            } )
        })
    });
}

const getPlaces = (): Promise<dbPlace[]> => {
    return new Promise((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql("SELECT * from places", 
            [],
            (_, result) => { 
               const places = Array.from({
                    length: result.rows.length
                }, (v, i) => {
                    return result.rows.item(i) as dbPlace;
                })
                resolve(places);
            },
            (_, err) => {
                reject(err);
                return false;
            } )
        })
    });
}

const db = {
    init: init,
    insertPlace: insertPlace,
    getPlaces: getPlaces
}

export default db;