import react from 'react';
import {WALLET_BALANCE,FETCH_WALLET_BALANCE} from "./../constaint/Constaint";

import { PostAPI} from "./../../services/Service";

const initStateData = {
    balance:0,
    userData:""
}
const WalletBalanceReducer = (state=initStateData,action) => {
    //const balance = useWalletBalance();
    
        if(action.type===WALLET_BALANCE){
            return {balance:action.payload}
        }
        return state;
}

export default WalletBalanceReducer;