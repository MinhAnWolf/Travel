export function jsonParse(str: any) {
    if (!str) {
      return null;
    }
    if (typeof str !== 'string') {
      return str;
    }
    return JSON.parse(str);
  }
  
  