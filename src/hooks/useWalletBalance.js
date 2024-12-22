
import react,{useEffect,useState} from 'react';
import {useSelector,useDispatch} from "react-redux";
import { PostAPI } from "../services/Service";


const useWalletBalance = () => {

    const [balance,setBalance]= useState(0);
    let dispach = useDispatch();

    useEffect(()=> {
        getOperatorList();
    },[]);

    const getOperatorList = async() => {
        const currentBalance = await PostAPI("wallet/getCurrentBalance",{});
        setBalance(currentBalance.data.current_balance);
    }

    return [balance];
}

export default useWalletBalance 