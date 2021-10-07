import React, { Fragment } from 'react'
import spinner from './Buffering.gif';

const Spinner = () => (
    
    <Fragment>
        <img
            src = { spinner }
            style = {{ width:'200px', height:'200px', margin: 'auto', display:'block' }}
            alt = "loading"
        />
    </Fragment>           
)

export default Spinner