import React from 'react';
import { Spinner as BSpinner } from 'react-bootstrap'

export default function Spinner() {
    return (
        <div className='spinner-container'>
            <BSpinner animation="border" role="status" className='spinner' >
                <span className="sr-only">Loading...</span>
            </BSpinner>
        </div>

    )
}