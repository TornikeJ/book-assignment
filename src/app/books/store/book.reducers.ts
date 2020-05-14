import { IBookModel } from '../../model/bookModel';
import * as BookActions from './book.actions';

export interface State {
    books: IBookModel[]
}

const storage = JSON.parse(localStorage.getItem('favoriteBooks'))
let favoriteBooks;

if (storage) {
    favoriteBooks = storage['books'];
} else {
    favoriteBooks = [];
}


const initialState: State = {
    books: [...favoriteBooks]
}


export function bookReducer(state = initialState, action: BookActions.BookActions) {
    switch (action.type) {
        case BookActions.RELOAD_STATE:
            return {
                books: [...state.books]
            };
        case BookActions.ADD_TO_FAVORITE:
            localStorage.setItem('favoriteBooks', JSON.stringify({ books: [...state.books, action.payload] }));
            return {
                books: [...state.books, action.payload]
            };
        case BookActions.REMOVE_FROM_FAVORITE:
            const booksUpdated = [...state.books.filter((books) => {
                return books.id !== action.payload;
            })];

            localStorage.setItem('favoriteBooks', JSON.stringify({ books: booksUpdated }));

            return {
                books: booksUpdated
            };
        default:
            return state;
    }
}

