import React, { useEffect, useRef } from "react";

function CanvasTriangle() {
	const canvasRef = useRef(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		const ctx = canvas.getContext("2d");

		ctx.beginPath();
		ctx.moveTo(50, 150); // Starting point (x, y)
		ctx.lineTo(150, 150); // Bottom-right corner (x, y)
		ctx.lineTo(100, 50); // Top corner (x, y)
		ctx.closePath(); // Closes the triangle path
		ctx.fillStyle = "blue";
		ctx.fill(); // Fills the triangle with color
	}, []);

	return <canvas ref={canvasRef} width="200" height="200"></canvas>;
}

export default CanvasTriangle;
