import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers/RootReducer.js";
import thunk from 'redux-thunk';

const initialstate = {};

const store = createStore(rootReducer, initialstate, applyMiddleware(thunk));

store.subscribe(
    () => {
        console.log('Store Updated..');
    }
);

export default store;