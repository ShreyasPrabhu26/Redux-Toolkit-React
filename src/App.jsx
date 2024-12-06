import { useSelector } from "react-redux";
import CreateCustomer from "./feautures/customer/CreateCustomer";
import Customer from "./feautures/customer/Customer";
import AccountOperations from "./feautures/accounts/AccountOperations";
import BalanceDisplay from "./feautures/accounts/BalanceDisplay";

function App() {
  const fullName = useSelector(state => state.customer.fullName)

  return (
    <div>
      <h1>🏦 The React-Redux Bank ⚛️</h1>
      {!fullName ?
        <CreateCustomer /> :
        <>
          <Customer />
          <AccountOperations />
          <BalanceDisplay />
        </>
      }
    </div>
  );
}

export default App;