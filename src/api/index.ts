import queryString from 'query-string';

import {
    RepositoryI,
    SortT,
    OrderT
} from 'reducer';

type SearchParamsT = {
    q: string,
    sort: SortT,
    order: OrderT,
    page: number,
    per_page?: number
};

type SearchResultsT = {
    items: RepositoryI[],
    total_count: number
};

export const searchRepositories = async (params: SearchParamsT) => {
    params.per_page = 50;

    const result: SearchResultsT = await fetch(`https://api.github.com/search/repositories?${queryString.stringify(params)}`)
        .then(response => response.json());

    return result;
};
