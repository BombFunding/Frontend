import Lottie from 'react-lottie';
import animationData from './animation.json';

const LottieAnimation = ({ onClick }) => {
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
            style={{ width: '100%', height: 'auto', cursor: 'pointer' }}
            onClick={onClick}
        >
            <Lottie options={defaultOptions} height={200} width={380} />
        </div>
    );
};

export default LottieAnimation;
