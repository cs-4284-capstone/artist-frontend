<template>
    <span class="tags has-addons" style="display: inline-flex">
        <span class="tag">Buy {{ resourceType }}</span>
        <span class="tag is-primary">EOS {{ this.resource.price }}</span>
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
    }
</script>

<style scoped>

</style>