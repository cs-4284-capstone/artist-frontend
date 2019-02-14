<template>
    <div>
        <span v-if="state === TodoStoreState.LOADING">Loading todos...</span>
        <span v-else-if="state === TodoStoreState.ERROR">Error contacting API. See console for more details.</span>
        <span v-else>No TODOs yet.</span>
    </div>
</template>

<script lang="ts">
    import { Vue, Component, Prop } from 'vue-property-decorator';
    import TodoStore, {TodoStoreState} from "../TodoStore";

    @Component
    export default class APIStatus extends Vue {
        @Prop() todoStore!: TodoStore;

        TodoStoreState = TodoStoreState;

        get state(): TodoStoreState {
            return this.todoStore.state;
        }
    }
</script>