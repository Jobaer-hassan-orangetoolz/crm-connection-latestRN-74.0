import Diff from './diff-base';

export const characterDiff = new Diff();
export function diffChars(oldStr: any, newStr: any, options?: any) {
  return characterDiff.diff(oldStr, newStr, options);
}
