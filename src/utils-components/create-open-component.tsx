import { useControllableValue, useSafeState } from "ahooks";
import { message } from "antd";
import _ from "lodash";
import React, { useEffect } from "react";

import { getPermission } from "@/utils";

export interface IOpenComponentProps {
  /** 操作成功后刷新父组件 */
  onRefresh?: () => void;
  /** 组件visible */
  visible?: boolean;
  /** 关闭方法 */
  onCancel?: () => void;
}
interface IOption {
  /** 应用权限 */
  permissionCode?: string;
}
export default function createOpenComponent<T>(options?: IOption) {
  return function (Comp: React.FC<T>) {
    return React.memo(
      (props: T & IOpenComponentProps & { renderBtn?: any }) => {
        const [animationVisible, setAnimationVisible] = useSafeState(false);
        const [visible, setVisible] = useControllableValue(
          _.pick(props, ["visible", "onCancel"]),
          {
            defaultValue: false,
            valuePropName: "visible",
            trigger: "onCancel",
          }
        );
        useEffect(() => {
          if (visible) {
            /** 传入了该字段才判断权限 */
            if (options?.permissionCode) {
              if (!getPermission(options?.permissionCode)) {
                message.error("暂无查看权限");
                setVisible(false);
                return;
              }
            }
            setAnimationVisible(true);
          } else if (animationVisible) {
            /** 确保modal/drawer关闭动画 */
            // 快速关闭打开问题,300ms内不考虑
            setTimeout(() => {
              setAnimationVisible(false);
            }, 300);
          }
          // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [visible, animationVisible]);
        return (
          <>
            {props.renderBtn &&
              React.cloneElement(props.renderBtn, {
                onClick: () => {
                  setVisible(true);
                },
              })}
            {animationVisible && (
              <Comp
                visible={visible}
                onCancel={() => {
                  setVisible(false);
                }}
                {...(_.omit(props, ["visible", "onCancel", "renderBtn"]) as T)}
              />
            )}
          </>
        );
      }
    );
  };
}
