/* eslint-disable react-hooks/exhaustive-deps */
import React, { PureComponent } from 'react';
import { Dispatch, AnyAction } from 'redux';
import { connect } from 'react-redux';

import {
    SearchStateI,
    SortT,
    OrderT
} from 'store/reducer';

import Row from 'components/Row';
import Headline from 'components/Typography/Headline';
import Button from 'components/Button';

import QueryForm from './QueryForm';
import SearchResultTable from './SearchResultTable';

import styles from './App.module.css';
import actions from 'store/reducer/actions';

type PropsT = SearchStateI & {
    dispatch: Dispatch<AnyAction>
};

class App extends PureComponent<PropsT> {
    handleSortChange = (sort: SortT, order: OrderT) => {
        const {
            dispatch,
            ...state
        } = this.props;

        dispatch(actions.changeSorting(sort, order));
        // @ts-ignore
        dispatch(actions.search(state.query, sort, order));
    };

    hadnleLoadMoreClick = () => {
        const {
            dispatch
        } = this.props;

        // @ts-ignore
        dispatch(actions.loadMore());
    };

    render () {
        const {
            dispatch,
            ...state
        } = this.props;

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
                            onChangeSort={this.handleSortChange}
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
                        <Button onClick={this.hadnleLoadMoreClick}>
                            Load more
                        </Button>
                    }
                </Row>
            </div>
        );
    }
}

export default connect((state: SearchStateI) => state)(App);
