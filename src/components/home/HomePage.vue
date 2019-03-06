<template>
    <div>
        <div class="hero">
            <div class="hero-body" style="background-color: gray">
                <h1 class="title">Hello World</h1>
                <p class="subtitle">Tickets on sale now.</p>
            </div>
        </div>
        <section class="section">
            <div class="container">
                <h2 class="title">Latest Tracks</h2>
                <!-- two-column track list -->
                <nav>
                    <a href="#" role="button" class="button">View More</a>
                </nav>
            </div>
            <hr class="hr">
            <div class="container">
                <a id="albums"></a>
                <h2 class="title">Albums</h2>
                <album-card-list :store="store" :ids="'all'" />
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

    @Component({
        components: {
            "track-list": TrackList,
            "album-card-list": AlbumCardList,
            "promise-component": PromiseComponent
        }
    })
    export default class AlbumPage extends Vue {
        @Prop() store!: ResourceStore;
    }
</script>

<style scoped>

</style>