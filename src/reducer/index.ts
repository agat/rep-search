import {
    ActionT
} from './actions';

export interface RepositoryI {
    id: string
    name: string
    description: string
    html_url: string
    has_wiki: boolean
    forks_count: number
    open_issues_count: number
    stargazers_count: number
};

export type SortT = 'stars' | 'forks' | 'score';
export type OrderT = 'desc' | 'asc';

export interface SearchStateI {
    query: string
    page: number
    sort: SortT,
    order: OrderT,
    totalCount: number
    repositories: RepositoryI[]
    isFetching: boolean
}

export const SearchInitialState: SearchStateI = {
    query: '',
    page: 0,
    sort: 'score',
    order: 'desc',
    totalCount: 0,
    repositories: [],
    isFetching: false
}

export const reducer = (state: SearchStateI, action: ActionT): SearchStateI => {
    switch (action.type) {
        case 'CLEAR': {
            return {
                ...SearchInitialState
            };
        }
        case 'CHANGE_SORTING': {
            return {
                ...state,
                sort: action.sort,
                order: action.order
            };
        }
        case 'API_SEARCH': {
            return {
                ...state,
                totalCount: 0,
                query: action.query,
                page: 1,
                repositories: [],
                isFetching: true
            };
        }
        case 'API_GET_NEXT': {
            return {
                ...state,
                page: state.page + 1,
                isFetching: true
            };
        }
        case 'API_GET_NEXT__SUCCESS':
        case 'API_SEARCH__SUCCESS': {
            return {
                ...state,
                totalCount: action.totalCount,
                repositories: [
                    ...state.repositories,
                    ...action.repositories
                ],
                isFetching: false
            };
        }
        case 'API__FAIL': {
            return {
                ...state,
                isFetching: false
            };
        }
        default:
            return state;
    }
};
