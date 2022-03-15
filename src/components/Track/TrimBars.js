import { BarHandler } from "../atoms";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { changeTrack } from "../../audio_core/redux_store"

export default function TrimBars({trackId, children})
{
    const [barsPosition, setBars] = useState([0, 1])    
    const dispatch = useDispatch();

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
                dispatch( changeTrack({id: trackId, trimStart: v}) )
            }} 
            side="left"
        />

            {childrenWithProps}
            
        <BarHandler 
            min={barsPosition[0]} 
            getValue={v => {
                setBars(prev => [prev[0], v]);
                dispatch( changeTrack({id: trackId, trimEnd: v}) )
            }} 
            startingPosition={1}
            side="right" 
        />
        </>
    )
}