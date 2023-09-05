import React, { useState } from 'react';
import StarRating from './Star';
import { players } from './Player';
import { playerData } from './CreatePlayers';



const createArray = length => [...Array(length)];
export let lvlHotel = createArray(40).map((x,i) => x=i);
const colors = ["square", "square1", "square2", "square3", "square4", "square5"];

// создание ячейки

export function Square({ ke, price,  squareClass, lvl, onUpdate}) {
	
	return (
	  <div className={squareClass} onClick={onUpdate}>
		<div className='price'>{price != 0 ? price*10+'$' : ''}</div>
		<img src={ke % 40 + 1 + ".png"} height="100px" width="100px" alt="1" />
        <StarRating lvl = {lvl}/>
	  </div>
	); 
  }

  // задание стиля ячейки

const colorIndex = (i, playerCount1, playerCount2) => {
	switch (true) {
	  	case i === playerCount1 % 40 && i !== playerCount2 % 40:
			return 1;
	  	case i === playerCount2 % 40 && i !== playerCount1 % 40:
			return 2;
	  	case i === playerCount2 % 40 && i === playerCount1 % 40:
			return 3;
		case playerData[0].hotels.map((x) => x%40).includes(i) 
			 :
			return 4;
		case playerData[1].hotels.map((x) => x%40).includes(i)  
			 :
			return 5;
	  	default	:
		return 0;
	}
  };

  // уровень ячейки
  const colorStars = (i) => {
	switch (true) {
		case playerData[0].hotels.includes(i) || playerData[1].hotels.includes(i) :
			return 1;
		case playerData[0].hotels.includes(i+40) || playerData[1].hotels.includes(i+40) :
			return 2;
		case playerData[0].hotels.includes(i+80) || playerData[1].hotels.includes(i+80) :
			return 3;
		case playerData[0].hotels.includes(i+120) || playerData[1].hotels.includes(i+120) :
			return 4;
		case playerData[0].hotels.includes(i+160) || playerData[1].hotels.includes(i+160) :
			return 5;
	  	default	:
		return 0;
	}
  };

  // отрисовка массива игрового поля

export function ColorSquares( {playerCount1, playerCount2}) {
	
	return ( createArray(40).map((x, i) => (
		<Square
			price={lvlHotel[i]}
			ke={lvlHotel[i]}
			key={i}
			squareClass={colors[colorIndex(
                i,
				playerCount1,
				playerCount2
                )]}
			lvl = {colorStars(i)}
		/>
  	)));
}