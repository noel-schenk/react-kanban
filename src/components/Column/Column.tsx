import React from 'react';
import styles from './Column.module.scss';
import Paper from '@material-ui/core/Paper';
import Card from '../Card/Card';
import * as KSS from '../../services/KanbanState.service';
import { OnBehaviorSubjectHook } from '../../Helper';
import { Button, CardContent, IconButton, Menu, MenuItem, TextField } from '@material-ui/core';
import { BlockPicker } from 'react-color';
import { MoreVert } from '@material-ui/icons';
import MUICard from '@material-ui/core/Card';

const ks = KSS.default._();

const Column: React.FC<{ column: KSS.Column }> = ({column}) => {
  const [menu, setMenu] = React.useState(false);
  const [menuAnchorEl, setMenuAnchorEl] = React.useState();
  
  const [cards, setCards] = OnBehaviorSubjectHook<Array<any>>(ks.cards, () => ks.getCardsByColumn(column));
  const [rColumn, setColumn] = OnBehaviorSubjectHook<KSS.Column>(ks.columns, () => column);
  return (
  <><Menu
      open={menu}
      onClose={() => setMenu(false)}
      anchorEl={menuAnchorEl}
    >
      <MenuItem onClick={() => {setMenu(false); ks.setColumnStateByColumn(column, KSS.ColumnStates.edit)}}>Edit</MenuItem>
      <MenuItem onClick={() => {setMenu(false); ks.createNewCard(column)}}>Add</MenuItem>
    </Menu>
  <div className={styles.Column}>
    <IconButton
      className={styles.Settings}
      aria-label='settings'
      onClick={(ev: any) => {setMenu(true); setMenuAnchorEl(ev.target)}}
      >
      <MoreVert />
    </IconButton>
    {console.log(column.state, 'column.state')}
    {console.log(rColumn.state, 'rColumn.state')}
    {rColumn.state === KSS.ColumnStates.data && <><h2>{rColumn.title}</h2>
    <Paper style={{backgroundColor: rColumn.color}}>
      {cards.map(card => {
        return <Card card={card}></Card>;
      })}
    </Paper></>}
    {rColumn.state === KSS.ColumnStates.edit && <><h2>Edit</h2>
    <Paper style={{backgroundColor: rColumn.color}}>
      <MUICard>
        <CardContent>
          <TextField
                label='Title'
                defaultValue={rColumn.title}
                fullWidth={true}
                margin='normal'
                onChange={(ev) => {rColumn.title = ev.target.value; ks.columns.trigger();}}
              />
          <BlockPicker
            className={styles.ColorPicker}
            color={rColumn.color}
            onChange={color => {rColumn.color = color.hex; ks.columns.trigger();}}
            triangle={'hide'}
          />
          <Button onClick={() => {ks.setColumnStateByColumn(rColumn, KSS.ColumnStates.data)}} variant='contained' color='primary' fullWidth={true}>Save</Button>
        </CardContent>
      </MUICard>
    </Paper></>}
  </div></>
)};

export default Column;
