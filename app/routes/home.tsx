import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import { queryClient } from "../query-client";
import { fetchMessage, MESSAGE_QUERY_KEY } from "../api/fetch-message";
import { dehydrate } from "@tanstack/react-query";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export async function loader() {
  console.log("🚀 Prefetching data in loader...");
  await queryClient.prefetchQuery({ 
    queryKey: MESSAGE_QUERY_KEY, 
    queryFn: fetchMessage,
  });
  const data = await queryClient.getQueryData(MESSAGE_QUERY_KEY) as { title: string };
  console.log("📦 Prefetched data:", data);
  
  // Dehydrate the query cache to pass to client
  const dehydratedState = dehydrate(queryClient);
  
  return { dehydratedState };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return <Welcome dehydratedState={loaderData.dehydratedState} />;
}
