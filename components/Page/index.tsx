import { useEffect, useState } from "react"

interface IPageProps {
  name: string;
  messages: string[];
  onBack: () => void;
}

export default function Page(props: IPageProps) {
  return (
    <div className="page-wrapper">
      <div className="page-name">
        <button className="back-button" onClick={props.onBack}><span>&#10140;</span></button>
        <h3>{props.name}</h3>
      </div>
      <div className="message-list">
        {props.messages.map((msg: string, index: number) => (
          // not the greatest idea to use index as key, would have used a lib like uuid or similar in a real world project
          <div className="message" key={`msg-${index}`}>{msg}</div>
        ))}
      </div>
    </div>
  );
}

