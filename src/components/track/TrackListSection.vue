<template>
    <div class="container">
        <h2 class="title">Latest Tracks</h2>
        <album-info-track-list :ids="latestIds" :store="store"></album-info-track-list>
        <nav>
            <router-link to="/tracks" class="button" href="#" role="button">View More</router-link>
        </nav>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import ResourceStore from "../../ResourceStore";
    import AlbumInfoTrackList from "./AlbumInfoTrackList.vue";
    import {TrackID} from "../../models";

    @Component({
        components: {
            "album-info-track-list": AlbumInfoTrackList
        }
    })
    export default class TrackListSection extends Vue{
        @Prop() store!: ResourceStore;
        @Prop() ids!: "all" | TrackID[];

        get latestIds(): TrackID[] {
            return [1, 2, 3, 4, 5, 6, 7, 8] // TODO: show all tracks
        }
    }
</script>

<style scoped>

</style>