<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <promise-component :promise="myPromise" @dataLoaded="onload">
        <template v-slot:loading>
            <h1>Loading...</h1>
        </template>
        <template v-slot:failed>
            <h1>Failed to load track.</h1>
        </template>
        <template v-slot:loaded>
            <div class="level is-mobile" style="font-weight: normal">
                <div class="level-left">
                    <span class="level-item">{{ track.title }}</span>
                    <runtime-badge :runtime="track.runtime" />
                </div>
                <div class="level-right">
                    <buy-badge type="track" :resource="track" />
                </div>
            </div>
        </template>
    </promise-component>
</template>

<script lang="ts">
    import { Vue, Component, Prop } from "vue-property-decorator";
    import RunTimeBadge from "../badges/RunTimeBadge.vue";
    import BuyBadge from "../badges/BuyBadge.vue";
    import PromiseComponent from "../PromiseComponent.vue";

    import {Track, TrackID} from "../../models";
    import ResourceStore from "../../ResourceStore";
    import {just, Maybe, nothing} from "../../util";

    @Component({
        components: {
            "runtime-badge": RunTimeBadge,
            'buy-badge': BuyBadge,
            "promise-component": PromiseComponent
        }
    })
    export default class TrackListItem extends Vue {
        @Prop() trackId!: TrackID;
        @Prop() store!: ResourceStore;

        myPromise: Promise<Maybe<Track>> = this.store.fetchTrack(this.trackId);
        trackM: Maybe<Track> = nothing();

        get track(): Track {
            return this.trackM.unwrap;
        }

        onload(data: Track) {
            this.trackM = just(data);
        }
    }
</script>