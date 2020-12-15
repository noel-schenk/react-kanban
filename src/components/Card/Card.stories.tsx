/* eslint-disable */
import React from 'react';
import { storiesOf } from '@storybook/react';
import Card from './Card';
import * as KSS from '../../services/KanbanState.service';

const ks = KSS.default._();

storiesOf('Card', module).add('default', () => <Card card={ks.cards.getValue()[0]}/>);
