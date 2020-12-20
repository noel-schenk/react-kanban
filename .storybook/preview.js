import React from "react";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import * as KSS from './../src/services/KanbanState.service';
import { v4 as uuid } from 'uuid';

const ks = KSS.default._();

ks.fields.next([
  {key: uuid(), type: KSS.FieldTypes.title, name: 'title', state: KSS.FieldStates.visible},
  {key: uuid(), type: KSS.FieldTypes.subheader, name: 'publish-date', state: KSS.FieldStates.visible},
  {key: uuid(), type: KSS.FieldTypes.image, name: 'attachment', state: KSS.FieldStates.visible},
  {key: uuid(), type: KSS.FieldTypes.paragraph, name: 'description', state: KSS.FieldStates.visible}
]);

ks.createNewColumn();

ks.createNewCard(ks.columns.getValue()[0]);

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}

export const decorators = [
  (Story) => (
    <DndProvider backend={HTML5Backend}>
      <Story />
    </DndProvider>
  ),
];