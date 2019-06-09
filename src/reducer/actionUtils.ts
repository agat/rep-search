import actions from 'reducer/actions';
import { searchRepositories } from 'api';
import {
    SearchStateI,
    SortT,
    OrderT
} from 'reducer';


const search = async (query: string, sort: SortT, order: OrderT, dispatch: Function) => {
    if (query.trim()) {
        dispatch(actions.apiSearchRepository(query));

        const result = await searchRepositories({
            q: query,
            sort,
            order,
            page: 1
        });

        if (result.items) {
            dispatch(actions.apiSearchRepositorySuccess(result.items, result.total_count));
        } else {
            dispatch(actions.apiFail());
        }
    } else {
        dispatch(actions.clear());
    }
};

const loadMore = async (dispatch: Function, state: SearchStateI) => {
    dispatch(actions.apiGetNextPage());

    const result = await searchRepositories({
        q: state.query,
        sort: state.sort,
        order: state.order,
        page: state.page + 1
    });

    if (result.items) {
        dispatch(actions.apiGetNextSuccess(result.items, result.total_count));
    } else {
        dispatch(actions.apiFail());
    }
};

export default {
    search,
    loadMore
};
