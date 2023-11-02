import { useEffect, useState } from "react"
import "./styles.css";
import RenderIf from "~components/RenderIf";
import Loading from "~components/Loading";
import List from "~components/List";
import Error from "~components/Error";
import Page from "~components/Page";
import type { IWebsite } from "~types";
import { fetchData } from "~utils";

function IndexPopup() {
  const [data, setData] = useState<IWebsite[] | null>(null)
  const [selectedPageName, setSelectedPageName] = useState<string | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchData()
    .then((r: IWebsite[]) => {
      console.log(r)
      setData(r);
    }).catch((e: Error) => {
      console.log(e)
      setError(e);
    });
  }, []);

  const pages = data ? data.map((item) => item.name) : [];
  const selectedPage = data && data.find((item) => item.name === selectedPageName);
  const onBack = () => setSelectedPageName(null);

  return (
    <div className="main-wrapper">
      <RenderIf condition={!data && !error}>
        <Loading/>
      </RenderIf>
      <RenderIf condition={!!error}>
        <Error/>
      </RenderIf>
      <RenderIf condition={!!data && !selectedPageName}>
        <List items={pages} onItemClick={setSelectedPageName}/>
      </RenderIf>
      <RenderIf condition={!!data && !!selectedPageName}>
        <Page 
          name={selectedPage && selectedPage.name}
          messages={selectedPage && selectedPage.messages}
          onBack={onBack}
        />
      </RenderIf>
    </div>
  );
}

export default IndexPopup
