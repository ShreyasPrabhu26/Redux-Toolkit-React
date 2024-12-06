import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    balance: 0,
    loan: 0,
    loanPurpose: ""
}

const accountSlice = createSlice({
    name: "account",
    initialState,
    reducers: {
        deposite(state, action) {
            state.balance = + action.payload
        },
        withdraw(state, action) {
            state.balance -= action.payload
        },
        requestLoan: {
            prepare(amount, loanPurpose) {
                return {
                    payload: { amount, loanPurpose }
                }
            },
            reducer(state, action) {
                if (state.loan > 0) return;
                state.loan = action.payload.amount
                state.loanPurpose = action.payload.loanPurpose
                state.balance = action.payload.amount
            }
        },
        payLoan(state, action) {
            state.balance -= state.loan
            state.loan = 0;
            state.loanPurpose = ""
        }

    }
})


export const { withdraw, requestLoan, payLoan } = accountSlice.actions

export function deposite(amount, currency) {
    if (currency === "USD") return {
        type: "account/deposite",
        payload: amount
    }
    return async function (dispatch, getState) {
        const response = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`)
        const data = await response.json()
        const converted = data.rates.USD;
        dispatch({
            type: "account/deposite",
            payload: converted
        })
    }
}


export default accountSlice.reducer;


//LEGACY WAY!!!

// const initialStateAccount = {
//     balance: 0,
//     loan: 0,
//     loanPurpose: ""
// }


// export default function accountReducer(state = initialStateAccount, action) {
//     switch (action.type) {
//         case "account/deposite":
//             return { ...state, balance: state.balance + action.payload }

//         case "account/withdraw":
//             return { ...state, balance: state.balance - action.payload }

//         case "account/requestLoan":
//             if (state.loan > 0) return state;
//             return {
//                 ...state,
//                 balance: state.balance + action.payload.amount,
//                 loan: action.payload.amount,
//                 loanPurpose: action.payload.loanPurpose
//             }

//         case "account/payLoan":
//             return {
//                 ...state,
//                 loan: 0,
//                 loanPurpose: "",
//                 balance: state.balance - state.loan
//             }

//         default:
//             return state;
//     }

// }


// export function deposite(amount, currency) {
//     if (currency === "USD") return {
//         type: "account/deposite",
//         payload: amount
//     }
//     return async function (dispatch, getState) {
//         const response = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`)
//         const data = await response.json()
//         const converted = data.rates.USD;
//         dispatch({
//             type: "account/deposite",
//             payload: converted
//         })
//     }
// }

// // store.dispatch(deposite(1000))
// // console.log(store.getState());


// export function withdraw(amount) {
//     return {
//         type: "account/withdraw",
//         payload: amount
//     }
// }
// // store.dispatch(withdraw(1000))
// // console.log(store.getState());

// export function requestLoan(amount, loanPurpose) {
//     return {
//         type: "account/requestLoan",
//         payload: {
//             amount,
//             loanPurpose
//         }
//     }
// }
// // store.dispatch(requestLoan(1000, "Buy car!"))
// // console.log(store.getState());

// export function payLoan() {
//     return {
//         type: "account/payLoan"
//     }
// }

// // store.dispatch(payLoan())
// // console.log(store.getState());

