import React from 'react';

import styles from './styles.module.css';

const Input = ({ id, onChange, value }) => (
  <div>
    <input
      className={ styles.input }
      id={ id }
      onChange={ onChange }
      value={ value }
    />
  </div>
);

export default Input;
