<template>
    <div class="hero">
        <div class="hero-body" style="background-color: gray"> <!-- TODO: blurred art background? -->
            <div class="media">
                <figure class="media-left">
                    <p class="image is-4by4">
                        <img :src="artURL" :alt="artAlt"> <!-- TODO: album art -->
                    </p>
                </figure>
                <div class="media-content">
                    <div class="content">
                        <div class="title">{{ album.title }}</div>
                        <div class="subtitle tags">
                            <span class="tag is-medium is-dark">{{ album.releaseDate.year }}</span>
                            <span class="tag is-medium is-dark">{{ runtime }}</span>
                        </div>
                        <buy-badge type="album" :resource="album" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { Vue, Component, Prop } from "vue-property-decorator";
    import {Album, Resource, runtimeString, Track} from "../../models";
    import RunTimeBadge from "../badges/RunTimeBadge.vue";
    import BuyBadge from "../badges/BuyBadge.vue";

    @Component({
        components: {
            "runtime-badge": RunTimeBadge,
            'buy-badge': BuyBadge
        }
    })
    export default class AlbumHeader extends Vue {
        @Prop() album!: Album;

        get artURL(): string {
            return "https://bulma.io/images/placeholders/128x128.png"
        }

        get artAlt(): string {
            return this.album.title + " Album Art"
        }

        get runtime(): string {
            return runtimeString(this.album.runtime);
        }
    }
</script>

<style scoped>

</style>