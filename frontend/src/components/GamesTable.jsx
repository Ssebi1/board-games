import React, {useRef, useState} from 'react';
import {Link} from "react-router-dom";
import GamesStyle from "../style/games.module.css";
import {AiFillDelete, AiFillEdit, AiOutlineEye} from "react-icons/ai";

function GamesTable({games, limit, showActions, deleteGameAction}) {

    return (
        <table className={GamesStyle.table}>
            <thead>
            <tr>
                <th>Title</th>
                <th>Players</th>
                <th>Rules</th>
                { showActions && (
                    <th>Actions</th>
                )}
            </tr>
            </thead>
            <tbody>
            { games && games.length > 0 && games.slice(0, limit).map((game, index) => {
                return(
                    <tr>
                        <td>{game.title}</td>
                        <td>{game.min_players}-{game.max_players}</td>
                        <td>{game.rules.slice(0,30)}</td>
                        { showActions && (
                            <td className={GamesStyle.actionButtons}>
                                <Link to={`${game._id}/view`} className={GamesStyle.actionButton}><AiOutlineEye/></Link>
                                <Link to={`${game._id}/edit`} className={GamesStyle.actionButton}><AiFillEdit/></Link>
                                <span className={GamesStyle.actionButton} onClick={() => deleteGameAction(game._id)}><AiFillDelete/></span>
                            </td>
                        )}
                    </tr>
                )
            })}
            </tbody>
        </table>
    )
}

export default GamesTable