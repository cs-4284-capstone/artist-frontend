<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <promise-component :promise="myPromise" @dataLoaded="onload">
        <template v-slot:loading>
            <h1>Loading...</h1>
        </template>
        <template v-slot:loaded>
            <h1>Loaded!</h1>
        </template>
        <template v-slot:failed>
            <h1>Failed.</h1>
        </template>
    </promise-component>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import AlbumHeader from "./AlbumHeader.vue";
    import PromiseComponent from "../PromiseComponent.vue";

    import {Album, AlbumID} from "../../models"
    import ResourceStore from "../../ResourceStore";
    import {Maybe} from "../../util";

    @Component({
        components: {
            "album-header": AlbumHeader,
            "promise-component": PromiseComponent
        }
    })
    export default class AlbumPage extends Vue {
        @Prop() store!: ResourceStore;
        @Prop() albumId!: AlbumID;

        myPromise: Promise<Maybe<Album>> = this.store.fetchAlbum(this.albumId);

        onload(data: Maybe<Album>) {
            console.log(data);
        }
    }
</script>

<style scoped>

</style>