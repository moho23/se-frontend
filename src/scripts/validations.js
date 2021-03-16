export function emailValidation(value) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(value.toLowerCase());
}

export function passwordValidation(value) {
    const re = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{10,})');
    return re.test(value);
}

export function urlValidation(value) {
    const re = /[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;
    return re.test(value);
}

export function usernameValidation(value) {
    const re = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/i;
    return re.test(value);
}

export function getValidUrl(url = '') {
    let newUrl = window.decodeURIComponent(url);
    newUrl = newUrl.trim().replace(/\s/g, '');

    if (/^(:\/\/)/.test(newUrl)) {
        return `http${newUrl}`;
    }
    if (!/^(f|ht)tps?:\/\//i.test(newUrl)) {
        return `http://${newUrl}`;
    }
    return newUrl;
}
