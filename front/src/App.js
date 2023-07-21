import React, { useReducer, createContext } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import { userReducer } from "./reducer";
import MainRouterComponent from "./components/mainRouterComponent/MainRouterComponent";

export const UserStateContext = createContext(null);
export const DispatchContext = createContext(null);

function App() {
  // useReducer 훅을 통해 userState 상태와 dispatch함수를 생성함.
  const [userState, dispatch] = useReducer(userReducer, {
    user: null,
  });

  return (
    <DispatchContext.Provider value={dispatch}>
      <UserStateContext.Provider value={userState}>
        <Router>
          <MainRouterComponent />
        </Router>
      </UserStateContext.Provider>
    </DispatchContext.Provider>
  );
}

export default App;
