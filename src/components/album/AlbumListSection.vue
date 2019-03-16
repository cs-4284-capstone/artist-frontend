<template>
    <div class="container">
        <a id="albums"></a>
        <h2 class="title">Albums</h2>
        <album-card-list :ids="'all'" :store="store"></album-card-list>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import ResourceStore from "../../ResourceStore";

    import AlbumCardList from "./AlbumCardList.vue";

    @Component({
        components: {
            "album-card-list": AlbumCardList
        }
    })
    export default class AlbumListSection extends Vue{
        @Prop() store!: ResourceStore;
    }
</script>

<style scoped>

</style>