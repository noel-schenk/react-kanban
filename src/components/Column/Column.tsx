import React from 'react';
import styles from './Column.module.scss';
import Paper from '@material-ui/core/Paper';
import Card from '../Card/Card';
import * as KSS from '../../services/KanbanState.service';
import { OnBehaviorSubjectHook } from '../../Helper';
import { Button, CardContent, IconButton, Menu, MenuItem, Dialog, TextField, DialogContent, DialogContentText, DialogActions, DialogTitle } from '@material-ui/core';
import { BlockPicker } from 'react-color';
import { MoreVert } from '@material-ui/icons';
import MUICard from '@material-ui/core/Card';
import { useDrop } from 'react-dnd';

const ks = KSS.default._();

/**
 * Adding and displaying cards
 * Editing and removing the column
 */
const Column: React.FC<{ column: KSS.Column }> = ({column}) => {
  const [menu, setMenu] = React.useState(false);
  const [menuAnchorEl, setMenuAnchorEl] = React.useState();
  const [modal, setModal] = React.useState(false);
  
  const [cards, setCards] = OnBehaviorSubjectHook<Array<KSS.Card>>(ks.cards, () => ks.getCardsByColumn(column));
  const [rColumn, setColumn] = OnBehaviorSubjectHook<KSS.Column>(ks.columns, () => column);

  const [{ isOver }, drop] = useDrop({
    accept: 'card',
    drop: (dowt) => {
      const card = ((dowt as any).card as KSS.Card);
      ks.moveCardToColumn(card, column);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver()
    })
  });

  return (
  <>
  <Dialog
    open={modal}
    onClose={() => setModal(false)}
    aria-labelledby='simple-modal-title'
    aria-describedby='simple-modal-description'
  >
    <DialogTitle>Removes cards?</DialogTitle>
    <DialogContent>
      <DialogContentText>Do you want to remove this Column and all Cards inside it?</DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button variant='contained' color='secondary' onClick={() => {setModal(false); ks.removeColumn(column);}}>Yes</Button>
      <Button variant='contained' color='primary' onClick={() => {setModal(false);}}>No</Button>
    </DialogActions>
  </Dialog>
  <Menu
    open={menu}
    onClose={() => setMenu(false)}
    anchorEl={menuAnchorEl}
  >
    <MenuItem onClick={() => {setMenu(false); ks.setColumnStateByColumn(column, KSS.ColumnStates.edit)}}>Edit column</MenuItem>
    <MenuItem onClick={() => {
      setMenu(false);
      if (ks.getCardsByColumn(column).length >  0) {
        setModal(true);
      } else {
        ks.removeColumn(column);
      }
    }}>Remove column</MenuItem>
    <MenuItem onClick={() => {setMenu(false); ks.createNewCard(column)}}>Add card</MenuItem>
  </Menu>
  <div className={styles.Column} ref={drop}>
    <IconButton
      className={styles.Settings}
      aria-label='settings'
      onClick={(ev: any) => {setMenu(true); setMenuAnchorEl(ev.target)}}
      >
      <MoreVert />
    </IconButton>
    {rColumn.state === KSS.ColumnStates.data && <><h2>{rColumn.title}</h2>
    <Paper style={{backgroundColor: rColumn.color}}>
      {cards.map((card) => {
        return <Card key={card.key} card={card}></Card>;
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
