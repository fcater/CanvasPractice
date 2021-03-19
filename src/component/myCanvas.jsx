import React, { useLayoutEffect, useState } from "react";

const MyCanvas = () => {
  const [ctx, setCtx] = useState({});
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [mouseState, setMouseState] = useState(false);
  const [currentTool, setCurrentTool] = useState("brush");

  useLayoutEffect(() => {
    //   设置全局宽高
    setCanvasSize({
      width: document.body.clientWidth,
      height: document.body.clientHeight,
    });
    // 设置画布工具
    const canvas = document.getElementById("myCanvas");
    setCtx(canvas.getContext("2d"));
    // 设置画布偏移量
    setOffset({
      x: (document.body.clientWidth - canvasSize.width) / 2,
      y: (document.body.clientHeight - canvasSize.height) / 2,
    });
  }, []);

  const reset = () => {
    const { width, height } = canvasSize;
    ctx.clearRect(0, 0, width, height);
  };
  const mouseDown = () => {
    setMouseState(true);
  };
  const mouseUp = () => {
    setMouseState(false);
  };
  const mouseMove = (e) => {
    const { x, y } = offset;
    if (mouseState && currentTool === "brush") {
      ctx.beginPath();
      ctx.arc(e.clientX, e.clientY, 10, 0, 2 * Math.PI);
      ctx.fillStyle = "tomato";
      ctx.fill();
      ctx.strokeStyle = "tomato";
      ctx.stroke();
    }
  };

  const { width, height } = canvasSize;
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "tomato",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <canvas
        id="myCanvas"
        height={height}
        width={width}
        style={{ backgroundColor: "white" }}
        onMouseDown={mouseDown}
        onMouseUp={mouseUp}
        onMouseMove={mouseMove}
      >
        你的浏览器不支持canvas,请升级你的浏览器
      </canvas>
      <div style={{ position: "absolute", bottom: "1em" }}>
        <button onClick={reset}>重做</button>
        <button onClick={() => console.log("撤销")}>撤销</button>
        <button onClick={() => console.log("橡皮擦")}>橡皮擦</button>
      </div>
    </div>
  );
};

export default MyCanvas;
