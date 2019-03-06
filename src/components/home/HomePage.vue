<template>
    <div>
        <div class="hero">
            <div class="hero-body" style="background-color: gray" @click="onHeroMsgClick">
                <h1 class="title">{{ heroMessage.title }}</h1>
                <p class="subtitle">{{ heroMessage.subtitle }}</p>
            </div>
        </div>
        <section class="section">
            <div class="container">
                <h2 class="title">Latest Tracks</h2>
                <album-info-track-list :ids="latestIds" :store="store" />
                <nav>
                    <a class="button" href="#" role="button">View More</a>
                </nav>
            </div>
            <hr class="hr">
            <div class="container">
                <a id="albums"></a>
                <h2 class="title">Albums</h2>
                <album-card-list :ids="'all'" :store="store" />
            </div>
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

    export interface HeroMessage {
        title: string,
        subtitle: string,
        href: string
    }

    @Component({
        components: {
            AlbumInfoTrackList,
            "track-list": TrackList,
            "album-card-list": AlbumCardList,
            "promise-component": PromiseComponent
        }
    })
    export default class AlbumPage extends Vue {
        @Prop() store!: ResourceStore;
        @Prop() heroMessage!: HeroMessage;

        get latestIds(): TrackID[] {
            return [1, 2, 3, 4, 5, 6, 7, 8]
        }

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