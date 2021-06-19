import { applyMiddleware, createStore } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import reducer from "./reduser";

let params=[thunk]
if (process.env.NODE_ENV==='development'){
    params.push(logger)
}


const middleware = applyMiddleware(...params)

export let store = createStore(reducer, middleware)