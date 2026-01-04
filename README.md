# travel-info

CLI tool that provides current travel information (apps, SIM/connectivity, visa requirements, pre-travel forms) for travelers based on citizenship, departure country, and destination.

## Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [Claude CLI](https://docs.anthropic.com/en/docs/claude-cli) installed and in your PATH

## Installation

```bash
npm install -g travel-info
```

Or clone and install locally:

```bash
git clone https://github.com/anthnykr/travel-info.git
cd travel-info
npm install -g .
```

## Usage

### Interactive mode

```bash
travel-info
```

You'll be prompted for:
1. Your citizenship country
2. Country you're departing from
3. Destination country

### Command-line arguments

```bash
travel-info <citizenship> <departing-from> <destination>

# Example
travel-info "United States" "United States" "Japan"
```

### Options

- `--verbose`, `-v`: Show the full prompt sent to Claude

## What it provides

- **Apps** - Maps, transit, rideshare, payment, food delivery, messaging recommendations with pros/cons
- **SIM/Connectivity** - eSIM options, physical SIM info, local number guidance
- **Visa/Entry** - Requirements based on your citizenship and departure country
- **Pre-Travel** - Required online forms, health requirements

## How it works

Uses Claude CLI with only `WebSearch` and `WebFetch` tools enabled (all others blocked, including MCP servers).

## Disclaimer

**For informational purposes only. Not legal or official travel advice.**

This tool uses AI to search for and compile travel information. Information may be outdated or incorrect. Always verify with official government sources before traveling:
- US: [travel.state.gov](https://travel.state.gov)
- UK: [gov.uk/foreign-travel-advice](https://gov.uk/foreign-travel-advice)
- EU: [europa.eu/youreurope/citizens/travel](https://europa.eu/youreurope/citizens/travel)

The authors accept no liability for decisions based on this information.

## License

MIT
