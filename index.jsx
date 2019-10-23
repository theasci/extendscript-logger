var projectRootPath = new File($.fileName).parent;
var rootPath = rootPath || projectRootPath;

//Load dependencies
$.evalFile(rootPath + '/node_modules/extendscript-es5-shim/index.js');
$.evalFile(rootPath + '/node_modules/moment/moment.js');

//Load libraries
$.evalFile(projectRootPath + '/lib/json2.js');
$.evalFile(projectRootPath + '/src/Logger.jsx');
