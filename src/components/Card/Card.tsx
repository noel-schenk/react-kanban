import React from 'react';
import styles from './Card.module.scss';
import MoreVert from '@material-ui/icons/MoreVert';
import MUICard from '@material-ui/core/Card';
import * as KSS from '../../services/KanbanState.service';
import { BetterBehaviorSubject, OnBehaviorSubjectHook } from '../../Helper';
import { TextField, CardHeader, CardMedia, CardContent, IconButton, Typography, Button, Menu, MenuItem, FormControlLabel, Checkbox } from '@material-ui/core';
import { DropzoneDialogBase } from 'material-ui-dropzone';
import { Field } from '../../services/KanbanState.service';
import { useDrag } from 'react-dnd';

const ks = KSS.default._();

/**
 * Displaying, editing KSS.Card data
 * Hidding KSS.Fields data
 */
const Card: React.FC<{card: KSS.Card}> = ({card}) => {
  const [dropzoneDialogVisibility, setDropzoneDialogVisibility] = React.useState(false);
  const [menu, setMenu] = React.useState(false);
  const [menuAnchorEl, setMenuAnchorEl] = React.useState();

  const [title, setTitle] = OnBehaviorSubjectHook<{field: KSS.Field; value: any;}[]>(ks.cards, () => ks.getFieldsByType(card, KSS.FieldTypes.title));
  const [subheader, setSubheader] = OnBehaviorSubjectHook<{field: KSS.Field; value: any;}[]>(ks.cards, () => ks.getFieldsByType(card, KSS.FieldTypes.subheader));
  const [image, setImage] = OnBehaviorSubjectHook<{field: KSS.Field; value: any;}[]>(ks.cards, () => ks.getFieldsByType(card, KSS.FieldTypes.image))
  const [paragraphs, setParagraphs] = OnBehaviorSubjectHook<Array<any>>(ks.cards, () => ks.getFieldsByType(card, KSS.FieldTypes.paragraph));
  const [fields, setFields] = OnBehaviorSubjectHook<{ field: KSS.Field; value: any; }[]>(ks.fields, () => [...card.fields]);

  const checkVisibility = (field: { field: Field; value: any; }) => field.field.state === KSS.FieldStates.visible;

  const [{ isDragging }, drag] = useDrag({
    item: { type: 'card', card: card },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
      card
    })
  });

  return (
    <div className={styles.Card} ref={drag}>
      <Menu
        open={menu}
        onClose={() => setMenu(false)}
        anchorEl={menuAnchorEl}
      >
        <MenuItem onClick={() => {setMenu(false); ks.setCardDisplayStateByCard(card, KSS.CardStates.edit)}}>Edit card</MenuItem>
        <MenuItem onClick={() => {setMenu(false); ks.removeCardByCard(card)}}>Remove card</MenuItem>
        <MenuItem onClick={() => {setMenu(false); ks.setCardDisplayStateByCard(card, KSS.CardStates.hide)}}>Hide fields</MenuItem>
      </Menu>
      {card.state === KSS.CardStates.hide && <MUICard>
       <CardHeader
          className={styles.CardHeader}
          title='Hide fields'
        />
        <CardContent>
          {fields.map(field => {
            return <div key={field.field.key}><FormControlLabel
              control={<Checkbox checked={field.field.state === KSS.FieldStates.hidden}
              onChange={() => {ks.setFieldStateByField(field.field, field.field.state === KSS.FieldStates.hidden ? KSS.FieldStates.visible : KSS.FieldStates.hidden)}} />} label={field.field.name} /></div>;
          })}
          <Button onClick={() => {ks.setCardDisplayStateByCard(card, KSS.CardStates.data)}} variant='contained' color='primary' fullWidth={true}>Save</Button>
        </CardContent>
      </MUICard>}
      {card.state === KSS.CardStates.edit && <MUICard>
        <CardHeader
          className={styles.CardHeader}
          action={
            <IconButton aria-label='settings'>
              <MoreVert />
            </IconButton>
          }
          onClick={(ev: any) => {setMenu(true); setMenuAnchorEl(ev.target)}}
          title='Edit'
        />
        <CardContent>
          {checkVisibility(title[0]) && <TextField
            label='Title'
            defaultValue={title[0].value}
            fullWidth={true}
            margin={'normal'}
            onChange={(ev) => ks.replaceFieldByType(card, KSS.FieldTypes.title, ev.target.value)}
          />}
          {checkVisibility(subheader[0]) && <TextField
            label='Publish date'
            defaultValue={subheader[0].value}
            type='datetime-local'
            fullWidth={true}
            margin='normal'
            onChange={(ev) => ks.replaceFieldByType(card, KSS.FieldTypes.subheader, ev.target.value)}
          />}
          {checkVisibility(image[0]) && <div className={styles.FormImage}>
            <img src={image[0].value} onClick={() => setDropzoneDialogVisibility(true)} />
          </div>}
          <DropzoneDialogBase
            dialogProps={{} as any}
            fileObjects={{} as any}
            acceptedFiles={['image/*']}
            filesLimit={1}
            onAdd={(files: any) => {ks.replaceFieldByType(card, KSS.FieldTypes.image, files[0].data); setDropzoneDialogVisibility(false);}}
            open={dropzoneDialogVisibility}
            onClose={() => setDropzoneDialogVisibility(false)}
          />
          {paragraphs.map((paragraphField, index) => {
            return <>{checkVisibility(paragraphField) && <TextField
              label='Description'
              multiline
              rows={4}
              defaultValue={paragraphField.value}
              fullWidth={true}
              margin='normal'
              onChange={(ev) => ks.replaceFieldByType(card, KSS.FieldTypes.paragraph, ev.target.value, index)}
            />}</>
          })}
          <Button onClick={() => {ks.setCardDisplayStateByCard(card, KSS.CardStates.data)}} variant='contained' color='primary' fullWidth={true}>Save</Button>
        </CardContent>
      </MUICard>}
      {card.state === KSS.CardStates.data && <MUICard>
        <CardHeader
          className={styles.CardHeader}
          action={
            <IconButton aria-label='settings'>
              <MoreVert />
            </IconButton>
          }
          onClick={(ev: any) => {setMenu(true); setMenuAnchorEl(ev.target)}}
          title={checkVisibility(title[0]) ? title[0].value : ''}
          subheader={checkVisibility(subheader[0]) ? subheader[0].value : ''}
          titleTypographyProps={{variant:'body2' }}
          subheaderTypographyProps={{variant:'body2' }}
        />
        {checkVisibility(image[0]) && <CardMedia
          className={styles.CardHeaderImage}
          image={image[0].value}
        />}
        <CardContent>
          {paragraphs.map(paragraphField => {
            return <>{checkVisibility(paragraphField) && <Typography variant='body2' color='textSecondary' component='p'>{paragraphField.value}</Typography>}</>;
          })}
          
        </CardContent>
      </MUICard>}
    </div>
  );
}

export default Card;
