import Accouting from "../../assets/wallet.png";
function Accounting() {
	return (
		<section className="border-solid border-2 rounded-lg border-bomborange p-[1.5vw] place-items-center">
			<h1 className="flex gap-[1vw] p-[3vw]">
				<img src={Accouting} className="h-[2.75vw] place-self-center" />
				<div className="h-[3vw] place-self-center">حسابداری</div>
			</h1>
			<div className="p-[2vw] rtl">
				420000 تومان
			</div>
			<button className="btn bg-bomborange text-black hover:text-white m-[2vw]">
				افزایش موجودی
			</button>
		</section>
	);
}

export default Accounting;
