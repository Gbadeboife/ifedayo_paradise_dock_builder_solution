# PARADISE DOCK BUILDER

## SETUP Process

- You are expected to clone this repository and set up a new repo remotely on ur github with the code (Preferably name the repo with your name. E.g john_doe_paradise_dock_builder_solution)
  To set up locally

  - **a.** clone the repo to your local machine
  - **a.** update remote origin
  - **b.** install dependencies (using -- "npm install")
  - **b.** run locally on your computer using this command - "npm run dev"

- Make sure to commit each fix with a valid message entailing what issue was fixed in the commit. This will help when grading your solution

- When you are done, cross check all fixes and then submit the repo that has your solutions.

- Any commit after your submmission will be discarded and won't be graded.

- PLEASE make sure to deploy the app to a live server, to allow full test by the Development team and the Quality Assurance Team (preferably netlify or vercel)

## Table of Contents

1. [Dock Category](#dock-category)
2. [Dock Data](#dock-data)
3. [Issues](#issues)

## Dock Category

- **Dock Category** is a category of the docks.
  - **Dock Category** can be one of the following:
    - **ROLL-IN**
    - **FLOATING**
    - **SECTIONAL**
    - **WEDGES**
    - **RAMPS**
    - **BOAT LIFE LIFTS (2 CYLINDER)**
    - **BOAT LIFE LIFTS (4 CYLINDER)**
    - **ACCESSORIES**

## Dock Data

- **Dock Data** is the collection of all the docks information

  - docks is as follows: >

  ```
  {
    itemName: activeDockCategory -> (ROLL-IN, FLOATING, SECTIONAL, WEDGES, RAMPS, BOAT LIFTS (2 CYLINDER), BOAT LIFTS (4 CYLINDER), ACCESSORIES),

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
  ```

  - this information is to be attached to every dock that is added into the canvas editor as `dockData`

#### The Issues Are Listed Below

1.  On the sidebar, each dock is listed as tablets with names and dimensions or size, and when you click on a dock, it will is added to the canvas editor

    Now the issue here is that is doesn't work

    Please fix this issue. (Tip - An onDockSelect handles this in Builder.jsx file)

2.  CopySelection Functionality is not working
    Expected Behavior: When you click on the copy button, the selected object in the canvas editor should be copied to the clipboard
    Actual Behavior: The selected object is not copied to the clipboard

    Please fix this issue.

3.  PasteSelection Functionality is not working
    Expected Behavior: When you click on the paste button, the selected object in the clipboard should be pasted to the canvas editor
    Actual Behavior: The selected object is not pasted to the canvas editor

    Please fix this issue.

4.  onRedoClick Functionality is not working
    Expected Behavior: When you click on the redo button, the last undone action should be redone
    Actual Behavior: The last undone action is not redone

    Please fix this issue.

5.  onUndoClick Functionality is not working
    Expected Behavior: When you click on the undo button, the last action should be undone
    Actual Behavior: The last action is not undone

    Please fix this issue.

6.  onPrintScreen Functionality is not working
    Expected Behavior: When you click on the print screen button, the canvas editor should be printed
    Actual Behavior: The canvas editor is not printed

    Please fix this issue.

7.  onDeleteSelection Functionality is not working
    Expected Behavior: When you click on the delete button, the selected object in the canvas editor should be deleted
    Actual Behavior: The selected object is not deleted

    Please fix this issue.

8.  on the sidebar the downloadImage function is not working

    Expected Behavior: When you click on the download button, the selected dock should be downloaded as a png file and also trigger the download of the dockData you extracted in excel format
    Actual Behavior: The selected dock is not downloaded as a png file

    Please fix this issue.

9.  on the sidebar onDownloadFile triggers toJSON function

    Expected Behavior: When you click on the download button, the canvas editor content is downloaded as a json file
    Actual Behavior: Nothing happens when you click on the download button

    Please fix this issue.

10. on the sidebar, the onUploadFile triigers uploadFile function

    Expected Behavior: When you click on the upload button, the json file we had previously downloaded should be uploaded, its data extracted and loaded into the editor
    Actual Behavior: Nothing happens when you click on the upload button

    Please fix this issue.

11. Finally, objects in the canvas editor of the category DockPanelCategories.Accessories, DockPanelCategories.BoatLift2, DockPanelCategories.BoatLift4, when being moved, should snap to the nearest snap point of other objects of any the above listed categories

    Expected Behavior: When you move an object in the canvas editor of the category DockPanelCategories.Accessories, DockPanelCategories.BoatLift2, DockPanelCategories.BoatLift4, it should snap to the nearest snap point of other objects of any the above listed categories
    Actual Behavior: Objects in the canvas editor of the category DockPanelCategories.Accessories, DockPanelCategories.BoatLift2, DockPanelCategories.BoatLift4 are not snapping to the nearest snap point of other objects of any the above listed categories

    Please fix this issue.
