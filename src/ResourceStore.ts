import {Album, AlbumID, Track, TrackID, BuyerInfo, APIAction, APISuccess, APIFailure, Purchase} from "./models";
import {flattenMaybeAll, IntMap, just, Maybe, nothing} from "./util";
import axios, {AxiosResponse} from 'axios';

type TrackLibrary = IntMap<Track>;
type AlbumLibrary = IntMap<Album>;

export default class ResourceStore {
    private backend: string;
    private tracks: TrackLibrary;
    private albums: AlbumLibrary;

    private purchased: Purchase[] = [];
    private buyer: Maybe<BuyerInfo> = nothing();

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
        console.log("Fetching track: " + id);
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

        console.log("uncached access to albums/" + id);

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
        let requests = ids.map((p) => this.fetchTrack(p) );
        let resps = await Promise.all(requests);
        return resps;
    }

    async fetchAlbums(ids: AlbumID[]): Promise<Maybe<Album[]>> {
        let requests = ids.map(this.fetchAlbum);
        let resps = await Promise.all(requests);
        return flattenMaybeAll(resps);
    }

    async fetchAllAlbums(): Promise<Maybe<Album[]>> {
        let resp = await axios.get<Album[]>(`${this.backend}/albums`);
        if (resp.status != 200) return nothing();
        else if (!resp.data) return nothing();
        else {
            for (let album of resp.data) {
                this.albums.put(album.id, album);
            }
            return just(resp.data);
        }
    }

    async resolveBuyer(email: string, walletid: string): Promise<BuyerInfo> {
        if (this.buyer.map(b => b.email === email && b.walletid === walletid).orElse(false)) {
            return this.buyer.unwrap;
        }

        let resp = await axios.post<APIAction<BuyerInfo>>(`${this.backend}/customers/new`, { email, walletid});
        if (resp.status == 200 && resp.data.result === "already_created") {
            // no new buyer has been created, instead we recieve id of existing
            let customer = (<APISuccess<BuyerInfo>>resp.data).body;
            this.buyer = just(customer);
            return customer;
        } else if (resp.status == 201 && resp.data.result === "ok") {
            // new buy has been created
            let customer = (<APISuccess<BuyerInfo>>resp.data).body;
            this.buyer = just(customer);
            return customer;
        } else {
            console.error(resp.data);
            throw resp.data;
        }
    }

    async makePurchase(email: string, walletid: string, trackIds: TrackID[]): Promise<Purchase[]> {
        console.log([email, walletid]);
        console.log(trackIds);

        const buyer = await this.resolveBuyer(email, walletid);
        const formData = {
            email, trackIds
        }
        console.log(formData)
        console.log("BUYER")
        console.log(buyer)

        const resp = await axios.post<APIAction<Purchase[]>>(`${this.backend}/customers/${buyer.id}/purchases/new`, formData);
        if (resp.status == 201 && resp.data.result === "ok") {
            // submitted new purchase!
            let reciept = (<APISuccess<Purchase[]>>resp.data).body;
            this.purchased.push(...reciept);
            return reciept;
        } else {
            console.error(resp.data);
            throw resp.data
        }
    }
}