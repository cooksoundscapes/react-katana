import { createSlice, configureStore } from '@reduxjs/toolkit'

const trackSlice = createSlice({
  name: 'track',
  initialState: {
    tracks: [],
    generate_id: 0,
    masterVolume: null,
    audioctx: null // audioContext
  },
  reducers: {
    startDSP: state => {
        state.audioctx = new (window.AudioContext || window.webkitAudioContext);
        state.masterVolume = audioctx.createGain(1);
        state.masterVolume.connect(audioctx.destination);
    },
    setMasterVolume: (state, newVolume) => {
        state.masterVolume.gain.value = newVolume.payload;
    },
    addTrack: (state, fileInfo) => {
        const newTrack = {
            id: state.generate_id++,
            filename: fileInfo.payload.name,
            tempo: fileInfo.payload.tempo,
            level: 1,
            slices: 8,
            playStyle: "oneshot",
            syncMode: "free",
            snapToBeat: false,
            reverse: false,
            speed: 1,
            keyboardRow: null,
            group: 1
        }
        state.tracks.push(newTrack);
    },
    removeTrack: (state, id) => {
        const index = state.tracks.find( track => track.id == id.payload);
        state.tracks.splice(index, 1);
    }
  }
})

export const { startDSP, addTrack, removeTrack } = trackSlice.actions

export const store = configureStore({
  reducer: trackSlice.reducer
})