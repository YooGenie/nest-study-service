import { ArchiverOptions } from 'archiver';

export const archiverDefaultOptions: ArchiverOptions = {
  zlib: { level: 9 },
  highWaterMark: 1024 * 1024 * 100, // 100MB
};
