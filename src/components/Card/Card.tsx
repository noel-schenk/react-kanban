import React, { useEffect, useState } from 'react';
import styles from './Card.module.scss';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MoreVert from '@material-ui/icons/MoreVert';
import MUICard from '@material-ui/core/Card';
import * as KSS from '../../services/KanbanState.service';
import { OnBehaviorSubjectHook } from '../../Helper';
import { first } from 'rxjs/operators';

const ks = KSS.default._();

const Card: React.FC<{ card: KSS.Card }> = ({card}) => {
  console.log('render');

  return (
    <MUICard>
      <CardHeader
        action={
          <IconButton aria-label="settings">
            <MoreVert />
          </IconButton>
        }
        title={OnBehaviorSubjectHook(ks.cards, () => ks.getFieldByType(card, KSS.FieldTypes.title)[0].value)}
        subheader={OnBehaviorSubjectHook(ks.cards, () => ks.getFieldByType(card, KSS.FieldTypes.subheader)[0].value)}
      />
      <CardMedia
        image="/static/images/cards/paella.jpg"
        title="Paella dish"
      />
      <CardContent>
        {OnBehaviorSubjectHook(ks.cards, () => ks.getFieldByType(card, KSS.FieldTypes.paragraph).map(paragraphField => {
          return <Typography variant="body2" color="textSecondary" component="p">{paragraphField.value}</Typography>;
        }))}
        
      </CardContent>
    </MUICard>
  );
}


export default Card;
