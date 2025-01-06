import React, { useRef, useState } from "react";
import styles from "./Editor.module.scss";
import EditorJS from "@editorjs/editorjs";
import FaTranslation from "./FaTranslation.js";
import { useEffect } from "react";
import useEditorStore from "@/stores/EditorStore/EditorStore";
import { Card } from "../ui/card";
import { Label } from "../ui/label";
import "./Editor.css";
import { useNavigate, useParams } from "react-router-dom";
import useProjectStore from "@/stores/ProjectStore/ProjectStore";
import JoyrideComponent from "./Joyride.jsx";
import EditorTools from "./EditorTools";
import { Loading } from "../Loading/Loading";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
const Editor = () => {
	const { projectId } = useParams();
	const { updateProject } = useProjectStore();
	const { data, getData, saveData } = useEditorStore();
	const [update, setUpdate] = useState(false);
	const editorRef = useRef(null);
	const holderRef = useRef(null);
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	useEffect(() => {
		const fetchData = async () => {
			await updateProject(projectId);
			getData(projectId);
			console.log("data in editorStore: ", data);
		};
		fetchData();
	}, []);

	useEffect(() => {
		console.log("effectdata: ", data);
		console.log("holder: ", holderRef.current);
		if (holderRef.current) {
			const editor = new EditorJS({
				holder: "editorjs",
				autofocus: true,
				data: data,
				tools: EditorTools(),
				i18n: FaTranslation(),
			});

			editorRef.current = editor;
			return () => {
				editor.isReady
					.then(() => editor.destroy())
					.catch((error) => console.log(error));
			};
		}
	}, [data, update, editorRef, holderRef]);

	useEffect(() => {
		const handleKeyDown = (event) => {
			if (event.ctrlKey && event.key === "s") {
				event.preventDefault(); // Prevent the browser's default save behavior
				handelSave();
			}
		};

		// Add event listener
		window.addEventListener("keydown", handleKeyDown);

		// Cleanup listener on component unmount
		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, []);

	const handelSave = async () => {
		const savedData = await editorRef.current.save();
		//   editorRef.current.destroy();
		console.log("id: ", projectId);
		console.log("data:", data);
		saveData(savedData, projectId);
	};
	const handelDiscard = async () => {
		console.log("imupdating with id: ", projectId);
		await updateProject(projectId);
		getData(projectId);
	};

	if (loading) {
		return (
			<div>
				<Loading className="pt-52 pb-64 place-self-center" />
			</div>
		);
	}
	return (
		<>
			<JoyrideComponent
				run={Object.keys(data ?? {}).length === 0 ? true : false}
			/>
			<div className=" bg-[#FFF5E1]">
				<div className="pt-8 px-6 pb-4 relative">
					<ArrowBackIosNewIcon
						className="absolute left-[8vw] top-10 text-2xl text-gray-600 hover:text-bomborange hover:animate-kreep cursor-pointer"
						onClick={() => {
							navigate(`/projectDashboard/${projectId}`);
							window.scrollTo(0, 0);
						}}
					/>
					<Label className="text-3xl text-gray-600 pl-5 StartTour">
						:ویرایشگر
					</Label>
				</div>
				<div className={`${styles.holder}`}>
					<Card
						ref={holderRef}
						id="editorjs"
						className={`${styles.editor} EditorTour`}
					>
						{""}
					</Card>
				</div>
				<div className="h-24 bg-blue-950 sticky bottom-0 right-0 left-0 z-[3] flex justify-center items-center gap-10">
					<button
						className="SaveTour btn bg-bomborange text-white hover:bg-white hover:text-black animate-kreep hover:animate-none"
						onClick={handelSave}
					>
						ذخیره
					</button>
					<button
						className="btn bg-bomborange text-white hover:bg-white hover:text-black hover:animate-none"
						onClick={handelDiscard}
					>
						فراموشی
					</button>
				</div>
			</div>
		</>
	);
};

export default Editor;
