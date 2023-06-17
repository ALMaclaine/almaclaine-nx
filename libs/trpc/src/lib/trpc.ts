import { initTRPC } from '@trpc/server';
import type { TRPCPanelMeta } from 'trpc-panel';

// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.
const t = initTRPC.meta<TRPCPanelMeta>().create();
// Base router and procedure helpers
const { router, procedure } = t;
export { router, procedure };
