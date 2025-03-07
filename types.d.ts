
type Statistics = {
  cpuUsage: number;
  ramUsage: number;
  storageUsage: number;
};

type StaticData = {
  totalStorage: number;
  cpuModel: string;
  totalMemoryGB: number;
};

type View = 'CPU' | 'RAM' | 'STORAGE';

type FrameWindowAction = 'CLOSE' | 'MAXIMIZE' | 'MINIMIZE';



type UnsubscribeFunction = () => void;
  
declare global {
type EventPayloadMapping = {
  statistics: Statistics;
  getStaticData: StaticData;
};




  interface Window {
    electron: {
      subscribeStatistics: (
        callback: (statistics: Statistics) => void
      ) => void;
      getStaticData: () => Promise<StaticData>;
      
    };
  }
}




  export {};
