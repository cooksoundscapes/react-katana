import { useEffect } from "react";
import { useAudio } from "../audio_core/AudioContext"

export const Grid = [
    ['q','w','e','r','t','y','u','i','o','p'],
    ['a','s','d','f','g','h','j','k','l','ç'],
    ['z','x','c','v','b','n','m',',','.',';']
];

function gridCoords(key) 
{    
    for (let i = 0; i < Grid.length; i++) {
        if (Grid[i].includes(key))
            return {
                row: i,
                column: Grid[i].findIndex(val => val === key)
            }
    }
}

export function KeyboardSequencer()
{
    const {playWithGrid} = useAudio();

    const padPress = event => {
        const {row, column} = gridCoords(event.key.toLowerCase());
        if (row !== null && column !== null) playWithGrid(row, column)
    }

    useEffect( () => {
        window.addEventListener('keypress', padPress);

        return function cleanup() {
            window.removeEventListener('keypress', padPress)
        }
    })

    return null;
}