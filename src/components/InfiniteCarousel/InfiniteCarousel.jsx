// import styles from "./InfiniteCarousel.module.scss";
import logo1 from "../../assets/logo1.png";
import logo2 from "../../assets/logo2.png";
import logo3 from "../../assets/logo3.png";
import logo4 from "../../assets/logo4.png";
import logo5 from "../../assets/logo5.png";
import logo6 from "../../assets/logo6.png";
import logo7 from "../../assets/logo7.png";
import logo8 from "../../assets/logo8.png";
import logo9 from "../../assets/logo9.png";
import logo10 from "../../assets/logo10.png";
import "./InfiniteCarousel.scss";

const images = [
	logo1,
	logo2,
	logo3,
	logo4,
	logo5,
    logo6,
    logo7,
    logo8,
    logo9,
    logo10,
];

// function InfiniteCarousel({ children }) {
// 	return (
// 		// <div className={styles.slider}>
// 		// 	<div className={styles.slide_track}>{children}</div>
// 		// </div>
// 		// <div className={styles.container}>
// 		// 	<div className={styles.slider2}>
// 		// 		<img src={logo1} className={styles.slide} />
// 		// 		<img src={logo2} className={styles.slide} />
// 		// 		<img src={logo3} className={styles.slide} />
// 		// 		<img src={logo4} className={styles.slide} />
// 		// 		<img src={logo5} className={styles.slide} />
// 		// 		<img src={logo5} className={styles.slide} />
// 		// 		<img src={logo5} className={styles.slide} />
// 		// 		<img src={logo5} className={styles.slide} />
// 		// 		<img src={logo5} className={styles.slide} />
// 		// 	</div>
// 		// 	<div className={styles.slider2}>
// 		// <img src={logo1} className={styles.slide} />
// 		// <img src={logo2} className={styles.slide} />
// 		// <img src={logo3} className={styles.slide} />
// 		// <img src={logo4} className={styles.slide} />
// 		// <img src={logo5} className={styles.slide} />
// 		// <img src={logo5} className={styles.slide} />
// 		// <img src={logo5} className={styles.slide} />
// 		// <img src={logo5} className={styles.slide} />
// 		// <img src={logo5} className={styles.slide} />
// 		// 	</div>
// 		// </div>
// 		<div className={styles.logos}>
// 			<div className={styles.logos_slide}>
// 				<img src={logo1} />
// 				<img src={logo2} />
// 				<img src={logo3} />
// 				<img src={logo4} />
// 				<img src={logo5} />
// 				<img src={logo5} />
// 				<img src={logo5} />
// 				<img src={logo5} />
// 				<img src={logo5} />
// 			</div>
// 			<div className={styles.logos_slide}>
// 				<img src={logo1} />
// 				<img src={logo2} />
// 				<img src={logo3} />
// 				<img src={logo4} />
// 				<img src={logo5} />
// 				<img src={logo5} />
// 				<img src={logo5} />
// 				<img src={logo5} />
// 				<img src={logo5} />
// 			</div>
// 		</div>
// 	);
// }

// export default InfiniteCarousel;

// import "./InfiniteCarousel.css"; // Custom styles for the carousel

// const InfiniteCarousel = () => {
// 	const logos = [
// 		logo1,
// 		logo2,
// 		logo3,
// 		logo3,
// 		logo3,
// 		logo3,
// 		logo3,
// 		logo3,
// 		logo3,
// 		logo3,
// 		logo2,
// 		logo2,
// 	];

// 	return (
// 		<div className="carousel-container">
// 			<div className="carousel-track">
// 				{logos.concat(logos).map((logo, index) => (
// 					<div className="carousel-item" key={index}>
// 						<img src={logo} alt={`Logo ${index}`} className="" />
// 					</div>
// 				))}
// 			</div>
// 		</div>
// 	);
// };

// export default InfiniteCarousel;

