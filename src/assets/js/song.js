export function createSong(item) {
    return new Song({
        id: item.id,
        singer: filtersSinger(item.ar),
        name: item.name,
        album: item.al.name,
        image: item.al.picUrl
    })
}

function filtersSinger(list){
    let ret = []
    if(!list) {
        return ''
    }
    list.forEach(item => {
        ret.push(item.name)
    })
    return ret.join('/')
}
export default class Song {
    constructor({ id, singer, name, album, image }){
        this.id = id
        this.singer = singer
        this.name = name
        this.album = album
        this.image = image
    }
}