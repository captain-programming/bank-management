import { ADD_AMOUNT, ALL_TRANSACTION, ALL_TRANSACTION_BY_USER, ALL_USERS, ERROR, LOADING, LOGIN_SUCCESS } from "./type"

const initial = {
  accessToken: "",
  loading: false,
  toastMessage: "",
  toastStatus: "error",
  userDetails: {},
  transaction: [],
  allUsers: [],
  userTrasaction: [],
  error: false
}

export const Reducer = (state=initial, {type, payload}) => {
  switch(type){
    case LOADING : return {...state, loading: true}
    case ERROR : return {...state, loading: false, toastMessage: payload, toastStatus: "error", error: true}
    case LOGIN_SUCCESS : return {...state, loading: false, error: false, accessToken: payload.accessToken, userDetails: payload, toastMessage: "Login Success", toastStatus: "success"}
    case ADD_AMOUNT : return {...state, loading: false, error: false, toastMessage: payload.message, userDetails: payload.user, toastStatus: "success"}
    case ALL_TRANSACTION : return {...state, loading: false, error: false, transaction: payload}
    case ALL_TRANSACTION_BY_USER : return {...state, loading: false, error: false, userTrasaction: payload}
    case ALL_USERS : return {...state, loading: false, error: false, allUsers: payload}
    default: return state;
  }
}