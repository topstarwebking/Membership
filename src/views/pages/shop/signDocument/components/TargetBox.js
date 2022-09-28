import { useDrop } from "react-dnd";
import React from "react";

const TargetBox = (props) => {
  const {
    children,
    type = 1,
    onDropItem = () => { },
    setSignBtns,
    boxes,
  } = props;

  const [collectedProps, dropRef] = useDrop({
    accept: type,
    drop: (item, monitor) => {
      let bounds = document
        .querySelector("#canvas_pdf")
        .getBoundingClientRect();
      item = { ...item, ...monitor.getClientOffset() };
      item.x = item.x - (bounds.left + 15);
      item.y = item.y - (bounds.top + 12);
      // item.x = item.x - (bounds.left + 35)
      // item.y = item.y - (bounds.top + 12)
      if (item.y < 0 || item.x < 0) {
        return;
      }

      if (!item.upt) {
        onDropItem(item);
      } else {
        let copyItems = { ...boxes };
        for (let key of Object.keys(copyItems)) {
          for (let [pages, values] of Object.entries(boxes[key])) {
            let index = 0;
            for (let value of values) {
              if (value.id === item.id) {
                copyItems[key][pages][index] = item;
              }
              index++;
            }
          }
        }
        setSignBtns({ ...copyItems });
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        // flex: 1
      }}
      ref={dropRef}
    >
      {children}
    </div>
  );
};

export default TargetBox;
