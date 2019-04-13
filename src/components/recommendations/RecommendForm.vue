<template>
    <form>
        <div class="field">
            <p class="control has-icons-left has-icons-right">
                <input type="text" placeholder="Email" v-model="inputEmail">
                <span class="icon is-small is-left">
                    <i class="fas fa-envelope"></i>
                </span>
            </p>
            <p class="help">An email will be sent to this address containing a one-time link to download the songs you've purchased.</p>
        </div>
        <button class="button is-primary" @click="submitQuery">Submit</button>
    </form>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";

export interface RecommendFormData {
    email: string
}

@Component
export default class RecommendForm extends Vue {
    inputEmail: string = "";

    get formData(): RecommendFormData {
        return { email: this.inputEmail }
    }

    submitQuery() {
        this.$emit("submitted", this.formData)
    }
}
</script>

<style scoped>

</style>