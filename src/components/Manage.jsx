import React, { useState }  from "react";
import { ModalLvlUp, ModalLvlUpNo, OwnedHotels } from "./modal";
import { playerData } from "./CreatePlayers";
import { ColorSquares, Square } from "./SquareStyle";
import { players } from './Player';
import { lvlHotel } from "./SquareStyle";



// для отрисовки полей имени игрока и его капитала

function PlayersInfo({style1 = {}, style2 = {}}) {
	return (
		<>
			<div className='player1' style={style1}>
				<p className='nameP'>{playerData[0].name}</p>
				<p className='score'
                    
                    >{playerData[0].score} $</p>
			</div>
			<div className='player2' style={style2}>
				<p className='nameP'>{playerData[1].name}</p>
				<p className='score'
                    
                >{playerData[1].score} $</p>
			</div>
		</>		
	)
}

// для управления приобретенными отелями

export function Manage( {
    style1, 
    style2, 
    colorSquare1, 
    colorSquare2,
    cubCount1,
    cubCount2
} ) {

    const [modalOwner1, setmodalOwner1] = useState(false); // для открытия модалки
    const [modalOwner2, setmodalOwner2] = useState(false); // для открытия модалки
    const [lvlHotelNow, setlvlHotelNow] = useState(1); // уровень отеля
    const [modalLvlUp, setModalLvlUp] = useState(false); // для открытия модалки
    const [modalLvlUpNo, setModalLvlUpNo] = useState(false)


    const clickManage1 = () => {
        setmodalOwner1(c => !c)  
    }

    const clickManage2 = () => {
        setmodalOwner2(c => !c)
        console.log(lvlHotelNow)
    }

    // для изменения массива приобретенных отелей

    function arrayUpper(arr) {
        for (let i=0; i<arr.length-1; i++) {
            if (arr[i]+40 === arr[arr.length-1]) {
                arr[i] = arr[arr.length-1];
                arr.pop();
            }
        }
        return arr;
    }
      
    // для отрисовки отелей и их уровней

    function OwnedSquare() {
        
        arrayUpper(playerData[0].hotels);
        arrayUpper(lvlHotel);

        
        return (playerData[0].hotels.map((x, n) => (
            <Square 
                price={x}
                ke={x}
                key={x}
                squareClass= {"squareOwn"}
                onUpdate={() => { 
                setlvlHotelNow(() => x+1)
                if (x < 160)  {    
                    setModalLvlUp(true)
                } else {
                    setModalLvlUpNo(true)
                }}
                    }
                lvl = {Math.ceil(x/40)}
                /> 
            )
        ))
    }


    function OwnedSquare1() {
        arrayUpper(playerData[1].hotels)
        arrayUpper(lvlHotel);
        return (playerData[1].hotels.map((x, n) => (
            <Square 
                price={x}
                ke={x}
                key={x}
                squareClass= {"squareOwn1"}
                onUpdate={() => { 
                    setlvlHotelNow(() => x+1)
                    if (x < 160)  {
                    setModalLvlUp(true)
                } else {
                    setModalLvlUpNo(true)
                }}
                    }
                lvl = {Math.ceil(x/40)}
                /> 
            )
        ))
    }

 // покупка звезд (увеличение уровня)   
    const uppSquareModal = () => {
        setModalLvlUp(false)
        players[0].hotels.push(lvlHotelNow + 39)
        lvlHotel.push(lvlHotelNow + 39)
        players[0].score = players[0].score - 4 * lvlHotelNow;

    }

    const uppSquareModal1 = () => {
        setModalLvlUp(false)
        players[1].hotels.push(lvlHotelNow + 39)
        lvlHotel.push(lvlHotelNow + 39)
        players[1].score = players[1].score - 4 * lvlHotelNow;
        
    }

    return (

        <> 
        
            <button className="manage1" onClick={clickManage1}> Управлять недвижимостью </button>
            <button className="manage2" onClick={clickManage2} > Управлять недвижимостью </button>

                <OwnedHotels 
                    animation={modalOwner1 ? 'modalBackAnimation active' : 'modalBackAnimation'}
                    player={true}
                    closeModal = {clickManage1}
                >  
                <div style={{fontSize: 20}}>Ваши отели:</div>
                   <OwnedSquare />
                </OwnedHotels>    


                <OwnedHotels 
                animation={modalOwner2 ? 'modalBackAnimation active' : 'modalBackAnimation'}
                    player={false}
                    closeModal = {clickManage2}
                >  
                    <div style={{fontSize: 20}}>Ваши отели:</div>
                    <OwnedSquare1 />
                </OwnedHotels>    


            {modalLvlUp && <ModalLvlUp 
                    ke={lvlHotelNow}
                    price={lvlHotelNow*4}
                    colorWindow={modalOwner1 ? '#3bfb35' : '#fcfc4c'}
                    onlvlUp = {() => {modalOwner1 ? uppSquareModal() : uppSquareModal1()}}
                    onSkipLvlUp = {() => setModalLvlUp(false)}
                    /> }
            
            {modalLvlUpNo && <ModalLvlUpNo
                ke={lvlHotelNow}
                price={lvlHotelNow*4}
                colorWindow={modalOwner1 ? '#3bfb35' : '#fcfc4c'}
                onSkipLvlUp = {() => setModalLvlUpNo(false)} />}
            <div className="cub1">
                <img src={cubCount1 + '.png'} alt="home"/>
            </div>
            <div className="cub2">
                <img src={cubCount2 + '.png'} alt="home" />
            </div>
           
            <PlayersInfo 
                style1={style1}
                style2={style2}
                 />
            
            <ColorSquares 
                playerCount1={colorSquare1}
                playerCount2={colorSquare2}
                />
        
        </>
        )
}