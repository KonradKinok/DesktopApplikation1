import { useEffect, useMemo, useState } from "react";
import reactLogo from "./assets/react.svg";

import "./App.css";
import { useStatistics } from "./useStatistics";
import { Chart } from "./Chart";
import { textTemp } from "../electron/dataBase";
function App() {
  const [text, setText] = useState<string | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await window.electron.textTemp();
        console.log("Odpowiedź z serwera:", response);
        setText(response.textNazwa);
      } catch (error) {
        console.error("Błąd podczas pobierania danych:", error);
      }
    };

    fetchData();
  }, []);

  const onClickPodajImie = async () => {
    try {
      const response = await window.electron.textTemp();
      console.log("Odpowiedź z serwera:", response);
      setText(response.textNazwa);
    } catch (error) {
      console.error("Błąd podczas pobierania danych:", error);
    }
  };

  const [count, setCount] = useState(0);
  const statistics = useStatistics(10);
  const [activeView, setActiveView] = useState<View>("CPU");
  const cpuUsages = useMemo(
    () => statistics.map((stat) => stat.cpuUsage),
    [statistics]
  );
  const ramUsages = useMemo(
    () => statistics.map((stat) => stat.ramUsage),
    [statistics]
  );
  const storageUsages = useMemo(
    () => statistics.map((stat) => stat.storageUsage),
    [statistics]
  );
  const activeUsages = useMemo(() => {
    switch (activeView) {
      case "CPU":
        return cpuUsages;
      case "RAM":
        return ramUsages;
      case "STORAGE":
        return storageUsages;
    }
  }, [activeView, cpuUsages, ramUsages, storageUsages]);

  useEffect(() => {
    return window.electron.subscribeChangeView((view) => setActiveView(view));
  }, []);
  return (
    <div className="App">
      <div>
        <Header />
      </div>
      <div style={{ height: 120 }}>
        <Chart data={activeUsages} maxDataPoints={10} />
      </div>
      <div>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Nazwisko1: {text}</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          liczbą jest {count}
        </button>
        <button onClick={onClickPodajImie}>Podaj imię:</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Kliknij na the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default App;

function Header() {
  return (
    <header>
      <button
        id="close"
        onClick={() => window.electron.sendFrameAction("CLOSE")}
      />
      <button
        id="minimize"
        onClick={() => window.electron.sendFrameAction("MINIMIZE")}
      />
      <button
        id="maximize"
        onClick={() => window.electron.sendFrameAction("MAXIMIZE")}
      />
    </header>
  );
}
