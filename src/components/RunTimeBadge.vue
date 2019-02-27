<template>
    <span class="level-item tag">{{ text }}</span>
</template>

<script lang="ts">
    import { Vue, Component, Prop } from "vue-property-decorator";
    import {RunTime, runtimeString} from "../models";

    @Component
    export default class RunTimeBadge extends Vue {
        @Prop() runtime!: RunTime;

        get text(): string {
            return runtimeString(this.runtime);
        }
    }
</script>

<style scoped>

</style>