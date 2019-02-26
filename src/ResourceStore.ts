import {Album, AlbumID, Track, TrackID} from "./models";
import {IntMap, Maybe, nothing} from "./util";

type TrackLibrary = IntMap<Track>;
type AlbumLibrary = IntMap<Album>;

export default class ResourceStore {
    private tracks: TrackLibrary;
    private albums: AlbumLibrary;

    constructor(tracks: TrackLibrary, albums: AlbumLibrary) {
        this.tracks = tracks;
        this.albums = albums;
    }

    getTrack(id: TrackID): Maybe<Track> {
        return this.tracks.get(id);
    }

    getAlbum(id: AlbumID): Maybe<Album> {
        return this.albums.get(id);
    }
}