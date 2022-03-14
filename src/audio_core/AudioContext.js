import { createContext, useContext, useState, useEffect } from "react"
import { useDispatch } from "react-redux"
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

    const createTrack = (file) => {
        /* here, the "unserializable" data will be handled by
         * the AudioControl object, leaving all the rest to 
         * the Redux store. 
         */
        AudioControl.startDSP();
        //Id generation handled over the audio control object;
        let newId = 0;
        readAudioFile(file, AudioControl.ctx).then(
            audioBuffer => {
                newId = AudioControl.addBuffer(audioBuffer)
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

    return (
        <AudioContext.Provider value={{createTrack, setMasterVolume}}>
            {children}
        </AudioContext.Provider>
    )
}

export const useAudio = () => useContext(AudioContext);
