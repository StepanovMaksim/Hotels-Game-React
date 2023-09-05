import React from 'react';

import { playerData } from './CreatePlayers';
import { players } from './Player';
import {
	GameOver,
	ModalStep,
	ModalStepHave,
	ModalStepRent,
} from './modal';
// import { onBuy } from './GameLogic';

import { useGameLogic } from './GameLogic';
import { Manage } from './Manage';


 // отрисовка игрового поля

export function Roll() {

	const {modalStep,
		modalStepHave,
		modalStepRent,
		gameOver,
		step,
		colorBack,
		rollDice1,
		rollDice2,
		colorStep1,
		colorStep2,
		colorSquare1,
		colorSquare2,
		cubPlayer1,
		cubPlayer2,
		onBuy,
		onSkip,
		onRent,
		clickBtn,
		} = useGameLogic()
	

	return (
		<>
			<div>
				
				{/* окно покупки */}
				
				{modalStep && (
					<ModalStep
						onBuy={onBuy}
						onSkip={onSkip}
						ke={
							step
								? (playerData[1].count % 40) + 1
								: (playerData[0].count % 40) + 1
						}
						price={step 
									? 10 * (players[1].count % 40)
									: 10 * (players[0].count % 40)}
						colorWindow={colorBack}
					/>
				)}

				{/* окно своего участка */}

				{modalStepHave && (
					<ModalStepHave
						onSkip={onSkip}
						ke={
							step
								? (playerData[1].count % 40) + 1
								: (playerData[0].count % 40) + 1
						}
						colorWindow={colorBack}
						
					/>
				)}

				{/* окно аренды */}

				{modalStepRent && (
					<ModalStepRent
						onRent={onRent}
						ke={
							step
								? (playerData[1].count % 40) + 1
								: (playerData[0].count % 40) + 1
						}
						rent={step 
								?	(10 * (players[0].hotels[players[0].hotels.map(x => x%40).indexOf(players[1].count % 40)])) + '$'
								:	(10 * players[1].hotels[players[1].hotels.map(x => x%40).indexOf(players[0].count % 40)]) + '$'
							}
						colorWindow={colorBack}
					/>
				)}

				{/* окно конца игры */}

				{gameOver && <GameOver colorWindow={colorBack}/>}
			</div>

			<div>
				<button className='modalRoll' onClick={clickBtn}>
					Бросить кубики
				</button>
				<div className="player1scoreP">{rollDice1}</div>
    			<div className="player2scoreP">{rollDice2}</div>
			</div>
			{/* управление отелями в собственности */}
			<Manage 
				style1={colorStep1}
				style2={colorStep2}
				colorSquare1={colorSquare1}
				colorSquare2={colorSquare2}
				cubCount1={'Cub/cub' + cubPlayer1}
				cubCount2={'Cub/cub' + cubPlayer2}
				/>
			
		</>
	);
}