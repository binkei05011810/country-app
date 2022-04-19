type Action<T> = {
    type: T;
}

type ActionWithPayload<T, U> = {
    type: T;
    payload: U;
}

export type ActionReturn<T, U> = U extends null ? Action<T> : ActionWithPayload<T, U>
