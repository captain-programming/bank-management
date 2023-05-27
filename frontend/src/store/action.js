import { ADD_AMOUNT, ALL_TRANSACTION, ALL_TRANSACTION_BY_USER, ALL_USERS, ERROR, LOADING, LOGIN_SUCCESS } from "./type";
import axios from "axios";

const API = axios.create({baseURL: "http://localhost:8080/"});
// const API = axios.create({baseURL: "https://bank-server-0mfy.onrender.com/"});

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
    dispatch(AllTransaction(accessToken, userId));
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

export const AllUsers = (accessToken, userId) => async(dispatch)=>{
  dispatch({type: LOADING});
  try{
    let {data} = await API.get("/users/customer-list", {headers: {accessToken: accessToken, userId: userId}});
    dispatch({type: ALL_USERS, payload: data});
  }catch(err){
    dispatch({type: ERROR, payload: err?.response?.data});
  }
}

export const AllTransactionByUser = (accessToken, userId, adminId) => async(dispatch)=>{
  dispatch({type: LOADING});
  try{
    let {data} = await API.get("/transiction/transiction-list-user", {headers: {accessToken: accessToken, userId: userId, adminId: adminId}});
    dispatch({type: ALL_TRANSACTION_BY_USER, payload: data});
  }catch(err){
    dispatch({type: ERROR, payload: err?.response?.data});
  }
}