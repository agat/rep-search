/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback } from 'react';
import { useLocalStorageReducer } from 'react-storage-hooks';

import actionUtils from 'reducer/actionUtils';
import {
    reducer,
    SearchInitialState,
    SortT,
    OrderT
} from 'reducer';

import Row from 'components/Row';
import Headline from 'components/Typography/Headline';
import Button from 'components/Button';

import QueryForm from './QueryForm';
import SearchResultTable from './SearchResultTable';

import styles from './App.module.css';
import actions from 'reducer/actions';


const App = () => {
    const [state, dispatch] = useLocalStorageReducer('search', reducer, SearchInitialState);
    const hadnleLoadMoreClick = useCallback(() => actionUtils.loadMore(dispatch, state), [state.query, state.page]);
    const handleSortChange = useCallback((sort: SortT, order: OrderT) => {
        dispatch(actions.changeSorting(sort, order));
        actionUtils.search(state.query, sort, order, dispatch);
    }, [state.query]);

    return (
        <div className={styles.app}>
            <Row>
                <Headline>
                    Repository Search
                </Headline>
            </Row>
            <Row>
                <QueryForm
                    defaultValue={state.query}
                    state={state}
                    dispatch={dispatch}
                />
            </Row>
            {!!state.repositories.length &&
                <Row>
                    <SearchResultTable
                        sort={state.sort}
                        order={state.order}
                        repositories={state.repositories}
                        onChangeSort={handleSortChange}
                    />
                </Row>
            }
            <Row isCentered>
                {state.isFetching &&
                    <Button>
                        Loading...
                    </Button>
                }
                {!state.isFetching && state.repositories.length > 0 &&
                    <Button onClick={hadnleLoadMoreClick}>
                        Load more
                    </Button>
                }
            </Row>
        </div>
    );
}

export default App;
