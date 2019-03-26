<template>
    <div>
        <slot name="loading" v-if="promiseState === 'loading'"></slot>
        <slot name="loaded" v-else-if="promiseState === 'loaded'"></slot>
        <slot name="failed" v-else></slot>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue, Watch} from "vue-property-decorator";
    import {Maybe} from "../util";

    type LoadingState = "loading" | "loaded" | "failed";

    @Component
    export default class PromiseComponent<T> extends Vue{
        @Prop({ type: Promise }) promise!: Promise<Maybe<T>>;
        promiseState: LoadingState = "loading";

        mounted() {
            this.onPromiseChange();
        }

        @Watch('promise')
        onPromiseChange() {
            console.log("Promise updated.");
            this.promise.then(res => {
                this.promiseState = "loaded";
                res.match(
                    thing => this.$emit("dataLoaded", thing),
                    () => this.$emit("dataNotFound")
                );
            }).catch(e => {
                this.promiseState = "failed";
                console.error("Promise in PromiseComponent failed.");
                console.error(e);
                this.$emit("dataLoadFailure", e);
            })
        }
    }
</script>

<style scoped>

</style>