export interface Todo {
    _id: string;
    user?: string;
    type: string;
    title: string;
    notes?: string;
    parent?: string;
    color?: any;
    start: Date;
    isScheduledCal: boolean;
    draggable?: boolean;
    end?: Date;
    resizable?: object;
    actions?: [];
    isFocus?: boolean;
}
