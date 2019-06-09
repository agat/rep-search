import React from 'react';

import Table from 'components/Table';
import THeader from 'components/Table/THeader';
import {
    Link,
    Boolean,
    Number,
    Text
} from 'components/Table/Formatters';

import {
    RepositoryI,
    SortT,
    OrderT
} from 'reducer';


type PropsT = {
    repositories: RepositoryI[],
    sort: SortT,
    order: OrderT,
    onChangeSort: (sort: SortT, order: OrderT) => void
};

const SearchResultTable = ({
    repositories,
    sort,
    order,
    onChangeSort
}: PropsT) => (
    <Table>
        <thead>
            <tr>
                <THeader
                    sort={sort}
                    order={order}
                    id="stars"
                    onChangeSort={onChangeSort}
                >
                    Stars
                </THeader>
                <th data-th-name>Name</th>
                <th>Issues</th>
                <THeader
                    sort={sort}
                    order={order}
                    id="forks"
                    onChangeSort={onChangeSort}
                >
                    Forks
                </THeader>
                <th>Has wiki</th>
                <th>Description</th>
            </tr>
        </thead>
        <tbody>
            {repositories.map(({
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
);

export default React.memo(SearchResultTable);
