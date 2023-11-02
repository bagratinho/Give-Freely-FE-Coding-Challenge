import type { PlasmoCSConfig } from "plasmo"
import * as url from "~assets/bell.png";
import type { IWebsite } from "~types";
import { fetchData } from "~utils";

export const config: PlasmoCSConfig = {
  matches: ["https://www.google.com/search*"]
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

  function updateDOM() {
    document.querySelectorAll(".MjjYud > .g:not(.modified)").forEach((elem) => {
      for (const item of urls) {
        const requiredNode = elem.querySelector(`a[href^="https://${item}"]`);
        if (requiredNode && elem.firstChild) {
          elem.style.borderRadius = "15px";
          elem.style.boxShadow = "rgb(255, 255, 255) 0px 0px 0px 6px, rgb(177, 232, 179) 0px 0px 0px 12px, rgba(0, 0, 0, 0.33) 0px 0px 10px 10px";
          elem.style.cursor = "pointer";
          break;
        }
      }
      elem.classList.add("modified");
    });
  }

  function addBell() {
    const node = document.createElement("div");
    const img = document.createElement("img");
    img.src = url;
    img.style.height = "40px";
    img.style.width = "40px";
    node.style.padding = "10px";
    node.style.position = "fixed";
    node.style.display = "flex";
    node.style.alignItems = "center";
    node.style.justifyContent = "center";
    node.style.cursor = "pointer";
    node.style.left = "10px";
    node.style.top = "calc(50% - 25px)";
    node.style.backgroundColor = "rgb(177, 232, 179)";
    node.style.borderRadius="50%";
    node.append(img);
    node.addEventListener("click", showRandomMessage);
    document.querySelector(".CvDJxb > .Q3DXx").prepend(node);
  }

  function showRandomMessage() {
    const companyIndex = Math.floor(Math.random() * urls.length);
    const company = websites[companyIndex];
    const messageIndex = Math.floor(Math.random() * company.messages.length);
    const message = company.messages[messageIndex];

    const node = document.createElement("div");
    const modal = document.createElement("div");
    const modalN1 = document.createElement("div");
    const modalN2 = document.createElement("div");
    const modalN3 = document.createElement("div");

    modal.style.padding = "20px";
    modal.style.width = "300px";
    modal.style.background = "white";
    modal.style.borderRadius = "20px";
    modal.style.textAlign = "center";

    modalN1.style.fontSize = "18px";
    modalN2.style.fontSize = "12px";
    modalN2.style.color = "#ccc";
    modalN2.style.marginBottom = "10px";
    modalN3.style.fontSize = "14px";

    modalN1.textContent = company.name;
    modalN2.textContent = company.url;
    modalN3.textContent = message;
    
    node.style.position = "fixed";
    node.style.zIndex = "1000000";
    node.style.display = "flex";
    node.style.alignItems = "center";
    node.style.justifyContent = "center";
    node.style.left = "0";
    node.style.top = "0";
    node.style.right = "0";
    node.style.bottom = "0";
    node.style.backgroundColor = "rgba(0, 0, 0, 0.2)";

    modal.append(modalN1);
    modal.append(modalN2);
    modal.append(modalN3);
    node.append(modal);

    node.addEventListener("click", () => {
      node.remove();
    })
    modal.addEventListener("click", (e) => {
      e.stopPropagation();
    })

    document.body.prepend(node);
  }

  updateDOM();
  addBell()

  const callback = () => {
    updateDOM();
  };

  const centerCol = document.getElementById("center_col");
  const observer = new MutationObserver((callback));
  
  observer.observe(
    centerCol, 
    { 
      childList: true, 
      subtree: true 
    }
  );
})