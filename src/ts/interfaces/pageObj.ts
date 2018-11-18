import Entry from './entry'

enum Type{
    Page,
    Title,
    Content,
    Search
}




interface PageObj{
    entry?:Entry[],
    type?:Type,
    url?:string
}


export default PageObj;