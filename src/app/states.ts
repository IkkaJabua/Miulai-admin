import { atom } from "recoil";

// Define appropriate types for the atoms based on your application's requirements
export const authorIdStates = atom<number>({
  key: "authorIdStates",
  default: 0,
});

interface CardData {
  id: number;
  title: string;
  // Add other properties as needed
}

// In your recoil state definition
interface AlbumData {
  id: number;
  albumName: string; // Add this property to match Album interface
  file?: { url: string };
  // Add other properties as needed
}

export const albumDataState = atom<AlbumData[]>({
  key: "albumDataState",
  default: [],
});

export const cardDataStates = atom<CardData[]>({
  key: "cardDataStates",
  default: [],
});

export const deleteStates = atom<number>({
  key: "deleteStates",
  default: 0,
});

export const clickState = atom<boolean>({
  key: "clickState",
  default: false,
});

interface AlbumData {
  id: number;
  title: string;
  // Add other properties as needed
}

export const newTrackRecoState = atom<boolean>({
  key: "newTrackRecoState",
  default: false,
});

export const userIdState = atom<number | null>({
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
