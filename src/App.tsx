import React from 'react';
import './App.scss';
import Overview from './components/Overview/Overview';
import Header from './components/Header/Header';
import { ColumnStates, FieldStates, FieldTypes } from './services/KanbanState.service';
import 'fontsource-roboto';
import * as KSS from './services/KanbanState.service';
const ks = KSS.default._();

// DEMO DATA REMOVE FOR PRODUCTION
ks.fields.next([
  {type: FieldTypes.title, name: 'title', state: FieldStates.visible},
  {type: FieldTypes.subheader, name: 'publish-date', state: FieldStates.visible},
  {type: FieldTypes.image, name: 'attachment', state: FieldStates.visible},
  {type: FieldTypes.paragraph, name: 'description', state: FieldStates.visible}
]);
/*
  ks.columns.next([
    {position: 0, title: 'Open', color: '#ffc3df', state: ColumnStates.data},
    {position: 1, title: 'In Progress', color: '#c3d3ff', state: ColumnStates.data},
    {position: 2, title: 'Published', color: '#ffe7c3', state: ColumnStates.data}
  ]);
  ks.fields.next([
    {type: FieldTypes.title, name: 'title', state: FieldStates.visible},
    {type: FieldTypes.subheader, name: 'publish-date', state: FieldStates.visible},
    {type: FieldTypes.image, name: 'attachment', state: FieldStates.visible},
    {type: FieldTypes.paragraph, name: 'description', state: FieldStates.visible}
  ]);

  const defaultFieldsInit = [
    {field: ks.fields.getValue()[0], value: 'Example Title'},
    {field: ks.fields.getValue()[1], value: '2020-12-12T20:30'},
    {field: ks.fields.getValue()[2], value: 'https://placekitten.com/300/200'},
    {field: ks.fields.getValue()[3], value: 'paragraph'}
  ];

  const cardsInit = [
    {
      column: ks.columns.getValue()[0],
      fields: defaultFieldsInit.slice(),
      states: {
        'display': KSS.DisplayStates.data
      }
    },
    {
      column: ks.columns.getValue()[0],
      fields: defaultFieldsInit.slice(),
      states: {
        'display': KSS.DisplayStates.data
      }
    },
    {
      column: ks.columns.getValue()[1],
      fields: defaultFieldsInit.slice(),
      states: {
        'display': KSS.DisplayStates.data
      }
    }
  ];

  ks.cards.next(cardsInit);

  setTimeout(() => {
    const testFields = [{field: ks.fields.getValue()[0], value: 'Test Title'},
    {field: ks.fields.getValue()[1], value: '2020-12-12T20:30'},
    {field: ks.fields.getValue()[2], value: 'https://placekitten.com/300/200'},
    {field: ks.fields.getValue()[3], value: 'paragraph'}];
    cardsInit[0].column = ks.columns.getValue()[2];
    cardsInit[0].fields = testFields;
    cardsInit.push({
      column: ks.columns.getValue()[2],
      fields: defaultFieldsInit.slice(),
      states: {
        'display': KSS.DisplayStates.edit
      }
    });
    ks.cards.next(cardsInit);
    ks.columns.next([
      {position: 0, title: 'Start', color: '#ffc3df', state: ColumnStates.data},
      {position: 1, title: 'In Progress', color: '#c3d3ff', state: ColumnStates.data},
      {position: 2, title: 'Published', color: '#ffe7c3', state: ColumnStates.data}
    ]);
    setTimeout(() => {
      ks.columns.next([
        {position: 0, title: 'Start', color: '#ffc3df', state: ColumnStates.data},
        {position: 1, title: 'In Progress', color: '#c3d3ff', state: ColumnStates.data},
        {position: 2, title: 'Published', color: '#ffe7c3', state: ColumnStates.data},
        {position: 3, title: 'Whaaat', color: '#ffe7c3', state: ColumnStates.data} // why is it adding here but not in the service itself?
      ]);
    }, 1000);
  }, 1000);
*/
// END DEMO DATA


function App() {
  return (
    <div className="App">
      <Header/>
      <Overview/>
    </div>
  );
}

export default App;
