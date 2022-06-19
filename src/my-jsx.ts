import Yoga, { Node } from "yoga-layout-prebuilt";
import { Tag, Element } from "./types";

export function createElement(tag: Tag, props, ...children): Element {
  console.log("creating:", tag, props.id || children[0]);

  const yogaNode = Node.create();
  const { width, height, padding, margin, flexDirection } = props.style || {};
  if (flexDirection) {
    yogaNode.setFlexDirection(flexDirection);
  }

  yogaNode.setFlexGrow(0);
  yogaNode.setFlexShrink(0);

  if (width) {
    yogaNode.setWidth(width);
  }
  if (tag === "text") {
    yogaNode.setHeight(props.style.fontSize);
  } else {
    if (height) {
      yogaNode.setHeight(height);
    }
  }
  if (padding) {
    yogaNode.setPadding(Yoga.EDGE_ALL, padding);
  }
  if (margin) {
    yogaNode.setMargin(Yoga.EDGE_ALL, margin);
  }

  return {
    id: props.id,
    tag,
    yogaNode,
    style: props.style || {},
    children,
  };
}
function calculateLayout(node: Element) {
  if (node.children) {
    node.children.forEach((child: string | Element, index: number) => {
      if (typeof child !== "string") {
        console.log(
          "inserting",
          child?.id || child?.children?.[0],
          "to",
          node.id,
          index
        );
        node.yogaNode.insertChild(child.yogaNode, index);
        calculateLayout(child);
      }
    });
  }
  if (node.yogaNode) {
    console.log("calculating layout for", node.id);
    // node.yogaNode.calculateLayout();
  }
}

export function render(
  ctx: CanvasRenderingContext2D,
  node: Element,
  parent?: Element
) {
  if (node.id === "root") {
    calculateLayout(node);
    node.yogaNode.calculateLayout();
  }
  const layout = node.yogaNode.getComputedLayout();
  const { top, left, width, height } = layout;
  if (node.tag === "text") {
    console.log("drawing text", node.children[0], layout);
    ctx.fillStyle = node.style.color || "white";
    ctx.font = `${node.style.fontSize}px serif`;
    ctx.fillText(
      node.children[0] || "",
      left + (parent?.yogaNode.getComputedLeft() || 0),
      top + height + (parent?.yogaNode.getComputedTop() || 0),
      width
    );
  } else if (node.tag === "box") {
    console.log("drawing box", node.id, layout);
    ctx.fillStyle = node.style.backgroundColor;
    ctx.fillRect(
      left + (parent?.yogaNode.getComputedLeft() || 0),
      top + (parent?.yogaNode.getComputedTop() || 0),
      width,
      height
    );

    if (node.children) {
      node.children.forEach((child, index) => {
        console.log("rendering", child.id, "with parent", node.id);
        render(ctx, child, node);
      });
    }
  }
}
