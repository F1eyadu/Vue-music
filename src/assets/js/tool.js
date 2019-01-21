import storage from 'good-storage'

const SEARCH_KEY = '_search_'
const SEARCH_MAX_LENGTH = 15

export function  shuffle(arr) {
    let _arr = arr.slice()
    for(let i=0; i<_arr.length;i++) {
        let j = gerRandomInt(0, i)
        let t = _arr[i]
        _arr[i] = _arr[j]
        _arr[j] = t
    }
    return _arr
}

function gerRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

export function debounce(func, time) {
    let timer
    return function (...args) {
        if(timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            func.apply(this, args)
        }, time);
    }
}

function insertArray (arr, val, compose, maxLen) {
    const index = arr.findIndex(compose)
    if(index === 0) {
        return
    }
    if( index > 0) {
        arr.splice(index ,1)
    }
    arr.unshift(val)
    if(maxLen && arr.length > maxLen) {
        arr.pop()
    }
}
export function saveSearch(query) {
    let searches = storage.get(SEARCH_KEY, [])
    insertArray(searches, query, (item) => {
        return item === query
    }, SEARCH_MAX_LENGTH)
    storage.set(SEARCH_KEY, searches)
    return searches
}

export function loadSearch() {
   return storage.get(SEARCH_KEY, []) 
}


function deleteFromArray (arr, compose) {
    const index = arr.findIndex(compose)
    if( index > -1) {
        arr.splice(index, 1)
    }
}
export function deleteSearch(query) {
    let searches = storage.get(SEARCH_KEY, [])
    deleteFromArray(searches, (item) => {
        return item === query
    })
    storage.set(SEARCH_KEY, searches)
    return searches
}

export function clearSearch() {
    storage.remove(SEARCH_KEY)
    return []
}