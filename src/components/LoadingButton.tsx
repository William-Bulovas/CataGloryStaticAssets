import React from 'react';

export default () => {
    return (
        <button className="btn btn-secondary" type="button" disabled>
            <span className="spinner-border spinner-border-sm" role="status"/>
            <span className="sr-only">Loading...</span>
        </button>
    )
}