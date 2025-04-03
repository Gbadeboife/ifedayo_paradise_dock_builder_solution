import React, {
  useEffect,
  useMemo,
  useCallback,
  useRef,
  useState,
  useContext
} from "react";
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import { fabric } from "fabric";
import { DockSidebar } from "Components/DockSidebar";
import { ActionButtons } from "Components/ActionButtons";
import MkdSDK from "Utils/MkdSDK";
import { Stack } from "Utils/utils";
import { EstimateModal } from "Components/EstimateModal";
import * as XLSX from "xlsx";
import { BuildCanvasFromLocalModal } from "Components/BuildCanvasFromLocalModal";
import { GlobalContext } from "../../globalContext";
import { clearClone, clone } from "Utils/DockBuilderUtils/clone";
import {
  edgeDetection,
  handleEdgeDetection,
  handleIntersection
} from "Utils/DockBuilderUtils";
import {
  CanvasModes,
  deleteIcon,
  DockPanelCategories,
  edgeSnapThreshold,
  nintyDeg,
  oneEightyDeg,
  oneFeet,
  rotateIcon,
  scaleFactor,
  twoSeventyDeg
} from "Utils/constants";
import {
  reScaleXY,
  resolveHeight,
  resolveWidth
} from "Utils/DockBuilderUtils/edgeDetection";
import { DeleteIcon, RotateIcon } from "Assets/svgs";
import { capitalize } from "Utils/helper";

const sdk = new MkdSDK();
const stack = new Stack();

