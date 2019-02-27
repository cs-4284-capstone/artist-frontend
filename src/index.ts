import Vue from "vue";
//import TodoApp from "./components/TodoApp.vue";

//import './style.sass';
//import TodoStore from "./TodoStore";
import {Track} from "./models";

import BuyBadge from "./components/badges/BuyBadge.vue";
import TrackListItem from "./components/list-items/TrackListItem.vue"

let testTrack: Track = {
    price: 0.99,
    albumId: 1,
    albumTitle: "Sample Album",
    id: 1, runtime: { minutes: 3, seconds: 23},
    name: "Song One"
};

let v = new Vue({
    el: "#app",
    template:`<ol>
    <li v-for="track in tracks" style="font-weight: bold">
        <track-list-item :track="track" />
        <hr class="hr">
</li>
</ol>`,
    components: {
        BuyBadge,
        TrackListItem
    },
    data: {
        //store: new TodoStore()
        //track: testTrack,
        tracks: [testTrack, testTrack, testTrack]
    }
});