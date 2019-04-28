// Shows a form for a user to add input 
import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';

import FIELDS from './formFields';
class SurveyForm extends Component{

   
    // Render the fields in the form with component SurveyField
    renderFields(){
        return _.map(FIELDS, field => {
            return <Field key={field.name} component={SurveyField} type="text" label={field.label} name={field.name}/>
        });
    }

    render(){
        return(
            <div className="container">
               <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
                  { this.renderFields() }  

                  <Link to="/surveys" className="red btn-flat white-text">Cancel</Link>  

                  <button className="teal btn-flat right white-text" type="submit">
                    Next
                    <i className="material-icons right">done</i> 
                  </button>

                 
                </form> 
                    
            </div>
        );
    }
}

function validate(values){

    // Values object has all the names available in the form. 
    // Same goes with errors object
    const errors = {};

    errors.recipients = validateEmails(values.recipients || '');
    
    _.map(FIELDS, ({ name }) => {
        if (!values[name]){
            errors[name] = 'You must enter a value';
            
        }
    });
   
    

    return errors;
}

export default reduxForm({
    validate: validate,
    form: 'surveyForm',
    destroyOnUnmount: false
})(SurveyForm);