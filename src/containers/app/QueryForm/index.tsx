import React, { useCallback, useRef } from 'react';

import Input from 'components/Input';
import actionUtils from 'reducer/actionUtils';

import {
    SearchStateI
} from 'reducer';

type PropsT = {
    defaultValue: string,
    state: SearchStateI,
    dispatch: Function
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

            actionUtils.search(query, state.sort, state.order, dispatch);
        }
    }, [inputRef, state.isFetching, state.sort, state.order]);
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
