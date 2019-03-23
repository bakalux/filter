import React, { Component } from 'react';

import {
  AddComponent,
  Button,
  Input,
  Select
} from '../ui';

import styles from './styles.module.css';

import CloseIcon from './icons/close.svg';

const typeOptions = [
  {
    value: 'text',
    label: 'Text Field',
  },
  {
    value: 'number',
    label: 'Number Field',
  }
];

const numberConditionOptions = [
  {
    value: 'equal',
    label: 'Equal',
  },
  {
    value: 'greater than',
    label: 'Greater than',
  },
  {
    value: 'less than',
    label: 'Less than',
  },
]

const textConditionOptions = [
  {
    value: 'containing',
    label: 'Containing',
  },
  {
    value: 'exactly matching',
    label: 'Exactly matching',
  },
  {
    value: 'begins with',
    label: 'Begins with',
  },
  {
    value: 'ends with',
    label: 'Ends with',
  },
]

class Filter extends Component {
  constructor() {
    super();
    this.state = {
      conditions: [
        {
          id: 0,
          type: 'text',
          operation: 'containing',
          value: '',
        }
      ],
      conditionCount: 1,
      idCounter: 0,
    }
  }

  apply = () => {

  }

  handleAddition = () => {
    let { idCounter, conditionCount } = this.state;
    idCounter++;

    const conditionToAdd = {
      id: idCounter,
      type: 'text',
      operation: 'containing',
      value: '',
    }
    this.setState({
      conditions: [ ...this.state.conditions, conditionToAdd ],
      idCounter,
      conditionCount: ++conditionCount,
    })
  }

  handleInputChange = e => {
    const { conditions } = this.state;
    const { id, value } = e.target;

    const currentConditionIndex = conditions.findIndex(condition => id == condition.id);
    if (conditions[ currentConditionIndex ].type === 'number') {
      conditions[ currentConditionIndex ].value = parseInt(value) ? parseInt(value) : '';
    } else {
      conditions[ currentConditionIndex ].value = value;
    }
    this.setState({
      conditions
    });
  }

  handleClear = () => {
    const initialState = {
      conditions: [
        {
          id: 0,
          type: 'text',
          operation: 'containing',
          value: '',
        },
      ],
      conditionCount: 1,
      idCounter: 0,
    }
    this.setState({
      ...initialState
    });
  }

  handleOperation = e => {
    const { conditions } = this.state;
    const { id, value } = e.target;

    const currentConditionIndex = conditions.findIndex(condition => id == condition.id);

    conditions[ currentConditionIndex ].operation = value;

    this.setState({
      conditions
    });
  }

  handleRemoval = e => {
    const { conditions } = this.state;
    let { conditionCount } = this.state;
    const { id } = e.target;

    const newConditions = conditions.filter(condition => condition.id != id);

    this.setState({
      conditions: newConditions,
      conditionCount: --conditionCount,
    });

  }

  handleType = e => {
    const { conditions } = this.state;
    const { id, value } = e.target;

    const currentConditionIndex = conditions.findIndex(condition => id == condition.id);

    conditions[ currentConditionIndex ].type = value;
    conditions[ currentConditionIndex ].operation = value === 'number' ? 'equal' : 'containing';
    conditions[ currentConditionIndex ].value = '';

    this.setState({
      conditions
    });
  }

  handleSubmit = () => {
    const { conditions } = this.state;
    let objectToLog = {
      number: [],
      text: [],
    };
    conditions.forEach(({ type, operation, value }) => {
      if (type === 'text') {
        objectToLog.text.push({ operation, value });
      } else if (type === 'number') {
        const number = parseInt(value);
        objectToLog.number.push({ operation, number });
      }
    });
    console.log(objectToLog);
  }

  render() {
    const { conditions } = this.state;
    return (
      <div className={ styles.wrapper }>
        <div className={ styles.conditionWrapper }>
          { conditions.map(({ id, type, value }) =>
            <div className={ styles.row } key={ id }>
              <Select
                options={ typeOptions }
                id={ id }
                onChange={ this.handleType }
              />
              <Select
                options={ type === 'number' ? numberConditionOptions : textConditionOptions }
                id={ id }
                onChange={ this.handleOperation }
              />
              <div className={ styles.inputWrapper }>
                <Input
                  id={ id }
                  onChange={ this.handleInputChange }
                  value={ value }

                />
              </div>
              { this.state.conditionCount > 1 &&
                <img
                  src={ CloseIcon }
                  className={ styles.closeIcon }
                  alt="close"
                  id={ id }
                  onClick={ this.handleRemoval }
                />
              }
            </div>
          ) }
          { this.state.conditionCount < 10 &&
            <AddComponent onClick={ this.handleAddition } />
          }
        </div>
        <div className={ styles.buttonWrapper }>
          <Button label="Apply" primary onClick={ this.handleSubmit } />
          <Button label="Clear filter" onClick={ this.handleClear } />
        </div>
      </div>
    );
  }
}

export default Filter;
