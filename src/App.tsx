import React from 'react';
import './App.scss';
import Overview from './components/Overview/Overview';
import Header from './components/Header/Header';
import KanbanState, { FieldTypes } from './services/KanbanState.service';
import clone from 'clone';
import 'fontsource-roboto';
import * as KSS from './services/KanbanState.service';
const ks = KSS.default._();

// DEMO DATA REMOVE FOR PRODUCTION

  ks.columns.next([
    {position: 0, title: 'Open'},
    {position: 1, title: 'In Progress'},
    {position: 2, title: 'Published'}
  ]);
  ks.fields.next([
    {type: FieldTypes.title, name: 'title'},
    {type: FieldTypes.subheader, name: 'publish-date'},
    {type: FieldTypes.image, name: 'attachment'},
    {type: FieldTypes.paragraph, name: 'description'}
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
    const testFields = clone(defaultFieldsInit);
    testFields[0].value = 'Test Title';
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
      {position: 0, title: 'Start'},
      {position: 1, title: 'In Progress'},
      {position: 2, title: 'Published'}
    ]);
  }, 5000);

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
