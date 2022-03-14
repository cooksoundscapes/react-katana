import { createContext, useContext, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addTrack } from "../audio_core/redux_store"
import AudioController from "./AudioController";
import readAudioFile from "./readAudioFile";
/*
IndexedDB API should be used for caching of audio files;
calls are encapsulated with ContextAPI from React;

Redux is still needed, though.
*/
const AudioContext = createContext();

const AudioControl = new AudioController();

export default function AudioProvider({children})
{
    const dispatch = useDispatch();
    const tracks = useSelector(state => state.tracks)

    const createTrack = (file) => {
        /* here, the "unserializable" data will be handled by
         * the AudioControl object, leaving all the rest to 
         * the Redux store. 
         */
        AudioControl.startDSP();
        let newId = AudioController.generateId();
        
        readAudioFile(file, AudioControl.ctx).then(
            audioBuffer => {
                AudioControl.addBuffer(audioBuffer, newId)
            }
        )
        const fileInfo = {
            id: newId,
            name: file.name,
            tempo: 0
        }
        dispatch( addTrack(fileInfo) );
    }

    const setMasterVolume = value => {
        AudioControl.setMasterVol(value)
    }

    const play = (slice, trackId) => {
        const trackInfo = tracks.find( track => track.id === trackId);
        AudioControl.playTrack(slice, trackInfo);
    }

    return (
        <AudioContext.Provider value={{createTrack, setMasterVolume, play}}>
            {children}
        </AudioContext.Provider>
    )
}

export const useAudio = () => useContext(AudioContext);
