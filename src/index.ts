import Vue from "vue";
//import TodoApp from "./components/TodoApp.vue";

//import './style.sass';
//import TodoStore from "./TodoStore";
import {Album, Track} from "./models";

import AlbumPage from "./components/album/AlbumPage.vue";
import HomePage from "./components/home/HomePage.vue";

import ResourceStore from "./ResourceStore";
import {IntMap} from "./util";

let v = new Vue({
    el: "#app",
    template:`<home-page :store="store" />`,
    components: {
        AlbumPage, HomePage
    },
    data: {
        store: new ResourceStore("http://localhost:3000", new IntMap<Track>(), new IntMap<Album>())
    }
});