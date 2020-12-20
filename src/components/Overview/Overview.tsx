import { Button } from '@material-ui/core';
import React from 'react';
import { OnBehaviorSubjectHook } from '../../Helper';
import * as KSS from '../../services/KanbanState.service';
import Column from '../Column/Column';
import styles from './Overview.module.scss';
import { Help as HelpIcon } from '@material-ui/icons';

const ks = KSS.default._();

const Overview: React.FC = () => {
  const [columns, setColumns] = OnBehaviorSubjectHook<Array<KSS.Column>>(ks.columns, () => ks.columns.getValue());

  return (
  <div className={styles.Overview}>
    {columns.length > 0 && columns.sort((ca, cb) => ca.position - cb.position).map(column => {
      return <Column key={column.key} column={column}></Column>;
    })}
    {columns.length === 0 &&
      <div className={styles.Init}>
        <div>
          <Button variant='contained' color='primary' onClick={() => ks.generateDemoContent()}>Generate demo content</Button>
          <Button variant='contained' color='secondary' target='_blank' href='https://github.com/noelelias/dirico/'>Help <HelpIcon /></Button>
        </div>
      </div>
      
    }
  </div>
)};

export default Overview;
