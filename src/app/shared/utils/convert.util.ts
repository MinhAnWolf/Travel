import { DATE_FORMAT } from '../constant/IFormat';


export function base64EncodeUnicode(str: string) {
    // first we use encodeURIComponent to get percent-encoded UTF-8,
    // then we convert the percent encodings into raw bytes which
    // can be fed into btoa.
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
        function toSolidBytes(match, p1) {
            return String.fromCharCode(Number('0x' + p1));
        }));
}
export function base64DecodeUnicode(str: string) {
    // Going backwards: from byte stream, to percent-encoding, to original string.
    return decodeURIComponent(atob(str).split('').map((c) => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
}

interface FormatObject {
    u: string | number;
    y: string | number;
    m: string | number;
    d: string | number;
    h: string | number;
    i: string | number;
    s: string | number;
    a: string | number;
}

export function parseTime(time: any, userFormat: any) {
    if (arguments.length === 0) {
        return null;
    }
    const format = userFormat || DATE_FORMAT.DEFAULT_DATE_TIME;
    let date;
    if (typeof time === 'object') {
        date = time;
    } else {
        if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
            time = parseInt(time, 10);
        }
        if ((typeof time === 'number') && (time.toString().length === 10)) {
            time = time * 1000;
        }
        date = new Date(time);
    }
    const formatObj: FormatObject = {
        u: date.getFullYear().toString().substring(2), // get 2 last digits in year
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay()
    };
    return format.replace(/{([uymdhisa])+}/g, (result: any, key: keyof FormatObject) => {
        let value = formatObj[key];
        // Note: getDay() returns 0 on Sunday
        if (key === 'a') {
            return ['Chủ Nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'][value as number];
        }
        if (result.length > 0 && typeof value === 'number' && value < 10) {
            value = '0' + value;
        }
        return value || 0;
    });
}

export function replaceVariable(str:any, replaceWhat:any, replaceTo:any) {
    replaceWhat = replaceWhat.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    const re = new RegExp(replaceWhat, 'g');
    return str.replace(re, replaceTo);
}

export function upperFirstChar(str: string) {
    if (!str || typeof str !== 'string' || str.length === 0) {
        return '';
    }
    return str.charAt(0).toUpperCase() + ((str.length > 1) ? str.substring(1) : '');
}

export function appendJsonToFormData(
    formData: FormData,
    formKeyName: string,
    payload: any
  ) {
    formData.append(
      formKeyName,
      new Blob([JSON.stringify(payload)], { type: 'application/json' })
    );
  }

