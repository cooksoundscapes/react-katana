import styles from "./styles/bars.module.scss"
import { useState, useRef, useEffect } from "react"

export function BarHandler({startingPosition, min, max, side, getValue})
{
    const [X, setX] = useState(0)

    //useRef and useEffect only needed for fetching parent width
    const barRef = useRef();
    useEffect( () => {
        if (barRef.current && startingPosition) {
            const parentWidth = barRef.current.parentElement.offsetWidth;
            setX(startingPosition * parentWidth-2)
        }
    }, [])

    const moveBar = event => {
        event.stopPropagation();
        const object = event.target;
        
        let startX;
        if (event.type == "touchstart") startX = event.touches[0].clientX;
        else {
            startX = event.clientX;
            const dummy = document.createElement('span');
            event.dataTransfer.setDragImage(dummy, 0, 0);
        } 

        const objPos = object.offsetLeft;
        const parentWidth = object.parentElement.offsetWidth;

        const dragging = event => {
            let moveX;
            if (event.type == "touchmove") {
                event.preventDefault();
                moveX = event.touches[0].clientX;
            }
            else moveX = event.clientX;

            const move = moveX - startX + objPos;
            if (move >= (min*parentWidth+10 || 0) && move <= (max*parentWidth-10 || parentWidth-2)) {
                setX(move);
                if(getValue) getValue(move/parentWidth)
            }
        }
        const endDrag = () => {
            object.removeEventListener('drag', dragging);
            object.removeEventListener('dragend', endDrag);
            object.removeEventListener('touchmove', dragging);
            object.removeEventListener('touchend', endDrag);
        }
        object.addEventListener('drag', dragging);
        object.addEventListener('dragend', endDrag);
        object.addEventListener('touchmove', dragging);
        object.addEventListener('touchend', endDrag);
    }

    return (
        <div 
            ref={barRef}
            draggable
            className={styles.handler} 
            onDragStart={moveBar}
            onTouchStart={moveBar}
            style={{left: X}}
            side={side}
        ></div>
    )
}