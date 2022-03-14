import { createContext, useContext } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addTrack, changeTrack } from "../audio_core/redux_store"
import AudioController from "./AudioController";
import readAudioFile from "./readAudioFile";
import findTempo from "./findTempo"
import drawWaveForm from "./drawWaveform"
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
                const guessedTempo = findTempo(audioBuffer.duration);
                dispatch( changeTrack({
                    id: newId, 
                    tempo: guessedTempo
                }) );
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

    const drawWave = (id, canvas) => {
        const buffer = AudioControl.getBufferById(id);
        drawWaveForm(buffer, canvas);
    }

    const play = (slice, trackId) => {
        const trackInfo = tracks.find( track => track.id === trackId);
        AudioControl.playTrack(slice, trackInfo);
    }

    return (
        <AudioContext.Provider value={{createTrack, setMasterVolume, drawWave, play}}>
            {children}
        </AudioContext.Provider>
    )
}

export const useAudio = () => useContext(AudioContext);
