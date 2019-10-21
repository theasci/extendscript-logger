/**
 * Handles logging messages to different sources. Creates log in hosts/log/ directory.
 * @see https://github.com/sidpalas/extendscript-logging
 *
 * var logger = new Logger('~/mylog.log','DEBUG');
 *
 * Wrap definition to allow testing with jasminejsx which depends on this library.
 */
if(!Logger) {
	var Logger = (function(givenLogPath, givenLevel){
		var _private = {
			logId: 1,
			logPath: givenLogPath || '/tmp/'+moment().format('YYYYMMDDHms')+'.log',
			level: givenLevel || 'DEBUG',
			levels: [
				'DEBUG',
				'INFO',
				'NOTICE',
				'WARN',
				'ERROR',
				'CRITICAL',
			],
		};

		/**
		 * The last log is written to this variable for easy access.
		 * 
		 */
		this.lastLog = null;
		
		this.separator = '|';
		
		this.logPath = function() {
			return _private.logPath;
		}
		
		this.levels = function() {
			return _private.levels;
		}
		
		this.level = function() {
			return _private.level;
		}

		this.debug = function(message) {
			return this.log(message, 'DEBUG');
		}
		this.info = function(message) {
			return this.log(message, 'INFO');
		}
		this.notice = function(message) {
			return this.log(message, 'NOTICE');
		}
		this.warn = function(message) {
			return this.log(message, 'WARN');
		}
		this.error = function(message) {
			return this.log(message, 'ERROR');
		}
		this.critical = function(message) {
			return this.log(message, 'CRITICAL');
		}

		/**
		 * Convenience function to log exceptions from try-catch blocks.
		 * Usually called as `catch(e){ logger.exception(e); }`
		 * @param  Exception exception
		 * @param  string fileName Originating file path
		 * @return boolean
		 */
		this.exception = function(error, level) {
			//Undocumented error properties. This code borrowed from Jasmine's ExceptionFormatter
			var msg = error.name + ': ' + error.message;
			if (error.fileName || error.sourceURL) {
				msg += ' in ' + (error.fileName || error.sourceURL);
			}
			if (error.line || error.lineNumber) {
				msg += ' (line ' + (error.line || error.lineNumber) + ')';
			}
			return this.log(msg, level || 'WARN');
		}

		this.messageString = function(message, level){
			var msg = _private.logId;
			msg += this.separator + moment().format('YYYY-MM-DDTHH:mm:SS');
			msg += this.separator + level;
			
			if(typeof(message) == 'object') {
				try {
					msg += this.separator + JSON.stringify(message);
				} catch(e){
					//attempt to display ExtendScript object
					if (e instanceof InternalError && message.properties) {
						msg += this.separator + JSON.stringify(message.properties.toSource());
					} else {
						throw e;
					}
				}
			} else {
				msg += this.separator + message
			}
			
			return msg;
		}

		/**
		 * Ensure file folder exists so we can create the log file.
		 */
		this.file = function() {
			var logFile = new File(this.logPath())
			if (!logFile.parent.exists){
				logFile.parent.create();
			}
			return logFile;
		}
		
		/**
		 * Compares two levels.
		 * @param {String} comparisionLevel
		 * @param {String} baseLevel
		 * @return boolean
		 */
		this.meetsLevel = function(comparisionLevel, baseLevel) {
			return _private.levels.indexOf(comparisionLevel) >= _private.levels.indexOf(baseLevel);
		}
		
		this.log = function(message, level) {
			if(_private.levels.indexOf(level) == -1) {
				throw new TypeError('Level '+level+' is not valid level');
			}
			
			if(!this.meetsLevel(level, this.level())) {
				return false;
			}
			
			var file = this.file();
			file.open('a+');
			file.encoding = 'UTF-8';
			file.lineFeed = 'Unix';
			this.lastLog = this.messageString(message,level);
			file.writeln(this.lastLog);
			file.close();
			_private.logId += 1;
			return true;
		}
		
		/**
		 * Deletes this log immediately. Useful in testing.
		 * @return boolean
		 */
		this.delete = function() {
			return this.file().remove();
		}
		
		return this;
	}());
}
