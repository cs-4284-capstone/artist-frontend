<template>
    <li class="media">
        <figure class="media-left">
            <p class="image is-64x64">
                <album-art :album="album" />
            </p>
        </figure>
        <div class="media-content">
            <div class="content">
                <p>
                    <strong>{{ track.title }}</strong>
                    <runtime-badge :runtime="track.runtime" />
                </p>
                <span style="display: block">{{ album.title }}</span>
            </div>
        </div>
        <div class="media-right">
            <buy-badge type="track" :resource="track" />
        </div>
    </li>
</template>

<script lang="ts">
    import { Vue, Component, Prop } from "vue-property-decorator";
    import {Album, Track} from "../../models";

    import BuyBadge from "../badges/BuyBadge.vue";
    import AlbumArt from "../album/AlbumArt.vue";
    import RunTimeBadge from "../badges/RunTimeBadge.vue";

    @Component({
        components: {
            "runtime-badge": RunTimeBadge,
            "buy-badge": BuyBadge,
            "album-art": AlbumArt
        }
    })
    export default class AlbumInfoTrackItem extends Vue {
        @Prop() album!: Album;
        @Prop() track!: Track;
    }
</script>

<style scoped>

</style>