// const InfiniteCarousel = () => {
// 	return (
// 		<div className={styles.carousel}>
// 			<div className={styles.group}>
// 				<div className={styles.card}>
// 					<img src={logo1} />
// 				</div>
// 				<div className={styles.card}>
// 					<img src={logo2} />
// 				</div>
// 				<div className={styles.card}>
// 					<img src={logo3} />
// 				</div>
// 			</div>
// 			<div aria-hidden className={styles.group}>
// 				<div className={styles.card}>
// 					<img src={logo1} />
// 				</div>
// 				<div className={styles.card}>
// 					<img src={logo2} />
// 				</div>
// 				<div className={styles.card}>
// 					<img src={logo3} />
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

// export default InfiniteCarousel;

// import React, { useEffect, useRef, useState } from "react"
// import styled from "styled-components"
// import gsap, { Linear } from "gsap"
// import Draggable from "gsap/dist/Draggable"
// import { breakpoints } from "../../themes/breakpoints"

// const InfiniteCarousel = () => {

//   const container = useRef<HTMLDivElement>()
//   const NUMBER_OF_CARDS = images.length

//   const setCardsPosition = (): void => {
//     gsap.set(".box", {
//       x: (i) => i * (window.innerWidth / 4)
//     });
//   }

//   useEffect(() => {
//     gsap.registerPlugin(Draggable)
//     let q = gsap.utils.selector(container)
//     const proxy = q(".proxy")
//     console.log('PROXY', proxy);
//     console.log(q(".box"));

//     const cardWidth = window.innerWidth / 4
//     const snapBox = gsap.utils.snap(cardWidth)
//     const wrapWidth = NUMBER_OF_CARDS * cardWidth
//     const wrapProgress = gsap.utils.wrap(0, 1)
//     const props = gsap.getProperty(proxy)

//     setCardsPosition()
//     gsap.to(q(".box"), {
//       duration: 60,
//       ease: "none",
//       x: `+=${(window.innerWidth / 4) * NUMBER_OF_CARDS}`,
//       modifiers: {
//         x: gsap.utils.unitize(x => parseFloat(x) % ((window.innerWidth / 4) * NUMBER_OF_CARDS)) //force x value to be between 0 and 500 using modulus
//       },
//       repeat: -1
//     });

//     const animation = gsap.to(q(".box"), {
//       duration: 1,
//       x: "+=" + wrapWidth,
//       ease: Linear.easeNone,
//       paused: true,
//       repeat: -1,
//       modifiers: {
//         x: function(x, target) {
//           x = parseFloat(x) % wrapWidth;
//           return x + "px";
//         }
//       }
//     }).progress(1 / NUMBER_OF_CARDS);

//     const updateProgress = () => {
//       animation.progress(wrapProgress(props("x") / (wrapWidth)))
//     }

//     Draggable.create(proxy, {
//       // type: "x",
//       trigger: q(".boxes"),
//       throwProps: true,
//       onDrag: updateProgress,
//       onThrowUpdate: updateProgress,
//       snap: {
//         x: snapBox
//       }
//     });
//   });

//   const renderCard = (card, index) => {
//     return (
//       <CarouselItem key={index} className="box">
//         <PlaceText>{card.text}</PlaceText>
//         <Picture src={card.src}></Picture>
//       </CarouselItem>
//     )
//   }

//   return (
//     <div ref={container as React.RefObject<HTMLDivElement>}>
//       <div className="proxy"></div>
//       <Wrapper>
//         <CarouselContainer className="boxes">
//           {images.map(renderCard)}
//         </CarouselContainer>
//       </Wrapper>
//     </div>
//   )
// }

// const Wrapper = styled.div`
//   width: 100%;
//   margin: auto;
//   height: 400px;
//   overflow: hidden;
//   position: relative;
//   margin-top: 200px;
//   border: 2px solid red;
// `

// const CarouselContainer = styled.div`
//   position: relative;

//   @media ${breakpoints.laptop} {
//     left: -25%;
//   }
// `

// const CarouselItem = styled.div`
//   width: 100%;
//   position: absolute;
//   border: 2px solid black;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;

