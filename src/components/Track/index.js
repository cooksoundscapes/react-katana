import CommandBar from "./CommandBar"
import SliceArray from "./SliceArray"

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
            />
        </div>
    )
}