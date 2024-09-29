import { atom } from "recoil";

// Define appropriate types for the atoms based on your application's requirements


interface CardData {
  id: number;
  title: string;
  // Add other properties as needed
}

// In your recoil state definition







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



export const albumNameState = atom({
  key: 'albumNAmeState',
  default: null
})

export const artistNAmeState = atom({
  key: 'artistNAmeState',
  default: null
})



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

export const albumCoverInAlbum = atom({
  key: 'albumCoverInAlbum',
  default: null
})
export const nameOfAlbumState = atom({
  key: 'albumNameState',
  default: null

})

export const releaseDateState = atom({
  key: 'releaseDateState',
  default: ''

})

export const numberOFMusicState = atom({
  key: 'numberOFMusicState',
  default: 0
})
export const musicCountState = atom({
  key: 'musicCountState',
  default: null
})
export const artistNameGlobalState = atom({
  key: 'artistNameGlobalState',
  default: ''
})
export const onBackWardState = atom({
  key: 'onBackWardState',
  default: false
})

export const autoCloseState = atom({
  key: 'autoCloseState',
  default: false
})
export const totalSongsState = atom({
  key: 'totalSongsState',
  default: 0
})
