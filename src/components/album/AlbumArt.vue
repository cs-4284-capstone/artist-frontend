<template>
    <router-link :to="'/album/'+album.id">
        <img :src="artURL" :alt="artAlt"> <!-- TODO: album art -->
    </router-link>
</template>

<script lang="ts">
    import { Vue, Component, Prop } from "vue-property-decorator";
    import {Album} from "../../models";

    @Component
    export default class AlbumArt extends Vue {
        @Prop() album!: Album;

        get artURL(): string {
            return "https://bulma.io/images/placeholders/128x128.png"
        }

        get artAlt(): string {
            return this.album.title + " Album Art"
        }
    }
</script>

<style scoped>

</style>