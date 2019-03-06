import Vue from "vue";
//import TodoApp from "./components/TodoApp.vue";

//import './style.sass';
//import TodoStore from "./TodoStore";
import {Album, Track} from "./models";

import BuyBadge from "./components/badges/BuyBadge.vue";
import TrackListItem from "./components/track/TrackListItem.vue"
import AlbumHeader from "./components/album/AlbumHeader.vue";
import AlbumCard from "./components/album/AlbumCard.vue";
import AlbumInfoTrackItem from "./components/track/AlbumInfoTrackItem.vue";
import AlbumPage from "./components/album/AlbumPage.vue";

import ResourceStore from "./ResourceStore";
import {IntMap} from "./util";

let v = new Vue({
    el: "#app",
    template:`<album-page :store="store" :albumId="1"></album-page>`,
    components: {
        AlbumPage
    },
    data: {
        store: new ResourceStore("http://localhost:3000", new IntMap<Track>(), new IntMap<Album>())
    }
});