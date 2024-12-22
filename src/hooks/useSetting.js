
import react,{useEffect,useState} from 'react';
import {useSelector,useDispatch} from "react-redux";
import { PostAPI } from "../services/Service";
import {toast } from 'react-toastify';


const useSetting = () => {

    const [setting,setSetting]= useState([]);
    useEffect(()=> {
        getSettomgList();
    },[]);

    const getSettomgList = async() => {
        const currentSetting = await PostAPI("setting/site_setting",{});
        //console.log(rechargeResponce);
        if(currentSetting.response_code==500){
            toast.error(currentSetting.message);  
        }
        debugger;
        setSetting(currentSetting.data);
    }

    return [setting];
}

export default useSetting;