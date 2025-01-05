import React from 'react';
import Lottie from 'react-lottie';
import animationData from './city1.json';

const Cityan1 = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
        },
    };

    return (
        <div
            style={{
                width: '100%',
                maxWidth: '600px',
                height: 'auto',
                display: 'flex',
                justifyContent: 'center',
                margin: '0 auto',
            }}
        >
            <Lottie options={defaultOptions} height={450} width={450} />
        </div>
    );
};

export default Cityan1;
