import { useState, Activity } from "react";
import { SlowComponent } from "./slow-component";

export function Welcome() {

  const [showSlowComponent, setShowSlowComponent] = useState(false);
  const [count, setCount] = useState(0);
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-4">
      <button className="bg-red-500 text-white p-2 rounded-md" onClick={() => setShowSlowComponent(!showSlowComponent)}>{showSlowComponent ? "Hide Slow Component" : "Show Slow Component"}</button>
      <button className="bg-blue-500 text-white p-2 rounded-md" onClick={() => setCount(count + 1)}>Increment</button>
      <p className="text-3xl">Count: {count}</p>
      <h1 className="text-3xl">Home</h1>
      <Activity mode={showSlowComponent ? "visible" : "hidden"}>
        <SlowComponent count={count} />
      </Activity>
    </div>
  );
}