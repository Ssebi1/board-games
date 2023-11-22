import React, {useRef, useState} from 'react';
import GamesClientsStyle from '../style/games-clients.module.css'
import {MdClose, MdPeopleAlt} from "react-icons/md";

function GameModal({game, setGameSelected}) {
    return (
        <div className={GamesClientsStyle.gameModalContainer}>
            <div className={GamesClientsStyle.closeModal} onClick={() => {setGameSelected(null)}}><MdClose /></div>
            <div className={GamesClientsStyle.gameTitle}>{game.title}</div>
            <div className={GamesClientsStyle.gameRules}>{game.rules}</div>
            <div className={GamesClientsStyle.gamePlayers}><MdPeopleAlt /> {game.min_players}-{game.max_players}</div>
        </div>
    )
}

export default GameModal