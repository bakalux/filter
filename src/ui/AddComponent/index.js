import React from 'react';

import AddIcon from './add.svg';

import styles from './styles.module.css';

const AddComponent = ({ onClick }) => (
  <div className={ styles.condition } onClick={ onClick }>
    <img className={ styles.addIcon } src={ AddIcon } alt="add" />
    <span className={ styles.label }>Add Condition</span>
  </div>
);

export default AddComponent;
