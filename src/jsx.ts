import Yoga, {
  DISPLAY_FLEX,
  Node,
  POSITION_TYPE_ABSOLUTE,
} from "yoga-layout-prebuilt";

export function createElement(tag: string, props, ...children) {
  // console.log(tag, props, ...children);
  const yogaNode = Node.create();
  if (props?.style?.height !== undefined) {
    yogaNode.setHeight(props.style.height);
  }
  if (props?.style?.width !== undefined) {
    yogaNode.setWidth(props.style.width);
  }
  if (props?.style?.flexDirection !== undefined) {
    yogaNode.setFlexDirection(props?.style?.flexDirection);
  }
  if (props?.style?.flexWrap !== undefined) {
    yogaNode.setFlexWrap(props?.style?.flexWrap);
  }
  if (props?.style?.padding !== undefined) {
    yogaNode.setPadding(Yoga.EDGE_ALL, props?.style?.padding);
  }
  if (props?.style?.margin !== undefined) {
    yogaNode.setMargin(Yoga.EDGE_ALL, props?.style?.margin);
  }
  if (props?.style?.maxHeight !== undefined) {
    yogaNode.setMaxHeight(props?.style?.maxHeight);
  }
  if (props?.style?.maxWidth !== undefined) {
    yogaNode.setMaxWidth(props?.style?.maxWidth);
  }
  if (props?.style?.overflow !== undefined) {
    yogaNode.setOverflow(props?.style?.overflow);
  }
  if (props?.style?.justifyContent !== undefined) {
    yogaNode.setJustifyContent(props?.style?.justifyContent);
  }
  if (props?.style?.alignItems !== undefined) {
    yogaNode.setAlignItems(props?.style?.alignItems);
  }
  if (props?.style?.position !== undefined) {
    yogaNode.setPositionType(props?.style?.position);
  }
  if (props?.style?.flex !== undefined) {
    yogaNode.setFlex(props?.style?.flex);
  }
  if (props?.style?.flexGrow !== undefined) {
    yogaNode.setFlexGrow(props?.style?.flexGrow);
  }
  if (props?.style?.flexShrink !== undefined) {
    yogaNode.setFlexShrink(props?.style?.flexShrink);
  }
  if (props?.style?.bottom !== undefined) {
    yogaNode.setPosition(Yoga.EDGE_BOTTOM, 0);
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
    } else {
      node.yogaNode.setWidth(
        child.length * (((node.props?.style?.fontSize || 12) * 1.5) / 3)
      );
      node.yogaNode.setHeight(node.props?.style?.fontSize || 12);
    }
  });
  node.yogaNode.calculateLayout();
}

function renderNode(ctx, node, parent) {
  const { width, height, top, bottom, left } =
    node.yogaNode.getComputedLayout();
  const { backgroundColor, color, fontSize } = node.props.style || {};
  // console.log(node, node.yogaNode.getComputedLayout());

  if (node.tag === "box") {
    ctx.fillStyle = backgroundColor || "white";
    ctx.fillRect(left, top, width, height);
    for (const child of node.props.children) {
      renderNode(ctx, child, node);
    }
  }
  if (node.tag === "text") {
    ctx.fillStyle = color || "white";
    ctx.font = `${fontSize || 12}px serif`;
    ctx.fillText(
      node.props.children[0] || "no text",
      left + parent?.yogaNode.getComputedLeft(),
      top + (fontSize || 12) + parent?.yogaNode.getComputedTop()
    );
  }
}

export function renderRoot(ctx, node: { yogaNode: Yoga.YogaNode; props: any }) {
  calculateNodeLayout(node);
  renderNode(ctx, node, null);
}
