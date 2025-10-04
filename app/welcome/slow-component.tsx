import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
export function SlowComponent({ count }: { count: number }) {

  const { data, isLoading, error } = useQuery({
    queryKey: ["slowComponent"],
    queryFn: () => fetch("https://jsonplaceholder.typicode.com/posts/1").then(res => res.json()),
  });

  console.log(data, isLoading, error);

  useEffect(() => {
    console.log(`Mounting Slow Component with external count: ${count}, internal count: ${internalCount}`);

    return () => {
      console.log(`Unmounting Slow Component with external count: ${count}, internal count: ${internalCount}`);
    };
  }, [count]);
  const [internalCount, setInternalCount] = useState(0);    
  console.log(`Rendering Slow Component, internalCount: ${internalCount}, external count: ${count}`);
  return (
    <>
      <h1 className="text-3xl font-bold">Slow Component</h1>
      <button className="bg-blue-500 text-white p-2 rounded-md" onClick={() => setInternalCount(internalCount + 1)}>Increment Internal Count</button>
      <p className="text-3xl">Internal Count: {internalCount}</p>
      <p className="text-3xl">Data: {data?.title}</p>
    </>
  );
}