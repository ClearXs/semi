import { Slider as SemiSlider } from "@douyinfe/semi-ui";
import { connect, mapProps } from "@formily/react";

export const Slider = connect(
  SemiSlider,
  mapProps({
    value: "value",
    onInput: "onChange",
  })
);

export default Slider;
