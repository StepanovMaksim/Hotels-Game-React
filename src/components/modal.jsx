import React from 'react';


// компонент, для остальных модалок

export function ModalContent({ title, children, imgSrc, colorBackground }) {
	
	return (
	  <>
		<div className="modalBack" />
		<div className="modalWindow" style={{ backgroundColor: colorBackground }}>
		  <h2>{title}</h2>
		  <div>
			<img src={imgSrc} height="180px" width="180px" alt="1" />
		  </div>
		  {children}
		</div>
	  </>
	);
  }


  // модалка покупки

  export function ModalStep({ onBuy, onSkip, ke, price, colorWindow }) {
	return (
	  <ModalContent 
	  	title="Хотите купить?" 
		imgSrc={ke % 40 + ".png"}
		colorBackground = {colorWindow} >
			<h3>{`Стоимость: ${price}$`}</h3> 
			<button className="buy" onClick={onBuy}>
				Купить
			</button>
			<button className="auction" onClick={onSkip}>
				Отказаться
			</button>
	  </ModalContent>
	);
  }

  // модалка аренды

export function ModalStepRent({ onRent, ke, rent,  colorWindow }) {
	return (
		<ModalContent 
			title="Участок противника" 
			imgSrc={ke % 40 + ".png"}
			colorBackground = {colorWindow}>
				<h3>{`Стоимость: ${rent}`}</h3> 
				<button className="payRent" onClick={onRent}>
					Заплатить за аренду
				</button>
	  	</ModalContent>
	);
}

	// модалка своей ячейки

export function ModalStepHave({ ke, onSkip, colorWindow }) {
	return (
		<ModalContent  
			imgSrc={ke % 40 + ".png"}
			colorBackground = {colorWindow}>
				<h3>Участок уже принадлежит Вам</h3> 
				<button className="buy" onClick={onSkip}>
					Отлично!
				</button>
	  	</ModalContent>
	);
}

	// мордалка конца игры

export function GameOver( {colorWindow} ) {
	return (
		<ModalContent 
			title="Игра окончена" 
			imgSrc={"GameOver.png"}
			colorBackground = {colorWindow}>
				<h2>{`Вы банкрот(`}</h2> 
	  	</ModalContent>
	);
}

	// модалка управления отелями

export function OwnedHotels( {player, children, closeModal, animation} ) {
	return (
		<>
			<div className={animation} onClick={closeModal}>
			<div className={player ? 'modalOwned' : 'modalOwned1'}
				onClick={e => e.stopPropagation()}>
				{children}
			</div>
			</div>
		</>

	);
}

	// модалка для повышения уровня

export function ModalLvlUp({ ke, onlvlUp, price, onSkipLvlUp, colorWindow }) {
	return (
		<ModalContent 
			title="Окно улучшения" 
			imgSrc={ke % 40 + ".png"}
			colorBackground = {colorWindow}>
				<h3>{`Улучшить за ${price}$ ?`}</h3> 
				<button className="buy" onClick={onlvlUp}>
					Улучшить 
				</button>
				<button className="auction" onClick={onSkipLvlUp}>
					Отказаться
				</button>
	  	</ModalContent>
	);
}

	// модалка после достижения максимального уровня


export function ModalLvlUpNo({ ke, onSkipLvlUp, colorWindow }) {
	return (
		<ModalContent 
			title="Окно улучшения" 
			imgSrc={ke % 40 + ".png"}
			colorBackground = {colorWindow}>
				<h3>{`У отеля максимальный уровень`}</h3> 
				<button className="auction" onClick={onSkipLvlUp}>
					Отлично!
				</button>
	  	</ModalContent>
	);
}