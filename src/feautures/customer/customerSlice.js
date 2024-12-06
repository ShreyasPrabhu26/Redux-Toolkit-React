import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    fullName: "",
    initialId: "",
    createdAt: ""
}

const customerSlice = createSlice({
    name: "customer",
    initialState,
    reducers: {
        createCustomer: {
            prepare(fullName, initialId) {
                return {
                    payload: {
                        fullName,
                        initialId,
                        createdAt: new Date().toISOString()
                    }
                }
            },
            reducer(state, action) {
                state.fullName = action.payload.fullName
                state.initialId = action.payload.initialId
                state.createdAt = action.payload.createdAt
            }
        },
        updateCustomer(state, action) {
            state.fullName = action.payload
        }
    }
})

export default customerSlice.reducer
export const { createCustomer, updateCustomer } = customerSlice.actions;

//LEGACY WAY
// const initialCustomerState = {
//     fullName: "",
//     initialId: "",
//     createdAt: ""
// }

// export default function customerReducer(state = initialCustomerState, action) {
//     switch (action.type) {
//         case "customer/createCustomer":
//             return {
//                 ...state,
//                 fullName: action.payload.fullName,
//                 initialId: action.payload.initialId,
//                 createdAt: new Date().toISOString()
//             }

//         case "customer/updateCustomer":
//             return { ...state, fullName: action.payload }

//         default:
//             return state;
//     }

// }

// export function createCustomer(fullName, initialId) {
//     return {
//         type: "customer/createCustomer",
//         payload: {
//             fullName,
//             initialId,
//         }
//     }
// }
// // store.dispatch(createCustomer("Shreyas", "id1"))

// export function updateCustomer(updatedFullName) {
//     return {
//         type: "customer/updateCustomer",
//         payload: updatedFullName
//     }
// }

// // store.dispatch(updateCustomer("Sandesh"))

// // console.log(store.getState());
