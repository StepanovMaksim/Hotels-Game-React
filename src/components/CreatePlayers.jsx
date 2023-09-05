import React, { useState } from "react";
import { players } from "./Player";

// входные данные игроков
export const playerData = [{
    key: 0,
    id: 1,
    name: "Игрок №1",
    score: 5000,
    count:0,
    hotels: []
},
    {
    key: 1,
    id: 2,
    name: "Игрок №2",
    score: 5000,
    count:0,
    hotels: []
    }
]

let i = 0;

// добавление игроков из модалки на старте

export function AddPlayer({onCreate = f => f}) {
    const [value, setValue] = useState('')
    const submitHandler =  (event) => {
        onCreate();
        event.preventDefault();
        if (i===0 && value!== '') playerData[0].name = value
        else if (i===0) playerData[0].name = "Игрок №1";
        if (i===1 && value!== '') playerData[1].name = value
        else playerData[1].name = "Игрок №2";
        setValue('')
        i++
    } 
        return (
            <form onSubmit={submitHandler}> 
                <input
                    type="text"
                    className="playerName"
                    placeholder="Введите имя"
                    value={value}
                    onChange={event => setValue(event.target.value)}
                />
                
                <button type='submit'
                className="addPlayer">Создать</button>
            </form>
        )
}

// для обновления модалки старта и добавление в массив игроков

export function useCreatePlayer() {
    let [i, setI] = useState(0);
    const [added, setAdded] = useState('');
    const [modalContent, setModalContent] = useState(true);
    const [colorBack, setColorBack] = useState('#3bfb35');
    let k = `Добавить игрока №${i + 1}`;
    const createPlayer1 = () => { 
        players[0] = playerData[0];
        setColorBack('#fcfc4c')
        setAdded('1');
        if (i === 1) {
            players[1] = playerData[1];
            setModalContent(false);
        }
        setI((i = 1));
}
    return {k, added, modalContent, colorBack, createPlayer1}
};