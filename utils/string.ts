/**
 * @file string utils
 * @author Yuyi Liang <liang.pearce@gmail.com>
 */
import * as stripAnsi from 'strip-ansi';

export type TableRow = (string | undefined)[];

export function buildTableOutput(
  rows: TableRow[],
  {separators = '  ' as string | string[], indentNum = 0 as string | number}: any = {}
): string {
  const maxTextLengths: number[] = [];

  for (const row of rows) {
    let lastNoneEmptyIndex = 0;

    for (let i = 0; i < row.length; i++) {
      const text = row[i] || '';
      const textLength = stripAnsi(text).length;

      if (textLength) {
        lastNoneEmptyIndex = i;
      }

      if (maxTextLengths.length > i) {
        maxTextLengths[i] = Math.max(maxTextLengths[i], textLength);
      } else {
        maxTextLengths[i] = textLength;
      }
    }

    row.splice(lastNoneEmptyIndex + 1);
  }

  const indentStr =
    typeof indentNum === 'string' ? indentNum : new Array(indentNum + 1).join(' ');

  return (
    // tslint:disable-next-line:prefer-template
    rows
      .map(row => {
        let line = indentStr;

        for (let i = 0; i < row.length; i++) {
          const text = row[i] || '';
          const textLength = stripAnsi(text).length;

          const maxLength = maxTextLengths[i];

          line += text;
          line += new Array(maxLength - textLength + 1).join(' ');

          if (i < row.length - 1) {
            if (typeof separators === 'string') {
              line += separators;
            } else {
              line += separators[i];
            }
          }
        }

        return line;
      })
      .join('\n') + '\n'
  );
}

export function indent(text: string, indent: number | string): string {
  const indentStr =
    typeof indent === 'string'
      ? indent.replace(/\r/g, '')
      : Array(indent + 1).join(' ');

  return text.replace(/^/gm, indentStr);
}
