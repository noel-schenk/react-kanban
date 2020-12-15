import React from 'react';
import { OnBehaviorSubjectHook } from '../../Helper';
import * as KSS from '../../services/KanbanState.service';
import Column from '../Column/Column';

const ks = KSS.default._();

const Overview: React.FC = () => (
  <>
    {OnBehaviorSubjectHook<Array<KSS.Column>>(ks.columns, () => ks.columns.getValue()).sort((ca, cb) => ca.position - cb.position).map(column => {
      {console.log('rendering', column)}
      
      return <Column column={column}></Column>;
    })}
  </>
);

export default Overview;
