import React, { useState } from 'react'
import { connect } from 'react-redux';


function ChengeCount(props) {


    let [value, setValue] = useState('')

    return (
        <div>
            <div>
                <input
                    value={value}
                    type="text"
                    onChange={(ev) => setValue(ev.target.value)}
                />
            </div>
            <div>
                <button onClick={props.onChange}>
                    Change count
                </button>
                <button onClick={() => {
                    props.onSendMessage(value)
                    setValue('')
                }}>
                    Send message
                </button>
            </div>
        </div>
    );
}

function mapDispatchToState(dispatch) {

    return {
        onChange: () => {
            dispatch({
                type: 'CHANGE_VALUE'
            })
        },
        onSendMessage: (val) => {
            dispatch({
                type: 'SEND_MESSAGE',
                message: val
            })
        }
    }
}



export default connect(null, mapDispatchToState)(ChengeCount);