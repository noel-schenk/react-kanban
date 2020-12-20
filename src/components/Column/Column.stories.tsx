/* eslint-disable */
import React from 'react';
import Column from './Column';
import * as KSS from '../../services/KanbanState.service';
import { OnBehaviorSubjectHook } from '../../Helper';

// const [rColumn, setColumn] = OnBehaviorSubjectHook<KSS.Column>(ks.columns, () => ks.columns.getValue()[0]);

export default {
    title: 'Column',
    component: Column,
};

export const Basic = () => {
    const ks = KSS.default._();

    const [columns, setColumns] = OnBehaviorSubjectHook<Array<KSS.Column>>(ks.columns, () => ks.columns.getValue());

    return (<Column column={columns[0]} />)
};