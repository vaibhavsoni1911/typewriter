import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import TestController from "./Components/TestController"
import { Container } from "react-bootstrap";
import { Provider } from "react-redux";
import reduxStore from "./reduxStore";



function App() {
  return (
    <Provider store={reduxStore}>
      <div className="App">
        <Container>
          <TestController />
        </Container>
      </div>
    </Provider>
  );
}

export default App;
