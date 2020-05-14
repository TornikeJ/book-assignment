import { Action } from '@ngrx/store';
import { IBookModel } from '../../model/bookModel';

export const ADD_TO_FAVORITE = 'ADD_TO_FAVORITE';
export const REMOVE_FROM_FAVORITE = 'REMOVE_FROM_FAVORITE';
export const RELOAD_STATE = 'RELOAD_STATE';


export class AddToFavorite implements Action {
    readonly type = ADD_TO_FAVORITE;

    constructor(public payload: IBookModel) {

    }
}


export class RemoveFromFavorite implements Action {
    readonly type = REMOVE_FROM_FAVORITE;

    constructor(public payload: string) {

    }
}

export class ReloadState implements Action {
    readonly type = RELOAD_STATE;

    constructor() {

    }
}

export type BookActions = AddToFavorite | RemoveFromFavorite | ReloadState;
