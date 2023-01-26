import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import AllUsers from './AllUsers/AllUsers';
import RegForm from './RegForm/RegForm';

class App extends Component {

  render(){
    return(
        <Router>
          <div>
            <Routes>
              <Route exact path="/editUser/:id" component={RegForm} />
              <Route exact path="/addUser" component={RegForm}/>
              <Route path="/" component={AllUsers} />
            </Routes>
          </div>
        </Router>
    );
  }
}


export default App;
