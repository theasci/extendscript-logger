var rootPath = new File($.fileName).parent;
$.evalFile(rootPath + '/node_modules/extendscript-logger/index.jsx');
var logger = new Logger(rootPath+'/log/example.log');

logger.debug('Debug message');
logger.info([1, "Random string"]);
logger.notice({foo:"bar"});
logger.error("Crap! Something went wrong.");
