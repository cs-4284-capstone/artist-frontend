<template>
    <form>
        <div class="field">
            <p class="control has-icons-left has-icons-right">
                <input type="text" placeholder="Email" v-model="inputEmail" :class="emailClass">
                <span class="icon is-small is-left">
                    <i class="fas fa-envelope"></i>
                </span>
            </p>
            <p class="help">An email will be sent to this address containing a one-time link to download the songs you've purchased.</p>
        </div>
        <div class="field">
            <p class="control has-icons-left has-icons-right">
                <input class="input" type="text" placeholder="Confirm Email" v-model="inputEmailConfirm" :class="emailConfirmClass">
                <span class="icon is-small is-left">
                    <i class="fas fa-check"></i>
                </span>
            </p>
            <p class="help is-danger" v-if="isEmailConfirmInvalid">Your emails must match exactly.</p>
            <p class="help" >Make sure your information is correct, as once a transaction is verified, <strong>it cannot be undone.</strong></p>
        </div>
        <div class="field">
            <p class="control has-icons-left">
                <input class="input" type="number" placeholder="EOS Wallet ID" v-model="inputWallet" :class="walletClass">
                <span class="icon is-small is-left">
                    <i class="fas fa-lock"></i><!-- TODO: better icon for this -->
                </span>
            </p>
            <p class="help">Funds will be withdrawn from this EOS wallet.</p>
        </div>
        <div class="field">
            <p class="control">
                <button class="button is-success" :disabled="!isReadyToPurchase" @click="purchase">
                    Submit Purchase
                </button>
            </p>
            <p class="help" v-if="!isReadyToPurchase">All fields are required.</p>
        </div>
    </form>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";

    export interface PurchaseFormData {
        email: string,
        wallet: string
    }

    @Component
    export default class PurchaseForm extends Vue {
        inputEmail: string = '';
        inputEmailConfirm: string = '';
        inputWallet: string = '';

        get formData(): PurchaseFormData {
            return {
                email: this.inputEmail,
                wallet: this.inputWallet
            }
        }

        get isEmailValid(): boolean {
            return this.inputEmail.indexOf("@") != -1; // A real app would do more checks, but we don't have time for that
        }
        get isEmailInvalid(): boolean {
            return this.inputEmail.length > 0 && !this.isEmailValid;
        }
        get emailClass() {
            return {
                input: true,
                'is-success': this.isEmailValid,
                'is-danger': this.isEmailInvalid
            }
        }

        get isEmailConfirmValid(): boolean {
            return this.inputEmail.length > 0 && this.inputEmailConfirm === this.inputEmail;
        }
        get isEmailConfirmInvalid(): boolean {
            return this.inputEmail.length > 0 && !this.isEmailConfirmValid
        }
        get emailConfirmClass() {
            return {
                input: true,
                'is-success': this.isEmailConfirmValid,
                'is-danger': this.isEmailConfirmInvalid
            }
        }

        get isWalletValid(): boolean {
            return this.inputWallet.length > 0; // IDK, probably
        }
        get isWalletInvalid(): boolean {
            return this.inputWallet.length > 0 && !this.isWalletValid
        }
        get walletClass() {
            return {
                input: true,
                'is-success': this.isWalletValid,
                'is-failure': this.isWalletInvalid
            }
        }
        get isReadyToPurchase(): boolean {
            return this.isEmailValid && this.isEmailConfirmValid && this.isWalletValid;
        }

        purchase(): void {
            this.$emit('onPurchase', this.formData);
        }
    }
</script>

<style scoped>

</style>