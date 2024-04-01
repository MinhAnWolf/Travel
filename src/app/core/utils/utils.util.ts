/**
 * Parse json.
 *
 * @param str any
 * @author Nguyễn Huỳnh Đông Triều
 * */
export function jsonParse(str: any) {
    if (!str) {
      return null;
    }
    if (typeof str !== 'string') {
      return str;
    }
    return JSON.parse(str);
  }

export function isNull(value: string):boolean {
  return value === null;
}

