import React from 'react';
import './App.css';
import { AddPlayer,  useCreatePlayer } from './components/CreatePlayers';
import { players } from './components/Player';
import {ModalContent} from './components/modal';
import { Roll } from './components/Roll';




export function App() {
	const {k, added, modalContent, colorBack, createPlayer1} = useCreatePlayer()



	return (
		<>
		{/* компонент броска кубиков */}
			<div className='board-row'>
				<Roll  />
			</div>
		{/* модалка добавления игроков */}
			<div className='12312'>
				{modalContent && (
					<ModalContent title={k} imgSrc={"plus" +added+".png"} colorBackground={colorBack}>
						<AddPlayer onCreate={createPlayer1} key={players.id} />
					</ModalContent>
				)}
			</div>
		</>
	);
}

export default App;
