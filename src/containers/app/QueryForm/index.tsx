import React, { useCallback, useRef } from 'react';
import { AnyAction, Dispatch } from 'redux';

import Input from 'components/Input';
import actions from 'store/reducer/actions';

import {
    SearchStateI
} from 'store/reducer';

type PropsT = {
    defaultValue: string,
    state: SearchStateI,
    dispatch: Dispatch<AnyAction>
};

const QueryForm = ({
    defaultValue,
    dispatch,
    state
}: PropsT) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const handleFormSubmit = useCallback((e: React.FormEvent) => {
        e.preventDefault();

        if (inputRef.current && !state.isFetching) {
            const query = inputRef.current.value;
            // @ts-ignore
            dispatch(actions.search(query, state.sort, state.order));
        }
    }, [inputRef, state.isFetching, state.sort, state.order, dispatch]);
    const handleInputBlur = useCallback(() => handleQueryBlurEvent(inputRef.current, state.query), [inputRef, state.query]);

    return (
        <form onSubmit={handleFormSubmit}>
            <Input
                ref={inputRef}
                defaultValue={defaultValue}
                onBlur={handleInputBlur}
                placeholder="Type anything here..."
            />
            <button
                type="submit"
                hidden
            ></button>
        </form>
    );
};

const handleQueryBlurEvent = (inputRef: HTMLInputElement | null, query: string) => {
    if (inputRef) {
        const q = inputRef.value;

        if (!q.trim()) {
            inputRef.value = query;
        }
    }
};

export default React.memo(QueryForm);
