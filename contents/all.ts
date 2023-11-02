import type { PlasmoCSConfig } from "plasmo";
import type { IWebsite } from "~types";
import { fetchData } from "~utils";

export const config: PlasmoCSConfig = {
  matches: ["<all_urls>"],
  exclude_matches: [
    "https://www.google.com/*",
  ]
}

window.addEventListener("load", async () => {

  const websites: IWebsite[] | undefined = await 
    fetchData().then((r: IWebsite[]) => {
      return r;
    }).catch((e: Error) => {
      return undefined;
    })

  if (!websites) { return; }

  const urls = websites?.map(i => i.url);

  const companyIndex = urls.indexOf(window.location.host);

  if (companyIndex !== -1) {
    const company = websites[companyIndex];
    const messageIndex = Math.floor(Math.random() * company.messages.length);
    const message = company.messages[messageIndex];

    const node = document.createElement("div");

    node.textContent = message;
    node.style.display = "flex";
    node.style.alignItems = "center";
    node.style.justifyContent = "center";
    node.style.height = "100px";
    node.style.fontSize = "24px";
    node.style.backgroundColor = "rgb(177, 232, 179)";

    document.body.prepend(node);
  }
})