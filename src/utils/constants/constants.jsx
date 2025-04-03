export const TabNames = {
  Builder: "Builder",
  SelectedItems: "Selected Items",
};

export const CanvasModes = {
  Pan: "Pan",
  Still: "Still",
};

export const DockPanelCategories = {
  RollIn: "ROLL-IN",
  Floating: "FLOATING",
  Sectional: "SECTIONAL",
  Wedges: "WEDGES",
  Ramps: "RAMPS",
  BoatLift2: "BOAT LIFTS (2 CYLINDER)",
  BoatLift4: "BOAT LIFTS (4 CYLINDER)",
  Accessories: "ACCESSORIES",
};
export const Tables = {
  Docks: "docks",
  Boat_lifts: "boat_lifts",
  Accessories: "accessories",
  Wedges: "wedges",
  Ramps: "ramps",
  ReferenceItems: "reference_items",
  Dealers: "dealers",
  Quotes: "quotes",
};
export const BoatLiftRange = ["4", "5", "6"];

export const categoryMapping = {
  0: "Floating Dock",
  1: "Sectional Dock",
  2: "Roll-In Dock",
};
export const wedgesCategoryMapping = {
  0: "Floating Wedges",
  1: "Roll-In Wedges",
};
export const rampsCategoryMapping = {
  0: "Pivot Ramp",
  1: "Truss Ramp",
};
export const materialsMapping = {
  0: "Wood Grain",
  1: "Perforated",
  2: "Grey Aluminium",
};
export const wedgesAndRampsMaterialsMapping = {
  0: "Wood Grain",
  1: "Grey Aluminium",
  2: "Perforated",
};

export const MaterialType = {
  Woodgrain: 0,
  Perforated: 1,
  Gray: 2,
};
export const DockPanelCategoryMap = {
  Floating: 0,
  Sectional: 1,
  RollIn: 2,
};
export const CylinderType = {
  "BOAT LIFTS (2 CYLINDER)": 2,
  "BOAT LIFTS (4 CYLINDER)": 4,
};
export const EstimateSteps = {
  ContactInformation: 1,
  LakeSurrounding: 2,
  Comments: 3,
  InquirySubmitted: 4,
};
// export const IsDealer = {
//   YES: "Yes",
//   NO: "No",
// }
export const Truthy = {
  True: true,
  False: false,
};
export const SnapType = {
  Snap: "Snap",
  SnapClone: "SnapClone",
};
export const scaleFactor = 0.2;
export const oneFeet = 303 * scaleFactor;
// export const edgeSnapThreshold = 100
export const edgeSnapThreshold = 15;
export const nintyDeg = 90;
export const fortyFiveDeg = 45;
export const twoSeventyDeg = 270;
export const threeFifteenDeg = 315;
export const oneEightyDeg = 180;
export const twoTwentyFiveDeg = 225;
export const onThirtyFiveDeg = 135;
// export const edgeSnapThreshold = 100 / 1.889
export const deleteIcon =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAMAAACelLz8AAAA+VBMVEVHcEz/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////NhAsAAAAUnRSTlMAEnBvAv4H0xYGExTPXPBgn4QeVvb13s5eXWfNe57xZVT0M3ZYlwgwNDLg0d1aX2FbIKZ6px+F0sx9gqmoeFdzmJqUnZWZ4dBm8hliZJxjfNcVFGav3QAAATZJREFUKM91kmdjgjAQhqMyRBFQUMSFo9Y6a622ru692/f//5gmARFpvQ9cLk9yee84QjZ2UsoaRrY0IxETRip8sx0hTI7OAW1S0fXKVAP6zS05sDAYKt5ayRRgXQZExL2yPSi1IZp+NgtXuy+3kO9yBSpuo6ra6DMtIxSUKFIGyFCnYsiiWCLNXDoRY85BmVYKjV+KQ04SkpQR51JqYo6UMOE5UjJllMgpHq7hkjOcevnZtsyvMqsgS6o4JgELCHlDNYR+aLe+X/3gEx/7En7RhM+Y/idjhXcy2y+e2LzwSMlFzPn3b6MOexiz9tq4i6JrPPFf3cyjtUsu0Oh4K1PEgxTKdgOxvgnMPHqOD6XiIxr17cEunafaeqHri9ULUO7sDFum7M+aOB8LUVU5d2kYSzcXbPwCfA4wgva2ZmUAAAAASUVORK5CYII=";
// export const deleteIcon = "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' id='Ebene_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='595.275px' height='595.275px' viewBox='200 215 230 470' xml:space='preserve'%3E%3Ccircle style='fill:%23F44336;' cx='299.76' cy='439.067' r='218.516'/%3E%3Cg%3E%3Crect x='267.162' y='307.978' transform='matrix(0.7071 -0.7071 0.7071 0.7071 -222.6202 340.6915)' style='fill:white;' width='65.545' height='262.18'/%3E%3Crect x='266.988' y='308.153' transform='matrix(0.7071 0.7071 -0.7071 0.7071 398.3889 -83.3116)' style='fill:white;' width='65.544' height='262.179'/%3E%3C/g%3E%3C/svg%3E";

export const rotateIcon =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAeCAMAAAAfOR5kAAABJlBMVEVHcEz///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+w8PQxAAAAYXRSTlMAAQnFCtXWJwj3/NLyWEH1K/YZ3LXxDkX+YpQwpgZMBfCNdFpuiw+ezGeqFhqZ6yaXICUL+NnjQ5KbI5yCxgMSOVx/1Mhv76tmLP0tt+oMXsrP3q/TFJ+aR49PDcmA+gfk0N+uwAAAAOZJREFUKM9t0NdSAkEQheEhLMsSJZkDJsScc0DAHFAxgNn//V/CQmzKcrovpk59cy6mx5j2FPxGmXIsYGPtCbYs7XogdWzpTRLn8j+W7uHq0epWac317eleIvyH97m4q3s/d97USod3cpwZkz6MTxYjROaD4nFS5+20vLRG1BXfxZGOG2Vh8TcHHbalspolMyvrJBkX9weYkTxNfkjyXIxNyaODvs7TxjjSPjN8gqt5g3eNX8hq7JLR+JMPjV/JaZzmS+MEbxpXeFbUt05T4WE2DpTdQ0wo5X5CI7Z293oD2jv6elrnN1VOI4sPCr1mAAAAAElFTkSuQmCC";
// export const rotateIcon =
//   "data:image/svg+xml,%3Csvg height='32px' width='32px' fill='%23000000' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' version='1.1' x='0px' y='0px' viewBox='0 0 33.317 28' enable-background='new 0 0 33.317 28' xml:space='preserve'%3E%3Cpath d='M16.659,24c-5.078,0-9.213-3.987-9.475-9h2.975l-4.5-5l-4.5,5h3.025c0.264,6.671,5.74,12,12.475,12c3.197,0,6.104-1.21,8.315-3.185l-2.122-2.122C21.188,23.127,19.027,24,16.659,24z'%3E%3C/path%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M29.133,14c-0.265-6.669-5.74-12-12.475-12c-3.197,0-6.104,1.21-8.315,3.185l2.122,2.122C12.129,5.873,14.29,5,16.659,5c5.077,0,9.213,3.987,9.475,9h-2.975l4.5,5l4.5-5H29.133z'%3E%3C/path%3E%3C/svg%3E";
export const dock_image =
  "data:image/png;base64,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";
