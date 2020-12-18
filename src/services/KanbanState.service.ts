import clone from "clone";
import { BetterBehaviorSubject } from "../Helper";

enum FieldTypes {title, subheader, image, paragraph}
enum CardStates {data, edit, hide}
enum FieldStates {visible, hidden}
enum ColumnStates {data, edit}

export type Column = {title: string; position: number; color: string, state: ColumnStates};
export type Card = {column: Column, fields: Array<{field: Field, value: string}>, state: CardStates};
export type Field = {name: string, type: FieldTypes, state: FieldStates};

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
        cards.push({column, fields: newFields, state: CardStates.edit})
        this.cards.trigger();
    }

    setColumnStateByColumn(column: Column, columnState: ColumnStates) {
        const columns = this.columns.getValue();
        columns[columns.indexOf(column)].state = columnState;
        this.columns.trigger();
    }

    createNewColumn() {
        const columns = this.columns.getValue();
        columns.push({position: columns.length, title: '', color: '#fff', state: ColumnStates.edit});
        this.columns.trigger();
    }

    setFieldStateByField(field: Field, fieldState: FieldStates) {
        const fields = this.fields.getValue();
        fields[fields.indexOf(field)].state = fieldState;
        this.fields.trigger();
        this.cards.trigger(); // I dont understand why in this case a full rerender of the cards is needed
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
        return this.cards.getValue().filter(card => card.column.position === column.position);
    }

    getFieldByType(card: Card, fieldType: FieldTypes) {
        card.fields.filter(field => {if (!field) debugger;});
        return card.fields.filter(field => field.field.type === fieldType);
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