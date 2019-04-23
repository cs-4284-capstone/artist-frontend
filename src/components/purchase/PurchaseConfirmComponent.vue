<template>
    <section>
            <h2 class="title is-4 is-spaced">Authorize Your Purchase in EOS:</h2>
            <p>
                Enter your account name:
            </p>
            <form>
                <div class="field">
                    <p class="control has-icons-left has-icons-right">
                        <input type="text" placeholder="Bob" v-model="inputAccountName" class="input">
                        <span class="icon is-small is-left">
                            <i class="fas fa-envelope"></i>
                        </span>
                    </p>
                </div>
            </form>
            <p>
                To complete the transaction and have your purchased tracks delivered to you, copy/paste the following
                command into CliOS:
            </p>
            <p class="content">
                <pre>{{ cliosCommandStub }}</pre>
            </p>
            <p>
                This will trigger this site smart contract and initiate song delivery.
                <strong>If you do not do this in 48 hours, your purchase will expire.</strong>
            </p>
            <router-link class="button is-success" to="/">Done</router-link>
        </section>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from "vue-property-decorator";
import { Purchase } from "../../models";

@Component({
    components: {}
})
export default class PurchaseConfirmComponent extends Vue {
    @Prop() purchases!: Purchase[]
    
    inputAccountName: string = "Bob"

    get cliosCommandStub(): string {
        return this.purchases
            .map((p) => `cleos push action eosio.token transfer '["${this.inputAccountName}", "music", "${p.track.price.toFixed(4)} SYS", "${p.track.id};${p.id}"]' -p ${this.inputAccountName}@active`)
            .join('\n')
    }
}
</script>
