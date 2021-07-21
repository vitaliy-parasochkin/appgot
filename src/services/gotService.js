export default class GotService {
    constructor() {
        this._apiBase = "https://www.anapioficeandfire.com/api";
    }
    getResource = async (url) => {
        const res = await fetch(`${this._apiBase}${url}`);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
        return await res.json();
    }

    getAllCharacters = async () => {
        const res = await this.getResource(`/characters?page=5&pageSize=10`);
        
        return res.map((i) => this._transformCharacter(i))
    }

    getCharacter = async (id) => {
        const res = await this.getResource(`/characters/${id}`);
        return this._transformCharacter(res);
    }

    getAllBooks = async () => {
        const res = await this.getResource(`/books/`);
        
        return res.map((i) => this._transformCharacter(i))
    }

    getBook = async (id) => {
        const res = await this.getResource(`/books/${id}`);
        return this._transformBook(res);
    }

    getAllHouses = async () => {
        const res = await this.getResource(`/houses?page=5&pageSize=10`);
        
        return res.map((i) => this._transformCharacter(i))
    }

    getHouse = async (id) => {
        const res = await this.getResource(`/houses/${id}`);
        return this._transformHouse(res);
    }

    _transformCharacter(char) {
        return {
            id: this._extractId(char),
            name: this._transformValue(char.name) ,
            gender: this._transformValue(char.gender) ,
            born: this._transformValue(char.born) ,
            died: this._transformValue(char.died) ,
            culture: this._transformValue(char.culture) ,
        }
    }

    _transformHouse(house) {
        return {
            id: this._extractId(house),
            name: this._transformValue(house.name) ,
            region: this._transformValue(house.region) ,
            words: this._transformValue(house.words) ,
            titles: this._transformValue(house.titles) ,
            overlord: this._transformValue(house.overlord) ,
            ancestralWeapons: this._transformValue(house.ancestralWeapons) 
        }
    }

    _transformBook(book) {
        return {
            id: this._extractId(book),
            name: this._transformValue(book.name),
            numberOfPages: this._transformValue(book.numberOfPages),
            publiser: this._transformValue(book.publiser),
            released: this._transformValue(book.released),
        }
    }

    _transformValue(value) {
        return value ? value : 'Не известно'
    }

    _extractId = (item) => {
        const idRegExp = /\/([0-9]*)$/;
        return item.url.match(idRegExp)[1];
    }
}
