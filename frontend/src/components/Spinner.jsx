import SpinnerCss from '../style/spinner.module.css'
import React from 'react';

function Spinner() {
    return (
        <div className={SpinnerCss.spinner}>
            <img className={SpinnerCss.image} src="/spinner.png" alt='spinner'></img>
        </div>
    )
}

export default Spinner