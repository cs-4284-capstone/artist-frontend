<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <promise-component :promise="myPromise" @dataLoaded="onload">
        <template v-slot:loading>
            <h1>Loading...</h1>
        </template>
        <template v-slot:failed>
            <h1>Failed.</h1>
        </template>
        <template v-slot:loaded>
            <li class="media">
                <figure class="media-left">
                    <p class="image is-64x64">
                        <album-art :album="album" />
                    </p>
                </figure>
                <div class="media-content">
                    <div class="content">
                        <p>
                            <strong>{{ track.title }}</strong>
                            <runtime-badge :runtime="track.runtime" />
                        </p>
                        <span style="display: block">{{ album.title }}</span>
                    </div>
                </div>
                <div class="media-right">
                    <buy-badge type="track" :resource="track" />
                </div>
            </li>
        </template>
    </promise-component>
</template>

<script lang="ts">
    import { Vue, Component, Prop } from "vue-property-decorator";
    import {Album, Track, TrackID} from "../../models";

    import BuyBadge from "../badges/BuyBadge.vue";
    import AlbumArt from "../album/AlbumArt.vue";
    import RunTimeBadge from "../badges/RunTimeBadge.vue";
    import PromiseComponent from "../PromiseComponent.vue";
    import ResourceStore from "../../ResourceStore";
    import {just, Maybe, nothing} from "../../util";

    type AlbumAndTrack = {album: Album, track: Track};

    @Component({
        components: {
            "runtime-badge": RunTimeBadge,
            "buy-badge": BuyBadge,
            "album-art": AlbumArt,
            "promise-component": PromiseComponent
        }
    })
    export default class AlbumInfoTrackItem extends Vue {
        @Prop() trackId!: TrackID;
        @Prop() store!: ResourceStore;

        myPromise: Promise<Maybe<AlbumAndTrack>> = AlbumInfoTrackItem.fetchAlbumWithTrack(this.store, this.trackId);
        albumM: Maybe<Album> = nothing();
        trackM: Maybe<Track> = nothing();

        get album(): Album {
            return this.albumM.unwrap;
        }

        get track(): Track {
            return this.trackM.unwrap;
        }

        onload(data: AlbumAndTrack) {
            this.trackM = just(data.track);
            this.albumM = just(data.album);
        }

        static async fetchAlbumWithTrack(store: ResourceStore, trackId: TrackID): Promise<Maybe<AlbumAndTrack>> {
            let track = await store.fetchTrack(trackId);
            if (!track.is) return nothing();

            let album = await store.fetchAlbum(track.unwrap.albumId);
            if (!album.is) return nothing();

            return just({album: album.unwrap, track: track.unwrap});
        }
    }
</script>

<style scoped>

</style>