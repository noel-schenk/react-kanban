import { BehaviorSubject } from "rxjs";

enum FieldTypes {title, subheader, image, paragraph}
enum DisplayStates {data, edit, hide}
enum FieldStates {visible, hidden}
enum ColumnStates {data, edit}

export type Column = {title: string; position: number; color: string, state: ColumnStates};
export type Card = {column: Column, fields: Array<{field: Field, value: any}>, states: Record<string, any>};
export type Field = {name: string, type: FieldTypes, state: FieldStates};

class KanbanState {
    private static KanbanState:KanbanState;

    public columns = new BehaviorSubject(new Array<Column>());
    public cards = new BehaviorSubject(new Array<Card>());
    public fields = new BehaviorSubject(new Array<Field>());

    private constructor() {}

    public static _() {
        if (KanbanState.KanbanState) {
            return KanbanState.KanbanState;
        } else {
            KanbanState.KanbanState = new KanbanState();
            return KanbanState.KanbanState;
        }
    }

    createNewColumn() {
        const columns = this.columns.getValue();
        columns.push({title: '', position: columns.length, color: '#fff', state: ColumnStates.edit});
        this.columns.next(columns);
    }

    setFieldStateByField(field: Field, fieldState: FieldStates) {
        const fields = this.fields.getValue();
        fields[fields.indexOf(field)].state = fieldState;
        this.fields.next(fields);
        this.cards.next(this.cards.getValue()); // I dont understand why in this case a full rerender of the cards is needed
    }

    removeCardByCard(card: Card) {
        const cards = this.cards.getValue();
        cards.splice(cards.indexOf(card), 1);
        this.cards.next(cards);
        console.log(this.cards.getValue());
    }

    setCardDisplayStateByCard(card: Card, displayState: DisplayStates) {
        card.states['display'] = displayState;
        const cards = this.cards.getValue();
        cards[cards.indexOf(card)] = card;
        this.cards.next(cards);
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
        this.cards.next(this.cards.getValue());
    }
}

export default KanbanState;
export {FieldTypes, DisplayStates, FieldStates, ColumnStates};