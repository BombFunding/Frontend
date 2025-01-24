import LandingIntroduce from "@/components/LandingIntroduce/LandingIntroduce";
import landing5 from "../../assets/landing5.png";
import landing6 from "../../assets/landing6.png";
import landing7 from "../../assets/landing7.png";

import PieChartComponent from "@/components/LandingIntroduce/PieChart";
import Cityan1 from "@/components/LandingIntroduce/cityFirst";
import Cityan2 from "@/components/LandingIntroduce/citySec";
import IranMap from "@/components/LandingIntroduce/IranMap";

import InfiniteCarousel from "@/components/InfiniteCarousel/InfiniteCarousel";
import { Label } from "@radix-ui/react-label";
import styles from "./Landing.module.scss";
import { useEffect, useState } from "react";
import { getData } from "@/Services/ApiClient/Services";
import { Link } from "react-router-dom";
import img9 from "../../assets/landing_back5.png";
import useStarboardStore from "@/stores/StarboardStore/StarboardStore";

const Landing = () => {
	const [topFunded, setTopFunded] = useState([]);
	const [topVisited, setTopVisited] = useState([]);
	const [topLiked, setTopLiked] = useState([]);
	const { setSorting } = useStarboardStore();
	useEffect(() => {
		getData("/landing/get_statistics/").then((data) => {
			console.log(data);
		});
		// getData("/landing/top_funded_startups/").then((data) => {
		// 	console.log("topFunded: +++++++++++++++++++++++++++++", data);
		// 	setTopFunded(data);
		// });
		getData("/landing/top_visited_startups/").then((data) => {
			console.log("topVisited: ", data);
			setTopVisited(data);
		});
		getData("/landing/top_liked_startups/").then((data) => {
			console.log("topLiked: ", data);
			setTopLiked(data);
		});
	}, []);

	return (
		<>
			<div>
				<LandingIntroduce />
			</div>

			<div
				style={{
					display: "flex",
					flexDirection: "row-reverse",
					alignItems: "center",
					justifyContent: "space-between",
					flexWrap: "wrap",
					textAlign: "right",
					padding: "20px",
				}}
			>
				{/* Text Section */}
				<div
					style={{
						flex: "1",
						minWidth: "300px",
						marginBottom: "10px",
						direction: "rtl",
						paddingRight: "40px",
						width: "100%",
					}}
				>
					<h1
						style={{
							fontSize: "2rem",
							marginBottom: "10px",
							fontWeight: "bold",
							color: "#0C084B",
							textAlign: "center",
						}}
					>
						<span style={{ color: "#FF7F00" }}>&lt;</span>
						<span style={{ color: "#FF7F00" }}>&lt;</span>هدف ما
						چیه؟
						<span style={{ color: "#FF7F00" }}>&gt;</span>
						<span style={{ color: "#FF7F00" }}>&gt;</span>
					</h1>
					<p style={{ fontSize: "1.5rem", lineHeight: "1.8" }}>
						بمب فاندینگ با هدف ارائه سایتی ایرانی برای نزدیک تر کردن
						استارتاپ ها و سرمایه گذاران ساخته شده است.
					</p>
					<p style={{ fontSize: "1.5rem", lineHeight: "1.8" }}>
						این پلتفرم، شرکت های نوپای استارتاپی را به سرمایه گذاران
						و کاربران عادی معرفی میکند و هم سرمایه گذاران و هم
						کاربران عادی میتوانند با هرمقدار سرمایه ای که مدنظرشان
						است روی شرکت ها سرمایه گذاری کنند و به همان نسبت در سود
						سهام آن شریک شوند.{" "}
					</p>
				</div>

				{/* Lottie Animation Section */}
				<div
					style={{
						flex: "1",
						minWidth: "300px",
						display: "flex",
						justifyContent: "center",
					}}
				>
					<Cityan1 />
				</div>
			</div>

			{/* Media Query for Smaller Screens */}
			<style>
				{`
    @media (max-width: 768px) {
        div > div {
            margin-bottom: 5px; /* Reduce vertical space between divs on small screens */
        }
    }
    `}
			</style>

			<div
				style={{
					display: "flex",
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "space-between",
					flexWrap: "wrap",
					textAlign: "right",
					padding: "20px",
				}}
			>
				{/* Text Section */}
				<div
					style={{
						flex: "1",
						minWidth: "300px",
						marginBottom: "10px",
						paddingRight: "40px",
					}}
				>
					<h1
						style={{
							fontSize: "2rem",
							marginBottom: "10px",
							fontWeight: "bold",
							color: "#0C084B",
							textAlign: "center",
						}}
					>
						<span style={{ color: "#FF7F00" }}>&lt;</span>
						<span style={{ color: "#FF7F00" }}>&lt;</span>تفاوت ما
						با سایت های مشابه چیه؟
						<span style={{ color: "#FF7F00" }}>&gt;</span>
						<span style={{ color: "#FF7F00" }}>&gt;</span>
					</h1>
					<p style={{ fontSize: "1.5rem", lineHeight: "1.8" }}>
						بمب فاندینگ اولین سایت ایرانی خواهد بود که قیمت پایه ای
						برای خرید سهام ندارد و هرکسی با هرمقدار بودجه دلخواه خود
						میتواند سهامی از شرکتی را خریداری کند
					</p>
					<p style={{ fontSize: "1.5rem", lineHeight: "1.8" }}>
						شما حتی میتوانید به اندازه 10 هزارتومان در پروژه یک شرکت
						نوپا سهیم باشید و از آن حمایت کنید
					</p>
				</div>

				{/* Lottie Animation Section */}
				<div
					style={{
						flex: "1",
						minWidth: "300px",
						display: "flex",
						justifyContent: "center",
					}}
				>
					<Cityan2 />
				</div>
			</div>

			{/* Media Query for Smaller Screens */}
			<style>
				{`
    @media (max-width: 768px) {
        div > div {
            margin-bottom: 5px; /* Reduce vertical space between divs on small screens */
        }
    }
    `}
			</style>

			<div
				className="custom-container"
				style={{
					display: "flex",
					flexDirection: "row-reverse",
					alignItems: "center",
					justifyContent: "space-between",
					flexWrap: "wrap",
					textAlign: "right",
					padding: "20px",
				}}
			>
				<style>
					{`
            @media (max-width: 960px) { /* زمانی که عرض صفحه به نصف می‌رسد */
                .custom-container {
                    flex-direction: column !important; /* عناصر به صورت عمودی */
                }
                .text-section {
                    order: 1; /* متن در بالا قرار بگیرد */
                    text-align: center; /* مرکز متن‌ها */
                }
                .map-section {
                    order: 2; /* نقشه در پایین قرار بگیرد */
                }
            }
        `}
				</style>
<div
  className="text-section"
  style={{
    flex: "1",
    minWidth: "300px",
    marginBottom: "10px",
    direction: "rtl",
    paddingRight: "40px",
    width: "100%",
	  textAlign: "center",
  }}
>
  <h1
    style={{
      fontSize: "2rem",
      marginBottom: "10px",
      fontWeight: "bold",
      color: "#0C084B",
    }}
  >
    <span style={{ color: "#FF7F00" }}>&lt;</span>
    <span style={{ color: "#FF7F00" }}>&lt;</span>چه شهرهایی
    در پلتفرم ما استارتاپ دارند؟
    <span style={{ color: "#FF7F00" }}>&gt;</span>
    <span style={{ color: "#FF7F00" }}>&gt;</span>
  </h1>
  <p style={{ fontSize: "1.5rem", lineHeight: "1.8" }}>
    هدف بمب فاندنیگ از بین بردن مرزها و محدودیت هایی ست که
    سر راه شرکت های استارتاپی قرار گرفته اند.
  </p>
  <p style={{ fontSize: "1.5rem", lineHeight: "1.8" }}>
    ما تلاش کرده ایم محدودیت هایی مانند قیمت های خرید سهام،
    ارتباط انحصاری بین شرکت ها و سرمایه گذاران و مرزهای
    جغرافیایی را کمتر کنیم.
  </p>
  <p style={{ fontSize: "1.5rem", lineHeight: "1.8" }}>
    در نمودار مقابل توزیع استارتاپ ها را در استان های مختلف
    میتوانید ببینید.
  </p>

  <div
    onClick={() => window.location.href = '/googlemap'}
    style={{
      color: "#0C0C42",
      fontSize: "1.3rem",
      fontWeight: "bold",
      cursor: "pointer",
    //   textAlign: "center",
    //   display: "inline-block", // برای وسط‌چین کردن
      animation: "glowText 1.5s infinite",
    }}
						onMouseOver={(e) => (e.target.style.color = "#a84400")}
						onMouseOut={(e) => (e.target.style.color = "#0C0C42")}
					>
						برای دیدن جزئیات بیشتر کلیک کنید
  </div>

  <style>
    {`
      @keyframes glowText {
        0% { text-shadow: 0 0 5px #999999; }
        50% { text-shadow: 0 0 20px #999999; }
        100% { text-shadow: 0 0 5px #999999; }
      }
    `}
  </style>
</div>

				<div
					className="map-section"
					style={{
						flex: "1",
						minWidth: "300px",
						display: "flex",
						justifyContent: "center",
					}}
				>
					<IranMap />
				</div>
			</div>

			{/* Media Query for Smaller Screens */}
			<style>
				{`
    @media (max-width: 768px) {
        div > div {
            margin-bottom: 5px; /* Reduce vertical space between divs on small screens */
        }
    }
    `}
			</style>

			<div>
				<PieChartComponent />
			</div>

			<div className="py-20">
				<div className="rtl flex justify-between px-5 items-center">
					<Label className="text-black font-vazirmatn text-2xl pr-10">
						پربازدیدترین استارت‌آپ‌ها
					</Label>
					<Link
						onClick={() => {setSorting("top-visited")}}
						to="/Starboard"
						className="text-black font-vazirmatn text-sm md:text-base lg:text-lg xl:text-xl px-3 py-1 rounded hover:bg-gray-200 transition-all duration-300"
					>
						دیدن بیشتر...
					</Link>
				</div>

				<InfiniteCarousel items={topVisited} />

				{/* <div className="rtl flex justify-between px-5">
					<Label className="text-black font-vazirmatn text-2xl pr-10 top-10 place-content-center">
						جذاب‌ترین استارت‌آپ‌ها
					</Label>
					<button
    className="text-black font-vazirmatn text-sm md:text-base lg:text-lg xl:text-xl px-3 py-1 rounded hover:bg-gray-200 transition-all duration-300"
						onClick={() => {}}
					>
						دیدن بیشتر...
					</button>
				</div>
				<InfiniteCarousel items={topFunded} /> */}

				<div className="rtl flex justify-between px-5">
					<Label className="text-black font-vazirmatn text-2xl pr-10 top-10 place-content-center">
						محبوب‌ترین استارت‌آپ‌ها
					</Label>
					<Link
						to="/Starboard"
						onClick={() => {setSorting("top-liked")}}
						className="text-black font-vazirmatn text-sm md:text-base lg:text-lg xl:text-xl px-3 py-1 rounded hover:bg-gray-200 transition-all duration-300"
					>
						دیدن بیشتر...
					</Link>
				</div>
				<InfiniteCarousel items={topLiked} />
			</div>
		</>
	);
};

export default Landing;
