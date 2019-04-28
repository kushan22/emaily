// SurveyField Contains logic to render a single label and text input

import React from 'react';


// All the props are being passed on to the SurveyField from Field component of redux form.
// Label is a custom prop passed by me and input is built in prop passed by redux form
//... This means all the methods and attributes inside input are passed on as props 
export default ({ input,label, meta: {error,touched} }) => {
    
    return (
        <div>
            <label>{ label }</label>
            <input {...input} style={{ marginBottom: '5px'}} /> 
            <div className="red-text" style={{ marginBottom: '20px' }}>
               { touched && error }
            </div>
             
        </div>
    );
}