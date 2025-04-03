import { edgeSnapThreshold } from "../constants";
export const edgeDetection = (selectedObj, detectedObj, dir) => {
  /** Function to determine the position of the selected dock */
  const isImageNotSnapClone =
    !detectedObj.snapClone && ["image", "rect"].includes(detectedObj.type);
  let isWithinSnapThreshold;
  let isWithinTopRange;
  let isWithinLeftRange;

  switch (dir) {
    case "left":
      isWithinSnapThreshold =
        Math.abs(
          resolveWidth(selectedObj) - detectedObj.getBoundingRect().left
        ) < edgeSnapThreshold;
      isWithinTopRange = compareTop(selectedObj, detectedObj);
      return isWithinSnapThreshold && isWithinTopRange && isImageNotSnapClone;

    case "right":
      isWithinSnapThreshold =
        Math.abs(
          resolveWidth(detectedObj) - selectedObj.getBoundingRect().left
        ) < edgeSnapThreshold;
      isWithinTopRange = compareTop(selectedObj, detectedObj);
      return isWithinSnapThreshold && isWithinTopRange && isImageNotSnapClone;

    case "bottom":
      isWithinSnapThreshold =
        Math.abs(
          Math.abs(selectedObj.getBoundingRect().top) -
            resolveHeight(detectedObj)
        ) < edgeSnapThreshold;
      isWithinLeftRange = compareLeft(selectedObj, detectedObj, "bottom");
      return isWithinSnapThreshold && isWithinLeftRange && isImageNotSnapClone;

    case "top":
      isWithinSnapThreshold =
        Math.abs(
          Math.abs(detectedObj.getBoundingRect().top) -
            resolveHeight(selectedObj)
        ) < edgeSnapThreshold;
      isWithinLeftRange = compareLeft(selectedObj, detectedObj, "top");
      return isWithinSnapThreshold && isWithinLeftRange && isImageNotSnapClone;

    case "neutral":
      return (
        !edgeDetection(selectedObj, detectedObj, "left") &&
        !edgeDetection(selectedObj, detectedObj, "right") &&
        !edgeDetection(selectedObj, detectedObj, "top") &&
        !edgeDetection(selectedObj, detectedObj, "bottom")
      );
  }
};

export const handleIntersection = (selectedObj, detectedObj) => {
  handleEdgeDetection(selectedObj, detectedObj);
};

export const handleEdgeDetection = (selectedObj, detectedObj) => {
  if (edgeDetection(selectedObj, detectedObj, "left")) {
    selectedObj.set({
      left: detectedObj.left - selectedObj.width,
    });
  }

  if (edgeDetection(selectedObj, detectedObj, "right")) {
    selectedObj.set({
      left: detectedObj.left + detectedObj.width,
    });
  }

  if (edgeDetection(selectedObj, detectedObj, "top")) {
    selectedObj.set({
      top: detectedObj.top - selectedObj.height,
    });
  }

  if (edgeDetection(selectedObj, detectedObj, "bottom")) {
    selectedObj.set({
      top: detectedObj.top + detectedObj.height,
    });
  }
};

export const resolveWidth = (obj) => {
  /** This Function add left position and width of dock to find the horizontal end of the dock  */
  return Math.abs(obj.getBoundingRect().left + obj.getBoundingRect().width);
};
export const resolveHeight = (obj) => {
  /** This Function add top position and height of dock to find the vertical end of the dock  */
  return Math.abs(obj.getBoundingRect().top + obj.getBoundingRect().height);
};
export const reScaleXY = (obj, XY) => {
  /** THis basically was to rescale the width or height of the dock but We are barely using this as the implementation has changed, we are not even rescaling in this function right now */
  switch (XY) {
    case "width":
      return obj.getBoundingRect().width;
    case "height":
      return obj.getBoundingRect().height;
  }
};

export const compareTop = (selectedObj, detectedObj) => {
  const detectedObjBound = detectedObj.getBoundingRect();
  const selectedObjBound = selectedObj.getBoundingRect();

  return (
    Math.abs(selectedObjBound.top - detectedObjBound.top) < edgeSnapThreshold ||
    (selectedObjBound.top > detectedObjBound.top &&
      selectedObjBound.top < resolveHeight(detectedObj)) ||
    (selectedObjBound.top < detectedObjBound.top &&
      resolveHeight(selectedObj) > detectedObjBound.top)
  );
};
export const compareLeft = (selectedObj, detectedObj, dir) => {
  const detectedObjBound = detectedObj.getBoundingRect();
  const selectedObjBound = selectedObj.getBoundingRect();

  switch (dir) {
    case "top":
      return (
        Math.abs(selectedObjBound.left - detectedObjBound.left) <
          edgeSnapThreshold ||
        (selectedObjBound.left > detectedObjBound.left &&
          selectedObjBound.left <= resolveWidth(detectedObj) &&
          detectedObjBound.top > resolveHeight(selectedObj)) ||
        (selectedObjBound.left < detectedObjBound.left &&
          resolveWidth(selectedObj) > detectedObjBound.left)
      );
    case "bottom":
      return (
        Math.abs(selectedObjBound.left - detectedObjBound.left) <
          edgeSnapThreshold ||
        (selectedObjBound.left > detectedObjBound.left &&
          selectedObjBound.left <= resolveWidth(detectedObj) &&
          selectedObj.top > resolveHeight(detectedObj) &&
          selectedObjBound.top - resolveHeight(detectedObj) <
            edgeSnapThreshold) ||
        (selectedObjBound.left < detectedObjBound.left &&
          resolveWidth(selectedObj) > detectedObjBound.left)
      );
  }
};

export const boatLiftLeft = (boatLiftObj, detectedObj) => {
  const boatLiftWidth = reScaleXY(boatLiftObj, "width");
  const detectedObjWidth = reScaleXY(detectedObj, "width");
  if (boatLiftWidth > detectedObjWidth) {
    const leftToSet = (boatLiftWidth - detectedObjWidth) / 2;
    return detectedObj.left - leftToSet;
  } else if (detectedObjWidth > boatLiftWidth) {
    const leftToSet = (detectedObjWidth - boatLiftWidth) / 2;
    return detectedObj.left + leftToSet;
  } else {
    return detectedObj.left;
  }
};
export const boatLiftTop = (boatLiftObj, detectedObj) => {
  const boatLiftHeight = reScaleXY(boatLiftObj, "height");
  const detectedObjHeight = reScaleXY(detectedObj, "height");
  if (boatLiftHeight > detectedObjHeight) {
    const topToSet = (boatLiftHeight - detectedObjHeight) / 2;
    return detectedObj.top - topToSet;
  } else if (detectedObjHeight > boatLiftHeight) {
    const topToSet = (detectedObjHeight - boatLiftHeight) / 2;
    return detectedObj.top + topToSet;
  } else {
    return detectedObj.top;
  }
};
