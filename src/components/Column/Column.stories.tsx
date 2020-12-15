/* eslint-disable */
import React from 'react';
import { storiesOf } from '@storybook/react';
import Column from './Column';
import * as KSS from '../../services/KanbanState.service';

const ks = KSS.default._();

storiesOf('column', module).add('default', () => <Column column={ks.columns.getValue()[0]} />);
