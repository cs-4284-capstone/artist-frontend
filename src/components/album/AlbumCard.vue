<template>
    <div class="column is-narrow is-one-quarter">
        <div class="card">
            <div class="card-image">
                <figure class="image is-2by2">
                    <album-art :album="album" />
                </figure>
            </div>
            <div class="card-content">
                <div>
                    <router-link class="title is-6" :to="link">{{ album.title }}</router-link>
                </div>
                <div>
                    <router-link class="subtitle is-6" :to="link">{{ subtitle }}</router-link>
                </div>
                <buy-badge type="album" :resource="album" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { Vue, Component, Prop } from "vue-property-decorator";
    import {Album, runtimeString} from "../../models";
    import BuyBadge from "../badges/BuyBadge.vue";
    import AlbumArt from "./AlbumArt.vue";

    @Component({
        components: {
            'buy-badge': BuyBadge,
            'album-art': AlbumArt
        }
    })
    export default class AlbumCard extends Vue {
        @Prop() album!: Album;

        get artURL(): string {
            return "https://bulma.io/images/placeholders/128x128.png"
        }

        get subtitle(): string {
            return `${this.album.releaseDate.year}, ${this.album.runtime.minutes} min`
        }

        get artAlt(): string {
            return this.album.title + " Album Art"
        }

        get runtime(): string {
            return runtimeString(this.album.runtime);
        }

        get link(): string {
            return `/albums/${this.album.id}`;
        }
    }
</script>