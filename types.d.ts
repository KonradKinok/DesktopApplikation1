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
};

type Statistics = {
  cpuUsage: number;
  ramUsage: number;
  storageUsage: number;
};
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
    };
  }
}

  export {};
