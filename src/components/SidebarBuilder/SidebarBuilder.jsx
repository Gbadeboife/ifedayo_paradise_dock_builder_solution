import React, { useCallback, useState } from "react";
import { Tabs } from "Components/Tabs";
import { Builder } from "Components/Builder";
import { SelectedItems } from "Components/SelectedItems";
import { TabNames } from "Utils/constants";

export const SidebarBuilder = ({
  editor,
  updateModifications,
  selectedItems,
}) => {
  const [activeTab, setActiveTab] = useState(TabNames.Builder);
  // const [ramps, setRamps] = useState([]);

  const onTabClick = useCallback(
    (tab) => {
      setActiveTab(tab);
    },
    [activeTab]
  );

  return (
    <div
      className={`flex flex-col max-h-[80%] grow relative overflow-auto gap-x-[8px] border-2 w-full`}
    >
      <Tabs
        className={`flex gap-x-0 justify-center items-center min-h-[50px] max-h-[50px] h-[50px] w-full`}
        activeTab={activeTab}
        onTabClick={onTabClick}
      />

      {activeTab === TabNames.Builder ? (
        <Builder
          editor={editor}
          updateModifications={updateModifications}
          // ramps={ramps}
          // setRamps={setRamps}
        />
      ) : null}
      {activeTab === TabNames.SelectedItems ? (
        <SelectedItems selectedItems={selectedItems} />
      ) : null}
    </div>
  );
};

{
  /* <div className={ `grow flex flex-col justify-center items-start bg-transparent` }>

</div> */
}
