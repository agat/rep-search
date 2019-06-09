import { AnyAction, Dispatch } from 'redux';
import { searchRepositories } from 'api';
import {
    SearchStateI,
    RepositoryI,
    SortT,
    OrderT
} from 'store/reducer/';


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


export const search = (query: string, sort: SortT, order: OrderT) => {
    return async (dispatch: Dispatch<AnyAction>) => {
        if (query.trim()) {
            dispatch(apiSearchRepository(query));

            const result = await searchRepositories({
                q: query,
                sort,
                order,
                page: 1
            });

            if (result.items) {
                dispatch(apiSearchRepositorySuccess(result.items, result.total_count));
            } else {
                dispatch(apiFail());
            }
        } else {
            dispatch(clear());
        }
    };
};

export const loadMore = () => {
    return async (dispatch: Dispatch<AnyAction>, getState: () => SearchStateI) => {
        const state = getState();

        dispatch(apiGetNextPage());

        const result = await searchRepositories({
            q: state.query,
            sort: state.sort,
            order: state.order,
            page: state.page + 1
        });

        if (result.items) {
            dispatch(apiGetNextSuccess(result.items, result.total_count));
        } else {
            dispatch(apiFail());
        }
    };
};

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
    apiFail,
    search,
    loadMore
};
