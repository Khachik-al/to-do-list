import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

function AuthRoute({ path, component: Component, exact = false, type, isAuthenticated }) {
   
    return (
        <Route
            path={path}
            exact={exact}
            render={(props) => {
                if(isAuthenticated && type==='public'){
                    return <Redirect to='/'/>;
                  }
          
                  if(!isAuthenticated && type==='private'){
                    return <Redirect to='/login'/>;
                  }
                  return <Component {...props}/>; 
            }}
        />
    )
}

let mapStateToProps = (state) => {
    return {
        isAuthenticated: state.isAuthenticated
    }
}

export default connect(mapStateToProps)(AuthRoute);





// import React from 'react';
// import { connect } from 'react-redux';
// import { Route, Redirect } from 'react-router-dom';

// function AuthRoute(props) {
//     return (
//         <Route
//             path={props.path}
//             exact={props.exact}
//             render={(renderProps) => {
//                 if (props.isAuthenticated && props.type === 'public') {
//                     return <Redirect to='/' />

//                 }
//                 if (props.isAuthenticated && props.type === 'public') {
//                     return <props.component {...renderProps}/>

//                 }
//                 // if (props.isAuthenticated && props.type === 'public') {


//                 // }

//             }
//             }
//         />
//     )
// }

// let mapStateToProps = (state) => {
//     return {
//         isAuthenticated: state.isAuthenticated
//     }
// }

// export default connect(mapStateToProps)(AuthRoute);
