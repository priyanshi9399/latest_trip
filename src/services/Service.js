import axios from "axios";
import { API_BASE_URL, REACT_APP_API_NODE } from "./../utils/config";

export const Dologin = async (payload) => {
  try {
    const { data } = await axios.post(
      `${API_BASE_URL}auth/dologin`,
      payload);
    return data;
  } catch (err) {
    return err.response.data    
  }
};

export const UserRegister = async (payload) => {
  try {
    const { data } = await axios.post(
      `${API_BASE_URL}auth/register`,
      payload);
    return data;
  } catch (err) {
    return err.response.data    
  }
};


export const PostAPIWithNode = async (url,payload) => {

  const headers = {
  'Content-Type': 'application/json',
  'Sessionkey': localStorage.getItem("token")
  } 
  try {
    const { data } = await axios.post(
      `${REACT_APP_API_NODE}${url}`,
      payload,{headers:headers});
    return data;
  } catch (err) {
    debugger;
    if(err && typeof err.response=='undefined'){
      var resObj = { "response_code": 500, "data": {}, "message": "Something went wrong, please contact admin." }
      var testData = resObj;
      return testData;
    }else{

      if(err.response.data.response_code=='401'){
        localStorage.clear();
        window.location.href = "/login";
      }
     

    }
    return err.response.data    
  }
};

export const PostAPI = async (url,payload) => {

  const headers = {
  'Content-Type': 'application/json',
  'Sessionkey': localStorage.getItem("token")
  } 
  try {
    const { data } = await axios.post(
      `${API_BASE_URL}${url}`,
      payload,{headers:headers});
    return data;
  } catch (err) {
    debugger;
    if(err && typeof err.response=='undefined'){
      var resObj = { "response_code": 500, "data": {}, "message": "Something went wrong, please contact admin." }
      var testData = resObj;
      return testData;
    }else{

      if(err.response.data.response_code=='401'){
        localStorage.clear();
        window.location.href = "/login";
      }
     

    }
    return err.response.data    
  }
};



export const PostAPIWithImageUpload = async (url,payload,multoformdata="") => {

  if(multoformdata!=""){
    multoformdata = 'multipart/form-data'
  }

  const headers = {
  'Content-Type': 'application/json',
  'Content-Type': multoformdata,
  'Sessionkey': localStorage.getItem("token")
  } 
  try {
    const { data } = await axios.post(
      `${API_BASE_URL}${url}`,
      payload,{headers:headers});
    return data;
  } catch (err) {
    debugger;
    if(err && typeof err.response=='undefined'){
      var resObj = { "response_code": 500, "data": {}, "message": "Something went wrong, please contact admin." }
      var testData = resObj;
      return testData;
    }else{

      if(err.response.data.response_code=='401'){
        localStorage.clear();
        window.location.href = "/login";
      }
     

    }
    return err.response.data    
  }
};
