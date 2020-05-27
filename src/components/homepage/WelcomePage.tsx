import React, { useEffect, useState, FormEvent } from 'react';
import FacebookSignInButton from './../nav/FacebookSignInButton';
// Noto_Emoji_Pie_1f34f
import Logo from './../../RedOctopusSwimming.gif';
import NavBar from '../nav/NavBar';

const ColoredLine = (color: any) => (
    <hr
        style={{
            color: color,
            backgroundColor: color,
            height: 5
        }}
    />
);

export default () => {
    return (
        <div>
            <NavBar loginState={true} refreshCreated={() => {}} />
            <div className="container mb-8">
                <div className="row mb-8">
                    <div className="col">
                    </div>
                    <div className="col-6 mb-8">
                            <h2 className="display-3 mt-5 text-left">
                                Cataglory
                                <small className="text-muted"> <img style={{width:'30%'}}src={Logo} alt="loading..." /> </small> 
                        </h2>
                        <p className="lead mt-2 text-left mb-3">
                            Here are the rules:
                        </p>
                        <ul className="list text-left">
                            <li className="mb-3"><p className="font-weight-bold">Answers</p> Any number of words is allowed, as long as the first word starts with the correct letter.
                                <ul>
                                    <li className="mb-3 mt-3 text-success">
                                        "Vegetable" and a letter of "C", words such as "cauliflower", "carrot" and "collard greens" 
                                    </li>
                                    <li className="mb-3 text-danger">"Broccoli" (wrong initial letter), "citrus" (wrong category)</li>
                                </ul>
                            </li>
                            <li className="mb-3"><p className="font-weight-bold">Timer</p> All players stop writing when the timer is finished. </li>
                            <li className="mb-3">
                                <p className="font-weight-bold">Scoring</p> Players score zero points for an answer that duplicates another answer in that round, 
                                and one point for an answer no other player has given. </li>
                            <li className="mb-3"> <p className="font-weight-bold">Challenge</p> If for some reason a player thinks someone's answer does not fit the categor, a player may challenge that answer.
                                When challenged, all players vote on the validity of that answer. If the vote is a tie, the vote of the player who is being challenged is thrown out.
                                <ul>
                                    <li className="mb-3 mt-3">
                                        For instance, "knuckle" for the category "types of sandwich"
                                    </li>
                                </ul>
                            </li>
                        </ul>
                        <div className="mt-3 mb-10">
                            <FacebookSignInButton largeBtn={true}/>
                        </div>
                    </div>
                    <div className="col">
                    </div>
                </div>
            </div>
        </div>
    )
}