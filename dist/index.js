import { FLEX_DIRECTION_ROW, WRAP_WRAP } from "@react-pdf/yoga";
import { createElement, renderRoot } from "./jsx";
const canvas = document.getElementById("canvas");
window.onresize = init;
init();
function init() {
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
    renderRoot(ctx, createElement("box", { style: { height, width, backgroundColor: "red" } },
        createElement("box", { style: {
                backgroundColor: "blue",
                flexDirection: FLEX_DIRECTION_ROW,
                flexWrap: WRAP_WRAP,
            } },
            createElement("box", { style: { height: 200, width: 200, backgroundColor: "yellow" } }),
            createElement("box", { style: { height: 200, width: 200, backgroundColor: "orange" } }),
            createElement("box", { style: {
                    height: 200,
                    width: 200,
                    backgroundColor: "green",
                    padding: 10,
                } },
                createElement("text", { style: { color: "white", fontSize: 24 } }, "Lorem Ipsum")))));
}
