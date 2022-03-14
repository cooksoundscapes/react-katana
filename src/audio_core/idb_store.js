import { createContext, useContext } from "react"
/*
IndexedDB API for local peristence of audio tracks;
calls are encapsulated with ContextAPI from React;

Redux is still needed, though.
*/

const TrackContext = createContext();

export default function TrackProvider({children})
{
    return (
        <TrackContext.Provider value={null}>
            {children}
        </TrackContext.Provider>
    )
}

export const useTracks = () => useContext(TrackContext);
