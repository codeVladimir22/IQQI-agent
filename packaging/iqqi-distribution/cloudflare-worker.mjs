const DEFAULT_REF = "develop";
const SCRIPT_NAMES = new Set(["install.sh", "install.ps1", "install.cmd"]);

function envValue(env, key, fallback) {
  const value = env && typeof env[key] === "string" ? env[key].trim() : "";
  return value || fallback;
}

function safeRef(ref) {
  return /^[A-Za-z0-9._/-]{1,120}$/.test(ref);
}

function upstreamConfig(env) {
  const owner = envValue(env, "UPSTREAM_REPO_OWNER", "codeVladimir22");
  const repo = envValue(env, "UPSTREAM_REPO_NAME", "IQQI-agent");
  const defaultRef = envValue(env, "DEFAULT_REF", DEFAULT_REF);
  return {
    defaultRef,
    rawBase: `https://raw.githubusercontent.com/${owner}/${repo}`,
    githubBase: `https://github.com/${owner}/${repo}`,
  };
}

function scriptResponse(url, contentType) {
  return fetch(url, {
    headers: { "User-Agent": "iqqi-agent-distribution/1.0" },
    cf: { cacheTtl: 300, cacheEverything: true },
  }).then((response) => {
    const headers = new Headers(response.headers);
    headers.set("Content-Type", contentType);
    headers.set("Cache-Control", "public, max-age=300");
    headers.set("X-IQQI-Distribution", "agent");
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  });
}

async function handleRequest(request, env) {
  const url = new URL(request.url);
  const path = url.pathname.replace(/\/+$/, "") || "/";
  const cfg = upstreamConfig(env);

  if (path === "/agent.sh") {
    return scriptResponse(`${cfg.rawBase}/${cfg.defaultRef}/scripts/install.sh`, "text/x-shellscript; charset=utf-8");
  }

  if (path === "/agent.ps1") {
    return scriptResponse(`${cfg.rawBase}/${cfg.defaultRef}/scripts/install.ps1`, "text/plain; charset=utf-8");
  }

  if (path === "/agent.cmd") {
    return scriptResponse(`${cfg.rawBase}/${cfg.defaultRef}/scripts/install.cmd`, "text/plain; charset=utf-8");
  }

  const scriptMatch = path.match(/^\/scripts\/(.+)\/([^/]+)$/);
  if (scriptMatch) {
    const ref = scriptMatch[1];
    const scriptName = scriptMatch[2];
    if (!safeRef(ref) || !SCRIPT_NAMES.has(scriptName)) {
      return new Response("Invalid script request\n", { status: 400 });
    }
    return scriptResponse(`${cfg.rawBase}/${ref}/scripts/${scriptName}`, "text/plain; charset=utf-8");
  }

  if (path.startsWith("/archive/")) {
    const archivePath = path.slice("/archive/".length);
    if (!safeRef(archivePath) || !archivePath.endsWith(".zip")) {
      return new Response("Invalid archive request\n", { status: 400 });
    }
    return Response.redirect(`${cfg.githubBase}/archive/${archivePath}`, 302);
  }

  if (path.startsWith("/releases/")) {
    const tag = path.slice("/releases/".length);
    if (!safeRef(tag)) {
      return new Response("Invalid release request\n", { status: 400 });
    }
    return Response.redirect(`${cfg.githubBase}/releases/tag/${tag}`, 302);
  }

  return new Response("IQQI-AGENT distribution endpoint\n", {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}

export default {
  fetch: handleRequest,
};
