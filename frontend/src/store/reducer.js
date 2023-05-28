import { ADD_AMOUNT, ALL_TRANSACTION, ALL_TRANSACTION_BY_USER, ALL_USERS, CREATE_SUCCESS, ERROR, LOADING, LOGIN_SUCCESS, LOGOUT} from "./type"

const initial = {
  accessToken: "",
  loading: false,
  userDetails: {},
  transaction: [],
  allUsers: [],
  userTrasaction: [],
  error: false
}

export const Reducer = (state=initial, {type, payload}) => {
  switch(type){
    case LOADING : return {...state, loading: true}
    case ERROR : return {...state, loading: false, error: true}
    case LOGIN_SUCCESS : return {...state, loading: false, error: true, accessToken: payload.accessToken, userDetails: payload}
    case CREATE_SUCCESS : return {...state, loading: false, error: true}
    case ADD_AMOUNT : return {...state, loading: false, error: true, userDetails: payload.user}
    case ALL_TRANSACTION : return {...state, loading: false, error: false, transaction: payload}
    case ALL_TRANSACTION_BY_USER : return {...state, loading: false, error: false, userTrasaction: payload}
    case ALL_USERS : return {...state, loading: false, error: false, allUsers: payload}
    default: return state;
    case LOGOUT: return {...state, accessToken: "", loading: false, userDetails: {},transaction: [], allUsers: [], userTrasaction: [], error: false}
  }
}