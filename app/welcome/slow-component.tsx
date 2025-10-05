import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchMessage, MESSAGE_QUERY_KEY } from "../api/fetch-message";

export function SlowComponent({ count }: { count: number }) {
  const [internalCount, setInternalCount] = useState(0);

  const { data, error, isFetching } = useQuery({
    queryKey: MESSAGE_QUERY_KEY,
    queryFn: fetchMessage,
  });

  console.log(data, isFetching, error);

  useEffect(() => {
    console.log(`Mounting Slow Component with external count: ${count}, internal count: ${internalCount}`);

    return () => {
      console.log(`Unmounting Slow Component with external count: ${count}, internal count: ${internalCount}`);
    };
  }, [count]);
  
  console.log(`Rendering Slow Component, internalCount: ${internalCount}, external count: ${count}`);
  return (
    <>
      <h1 className="text-3xl font-bold">Slow Component (Prefetch)</h1>
      <button className="bg-green-500 text-white p-2 rounded-md" onClick={() => setInternalCount(internalCount + 1)}>Increment Internal Count</button>
      <p className="text-3xl">Internal Count: {internalCount}</p>
      
      {isFetching && (
        <div className="text-yellow-500 text-2xl">
          ⏳ Loading data...
        </div>
      )}
      
      {data && (
        <div className="text-green-500 text-2xl">
          ✅ {data.title}
        </div>
      )}
    </>
  );
}