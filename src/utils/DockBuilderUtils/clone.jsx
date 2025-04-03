// import { useContext } from "react";
// import { GlobalContext } from "../../globalContext";
// import { scaleFactor, SnapType } from "../constants";
import { SnapType } from "Utils/constants";
import { reScaleXY, resolveHeight, resolveWidth } from "./edgeDetection";
// const {state: {dockTop, dockLeft}, dispatch: GlobalDispatch} = useContext(GlobalContext)
export const clone = (selectedObj, editorMemo, detectedObj, dir) => {
  const snapCloneFound = editorMemo.getObjects("image").find((o) => {
    // console.log( o )

    if (o.snapClone) {
      return o;
    }
  });
  // console.log( snapCloneFound )
  if (snapCloneFound) {
    return handlePosition(
      dir,
      detectedObj,
      selectedObj,
      snapCloneFound,
      SnapType.SnapClone,
      editorMemo
    );
  }

  // console.log( "snapCloneFound skip" )
  selectedObj.clone(function (cloned) {
    cloned.set({
      snapClone: true,
      opacity: 0.02
    });

    editorMemo.add(cloned).sendBackwards(cloned);

    editorMemo.getObjects("image").forEach((o) => {
      if (o.snapClone) {
        return handlePosition(
          dir,
          detectedObj,
          selectedObj,
          o,
          SnapType.SnapClone,
          editorMemo
        );
      }
    });
  });
};
export const clearClone = (editorMemo) => {
  // return
  // setTimeout( () => {
  editorMemo.getObjects("image").forEach((o) => {
    if (o.snapClone) {
      editorMemo.remove(o);
    }
  });
  // }, 100 )
};

export const handlePosition = (
  dir,
  detectedObj,
  selectedObj,
  o,
  objType,
  editorMemo
) => {
  // console.log( editorMemo )
  switch (dir) {
    case "left":
      o.left = detectedObj.left - reScaleXY(o, "width");
      if (objType === SnapType.Snap) {
        // console.log( o )
      }
      if (objType === SnapType.SnapClone) {
        o.set({
          top: selectedObj.top
        });
      }
      editorMemo.renderAll();
      break;
    case "right":
      o.left = detectedObj.left + reScaleXY(detectedObj, "width");
      if (objType === SnapType.Snap) {
        // console.log( o )
      }
      if (objType === SnapType.SnapClone) {
        o.set({
          top: selectedObj.top
        });
        // o.top = selectedObj.top
      }
      editorMemo.renderAll();
      break;

    case "bottom":
      o.top = detectedObj.top + reScaleXY(detectedObj, "height");
      if (objType === SnapType.Snap) {
        // console.log( o )
      }
      if (objType === SnapType.SnapClone) {
        o.set({
          left: selectedObj.left
        });
      }
      editorMemo.renderAll();
      break;

    case "top":
      o.top = detectedObj.top - reScaleXY(o, "height");
      if (objType === SnapType.Snap) {
        // console.log( o )
      }
      if (objType === SnapType.SnapClone) {
        o.set({
          left: selectedObj.left
        });
      }
      editorMemo.renderAll();
      break;
  }
};

// export const resolveTop = (o, detectedObj, objType) => {
//   switch (objType) {
//     case SnapType.SnapClone:

//   }
// }
