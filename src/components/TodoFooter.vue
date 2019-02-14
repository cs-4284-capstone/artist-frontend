<template>
<footer class="footer">
    <span class="todo-count">
        <strong>{{itemsLeft}}</strong> {{ itemSingularOrPlural }} left to complete.
    </span>
    <br>
    <button class="btn btn-secondary" @click="todoStore.clearCompleted()">Clear completed</button>
</footer>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import TodoStore from "../TodoStore";

@Component
export default class TodoFooter extends Vue {
    @Prop() todoStore!: TodoStore;

    get itemSingularOrPlural(): string {
        return this.itemsLeft === 1 ? 'item' : 'items';
    }

    get itemsLeft() {
        return this.todoStore.remaining.length;
    }
}
</script>
