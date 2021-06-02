export function formatDate(dateStr = '') {
    return dateStr.slice(0, 10);
}

export function textTruncate(str='',maxlength){
    if(str.length<=maxlength || !maxlength){
        return str
    }
    return str.slice(0,maxlength)+' ...';
}