<template>
    <div class="container">
        <h1 class="title">Purchase Tracks</h1>
        <section>
            <h2 class="title is-4 is-spaced">Cart:</h2>
            <track-list :ids="trackIds" :store="store" :columns="1"></track-list>
            <p class="subtitle is-4 is-spaced has-text-right">Total Cost:
                <strong>{{ totalCost }}</strong>
            </p>
        </section>
        <section>
            <h2 class="title is-4 is-spaced">Checkout Info:</h2>
            <purchase-form @onPurchase="handlePurchase"/>
        </section>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import {Track, TrackID} from "../../models";
    import ResourceStore from "../../ResourceStore";
    import AlbumInfoTrackList from "../track/AlbumInfoTrackList.vue";
    import {Maybe} from "../../util";
    import TrackList from "../track/TrackList.vue";
    import PurchaseForm, {PurchaseFormData} from "./PurchaseForm.vue";

    @Component({
        components: {TrackList, PurchaseForm}
    })
    export default class PurchasePage extends Vue {
        @Prop() trackIds!: TrackID[];
        @Prop() store!: ResourceStore;
        @Prop({default: "infer"}) cost!: number | "infer";

        /*
        async get totalCost(): Promise<number> {
            let tracks: Maybe<Track>[] = await this.store.fetchTracks(this.trackIds);
            return tracks.reduce((prev, current) => prev + current, 0.0);
        }*/
        get inferCost(): boolean {
            return this.cost === "infer";
        }

        get totalCost(): number {
            if (this.inferCost) return 10.99; // TODO
            else return <number>this.cost;
        }

        handlePurchase(data: PurchaseFormData): void {
            let msg = `
            Are you sure you want to make this purchase? This cannot be undone.
            Email: ${data.email}
            Wallet ID: ${data.wallet}
            `;
            if (confirm(msg)) {
                console.log("we made a purchase: ");
                console.log(data);
                // TODO: dispatch request to backend.
                this.$router.go(-1);
            }
        }
    }
</script>

<style scoped>

</style>