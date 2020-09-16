import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from 'redux-thunk'

import AppReducer from './reducers/AppReducer';


const store = createStore(combineReducers({
    app: AppReducer
}), applyMiddleware(thunk));


export default store