import { RouteProp, NavigationProp } from "@react-navigation/native"
import { ILocation } from "./location"

export type IRootStackParamList = {
    Places: undefined,
    PlaceDetails: {
        title: string,
        id: string
    },
    NewPlace: {
        location?: ILocation
    },
    Map: {
        location?: ILocation,
        readonly?: boolean,
        title: string
    }
}

export type INavigationOptions<RouteName extends keyof IRootStackParamList> = {
    route: RouteProp<IRootStackParamList, RouteName>,
    navigation: NavigationProp<IRootStackParamList, RouteName>;
}