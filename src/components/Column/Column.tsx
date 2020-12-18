import React from 'react';
import styles from './Column.module.scss';
import Paper from '@material-ui/core/Paper';
import Card from '../Card/Card';
import * as KSS from '../../services/KanbanState.service';
import { OnBehaviorSubjectHook } from '../../Helper';
import { TextField } from '@material-ui/core';

const ks = KSS.default._();

const Column: React.FC<{ column: KSS.Column }> = ({column}) => {
  const [cards, setCards] = OnBehaviorSubjectHook<Array<any>>(ks.cards, () => ks.getCardsByColumn(column));
  return (
  <div className={styles.Column}>
    {column.state === KSS.ColumnStates.data && <><h2>{column.title}</h2>
    <Paper style={{backgroundColor: column.color}}>
      {cards.map(card => {
        return <Card card={card}></Card>;
      })}
    </Paper></>}
    {column.state === KSS.ColumnStates.edit && <>
    <Paper>
      <TextField
            label='Title'
            defaultValue={column.title}
            fullWidth={true}
            margin='normal'
            onChange={(ev) => {column.title = ev.target.value; ks.columns.next(ks.columns.getValue())}}
          />
    </Paper></>}
  </div>
)};

export default Column;
