import { useState } from "react";
import "./index.css";

export default function App() {
  const [year, setYear] = useState(160);
  const [pressure, setPressure] = useState(30);
  const [em1Ratio, setEm1Ratio] = useState(30);
  const [himuRatio, setHimuRatio] = useState(70);
  const [status, setStatus] = useState("🌋 火山稳定中");

  function nextTurn(action) {
    const newYear = year - 10;
    let newPressure = pressure;
    let newEm1 = em1Ratio;
    let newHimu = himuRatio;

    if (action === "release") {
      newPressure = Math.max(pressure - 15, 0);
    } else if (action === "seal") {
      newPressure = Math.min(pressure + 10, 100);
    } else if (action === "deepen") {
      newEm1 = Math.min(em1Ratio + 5, 100);
      newHimu = Math.max(himuRatio - 5, 0);
    }

    if (newPressure >= 80) {
      setStatus("⚠️ 压力过高！崩塌风险极大");
    } else if (newPressure <= 20) {
      setStatus("🟢 压力释放良好");
    } else {
      setStatus("🌋 火山稳定中");
    }

    setYear(newYear);
    setPressure(newPressure);
    setEm1Ratio(newEm1);
    setHimuRatio(newHimu);
  }

  return (
    <div className="p-4 max-w-xl mx-auto space-y-4">
      <div className="bg-white shadow-md rounded-lg p-4">
        <h1 className="text-xl font-bold">火山守护者：佛古岛的命运</h1>
        <p>年份：公元前 {year},000 年</p>
        <p className="text-sm text-gray-600">{status}</p>
        <div className="mt-4">
          <label className="block mb-1">🌡️ 岩浆压力</label>
          <div className="w-full bg-gray-200 h-4 rounded-full">
            <div
              className="bg-red-500 h-4 rounded-full"
              style={{ width: `${pressure}%` }}
            ></div>
          </div>
          <p className="mt-2">🧪 HIMU 成分：{himuRatio}% | EM1 成分：{em1Ratio}%</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        <button onClick={() => nextTurn("release")} className="bg-blue-500 text-white px-4 py-2 rounded">释放岩浆</button>
        <button onClick={() => nextTurn("seal")} className="bg-yellow-500 text-white px-4 py-2 rounded">封闭浅储层</button>
        <button onClick={() => nextTurn("deepen")} className="bg-green-600 text-white px-4 py-2 rounded">加深地幔通道</button>
      </div>
    </div>
  );
}
