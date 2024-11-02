/** @format */

import React from 'react';
import './style.css';

type Props = {
    isDefault?: boolean;
};

const StarLoader = ({ isDefault = true }: Props) => {
    return (
        <div className={`${isDefault ? 'container' : 'container-second'}`}>
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
        </div>
    );
};

export default StarLoader;
