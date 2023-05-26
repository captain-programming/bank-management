import { ADD_AMOUNT, ALL_TRANSACTION, ERROR, LOADING, LOGIN_SUCCESS } from "./type";
import axios from "axios";

const API = axios.create({baseURL: "http://localhost:8080/"});

export const userLogin = (crds, role, navigate) => async(dispatch)=>{
  dispatch({type: LOADING});
  try{
    let {data} = await API.post("/auth/login", crds, {headers: {role: role}});
    if(role==="admin"){
      navigate('/account');
    }else{
      navigate('/transaction')
    }
    dispatch({type: LOGIN_SUCCESS, payload: data});
  }catch(err){
    console.log(err);
    dispatch({type: ERROR, payload: err?.response?.data});
  }
}

export const AddAmount = (amount, type, accessToken, userId) => async(dispatch)=>{
  dispatch({type: LOADING});
  try{
    let {data} = await API.post("/transiction/transiction-process", {amount: amount, type: type}, {headers: {accessToken: accessToken, userId: userId}});
    dispatch({type: ADD_AMOUNT, payload: data});
  }catch(err){
    console.log(err);
    dispatch({type: ERROR, payload: err?.response?.data});
  }
}

export const AllTransaction = (accessToken, userId) => async(dispatch)=>{
  dispatch({type: LOADING});
  try{
    let {data} = await API.get("/transiction/transiction-list", {headers: {accessToken: accessToken, userId: userId}});
    dispatch({type: ALL_TRANSACTION, payload: data});
  }catch(err){
    console.log(err);
    dispatch({type: ERROR, payload: err?.response?.data});
  }
}