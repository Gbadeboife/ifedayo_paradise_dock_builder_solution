import { categoryMapping, materialsMapping, MaterialType } from "./constants";
import {
  rampsCategoryMapping,
  wedgesAndRampsMaterialsMapping,
  wedgesCategoryMapping,
} from "./constants/constants";

export function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const getNonNullValue = (value) => {
  if (value !== "") {
    return value;
  } else {
    return undefined;
  }
};

export function filterEmptyFields(object) {
  Object.keys(object).forEach((key) => {
    if (empty(object[key])) {
      delete object[key];
    }
  });
  return object;
}

export function empty(value) {
  return (
    value === "" ||
    value === null ||
    value === undefined ||
    value === "undefined"
  );
}

export const isImage = (file) => {
  const validImageTypes = ["image/gif", "image/jpeg", "image/jpg", "image/png"];
  if (validImageTypes.includes(file.file.type)) return true;
  return false;
};

export class Stack {
  constructor() {
    this._undo = [];
    this._redo = [];
    this._update = false;
    this._updateCount = 0;
  }

  updateStack(data) {
    const duplicateState = this._undo.find((state) => state === data);
    if (duplicateState) {
      return this._undo[this._undo.length - 1];
    }
    const parsed = JSON.parse(data);
    const snapCloneFound = parsed.objects.find((object) => object.snapClone);
    if (snapCloneFound) {
      return this._undo[this._undo.length - 1];
    }

    this._undo.push(data);
    this._update = true;
    this._updateCount += 1;
    // console.log( this._undo )
    return this._undo[this._undo.length - 1];
  }
  undo() {
    if (this._updateCount === 1) {
      const redoLast = this._undo.splice(0, 1);
      this._redo.push(redoLast[0]);
      this._update = false;
      // console.log( this._undo, "undo" )
      // console.log( this._redo, "redo" )
      this._update = false;
      this._updateCount -= 1;
      return {
        currentCount: 0,
      };
    } else if (this._updateCount > 1) {
      const redoLast = this._undo.splice(this._undo.length - 1, 1);
      this._redo.push(redoLast[0]);
      const currentState = this._undo[this._undo.length - 1];
      this._updateCount -= 1;
      this._update = false;
      console.log("UNDO");
      // console.log( this._undo, "undo" )
      // console.log( this._redo, "redo" )
      return {
        currentState,
        currentCount: this._undo.length,
      };
    } else {
      return {
        currentCount: -1,
      };
    }
  }
  redo() {
    console.log(this._update, "update");
    if (this._update) {
      if (this._redo.length > 0) {
        this._redo = [];
      }
      return {
        currentState: null,
      };
    } else {
      if (this._redo.length > 0) {
        const undoLast = this._redo.splice(this._redo.length - 1, 1);
        this._undo.push(undoLast[0]);
        this._updateCount += 1;
        this._update = false;

        console.log("REDO");
        // console.log( this._undo, "undo" )
        // console.log( this._redo, "redo" )
        return {
          currentState: undoLast,
        };
      } else {
        return { currentState: null };
      }
    }
  }
}

export const getMaterial = (materials) => {
  return materialsMapping[materials];
};
export const getWedgesAndRampsMaterial = (materials) => {
  return wedgesAndRampsMaterialsMapping[materials];
};
export const getCategory = (category) => {
  return categoryMapping[category];
};
export const getWedgesCategory = (category) => {
  return wedgesCategoryMapping[category];
};
export const getRampsCategory = (category) => {
  return rampsCategoryMapping[category];
};
