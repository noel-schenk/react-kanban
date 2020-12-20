/* eslint-disable */
import React from 'react';
import Card from './Card';
import * as KSS from '../../services/KanbanState.service';

const ks = KSS.default._();

export default {
    title: 'Card',
    component: Card,
};

export const Basic = () => 
    <div style={{maxWidth: '240px'}}>
        <Card card={ks.cards.getValue()[0]}/>
    </div>;