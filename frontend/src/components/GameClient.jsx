import React, {useRef, useState} from 'react';
import GamesClientsStyle from '../style/games-clients.module.css'
import {MdPeopleAlt} from "react-icons/md";

function GameClient({game}) {
    return (
        <div className={GamesClientsStyle.gameContainer}>
            <div className={GamesClientsStyle.gameTitle}>{game.title}</div>
            <div className={GamesClientsStyle.gameRules}>{game.rules.slice(0, 150)}</div>
            <div className={GamesClientsStyle.gamePlayers}><MdPeopleAlt /> {game.min_players}-{game.max_players}</div>
        </div>
    )
}

export default GameClient