import { Rating } from "@douyinfe/semi-ui";
import { connect, mapProps } from "@formily/react";

export const Rate = connect(
  Rating,
  mapProps({
    value: "value",
    onInput: "onChange",
  })
);

export default Rate;
