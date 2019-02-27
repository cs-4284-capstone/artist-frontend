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

let testTrack: Track = {
    price: 0.99,
    albumId: 1,
    albumTitle: "Sample Album",
    id: 1, runtime: { minutes: 3, seconds: 23},
    title: "Song One"
};

let testAlbum: Album = {
    description: "Test album description",
    id: 1,
    price: 5.99,
    releaseDate: {year: 2018, month: 5, day: 27},
    runtime: {minutes: 48, seconds: 54},
    title: "Systems Capstone LP",
    trackIDs: [1]
};

let v = new Vue({
    el: "#app",
    template:`<album-info-track-item :album="album" :track="track" />`,
    components: {
        BuyBadge,
        TrackListItem,
        AlbumHeader,
        AlbumCard,
        AlbumInfoTrackItem
    },
    data: {
        //store: new TodoStore()
        //track: testTrack,
        track: testTrack,
        tracks: [testTrack, testTrack, testTrack],
        album: testAlbum
    }
});