import {createStore,combineReducers,applyMiddleware} from 'redux'
import thunk from "redux-thunk";
import { reducerAuth } from './reducer';
const combinedReducers =  combineReducers({
   reducerAuth:reducerAuth,
})
// NOTE: use this store variable to create a store.
const store = createStore(combinedReducers,applyMiddleware(thunk));


export { store };