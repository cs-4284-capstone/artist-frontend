<template>
    <li class="{ completed: todo.completed, list-group-item }">
        <div class="view">
            <input type="checkbox" class="toggle" v-model="todo.completed" />
            <label class="mx-2">{{ todo.title }}</label>
            <button class="destroy btn btn-danger btn-sm" @click="$emit('removeSelf')">X</button>
        </div>
    </li>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { Todo } from "../models";

@Component
export default class TodoItem extends Vue {
    @Prop() todo!: Todo
}
</script>
