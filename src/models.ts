export type TodoId = number

export interface Todo {
    title: string;
    completed: boolean;
}

export enum BootstrapType {
    PRIMARY = 'primary',
    SECONDARY = 'secondary',
    SUCCESS = 'success',
    DANGER = 'danger',
    WARNING = 'warning',
    INFO = 'info',
    LIGHT = 'light',
    DARK = 'dark'
}

export interface Message {
    type: BootstrapType,
    text: string
}