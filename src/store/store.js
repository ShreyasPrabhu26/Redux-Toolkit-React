import { applyMiddleware, combineReducers, createStore } from "redux";
import accountReducer from "../feautures/accounts/accountSlice";
import customerReducer from "../feautures/customer/customerSlice";
import { thunk } from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";


const store = configureStore({
    reducer: {
        account: accountReducer,
        customer: customerReducer,
    }
});

export default store; 