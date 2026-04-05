"use client";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [userId, setUserId] = useState("");
  const [spent, setSpent] = useState(0);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("discordId");

    if (id) {
      setUserId(id);

      fetch(process.env.NEXT_PUBLIC_API_URL + "/stats/" + id)
        .then(res => res.json())
        .then(data => setSpent(data?.spent || 0));
    }
  }, []);

  async function buyVIP() {
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/create-payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        amount: 20,
        discordId: userId
      })
    });

    const data = await res.json();
    window.location.href = data.url;
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Dashboard</h1>
      <p>User: {userId}</p>
      <p>Spent: ${spent}</p>
      <button onClick={buyVIP}>Unlock VIP</button>
    </div>
  );
}