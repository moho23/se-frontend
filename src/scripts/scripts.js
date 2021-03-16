export function s_to_mmss(time = 0) {
    const second = time % 60;
    const min = Math.floor(time / 60);
    return (min < 10 ? '0' + min : min) + ':' + (second < 10 ? '0' + second : second);
}

export function numbersSeparator(num, sep) {
    const number = typeof num === 'number' ? num.toString() : num,
        separator = typeof sep === 'undefined' ? ',' : sep;
    return number.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1' + separator);
}
