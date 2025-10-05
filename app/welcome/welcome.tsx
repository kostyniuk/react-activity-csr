import { useState, Activity } from "react";
import { useSearchParams } from "react-router";
import { SlowComponent } from "./slow-component";
import { SlowComponentBasic } from "./slow-component-basic";

export function Welcome() {
  const [showSlowComponent, setShowSlowComponent] = useState(false);
  const [count, setCount] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const mode = searchParams.get("mode") || "conditional";
  
  const handleModeChange = (newMode: string) => {
    // Navigate to the same page with updated query parameters and force reload
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set('mode', newMode);
    window.location.href = newUrl.toString();
  };
  
  const renderComponent = () => {
    switch (mode) {
      case "conditional": // conditional mode
        return showSlowComponent && <SlowComponentBasic count={count} />;
      
      case "activity": // activity mode with SlowComponentBasic
        return (
          <Activity mode={showSlowComponent ? "visible" : "hidden"}>
            <SlowComponentBasic count={count} />
          </Activity>
        );
      
      case "prefetch": // prefetch mode with SlowComponent
        return (
          <Activity mode={showSlowComponent ? "visible" : "hidden"}>
            <SlowComponent count={count} />
          </Activity>
        );
      
      default:
        // fallback to conditional mode
        return showSlowComponent && <SlowComponentBasic count={count} />;
    }
  };
  
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-4">
      <div className="text-sm text-gray-600 mb-2">
        Current Mode: {mode === "conditional" && "Conditional"}
        {mode === "activity" && "Activity (Basic)"}
        {mode === "prefetch" && "Activity (Prefetch)"}
      </div>
      
      <div className="flex items-center gap-2 mb-4">
        <label htmlFor="mode-select" className="text-sm font-medium">Select Mode:</label>
        <select
          id="mode-select"
          value={mode}
          onChange={(e) => handleModeChange(e.target.value)}
          className="px-3 py-1 border border-gray-300 rounded-md bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="conditional">Conditional</option>
          <option value="activity">Activity (Basic)</option>
          <option value="prefetch">Activity (Prefetch)</option>
        </select>
      </div>
      
      <button className="bg-red-500 text-white p-2 rounded-md" onClick={() => setShowSlowComponent(!showSlowComponent)}>{showSlowComponent ? "Hide Slow Component" : "Show Slow Component"}</button>
      <button className="bg-blue-500 text-white p-2 rounded-md" onClick={() => setCount(count + 1)}>Increment</button>
      <p className="text-3xl">Count: {count}</p>
      <h1 className="text-3xl">Home</h1>
      {renderComponent()}
    </div>
  );
}