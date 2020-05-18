import {combineReducers, createStore, applyMiddleware, CombinedState, compose} from 'redux';
import placesReducer from './places';
import { IRootState, IDefaultAction } from '../../models/store';
import thunk from 'redux-thunk';
import db from '../../storage/db';


db.init()
  .then(() => {
    console.log('Database Initialized');
    db.getPlaces();
  })
  .catch((error) => console.log('Database Initialized Failed', error));
  

const rootReducer = combineReducers<CombinedState<IRootState>, IDefaultAction<any>>({
    places: placesReducer
})

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//const composeEnhancers = compose;

const middleWares = composeEnhancers(applyMiddleware(thunk));
const store = createStore(rootReducer, middleWares);


export default store;