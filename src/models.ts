export type TodoId = number

export interface Todo {
    title: string;
    completed: boolean;
}

export enum BootstrapType {
    PRIMARY = 'primary',
    SECONDARY = 'secondary',
    SUCCESS = 'success',
    DANGER = 'danger',
    WARNING = 'warning',
    INFO = 'info',
    LIGHT = 'light',
    DARK = 'dark'
}

export interface Message {
    type: BootstrapType,
    text: string
}

export interface ReleaseDate {
    year: number,
    month: number,
    day: number
}

// need a form that asks for EOS ID and email to inititate action (song / album id also provided as param)

export interface RunTime {
    minutes: number,
    seconds: number
}

export type TrackID = number;
export interface Track {
    id: TrackID
    runtime: RunTime,
    name: string,
    albumId: AlbumID,
    albumTitle: string,
    price: number
}

export type AlbumID = number;
export interface Album {
    id: AlbumID,
    title: string,
    releaseDate: ReleaseDate,
    runtime: RunTime,
    price: number,
    trackIDs: [TrackID],
    description: string // <-- dunno if this should be raw HTML
}

export type ResourceID = { type: "album", id: AlbumID } | { type: "track", id: TrackID }
export type Resource = Album | Track