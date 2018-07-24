import {
  size,
  isEmpty,
  isArray,
  includes,
  forEach,
  first,
  keys,
} from 'lodash/fp';

export const fastProp = (key) => (object) => object && object[key];

export const getProp = (key) => (object) => {
  if (key === undefined) {
    return undefined;
  }
  const keysArr = key.split('.');
  let index = 0;
  const length = keysArr.length;

  while (object != null && index < length) {
    // eslint-disable-next-line
    object = object[keysArr[index++]];
  }
  return object;
};


export const normalize = (arr, key = 'id') => {
  const obj = {};
  if (isEmpty(arr)) {
    return {};
  }
  if (!isArray(arr)) {
    return {
      [getProp(key)(arr)]: arr,
    };
  }
  const length = size(arr);
  if (includes('.')(key)) {
    for (let i = 0; i < length; i += 1) {
      obj[getProp(key)(arr[i])] = arr[i];
    }
  } else {
    for (let i = 0; i < length; i += 1) {
      obj[arr[i][key]] = arr[i];
    }
  }
  return obj;
};

export const copyObject = (keysArr) => (obj) => {
  const data = {};
  forEach((key) => {
    data[key] = obj[key];
  })(keysArr);
  return data;
};

export const getHeadObjectKeys = (obj) => keys(first(obj));

export const fastHas = (key) => (object) => object != null && hasOwnProperty.call(object, key);

export const fastNth = (index) => (arr) => arr && arr[index];
