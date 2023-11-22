import React, {useRef, useState} from 'react';
import GamesClientsStyle from '../style/games-clients.module.css'
import {MdPeopleAlt} from "react-icons/md";
import {FaHeart} from "react-icons/fa";

function GameClient({game, setGameSelected, isFavourite}) {
    return (
        <div className={GamesClientsStyle.gameContainer} onClick={() => {setGameSelected(game)}}>
            <div className={GamesClientsStyle.gameTitle}>{game.title}</div>
            <div className={GamesClientsStyle.gameRules}>{game.rules.slice(0, 150)}</div>
            <div className={GamesClientsStyle.gameFooter}>
                <div className={GamesClientsStyle.gamePlayers}><MdPeopleAlt /> {game.min_players}-{game.max_players}</div>
                { isFavourite ? (
                    <div><FaHeart /> {isFavourite}</div>
                ) : (
                    <></>
                )}

            </div>
        </div>
    )
}

export default GameClient