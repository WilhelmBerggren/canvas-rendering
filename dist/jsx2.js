import Yoga, { Node } from "@react-pdf/yoga";
export function createElement(tag, props, ...children) {
    const yogaNode = Node.create();
    if (props?.style?.height) {
        yogaNode.setHeight(props.style.height);
    }
    if (props?.style?.width) {
        yogaNode.setWidth(props.style.width);
    }
    if (props?.style?.flexDirection) {
        yogaNode.setFlexDirection(props?.style?.flexDirection);
    }
    if (props?.style?.flexWrap) {
        yogaNode.setFlexWrap(props?.style?.flexWrap);
    }
    if (props?.style?.padding) {
        yogaNode.setPadding(Yoga.EDGE_ALL, props?.style?.padding);
    }
    return {
        tag,
        props: {
            children,
            ...props,
        },
        yogaNode,
    };
}
function calculateNodeLayout(node) {
    if (typeof node === "string") {
        return;
    }
    node?.props?.children.forEach((child, i) => {
        calculateNodeLayout(child);
        if (typeof child !== "string") {
            node.yogaNode.insertChild(child.yogaNode, i);
        }
        else {
            node.yogaNode.setWidth(child.length * (((node.props.style.fontSize || 12) * 2) / 3));
            node.yogaNode.setHeight(node.props.style.fontSize || 12);
        }
    });
    node.yogaNode.calculateLayout();
}
function renderNode(ctx, node, parent) {
    const { width, height, top, left } = node.yogaNode.getComputedLayout();
    if (node.tag === "box") {
        ctx.fillStyle = node.props.style.backgroundColor || "white";
        ctx.fillRect(left, top, width, height);
        for (const child of node.props.children) {
            renderNode(ctx, child, node);
        }
    }
    if (node.tag === "text") {
        ctx.fillStyle = node.props.style.color || "white";
        ctx.font = `${node.props.style.fontSize || 12}px serif`;
        ctx.fillText(node.props.children[0] || "no text", left + parent?.yogaNode.getComputedLeft(), top +
            (node.props.style.fontSize || 12) +
            parent?.yogaNode.getComputedTop(), width);
    }
}
export function renderRoot(ctx, node) {
    calculateNodeLayout(node);
    renderNode(ctx, node, null);
}
