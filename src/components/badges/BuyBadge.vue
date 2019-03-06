<template>
    <span class="tags has-addons" @click="buy">
        <button class="button tag">Buy {{ resourceType }}</button>
        <button class="button tag is-primary">EOS {{ this.resource.price }}</button>
    </span>
</template>

<script lang="ts">
    import { Vue, Component, Prop } from "vue-property-decorator";
    import {Album, Resource, Track} from "../../models";

    @Component
    export default class BuyBadge extends Vue {
        @Prop() resource!: Resource;
        @Prop() type!: "album" | "track";

        get resourceType(): string {
            if (this.type == "album") return "Album";
            else return "Track";
        }

        buy(): void {
            // in future, display our exciting "buy" dialog
            console.log("Tried to buy: ", this.resource);
        }
    }
</script>

<style scoped>
    span.tags {
        display: inline-flex;
    }
</style>