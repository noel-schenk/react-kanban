import { BetterBehaviorSubject } from "../Helper";
import { v4 as uuid } from 'uuid';

enum FieldTypes {title, subheader, image, paragraph}
enum CardStates {data, edit, hide}
enum FieldStates {visible, hidden}
enum ColumnStates {data, edit, dnd}

/**
 * Data representation of the Columns component
 */
export type Column = {key: string, title: string; position: number; color: string, state: ColumnStates};

/**
 * Data representation of the Cards component
 */
export type Card = {key: string, column: Column, fields: Array<{field: Field, value: string}>, state: CardStates};

/**
 * Data representation of the Fields component
 */
export type Field = {key: string, name: string, type: FieldTypes, state: FieldStates};


/**
 * Active state of the Kanban Board
 */
class KanbanState {
    private static KanbanState:KanbanState;

    public columns = new BetterBehaviorSubject(new Array<Column>());
    public cards = new BetterBehaviorSubject(new Array<Card>());
    public fields = new BetterBehaviorSubject(new Array<Field>());

    private constructor() {}

    public static _() {
        if (KanbanState.KanbanState) {
            return KanbanState.KanbanState;
        } else {
            KanbanState.KanbanState = new KanbanState();
            return KanbanState.KanbanState;
        }
    }

    /**
     * Helper functions for the KanbanState data
     * columns, cards and fields will be triggered and shallow cloned while the Objects itself (Column, Card, Field)
     * will be passed by reference and will not be cloned 
     */


    generateDemoContent() {
        this.columns.next([
            {key: uuid(), position: 0, title: 'Open', color: '#ffc3df', state: ColumnStates.data},
            {key: uuid(), position: 1, title: 'In Progress', color: '#c3d3ff', state: ColumnStates.data},
            {key: uuid(), position: 2, title: 'Published', color: '#ffe7c3', state: ColumnStates.data}
        ]);
        this.createNewCard(this.columns.getValue()[0]);
    }

    moveCardToColumn(card: Card, column: Column) {
        card.column = column;
        this.cards.trigger();
    }

    createNewCard(column: Column) {
        const cards = this.cards.getValue();
        const fields = this.fields.getValue();
        const newFields = fields.map(field => {
            const newField = {field: field, value: ''};
            switch (field.name) {
                case 'attachment' :
                    newField.value = 'https://placekitten.com/408/287'; break;
                case 'publish-date' :
                    newField.value = new Date(Date.now()).toISOString().substr(0, 16); break;
            }
            return newField;
        });
        cards.push({key: uuid(), column, fields: newFields, state: CardStates.edit})
        this.cards.trigger();
    }

    setColumnStateByColumn(column: Column, columnState: ColumnStates) {
        const columns = this.columns.getValue();
        columns[columns.indexOf(column)].state = columnState;
        this.columns.trigger();
    }

    removeColumn(column: Column) {
        const columns = this.columns.getValue();
        const cards = this.getCardsByColumn(column);
        cards.forEach(card => this.removeCardByCard(card));
        columns.splice(columns.indexOf(column), 1);
        this.columns.trigger();
    }

    createNewColumn() {
        const columns = this.columns.getValue();
        columns.push({key: uuid(), position: columns.length, title: '', color: '#fff', state: ColumnStates.edit});
        this.columns.trigger();
    }

    setFieldStateByField(field: Field, fieldState: FieldStates) {
        const fields = this.fields.getValue();
        fields[fields.indexOf(field)].state = fieldState;
        this.fields.trigger();
    }

    removeCardByCard(card: Card) {
        const cards = this.cards.getValue();
        cards.splice(cards.indexOf(card), 1);
        this.cards.trigger();
    }

    setCardDisplayStateByCard(card: Card, cardState: CardStates) {
        card.state = cardState;
        this.cards.trigger();
    }

    getCardsByColumn(column: Column) {
        const cards = this.cards.getValue().filter(card => card.column.position === column.position);
        return [...cards];
    }

    getFieldsByType(card: Card, fieldType: FieldTypes) {
        card.fields.filter(field => {if (!field) debugger;});
        const fields = card.fields.filter(field => field.field.type === fieldType);
        return [...fields];
    }

    replaceFieldByType(card: Card, fieldType: FieldTypes, newValue: any, index?: number) {
        let indexCount = 0;
        card.fields = card.fields.map(field => {
            if (field.field.type === fieldType) {
                if (index && indexCount !== index) {
                    indexCount++;
                } else {
                    field.value = newValue;
                }
            }
            return field;
        });
        this.cards.trigger();
    }
}

export default KanbanState;
export {FieldTypes, CardStates, FieldStates, ColumnStates};