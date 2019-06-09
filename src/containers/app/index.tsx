/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useRef } from 'react';
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
import Table from 'components/Table';
import THeader from 'components/Table/THeader';
import Button from 'components/Button';
import {
    Link,
    Boolean,
    Number,
    Text
} from 'components/Table/Formatters';

import styles from './App.module.css';
import actions from 'reducer/actions';


const App = () => {
    const [state, dispatch] = useLocalStorageReducer('search', reducer, SearchInitialState);
    const inputRef = useRef<HTMLInputElement>(null);
    const handleFormSubmit = useCallback((e: React.FormEvent) => {
        e.preventDefault();

        if (inputRef.current) {
            const query = inputRef.current.value;

            actionUtils.search(query, state.sort, state.order, dispatch);
        }
    }, [inputRef]);
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
                    <Table>
                        <thead>
                            <tr>
                                <THeader
                                    sort={state.sort}
                                    order={state.order}
                                    id="stars"
                                    onChangeSort={handleSortChange}
                                >
                                    Stars
                                </THeader>
                                <th data-th-name>Name</th>
                                <th>Issues</th>
                                <THeader
                                    sort={state.sort}
                                    order={state.order}
                                    id="forks"
                                    onChangeSort={handleSortChange}
                                >
                                    Forks
                                </THeader>
                                <th>Has wiki</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {state.repositories.map(({
                                id,
                                stargazers_count,
                                name,
                                open_issues_count,
                                has_wiki,
                                forks_count,
                                html_url,
                                description
                            }) => (
                                <tr key={id}>
                                    <td>
                                        <Number
                                            val={stargazers_count}
                                        />
                                    </td>
                                    <td>
                                        <Link
                                            href={html_url}
                                        >
                                            {name}
                                        </Link>
                                    </td>
                                    <td data-hidden-on-small-screen>
                                        <Number
                                            val={open_issues_count}
                                        />
                                    </td>
                                    <td data-hidden-on-small-screen>
                                        <Number
                                            val={forks_count}
                                        />
                                    </td>
                                    <td data-hidden-on-small-screen>
                                        <Boolean
                                            val={has_wiki}
                                        />
                                    </td>
                                    <td data-hidden-on-small-screen>
                                        <Text>
                                            {description}
                                        </Text>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
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
