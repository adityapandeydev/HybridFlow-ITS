import { useState } from 'react';
import { 
  Activity, 
  Camera, 
  Layers, 
  ShieldAlert, 
  Signal
} from 'lucide-react';

export function App() {
  const [activePhase] = useState<string>('North-South');
  const [remainingSec] = useState<number>(24);
  const [emergencyActive] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col font-sans">
      {/* Top Navigation */}
      <header className="border-b border-slate-800 bg-[#0e1424] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center font-bold text-white shadow-md">
            HF
          </div>
          <div>
            <h1 className="text-lg font-semibold tracking-tight text-white m-0">HybridFlow-ITS</h1>
            <p className="text-xs text-slate-400 m-0">Adaptive Traffic Signal Controller & Emergency Preemption Engine</p>
          </div>
        </div>
        <div className="flex items-center space-x-6 text-xs">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-slate-300 font-medium">Core Engine Connected</span>
          </div>
          <div className="text-slate-400">
            Node: <span className="text-slate-200 font-mono">rtx3050-edge-01</span>
          </div>
          <div className="text-slate-400">
            Inference: <span className="text-emerald-400 font-mono">14.2 ms (60 FPS)</span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 p-6 grid grid-cols-1 lg:grid-cols-4 gap-6 max-w-7xl mx-auto w-full">
        {/* Left Column: Intersection Multi-Feed Monitor */}
        <section className="lg:col-span-3 space-y-6">
          {/* Emergency Alert Banner */}
          {emergencyActive ? (
            <div className="bg-red-950/80 border border-red-600 rounded-lg p-4 flex items-center justify-between animate-pulse">
              <div className="flex items-center space-x-3">
                <ShieldAlert className="w-6 h-6 text-red-400" />
                <div>
                  <h3 className="font-semibold text-red-200 m-0">Emergency Vehicle Preemption Active</h3>
                  <p className="text-xs text-red-300 m-0">Green corridor assigned to North Approach. Secondary phases held.</p>
                </div>
              </div>
              <span className="px-3 py-1 bg-red-600 text-white text-xs font-semibold rounded uppercase tracking-wider">
                Priority Override
              </span>
            </div>
          ) : null}

          {/* 4-Way Approach Video Grid */}
          <div className="bg-[#0e1424] border border-slate-800 rounded-lg p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Camera className="w-4 h-4 text-blue-400" />
                <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-300 m-0">
                  Intersection Video Feeds (Approach Multi-Cam)
                </h2>
              </div>
              <span className="text-xs text-slate-400 font-mono">H.264 / ONNX TensorRT Pipeline</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {['North Approach (Incoming)', 'South Approach (Incoming)', 'East Approach (Incoming)', 'West Approach (Incoming)'].map((approach, idx) => (
                <div key={idx} className="relative aspect-video bg-[#070a12] border border-slate-800/80 rounded-md overflow-hidden flex flex-col items-center justify-center p-4">
                  <Camera className="w-8 h-8 text-slate-700 mb-2" />
                  <span className="text-xs text-slate-400 font-medium">{approach}</span>
                  <div className="absolute top-2 left-2 px-2 py-0.5 bg-black/60 backdrop-blur rounded text-[10px] text-slate-300 font-mono">
                    CAM-{idx + 1}
                  </div>
                  <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/60 backdrop-blur rounded text-[10px] text-emerald-400 font-mono">
                    30 FPS
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Real-time PCU & Queue Diagnostics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-[#0e1424] border border-slate-800 rounded-lg p-4">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                <span>North-South PCU Load</span>
                <Layers className="w-4 h-4 text-blue-400" />
              </div>
              <div className="text-2xl font-bold font-mono text-white">38.5 <span className="text-xs font-normal text-slate-400">PCU</span></div>
              <div className="text-xs text-emerald-400 mt-1">High Demand (Active Green Phase)</div>
            </div>

            <div className="bg-[#0e1424] border border-slate-800 rounded-lg p-4">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                <span>East-West PCU Load</span>
                <Layers className="w-4 h-4 text-slate-400" />
              </div>
              <div className="text-2xl font-bold font-mono text-white">12.0 <span className="text-xs font-normal text-slate-400">PCU</span></div>
              <div className="text-xs text-slate-400 mt-1">Moderate Demand (Queue Building)</div>
            </div>

            <div className="bg-[#0e1424] border border-slate-800 rounded-lg p-4">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                <span>Delay Reduction vs Fixed</span>
                <Activity className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-2xl font-bold font-mono text-emerald-400">-34.8%</div>
              <div className="text-xs text-slate-400 mt-1">Webster Minimum Delay Metric</div>
            </div>
          </div>
        </section>

        {/* Right Column: Signal Controller Telemetry */}
        <aside className="space-y-6">
          {/* Active Phase & Dynamic Countdown */}
          <div className="bg-[#0e1424] border border-slate-800 rounded-lg p-5">
            <div className="flex items-center space-x-2 mb-4">
              <Signal className="w-4 h-4 text-emerald-400" />
              <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-300 m-0">Signal Status</h2>
            </div>

            <div className="flex flex-col items-center justify-center p-6 bg-[#070a12] border border-slate-800/80 rounded-lg mb-4">
              <div className="relative w-28 h-28 rounded-full border-4 border-emerald-500/20 flex flex-col items-center justify-center mb-3">
                <span className="text-3xl font-extrabold font-mono text-emerald-400">{remainingSec}</span>
                <span className="text-[10px] uppercase tracking-wider text-slate-400">Seconds</span>
              </div>
              <div className="text-center">
                <span className="inline-block px-3 py-1 bg-emerald-950 border border-emerald-600 text-emerald-300 text-xs font-semibold rounded uppercase tracking-wider">
                  Phase: {activePhase}
                </span>
                <p className="text-xs text-slate-400 mt-2 m-0">Cycle Length: 68s (Webster Optimal)</p>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1.5 border-b border-slate-800">
                <span className="text-slate-400">Phase Allocation</span>
                <span className="text-slate-200 font-mono font-medium">Dynamic PCU Split</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-800">
                <span className="text-slate-400">Yellow Clearance</span>
                <span className="text-slate-200 font-mono">4.0 s</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-slate-400">All-Red Interval</span>
                <span className="text-slate-200 font-mono">2.0 s</span>
              </div>
            </div>
          </div>

          {/* Heterogeneous Vehicle Mix */}
          <div className="bg-[#0e1424] border border-slate-800 rounded-lg p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-300 m-0">Detected Classes</h2>
              <span className="text-[10px] text-slate-400 font-mono">6 Classes</span>
            </div>

            <div className="space-y-2 text-xs">
              {[
                { name: 'Cars', pcu: '1.0', count: 18 },
                { name: 'Three-Wheelers', pcu: '1.0', count: 9 },
                { name: 'Buses', pcu: '3.0', count: 2 },
                { name: 'Trucks', pcu: '3.0', count: 1 },
                { name: 'Motorbikes', pcu: '0.5', count: 14 },
                { name: 'Vans', pcu: '1.0', count: 4 },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between py-1 border-b border-slate-800/60 last:border-0">
                  <span className="text-slate-300">{item.name}</span>
                  <div className="flex items-center space-x-3">
                    <span className="text-[10px] text-slate-400 font-mono">PCU {item.pcu}</span>
                    <span className="font-mono font-semibold text-white w-6 text-right">{item.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-[#070a12] px-6 py-3 text-xs text-slate-400 flex items-center justify-between">
        <div>HybridFlow-ITS v0.1.0-alpha</div>
        <div>Edge Target: NVIDIA RTX 3050 Laptop GPU (CUDA 13.3)</div>
      </footer>
    </div>
  );
}

export default App;
