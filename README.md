# travel-country-info

CLI tool that provides current travel information (apps, SIM/connectivity, visa requirements, pre-travel forms) for travelers based on citizenship, departure country, and destination.

## Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [Claude CLI](https://docs.anthropic.com/en/docs/claude-cli) installed and in your PATH

## Installation

```bash
# Clone and install globally
git clone https://github.com/anthnykr/travel-country-info.git
cd travel-country-info
npm install -g .

# Or run directly
npx travel-info
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

## What it provides

- **Apps** - Maps, transit, rideshare, payment, food delivery, messaging recommendations with pros/cons
- **SIM/Connectivity** - eSIM options, physical SIM info, local number guidance
- **Visa/Entry** - Requirements based on your citizenship and departure country
- **Pre-Travel** - Required online forms, health requirements

## Disclaimer

This tool uses AI to search for and compile travel information. Always verify with official government sources before traveling. The authors accept no liability for decisions based on this information.

## License

MIT
