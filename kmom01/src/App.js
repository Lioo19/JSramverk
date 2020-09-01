import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";

import { Home } from "./Home.js";
import { Reports } from "./Report.js";
import { Login, Register } from "./Login.js";

// Since routes are regular React components, they
// may be rendered anywhere in the app, including in
// child elements.
//
// This helps when it's time to code-split your app
// into multiple bundles because code-splitting a
// React Router app is the same as code-splitting
// any other React app.


export default function App() {
  return (
    <Router>
      <div  className="App">
        <ul className="navBar">
          <li>
            <Link to="/">Hem</Link>
          </li>
          <li>
            <Link to="/reports">Rapporter</Link>
          </li>
          <li>
            <Link to="/login">Logga in</Link>
          </li>

        </ul>

        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/reports">
            <Reports />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
