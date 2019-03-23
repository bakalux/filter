import React from 'react';

import styles from './styles.module.css';

const Input = ({ options, onChange, id }) => (
  <div>
    <select className={styles.select} onChange={onChange} id={id}>
      {options.map(({ value, label }) => (
          <option
            className={styles.option}
            key={value}
            value={value}
          >
            {label}
          </option>
      ))}
    </select>
  </div>
);

export default Input;