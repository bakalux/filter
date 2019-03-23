import React from 'react';

import styles from './styles.module.css';

const Button = ({ label, onClick, primary }) => (
  <div
    className={ `${styles.button} ${primary ? styles.primary : ''}` }
    onClick={ onClick }
  >
    { label }
  </div>
);

export default Button;
