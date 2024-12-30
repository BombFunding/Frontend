import { useEffect, useState } from "react";
import StartupCard from "../StartupCard/StartupCard";
import { getData } from "@/Services/ApiClient/Services";

function StartupPagination() {
	const [projects, setProjects] = useState([]);
	useEffect(() => {
		const fetch = async () => {
			const data = await getData("/starboard/most-recent/");
			console.log("d", data);
			setProjects(data);
		};
		fetch();
		console.log("projects", projects);
	}, []);
	console.log(projects);
	return (
		<div className="border-solid border-2 border-red-500 m-[1vw] p-[1vw] grid grid-cols-3 justify-center items-start gap-x-4 gap-y-2 rtl">
			{projects.map((project) => (
				<StartupCard
					name={project.name}
					id={project.id}
					image={`http://104.168.46.4:8000${project.image}`}
          description={project.description}
          likeCount={project.like_count}
          subcategories={project.subcategories}
					key={project?.id}
				/>
			))}
			<StartupCard />
		</div>
	);
}

export default StartupPagination;
