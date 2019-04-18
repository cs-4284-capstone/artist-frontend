<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div class="container" v-if="success">
        <h1 class="title">Tracks Successfully Purchased!</h1>
        <section>
            <h2 class="title is-4 is-spaced">Cart:</h2>
            <track-list :ids="trackIds" :store="store" :columns="1"></track-list>
            <p class="subtitle is-4 is-spaced has-text-right">Total Cost:
                <strong v-if="inferredCost.is">{{ inferredCost.unwrap }}</strong>
                <strong v-else>Loading...</strong>
            </p>
        </section>
        <section>
            <h2 class="title is-4 is-spaced">Authorize Your Purchase in EOS:</h2>
            <p>
                To complete the transaction and have your purchased tracks delivered to you, copy/paste the following
                command into CliOS:
            </p>
            <p class="content">
                <pre>{{ mPurchasesMade.unwrap }}</pre>
            </p>
            <p>
                This will trigger this site smart contract and initiate song delivery.
                <strong>If you do not do this in 48 hours, your purchase will expire.</strong>
            </p>
            <router-link class="button is-success" to="/">Done</router-link>
        </section>
    </div>
    <div class="container" v-else>
        <h1 class="title">Purchase Tracks</h1>
        <section>
            <h2 class="title is-4 is-spaced">Cart:</h2>
            <track-list :ids="trackIds" :store="store" :columns="1"></track-list>
            <p class="subtitle is-4 is-spaced has-text-right">Total Cost:
                <strong v-if="inferredCost.is">{{ inferredCost.unwrap }}</strong>
                <strong v-else>Loading...</strong>
            </p>
        </section>
        <section>
            <h2 class="title is-4 is-spaced">Checkout Info:</h2>
            <purchase-form @onPurchase="handlePurchase"/>
        </section>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue, Watch} from "vue-property-decorator";
    import {TrackID, Purchase} from "../../models";
    import ResourceStore from "../../ResourceStore";
    import {flattenMaybeAll, just, Maybe, nothing} from "../../util";
    import TrackList from "../track/TrackList.vue";
    import PurchaseForm, {PurchaseFormData} from "./PurchaseForm.vue";
    import PromiseComponent from "../PromiseComponent.vue";

    @Component({
        components: {PromiseComponent, TrackList, PurchaseForm}
    })
    export default class PurchasePage extends Vue {
        @Prop() trackIds!: TrackID[];
        @Prop() store!: ResourceStore;
        @Prop({default: "infer"}) cost!: number | "infer";
        inferredCost: Maybe<number> = nothing();
        success: boolean = false;
        purchasesMade: Maybe<Purchase[]> = nothing();

        get inferCost(): boolean {
            return this.cost === "infer";
        }

        get mPurchasesMade(): Maybe<string> {
            return this.purchasesMade.map(PurchasePage.cliosCommandStub)
        }

        static cliosCommandStub(purchases: Purchase[]): string {
            //return `cleos push action eosio.token transfer '["alice", "music", "<priceofsong> SYS", "<songid>;<purchaseid>"]' -p alice@active`
            return purchases
                .map((p) => `cleos push action eosio.token transfer '["YOURACCOUNT", "music", "${p.track.price} SYS", "${p.track.id};${p.id}"]' -p YOURACCOUNT@active`)
                .join('\n')
        }

        mounted() {
            this.onTrackIdsChange();
        }

        @Watch('trackIds')
        onTrackIdsChange() {
            console.log("track ids changed");

            if (!this.inferCost) {
                this.inferredCost = just(<number>this.cost);
                return;
            }

            this.store.fetchTracks(this.trackIds).then((tMs) => {
                let total = flattenMaybeAll(tMs) // Maybe<Track[]>
                    .orElse([]) // Track[]
                    .map((it) => it.price) // number[]
                    .reduce((p, c) => p + c, 0.0); // number
                this.inferredCost = just(total);
            })
        }

        handlePurchase(data: PurchaseFormData): void {
            let msg = `
            Are you sure you want to make this purchase? This cannot be undone.
            Email: ${data.email}
            Wallet ID: ${data.wallet}
            `;
            if (!confirm(msg)) return;

            this.store.makePurchase(data.email, data.wallet, this.trackIds)
                .then(purchases => {
                    console.log("Purchases made: ", purchases);
                    this.success = true;
                    this.purchasesMade = just(purchases);
                })
                .catch(err => alert("There was an error making a purchase. Check the console logs."));

            //this.$router.go(-1);
        }
    }
</script>

<style scoped>

</style>