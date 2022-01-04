import React, { Component } from 'react';
import Form from './Form';
import formData from '../../formData';
import uniqid from 'uniqid';

class Forms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      workExperiencesCounter: [],
      educationCounter: [],
    };
  }

  componentDidMount() {
    const { workExperiencesCounter, educationCounter } = this.state;
    let updatedState = this.state;

    if (workExperiencesCounter.length < 1) {
      updatedState = {
        ...updatedState,
        workExperiencesCounter: updatedState.workExperiencesCounter.concat(
          uniqid(),
        ),
      };
    }

    if (educationCounter.length < 1) {
      updatedState = {
        ...updatedState,
        educationCounter: updatedState.educationCounter.concat(uniqid()),
      };
    }

    this.setState(updatedState);
  }

  render() {
    const { personalInfo, workExperiences, education } = formData;
    return (
      <div id="forms">
        <Form onFormSave={this.props.onFormSave} formData={personalInfo} />
        <Form onFormSave={this.props.onFormSave} formData={workExperiences} />
        <Form onFormSave={this.props.onFormSave} formData={education} />
      </div>
    );
  }
}

export default Forms;
