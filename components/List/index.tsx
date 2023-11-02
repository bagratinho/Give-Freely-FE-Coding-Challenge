import { useEffect, useState } from "react"
import NoResults from "./NoResults";

interface IListProps {
  items: string[];
  onItemClick: (page: string) => void;
}

export default function List(props: IListProps) {
  const clickHandler = (page: string) => () => props.onItemClick(page);

  return props.items.length ? (
    <div className="list-wrapper">
      {props.items.map(item => {
        return (
          <div onClick={clickHandler(item)}>
            {item}
          </div>
        );
      })}
    </div>
  ) : (
    <NoResults/>
  );
}

