import React from "react";

interface CellProps {
    color: string, row: number, col: number, turn: string, hint: boolean
};

export default (props: CellProps) => {
    const className = props.hint ? `bg-${props.turn.toLowerCase()}-300` : `bg-${props.color}-600 rounded-full`;
    return (
        <div
            style={{ width: 49, height: 49, border: '1px solid gray', margin: 0 }} >
            <div className={`${className} mr-2 rounded-full`} style={{ width: 49, height: 49, marginRight: 2 }}></div>
        </div >
    );
};