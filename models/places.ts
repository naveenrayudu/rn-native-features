export class Place {
    id: string;
    name: string;
    uri: string;
    address: string;
    lat: number;
    lng: number;
    constructor(id: string, name: string, uri: string, address: string, lat: number, lng: number) {
        this.id = id;
        this.name = name;
        this.uri = uri;
        this.address = address;
        this.lat = lat;
        this.lng = lng;
    }
}

export interface dbPlace {
    id: number,
    title: string;
    imageUri: string;
    address: string;
    lat: number;
    lng: number
}