import React from 'react'
import { useDrag } from 'react-dnd';

const SourceBox = (props) => {
    const { type, item, children } = props;
    const [{ isDragging }, dragRef] = useDrag({
        type,
        item,
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    })

    return (
        <div ref={dragRef}>
            {children}
        </div>
    );
};

export default SourceBox;