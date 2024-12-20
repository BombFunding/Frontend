import styles from "./InfiniteCarousel.module.scss";
// import "./InfiniteCarousel.scss";
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
import { useNavigate } from "react-router-dom";

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

const InfiniteCarousel = ({ items, children }) => {
	const Navigate = useNavigate();
	return (
		<div className={styles.container}>
			<div className={styles.slider}>
				<div className={styles.slide_track}>
					{items.concat(items).map((item, index) => (
						<div
							className={styles.slide}
							key={index}
							onClick={() =>
								Navigate(`/profile/${item.username}`)
							}
						>
							<img
								src={`http://104.168.46.4:8000/${item.profile_picture}`}
								className={styles.image}
								alt=""
							/>
							<p className={styles.text}>{item.username}</p>
						</div>
					))}
					{/* {children.concat(children).map((item, index) => {
						<div className={styles.slide} key={index}>
							<img src={item} className={styles.image} alt="" />
							<p className={styles.text}>nigga{index}</p>
						</div>;
					})} */}
				</div>
			</div>
		</div>
	);
};

export default InfiniteCarousel;
