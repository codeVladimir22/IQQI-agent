# IQQI-AGENT Distribution

This phase moves public installation and bootstrap URLs behind IQQI-owned domains.

## What is required

To make the public URLs work, IQQI needs three pieces:

| Piece | Required for | Notes |
| --- | --- | --- |
| DNS control for `iqqi.ai` | `install.iqqi.ai` and `git.iqqi.ai` | Add records where the domain is managed. |
| A static/proxy service | Installer scripts, archives, bootstrap scripts | Cloudflare Worker, Cloudflare Pages, Vercel, S3 + CDN, or any HTTPS service works. |
| A Git mirror or HTTPS proxy | Clone/update remotes | `git.iqqi.ai` can be a GitHub Enterprise/mirror, a reverse proxy, or a later private distribution service. |

If DNS is not ready, deploy the proxy under a provider URL first, such as a Cloudflare `*.workers.dev` URL, then set `IQQI_INSTALL_BASE_URL` to that temporary endpoint for tests.

## Public install commands

Linux, macOS, WSL, VPS:

```bash
curl -fsSL https://install.iqqi.ai/agent.sh | bash
```

Windows PowerShell:

```powershell
iex (irm https://install.iqqi.ai/agent.ps1)
```

Windows CMD:

```cmd
curl -fsSL https://install.iqqi.ai/agent.cmd -o install.cmd && install.cmd && del install.cmd
```

## Required routes

`install.iqqi.ai` should serve these routes:

| Route | Purpose |
| --- | --- |
| `/agent.sh` | Current Unix installer script. |
| `/agent.ps1` | Current Windows PowerShell installer script. |
| `/agent.cmd` | Current Windows CMD wrapper. |
| `/scripts/<ref>/install.sh` | Bootstrap installer fetch for a branch, tag, or commit ref. |
| `/scripts/<ref>/install.ps1` | Bootstrap installer fetch for a branch, tag, or commit ref. |
| `/archive/<commit>.zip` | Commit-pinned source archive fallback. |
| `/archive/refs/tags/<tag>.zip` | Tag-pinned source archive fallback. |
| `/archive/refs/heads/<branch>.zip` | Branch source archive fallback. |
| `/releases/<tag>` | Release notes/link target used by the CLI banner. |

`git.iqqi.ai` should expose:

| URL | Purpose |
| --- | --- |
| `https://git.iqqi.ai/IQQI-agent.git` | Default HTTPS clone/update remote. |
| `git@git.iqqi.ai:iqqi/IQQI-agent.git` | Default SSH clone/update remote. |

## Local overrides

Installers support environment overrides while the IQQI distribution endpoints are being deployed:

| Variable | Used by |
| --- | --- |
| `IQQI_INSTALL_BASE_URL` | PowerShell installer archive fallback base URL. |
| `IQQI_REPO_URL_HTTPS` | HTTPS clone/update remote. |
| `IQQI_REPO_URL_SSH` | SSH clone/update remote. |

Keep the public commands stable even if the backend implementation changes from GitHub proxying to signed release bundles.

## Consumable proxy template

The repository includes a Cloudflare Worker template:

```text
packaging/iqqi-distribution/cloudflare-worker.mjs
packaging/iqqi-distribution/wrangler.example.toml
packaging/iqqi-distribution/iqqi-distribution.env.example
```

The Worker serves:

```text
https://install.iqqi.ai/agent.sh
https://install.iqqi.ai/agent.ps1
https://install.iqqi.ai/agent.cmd
https://install.iqqi.ai/scripts/<ref>/install.sh
https://install.iqqi.ai/scripts/<ref>/install.ps1
```

It can proxy the current repository while keeping the user-facing install command clean. When release bundles are ready, replace the upstream implementation behind the same routes.

## DNS shape

Recommended DNS records:

| Host | Type | Target |
| --- | --- | --- |
| `install.iqqi.ai` | CNAME | Worker/CDN/custom hosting target. |
| `git.iqqi.ai` | CNAME | Git mirror/proxy hosting target. |

For Cloudflare Workers, attach a route like:

```toml
routes = [
  { pattern = "install.iqqi.ai/*", zone_name = "iqqi.ai" }
]
```

For temporary testing without DNS:

```toml
workers_dev = true
```

Then use the generated `https://<worker>.<account>.workers.dev` URL as the temporary installer base.
