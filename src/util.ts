export class Maybe<T> {
    readonly item: T | null;
    readonly is: boolean;

    constructor(item: T | null) {
        if (item != null) {
            this.item = item;
            this.is = true;
        } else {
            this.item = null;
            this.is = false;
        }
    }

    get unwrap(): T {
        if (this.is) return (<T>this.item);
        else throw new Error("Attempted to unwrap empty optional.")
    }

    match<V>(some: (i: T) => V, none: () => V): V {
        if (this.is) return some(this.unwrap);
        else return none();
    }

    map<V>(f: (i: T) => V): Maybe<V> {
        return this.is ? just(f(this.unwrap)) : (<Maybe<V>>(<unknown>this));
    }
}

export function flattenMaybeAll<T>(maybes: Maybe<T>[]): Maybe<T[]> {
    let ms: T[] = [];
    for (let maybe of maybes) {
        if (maybe.is) ms.push(maybe.unwrap);
        else return nothing()
    }
    return just(ms);
}

export function nothing<T>(): Maybe<T> {
    return new Maybe<T>(null);
}

export function just<T>(item: T) {
    return new Maybe<T>(item);
}

export interface Map<K, V> {
    get: (k: K) => Maybe<V>,
    put: (k: K, v: V) => Maybe<V>,
    has: (k: K) => boolean
}

export class IntMap<T> implements Map<number, T>{
    map: {[k: number]: T} = {};

    get(k: number): Maybe<T> {
        if (k in this.map) return just(this.map[k]);
        else return nothing();
    }

    put(k: number, v: T): Maybe<T> {
        let bumped = this.get(k);
        this.map[k] = v;
        return bumped;
    }

    has(k: number): boolean {
        return k in this.map;
    }
}

export class StringMap<T> implements Map<string, T> {
    protected readonly map: {[k: string]: T} = {};

    get(k: string): Maybe<T> {
        if (k in this.map) return just(this.map[k]);
        else return nothing();
    }

    put(k: string, v: T): Maybe<T> {
        let bumped = this.get(k);
        this.map[k] = v;
        return bumped;
    }

    has(k: string): boolean {
        return k in this.map;
    }
}