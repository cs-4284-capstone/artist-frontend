import Vue from "vue";
//import TodoApp from "./components/TodoApp.vue";

//import './style.sass';
//import TodoStore from "./TodoStore";
import BuyBadge from "./components/BuyBadge.vue";
import {Track} from "./models";

let testTrack: Track = {
    price: 0.99,
    albumId: 1,
    albumTitle: "Sample Album",
    id: 1, runtime: { minutes: 3, seconds: 23},
    name: "t"
};

let v = new Vue({
    el: "#app",
    template:`<buy-badge :resource="track" type="track" />`,
    components: {
        BuyBadge
    },
    data: {
        //store: new TodoStore()
        track: testTrack
    }
});