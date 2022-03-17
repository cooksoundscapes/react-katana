import { createContext, useContext } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addTrack, changeTrack } from "../audio_core/redux_store"
import AudioController from "./AudioController";
import readAudioFile from "./readAudioFile";
import findTempo from "./findTempo"
import drawWaveForm from "./drawWaveform"
import Metronome from "./Metronome";
import bpm_or_ms from "./bpm_or_ms";
/*
This is the front layer of the audio API; components should only talk to this 
context in order to interact with AudioController or Store.

IndexedDB API should be used for caching of audio files;
calls are encapsulated with ContextAPI from React;
*/
const AudioContext = createContext();

const AudioControl = new AudioController();

const Metro = new Metronome();

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
        if (!Metro.ctx) {
            Metro.activate(AudioControl.ctx);
            AudioControl.metronome = Metro;
        }

        let newId = AudioController.generateId();
        
        readAudioFile(file, AudioControl.ctx).then(
            audioBuffer => {
                AudioControl.addBuffer(audioBuffer, newId)
                const guessedTempo = findTempo(audioBuffer.duration);
                dispatch( changeTrack({
                    id: newId, 
                    tempo: guessedTempo
                }));
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

    const switchLead = (id) => {
        const lastLeader = tracks.find(track => track.syncMode === "Lead");
        const newLeader = tracks.find(track => track.id === id);
        AudioControl.tempo = newLeader.tempo;
        if (lastLeader)
            dispatch( changeTrack({id: lastLeader.id, syncMode: "Follow"}) )
    }

    const setParam = (id, param, value) => {
        if ( ["trimStart", "trimEnd", "playStyle"].includes(param) ) {
            AudioControl.changeLive(id, param, value)
        } 
        if (param === "syncMode") {
            if (value === "Lead") switchLead(id);
        }
        dispatch ( changeTrack({id: id, [param]: value}) )
    }

    const play = (slice, trackId) => {
        const trackInfo = tracks.find( track => track.id === trackId);
        AudioControl.playTrack(slice, trackInfo);
    }

    const keyboardPlay = (coord) => {
        const matches = tracks.filter( track => track.keyboardRow === coord[0])
        matches.forEach( track => {
            AudioControl.playTrack(coord[1], track)
        })
    }

    return (
        <AudioContext.Provider value={{
            createTrack, setMasterVolume, drawWave, play, keyboardPlay, setParam
        }}>
            {children}
        </AudioContext.Provider>
    )
}

export const useAudio = () => useContext(AudioContext);