//   @media ${breakpoints.laptop} {
//     width: 25%;
//   }
// `

// const PlaceText = styled.span`
//   color: ${({ theme }) => theme.text.color.red};
//   font-family: ${({ theme }) => theme.text.family.atlanticCruise};
//   display: inline-block;
//   font-size: 3rem;
//   margin-bottom: 2rem;
// `

// const Picture = styled.img`
//   border-radius: 30px;
//   width: 90%;
//   user-select: none;
//   user-drag: none;
// `

// export default InfiniteCarousel

const InfiniteCarousel = () => {
	return (
		<div className="container2">
			<div className="slider">
				<div className="slide_track">
					{images.concat(images).map((logo, index) => (
						<div className="slide" key={index}>
							<img src={logo} className="image" alt="" />
							<p className="text">nigga{index}</p>
						</div>
					))}
					{/* <div className="slide">
						<img src={logo1} height="100" width="250" alt="" />
                        <p className="text-black">nigga</p>
					</div>
					<div className="slide">
						<img src={logo1} height="100" width="250" alt="" />
                        <p>nigga</p>
					</div>
                    <div className="slide">
						<img src={logo1} height="100" width="250" alt="" />
                        <p>nigga</p>
					</div>
                    <div className="slide">
						<img src={logo2} height="100" width="250" alt="" />
                        <p>nigga</p>
					</div>
					<div className="slide">
						<img src={logo2} height="100" width="250" alt="" />
                        <p>nigga</p>
					</div>
                    <div className="slide">
						<img src={logo2} height="100" width="250" alt="" />
                        <p>nigga</p>
					</div>

                    <div className="slide">
						<img src={logo1} height="100" width="250" alt="" />
                        <p>nigga</p>
					</div>
					<div className="slide">
						<img src={logo1} height="100" width="250" alt="" />
                        <p>nigga</p>
					</div>
                    <div className="slide">
						<img src={logo1} height="100" width="250" alt="" />
                        <p>nigga</p>
					</div>
                    <div className="slide">
						<img src={logo2} height="100" width="250" alt="" />
                        <p>nigga</p>
					</div>
					<div className="slide">
						<img src={logo2} height="100" width="250" alt="" />
                        <p>nigga</p>
					</div>
                    <div className="slide">
						<img src={logo2} height="100" width="250" alt="" />
                        <p>nigga</p>
					</div> */}

					{/* <div className="slide">
						<img src={logo1} height="100" width="250" alt="" />
					</div>
					<div className="slide">
						<img src={logo2} height="100" width="250" alt="" />
					</div>
					<div className="slide">
						<img src={logo2} height="100" width="250" alt="" />
					</div>
					<div className="slide">
						<img src={logo2} height="100" width="250" alt="" />
					</div>
					<div className="slide">
						<img src={logo2} height="100" width="250" alt="" />
					</div>
					<div className="slide">
						<img src={logo2} height="100" width="250" alt="" />
					</div>
					<div className="slide">
						<img src={logo1} height="100" width="250" alt="" />
					</div>
					<div className="slide">
						<img src={logo1} height="100" width="250" alt="" />
					</div>

					<div className="slide">
						<img src={logo1} height="100" width="250" alt="" />
					</div>
					<div className="slide">
						<img src={logo2} height="100" width="250" alt="" />
					</div>
					<div className="slide">
						<img src={logo2} height="100" width="250" alt="" />
					</div>
					<div className="slide">
						<img src={logo2} height="100" width="250" alt="" />
					</div>
					<div className="slide">
						<img src={logo2} height="100" width="250" alt="" />
					</div>
					<div className="slide">
						<img src={logo2} height="100" width="250" alt="" />
					</div>
					<div className="slide">
						<img src={logo1} height="100" width="250" alt="" />
					</div>
					<div className="slide">
						<img src={logo1} height="100" width="250" alt="" />
					</div> */}
				</div>
			</div>
		</div>
	);
};

export default InfiniteCarousel;
