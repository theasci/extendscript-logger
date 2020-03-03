describe('Logger', function() {
	var timeRegexp = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/;
	var debugLogger;
	var debugLogPath = Global.rootPath+'/log/debugLogger.log'
	
	beforeEach(function(){
		debugLogger = new Logger(debugLogPath);
		debugLogger.delete(); //ensures log is kept small
	});

	it('levels', function() {
		expect(debugLogger.levels().length).toEqual(6);
	});
	
	it('level', function() {
		expect(debugLogger.level()).toEqual('DEBUG');
	});
	
	it('logPath', function(){
		expect(debugLogger.logPath()).toEqual(debugLogPath);
	});
	
	describe('file', function(){
		it('matches logPath', function(){
			expect(debugLogger.file().fullName).toEqual(debugLogPath);
		});
		it('create directory if it does not exist', function(){
			try {
				var dir = new Folder(Global.rootPath+'/log/test-dir');
				expect(dir.exists).toBe(false);
	
				var fooPath = dir.fullName+'/foo.log';
				var fooLogger = new Logger(fooPath);
				expect(fooLogger.file().fullName).toEqual(fooPath);
				expect(dir.exists).toBe(true);
				expect(new Folder(dir.fullName).exists).toBe(true);
			} finally {
				if(dir && dir.exists) {
					dir.remove();
				}
			}
		});
	});
	
	describe('messageString', function(){
		it('creates expected string', function() {
			var r = new RegExp('^'+timeRegexp.source+'|WARN|test$');
			expect(debugLogger.messageString('test','WARN')).toMatch(r);
		});
	
		it('creates JSON strings with objects', function(){
			var r = new RegExp('^'+timeRegexp.source+'|NOTICE|{"name":"foo","bar":1,"baz":{"fat":null}}$');
			expect(debugLogger.messageString({name: 'foo', bar: 1, baz:{fat: null}},'NOTICE')).toMatch(r);
		});
	
		it('handles ExtendScript objects', function(){
			expect(debugLogger.messageString($.global.app,'INFO')).toMatch(/name:\\"Adobe InDesign\\"/);
		});
	});
	
	describe('meetsLevel', function(){
		var lgr = new Logger;
		it('DEBUG', function(){
			for(var i = 0; i < lgr.levels().length; i++) {
				expect(lgr.meetsLevel(lgr.levels()[i], 'DEBUG')).toBe(true);
			}
		});
	
		it('INFO', function(){
			for(i = 0; i < 1; i++) {
				expect(lgr.meetsLevel(lgr.levels()[i], 'NOTICE')).toBe(false);
			}
			for(i = 1; i < lgr.levels().length; i++) {
				expect(lgr.meetsLevel(lgr.levels()[i], 'INFO')).toBe(true);
			}
		});
		
		it('NOTICE', function(){
			for(i = 0; i < 2; i++) {
				expect(lgr.meetsLevel(lgr.levels()[i], 'NOTICE')).toBe(false);
			}
			for(i = 2; i < lgr.levels().length; i++) {
				expect(lgr.meetsLevel(lgr.levels()[i], 'NOTICE')).toBe(true);
			}
		});
		
		it('WARN', function(){
			for(i = 0; i < 3; i++) {
				expect(lgr.meetsLevel(lgr.levels()[i], 'WARN')).toBe(false);
			}
			for(i = 3; i < lgr.levels().length; i++) {
				expect(lgr.meetsLevel(lgr.levels()[i], 'WARN')).toBe(true);
			}
		});
		
		it('ERROR', function(){
			for(i = 0; i < 4; i++) {
				expect(lgr.meetsLevel(lgr.levels()[i], 'ERROR')).toBe(false);
			}
			for(i = 4; i < lgr.levels().length; i++) {
				expect(lgr.meetsLevel(lgr.levels()[i], 'ERROR')).toBe(true);
			}
		});
		
		it('CRITICAL', function(){
			for(i = 0; i < 5; i++) {
				expect(lgr.meetsLevel(lgr.levels()[i], 'CRITICAL')).toBe(false);
			}
			for(i = 5; i < lgr.levels().length; i++) {
				expect(lgr.meetsLevel(lgr.levels()[i], 'CRITICAL')).toBe(true);
			}
		});
	});
	
	describe('log', function(){
		it('throws error if severity is invalid', function(){
			expect(
				function(){
					debugLogger.log('bad level','invalid');
				}
			).toThrow(
				new TypeError("Level invalid is not valid level")
			);
			expect(
				function(){
					debugLogger.log('bad level','cRiTiCaL');
				}
			).toThrow(
				new TypeError("Level cRiTiCaL is not valid level")
			);
		});
	
		it('checks severity threshold', function(){
			expect(debugLogger.log('debug','DEBUG')).toBe(true);
			expect(debugLogger.log('info','INFO')).toBe(true);
	
			var infoLogger = new Logger('infoLogger.log', 'INFO');
			expect(infoLogger.log('debug','DEBUG')).toBe(false);
			expect(infoLogger.log('info','INFO')).toBe(true);
			infoLogger.delete();
		});
	
		it('creates file if it does not exist',function(){
			expect(debugLogger.file().exists).toBe(false);
			expect(debugLogger.log('testing log','DEBUG')).toBe(true);
			expect(debugLogger.file().exists).toBe(true);
		});
	
		it('outputs to file', function(){
			try {
				//create a new logger so our file doesn't get clobbered by other tests.
				var outputTestLogger = new Logger(Global.rootPath + '/log/outputTest.log');
				expect(outputTestLogger.log('entry in log','WARN')).toBe(true);
	
				var r = new RegExp('^\d+|'+timeRegexp.source+'|WARN|entry in log\n');
				expect(outputTestLogger.lastLog).toMatch(r);
	
				var f = outputTestLogger.file();
				expect(f.exists).toBe(true);
				f.open('r');
				expect(f.read()).toMatch(r)
			} finally {
				if(f && f.exists) {
					f.close();
					f.remove();
				}
			}
		});
	});
	
	it('exception', function(){
		var e = new Error('Test error')
		expect(debugLogger.exception(e,'NOTICE')).toBe(true);
		var msgRegexp = /Error: Test error in .*?LoggerSpec.jsx \(line \d+\)/
		var r = new RegExp('^'+timeRegexp.source+'|NOTICE|'+msgRegexp.source);
		expect(debugLogger.lastLog).toMatch(r)
	});
	
	it('delete', function(){
		expect(debugLogger.log('testing delete','DEBUG')).toBe(true);
		expect(debugLogger.delete()).toBe(true);
		expect(debugLogger.delete()).toBe(false);
	});
});
