import Yoga from "yoga-layout-prebuilt";

export type Tag = "text" | "box";

export interface TextElement {
  id?: string;
  tag: "text";
  yogaNode: Yoga.YogaNode;
  style: {
    color: string;
    fontSize: number;
  };
  children: string[];
}

export interface BoxElement {
  id?: string;
  tag: "box";
  yogaNode: Yoga.YogaNode;
  style: {
    padding: number;
    margin: number;
    position: string;
    width: number;
    height: number;
    flexDirection: Yoga.YogaFlexDirection;
    backgroundColor: string;
  };
  children?: Element[];
}

export type Element = TextElement | BoxElement;
