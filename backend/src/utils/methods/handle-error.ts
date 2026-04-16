import { Logger } from '@nestjs/common';

export const logger = new Logger('App');

export function handleError(error: unknown, context?: string): void {
  const message = error instanceof Error ? error.message : String(error);
  const ctx = context ? ` [${context}]` : '';
  logger.error(`Error${ctx}: ${message}`);
  
  if (process.env.NODE_ENV === 'development') {
    console.error(error);
  }
}

export function logInfo(message: string, context?: string): void {
  const ctx = context ? `[${context}]` : '';
  logger.log(`${ctx} ${message}`);
}