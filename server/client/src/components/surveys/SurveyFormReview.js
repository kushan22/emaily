
import React from 'react';
import { connect } from 'react-redux';
import FIELDS from './formFields';
import _ from 'lodash';
import { withRouter } from 'react-router-dom';
import * as actions from '../../actions/index';

const SurveyReview = ({ onCancel,formValues,submitSurvey,history }) => {

  const reviewFields = _.map(FIELDS,field=> {
        return (
            <div>
                <label>{field.label}</label>
                <div>
                    {formValues[field.name]}
                </div>
            </div>
        );
  });
    
  return (
        <div className="container">
            <h5>Please confirm your entry!</h5>
            {reviewFields}
            <button className="yellow darken-3 btn-flat white-text" onClick={ onCancel }>Back</button>
            <button
                onClick={() => submitSurvey(formValues,history)} 
                className="green btn-flat right white-text">
                Send Survey
                <i className="material-icons right">email</i>
            </button>
        </div>
        
    );
};

function mapStateToProps(state){
    //console.log(state); // whatever we return is passed on as props to the component
    return {
        formValues: state.form.surveyForm.values
    };
}

export default connect(mapStateToProps,actions)(withRouter(SurveyReview));