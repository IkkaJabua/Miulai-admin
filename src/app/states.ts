import { atom } from "recoil";

export const authorIdStates = atom<any>({
    key: 'authorIdStates',
    default: 0,
})

export const cardDataStates = atom<any>({
    key: 'cardDataStates',
    default: [],
})

export const deleteStates = atom<any>({
    key: 'deleteStates',
    default: 0
})

export const clikcState = atom({
    key: 'clikc',
    default: false
})