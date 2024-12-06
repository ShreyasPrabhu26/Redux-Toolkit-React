import { combineReducers, createStore } from "redux";

const initialStateAccount = {
    balance: 0,
    loan: 0,
    loanPurpose: ""
}

const initialCustomerState = {
    fullName: "",
    initialId: "",
    createdAt: ""
}

//Goal of reducer is to calculate new state based on exixting and new value
//Action contains the payload -> parameter
function accountReducer(state = initialStateAccount, action) {
    switch (action.type) {
        case "account/deposite":
            return { ...state, balance: state.balance + action.payload }

        case "account/withdraw":
            return { ...state, balance: state.balance - action.payload }

        case "account/requestLoan":
            if (state.loan > 0) return state;
            return {
                ...state,
                balance: state.balance + action.payload.amount,
                loan: action.payload.amount,
                loanPurpose: action.payload.loanPurpose
            }

        case "account/payLoan":
            return {
                ...state,
                loan: 0,
                loanPurpose: "",
                balance: state.balance - state.loan
            }

        default:
            return state;
    }

}
function customerReducer(state = initialCustomerState, action) {
    switch (action.type) {
        case "customer/createCustomer":
            return {
                ...state,
                fullName: action.payload.fullName,
                initialId: action.payload.initialId,
                createdAt: new Date().toISOString()
            }

        case "customer/updateCustomer":
            return { ...state, fullName: action.payload }

        default:
            return state;
    }

}

const rootReducer = combineReducers({
    account: accountReducer,
    customer: customerReducer
})

const store = createStore(rootReducer)

// store.dispatch({
//     type: "account/deposite",
//     payload: 500
// })

// console.log(store.getState());

// store.dispatch({
//     type: "account/withdraw",
//     payload: 200
// })

// console.log(store.getState());

// store.dispatch({
//     type: "account/requestLoan",
//     payload: {
//         amount: 1000,
//         loanPurpose: "Buy a car"
//     }
// })

// console.log(store.getState());


function deposite(amount) {
    return {
        type: "account/deposite",
        payload: amount
    }
}

store.dispatch(deposite(1000))
console.log(store.getState());


function withdraw(amount) {
    return {
        type: "account/withdraw",
        payload: amount
    }
}
store.dispatch(withdraw(1000))
console.log(store.getState());

function requestLoan(amount, loanPurpose) {
    return {
        type: "account/requestLoan",
        payload: {
            amount,
            loanPurpose
        }
    }
}
store.dispatch(requestLoan(1000, "Buy car!"))
console.log(store.getState());

function payLoan() {
    return {
        type: "account/payLoan"
    }
}

store.dispatch(payLoan())
console.log(store.getState());


function createCustomer(fullName, initialId) {
    return {
        type: "customer/createCustomer",
        payload: {
            fullName,
            initialId,
        }
    }
}
store.dispatch(createCustomer("Shreyas", "id1"))

function updateCustomer(updatedFullName) {
    return {
        type: "customer/updateCustomer",
        payload: updatedFullName
    }
}

store.dispatch(updateCustomer("Sandesh"))

console.log(store.getState());


export default store; 