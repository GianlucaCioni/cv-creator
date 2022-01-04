import React, { Component } from 'react';
import Forms from './components/forms/Forms';
import './styles/App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {};
    this.onFormSave = this.onFormSave.bind(this);
  }

  onFormSave(formName, formFields) {
    console.log(formName, formFields);
    this.setState({
      ...this.state,
      [formName]: {
        ...formFields,
      },
    });
  }

  render() {
    return (
      <div className="App">
        <Forms onFormSave={this.onFormSave} />
      </div>
    );
  }
}

export default App;
