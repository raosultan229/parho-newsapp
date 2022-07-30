import './App.css';
import React, { useState } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

const App= ()=>  {
  const pageSize=10;
  
  const [progress, setProgress]= useState(0)
    return (
      <div>
        <Router>
        <Navbar/>
        <LoadingBar
        height={3}
        color='#f11946'
        progress={progress}
      />
        <Switch>
          <Route exact path="/General"><News setProgress={setProgress} key="General" pageSize={pageSize} country="us" category='General'/></Route>
          <Route exact path="/Business"><News setProgress={setProgress} key="Business" pageSize={pageSize} country="us" category='Business'/></Route>
          <Route exact path="/Entertainment"><News setProgress={setProgress} key="Entertainment" pageSize={pageSize} country="us" category='Entertainment'/></Route>
          <Route exact path="/Sports"><News setProgress={setProgress} key="Sports" pageSize={pageSize} country="us" category='Sports'/></Route>
          <Route exact path="/Science"><News setProgress={setProgress} key="Science" pageSize={pageSize} country="us" category='Science'/></Route>
          <Route exact path="/Technology"><News setProgress={setProgress} key="Technology" pageSize={pageSize} country="us" category='Technology'/></Route>
        </Switch>
        </Router>
      </div>
    )
  }


export default App

