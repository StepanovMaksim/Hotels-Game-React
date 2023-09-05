import { useEffect, useState } from 'react';
import { playerData } from './CreatePlayers';
import { players } from './Player';



 var forInterval1 = 0, 
 	forInterval2 = 0,
	forClickBtn = 1,
	quitCub = 0,
	die1 = 0,
	die2 = 0;

export function useGameLogic() {


	const [rollDice1, setRollDice1] = useState(0); // значение кубиков 1 игрока
	const [rollDice2, setRollDice2] = useState(0); // значение кубиков 2 игрока
	const [modalStep, setModalStep] = useState(false); // для окна покупки
	const [modalStepHave, setModalStepHave] = useState(false); // для окна если попал второй раз на свое поле
	const [modalStepRent, setModalStepRent] = useState(false); // для окна когда попал на ячейку противника
	const [gameOver, setGameOver] = useState(false); // если денег нет
	const [step, setStep] = useState(true); // определение хода игрока
	const [colorBack, setColorBack] = useState('#3bfb35')	// цвет фона модалки
	const [colorStep1, setColorStep1] = useState({boxShadow: '0px 0px 0px 7px rgb(129, 255, 127)'}) // подсветка таблички при очереди игрока №1
	const [colorStep2, setColorStep2] = useState({boxShadow: 'none'}) // подсветка таблички при очереди игрока №2
	const [colorSquare1, setColorSquare1] = useState(0) // для анимации ходя по клетками игрока №1
	const [colorSquare2, setColorSquare2] = useState(0) // для анимации ходя по клетками игрока №2
	const [interv, setInterv] = useState(false) // для интервала для анимации хода
	const [cubPlayer1, setCubPlayer1] = useState(1) // изображение игральных костей 
	const [cubPlayer2, setCubPlayer2] = useState(1) // изображение игральных костей 
	const [quit, setQuit] = useState(false)

	
	// остановка анимации кубиков
	const stopQuit = () => {
		if (quitCub < 10) {
			quitCub++
		} else {setQuit(() => false)
			setInterv(() => true)
			}
	}

	useEffect(() => {
		// остановка интервала хода игрока
		const stopInt = () => {
			if ((step && forInterval1 < playerData[0].count-1) ||
				(!step && forInterval2 < playerData[1].count-1)) {
				setInterv(() => true)
			} else {setInterv(() => false)
					getStep()
					setStep(c => !c);
					forClickBtn = 1}
		}

		// функция для проверки состояния ячейки (чья она?)
		const getStep = () => {
			if (step) {
					setColorStep1({boxShadow:  'none'})
					setColorStep2({boxShadow: '0px 0px 0px 7px rgb(253, 249, 128)'})
					if (
						intersect(players[1].hotels.map((x) => x%40), playerData[0].count % 40) &&
						intersect(players[0].hotels.map((x) => x%40), playerData[0].count % 40)
						) {
							setModalStep(true);
						} else if (
							!intersect(players[0].hotels.map((x) => x%40), playerData[0].count % 40)
							) {
							setModalStepHave(true);
						} else {
							setModalStepRent(true);
						}
					} else {
						setColorStep2({boxShadow:  'none'})
						setColorStep1({boxShadow:  '0px 0px 0px 7px rgb(129, 255, 127)'})
						if (
							intersect(players[0].hotels.map((x) => x%40), playerData[1].count % 40) &&
							intersect(players[1].hotels.map((x) => x%40), playerData[1].count % 40)
						) {
							setModalStep(true);
						} else if (
							!intersect(players[1].hotels.map((x) => x%40), playerData[1].count % 40)
						) {
							setModalStepHave(true);
						} else {
							setModalStepRent(true);
						}
					}}
		// бросок кубиков
		if (quit) {
			const idCub = setInterval(() => {
			stopQuit()	
			let	die11 = Math.floor(Math.random() * 6) + 1, // кубики в полете
				die22 = Math.floor(Math.random() * 6) + 1;
			setCubPlayer1(()=>die11)
			setCubPlayer2(()=>die22)
		}, 100);
		return () => clearInterval(idCub);
	}

		// для хода игрока
		if (interv) { const id = setInterval(() => {
			stopInt()
			setCubPlayer1(() => die1)
			setCubPlayer2(() => die2)
		if (step)  {
			forInterval1++
			setColorSquare1(() => forInterval1)
		} else {
			forInterval2++
			setColorSquare2(() => forInterval2)
		}
		}, 300);
		return () => clearInterval(id);
	}}, [interv, quit, step]);

	// функция покупки

	const onBuy = () => {
		
		// покупка ячейки на которую попал
		// проверка возможности покупки
		if (!step && players[0].score > 0) {
			
			players[0].score = players[0].score - 10 * (players[0].count % 40);
			players[0].hotels.push(playerData[0].count % 40); // добавление в массив купленного дома
			
			
			if (players[0].score > 0) {
				setModalStep(false);
				
			} else {
				setModalStep(false);
				setGameOver(true);
			}
			// проверка возможности покупки
		} else if (step && players[1].score > 0) {
			
			players[1].score = players[1].score - 10 * (players[1].count % 40);
			players[1].hotels.push(playerData[1].count % 40);// добавление в массив купленного дома

			
			if (players[1].score > 0) {
				setModalStep(false);
			} else {
				setModalStep(false);
				setGameOver(true);
			}
		} else {
			setModalStep(false);
			setGameOver(true);
		}

	};
	// если попал на свою ячейку или не хочешь покупать

	const onSkip = () => {
		setModalStepHave(false);
		setModalStep(false)
	};

	// если попал на ячейку противника

	const onRent = () => {
		// если попал на ячеку противника
		if (step && players[0].score > 0) {
			players[0].score = players[0].score + 10 * players[0].hotels[players[0].hotels.map(x => x%40).indexOf(players[1].count % 40)]
			players[1].score = players[1].score - 10 * players[0].hotels[players[0].hotels.map(x => x%40).indexOf(players[1].count % 40)]


			setModalStepRent(false);
		} 
		if (!step && players[1].score > 0) {
			players[1].score = players[1].score + 10 * players[1].hotels[players[1].hotels.map(x => x%40).indexOf(players[0].count % 40)]
			players[0].score = players[0].score - 10 * players[1].hotels[players[1].hotels.map(x => x%40).indexOf(players[0].count % 40)]
			

			setModalStepRent(false);
		} 
		if (players[1].score < 0 || players[0].score < 0) {
			setModalStepRent(false);
			setGameOver(true);
		}

	};


 // проверка ячейки в массиве противника

	const intersect = function (arr1, number) { 
		return arr1.indexOf(number) === -1;
	};

		// нажатие на кнопку броска кубиков

	const clickBtn = () => {
		if (forClickBtn === 1) {
			setQuit(() => true)
		die1 = Math.floor(Math.random() * 6) + 1;
		die2 = Math.floor(Math.random() * 6) + 1;
		var k = die1+die2;
		quitCub = 0
	
		if (step === true) {
			playerData[0].count += k;
			setColorBack('#3bfb35')
			setRollDice1(k)

		}
		else {
			playerData[1].count += k;
			setColorBack('#fcfc4c')
			setRollDice2(k)
		}
		forClickBtn = 0
		console.log(forClickBtn)

	 // смена хода

		} else {forClickBtn = 0
				console.log(forClickBtn)
		}
	};

	return ({modalStep,
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
	})
}