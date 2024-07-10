import React from "react";
import _ from "lodash";
const fieldNames = { label: "label", value: "value" };
export default function Cascader({ value, onChannge }: any) {
  const checkedValue = _.map(value, (item) => {
    return item[fieldNames.value];
  });
  const onChange = (val, valOption) => {
    if (value.find((item) => item[fieldNames.value] === val)) {
      // filter
    } else {
      value.push(valOption);
      //[...value,valOption]
    }
  };
  const mapOptions = (list: any[]) => {
    const options = new Map();

    function dig(data: any[]) {
      data.map((item) => {
        options.set(item[fieldNames.value], item);
        if (item.children) {
          dig(item.children);
        }
      });
    }
    dig(list);
    return options
  };
  return <div>Cascader</div>;
}
