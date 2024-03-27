import { UntypedFormGroup } from '@angular/forms';

export const ErrorCode = {
    SUCCESS: '0',
    OTP: 'OTP',
    LIST_OTP: ['67', '68', '69', '60'],
    WAITING_PROCESS: '9006',
    INVALID_BALANCE: '9007',
    OTHER_WAITING_PROCESS: '0001'
};

export const MaxLength = {
    NAME: 70,
    CODE: 20,
    PLACE: 30,
    EXT_NO: 35, // số tài khoản ngoài
    INT_NO: 16, // số tài khoản trong
    CARD_NO: 19, // số thẻ
    DATE: 10
};

export const Pattern = {
    TEXT_PATTERN: `[0-9A-Za-z()---+="'/.,;:\\ ]*`,
    ALPHANUMERIC_PATTERN: `[0-9A-Za-z]*`,
    NUMBER_PATTERN: `\\d+`,
    DECIMAL_NUMBER: `[\\d]{1,20}([\\.|\\,]\\d{1,2})?`,
    PHONE_NUMBER: `^(09|03|07|08|05)([0-9]{8})$`,
	FAX_NUMBER: `\\+?[0-9]{7,10}`,
	TAX_CODE: `\\d{10}(\\d{2})?`,
    DATE_PATTERN: `^(0[1-9]|[12][0-9]|3[01])/(0[1-9]|1[0-2])/\\d{4}$`,
};

export const ValidatorType = {
    required: 'REQUIRED',
    maxLength: 'MAX_LENGTH',
    minLength: 'MIN_LENGTH',
    textPattern: 'TEXT_PATTERN',
    numberPattern: 'NUMBER_PATTERN',
    alphaPattern: 'ALPHANUMERIC_PATTERN',
    negativeNumber: 'NEGATIVE_NUMBER'
};

export class NgModelValidator {
    param: any;
    type: Array<string>;
    maxLength?: number;
    minLength?: number;
}

export function ValidatorNgModel(payload: Array<NgModelValidator>) {
    return payload.some(validator => {
        let flag = false;
        for (const type of validator.type) {
            switch (type) {
                case ValidatorType.required:
                    flag = checkRequired(validator.param);
                    break;
                case ValidatorType.maxLength:
                    flag = checkMaxLength(validator.param, validator.maxLength || 0);
                    break;
                case ValidatorType.minLength:
                    flag = checkMinLength(validator.param, validator.minLength || 0);
                    break;
                case ValidatorType.textPattern:
                    flag = checkUnsignedTextPattern(validator.param);
                    break;
                case ValidatorType.numberPattern:
                    flag = checkNumberPattern(validator.param);
                    break;
                case ValidatorType.alphaPattern:
                    flag = checkAlphaPattern(validator.param);
                    break;
                case ValidatorType.negativeNumber:
                    flag = checkNegativeNumber(validator.param);
                    break;
            }
            if (flag) {
                return true;
            }
        }
        return false;
    });
}


export function checkRequired(param: any) {
    if (typeof param === 'number') {
        return false;
    }
    if (!param || Object.keys(param).length === 0) {
        return true;
    }
    return param.length === 0;
}

export function checkFileRequired(param: any) {
    return param === null || !param;
}

export function checkMaxLength(param: any, length: number) {
    if (param) {
        return param.length > length;
    }
    return false;
}

export function checkPattern(param: any, pattern: any) {
    if (param) {
        const regex = new RegExp(pattern);
        return !regex.test(param);
    }
    return false;
}

export function checkNumberPattern(param: any) {
    if (param) {
        const regex = new RegExp('^' + Pattern.NUMBER_PATTERN + '$');
        return !regex.test(param);
    }
    return false;
}

export function checkUnsignedTextPattern(param: any) {
    if (param) {
        const regex = new RegExp('^' + Pattern.TEXT_PATTERN + '$');
        return !regex.test(param);
    }
    return false;
}

export function checkAlphaPattern(param: any) {
    if (param) {
        const regex = new RegExp('^' + Pattern.ALPHANUMERIC_PATTERN + '$');
        return !regex.test(param);
    }
    return false;
}

export function checkMinLength(param: any, length: number) {
    if (!param || Object.keys(param).length === 0) {
        return true;
    }
    return param.length < length;
}

export function checkNegativeNumber(param: any) {
    if (isNaN(param)) {
        return true; // không phải loại số bắt validate
    }
    return param <= 0;
}

export function strEqual(str1:any, str2:any) {
    if (!str1 || !str2) {
        return false;
    }
    return str1.trim() === str2.trim();
}

export function startsWithByParam(str: string, lStr: string[]) {
    if (!str || !lStr) {
        return false;
    }
    return lStr.some(elem => str.startsWith(elem));
}

