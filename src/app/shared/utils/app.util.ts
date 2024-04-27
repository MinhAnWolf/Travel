const baseUrl$ =  'https://api.ipify.org/?format=json';

export const listPage = [10, 50, 100];

export async function getIPAddress() {
    const result = await fetch(
        baseUrl$,
        {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'GET'
        }
    ).then(res => res.json());
    return result.ip;
}
export function removeVietNameCharacter(str: string) {
    // remove accents
    var from = "àáãảạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệđùúủũụưừứửữựòóỏõọôồốổỗộơờớởỡợìíỉĩịäëïîöüûñçýỳỹỵỷ",
        to   = "aaaaaaaaaaaaaaaaaeeeeeeeeeeeduuuuuuuuuuuoooooooooooooooooiiiiiaeiiouuncyyyyy";
    for (var i=0, l=from.length ; i < l ; i++) {
        str = str.replace(RegExp(from[i], "gi"), to[i]);
    }

    str = str.toLowerCase()
        .trim()
        .replace(/[^a-z0-9\-]/g, '-')
        .replace(/-+/g, '-');

    return str;
}

export const FILE_TYPE = {
    EXCEL: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel',
    EXCEL_EXTENSION: '.xlsx'
};