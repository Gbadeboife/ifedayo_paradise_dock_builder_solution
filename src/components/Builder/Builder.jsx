import React, { useCallback, useEffect, useState } from "react";
// import { Tabs } from 'Components/Tabs'
// import { TabNames } from 'Utils'
import { fabric } from "fabric";
import {
  GrayMaterial,
  PerforatedMaterial,
  WoodgrainMaterial
} from "Assets/images";
import {
  DockPanelCategories,
  MaterialType,
  DockPanelCategoryMap,
  CylinderType
} from "Utils/constants";
import { Chevron } from "Assets/svgs";
import MkdSDK from "Utils/MkdSDK";
import { oneFeet, scaleFactor, Tables } from "Utils/constants";
import {
  getCategory,
  getMaterial,
  getRampsCategory,
  getWedgesAndRampsMaterial,
  getWedgesCategory
} from "Utils/utils";

const sdk = new MkdSDK();
export const Builder = ({ editor }) => {
  // let scaleFactor = 0.2;
  const [activeMaterial, setActiveMaterial] = useState(MaterialType.Gray);
  const [activeDockCategory, setActiveDockCategory] = useState(
    DockPanelCategories.RollIn
  );
  const rampsInitialState = {
    data: []
  };
  // const [ramps, setRamps] = useState(null);
  const [activeLiftRange, setActiveLiftRange] = useState(null);
  const [dock, setDock] = useState([]);
  const [docks, setDocks] = useState([]);
  const [accessories, setAccessories] = useState([]);
  const [boatlifts, setBoatlifts] = useState([]);
  const [wedgesAndRamps, setWedgesAndRamps] = useState({
    wedges: [],
    ramps: [],
    selectedRamps: [],
    selectedWedges: []
  });
  const [boatLift, setBoatLift] = useState([]);
  const [liftRanges, setLiftRanges] = useState([]);
  const [left, setLeft] = useState(300);
  // const [ rollinDock, setRollinDock ] = useState( null )
  // const [ floatingDock, setFloatingDock ] = useState( null )
  // const [ sectionalDock, setSectionalDock ] = useState( null )

  const onMaterialClick = useCallback(
    (material) => {
      setActiveMaterial(material);
    },
    [activeMaterial]
  );

  const onDockSelect = useCallback((dock) => {
    if (!editor) {
      return;
    }
    const editorHeight = editor.getHeight();
    const division = editorHeight / oneFeet - 4;

    let imageTopViewURL;
    let materials;
    let category;
    if (["wedges", "ramps"].includes(dock?.type)) {
      imageTopViewURL = (dock?.top_view).replace("%20", "+");

      materials = getWedgesAndRampsMaterial(dock?.material);
    } else {
      imageTopViewURL = dock?.top_view;
      materials = getMaterial(dock?.materials);
    }

    if (["ramps"].includes(dock?.type)) {
      category = getRampsCategory(dock?.category);
    } else if (["wedges"].includes(dock?.type)) {
      category = getWedgesCategory(dock?.category);
    } else {
      category = getCategory(dock?.category);
    }

    const dockData = {
      itemName: activeDockCategory,
      image: dock?.image,
      category: category,
      length: dock?.length,
      materials: materials,
      top_view: dock?.top_view,
      width: dock?.width,
      lift_range: dock?.lift_range,
      model: dock?.model,
      no_of_cylinders: dock?.no_of_cylinders,
      name: dock?.name,
      thumbnail: dock?.thumbnail,
      weight_capacity: dock?.weight_capacity
    };

    // TODO: Add dock to editor
    // TODO: object which is the image should have the dockData, snapAngle of 45, snapThreshold of 5
    // TODO: image should be scaled down by scaleFactor
    // TODO: image should be positioned at the top left of the editor
    // TODO: image should be added to the editor
    // TODO: render the editor
  }, []);

  const getItems = useCallback((table) => {
    // console.log( category, materials );
    (async () => {
      try {
        // sdk.setTable( table );
        const result = await sdk.getItems(table);
        // console.log( result )
        switch (table) {
          case Tables.Docks:
            return setDocks(() =>
              result?.model
                ? [...result?.model.map((item) => ({ ...item, type: "docks" }))]
                : []
            );

          case Tables.Boat_lifts:
            // return console.log( result )
            const liftRanges = result?.model
              .filter((boatLift, index, self) => {
                return (
                  index ===
                  self.findIndex(
                    (selfItem) => selfItem.lift_range === boatLift.lift_range
                  )
                );
              })
              .map((item) => item.lift_range);
            setLiftRanges(liftRanges.sort());
            setActiveLiftRange(liftRanges.sort()[0]);
            return setBoatlifts(() =>
              result?.model
                ? [
                    ...result?.model.map((item) => ({
                      ...item,
                      type: "boatlifts"
                    }))
                  ]
                : []
            );

          case Tables.Accessories:
            // return console.log( result )
            return setAccessories(() =>
              result?.model
                ? [
                    ...result?.model.map((item) => ({
                      ...item,
                      type: "accessories"
                    }))
                  ]
                : []
            );
          case Tables.Wedges:
            // return console.log( result )
            return setWedgesAndRamps((prev) => ({
              ...prev,
              wedges: result?.model
                ? [
                    ...result?.model.map((item) => ({
                      ...item,
                      type: "wedges"
                    }))
                  ]
                : []
            }));
          case Tables.Ramps:
            // return console.log( result )
            return setWedgesAndRamps((prev) => ({
              ...prev,
              ramps: result?.model
                ? [...result?.model.map((item) => ({ ...item, type: "ramps" }))]
                : []
            }));
          // return setRamps(() => [...result?.model]);
        }
      } catch (error) {
        console.log(error.message);
      }
    })();
  }, []);

  const onDockPanelClick = useCallback(
    (dockCategory) => {
      if (dockCategory !== activeDockCategory) {
        setActiveDockCategory(dockCategory);
      } else {
        setActiveDockCategory("");
      }
    },
    [activeDockCategory]
  );

  useEffect(() => {
    if (!docks.length) {
      // console.log( "I ran Docks" )
      getItems(Tables.Docks);
    }
    if (!accessories.length) {
      // console.log( "I ran Accessories" )
      getItems(Tables.Accessories);
    }
    if (!wedgesAndRamps?.wedges?.length) {
      // console.log( "I ran Wedges" )
      getItems(Tables.Wedges);
    }
    if (!wedgesAndRamps?.ramps?.length) {
      // console.log( "I ran Ramps" )
      getItems(Tables.Ramps);
    }
    if (!boatlifts.length) {
      // console.log( "I ran Boat_lifts" )
      getItems(Tables.Boat_lifts);
    }
  }, [docks, accessories, boatlifts]);

  useEffect(() => {
    if (
      [
        DockPanelCategories.RollIn,
        DockPanelCategories.Floating,
        DockPanelCategories.Sectional
      ].includes(activeDockCategory)
    ) {
      // console.log( activeDockCategory, activeMaterial )
      const category =
        activeDockCategory === DockPanelCategories.RollIn
          ? DockPanelCategoryMap.RollIn
          : activeDockCategory === DockPanelCategories.Floating
          ? DockPanelCategoryMap.Floating
          : activeDockCategory === DockPanelCategories.Sectional
          ? DockPanelCategoryMap.Sectional
          : null;

      const dockObj = docks
        .map((dock) => {
          if (dock.category === category && dock.materials === activeMaterial) {
            return dock;
          }
        })
        .filter(Boolean);
      // console.log( dockObj )
      setDock(() => [...dockObj]);
    }
    if (DockPanelCategories.Wedges === activeDockCategory) {
    }
  }, [activeMaterial, activeDockCategory, docks, wedgesAndRamps]);

  useEffect(() => {
    if (
      [DockPanelCategories.BoatLift2, DockPanelCategories.BoatLift4].includes(
        activeDockCategory
      )
    ) {
      // console.log( activeDockCategory, activeLiftRange )
      const cylinder = CylinderType[activeDockCategory];

      const boatliftsObj = boatlifts
        .map((boatlift) => {
          if (boatlift.no_of_cylinders === cylinder) {
            return boatlift;
          }
        })
        .filter(Boolean);
      // console.log( boatliftsObj )
      setBoatLift(() => [...boatliftsObj]);
    }
  }, [activeLiftRange, boatlifts, activeDockCategory]);
  // useEffect(() => {
  //   (async () => {
  //     await sdk.projectHealth();
  //   })();
  // }, []);

  return (
    <div className={`flex flex-col gap-x-[8px] border-t-2 w-full`}>
      <div className={`w-full flex h-[54px] bg-gray-200`}>
        <div
          onClick={() => onMaterialClick(MaterialType.Gray)}
          className={`grow h-full px-[12px] py-[5px] flex justify-center items-center cursor-pointer
          ${
            activeMaterial === MaterialType.Gray
              ? " bg-white border-transparent"
              : "bg-gray-200"
          }`}
        >
          <img className={`rounded-md`} src={GrayMaterial} alt="GreyMaterial" />
        </div>

        <div
          onClick={() => onMaterialClick(MaterialType.Perforated)}
          className={`grow h-full px-[12px] py-[5px] flex justify-center items-center cursor-pointer 
          ${
            activeMaterial === MaterialType.Perforated
              ? " bg-white border-transparent"
              : "bg-gray-200"
          }`}
        >
          <img
            className={`rounded-md`}
            src={PerforatedMaterial}
            alt="PerforatedMaterial"
          />
        </div>

        <div
          onClick={() => onMaterialClick(MaterialType.Woodgrain)}
          className={`grow h-full px-[12px] py-[5px] flex justify-center items-center  cursor-pointer 
          ${
            activeMaterial === MaterialType.Woodgrain
              ? " bg-white border-transparent"
              : "bg-gray-200"
          }`}
        >
          <img
            className={`rounded-md`}
            src={WoodgrainMaterial}
            alt="WoodgrainMaterial"
          />
        </div>
      </div>
      <div className={`h-fit `}>
        <div className={`text-black w-full h-fit overflow-y-auto`}>
          <div
            onClick={() => onDockPanelClick(DockPanelCategories.RollIn)}
            className={`w-full h-[67px] z-30 flex items-center pl-3 gap-x-1 font-bold text-[18px] leading-[150%] tracking-tight text-[#111322] cursor-pointer`}
          >
            <Chevron
              active={
                activeDockCategory === DockPanelCategories.RollIn ? true : false
              }
            />
            {DockPanelCategories.RollIn}
          </div>
          <div
            className={`${
              activeDockCategory === DockPanelCategories.RollIn
                ? "block"
                : "close-dock-panel hidden"
            } px-[12px]`}
          >
            {dock.length ? (
              <>
                <img src={dock[0].image} alt="" className={`rounded-md my-2`} />
                <div className={`grid grid-cols-2`}>
                  {dock?.map((dockItem, index) => (
                    <button
                      key={index}
                      onClick={() => onDockSelect(dockItem)}
                      className={`w-[100px] h-[47px] rounded py-2 mx-1 mt-1 border border-[#B9C0D4]`}
                    >
                      <div
                        className={`flex items-center justify-center gap-x-1`}
                      >
                        <span>{dockItem.width}'</span>
                        <span>x</span>
                        <span>{dockItem.length}'</span>
                      </div>
                    </button>
                  ))}
                </div>
              </>
            ) : null}
          </div>

          <div
            onClick={() => onDockPanelClick(DockPanelCategories.Floating)}
            className={`w-full h-[67px] z-30 border-b-2 border-b-[#B9C0D4] flex items-center pl-3 gap-x-1 font-bold text-[18px] leading-[150%] tracking-tight text-[#111322] cursor-pointer`}
          >
            <Chevron
              active={
                activeDockCategory === DockPanelCategories.Floating
                  ? true
                  : false
              }
            />
            {DockPanelCategories.Floating}
          </div>
          <div
            className={`${
              activeDockCategory === DockPanelCategories.Floating
                ? "block"
                : "close-dock-panel hidden"
            } px-[12px]`}
          >
            {dock.length ? (
              <>
                <img src={dock[0].image} alt="" className={`rounded-md my-2`} />
                <div className={`grid grid-cols-2`}>
                  {dock?.map((dockItem, index) => (
                    <button
                      key={index}
                      onClick={() => onDockSelect(dockItem)}
                      className={`w-[100px] h-[47px] rounded py-2 mx-1 mt-1 border border-[#B9C0D4]`}
                    >
                      <div
                        className={`flex items-center justify-center gap-x-1`}
                      >
                        <span>{dockItem.width}'</span>
                        <span>x</span>
                        <span>{dockItem.length}'</span>
                      </div>
                    </button>
                  ))}
                </div>
              </>
            ) : null}
          </div>

          <div
            onClick={() => onDockPanelClick(DockPanelCategories.Sectional)}
            className={`w-full h-[67px] z-30 border-b-2 border-b-[#B9C0D4] flex items-center pl-3 gap-x-1 font-bold text-[18px] leading-[150%] tracking-tight text-[#111322] cursor-pointer`}
          >
            <Chevron
              active={
                activeDockCategory === DockPanelCategories.Sectional
                  ? true
                  : false
              }
            />
            {DockPanelCategories.Sectional}
          </div>
          <div
            className={`${
              activeDockCategory === DockPanelCategories.Sectional
                ? "block"
                : "close-dock-panel hidden"
            } px-[12px]`}
          >
            {dock.length ? (
              <>
                <img src={dock[0].image} alt="" className={`rounded-md my-2`} />
                <div className={`grid grid-cols-2`}>
                  {dock?.map((dockItem, index) => (
                    <button
                      key={index}
                      onClick={() => onDockSelect(dockItem)}
                      className={`w-[100px] h-[47px] rounded py-2 mx-1 mt-1 border border-[#B9C0D4]`}
                    >
                      <div
                        className={`flex items-center justify-center gap-x-1`}
                      >
                        <span>{dockItem.width}'</span>
                        <span>x</span>
                        <span>{dockItem.length}'</span>
                      </div>
                    </button>
                  ))}
                </div>
              </>
            ) : null}
          </div>
          <div
            onClick={() => onDockPanelClick(DockPanelCategories.Wedges)}
            className={`w-full h-[67px] z-30 border-b-2 border-b-[#B9C0D4] flex items-center pl-3 gap-x-1 font-bold text-[18px] leading-[150%] tracking-tight text-[#111322] cursor-pointer`}
          >
            <Chevron
              active={
                activeDockCategory === DockPanelCategories.Wedges ? true : false
              }
            />
            {DockPanelCategories.Wedges}
          </div>
          <div
            className={`${
              activeDockCategory === DockPanelCategories.Wedges
                ? "block"
                : "close-dock-panel hidden"
            } px-[12px]`}
          >
            {wedgesAndRamps?.wedges.length ? (
              <>
                <img
                  src={wedgesAndRamps?.wedges[0].image}
                  alt=""
                  className={`rounded-md my-2`}
                />
                <div className={`grid grid-cols-2`}>
                  {wedgesAndRamps?.wedges?.map((dockItem, index) => (
                    <button
                      key={index}
                      onClick={() => onDockSelect(dockItem)}
                      className={`w-[100px] flex flex-col items-center flex-1 h-[47px] rounded py-1 mx-1 mt-1 border border-[#B9C0D4]`}
                    >
                      <div
                        className={`flex items-center justify-center gap-x-1`}
                      >
                        <span>{dockItem.width}'</span>
                        <span>x</span>
                        <span>{dockItem.length}'</span>
                      </div>
                      <span className={`text-xs`}>
                        {getWedgesCategory(dockItem.category)}
                      </span>
                    </button>
                  ))}
                </div>
              </>
            ) : null}
          </div>
          <div
            onClick={() => onDockPanelClick(DockPanelCategories.Ramps)}
            className={`w-full h-[67px] z-30 border-b-2 border-b-[#B9C0D4] flex items-center pl-3 gap-x-1 font-bold text-[18px] leading-[150%] tracking-tight text-[#111322] cursor-pointer`}
          >
            <Chevron
              active={
                activeDockCategory === DockPanelCategories.Ramps ? true : false
              }
            />
            {DockPanelCategories.Ramps}
          </div>
          <div
            className={`${
              activeDockCategory === DockPanelCategories.Ramps
                ? "block"
                : "close-dock-panel hidden"
            } px-[12px]`}
          >
            {wedgesAndRamps.ramps.length ? (
              <>
                <img
                  src={wedgesAndRamps.ramps[0].image}
                  alt=""
                  className={`rounded-md my-2`}
                />
                <div className={`grid grid-cols-2`}>
                  {wedgesAndRamps.ramps?.map((dockItem, index) => (
                    <button
                      key={index}
                      onClick={() => onDockSelect(dockItem)}
                      className={`w-[100px] flex flex-col items-center flex-1 h-[47px] rounded py-1 mx-1 mt-1 border border-[#B9C0D4]`}
                    >
                      <div
                        className={`flex items-center justify-center gap-x-1`}
                      >
                        <span>{dockItem.width}'</span>
                        <span>x</span>
                        <span>{dockItem.length}'</span>
                      </div>
                      <span className={`text-xs`}>
                        {getRampsCategory(dockItem?.category)}
                      </span>
                    </button>
                  ))}
                </div>
              </>
            ) : null}
          </div>
          <div
            onClick={() => onDockPanelClick(DockPanelCategories.BoatLift2)}
            className={`w-full h-[67px] z-30 border-b-2 border-b-[#B9C0D4] flex items-center pl-3 gap-x-1 font-bold text-[18px] leading-[150%] tracking-tight text-[#111322] cursor-pointer`}
          >
            <Chevron
              active={
                activeDockCategory === DockPanelCategories.BoatLift2
                  ? true
                  : false
              }
            />
            {DockPanelCategories.BoatLift2}
          </div>
          <div
            className={`${
              activeDockCategory === DockPanelCategories.BoatLift2
                ? "block"
                : "close-dock-panel hidden"
            } px-[12px]`}
          >
            {boatLift.length ? (
              <>
                <div
                  className={`flex flex-col w-full justify-center items-center `}
                >
                  <div
                    className={`w-full h-5 text-center text-[#4A5578] font-normal text-[14px] leading-[20px]`}
                  >
                    Lift Range
                  </div>
                  <div className={`flex w-full justify-between items-center`}>
                    {liftRanges.map((liftRange) => (
                      <button
                        onClick={() => setActiveLiftRange(liftRange)}
                        className={`grow h-[43px] text-[#4A5578] font-normal text-[18px] leading-[150%] tracking-wide bg-white p-2 ${
                          activeLiftRange === liftRange
                            ? "border-b-2 border-b-[#0F75BC]"
                            : ""
                        } `}
                        key={liftRange}
                      >
                        {liftRange}ft
                      </button>
                    ))}
                  </div>
                </div>
                <img
                  src={boatLift[0].image}
                  alt=""
                  className={`rounded-md my-2`}
                />
                <div className={`grid grid-cols-2`}>
                  {boatLift?.map((dockItem, index) => {
                    if (dockItem?.lift_range === activeLiftRange) {
                      return (
                        <div key={index}>
                          <button
                            onClick={() => onDockSelect(dockItem)}
                            className={`w-[100px] h-[47px] rounded py-2 mx-1 mt-1 border border-[#B9C0D4] `}
                          >
                            {dockItem.weight_capacity}
                          </button>
                        </div>
                      );
                    }
                  })}
                </div>
              </>
            ) : null}
          </div>

          <div
            onClick={() => onDockPanelClick(DockPanelCategories.BoatLift4)}
            className={`w-full h-[67px] z-30 border-b-2 border-b-[#B9C0D4] flex items-center pl-3 gap-x-1 font-bold text-[18px] leading-[150%] tracking-tight text-[#111322] cursor-pointer`}
          >
            <Chevron
              active={
                activeDockCategory === DockPanelCategories.BoatLift4
                  ? true
                  : false
              }
            />
            {DockPanelCategories.BoatLift4}
          </div>
          <div
            className={`${
              activeDockCategory === DockPanelCategories.BoatLift4
                ? "block"
                : "close-dock-panel hidden"
            } px-[12px]`}
          >
            {boatLift.length ? (
              <>
                <div
                  className={`flex flex-col w-full justify-center items-center `}
                >
                  <div
                    className={`w-full h-5 text-center text-[#4A5578] font-normal text-[14px] leading-[20px]`}
                  >
                    Lift Range
                  </div>
                  <div className={`flex w-full justify-between items-center`}>
                    {liftRanges.map((liftRange) => (
                      <button
                        onClick={() => setActiveLiftRange(liftRange)}
                        className={`grow h-[43px] text-[#4A5578] font-normal text-[18px] leading-[150%] tracking-wide bg-white p-2 ${
                          activeLiftRange === liftRange
                            ? "border-b-2 border-b-[#0F75BC]"
                            : ""
                        }`}
                        key={liftRange}
                      >
                        {liftRange}ft
                      </button>
                    ))}
                  </div>
                </div>
                <img
                  src={boatLift[0].image}
                  alt=""
                  className={`rounded-md my-2`}
                />
                <div className={`grid grid-cols-2`}>
                  {boatLift?.map((dockItem, index) => {
                    if (dockItem?.lift_range === activeLiftRange) {
                      return (
                        <div key={index}>
                          <button
                            onClick={() => onDockSelect(dockItem)}
                            className={`w-[100px] h-[47px] rounded py-2 mx-1 mt-1 border border-[#B9C0D4] `}
                          >
                            {dockItem.weight_capacity}
                          </button>
                        </div>
                      );
                    }
                  })}
                </div>
              </>
            ) : null}
          </div>

          <div
            onClick={() => onDockPanelClick(DockPanelCategories.Accessories)}
            className={`w-full h-[67px] z-30 border-b-2 border-b-[#B9C0D4] flex items-center pl-3 gap-x-1 font-bold text-[18px] leading-[150%] tracking-tight text-[#111322] cursor-pointer`}
          >
            <Chevron
              active={
                activeDockCategory === DockPanelCategories.Accessories
                  ? true
                  : false
              }
            />
            {DockPanelCategories.Accessories}
          </div>
          <div
            className={`${
              activeDockCategory === DockPanelCategories.Accessories
                ? "block"
                : "close-dock-panel hidden"
            } px-[12px]`}
          >
            {accessories.length ? (
              <>
                <div className={`grid grid-cols-2`}>
                  {accessories?.map((dockItem, index) => (
                    <div
                      key={index}
                      onClick={() => onDockSelect(dockItem)}
                      className={`h-fit rounded mx-1 mt-1 border border-[#B9C0D4] cursor-pointer`}
                    >
                      {/* <div className={ `flex items-center justify-center gap-x-1` }>
                        <span>{ dockItem.width }'</span>
                        <span>x</span>
                        <span>{ dockItem.length }'</span> */}
                      <img
                        src={dockItem.thumbnail}
                        alt=""
                        className={`rounded-md `}
                      />
                      {/* </div> */}
                    </div>
                  ))}
                </div>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

{
  /* <div className={ `grow flex flex-col justify-center items-start bg-transparent` }>

</div> */
}
