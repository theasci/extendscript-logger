type level = 'DEBUG' | 'INFO' | 'NOTICE' | 'WARN' | 'ERROR' | 'CRITICAL';

declare class Logger {
  constructor(logPath: string, severity: level)
  /**
   * Contains last logged message 
   */
  lastlog: string;

  /**
   * ID of current log
   */
  logId: number;

  /**
   * Separator, which separates texts in log output, default '|'
   */
  separator: string;

  /**
   * Possible levels of logs
   */
  levels: [
    'DEBUG',
    'INFO',
    'NOTICE',
    'WARN',
    'ERROR',
    'CRITICAL'
  ];

  /**
   * Path to the file, where logs will be saved
   */
  logPath: string;

  /**
   * Severity level
   */
  severity: level;

  /**
   * Creates a log, and marks it as DEBUG
   * @param message Message to log
   */
  debug(message: string);

  /**
   * Creates a log, and marks it as INFO
   * @param message Message to log
   */
  info(message: string);

  /**
   * Creates a log, and marks it as NOTICE
   * @param message Message to log
   */
  notice(message: string);

  /**
   * Creates a log, and marks it as WARN
   * @param message Message to log
   */
  warn(message: string);

  /**
   * Creates a log, and marks it as ERROR
   * @param message Message to log
   */
  error(message: string);

  /**
   * Creates a log, and marks it as CRITICAL
   * @param message Message to log
   */
  critical(message: string);

  /**
   * Removes current log file immidiately
   */
  delete()

}
