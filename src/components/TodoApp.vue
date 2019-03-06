import {BootstrapType} from "../models";
<template>
    <div>
        <nav class="navbar navbar-light bg-light border-bottom">
            <a href="/" class="navbar-brand">
                <img src="./vue-logo.png" height="40px" alt="Vue logo">
                Todos
            </a>
        </nav>
        <jumbotron :todoStore="todoStore"/>
        <div class="container">
            <section class="card my-2 p-4">
                <input type="text" class="new-todo" placeholder="What needs to be done?"
                       v-model="newTodoTitle" @keyup.enter="submitTodo" autofocus>
                <small class="form-text text-muted">Press enter to add a new item.</small>
            </section>
            <section class="card my-2 p-4" v-if="todoStore.size > 0">
                <ul class="list-group my-2">
                    <todo-item v-for="(todo, index) in todoStore.todos" v-bind:key="todo.title"
                               :todo="todo" @toggleCompleted="todoStore.toggleTodo(index)"
                               @removeSelf="todoStore.removeTodo(index)"/>
                </ul>
                <button class="btn btn-primary" @click="todoStore.toggleAll()">Mark all as completed</button>
            </section>
            <section class="card my-2 p-4" v-if="todoStore.size > 0">
                <todo-footer :todoStore="todoStore"/>
            </section>
            <section class="card my-2 p-4" v-else>
                <api-status :todoStore="todoStore"/>
            </section>
        </div>
    </div>
</template>

<script lang="ts">
    import APIStatus from "./APIStatus.vue";
    import TodoFooter from "./TodoFooter.vue";
    import TodoHeader from "./TodoHeader.vue";
    import TodoItem from "./TodoItem.vue";
    import Jumbotron from "./jumbotron/Jumbotron.vue";

    import {Component, Prop, Vue} from "vue-property-decorator";
    import TodoStore from "../TodoStore";
    import {BootstrapType} from "../models";

    @Component({
        components: {
            "todo-item": TodoItem,
            "todo-footer": TodoFooter,
            "todo-header": TodoHeader,
            "api-status": APIStatus,
            "jumbotron": Jumbotron
        }
    })
    export default class TodoApp extends Vue {
        @Prop() todoStore!: TodoStore;
        newTodoTitle: string = '';

        mounted() {
            this.todoStore.fetch("localhost:3000")
                .then(() => console.log("Fetched todos."))
                .catch(e => {
                    console.error(e);
                    this.todoStore.pushMessage({
                        type: BootstrapType.DANGER,
                        text: "Error contacting API. See console for more details."
                    });
                });
        }

        submitTodo() {
            this.todoStore.createTodo(this.newTodoTitle);
            this.newTodoTitle = "";
        }
    }
</script>

<style lang="sass">

</style>