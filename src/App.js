import React from "react";
import { HashRouter as Router } from 'react-router-dom'
import { InputProvider } from './Context/ContextProvider';
import RouterComponent from './Router/Router';

function App() {
  return (
    <InputProvider>
      <Router basename={''}>
        <RouterComponent />
      </Router>
    </InputProvider>
  )
}

export default App;