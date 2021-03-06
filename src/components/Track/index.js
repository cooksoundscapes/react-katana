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
                syncMode={trackInfo.syncMode}
                playStyle={trackInfo.playStyle}
            />
            <SliceBox 
                audioIsLoaded={trackInfo.loaded}
                sliceCount={trackInfo.slices} 
                trackId={trackInfo.id}
                sliceLabels={trackInfo.keyboardRow >= 0 ? Grid[trackInfo.keyboardRow] : null}
            />
        </div>
    )
}