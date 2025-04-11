import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from "./components";
import { Home } from "./routes";
import { Wrapper, Content } from "./App.styles";

// try

const App = () => {
  return (
    <Router>
      <Wrapper>
        <Header />
        <Content>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </Content>
      </Wrapper>
    </Router>
  );
};

export default App;
