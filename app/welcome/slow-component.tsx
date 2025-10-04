import { useState } from "react";
export function SlowComponent({ count }: { count: number }) {
  const [internalCount, setInternalCount] = useState(0);    
  console.log(`Rendering Slow Component, internalCount: ${internalCount}, external count: ${count}`);
  return (
    <>
      <h1 className="text-3xl font-bold">Slow Component</h1>
      <button className="bg-blue-500 text-white p-2 rounded-md" onClick={() => setInternalCount(internalCount + 1)}>Increment Internal Count</button>
      <p className="text-3xl">Internal Count: {internalCount}</p>
    </>
  );
}