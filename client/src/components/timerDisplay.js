import React, { useContext } from "react";
import { Context } from "../index";
import { observer } from "mobx-react-lite";

const TimerDisplay = observer(() => {
    const { test } = useContext(Context);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
    };

    return (
        <div className="timer">
            {test.remainingTime !== null
                ? <h2>Time: {formatTime(test.remainingTime)}</h2>
                : <h2>No Time Limit</h2>}
        </div>
    );
});

export default TimerDisplay;
