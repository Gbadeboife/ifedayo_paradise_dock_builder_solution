import React from "react";
import { fabric } from "fabric";

function Rect({ left, top, width, height, fill }) {
  const rectRef = React.useRef(null);

  React.useEffect(() => {
    const rect = new fabric.Rect({
      left,
      top,
      width,
      height,
      fill,
    });

    rectRef.current = rect;
  }, [left, top, width, height, fill]);

  return <></>;
}

export default Rect;

// const addTestRect = () => {
//   if (editor) {
//     const rect = new fabric.Rect({
//       left: 200,
//       top: 50,
//       width: 500,
//       height: 50,
//       fill: "red",
//     });

//     editorMemo.add(rect);
//     const rect2 = new fabric.Rect({
//       left: 250,
//       top: 100,
//       width: 200,
//       height: 50,
//       fill: "red",
//     });

//     editorMemo.add(rect2);
//     const rect3 = new fabric.Rect({
//       left: 300,
//       top: 150,
//       width: 200,
//       height: 50,
//       fill: "red",
//     });

//     editorMemo.add(rect3);
//     const rect4 = new fabric.Rect({
//       left: 350,
//       top: 200,
//       width: 200,
//       height: 50,
//       fill: "red",
//     });

//     editorMemo.add(rect4);
//   }
// }
