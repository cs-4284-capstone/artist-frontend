<template>
    <ol>
        <div v-for="trackId in ids">
            <li>
                <track-list-item :trackId="trackId" :store="store"/>
            </li>
            <hr class="hr">
        </div>
    </ol>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import TrackListItem from "./TrackListItem.vue";
    import ResourceStore from "../../ResourceStore";
    import {TrackID} from "../../models";

    @Component({
        components: {
            "track-list-item": TrackListItem,
        }
    })
    export default class TrackList extends Vue {
        @Prop() store!: ResourceStore;
        @Prop() ids!: TrackID[];
    }
</script>

<style scoped>
li {
    font-weight: bold;
}
</style>