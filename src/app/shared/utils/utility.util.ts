import { HttpHeaders } from '@angular/common/http';

export const Utility = {
    trackByFn(index: number, item: any) {
        return index;
    },
    httpOptionsJson: {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    },
    isPlatformIOS() {
        return [
            'iPad Simulator',
            'iPhone Simulator',
            'iPod Simulator',
            'iPad',
            'iPhone',
            'iPod'
        ].includes(navigator.platform);
    }
}