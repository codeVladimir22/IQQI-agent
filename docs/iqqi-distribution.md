# IQQI-AGENT Distribution

This phase moves public installation and bootstrap URLs behind IQQI-owned domains.

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
