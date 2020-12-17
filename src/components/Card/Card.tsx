import React, { useEffect, useState } from 'react';
import styles from './Card.module.scss';
import MoreVert from '@material-ui/icons/MoreVert';
import MUICard from '@material-ui/core/Card';
import * as KSS from '../../services/KanbanState.service';
import { OnBehaviorSubjectHook } from '../../Helper';
import { TextField, CardHeader, CardMedia, CardContent, IconButton, Typography, Button } from '@material-ui/core';
import { DropzoneDialog, DropzoneDialogBase } from 'material-ui-dropzone';

const ks = KSS.default._();

const Card: React.FC<{ card: KSS.Card }> = ({card}) => {
  const [dropzoneDialogVisibility, setDropzoneDialogVisibility] = React.useState(false);
  const [title, setTitle] = OnBehaviorSubjectHook<string>(ks.cards, () => ks.getFieldByType(card, KSS.FieldTypes.title)[0].value);
  const [subheader, setSubheader] = OnBehaviorSubjectHook<string>(ks.cards, () => ks.getFieldByType(card, KSS.FieldTypes.subheader)[0].value);
  const [image, setImage] = OnBehaviorSubjectHook<string>(ks.cards, () => ks.getFieldByType(card, KSS.FieldTypes.image)[0].value)
  const [paragraphs, setParagraphs] = OnBehaviorSubjectHook<Array<any>>(ks.cards, () => ks.getFieldByType(card, KSS.FieldTypes.paragraph));

  return (
    <div className={styles.Card}>
      {card.states['display'] === KSS.DisplayStates.edit && <MUICard>
        <CardHeader
          className={styles.CardHeader}
          action={
            <IconButton aria-label='settings'>
              <MoreVert />
            </IconButton>
          }
          title='Edit'
        />
        <CardContent>
        <TextField
            label='Title'
            defaultValue={title}
            fullWidth={true}
            margin={'normal'}
            onChange={(ev) => ks.replaceFieldByType(card, KSS.FieldTypes.title, ev.target.value)}
          />
          <TextField
            label='Publish date'
            defaultValue={subheader}
            type='datetime-local'
            fullWidth={true}
            margin='normal'
            onChange={(ev) => ks.replaceFieldByType(card, KSS.FieldTypes.subheader, ev.target.value)}
          />
          <div className={styles.FormImage}>
            <img src={image} onClick={() => setDropzoneDialogVisibility(true)} />
          </div>
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
            return <TextField
              label='Description'
              multiline
              rows={4}
              defaultValue={paragraphField.value}
              fullWidth={true}
              margin='normal'
              onChange={(ev) => ks.replaceFieldByType(card, KSS.FieldTypes.paragraph, ev.target.value, index)}
            />
          })}
          <Button onClick={() => {ks.setCardDisplayStateByCard(card, KSS.DisplayStates.data)}} variant="contained" color="primary" fullWidth={true}>Save</Button>
        </CardContent>
      </MUICard>}
      {card.states['display'] === KSS.DisplayStates.data && <MUICard>
        <CardHeader
          className={styles.CardHeader}
          action={
            <IconButton aria-label='settings'>
              <MoreVert />
            </IconButton>
          }
          title={title}
          subheader={subheader}
          titleTypographyProps={{variant:'body2' }}
          subheaderTypographyProps={{variant:'body2' }}
        />
        <CardMedia
          className={styles.CardHeaderImage}
          image={image}
        />
        <CardContent>
          {paragraphs.map(paragraphField => {
            return <Typography variant='body2' color='textSecondary' component='p'>{paragraphField.value}</Typography>;
          })}
          
        </CardContent>
      </MUICard>}
    </div>
  );
}


export default Card;
