import { createContext, useContext } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addTrack, changeTrack } from "./Store"
import AudioController from "./AudioController";
import Metronome from "./Metronome";
import { readAudioFile, findTempo, drawWaveform }  from "./functions"
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
        if (!AudioControl.metronome) {
            Metro.activate(AudioControl.ctx);
            AudioControl.metronome = Metro;
        }

        let newId = AudioController.generateId();
        
        readAudioFile(file, AudioControl.ctx).then(
            audioBuffer => {
                const guessedTempo = findTempo(audioBuffer.duration);
                
                AudioControl.addBuffer(audioBuffer, newId, guessedTempo);
                
                dispatch( changeTrack({
                    id: newId, 
                    loaded: true
                }));
            }
        )
        const fileInfo = {
            id: newId,
            name: file.name
        }
        dispatch( addTrack(fileInfo) );
    }

    const setMasterVolume = value => {
        AudioControl.setMasterVol(value)
    }

    const drawWave = (id, canvas) => {
        const buffer = AudioControl.getBufferById(id);
        drawWaveform(buffer, canvas);
    }

    const switchLead = (id) => {
        const lastLeader = tracks.find(track => track.syncMode === "Lead");
        const newLeader = tracks.find(track => track.id === id);
        AudioControl.tempo = newLeader.tempo;
        if (lastLeader)
            dispatch( changeTrack({id: lastLeader.id, syncMode: "Follow"}) )
    }

    const setParam = (id, param, value) => {
        if ( AudioControl.liveControllers.includes(param) ) {
            AudioControl.changeLive(id, param, value)
        } 
        if (param === "syncMode" && value === "Lead") switchLead(id);

        dispatch ( changeTrack({id: id, [param]: value}) )
    }

    const play = (slice, trackId) => {
        const trackInfo = tracks.find( track => track.id === trackId);
        if(trackInfo) AudioControl.playTrack(slice, trackInfo);
    }

    const playWithGrid = (row, column) => {
        const matches = tracks.filter( track => track.keyboardRow === row)
        matches.forEach( track => {
            AudioControl.playTrack(column, track)
        })
    }

    return (
        <AudioContext.Provider value={{
            createTrack, setMasterVolume, drawWave, play, playWithGrid, setParam
        }}>
            {children}
        </AudioContext.Provider>
    )
}

export const useAudio = () => useContext(AudioContext);
