import { BarHandler } from "../atoms";
import React, { useState } from "react";
import { useAudio } from "../../audio_core/AudioContext"

export default function TrimBars({trackId, children})
{
    const [barsPosition, setBars] = useState([0, 1])    
    const {setParam} = useAudio();

    const childrenWithProps = React.Children.map( children, child => {
        if (React.isValidElement(child)) {
            return React.cloneElement(child, {trimBars: barsPosition});
        } else {
            return child;
        }
    })

    return (
        <>
        <BarHandler 
            max={barsPosition[1]}
            getValue={v => {
                setBars(prev => [v, prev[1]]);
                setParam(trackId, "trimStart", v)
            }} 
            side="left"
        />

            {childrenWithProps}
            
        <BarHandler 
            min={barsPosition[0]} 
            getValue={v => {
                setBars(prev => [prev[0], v]);
                setParam(trackId, "trimEnd", v)
            }} 
            startingPosition={1}
            side="right" 
        />
        </>
    )
}