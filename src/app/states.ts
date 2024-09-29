import { atom } from "recoil";

export const authorIdStates = atom<any>({
  key: "authorIdStates",
  default: 0,
});

export const cardDataStates = atom<any>({
  key: "cardDataStates",
  default: [],
});

export const deleteStates = atom<any>({
  key: "deleteStates",
  default: 0,
});

export const clikcState = atom({
  key: "clikc",
  default: false,
});

export const albumDataState = atom({
  key: "albumDataState",
  default: [],
});

export const albumIDState = atom({
  key: "albumIDState",
  default: "",
});

export const clickckState = atom({
  key: "clickckState",
  default: false,
});

export const newTrackRrecoState = atom({
  key: "newTrackRrecoState",
  default: false,
});
export const userIdState = atom({
  key: "userIdState",
  default: null,
});

export const albumNAmeState = atom({
  key: 'albumNAmeState',
  default: null
})

export const artistNAmeState = atom({
  key: 'artistNAmeState',
  default: null
})
