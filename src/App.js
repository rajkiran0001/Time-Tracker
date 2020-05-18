import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddTracker from "./components/AddTracker";
import TrackersList from "./components/TrackersList";

function App() {
  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/trackers" className="navbar-brand">
            Time Tracker
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/trackers"} className="nav-link">
                List Booking
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add Task
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/trackers"]} component={TrackersList} />
            <Route exact path="/add" component={AddTracker} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
