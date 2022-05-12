type level = 'DEBUG' | 'INFO' | 'NOTICE' | 'WARN' | 'ERROR' | 'CRITICAL';

declare class Logger {
  constructor(givenLogPath: string, givenLevel: level);

  /**
   * Contains last logged message 
   */
  lastlog: string;

  /**
   * Separator, which separates texts in log output, default '|'
   */
  separator: string;

  /**
   * Returns path to log file
   */
  logPath(): string;

  /**
   * Returns array of possible levels
   */
  levels(): string[];
  
  /**
   * Returns selected level
   */
  level(): level;

  /**
   * Creates a log, and marks it as DEBUG
   * @param message Message to log
   * @returns true if message was logged, false if it wasn't
   */
  debug(message: string): boolean;

  /**
   * Creates a log, and marks it as INFO
   * @param message Message to log
   * @returns true if message was logged, false if it wasn't
   */
  info(message: string): boolean;

  /**
   * Creates a log, and marks it as NOTICE
   * @param message Message to log
   * @returns true if message was logged, false if it wasn't
   */
  notice(message: string): boolean;

  /**
   * Creates a log, and marks it as VALID
   * @param message Message to log
   * @returns true if message was logged, false if it wasn't
   */
  valid(message: string): boolean;

  /**
   * Creates a log, and marks it as WARN
   * @param message Message to log
   * @returns true if message was logged, false if it wasn't
   */
  warn(message: string): boolean;

  /**
   * Creates a log, and marks it as ERROR
   * @param message Message to log
   * @returns true if message was logged, false if it wasn't
   */
  error(message: string): boolean;

  /**
   * Creates a log, and marks it as CRITICAL
   * @param message Message to log
   * @returns true if message was logged, false if it wasn't
   */
  critical(message: string): boolean;

  /**
   * Removes current log file immidiately
   */
  delete();

}
