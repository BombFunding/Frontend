import React from 'react';
import Lottie from 'react-lottie';
import animationData from './city2.json';

const Cityan2 = () => {
    const isMobile = window.innerWidth <= 480;

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
                maxWidth: isMobile ? '320px' : '600px',
                height: 'auto',
                display: 'flex',
                justifyContent: 'center',
                margin: '0 auto',
            }}
        >
            <Lottie options={defaultOptions} height={460} width={460} />
        </div>
    );
};

export default Cityan2;
