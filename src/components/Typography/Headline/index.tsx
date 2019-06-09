import React from 'react';

import styles from './Headline.module.css';


type HeadlineT = React.HTMLProps<HTMLHeadingElement>;

const Headline = ({
    children,
    ...props
}: HeadlineT) => (
    <h2
        className={styles.headline}
        {...props}
    >
        {children}
    </h2>
);

export default React.memo<HeadlineT>(Headline);
