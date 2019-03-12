<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <promise-component :promise="myPromise" @dataLoaded="onload">
        <template v-slot:loading>
            <h1>Loading...</h1>
        </template>
        <template v-slot:failed>
            <h1 class="title">Album not found.</h1>
        </template>
        <template v-slot:loaded>
            <album-header :album="album" />
            <section class="section">
                <div class="container">
                    <nav class="breadcrumb is-centered" aria-label="breadcrumbs">
                        <ul>
                            <li><router-link to="/albums">Albums</router-link></li>
                            <li class="is-active"><a href="#">{{ bread_txt(album) }}</a></li>
                        </ul>
                    </nav>
                    <track-list :ids="album.trackIDs" :store="store"/>
                </div>
                <hr>
                <div class="container">
                    <h2 class="title">About this Album</h2>
                    <p>{{ album.description }}</p>
                </div>
            </section>
        </template>
    </promise-component>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import AlbumHeader from "./AlbumHeader.vue";
    import PromiseComponent from "../PromiseComponent.vue";

    import {Album, AlbumID} from "../../models"
    import ResourceStore from "../../ResourceStore";
    import {just, Maybe, nothing} from "../../util";
    import TrackList from "../track/TrackList.vue";

    @Component({
        components: {
            "track-list": TrackList,
            "album-header": AlbumHeader,
            "promise-component": PromiseComponent
        }
    })
    export default class AlbumPage extends Vue {
        @Prop() store!: ResourceStore;
        @Prop() albumId!: AlbumID;

        //myPromise: Promise<Maybe<Album>> = this.store.fetchAlbum(this.albumId);
        albumM: Maybe<Album> = nothing();

        onload(data: Album) {
            this.albumM = just(data);
        }

        get album(): Album {
            return this.albumM.unwrap
        }

        get myPromise(): Promise<Maybe<Album>> {
            console.log("Fetching album id=" + this.albumId);
            //this.albumM = nothing();
            return this.store.fetchAlbum(this.albumId)
        }

        bread_txt(album: Album): string {
            return `${album.title} (${album.releaseDate.year})`;
        }
    }
</script>