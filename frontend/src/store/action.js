import { ADD_AMOUNT, ALL_TRANSACTION, ALL_TRANSACTION_BY_USER, ALL_USERS, CREATE_SUCCESS, ERROR, LOADING, LOGIN_SUCCESS, LOGOUT} from "./type";
import axios from "axios";

const API = axios.create({baseURL: "http://localhost:8080/"});
// const API = axios.create({baseURL: "https://bank-server-0mfy.onrender.com/"});

export const userLogin = (crds, role, navigate, toast) => async(dispatch)=>{
  dispatch({type: LOADING});
  try{
    let {data} = await API.post("/auth/login", crds, {headers: {role: role}});
    if(role==="admin"){
      navigate('/account');
    }else{
      navigate('/transaction')
    }
    toast.success("Login Successfully", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 1000,
      closeOnClick: true
    })
    dispatch({type: LOGIN_SUCCESS, payload: data});
  }catch(err){
    toast.error(err?.response?.data?.message, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 1000,
      closeOnClick: true
    })
    dispatch({type: ERROR, payload: err?.response?.data});
  }
}

export const userCreate = (crds, role, setLoginOption, setLoginData, toast) => async(dispatch)=>{
  dispatch({type: LOADING});
  try{
    let {data} = await API.post("/auth/create", {...crds, role: role});
    if(role==="customer"){
      setLoginOption("customer-login");
      setLoginData({email: "", password: ""})
    }else{
      setLoginOption("admin-login")
      setLoginData({email: "", password: ""})
    }
    toast.success("Successfully regestered", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 1000,
      closeOnClick: true
    })
    dispatch({type: CREATE_SUCCESS, payload: data});
  }catch(err){
    toast.error(err?.response?.data?.message, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 1000,
      closeOnClick: true
    })
    dispatch({type: ERROR, payload: err?.response?.data});
  }
}

export const AddAmount = (amount, type, accessToken, userId, toast) => async(dispatch)=>{
  dispatch({type: LOADING});
  try{
    let {data} = await API.post("/transiction/transiction-process", {amount: amount, type: type}, {headers: {accessToken: accessToken, userId: userId}});

    toast.success(`${amount}₹ is successfully ${type}`, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 1000,
      closeOnClick: true
    })

    dispatch({type: ADD_AMOUNT, payload: data});
    dispatch(AllTransaction(accessToken, userId));
  }catch(err){
    toast.error(err?.response?.data?.message, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 1000,
      closeOnClick: true
    })
    dispatch({type: ERROR, payload: err?.response?.data});
  }
}

export const AllTransaction = (accessToken, userId) => async(dispatch)=>{
  dispatch({type: LOADING});
  try{
    let {data} = await API.get("/transiction/transiction-list", {headers: {accessToken: accessToken, userId: userId}});
    dispatch({type: ALL_TRANSACTION, payload: data});
  }catch(err){
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

export const logout = ()=> async(dispatch)=>{
  dispatch({type: LOGOUT});
}