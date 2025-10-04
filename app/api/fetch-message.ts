// Slow API call function with 5 second delay
export async function fetchMessage() {
  console.log("🔄 Starting slow API call...");
  await new Promise(resolve => setTimeout(resolve, 5000)); // Wait 5 seconds
  console.log("✅ API call completed!");
  const response = await fetch("https://jsonplaceholder.typicode.com/posts/1");
  return response.json();
}

export const MESSAGE_QUERY_KEY = ["message"] as const;
