import React, { useState } from 'react';

export interface Props {
    createGameFunction: (nickname: string) => void
    buttonText: string
}

export default (props: Props) => {
    const [nickname, setNickname] = useState("");

    return (
        <div>
            <div className="form-group">
                <label htmlFor="nickNameInput">Choose a nickname for the game!</label>
                <input type="nickName" className="form-control" 
                    id="nickNameInput" aria-describedby="emailHelp" 
                    placeholder="Enter Nickname"
                    value={nickname} onChange={event => setNickname(event.target.value)}
                />
            </div>

            <button onClick={() => props.createGameFunction(nickname)} className="btn btn-primary">{props.buttonText}</button>
        </div>
    )
}