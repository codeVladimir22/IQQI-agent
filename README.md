<p align="center">
  <img src="assets/banner.png" alt="IQQI-AGENT" width="100%">
</p>

# IQQI-AGENT

<p align="center">
  <strong>Our branded fork of Hermes Agent, prepared as the command-line and desktop agent layer for IQQI.</strong>
</p>

<p align="center">
  <a href="https://github.com/codeVladimir22/IQQI-agent"><img src="https://img.shields.io/badge/Repo-codeVladimir22%2FIQQI--agent-0B1020?style=for-the-badge" alt="Repository"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-189BFF?style=for-the-badge" alt="License: MIT"></a>
  <a href="#phase-1-branding-scope"><img src="https://img.shields.io/badge/Phase-Initial%20Branding-7C3AED?style=for-the-badge" alt="Initial branding phase"></a>
</p>

IQQI-AGENT is the first branding pass over the Hermes Agent fork. The goal of this phase is to make the product read as IQQI while preserving the proven Hermes runtime underneath: package names, Python modules, environment variables, profile paths, and dependency wiring stay intact until we intentionally plan a deeper migration.

The preferred commands now use the IQQI name:

```bash
iqqi              # interactive CLI
iqqi model        # choose provider and model
iqqi tools        # configure enabled tools
iqqi gateway      # start the messaging gateway
iqqi setup        # setup wizard
iqqi update       # update flow
iqqi doctor       # diagnostics
```

The legacy `hermes` commands are still installed as compatibility aliases during this migration phase.

## Phase 1 Branding Scope

This phase is intentionally dependency-safe.

Changed now:

- Public README language and banner.
- Desktop-facing product copy and visible app naming.
- Documentation site title, navbar, footer, and visual palette.
- In-app brand mark used in About and onboarding surfaces.
- Repository-facing metadata where it does not affect package resolution.

Left untouched for later:

- Python package name: `hermes-agent`.
- Python module/package paths: `hermes_cli`, `hermes_constants`, `agent`, `gateway`, etc.
- Legacy CLI aliases: `hermes`, `hermes-agent`, `hermes-acp`.
- Environment variables and profile paths: `HERMES_HOME`, `%LOCALAPPDATA%\hermes`, `~/.hermes`.
- Dependency groups and lockfiles.
- Installer internals that assume the Hermes runtime layout.

This lets us move the image and design toward IQQI-AGENT without breaking install, upgrade, packaging, or provider integrations.

## What IQQI-AGENT Inherits

IQQI-AGENT keeps the Hermes Agent feature set as the base:

| Capability | Included |
| --- | --- |
| Terminal interface | CLI/TUI conversation flow, slash commands, streaming tool output, history, interrupts. |
| Model flexibility | Works with OpenAI-compatible providers, OpenRouter, Anthropic, Gemini, local endpoints, and other configured backends. |
| Tools | Shell, file work, browser/search integrations, MCP, scheduled tasks, and provider-specific tool gateways. |
| Memory and skills | Persistent memory, skill creation, optional skills, bundled skills, and session search. |
| Messaging gateway | Telegram, Discord, Slack, WhatsApp, Signal, email, and other configured platforms. |
| Desktop shell | Electron desktop app with chat, previews, settings, model controls, files, and terminal panels. |

## Install Notes

Until the deeper runtime rename is complete, IQQI-AGENT keeps the existing Hermes runtime paths internally, but the user-facing CLI is now `iqqi`. Legacy `hermes` commands remain available as compatibility aliases.

```bash
curl -fsSL https://raw.githubusercontent.com/codeVladimir22/IQQI-agent/develop/scripts/install.sh | bash
```

Windows PowerShell:

```powershell
iex (irm https://raw.githubusercontent.com/codeVladimir22/IQQI-agent/develop/scripts/install.ps1)
```

Future IQQI-owned distribution endpoint requirements are tracked in [docs/iqqi-distribution.md](docs/iqqi-distribution.md).

After install:

```bash
iqqi
```

For local development:

```bash
git clone https://github.com/codeVladimir22/IQQI-agent.git
cd IQQI-agent
./setup-hermes.sh
./iqqi
```

## Migration Plan

1. Initial IQQI branding: replace visible Hermes/Nous presentation while preserving runtime compatibility.
2. Compatible command rename: add `iqqi`, `iqqi-agent`, and `iqqi-acp` while keeping `hermes*` aliases.
3. Design pass: refine desktop/docs palette, marks, screenshots, and copy into a coherent IQQI-AGENT identity.
4. Runtime path migration analysis: decide when `HERMES_HOME` and `%LOCALAPPDATA%\hermes` can move to IQQI paths with data migration.
5. Package rename: only after dependency, update, ACP, desktop, docs, and profile migration paths are tested.

## Development

The project remains a Python + Node monorepo:

- Core agent/runtime: Python modules at the repo root plus `agent/`, `tools/`, `gateway/`, `hermes_cli/`.
- Desktop app: `apps/desktop`.
- Bootstrap installer: `apps/bootstrap-installer`.
- Web/dashboard/docs surfaces: `web/` and `website/`.
- TUI package: `ui-tui`.

Run targeted checks for the area you change. Avoid renaming runtime files until the deeper migration phase has a compatibility plan.

## License

MIT. See [LICENSE](LICENSE).
