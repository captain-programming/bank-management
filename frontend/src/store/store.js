import { applyMiddleware, compose, legacy_createStore } from "redux";
import thunk from "redux-thunk";
import { Reducer } from "./reducer";

const createComposer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = legacy_createStore(Reducer, createComposer(applyMiddleware(thunk)));