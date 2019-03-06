import {Album, AlbumID, Track, TrackID} from "./models";
import {IntMap, just, Maybe, nothing} from "./util";
import axios, {AxiosResponse} from 'axios';

type TrackLibrary = IntMap<Track>;
type AlbumLibrary = IntMap<Album>;

export default class ResourceStore {
    private backend: string;
    private tracks: TrackLibrary;
    private albums: AlbumLibrary;

    constructor(backend: string, tracks: TrackLibrary, albums: AlbumLibrary) {
        this.backend = backend;
        this.tracks = tracks;
        this.albums = albums;
    }

    getLoadedTrack(id: TrackID): Maybe<Track> {
        return this.tracks.get(id);
    }

    getLoadedAlbum(id: AlbumID): Maybe<Album> {
        return this.albums.get(id);
    }

    async fetchTrack(id: TrackID): Promise<Maybe<Track>> {
        let cached = this.tracks.get(id);
        if (cached.is) return cached;

        let resp = await axios.get<Track>(`${this.backend}/tracks/${id}`);
        if (resp.status != 200) return nothing();
        else if (!resp.data) return nothing();
        else {
            let track = resp.data;
            this.tracks.put(track.id, track);
            return just(track);
        }
    }

    async fetchAlbum(id: AlbumID): Promise<Maybe<Album>> {
        let cached = this.albums.get(id);
        if (cached.is) return cached;

        let resp = await axios.get<Album>(`${this.backend}/albums/${id}`);
        if (resp.status != 200) return nothing();
        else if (!resp.data) return nothing();
        else {
            let album = resp.data;
            this.albums.put(album.id, album);
            return just(album)
        }
    }

    async fetchTracks(ids: TrackID[]): Promise<Maybe<Track>[]> {
        let requests = ids.map(this.fetchTrack);
        return Promise.all(requests);
    }

    async fetchAlbums(ids: AlbumID[]): Promise<Maybe<Album>[]> {
        let requests = ids.map(this.fetchAlbum);
        return Promise.all(requests);
    }
}