// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the MIT License.

import * as types from '@azure/functions';
import { format } from 'util';
import { fallbackLogHandler } from './fallbackLogHandler';
import { tryGetCoreApiLazy } from './tryGetCoreApiLazy';

export function workerSystemLog(level: types.LogLevel, ...args: unknown[]): void {
    const coreApi = tryGetCoreApiLazy();
    if (coreApi) {
        coreApi.log(level, 'system', format(...args));
    } else {
        fallbackLogHandler(level, ...args);
    }
}
