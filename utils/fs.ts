/**
 * @file node fs util
 * @author Yuyi Liang <liang.pearce@gmail.com>
 */
import * as FS from 'fs';

import * as v from 'villa';

export async function safeStat(path: string): Promise<FS.Stats | undefined> {
  return v.call(FS.stat, path).catch(v.bear);
}

export async function existsFile(path: string): Promise<boolean> {
  const stats: FS.Stats | undefined = await safeStat(path);

  return !!stats && stats.isFile();
}

export async function existsDir(path: string): Promise<boolean> {
  const stats: FS.Stats | undefined = await safeStat(path);

  return !!stats && stats.isDirectory();
}
