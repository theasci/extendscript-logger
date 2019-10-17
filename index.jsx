var rootPath = rootPath || new File($.fileName).parent;

//Load dependencies
$.evalFile(rootPath + '/node_modules/extendscript-es5-shim/index.js');
$.evalFile(rootPath + '/node_modules/moment/moment.js');

//Load libraries
$.evalFile(new File($.fileName).parent + '/lib/json2.js');
$.evalFile(new File($.fileName).parent + '/src/Logger.jsx');
