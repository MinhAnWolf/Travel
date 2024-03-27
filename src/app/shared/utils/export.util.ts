import {parseTime} from './convert.util';

export function createFileType(e: string) {
    let fileType = '';
    if (e === 'pdf') {
        fileType = `application/${e}`;
    } else if (e === 'docx') {
        fileType = 'application/msword';
    } else if (e === 'xls') {
        fileType = 'application/vnd.ms-excel';
    } else if (e === 'xlsx') {
        fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    }

    return fileType;
}

export function downLoadFile(data: any, type: string, fileName: string) {
    const date = new Date();
    const blob = new Blob([data], {type});
    if (window.navigator && (window as any).navigator.msSaveOrOpenBlob) {
        (window as any).navigator.msSaveOrOpenBlob(blob, appendExtension(fileName + '_' + parseTime(date.getTime(), '{d}{m}{y}'), type));
    } else {
        const a: any = document.createElement('a');
        a.href = window.URL.createObjectURL(blob);
        a.download = appendExtension(fileName + '_' + parseTime(date.getTime(), '{d}{m}{y}'), type);
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
    }
}

export function downLoadFileWithoutTime(data: any, type: string, fileName: string) {
    const appendedFileName = appendExtension(fileName, type) || 'file'; // Provide a default value if appendExtension returns undefined

    const blob = new Blob([data], {type});
    if (window.navigator && (window as any).navigator.msSaveOrOpenBlob) {
        (window as any).navigator.msSaveOrOpenBlob(blob, appendedFileName);
    } else {
        const a = document.createElement('a');
        a.href = window.URL.createObjectURL(blob);
        a.download = appendedFileName;
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
    }
}


export function viewFile(data: any, type: string, fileName: string) {
    const blob = new Blob([data], {type});
    if (window.navigator && (window as any).navigator.msSaveOrOpenBlob) {
        const date = new Date();
        (window as any).navigator.msSaveOrOpenBlob(blob, appendExtension(fileName + '_' + parseTime(date.getTime(), '{d}{m}{y}'), type));
    } else {
        const fileURL = URL.createObjectURL(blob);
        const win = window.open('about:blank', 'newtab');
        if (win) {
            win.open(fileURL, 'newtab');
        } else {
            // Handle the case where win is null
            console.error("Failed to open new window.");
        }
    }
}


export function appendExtension(name: string, type: string) {
    switch (type) {
        case 'application/pdf':
            return name.concat('.').concat('pdf');
        case 'application/vnd.ms-excel':
            return name.concat('.').concat('xls');
        case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
            return name.concat('.').concat('xlsx');
        case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
            return name.concat('.').concat('docx');
        case 'application/msword':
            return name.concat('.').concat('doc');
        default:
            return name;
    }
}
