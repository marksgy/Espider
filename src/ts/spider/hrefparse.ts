function hrefparse(mainhref:string, href:string):string {
    if (href.indexOf('http') == -1) {
        if (href.indexOf('/') != 0) {
            href = '/' + href;
        }
        return mainhref.slice(0, mainhref.indexOf('/', 8)) + href
    }
    return href

}

export default hrefparse