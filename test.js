// TODO yet to implement Use ava 
const parseScript = require("shift-parser").parseScript;

const convert = require("./from-ast");
const convertTo = require("./to-ast");

const scriptAST = parseScript("let x;");
convert(scriptAST);
