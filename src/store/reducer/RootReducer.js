import react from 'react';
import {createStore,combineReducers,applyMiddleware} from 'redux';
import thunk from 'redux-thunk'
import AuthReducer from "./AuthReducer";
import WalletBalanceReducer from "./WalletBalanceReducer";




const RootReducer = createStore(combineReducers({
    AuthReducer:AuthReducer,
    WalletBalanceReducer:WalletBalanceReducer
}),applyMiddleware(thunk));

export default RootReducer;