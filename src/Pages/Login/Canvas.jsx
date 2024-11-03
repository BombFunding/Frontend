import React, { useEffect, useRef } from "react";

function CanvasTriangle({ height, width }) {
	const canvasRef = useRef(null);
    
	useEffect(() => {
		const canvas = canvasRef.current;
		const ctx = canvas.getContext("2d");

		ctx.beginPath();
		ctx.moveTo(0, 0); 
		ctx.lineTo(0, height); 
		ctx.lineTo(width / 10, height / 3); 
		ctx.closePath();
		ctx.fillStyle = "white";
		ctx.fill();

		const ctx2 = canvas.getContext("2d");
        ctx2.beginPath();
		ctx2.moveTo(465, 0); 
		ctx2.lineTo(465, height); 
		ctx2.lineTo(2*width / 10, 2 * height / 3); 
		ctx2.closePath();
		ctx2.fillStyle = "white";
		ctx2.fill();

	}, [width, height]);

	return <canvas ref={canvasRef} width={width/3} height={height}></canvas>;
}

export default CanvasTriangle;
