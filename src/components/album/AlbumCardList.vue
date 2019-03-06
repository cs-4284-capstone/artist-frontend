<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <promise-component :promise="myPromise" @dataLoaded="onload">
        <template v-slot:loading>
            <h1>Loading...</h1>
        </template>
        <template v-slot:failed>
            <h1>Failed.</h1>
        </template>
        <template v-slot:loaded>
            <div class="columns is-multiline">
                <album-card v-for="album in albums" :album="album" :key="album.id"/>
            </div>
        </template>
    </promise-component>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import AlbumCard from "./AlbumCard.vue";
    import ResourceStore from "../../ResourceStore";
    import PromiseComponent from "../PromiseComponent.vue";
    import {Album, AlbumID} from "../../models";
    import {just, Maybe, nothing} from "../../util";

    @Component({
        components: {
            "album-card": AlbumCard,
            "promise-component": PromiseComponent
        }
    })
    export default class AlbumCardList extends Vue {
        @Prop() ids!: "all" | AlbumID[];
        @Prop() store!: ResourceStore;

        myPromise: Promise<Maybe<Album[]>> = (this.ids === "all") ? this.store.fetchAllAlbums()
                                                                    : this.store.fetchAlbums(this.ids);
        albumsM: Maybe<Album[]> = nothing();

        get albums(): Album[] {
            return this.albumsM.unwrap;
        }

        onload(data: Album[]) {
            this.albumsM = just(data);
        }
    }
</script>

<style scoped>

</style>