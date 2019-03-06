<template>
    <div class="m-jumbotron">
        <jumbotron-message v-for="(msg, index) in todoStore.messages" v-bind:key="msg.text"
                           :message="msg" @dismiss="todoStore.dismissMessage(index)" />
    </div>
</template>

<script lang="ts">
    import JumbotronMessage from "./JumbotronMessage.vue";

    import { Vue, Component, Prop } from 'vue-property-decorator';
    import TodoStore from "../../TodoStore";

    @Component({
    components: {
        'jumbotron-message': JumbotronMessage
    }
    })
    export default class Jumbotron extends Vue {
        @Prop() todoStore!: TodoStore;
    }
</script>