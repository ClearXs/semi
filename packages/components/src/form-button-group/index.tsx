/**
 * 1. FormItem网格布局
 * 2. 居中，居右，居左布局
 * 3. 行内布局
 * 4. 吸底布局
 */
import React, { useRef, useLayoutEffect, useState } from "react";
import StickyBox from "react-sticky-box";
import { Space } from "@douyinfe/semi-ui";
import { SpaceProps } from "@douyinfe/semi-ui/lib/es/space";
import { BaseItem, IFormItemProps } from "../form-item";
import { usePrefixCls } from "../__builtins__";
import cls from "classnames";
interface IStickyProps {
  offsetTop?: number;
  offsetBottom?: number;
  bottom?: boolean;
  onChangeMode?: (oldMode: unknown, newMode: unknown) => any;
  style?: React.CSSProperties;
  className?: string;
  padding?: number;
  align?: React.CSSProperties["textAlign"];
}

type IFormButtonGroupProps = Omit<SpaceProps, "align"> & {
  align?: React.CSSProperties["textAlign"];
};

type ComposedButtonGroupItem = React.FC<
  React.PropsWithChildren<
    IFormItemProps & {
      spacing?: SpaceProps["spacing"];
    }
  >
>;

type ComposedButtonGroup = React.FC<IFormButtonGroupProps> & {
  Sticky: React.FC<React.PropsWithChildren<IStickyProps>>;
  FormItem: React.PropsWithChildren<ComposedButtonGroupItem>;
};

function getInheritedBackgroundColor(el: HTMLElement) {
  // get default style for current browser
  const defaultStyle = getDefaultBackground(); // typically "rgba(0, 0, 0, 0)"

  // get computed color for el
  const backgroundColor = window.getComputedStyle(el).backgroundColor;

  // if we got a real value, return it
  if (backgroundColor != defaultStyle) return backgroundColor;

  // if we've reached the top parent el without getting an explicit color, return default
  if (!el.parentElement) return defaultStyle;

  // otherwise, recurse and try again on parent element
  return getInheritedBackgroundColor(el.parentElement);
}

function getDefaultBackground() {
  // have to add to the document in order to use getComputedStyle
  let div = document.createElement("div");
  document.head.appendChild(div);
  let bg = window.getComputedStyle(div).backgroundColor;
  document.head.removeChild(div);
  return bg;
}

export const FormButtonGroup: ComposedButtonGroup = ({
  align = "left",
  spacing,
  ...props
}) => {
  const prefixCls = usePrefixCls("button-group");
  return (
    <Space
      {...props}
      spacing={spacing}
      className={cls(prefixCls, props.className)}
      style={{
        ...props.style,
        justifyContent:
          align === "left"
            ? "flex-start"
            : align === "right"
              ? "flex-end"
              : "center",
        display: "flex",
      }}
    >
      {props.children}
    </Space>
  );
};

FormButtonGroup.FormItem = ({ spacing, ...props }) => {
  return (
    <BaseItem
      {...props}
      label=" "
      style={{
        margin: 0,
        padding: 0,
        ...props.style,
        width: "100%",
      }}
      colon={false}
    >
      {props.children?.["length"] ? (
        <Space spacing={spacing}>{props.children}</Space>
      ) : (
        props.children
      )}
    </BaseItem>
  );
};

FormButtonGroup.Sticky = ({ align = "left", ...props }) => {
  const ref = useRef(undefined);
  const [color, setColor] = useState("transparent");
  const prefixCls = usePrefixCls("button-group");

  useLayoutEffect(() => {
    if (ref.current) {
      const computed = getInheritedBackgroundColor(ref.current);
      if (computed !== color) {
        setColor(computed);
      }
    }
  });
  return (
    <StickyBox
      {...props}
      className={cls(`${prefixCls}-sticky`, props.className)}
      style={{
        backgroundColor: color,
        ...props.style,
      }}
      bottom
    >
      <div
        ref={ref}
        className={`${prefixCls}-sticky-inner`}
        style={{
          ...props.style,
          justifyContent:
            align === "left"
              ? "flex-start"
              : align === "right"
                ? "flex-end"
                : "center",
        }}
      >
        {props.children}
      </div>
    </StickyBox>
  );
};

export default FormButtonGroup;
