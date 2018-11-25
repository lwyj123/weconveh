/**
 * @file refelction function name for utils
 * @author Yuyi Liang <liang.pearce@gmail.com>
 */
export function parseFunctionParameterNames(
    fn: Function
  ): string[] | undefined {
    const groups: RegExpMatchArray | null = fn.toString().match(/^[^{=]*\(([\w\d$-,\s]*)\)/);

    return groups ? groups[1].trim().split(/\s*,\s*/) : undefined;
  }

export function getFunctionParameterName(fn: Function, index: number): string {
    let paramNames: string[] | undefined;

    if ((fn as any).__paramNames) {
      paramNames = (fn as any).__paramNames;
    } else {
      paramNames = (fn as any).__paramNames = parseFunctionParameterNames(fn);
    }

    return (paramNames && paramNames[index]) || `param${index}`;
  }
