<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div class="container">
        <h1 class="title">Get Recommendations</h1>
        <recommend-form @submitted="onSubmit"></recommend-form>
        <hr class="hr">
        <promise-component v-if="formDataM.is" :promise="queryPromise" @dataLoaded="onQueryLoad">
            <template v-slot:loading>
                <h3>Loading...</h3>
            </template>
            <template v-slot:loaded>
                <album-info-track-list v-if="trackIdsM.is" :store="store" :ids="trackIdsUnsafe" />
                <h3 v-else>No results found.</h3>
            </template>
            <template v-slot:failed>
                <h3>No results found.</h3>
            </template>
        </promise-component>
    </div>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from "vue-property-decorator";
import PromiseComponent from "../PromiseComponent.vue";
import AlbumInfoTrackList from "../track/AlbumInfoTrackList.vue";
import RecommendForm, {RecommendFormData} from "./RecommendForm.vue";
import ResourceStore from "../../ResourceStore";
import {just, Maybe, nothing} from "../../util";
import {TrackID} from "../../models";

@Component({
    components: {PromiseComponent, AlbumInfoTrackList, RecommendForm}
})
export default class RecommendPage extends Vue {
    @Prop() store!: ResourceStore;
    formDataM: Maybe<RecommendFormData> = nothing();
    trackIdsM: Maybe<TrackID[]> = nothing();

    get formDataUnsafe(): RecommendFormData {
        return this.formDataM.unwrap
    }

    get trackIdsUnsafe(): TrackID[] {
        console.log("XYZ")
        console.log(this.trackIdsM);
        return this.trackIdsM.unwrap
    }

    get queryPromise(): Promise<Maybe<TrackID[]>> {
        console.log("getQueryPromise")
        return this.store.fetchPurchases(this.formDataUnsafe.email);
    }

    onQueryLoad(data: Maybe<TrackID[]>) {
        console.log("Got results")
        console.log(data)
        this.trackIdsM = data;
    }

    onSubmit(newData: RecommendFormData) {
        this.formDataM = just(newData);
    }
}
</script>

<style scoped>

</style>