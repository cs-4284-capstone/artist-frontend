<template>
    <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
            <div class="navbar-item">
                <span class="subtitle is-4">Wes Jordan's <b>Soundbin.</b></span>
            </div>
        </div>

        <div id="navbarBasicExample" class="navbar-menu">
            <div class="navbar-start">
                <a class="navbar-item">Home</a>
                <a class="navbar-item">Songs</a>
                <a class="navbar-item" href="#albums">Albums</a>
                <a class="navbar-item">Performances</a>
                <div class="navbar-item has-dropdown is-hoverable">
                    <a class="navbar-link">More</a>
                    <div class="navbar-dropdown">
                        <a class="navbar-item">About</a>
                        <a class="navbar-item">Create an Account</a>
                        <a class="navbar-item">How this site works</a>
                        <hr class="navbar-divider">
                        <a class="navbar-item">Report an issue</a>
                    </div>
                </div>
            </div>
            <div class="navbar-end">
                <div class="navbar-item">
                    <div class="buttons">
                        <a class="button is-primary"><strong>Sign up</strong></a>
                        <a class="button is-light">Log in</a>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<script lang="ts">
    import { Vue, Component, Prop } from "vue-property-decorator";

    @Component
    export default class NavBar extends Vue {}
</script>

<style scoped>

</style>