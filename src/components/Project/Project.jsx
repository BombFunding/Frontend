import { useParams } from "react-router-dom";
import { Card } from "../ui/card";
import { useEffect, useState } from "react";
import { getData } from "@/Services/ApiClient/Services";
import { Progress } from "@/components/ui/progress";
import toman from "../../assets/toman.png";
import { Button } from "../ui/button";

function Project({ className }) {
	const { projectId } = useParams();
	const [image, setImage] = useState("");
	const [name, setName] = useState("");
	const [owner, setOwner] = useState("");
	const [description, setDescription] = useState("");
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		setLoading(true);
		getData(`/projects/${projectId}/`).then((data) => {
			console.log(data);
			setImage(data.image);
			setName(data.name);
			setOwner(data.username);
			setDescription(data.description);
		});
	}, []);
	return (
		// <Card
		// 	className={`${className} bg-slate-50 overflow-hidden font-vazirmatn w-[90vw] translate-y-[3vw] mb-[6vw] place-self-center`}
		// >
		<div className={`${className} w-[80vw] place-self-center py-[2vw]`}>
			<div className="place-self-center text-gray-800 text-4xl py-[3vw]">
				{name}
			</div>
			<div className="flex">
				<img src={image} className="w-3/5" />
				<div className="w-full m-8 flex flex-col justify-between">
					<Progress
						value={10}
						className="w-full border-solid border-[1px] border-black"
						indicatorColor="bg-blue-300"
						ProgressColor="bg-bomborange"
					/>
					<div className="flex rtl gap-[0.5vw] mt-[2vw] ">
						<div className="text-black text-2xl place-self-center">
							2000
						</div>
						<img
							src={toman}
							className="w-[2vw] h-[1.4vw] place-self-center mb-[0.4vw]"
						/>
					</div>
					<div className="flex rtl gap-[0.5vw]">
						<div className="text-black text-xl">
							سرمایه جمع‌آوری شده از
						</div>
						<div className="text-black text-5xl">16000</div>
					</div>
					<div className="my-[2vw]">
						<div className="text-black text-2xl">
							مجموع سرمایه جمع‌آوری شده
						</div>
						<div className="flex rtl gap-[0.5vw] place-self-start px-[2vw] py-[1vh]">
							<div className="text-black text-4xl place-self-center">
								2000
							</div>
							<img
								src={toman}
								className="w-[3vw] h-[2.1vw] place-self-center mb-[0.4vw]"
							/>
						</div>
					</div>
					<Button className="btn w-full bg-bomborange hover:bg-black hover:text-white">
						روی این پروژه سرمایه گذاری کنید
					</Button>
				</div>
			</div>
			<div>{description}</div>
		</div>
	);
}

export default Project;
