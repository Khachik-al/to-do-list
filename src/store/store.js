import { applyMiddleware, createStore } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import reducer from "./reduser";


const middleware = applyMiddleware(thunk,logger)

export let store = createStore(reducer, middleware)