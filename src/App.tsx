import React from 'react';
import './App.scss';
import Overview from './components/Overview/Overview';
import Header from './components/Header/Header';
import { ColumnStates, FieldStates, FieldTypes } from './services/KanbanState.service';
import 'fontsource-roboto';
import * as KSS from './services/KanbanState.service';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { v4 as uuid } from 'uuid';

const ks = KSS.default._();

// Available fields
ks.fields.next([
  {key: uuid(), type: FieldTypes.title, name: 'title', state: FieldStates.visible},
  {key: uuid(), type: FieldTypes.subheader, name: 'publish-date', state: FieldStates.visible},
  {key: uuid(), type: FieldTypes.image, name: 'attachment', state: FieldStates.visible},
  {key: uuid(), type: FieldTypes.paragraph, name: 'description', state: FieldStates.visible}
]);

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <Header/>
      <Overview/>
    </DndProvider>
  );
}

export default App;
