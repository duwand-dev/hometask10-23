import React from "react";

export default (props: { color: string, row: number, col: number, turn: string, hint: boolean }) => {
    const className = props.hint ? `bg-${props.turn.toLowerCase()}-300 rounded-full` : `bg-${props.color}-600 rounded-full`;
    return (
        <div className={className}
            style={{ width: 49, height: 49, }} ></div >
    );
};
// , position: 'absolute', top: `${props.row * 50}`, left: `${props.col * 50}` 