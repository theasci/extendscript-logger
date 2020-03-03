//@include '../index.jsx'

Global.logger = new Logger(Global.rootPath+'/log/test.log');
$.evalFile(Global.rootPath + '/node_modules/jasminejsx/test/run.jsx');
