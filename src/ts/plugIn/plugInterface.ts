interface plugConfig{
    plugList:string[],
    plugMap:plugMap[]
}

interface plugMap{
    name:string,
    path:string,
    type:string
}




export {plugConfig,plugMap};