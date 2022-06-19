import {
  ALIGN_CENTER,
  FLEX_DIRECTION_ROW,
  JUSTIFY_SPACE_EVENLY,
  OVERFLOW_COUNT,
  OVERFLOW_HIDDEN,
  OVERFLOW_SCROLL,
  POSITION_TYPE_ABSOLUTE,
  WRAP_WRAP,
} from "yoga-layout-prebuilt";
import { createElement, renderRoot } from "./jsx";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;

window.onload = init;
window.onresize = init;

var fps = 0;
setInterval(() => {
  if (fps >= 0) {
    fps--;
  }
}, 10);

// while (true) {
// init();
// requestAnimationFrame(init);
// }

function init() {
  fps++;
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

  renderRoot(
    ctx,
    <box
      style={{
        width,
        height,
        backgroundColor: "red",
        maxWidth: width,
        maxHeight: height,
      }}
    >
      <box
        style={{
          backgroundColor: "blue",
          flexDirection: FLEX_DIRECTION_ROW,
          flexWrap: WRAP_WRAP,
          // maxHeight: height - 40,
          overflow: OVERFLOW_COUNT,
        }}
      >
        <box
          style={{
            height: 200,
            width: 200,
            backgroundColor: "yellow",
            margin: 10,
            padding: 10,
          }}
        >
          <text style={{ color: "black", fontSize: 24 }}>1</text>
        </box>
        <box
          style={{
            height: 200,
            width: 200,
            backgroundColor: "orange",
            margin: 10,
            padding: 10,
          }}
        >
          <text style={{ color: "black", fontSize: 24 }}>2</text>
        </box>
        <box
          style={{
            height: 200,
            width: 200,
            backgroundColor: "green",
            margin: 10,
            padding: 10,
          }}
        >
          <text style={{ color: "black", fontSize: 24 }}>3</text>
        </box>
      </box>
      <box
        style={{
          position: POSITION_TYPE_ABSOLUTE,
          bottom: 0,
          left: 0,
          height: 50,
          margin: 20,
          width: width - 40,
          backgroundColor: "gray",
          alignItems: ALIGN_CENTER,
          justifyContent: JUSTIFY_SPACE_EVENLY,
          flexDirection: FLEX_DIRECTION_ROW,
        }}
      >
        <text>Hotbar item 1</text>
        <text>Hotbar item 2</text>
        <text>Hotbar item 3</text>
      </box>
    </box>
  );
  return true;
}
