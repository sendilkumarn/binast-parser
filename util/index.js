isArray = arr  => Array.isArray(arr) || arr instanceof Array;

isObject = value => value !== null && typeof value === 'object';

module.exports = { isArray, isObject };
