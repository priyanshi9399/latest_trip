import {WALLET_BALANCE,FETCH_WALLET_BALANCE} from "../constaint/Constaint";
import { PostAPI } from "./../../services/Service";

export const wallet_balance = (data) => async (dispatch) => {
    const currentBalance = await PostAPI("wallet/getCurrentBalance",{});
   // dispatch({type:WALLET_BALANCE,payload:currentBalance.data.current_balance})
    //dispatch({type:WALLET_BALANCE,payload:data})
}