export function strEqualIgnoreCase(str1:any, str2:any) {
    if (!str1 || !str2) {
        return false;
    }
    return str1.trim().toUpperCase() === str2.trim().toUpperCase();
}

export function isObjEmpty(obj:any) {
    if (!obj) {
        return true;
    }
    return Object.keys(obj).length === 0;
}

export function isEmpty(str:any) {
    if (!str) {
        return true;
    }
    if (typeof str !== 'string') {
        str = str.toString();
    }
    return str.trim().length === 0;
}

export function appToString(str:any) {
    if (!str) {
        return '';
    }
    if (typeof str !== 'string') {
        str = str.toString();
    }
    return str.trim();
}

export function isInvalidParam(param:any) {
    if (!param) {
        return true;
    }
    return param?.trim().length === 0;
}

export function checkNumber(e: any) {
    e = (e) ? e : window.event;
    const charCode = (e.which) ? e.which : e.keyCode;
    return !(charCode > 31 && charCode !== 190 && charCode !== 188 && (charCode < 48 || charCode > 57));
}



export function createDatePicker(dateString:any) {
    // Parse the date parts to integers
    const parts = dateString.split('/');
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10);
    const year = parseInt(parts[2], 10);
    return {
        day, month, year
    };
}

// Password and consirm password match
export function MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: UntypedFormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors['mustMatch']) { 
            return;
        }

        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ 'mustMatch': true });
        } else {
            matchingControl.setErrors(null);
        }
    };
}


export const AppValidator = {

    CAPACITY: 'MB',

    /*Kích thước file cho phép upload*/
    MAX_SIZE_FILE_UPLOAD: 50, // MB

    /*Kích thước file cho phép upload kho tài liệu*/
    MAX_SIZE_FILE_UPLOAD_ADMIN: 100, // MB

    /*Kích thước file cho phép upload*/
    MAX_SIZE_IMAGE_UPLOAD: 10, // MB

    /*độ dài tối da input code*/
    CODE_MAXLENGTH: 32,

    /*độ dài tối da input text*/
    TEXT_MAXLENGTH: 256,

    /*file chấp nhận trên fontend*/
    ACCEPT_EXCEL: '.xlsx, .xls',

    /*file chấp nhận trên fontend*/
    ACCEPT_IMAGE: 'image/*',

    /*file chấp nhận trên fontend*/
    ACCEPT_WORD: '.doc, .docx',

    ACCEPT_ADMIN_DOC: '.zip,.rar,.7zip,.xlsx,.xls,.doc,.docx,.ppt,.pptx,.pdf,image/*,.xml,text/plain',

    /*fortmat so nguyen(, => 10,000,000)*/
    PATTERN_NUMBER: '1.0',

    /*fortmat so le(, => 10,000,000.10)*/
    PATTERN_NUMBER_DECIMAL: '1.2-2',

    /*fortmat tien(10,000,000 đ)*/
    CURRENCY: 'VND',
    LOCALE: 'vi',

    ACCEPT_OFFICE: '.xlsx,.xls,.doc,.docx,.ppt,.pptx,.pdf,image/*',

    checkExcelFile(file: File) {
        return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' === file.type || 'application/vnd.ms-excel' === file.type;
    },

    checkExcelFileWithExtension(file: File) {
        if (['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel'].some(elem => elem === file.type)) {
            return true;
        }
        // Cover trường hợp sử dụng excel file của các office khác như Libre Office
        const fileExtension = file.name.split('.');
        const extension = fileExtension[fileExtension.length - 1];
        return ['xlsx', 'xls'].some(elem => elem === extension);
    },

    checkUploadFileAdminTool(file: File) {
        const dots = file.name.split('.');
        const fileType = '.' + dots[dots.length - 1];
        const type = ['.zip', '.rar', '.7zip', '.xlsx', '.xls', '.doc', '.docx', '.ppt', '.pptx', '.pdf', '.jpg', '.png', '.xml', '.txt'];
        return type.indexOf(fileType) > -1;
    },

    checkSizeFileUploadAdminTool(file: File) {
        return (file.size / 1024 / 1024) < this.MAX_SIZE_FILE_UPLOAD_ADMIN;
    },

    checkSizeFileUpload(file: File) {
        return (file.size / 1024 / 1024) < this.MAX_SIZE_FILE_UPLOAD;
    },

    checkUploadFileOffice(file: File) {
        const dots = file.name.split('.');
        const fileType = '.' + dots[dots.length - 1];
        const type = ['.xlsx', '.xls', '.doc', '.docx', '.ppt', '.pptx', '.pdf', '.jpg', '.png'];
        return type.indexOf(fileType) > -1;
    },

    checkUploadFileImage(file: File) {
        const dots = file.name.split('.');
        const fileType = '.' + dots[dots.length - 1];
        const type = ['.jpg', '.png'];
        return type.indexOf(fileType) > -1;
    }

};
