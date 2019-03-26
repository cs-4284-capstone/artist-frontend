<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <promise-component :promise="albumPromise" @dataLoaded="onload">
        <template v-slot:loading>
            <h1>Loading...</h1>
        </template>
        <template v-slot:failed>
            <h1 class="title">Album not found.</h1>
        </template>
        <template v-slot:loaded>
            <purchase-page :store="store" :trackIds="album.trackIDs" :cost="album.price"/>
        </template>
    </promise-component>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import PurchasePage from "./PurchasePage.vue";
    import ResourceStore from "../../ResourceStore";
    import {Album, AlbumID} from "../../models";
    import {just, Maybe, nothing} from "../../util";
    import PromiseComponent from "../PromiseComponent.vue";

    @Component({
        components: {PurchasePage, PromiseComponent}
    })
    export default class AlbumPurchasePage extends Vue {
        @Prop() store!: ResourceStore;
        @Prop() albumId!: AlbumID;
        albumM: Maybe<Album> = nothing();

        get albumPromise(): Promise<Maybe<Album>> {
            return this.store.fetchAlbum(this.albumId);
        }

        onload(data: Album) {
            this.albumM = just(data);
        }

        get album(): Album {
            return this.albumM.unwrap
        }
    }
</script>

<style scoped>

</style>