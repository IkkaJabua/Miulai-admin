// import { atom } from "recoil";

// // Define appropriate types for the atoms based on your application's requirements
// export const authorIdStates = atom<number>({
//   key: "authorIdStates",
//   default: 0,
// });

// interface CardData {
//   id: number;
//   title: string;
//   // Add other properties as needed
// }

// // In your recoil state definition
// interface  {
//   id: number;
//   albumName: string; // Add this property to match Album interface
//   file?: { url: string };
//   // Add other properties as needed
// }

// export const albumDataState = atom<AlbumData[]>({
//   key: "albumDataState",
//   default: [],
// });

// export const cardDataStates = atom<CardData[]>({
//   key: "cardDataStates",
//   default: [],
// });

// export const deleteStates = atom<number>({
//   key: "deleteStates",
//   default: 0,
// });

// export const clickState = atom<boolean>({
//   key: "clickState",
//   default: false,
// });

// interface AlbumData {
//   id: number;
//   title: string;
//   // Add other properties as needed
// }

// export const newTrackRecoState = atom<boolean>({
//   key: "newTrackRecoState",
//   default: false,
// });

// export const userIdState = atom<number | null>({
//   key: "userIdState",
//   default: null,
// });

export const albumNameState = atom({
  key: 'albumNAmeState',
  default: null
})

export const artistNAmeState = atom({
  key: 'artistNAmeState',
  default: null
})


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
