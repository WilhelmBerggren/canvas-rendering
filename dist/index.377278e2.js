// import Yoga from "yoga-layout";
// console.log(Yoga);
function draw(thing) {
    console.log("drawing:", thing);
    const canvas = document.getElementById("canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    if (thing.type === "rect") {
        const { left , top , width , height , backgroundColor  } = thing.style;
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(left, top, width, height);
    } else if (thing.type === "text") {
        const { left , top , color , fontFamily  } = thing.style;
        ctx.font = fontFamily;
        ctx.fillStyle = color;
        ctx.fillText(thing.children[0], left, top);
    }
    if (thing.children && thing.type !== "text") for (let child of thing.children)draw(child);
}
function init() {
    const canvas = document.getElementById("canvas");
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    canvas.addEventListener("pointerdown", function(event) {
        console.log(event);
    });
    draw({
        type: "rect",
        style: {
            top: 0,
            left: 0,
            backgroundColor: "lightgray",
            width: window.innerWidth,
            height: window.innerHeight
        },
        children: [
            {
                type: "rect",
                style: {
                    backgroundColor: "red",
                    top: 20,
                    left: 20,
                    width: 175,
                    height: 50
                }
            },
            {
                type: "text",
                style: {
                    fontFamily: "24px serif",
                    color: "black",
                    top: 50,
                    left: 50
                },
                children: [
                    "hello world"
                ]
            }, 
        ]
    });
}

//# sourceMappingURL=index.377278e2.js.map
