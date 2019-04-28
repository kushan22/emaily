// SurveyNew shows survey form and surveyform review

import React, { Component } from 'react';
import SurveyForm from './SurveyForm';
import { reduxForm } from 'redux-form';
import SurveyFormReview from './SurveyFormReview';

class SurveyNew extends Component{

    // constructor(props){
    //     super(props);
        
    // } do this or

    state = { showFormReview: false }  // provided by create-react-app 

    renderContent(){
        if (this.state.showFormReview){
            return <SurveyFormReview 
               onCancel = {() => this.setState({ showFormReview: false})} 
            />
        }

        return <SurveyForm
            onSurveySubmit = {() => this.setState({ showFormReview: true})}
        />
    }    
    render(){
        return(
            <div>
                { this.renderContent() }
            </div>
        );
    }
}

export default reduxForm({
    form: 'surveyForm'
})(SurveyNew)
    