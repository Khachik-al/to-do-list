import React from 'react';
import './App.css';
import ToDo from './components/pages/ToDo/ToDo';
import 'bootstrap/dist/css/bootstrap.min.css';
import About from './components/pages/About/About';
import Contact from './components/pages/Contact/Contact';
import NotFound from './components/pages/NotFound/NotFound';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import NavMenu from './components/NavMenu/NavMenu';
import SingleTask from './components/pages/SingleTask/SingleTask';




function App() {
  return (
    <div className="App"> 
      <BrowserRouter>
        <NavMenu mb={2} />
        <Switch>
          <Route
            path='/home'
            component={ToDo}
          />
          <Route
            path='/'
            component={ToDo}
            exact
          />
          <Route
            path='/task/:taskId'
            component={SingleTask}
            exact
          />
          <Route
            path='/about'
            component={About}
          />
          <Route
            path='/contact'
            component={Contact}
          />
          <Route
            path='/not-found'
            component={NotFound}
          />
          <Redirect to='/not-found' />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
