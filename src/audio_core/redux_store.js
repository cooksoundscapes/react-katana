import { createSlice, configureStore } from '@reduxjs/toolkit'

const trackSlice = createSlice({
    name: 'track',
    initialState: {
        tracks: []
    },
    reducers: {
        addTrack: (state, fileInfo) => {
            const newTrack = {
                id: fileInfo.payload.id,
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
        changeTrack: (state, update) => {
            const track = state.tracks.find( track => track.id == update.payload.id);
            Object.entries(update.payload).forEach( ([key, value]) => {
                if (key !== "id" && key in track) {
                    track[key] = value;
                }
            })
        },
        removeTrack: (state, id) => {
            const index = state.tracks.findIndex( track => track.id == id.payload);
            state.tracks.splice(index, 1);
        }
    }
})

export const { addTrack, removeTrack, changeTrack } = trackSlice.actions

export const store = configureStore({
  reducer: trackSlice.reducer
})