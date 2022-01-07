import React, { Component } from 'react';
import Input from './Input';
import Button from './Button';
import uniqid from 'uniqid';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props.formData,
      extraInputsCounter: [],
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.addExtraInput = this.addExtraInput.bind(this);
    this.removeExtraInput = this.removeExtraInput.bind(this);
  }

  // Updates state on input change
  onInputChange(e, field) {
    this.setState((state) => {
      return {
        ...state,
        formFields: {
          ...state.formFields,
          [field]: {
            ...state.formFields[field],
            inputValue: e.target.value,
          },
        },
      };
    });
  }

  // Adds an extra input and takes into consideration it's context
  addExtraInput() {
    const { hasExtraInputs } = this.props;

    let { extraInputsCounter, extraInputType, extraInputPlaceHolder, extraInputName} = this.state;
    const newCounter = extraInputsCounter.concat(uniqid());

    if (hasExtraInputs) {
      let extraInputs = [];

      // Creates a new object which temporarily holds the new state for each new input field
      extraInputs = newCounter.reduce((accumulator, id) => {
        //Checks if the extra input is already in state and updates the accumulator if it isn't
        if (!extraInputsCounter.includes(id)) {
          accumulator = {
            ...accumulator,
            [`${extraInputName}-${id}`]: {
              id,
              inputValue: '',
              name: `${extraInputName}-${id}`,
              placeHolder: extraInputPlaceHolder,
              type: extraInputType,
            },
          };
        }
        return accumulator;
      }, {});

      // Adds all of the extra input fields to the state and updates the counter
      this.setState((state) => {
        return {
          ...state,
          formFields: {
            ...state.formFields,
            ...extraInputs,
          },
          extraInputsCounter: newCounter,
        };
      });
    }
  }

  // Removes a specific input field from the state and counter
  removeExtraInput(name, inputId) {
    const { extraInputsCounter } = this.state;
    if (extraInputsCounter.length > 1) {
      this.setState((state) => {
        delete state.formFields[name];
        return {
          ...state,
          extraInputsCounter: state.extraInputsCounter.filter(
            (id) => id !== inputId,
          ),
        };
      });
    }
  }

  componentDidMount() {
    // Add's the first uniqid to the extraInputCounter
    this.addExtraInput();
  }

  render() {
    const { formFields, formType,extraInputName } = this.state;
    const { formId, addForm, counter, onFormSave, removeForm, hasExtraInputs } =
      this.props;

    // Creates an array of all the input fields to then render
    const inputs = Object.keys(formFields).map((inputName) => {
      const { id, placeHolder, name, inputValue, type } = formFields[inputName];
      return (
        <Input
          key={id}
          inputId={id}
          type={type}
          placeHolder={placeHolder}
          name={name}
          parentFormType={formType}
          inputValue={inputValue}
          handleOnChange={this.onInputChange}
          removeExtraInput={name.includes(id) ? this.removeExtraInput : null}
          extraInputName = {(extraInputName?? null)}
        />
      );
    });

    return (
      <div className="form">
        <form onSubmit={(e) => onFormSave(e, formType, formId, formFields)}>
          {inputs}
          {hasExtraInputs ? (
            <Button
              onClick={this.addExtraInput}
              text={`Add ${extraInputName}`}
            />
          ) : null}
          {/* Only renders "Add form" button if its the last form of its type */}
          {(counter?.indexOf(formId) === counter?.length - 1) ? (
            <Button onClick={() => addForm(formType)} text={'Add Form'} />
          ) : null}
          {removeForm ? (
            <Button
              onClick={() => removeForm(formType, formId)}
              text={'Remove Form'}
            />
          ) : null}
          <button type="submit">Save</button>
        </form>
      </div>
    );
  }
}

export default Form;