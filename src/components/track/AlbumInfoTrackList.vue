<template>
    <div class="columns">
        <ul v-for="col in column_items" class="panel column is-one-half">
            <div v-for="trackId in col">
                <item :trackId="trackId" :store="store" :key="trackId" />
                <hr class="hr">
            </div>
        </ul>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import {TrackID} from "../../models";
    import AlbumInfoTrackItem from "./AlbumInfoTrackItem.vue";
    import ResourceStore from "../../ResourceStore";

    @Component({
        components: {
            "item": AlbumInfoTrackItem
        }
    })
    export default class AlbumInfoTrackList extends Vue {
        @Prop() ids!: TrackID[];
        @Prop() store!: ResourceStore;
        @Prop({ type: Number, default: 2 }) columns!: number;

        get column_items(): TrackID[][] {
            let cols: TrackID[][] = [];
            this.ids.forEach((trackId, i) => {
                let colnum = i % this.columns;
                if (colnum in cols) {
                    cols[colnum].push(trackId);
                } else {
                    cols[colnum] = [trackId];
                }
            });
            return cols;
        }
    }
</script>