var Global = Global || {};
Global.extendscriptLoggerRootPath = new File($.fileName).parent;
Global.rootPath = Global.rootPath || (typeof(rootPath) != 'undefined' ? rootPath : null) || Global.extendscriptLoggerRootPath;

//Load dependencies
$.evalFile(Global.rootPath + '/node_modules/extendscript-es5-shim/index.js');
$.evalFile(Global.rootPath + '/node_modules/moment/moment.js');

//Load libraries
$.evalFile(Global.extendscriptLoggerRootPath + '/lib/json2.js');
$.evalFile(Global.extendscriptLoggerRootPath + '/src/Logger.jsx');
