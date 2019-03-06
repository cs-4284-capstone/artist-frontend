<template>
    <div>
        <slot name="loading" v-if="promiseState === 'loading'"></slot>
        <slot name="loaded" v-else-if="promiseState === 'loaded'"></slot>
        <slot name="failed" v-else></slot>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import {Maybe} from "../util";

    type LoadingState = "loading" | "loaded" | "failed";

    @Component
    export default class PromiseComponent<T> extends Vue{
        @Prop() promise!: Promise<Maybe<T>>;
        promiseState: LoadingState = "loading";

        mounted() {
            this.promise.then(res => {
                this.promiseState = "loaded";
                this.$emit("dataLoaded", res);
            }).catch(e => {
                this.promiseState = "failed";
                console.error(e);
                this.$emit("dataLoadFailure", e);
            })
        }
    }
</script>

<style scoped>

</style>