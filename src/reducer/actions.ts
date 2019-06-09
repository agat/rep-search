import {
    RepositoryI,
    SortT,
    OrderT
} from './index';


export type ClearActionT = {
    type: 'CLEAR'
};

export const clear = (): ActionT => ({
    type: 'CLEAR'
});


export type ChangeSortingActionT = {
    type: 'CHANGE_SORTING',
    sort: SortT,
    order: OrderT
};

export const changeSorting = (sort: SortT, order: OrderT): ActionT => ({
    type: 'CHANGE_SORTING',
    sort,
    order
});


export type ApiSearchRepositoryActionT = {
    type: 'API_SEARCH',
    query: string
};

export const apiSearchRepository = (query: string): ActionT => ({
    type: 'API_SEARCH',
    query
});


export type ApiSearchRepositorySuccessActionT = {
    type: 'API_SEARCH__SUCCESS',
    totalCount: number,
    repositories: RepositoryI[]
};

export const apiSearchRepositorySuccess = (repositories: RepositoryI[], totalCount: number): ActionT => ({
    type: 'API_SEARCH__SUCCESS',
    totalCount,
    repositories
});


export type ApiGetNextPageActionT = {
    type: 'API_GET_NEXT'
};

export const apiGetNextPage = (): ActionT => ({
    type: 'API_GET_NEXT'
});


export type ApiGetNextSuccessActionT = {
    type: 'API_GET_NEXT__SUCCESS',
    totalCount: number,
    repositories: RepositoryI[]
};

export const apiGetNextSuccess = (repositories: RepositoryI[], totalCount: number): ActionT => ({
    type: 'API_GET_NEXT__SUCCESS',
    totalCount,
    repositories
});


export type ApiFailActionT = {
    type: 'API__FAIL'
};

export const apiFail = (): ActionT => ({
    type: 'API__FAIL'
});


export type ActionT =
    | ChangeSortingActionT
    | ApiSearchRepositoryActionT
    | ApiSearchRepositorySuccessActionT
    | ClearActionT
    | ApiGetNextPageActionT
    | ApiGetNextSuccessActionT
    | ApiFailActionT;

export default {
    clear,
    changeSorting,
    apiSearchRepository,
    apiSearchRepositorySuccess,
    apiGetNextPage,
    apiGetNextSuccess,
    apiFail
};
