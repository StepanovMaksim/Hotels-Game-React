import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { useGameLogic } from './GameLogic';

const createArray = length => [...Array(length)];

// компонент для звезд отелей

const Star = ({ selected = false }) => (
    <FaStar color={selected ? "red" : "grey"} />
   );

export default function StarRating({ totalStars = 5, lvl}) {

    return (
        <>
            {createArray(totalStars).map((n, i) => (
                <Star
                    key={i}
                    selected={lvl > i}
                />
            ))} 
        </>
    );
}