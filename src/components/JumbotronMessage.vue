<template>
    <div class="alert alert-dismissible fade show" :class="alertClass" role="alert">
        {{ message.text }}
        <button type="button" class="close" aria-label="Close" @click="$emit('dismiss')">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
</template>

<script lang="ts">
    import { Vue, Component, Prop } from 'vue-property-decorator';
    import { Message } from "../models";

    @Component
    export default class JumbotronMessage extends Vue {
        @Prop() message!: Message;

        get alertClass(): string {
            return 'alert-' + this.message.type;
        }
    }
</script>