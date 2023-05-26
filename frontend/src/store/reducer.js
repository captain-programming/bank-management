import { ADD_AMOUNT, ALL_TRANSACTION, ERROR, LOADING, LOGIN_SUCCESS } from "./type"

const initial = {
  accessToken: "",
  loading: false,
  toastMessage: "",
  userDetails: {},
  transaction: []
}

export const Reducer = (state=initial, {type, payload}) => {
  switch(type){
    case LOADING : return {...state, loading: true}
    case ERROR : return {...state, loading: false, error: payload}
    case LOGIN_SUCCESS : return {...state, loading: false, error: "", accessToken: payload.accessToken, userDetails: payload}
    case ADD_AMOUNT : return {...state, loading: false, error: "", toastMessage: payload.message, userDetails: payload.user}
    case ALL_TRANSACTION : return {...state, loading: false, error: "", transaction: payload}
    default: return state;
  }
}