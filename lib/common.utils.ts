export const capitalize = (string = "") => {
  return string.toString().charAt(0)?.toUpperCase() + string?.toString()?.slice(1);
};

/**
 * Get the name of a variable
 * @param varObj {object}
 * @returns {string}
 */
export const VN = (varObj: object): string => Object.keys(varObj)[0];

/**
 * Case-insensitive string inclusion check
 * @param string {string} - The string to check
 * @param substring {string} - The substring to check for
 * @returns {boolean} - Whether the substring is included in the string
 */
export const includesIgnoreCase = (string: string = "", substring: string = ""): boolean =>
  string?.toLowerCase()?.includes(substring?.toLowerCase());

/**
 * Whether to add an 's' to a word depending on the value of a number representing an amount
 * @param amount {number} - The quantity of something
 * @returns {string} - and S or an empty string
 */
export const sOrNoS = (amount: number): string => (amount > 1 || amount === 0 ? "s" : "");

/**
 * Compare two objects to see if they are equal (shallow)
 * @param object1 {object} - The first object to compare
 * @param object2 {object} - The second object to compare
 * @returns {boolean} - Whether the objects are equal
 */
export function shallowEqual(object1 = {}, object2 = {}) {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);

  if (keys1.length !== keys2.length) return false;

  return keys1.every((key) => (object1 as Record<string, unknown>)[key] === (object2 as Record<string, unknown>)[key]);
}

/**
 * Compare two objects to see if they are equal (deep)
 * @param object1 {object} - The first object to compare
 * @param object2 {object} - The second object to compare
 * @returns {boolean} - Whether the objects are equal
 */
export function deepEqual(object1: object = {}, object2: object = {}): boolean {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);

  if (keys1.length !== keys2.length) return false;

  return keys1.every((key) => {
    const val1 = (object1 as Record<string, unknown>)[key];
    const val2 = (object2 as Record<string, unknown>)[key];

    const areObjects = isObject(val1 as Record<string, unknown>) && isObject(val2 as Record<string, unknown>);
    return areObjects ? deepEqual(val1 as Record<string, unknown>, val2 as Record<string, unknown>) : val1 === val2;
  });
}

/**
 * Check if a variable is an object
 * @param object {*} - Variable to check
 * @returns {boolean} - Whether the variable is an object
 */
export function isObject(object: unknown): boolean {
  return object != null && typeof object === "object";
}

/**
 * Check if a variable is a string
 * @param val {*} - Variable to check
 * @returns {boolean} - Whether the variable is a string or not
 */
export const isString = (val: unknown): boolean => typeof val === "string";

/**
 * Omit properties from an object
 * @param object {object} - Object to omit properties from
 * @param keys {array} - Array of keys to omit from the object
 * @returns {{}} - Object with omitted properties removed
 */
export function omit(object: object, keys: Array<string>): object {
  if (!object) return {};
  return Object.keys(object)
    .filter((key) => !keys.includes(key))
    .reduce((acc, key) => {
      (acc as Record<string, unknown>)[key] = (object as Record<string, unknown>)[key];
      return acc;
    }, {});
}

/**
 * Get the value of a nested object property
 * @param object {object} - Object to get the value from
 * @param path {string} - Path to the property (e.g. 'foo.bar.baz')
 * @returns {*} - Value of the property
 */
export const deepGet = (object: object, path: string): unknown => {
  const keys = path.split(".");
  if (!keys.length) return object; // if path is empty string return object
  if (keys.length === 1) return (object as Record<string, unknown>)[keys[0]]; // if path is one key return object[key]
  let value: unknown = object;
  keys.forEach((key) => {
    if (isObject(value)) {
      value = (value as Record<string, unknown>)[key];
    } else {
      value = undefined;
    }
  });

  return value;
};

/**
 * A function that performs a string comparison with a fuzzy ratio
 * @param string {string} - The string to compare
 * @param term {string} - The term to compare the string to
 * @param ratio {number} - The ratio to compare the string to the term (0-1) where 1 is a perfect match
 * @returns {boolean} - Whether the string matches the term
 */
export const fuzzy = (string: string = "", term: string = "", ratio: number): boolean => {
  const compare = term.toLowerCase().replaceAll(" ", "");
  string = string.toLowerCase().replaceAll(" ", "");
  let matches = 0;

  if (string.indexOf(compare) > -1) return true; // covers basic partial matches
  for (const char of compare) {
    if (string.indexOf(char) > -1) {
      matches += 1;
    } else {
      matches -= 1;
    }
  }
  return matches / string.length >= ratio || term === "";
};

/**
 * Format an ISO date string to dd-mm-yyyy and optionally include the time
 * @param ISODate {string}
 * @param includeTime {boolean}
 * @returns {string} - Formatted date string
 */
export const formatDate = (ISODate: string, includeTime: boolean = false): string => {
  const date = new Date(ISODate);
  const dateString = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  if (!includeTime) return dateString;
  const timeString = `${date.getHours()}:${date.getMinutes() < 10 ? "0" : ""}${date.getMinutes()}`;
  return dateString + " " + timeString;
};

/**
 * Get the current date in 'yyyy-mm-dd' format
 * @returns {string} - Date string
 */
export const getDate = (date = null): string => {
  const dateInstance = date ? new Date(date) : new Date();
  return dateInstance.toISOString().split("T")[0];
};

/**
 * Get a user-friendly name from an alias
 * @param alias
 */
export const getNameFromAlias = (alias?: string): string => (alias ? alias.split("+").join(" ") : "");
