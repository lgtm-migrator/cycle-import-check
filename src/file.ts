import { Extension } from "./type";
import { sync } from "glob";
import { join as pathJoin, dirname, join, normalize, relative } from "path";
import { join as arrayJoin, map } from "lodash";
import { readFileSync } from "fs";
import { cwd } from "process";

const { resolve } = require

export const listAllFile = (dir: string, ext: Extension[] = []) => {
  return sync(pathJoin(dir, `./**/*.{${arrayJoin(ext, ",")}}`), {
    realpath: true,
    ignore: [
      "**/node_modules/**"
    ]
  })
}

export const readFile = (absolutePath: string) => {
  return readFileSync(absolutePath, { encoding: "utf8" })
}

/**
 * will throw error if file not exist
 * 
 * @param fromFileAbsolutePath 
 * @param importFileRelativePath 
 */
export const resolveFilePath = (fromFileAbsolutePath: string, importFileRelativePath: string) => {
  const dir = dirname(fromFileAbsolutePath);
  const targetPath = join(dir, importFileRelativePath);
  try {
    return normalize(resolve(targetPath));
  } catch (error) {
    throw new Error(`Cannot find module ${targetPath}`)
  }
}

export const absPathesToRelativePathes = (pathes: string[]) => {
  return map(pathes, p => relative(cwd(), p))
}