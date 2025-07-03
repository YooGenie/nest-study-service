import * as Sentry from '@sentry/node';
import { nodeProfilingIntegration } from '@sentry/profiling-node';

export function initSentry(sentryDsn?: string): void {
  Sentry.init({
    dsn: sentryDsn,
    integrations: [nodeProfilingIntegration()],
    environment: process.env.ENVIRONMENT,

    // Add Tracing by setting tracesSampleRate
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,

    // Set sampling rate for profiling
    // This is relative to tracesSampleRate
    profilesSampleRate: 1.0,
  });
}
