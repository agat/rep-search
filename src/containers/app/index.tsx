/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useRef, useEffect } from 'react';
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
import Input from 'components/Input';
import Button from 'components/Button';

import SearchResultTable from './SearchResultTable';

import styles from './App.module.css';
import actions from 'reducer/actions';


const App = () => {
    const [state, dispatch] = useLocalStorageReducer('search', reducer, SearchInitialState);
    const inputRef = useRef<HTMLInputElement>(null);
    const handleFormSubmit = useCallback((e: React.FormEvent) => {
        e.preventDefault();

        if (inputRef.current && !state.isFetching) {
            const query = inputRef.current.value;

            actionUtils.search(query, state.sort, state.order, dispatch);
        }
    }, [inputRef, state.isFetching, state.sort, state.order]);
    const handleInputBlur = useCallback(() => handleQueryBlurEvent(inputRef.current, state.query), [inputRef, state.query]);
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
                <form onSubmit={handleFormSubmit}>
                    <Input
                        ref={inputRef}
                        defaultValue={state.query}
                        onBlur={handleInputBlur}
                        placeholder="Type anything here..."
                    />
                    <button
                        type="submit"
                        hidden
                    ></button>
                </form>
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

const handleQueryBlurEvent = (inputRef: HTMLInputElement | null, query: string) => {
    if (inputRef) {
        const q = inputRef.value;

        if (!q.trim()) {
            inputRef.value = query;
        }
    }
};

export default App;
