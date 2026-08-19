/**
 * @file cartographySchema.js
 * Type Definitions and Path Mutation Safety Utilities
 */

/**
 * @typedef {Object} ReflectionEntry
 * @property {string} [l1]
 * @property {string} [l2]
 * @property {string} [l3]
 * @property {string} [lastUpdated]
 * @property {'lantern' | 'compass' | 'cartographer'} [depthMode]
 */

/**
 * Safely access a nested property path using dot notation.
 * @param {Record<string, any>} obj 
 * @param {string} path 
 * @param {any} [defaultValue]
 * @returns {any}
 */
export function getByPath(obj, path, defaultValue = undefined) {
  if (!obj || typeof obj !== 'object') return defaultValue;
  const keys = path.split('.');
  let current = obj;

  for (const key of keys) {
    if (current && typeof current === 'object' && key in current) {
      current = current[key];
    } else {
      return defaultValue;
    }
  }

  return current !== undefined ? current : defaultValue;
}

/**
 * Safely immutably update a nested property path using dot notation.
 * Prevents property typos and silent state shape drift.
 * @param {Record<string, any>} obj 
 * @param {string} path 
 * @param {any} value 
 * @returns {Record<string, any>}
 */
export function setByPath(obj, path, value) {
  if (!path) return obj;
  const keys = path.split('.');
  
  function updateRecursive(currentObj, index) {
    const key = keys[index];
    const targetObj = (currentObj && typeof currentObj === 'object') ? currentObj : {};

    if (index === keys.length - 1) {
      return {
        ...targetObj,
        [key]: value
      };
    }

    return {
      ...targetObj,
      [key]: updateRecursive(targetObj[key], index + 1)
    };
  }

  return updateRecursive(obj, 0);
}

/**
 * Validate territory reflection schema.
 * @param {Record<string, any>} reflections 
 * @returns {{ valid: boolean, errors: string[] }}
 */
export function validateReflections(reflections) {
  const errors = [];
  if (!reflections || typeof reflections !== 'object') {
    return { valid: false, errors: ['Reflections payload must be a non-null object.'] };
  }

  Object.entries(reflections).forEach(([territoryId, data]) => {
    if (typeof data !== 'object' || data === null) {
      errors.push(`Territory '${territoryId}' reflection data must be an object.`);
    }
  });

  return {
    valid: errors.length === 0,
    errors
  };
}
