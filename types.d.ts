type StaticData = {
  totalStorage: number;
  cpuModel: string;
  totalMemoryGB: number;
};

type FrameWindowAction = 'CLOSE' | 'MAXIMIZE' | 'MINIMIZE';

type UnsubscribeFunction = () => void;
 
declare global {
type EventPayloadMapping = {
  statistics: Statistics;
  getStaticData: StaticData;
  changeView: View;
  sendFrameAction: FrameWindowAction;
  textTemp: TextTempDataBase;
  fetchDocuments: DictionaryDocuments[];
  queryToDB: DictionaryDocuments;
};

type Statistics = {
  cpuUsage: number;
  ramUsage: number;
  storageUsage: number;
  };
  type TextTempDataBase = {
    textNazwa: string;
  };
   export type DictionaryDocuments={
    DocumentId: number;
    DocumentName: string ;
  }
  
type View = 'CPU' | 'RAM' | 'STORAGE';
type FrameWindowAction = 'CLOSE' | 'MAXIMIZE' | 'MINIMIZE';
  interface Window {
    electron: {
      subscribeStatistics: (
        callback: (statistics: Statistics) => void
      ) => UnsubscribeFunction;
      getStaticData: () => Promise<StaticData>;
      subscribeChangeView: (
      callback: (view: View) => void
      ) => UnsubscribeFunction;
      sendFrameAction: (payload: FrameWindowAction) => void;
      textTemp: () => Promise<TextTempDataBase>;
      fetchDocuments: () => Promise<DictionaryDocuments[]>;
      queryToDB: (query: string) => Promise<DictionaryDocuments>;
    };
  }
}

  export {};
