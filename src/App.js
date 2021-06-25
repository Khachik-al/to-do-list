import React from 'react';
import './App.css';
import ToDo from './components/pages/ToDo/ToDo';
import 'bootstrap/dist/css/bootstrap.min.css';
import About from './components/pages/About/About';
import Contact from './components/pages/Contact/Contact';
import Spinner from './components/Spinner/Spinner';
import NotFound from './components/pages/NotFound/NotFound';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import NavMenu from './components/NavMenu/NavMenu';
import SingleTask from './components/pages/SingleTask/SingleTask';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import history from './helpers/history';
import Registration from './components/pages/Registration/Registration';
import Login from './components/pages/Login/Login';

let toastProps = {
  position: "bottom-left",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
}

function AuthRoute({ path, component, exact = false }) {
  return (
    <Route
      path={path}
      component={component}
      exact={exact} />
  )
}


function App({ loading, successMessage, errorMessage }) {

  useEffect(
    () => {
      if (successMessage) {
        toast.success(successMessage, toastProps)
      }
      if (errorMessage) {
        toast.error(errorMessage, toastProps)
      }
    }, [successMessage, errorMessage])

  return (

    <div className="App">
      <Router history={history}>
        <NavMenu />
        <Switch>
          <AuthRoute
            path='/home'
            component={ToDo}
          />
          <AuthRoute
            path='/'
            component={ToDo}
            exact={true}
          />
          <AuthRoute
            path='/task/:taskId'
            component={SingleTask}
            exact={true}
          />
          <AuthRoute
            path='/about'
            component={About}
          />
          <AuthRoute
            path='/registration'
            component={Registration}
          />
          <AuthRoute
            path='/login'
            component={Login}
          />
          <AuthRoute
            path='/contact'
            component={Contact}
          />
          <AuthRoute
            path='/not-found'
            component={NotFound}
          />
          <Redirect to='/not-found' />
        </Switch>
      </Router>
      {loading && <Spinner />}
      <ToastContainer />
    </div>
  );
}
function mapStateToProps(state) {
  return {
    loading: state.loading,
    successMessage: state.successMessage,
    errorMessage: state.errorMessage,
    isAuthenticated: state.isAuthenticated
  }
}

export default connect(mapStateToProps)(App);