export const DockBuilder = () => {
  let clipboard = null;
  let mouseDownPoint = null;
  let shiftKeyDown = false;
  window.counter = 0;
  let prevPointer = null;
  let isDragging = false;
  let isZoomed = false;
  let startX, startY;

  const { dispatch } = useContext(GlobalContext);
  const { editor, onReady } = useFabricJSEditor({ selection: true });

  const canvasModeRef = useRef(null);
  const fileRef = useRef();
  const imageRef = useRef();

  const editorMemo = useMemo(() => editor?.canvas, [editor?.canvas]);
  // const { dispatch } = React.useContext( AuthContext );
  const [objHovered, setObjHovered] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [estimateLoading, setEstimateLoading] = useState(false);
  const [showEstimateModal, setShowEstimateModal] = useState(false);
  const [showBuildCanvasFromLocalModal, setShowBuildCanvasFromLocalModal] =
    useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const [linesAdded, setLinesAdded] = useState(false);
  const [dockImage, setDockImage] = useState(null);
  const [editorReady, setEditorReady] = useState(false);
  const [dockLabel, setDockLabel] = useState(null);
  const [dockDimensions, setDockDimensions] = useState(null);

  const deleteImg = document.createElement("img");
  deleteImg.src = deleteIcon;
  const rotateImg = document.createElement("img");
  rotateImg.src = rotateIcon;

  const onEstimateModalClose = useCallback(() => {
    setShowEstimateModal(false);
  }, [showEstimateModal]);

  const onEstimateModalOpen = useCallback(() => {
    const ext = "png";
    const base64 = editorMemo.toDataURL({
      format: ext,
      enableRetinaScaling: true
    });
    setDockImage(base64);
    setShowEstimateModal(true);
  }, [showEstimateModal, editorMemo, dockImage]);

  // const onAddRect = useCallback( () => {
  //   editor?.canvas?.add( rect );
  //   window.counter++;
  //   // newleft += 200;
  // }, [ editor ] );

  const toJSON = () => {
    // TODO: download the json file
    // TODO: get json of editor content
    // TODO: Ensure dockData is included in the json
    // TODO: save the json to the local storage as dock
    // TODO: name the file as paradise_dock_<timestamp here>.dock
  };

  const uploadFile = (e) => {
    // TODO: Our own upload the file we must have downloaded previously
    // TODO: extract the json from the file
    // TODO: load the json to the editor
    // TODO: render all
  };

  const downloadImage = useCallback(() => {
    // // console.log( 'Download' )
    const ext = "png";

    // TODO: download the image
    // TODO: get the json of the editor content
    // TODO: extract the dockData from the json
    // TODO: filter the dockData to ensure it does not contain snapClone
    // TODO: generate the base64 image
    // TODO: download the image and name it as paradise_dock_snapshot_<timestamp here>.${ext}
    // TODO: download the excel file of the dockData you extracted

    // TODO: check if dockData is empty
    // TODO: generate the base64 image

    // TODO: trigger download of the dockData you extracted in excel format
  }, [editorMemo]);

  const renderBg = useCallback(() => {
    const imageURL =
      "https://s3.us-east-2.amazonaws.com/com.nds.images/download.png";

    new fabric.Image.fromURL(
      imageURL,
      function (img) {
        img.set({
          scaleX: editorMemo.width / img.width,
          scaleY: editorMemo.height / img.height
        });
        editorMemo.setBackgroundImage(img);
        editorMemo.renderAll();
        // updateModifications( true, )
      },
      {
        crossOrigin: "anonymous"
      }
    );
  }, [editorMemo]);

  const downloadExcel = useCallback((data) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Selected Items");
    XLSX.writeFile(workbook, "Paradise_dock_selected_items.xlsx");
  }, []);

  function updateZoom(opt) {
    let delta = opt.e.deltaY;
    let pointer = editorMemo.getPointer(opt.e);
    let zoom = editorMemo.getZoom();

    if (delta > 0) {
      zoom *= 1.1;
    } else {
      zoom /= 1.1;
    }
    if (zoom > 5) zoom = 5;
    if (zoom < 1) zoom = 1;
    // console.log( zoom )
    // editorMemo.setBackgroundImageStretch=false
    var vpt = editorMemo.viewportTransform;
    if (zoom === 1) {
      vpt[4] = 0;
      vpt[5] = 0;
      editorMemo.selection = true;
      this.isZoomed = false;
    }
    if (zoom > 1) {
      this.isZoomed = true;
    }

    fabric.util.animate({
      startValue: editorMemo.getZoom(),
      endValue: zoom,
      // duration: 0,
      onChange: function (value) {
        editorMemo.zoomToPoint({ x: pointer.x, y: pointer.y }, value);
      },
      fps: 1080
    });
    opt.e.preventDefault();
    opt.e.stopPropagation();
  }

  function handleZoomMouseDown(options) {
    var pointer = editorMemo.getPointer(options.e, true);
    mouseDownPoint = new fabric.Point(pointer.x, pointer.y);
    if (options.target === null && this.isZoomed) {
      editorMemo.upperCanvasEl.style.cursor = "grabbing";
      editorMemo.selection = false;
      // this.lastPosX = options.e.movementX;
      // this.lastPosY = options.e.movementY;
      this.lastPosX = options.e.clientX;
      this.lastPosY = options.e.clientY;

      //
    }
    // else if ( options.target !== null && this.isZoomed ) {
    //   var activeObject = editorMemo.getActiveObject();
    //   if ( activeObject ) {
    //     activeObject.lockMovementX = true;
    //     activeObject.lockMovementY = true;
    //     activeObject.lockScalingX = true;
    //     activeObject.lockScalingY = true;
    //   }
    // }
  }

  const handleZoomMouseUp = useCallback(() => {
    editorMemo.defaultCursor = "default";
    mouseDownPoint = null;
    editorMemo.selection = true;
  }, [editor]);

  function handleZoomMouseMove(options) {
    if (options.target === null && mouseDownPoint && this.isZoomed) {
      editorMemo.selection = false;
      editorMemo.upperCanvasEl.style.cursor = "grabbing";

      var delta = new fabric.Point(options.e.movementX, options.e.movementY);
      editorMemo.relativePan(delta);
      editorMemo.viewportTransform[4] = Math.max(
        Math.min(editorMemo.viewportTransform[4], 0),
        editorMemo.getWidth() - editorMemo.getWidth() * editorMemo.getZoom()
      );
      editorMemo.viewportTransform[5] = Math.max(
        Math.min(editorMemo.viewportTransform[5], 0),
        editorMemo.getHeight() - editorMemo.getHeight() * editorMemo.getZoom()
      );

      // var vpt = this.viewportTransform;
      // vpt[ 4 ] += options.e.clientX - this.lastPosX;
      // vpt[ 5 ] += options.e.clientY - this.lastPosY;
      requestAnimationFrame(function () {
        editorMemo.renderAll();
        this.requestRenderAll();
      });
      // this.lastPosX = options.e.movementX;
      // this.lastPosY = options.e.movementY;
      // this.lastPosX = options.e.clientX;
      // this.lastPosY = options.e.clientY;
    }
  }

  const addEdgeDetectionClone = useCallback(
    (options) => {
      objectMoving = true;
      if (options) {
        const selectedObj = options.target.setCoords();
        editorMemo.defaultCursor = "grabbing";
        if (
          selectedObj.dockData &&
          selectedObj.dockData.itemName === DockPanelCategories.Accessories
        ) {
          return;
        }

        editorMemo.forEachObject((obj) => {
          const pointer = { x: options.e.clientX, y: options.e.clientY };

          if (obj === selectedObj) return;
          // canvas.setCursor('grabbing');
          // // console.log(pointer.x, pointer.y);
          if (!obj.snapClone && obj.type === "image") {
            // // console.log( pointer, prevPointer )
            if (
              prevPointer &&
              (prevPointer.x !== pointer.x || prevPointer.y !== pointer.y)
            ) {
              switch (true) {
                case edgeDetection(selectedObj, obj, "left"):
                  clone(selectedObj, editorMemo, obj, "left");
                  break;
                case edgeDetection(selectedObj, obj, "right"):
                  clone(selectedObj, editorMemo, obj, "right");
                  break;
                case edgeDetection(selectedObj, obj, "top"):
                  clone(selectedObj, editorMemo, obj, "top");
                  break;
                case edgeDetection(selectedObj, obj, "bottom"):
                  clone(selectedObj, editorMemo, obj, "bottom");
                  break;
                case edgeDetection(selectedObj, obj, "neutral"):
                  clearClone(editorMemo);
                  break;
                default:
                // console.log( "edge detection switch default" )
              }
              // prevPointer = null;
            }
            prevPointer = pointer;
            // // console.log( pointer, prevPointer )
          }
          // if ( edgeDetection( selectedObj, obj, "left" ) ) {
          //   clone( selectedObj, editorMemo, obj, "left" )
          // } else {
          //   // clearClone( editorMemo )
          // }

          // if ( edgeDetection( selectedObj, obj, 'right' ) ) {
          //   clone( selectedObj, editorMemo, obj, "right" )

          // } else {
          //   // clearClone( editorMemo )
          // }

          // if ( edgeDetection( selectedObj, obj, 'top' ) ) {
          //   clone( selectedObj, editorMemo, obj, "top" )

          // } else {
          //   // clearClone( editorMemo )
          // }

          // if ( edgeDetection( selectedObj, obj, 'bottom' ) ) {
          //   clone( selectedObj, editorMemo, obj, "bottom" )
          // } else {
          //   // clearClone( editorMemo )
          // }
        });
      }
    },
    [editor, editorMemo]
  );

  const horizontalIndicatorLines = (newTop, objTop) => {
    editorMemo.getObjects("line").forEach((obj) => {
      if (obj.testLine) {
        editorMemo.remove(obj);
      }
    });

    let line = new fabric.Line([0, newTop, editorMemo.getWidth(), newTop], {
      stroke: "#AAAAAA",
      testLine: true
      // strokeDashArray: [ 5 ],
    });
    let line2 = new fabric.Line([0, objTop, editorMemo.getWidth(), objTop], {
      stroke: "#AAAAAA",
      testLine: true
      // strokeDashArray: [ 5 ],
    });
    editorMemo.add(line);
    editorMemo.add(line2);
    editorMemo.renderAll();
  };
  const verticleIndicatorLines = (newLeft, objLeft) => {
    editorMemo.getObjects("line").forEach((obj) => {
      if (obj.testLine) {
        editorMemo.remove(obj);
      }
    });

    let line = new fabric.Line([newLeft, 0, newLeft, editorMemo.getHeight()], {
      stroke: "#AAAAAA",
      testLine: true
      // strokeDashArray: [ 5 ],
    });
    let line2 = new fabric.Line([objLeft, 0, objLeft, editorMemo.getWidth()], {
      stroke: "#AAAAAA",
      testLine: true
      // strokeDashArray: [ 5 ],
    });
    editorMemo.add(line);
    editorMemo.add(line2);
    editorMemo.renderAll();
  };

  function edgeDetectionAndSnap(options) {
    if (this.isZoomed) {
      return;
    }

    // TODO: Edge detection and snap to object within snap range
    // TODO: Detect if the object is within the snap range of the selected object
    // TODO: detect if the selected object contains dockData and dockData contains itemName of DockPanelCategories.Accessories || DockPanelCategories.BoatLift2 || DockPanelCategories.BoatLift4
    // TODO: handle rotation of 0, 90, 180, 270 degrees

    editorMemo.defaultCursor = "default";
    prevPointer = null;
    clearClone(editorMemo);
  }

  const showHighlight = useCallback(
    (event) => {
      if (event.target) {
        if (event.target.type === "image") {
          setObjHovered(true);
          // console.log(event.target.dockData)
          if (
            event.target &&
            event.target.dockData &&
            event.target.dockData.image
          ) {
            imageRef.current.src = event.target.dockData.image;
            setDockLabel(
              `${
                event.target.dockData.materials
                  ? capitalize(event.target.dockData.itemName)
                  : event.target.dockData.itemName
              } (${
                event.target.dockData.materials
                  ? event.target.dockData.materials
                  : event.target.dockData.model
              })`
            );
            setDockDimensions(
              `${event.target.dockData.width}' x ${event.target.dockData.length}'`
            );
          } else if (
            event.target &&
            event.target.dockData &&
            event.target.dockData.thumbnail
          ) {
            setDockLabel(
              `${capitalize(event.target.dockData.itemName)} (${
                event.target.dockData.name
              })`
            );
            setDockDimensions(
              `${event.target.dockData.width}' x ${event.target.dockData.length}'`
            );
            imageRef.current.src = event.target.dockData.thumbnail;
          }
        }
      }
      if (!event.target && objHovered) {
        setObjHovered(false);
        setDockLabel(null);
        setDockDimensions(null);
        setDockDimensions(null);
        imageRef.current.src = "";
      }
    },
    [objHovered]
  );

  const hideHighlight = useCallback(() => {
    if (objHovered) {
      setObjHovered(false);
      setDockLabel(null);
      setDockDimensions(null);
      imageRef.current.src = "";
    }
  }, [objHovered]);

  const updateModifications = useCallback(
    (savehistory, event) => {
      if (savehistory === true) {
        if ((event && event === "update") || event.target.dockData) {
          const json = editor?.canvas?.toJSON(["dockData", "snapClone"]);
          const data = JSON.stringify(json);
          stack.updateStack(data);

          updateLocalstore();
        }
      }
    },
    [selectedItems, editor]
  );

  const updateLocalstore = useCallback(() => {
    const json = editor?.canvas?.toJSON(["dockData", "snapClone"]);
    const newObjects = json.objects
      .filter((object) => !object.snapClone)
      .filter(Boolean);
    json.objects = newObjects;
    const items = json.objects
      .map((object) => {
        if (object.dockData && !object.snapClone) {
          return object.dockData;
        }
      })
      .filter(Boolean);
    setSelectedItems(() => [...items]);

    const data = JSON.stringify(json);
    localStorage.setItem("dock", data);
  }, [editor, selectedItems]);

  const onUndoClick = useCallback(() => {
    // TODO: Undo
  }, [editorMemo]);

  const onRedoClick = useCallback(() => {
    // TODO: Redo
  }, [editorMemo]);

  const onPrintScreen = useCallback(() => {
    //  convert the canvas to a data url and download it.
    // TODO: Print screen
    // TODO: print screen without background image and background color, the background image should be white
    // TODO: after printing, the background image and background color should be restored
  }, [editorMemo]);

  const CopySelection = () => {
    // TODO: Copy selection
  };

  const PasteSelection = () => {
    // TODO: Paste selection
  };

  const onDeleteSelection = () => {
    // TODO: Delete selection
  };

  const addLines = useCallback(() => {
    // Initiate a line instance
    const editorHeight = editorMemo.getHeight();
    const division = editorHeight / oneFeet;

    if (!linesAdded) {
      let initialFt = 8;
      let multiplier = 1;
      for (let i = division - 3; i > 0; i--) {
        if (multiplier > division - 4) {
          break;
        }
        let line = new fabric.Line(
          [0, oneFeet * i, editorMemo.getWidth(), oneFeet * i],
          {
            stroke: "#AAAAAA",
            strokeDashArray: [5]
          }
        );

        let text = new fabric.Text(`${initialFt * multiplier}ft`, {
          // stroke: '#000000',
          fill: "#AAAAAA",
          fontSize: 18,
          left: editorMemo.getWidth() - 40,
          top: oneFeet * i
        });

        multiplier++;
        // Render the rectangle in canvas
        editorMemo.add(line).sendToBack(line);
        editorMemo.add(text).sendToBack(text);
        editorMemo.renderAll();
      }
      setLinesAdded(true);
    }
  }, [editorMemo, linesAdded]);

  const removeLines = useCallback(() => {
    editorMemo.getObjects("line").forEach((line) => {
      editorMemo.remove(line);
    });
    editorMemo.getObjects("text").forEach((text) => {
      editorMemo.remove(text);
    });
    setLinesAdded(false);
  }, [editorMemo, linesAdded]);

  const onCloseBuildFromLocalModal = useCallback(() => {
    setShowBuildCanvasFromLocalModal(false);

    dispatch({
      type: "DOCK_LOADING",
      payload: false
    });
    setInitialLoad(false);
  }, [editorMemo, showBuildCanvasFromLocalModal, dispatch, initialLoad]);
  function renderIcon(icon) {
    return function renderIcon(ctx, left, top, styleOverride, fabricObject) {
      var size = this.cornerSize;
      ctx.save();
      ctx.translate(left, top);
      ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
      ctx.drawImage(icon, -size / 2, -size / 2, size, size);
      ctx.restore();
    };
  }
  function deleteObject(eventData, transform) {
    var target = transform.target;
    var canvas = target.canvas;
    canvas.remove(target);
    canvas.requestRenderAll();
  }

  useEffect(() => {
    if (editor) {
      editorMemo.backgroundColor = "#011e23";
      editorMemo.enableRetinaScaling = false;

      // Use hardware acceleration
      // editorMemo.renderOnAddRemove = false;
      editorMemo.skipOffscreen = true;
      // Lower render quality setting
      fabric.devicePixelRatio = 1;
      fabric.Group.prototype.hasControls = true;
      fabric.Group.prototype.snapAngle = 45;
      fabric.Group.prototype.snapThreshold = 5;
      fabric.Group.prototype.stroke = "#0f75bc";
      fabric.Object.prototype.snapAngle = 45;
      // Optimize object rendering
      fabric.Object.prototype.objectCaching = true;

      fabric.Object.prototype.snapThreshold = 5;
      fabric.Object.prototype.setControlsVisibility({
        tl: false, //top-left
        mt: false, // middle-top
        tr: true, //top-right
        ml: false, //middle-left
        mr: false, //middle-right
        bl: false, // bottom-left
        mb: false, //middle-bottom
        br: false, //bottom-right
        mtr: false // rotate icon
      });
      // fabric.Object.prototype.controls.deleteControl = new fabric.Control( {
      //   x: -0.8,
      //   y: -1,
      //   offsetY: 16,
      //   offsetX: 16,
      //   cursorStyle: 'pointer',
      //   mouseUpHandler: deleteObject,
      //   render: renderIcon( deleteImg ),
      //   cornerPadding: 0,
      //   cornerSize: 24
      // } );
      fabric.Object.prototype.controls.tr = new fabric.Control({
        x: 0.5,
        y: -0.5,
        cursorStyle: "rotate",
        offsetY: -16,
        offsetX: 16,
        cornerPadding: 0,
        actionHandler: fabric.controlsUtils.rotationWithSnapping,
        cursorStyleHandler: fabric.controlsUtils.rotationStyleHandler,
        withConnection: true,
        render: renderIcon(rotateImg),
        cornerSize: 20,
        actionName: "rotate",
        sizeX: 40,
        sizeY: 40,
        touchSizeX: 40,
        touchSizeY: 40
      });
      fabric.Object.prototype.hasControls = true;
      fabric.Object.prototype.lockScalingX = true;
      fabric.Object.prototype.lockScalingY = true;
      fabric.Object.prototype.cornerSize = 5;
      fabric.Line.prototype.hasBorders = false;
      fabric.Line.prototype.cornerSize = 0;
      fabric.Line.prototype.borderColor = "transparent";
      fabric.Line.prototype.hasRotatingPoint = false;
      fabric.Line.prototype.hasControls = false;
      fabric.Line.prototype.lockRotation = true;
      fabric.Line.prototype.hoverCursor = "default";
      fabric.Line.prototype.selectable = false;
      fabric.Line.prototype.lockMovementX = true;
      fabric.Line.prototype.lockMovementY = true;
      fabric.Text.prototype.hasBorders = false;
      fabric.Text.prototype.cornerSize = 0;
      fabric.Text.prototype.borderColor = "transparent";
      fabric.Text.prototype.hasRotatingPoint = false;
      fabric.Text.prototype.hoverCursor = "default";
      fabric.Text.prototype.selectable = false;
      fabric.Text.prototype.hasControls = false;
      fabric.Text.prototype.lockRotation = true;
      fabric.Text.prototype.lockMovementX = true;
      fabric.Text.prototype.lockMovementY = true;

      // fabric.Text.prototype.viewportCenter = true
      setEditorReady(true);
      editorMemo.setHeight(window.innerHeight);
      editorMemo.setWidth(window.innerWidth);
      fabric.Object.prototype.cornerColor = "#B9C0D4";

      renderBg();
      addLines();

      // Intersection
      // TODO: Edge detection and snap to object within snap range
      editorMemo.on("object:moving", edgeDetectionAndSnap);

      editorMemo.on("mouse:over", showHighlight);
      editorMemo.on("mouse:out", hideHighlight);
      editorMemo.on("object:modified", (e) => updateModifications(true, e));
      editorMemo.on("object:added", (e) => updateModifications(true, e));

      // Listen for the delete key event
      document.onkeydown = (event) => {
        if (event.keyCode === 46) {
          // 46 is the keyCode for the delete key
          onDeleteSelection();
        }
      };

      const savedDock = localStorage.getItem("dock")
        ? JSON.parse(localStorage.getItem("dock"))
        : null;
      if (savedDock) {
        if (initialLoad) {
          setShowBuildCanvasFromLocalModal(true);
        }
      } else if (initialLoad) {
        setInitialLoad(false);
        dispatch({
          type: "DOCK_LOADING",
          payload: false
        });
      }
    }
  }, [editor]);

  useEffect(() => {
    if (editor) {
      const handleResize = () => {
        // let canvas = canvasRef.current;
        editorMemo.setWidth(window.innerWidth);
        editorMemo.setHeight(window.innerHeight);
        editorMemo.setBackgroundImage(editorMemo.backgroundImage, (bgImage) => {
          bgImage.set({
            scaleX: editorMemo.width / bgImage.width,
            scaleY: editorMemo.height / bgImage.height
          });
        });
        removeLines();
        addLines();
        editorMemo.renderAll();
      };
      window.addEventListener("resize", handleResize);
      handleResize();
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  return (
    <div className={`relative`}>
      <>
        <DockSidebar
          onDownloadImage={downloadImage}
          onDownloadFile={toJSON}
          onUploadFile={uploadFile}
          fileRef={fileRef}
          editor={editorMemo}
          updateModifications={updateModifications}
          selectedItems={selectedItems}
          onEstimateModalOpen={onEstimateModalOpen}
        />

        <FabricJSCanvas className={`floor-canvas`} onReady={onReady} />

        <ActionButtons
          className={`absolute w-fit top-4 right-8`}
          onCopy={CopySelection}
          onPaste={PasteSelection}
          onRedoClick={onRedoClick}
          onUndoClick={onUndoClick}
          onPrintScreen={onPrintScreen}
          onDeleteSelection={onDeleteSelection}
        />

        <div
          className={`rounded w-[10.875rem] absolute top-0 inset-x-0 m-auto ${
            objHovered ? "" : "hidden"
          }`}
        >
          {dockLabel ? (
            <div
              className={`w-full shadow text-white text-center font-medium text-[1.125rem] leading-[1.6875rem] tracking-[2%] font-['Rajdhani']`}
            >
              {dockLabel}
            </div>
          ) : null}

          <img
            ref={imageRef}
            src=""
            alt=""
            width={174}
            height={116}
            className={`rounded relative ${objHovered ? "" : "hidden"}`}
          />

          {dockDimensions ? (
            <div
              className={`w-full shadow text-white text-center font-medium text-[1.125rem] leading-[1.6875rem] tracking-[2%] font-['Rajdhani']`}
            >
              {dockDimensions}
            </div>
          ) : null}
        </div>
      </>

      <EstimateModal
        loading={estimateLoading}
        modalCloseClick={onEstimateModalClose}
        showEstimateModal={showEstimateModal}
        dockImage={dockImage}
        selectedItems={selectedItems}
      />
      <BuildCanvasFromLocalModal
        modalCloseClick={onCloseBuildFromLocalModal}
        showBuildCanvasFromLocalModal={showBuildCanvasFromLocalModal}
        editor={editorMemo}
      />
    </div>
  );
};
