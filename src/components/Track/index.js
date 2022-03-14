import CommandBar from "./CommandBar"
import SliceArray from "./SliceArray"
import { Grid } from "../KeyboardSequencer"

export default function({trackInfo}) 
{
    return (
        <div>
            <CommandBar 
                name={trackInfo.filename} 
                trackId={trackInfo.id}
            />
            <SliceArray 
                audioIsLoaded={trackInfo.tempo > 0}
                sliceCount={trackInfo.slices} 
                trackId={trackInfo.id}
                sliceLabels={trackInfo.keyboardRow >= 0 ? Grid[trackInfo.keyboardRow] : null}
            />
        </div>
    )
}