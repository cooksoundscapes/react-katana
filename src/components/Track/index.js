import CommandBar from "./CommandBar"
import { Grid } from "../KeyboardSequencer"
import SliceBox from "./SliceBox"

export default function({trackInfo}) 
{
    return (
        <div style={{overflow: "hidden"}}>
            <CommandBar 
                name={trackInfo.filename} 
                trackId={trackInfo.id}
            />
            <SliceBox 
                audioIsLoaded={trackInfo.tempo > 0}
                sliceCount={trackInfo.slices} 
                trackId={trackInfo.id}
                sliceLabels={trackInfo.keyboardRow >= 0 ? Grid[trackInfo.keyboardRow] : null}
            />
        </div>
    )
}