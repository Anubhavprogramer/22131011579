// middleware/logger.js
import { getAccessToken } from "./auth.js";

let token = null;

export async function log(stack, level, pkg, message) {
  if (!token) {
    token = await getAccessToken();
  }

  const isValidStack = ["backend", "frontend"].includes(stack);
  const isValidLevel = ["debug", "info", "warn", "error", "fatal"].includes(level);
  const backendPackages = [
    "cache", "controller", "cron_job", "db", "domain", "handler", "repository", "route", "service"
  ];
  const frontendPackages = [
    "api", "component", "hook", "page", "state", "style"
  ];
  const commonPackages = ["auth", "config", "middleware", "utils"];
  const isValidPackage =
    (stack === "backend" && (backendPackages.includes(pkg) || commonPackages.includes(pkg))) ||
    (stack === "frontend" && (frontendPackages.includes(pkg) || commonPackages.includes(pkg)));

  if (!isValidStack || !isValidLevel || !isValidPackage) {
    console.warn("🚨 Invalid log:", { stack, level, pkg, message });
    return;
  }

  try {
    const res = await fetch("http://20.244.56.144/evaluation-service/logs", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ stack, level, package: pkg, message })
    });

    const data = await res.json();
    console.log("✅ Log ID:", data.logID);
  } catch (err) {
    console.error("❌ Failed to send log:", err.message);
  }
}