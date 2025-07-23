export enum Priority {
    LOW = "low",
    MEDIUM = "medium",
    HIGH = "high"
}


export interface ITodo {
    id: number;
    title: string;
    description: string;
    priority: Priority;
}
