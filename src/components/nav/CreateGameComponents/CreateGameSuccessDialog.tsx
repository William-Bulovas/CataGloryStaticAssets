import React from 'react';

export interface Props {
    createdGameId: string,
    joinGameLink: string
}

export default (props: Props) => {
    return (
        <div>
            You have successfully created a game! Share this link to get others to join!

            <div className="input-group mb-3">
                <div className="form-control">
                    {props.createdGameId}
                </div>
                <div className="input-group-append">
                    <button className="btn btn-light" type="button" 
                    onClick={() => navigator.clipboard.writeText(props.joinGameLink)}>
                        Copy
                    </button>
                </div>
            </div>
        </div>
    )
}