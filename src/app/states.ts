import { atom } from "recoil";

export const authorIdStates = atom<any>({
    key: 'authorIdStates',
    default: 0,
 })

export const cardDataStates = atom<any>({
    key: 'cardDataStates',
    default: [],
})