import { createSelector } from 'reselect';

// Takes an array of objects with `key`s and returns a mapping of those
// objects keyed by their uids
export const mapById = (selector, key = 'uid') => createSelector(
  [selector],
  (items) => {
    if (!items) {
      return undefined;
    }
    let objMapping = {};
    items.forEach(item => objMapping[item[key]] = item);
    return objMapping;
  }
);
