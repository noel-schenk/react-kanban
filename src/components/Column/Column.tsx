import React from 'react';
import styles from './column.module.scss';
import Paper from '@material-ui/core/Paper';
import Card from '../Card/Card';
import * as KSS from '../../services/KanbanState.service';
import { OnBehaviorSubjectHook } from '../../Helper';

const ks = KSS.default._();

const Column: React.FC<{ column: KSS.Column }> = ({column}) => (
    <Paper>
      {OnBehaviorSubjectHook(ks.columns, () => column.title)}
      {ks.getCardsByColumn(column).map(card => {
        return <Card card={card}></Card>
      })}
    </Paper>
);

export default Column;
