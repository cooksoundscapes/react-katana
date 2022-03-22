import { BarHandler } from "../atoms";
import React, { useState } from "react";
import { useAudio } from "../../audio_core/AudioContext"

export default function TrimBars({trackId, children})
{
    const [barsPosition, setBars] = useState({start: 0, end:1})    
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
            max={barsPosition.end}
            getValue={v => {
                setBars( prev => ({start: v, end: prev.end}) );
                setParam(trackId, "trimStart", v)
            }} 
            side="left"
        />

            {childrenWithProps}
            
        <BarHandler 
            min={barsPosition[0]} 
            getValue={v => {
                setBars( prev => ({start: prev.start, end: v}) );
                setParam(trackId, "trimEnd", v)
            }} 
            startingPosition={barsPosition.end}
            side="right" 
        />
        </>
    )
}