import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { AsyncStorage } from "react-native";
import reducers from "../reducers/index";
import {persistReducer} from 'redux-persist';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ["likedJobs"]
};

const persistedReducer = persistReducer(persistConfig, reducers);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(persistedReducer, {}, composeEnhancers(applyMiddleware(thunk)));

export default store;
