<template>
    <div>
        <div class="hero">
            <div class="hero-body" style="background-color: gray" @click="onHeroMsgClick">
                <h1 class="title">{{ heroMessage.title }}</h1>
                <p class="subtitle">{{ heroMessage.subtitle }}</p>
            </div>
        </div>
        <section class="section">
            <track-list-section :store="store"></track-list-section>
            <hr class="hr">
            <album-list-section :store="store"></album-list-section>
        </section>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import PromiseComponent from "../PromiseComponent.vue";
    import TrackList from "../track/TrackList.vue";
    import ResourceStore from "../../ResourceStore";
    import AlbumCardList from "../album/AlbumCardList.vue";
    import {TrackID} from "../../models";
    import AlbumInfoTrackList from "../track/AlbumInfoTrackList.vue";
    import AlbumListSection from "../album/AlbumListSection.vue";
    import TrackListSection from "../track/TrackListSection.vue";

    export interface HeroMessage {
        title: string,
        subtitle: string,
        href: string
    }

    @Component({
        components: {
            TrackListSection,
            AlbumListSection,
            AlbumInfoTrackList,
            "track-list": TrackList,
            "album-card-list": AlbumCardList,
            "promise-component": PromiseComponent
        }
    })
    export default class AlbumPage extends Vue {
        @Prop() store!: ResourceStore;
        @Prop() heroMessage!: HeroMessage;

        onHeroMsgClick(): void {
            console.log("Hello")
        }
    }
</script>

<style scoped>
    .hero > .hero-body {
        cursor: pointer;
    }
</style>