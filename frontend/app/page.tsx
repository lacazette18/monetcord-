export default function Home() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://YOUR_BACKEND_URL";
  
  return (
    <main style={{ padding: 40 }}>
      <h1>MonetCord</h1>
      <a href={`${apiUrl}/auth/login`}>
        <button>Login with Discord</button>
      </a>
    </main>
  );
}