<template>
    <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
            <div class="navbar-item">
                <span class="subtitle is-4">Wes Jordan's <b>Soundbin.</b></span>
            </div>
        </div>

        <div id="navbarBasicExample" class="navbar-menu">
            <div class="navbar-start">
                <router-link to="/" class="navbar-item">Home</router-link>
                <router-link to="/tracks" class="navbar-item">Songs</router-link>
                <router-link to="/albums" class="navbar-item">Albums</router-link>
                <router-link to="/recommendations" class="navbar-item">Recommendations</router-link>
                <div class="navbar-item has-dropdown is-hoverable">
                    <a class="navbar-link">More</a>
                    <div class="navbar-dropdown">
                        <a class="navbar-item">About</a>
                        <a class="navbar-item">How this site works</a>
                        <hr class="navbar-divider">
                        <a class="navbar-item" href="https://github.com/cs-4284-capstone/artist-frontend/issues/new">Report an issue</a>
                        <a class="navbar-item">Admin Login</a>
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