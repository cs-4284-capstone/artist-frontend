<template>
    <div class="level is-mobile" style="font-weight: normal">
        <div class="level-left">
            <span class="level-item">{{ track.name }}</span>
            <runtime-badge :runtime="track.runtime" />
        </div>
        <div class="level-right">
            <buy-badge type="track" :resource="track" />
        </div>
    </div>
</template>

<script lang="ts">
    import { Vue, Component, Prop } from "vue-property-decorator";
    import RunTimeBadge from "./RunTimeBadge.vue";
    import BuyBadge from "./BuyBadge.vue";
    import {Track} from "../models";

    @Component({
        components: {
            "runtime-badge": RunTimeBadge,
            'buy-badge': BuyBadge
        }
    })
    export default class TrackListItem extends Vue {
        @Prop() track!: Track
    }
</script>

<style scoped>

</style>