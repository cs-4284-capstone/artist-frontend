import {BootstrapType, Message, Todo, TodoId} from "./models";
import axios, {AxiosResponse} from 'axios';

export enum TodoStoreState {
    INIT, LOADING, LOADED, ERROR
}

export default class TodoStore {

    todos: Todo[];
    messages: Message[] = [];
    state: TodoStoreState = TodoStoreState.INIT;

    constructor(todos: Todo[] = []) {
        this.todos = todos;
    }

    async fetch(backend_host: string) {
        this.state = TodoStoreState.LOADING;
        try {
            let resp: AxiosResponse<Todo[]> = await axios.get<Todo[]>('http://' + backend_host + '/todos');
            this.todos = resp.data;
            this.state = TodoStoreState.LOADED;
        } catch (e) {
            this.state = TodoStoreState.ERROR;
            throw e;
        }
    }

    createTodo(title: string): void {
        const newtodo: Todo = {
            title, completed: false
        };

        this.todos.push(newtodo);
    }

    removeTodo(index: TodoId): void {
        if (index >= this.todos.length) {
            throw new Error(`Index deletion ad ${index} greated than ${this.todos.length}`)
        }

        this.todos.splice(index, 1);
        this.pushMessage({ type: BootstrapType.INFO, text: "Deleted TODO."});
    }

    toggleTodo(index: TodoId): boolean {
        const current = this.todos[index];
        const newstate = !current.completed;
        this.todos.splice(index, 1, {...current, completed: newstate});
        return newstate;
    }

    clearCompleted(): void {
        this.todos = this.remaining;
        this.pushMessage({type: BootstrapType.INFO, text: "Cleared completed messages."})
    }

    toggleAll(): void {
        const stateForAll = this.completed.length !== this.size;
        for (const todo of this.todos) {
            todo.completed = stateForAll
        }
    }

    pushMessage(msg: Message): void {
        console.log(msg);
        this.messages.push(msg);
    }

    dismissMessage(index: number): void {
        if (index >= this.messages.length) {
            throw new Error(`Index deletion at ${index} greater than ${this.messages.length}`)
        }

        this.messages.splice(index, 1);
    }

    get size(): number {
        return this.todos.length;
    }

    get completed(): Todo[] {
        return this.todos.filter(todo => todo.completed);
    }

    get remaining(): Todo[] {
        return this.todos.filter(todo => !todo.completed);
    }
}