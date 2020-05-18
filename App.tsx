import 'react-native-gesture-handler';
import React from 'react';
import {Provider} from 'react-redux';
import { enableScreens } from 'react-native-screens';
import Navigation from './navigation/Navigation';
import store from './store/reducers';



enableScreens();


export default function App() {
  return (
    <Provider store={store}>
       <Navigation />
    </Provider>
  );
}
