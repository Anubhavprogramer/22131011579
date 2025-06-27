// utils/auth.js
export async function getAccessToken() {
    const res = await fetch("http://20.244.56.144/evaluation-service/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "anubhav.22scse1011606@galgotiasuniversity.edu.in",
        name: "anubhav dubey",
        rollNo: "22131011579",
        accessCode: "Muagvq",
        clientID: "839577a4-4472-47d2-b318-ce04359efe0b",
        clientSecret: "AVHPNzejywBgxCnj"
      })
    });
  
    if (!res.ok) throw new Error("Auth failed");
    const data = await res.json();
    return data["access token"];
  }
