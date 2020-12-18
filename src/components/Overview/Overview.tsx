import React from 'react';
import { OnBehaviorSubjectHook } from '../../Helper';
import * as KSS from '../../services/KanbanState.service';
import Column from '../Column/Column';
import styles from './Overview.module.scss';

const ks = KSS.default._();

const Overview: React.FC = () => {
  const [columns, setColumns] = OnBehaviorSubjectHook<Array<KSS.Column>>(ks.columns, () => ks.columns.getValue());

  return (
  <div className={styles.Overview}>
    {columns.sort((ca, cb) => ca.position - cb.position).map(column => {
      console.log(column, 'column'); 
      return <Column column={column}></Column>;
    })}
  </div>
)};

export default Overview;
