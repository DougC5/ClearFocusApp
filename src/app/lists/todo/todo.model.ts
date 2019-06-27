export interface Todo {
    _id: string;
    type: string;
    title: string;
    notes: string;
    project: string;
    children: string;
    parent: string;
}