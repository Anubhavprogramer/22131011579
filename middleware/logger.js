export async function log(stack, level, pkg, message) {
    const stacks = ["backend", "frontend"];
    const levels = ["debug", "info", "warn", "error", "fatal"];
    const backendPackages = [
      "cache", "controller", "cron_job", "db", "domain", "handler", "repository", "route", "service"
    ];
    const frontendPackages = [
      "api", "component", "hook", "page", "state", "style"
    ];
    const commonPackages = ["auth", "config", "middleware", "utils"];
  
    const isValid =
      stacks.includes(stack) &&
      levels.includes(level) &&
      (
        (stack === "backend" && (backendPackages.includes(pkg) || commonPackages.includes(pkg))) ||
        (stack === "frontend" && (frontendPackages.includes(pkg) || commonPackages.includes(pkg)))
      );
  
    if (!isValid) {
      console.warn("Invalid log input:", { stack, level, pkg, message });
      return;
    }
  
    const body = {
      stack,
      level,
      package: pkg,
      message,
    };
  
    try {
      const res = await fetch("http://20.244.56.144/evaluation-service/logs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
  
      if (!res.ok) throw new Error("Failed to log");
      const data = await res.json();
      console.log("📋 Log success:", data.logID);
    } catch (err) {
      console.error("❌ Logging failed:", err.message);
    }
  }