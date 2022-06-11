import Yoga from "@react-pdf/yoga";
import { createElement, render } from "./my-jsx";

function init() {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  const width = window.innerWidth;
  const height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;

  if (!canvas) {
    console.log("no canvas");
    return;
  }
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    console.log("no ctx");
    return;
  }
  render(
    ctx,
    <box
      id="root"
      style={{
        width,
        height,
        backgroundColor: "blue",
        padding: 20,
      }}
    >
      <box
        id="redChild"
        style={{
          backgroundColor: "red",
          margin: 20,
        }}
      >
        <text id="text" style={{ fontSize: 24, color: "black", margin: 8 }}>
          Hello Lorem Ipsum True False Boolean
        </text>
      </box>
      <box
        id="greenChild"
        style={{
          backgroundColor: "green",
          flexDirection: Yoga.FLEX_DIRECTION_COLUMN,
        }}
      >
        <box
          id="cyanChild"
          style={{ width: 50, height: 50, backgroundColor: "cyan" }}
        ></box>
        <box
          id="orangeChild"
          style={{
            backgroundColor: "orange",
            flexDirection: Yoga.FLEX_DIRECTION_COLUMN,
          }}
        >
          <box
            id="yellowChild"
            style={{
              width: 50,
              height: 50,
              backgroundColor: "yellow",
            }}
          ></box>
          <box
            id="whiteChild"
            style={{
              width: 50,
              height: 50,
              backgroundColor: "white",
            }}
          ></box>
        </box>
      </box>
    </box>
  );
}

init();
