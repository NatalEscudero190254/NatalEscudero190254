import React from 'react';
import './App.css';
import { Route } from "react-router-dom";
import LandingPage from './components/Landingpage';
import Home from './components/Home';
import Navbar from './components/Navbar';
import CreateActivity from './components/CreateActivity';
import Detail from './components/Detail';

function App() {
  return (
      <React.Fragment>

        <div className="App">
        <Navbar/>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/home" component={Home} />
        <Route exact path={"/activities"} component={CreateActivity}/>
        <Route exact path={"/countries/:id"} component={Detail}/>
        </div>

      </React.Fragment>
  );
}

export default App;
