import React from 'react'
import { connect } from 'react-redux';



function ShowCount(props) {


    return (
        <div>
            <h2>
                Count: {props.count}
            </h2>
            <h2>
                Message: {props.message}
            </h2>

        </div>
    );
}


function mapStateToProps(state) {

    return {
        count: state.value,
        message: state.message
    }

}



export default connect(mapStateToProps)(ShowCount);