import Vue from "vue";
import VueRouter from "vue-router";
//import TodoApp from "./components/TodoApp.vue";

//import './style.sass';
//import TodoStore from "./TodoStore";
import {Album, Track} from "./models";

import AlbumPage from "./components/album/AlbumPage.vue";
import AlbumListSection from "./components/album/AlbumListSection.vue";
import HomePage from "./components/home/HomePage.vue";
import NavBar from "./components/nav/NavBar.vue";

import ResourceStore from "./ResourceStore";
import {IntMap} from "./util";
import TrackListSection from "./components/track/TrackListSection.vue";

let store = new ResourceStore("http://localhost:3000", new IntMap<Track>(), new IntMap<Album>());
const heroMessage = {
    title: "Hello World.", subtitle: "Tickets on sale now.", href: "#"
};

const router = new VueRouter({
    routes: [
        { path: '/', component: HomePage, props: {store, heroMessage}},
        { path: '/albums', component: AlbumListSection, props: {store}},
        { path: "/albums/:id", component: AlbumPage, props: (route) => ({store, albumId: route.params.id})},
        { path: "/tracks", component: TrackListSection, props: {store}}
    ]
});

Vue.use(VueRouter);
let v = new Vue({
    el: "#app",
    template:`
<div>
    <nav-bar />
    <transition name="fade">
        <router-view></router-view>    
    </transition>
</div>`,
    components: {
        AlbumPage, HomePage, NavBar
    },
    data: {
        store: store,
        msg: heroMessage
    },
    router: router
});