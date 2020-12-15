import { BehaviorSubject } from "rxjs";

enum FieldTypes {title, subheader, image, paragraph};

export type Column = {title: string; position: number};
export type Card = {column: Column, fields: Array<{field: Field, value: any}>, states: Record<string, any>};
export type Field = {name: string, type: FieldTypes};

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

    getCardsByColumn(column: Column) {
        return this.cards.getValue().filter(card => card.column === column);
    }

    getFieldByType(card: Card, fieldType: FieldTypes) {
        return card.fields.filter(field => field.field.type === fieldType);
    }
}

export default KanbanState;
export {FieldTypes};