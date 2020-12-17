import React from 'react';
import styles from './Column.module.scss';
import Paper from '@material-ui/core/Paper';
import Card from '../Card/Card';
import * as KSS from '../../services/KanbanState.service';
import Typography from '@material-ui/core/Typography'

const ks = KSS.default._();

const Column: React.FC<{ column: KSS.Column }> = ({column}) => (
  <div className={styles.Column}>
    <h2>{column.title}</h2>
    <Paper>
      {ks.getCardsByColumn(column).map(card => {
        return <Card card={card}></Card>;
      })}
    </Paper>
  </div>
);

export default Column;
