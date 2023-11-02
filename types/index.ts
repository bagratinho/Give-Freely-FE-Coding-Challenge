
export interface IRemoteData {
  record: {
    websites: IWebsite[];
  }
}

export interface IWebsite {
  url: string;
  name: string;
  messages: string[];
}