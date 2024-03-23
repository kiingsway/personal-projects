import React from 'react';
import { FixedSizeList } from "react-window";
import styles from './VirtualizedList.module.scss';
import classNames from 'classnames';

interface IRowRendererProps {
  index: number;
  style: React.CSSProperties;
}

// eslint-disable-next-line no-unused-vars
export type TRowRenderer = ({ index, style }: IRowRendererProps) => JSX.Element;

interface Props {
  rowRenderer: TRowRenderer;
  rowCount: number;
}

export default function VirtualizedList({ rowCount, rowRenderer }: React.PropsWithChildren<Props>): JSX.Element {

  const [width, height] = [1000, 700];

  return (
    <div className={classNames([styles.Main, styles.AppScroll])}>
      <FixedSizeList
        width={width}
        height={height}
        itemCount={rowCount}
        itemSize={86}
      >
        {rowRenderer}
      </FixedSizeList>
    </div>
  );
}