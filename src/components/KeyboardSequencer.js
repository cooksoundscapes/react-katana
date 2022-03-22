import { useEffect } from "react";
import { useAudio } from "../audio_core/AudioContext"

export const Grid = [
    ['q','w','e','r','t','y','u','i','o','p'],
    ['a','s','d','f','g','h','j','k','l','ç'],
    ['z','x','c','v','b','n','m',',','.',';']
];

function gridCoords (key) {
    let coords;
    if (Grid[0].includes(key)) {
        coords = [0,Grid[0].findIndex(val => val === key)];
    } else if (Grid[1].includes(key)) {
        coords = [1,Grid[1].findIndex(val => val === key)];
    } else if (Grid[2].includes(key)) {
        coords = [2,Grid[2].findIndex(val => val === key)];
    }
    return coords;
}

export function KeyboardSequencer()
{
    const {playWithGrid} = useAudio();

    const padPress = event => {
        const coord = gridCoords(event.key.toLowerCase());
        if (coord) playWithGrid(coord)
    }

    useEffect( () => {
        window.addEventListener('keypress', padPress);

        return function cleanup() {
            window.removeEventListener('keypress', padPress)
        }
    })

    return null;
}