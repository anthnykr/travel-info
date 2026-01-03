#!/usr/bin/env node

import readline from "readline";
import { spawn } from "child_process";

function promptInteractive(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
}

async function main() {
  console.log("\n🌍 Travel Country Info Tool\n");

  let citizenship, departingFrom, destination;

  const args = process.argv.slice(2);
  if (args.length >= 3) {
    citizenship = args[0];
    departingFrom = args[1];
    destination = args[2];
    console.log(`Citizenship: ${citizenship}`);
    console.log(`Departing from: ${departingFrom}`);
    console.log(`Destination: ${destination}`);
  } else {
    citizenship = await promptInteractive("Which country are you from (citizenship)? ");
    departingFrom = await promptInteractive("Which country are you traveling from? ");
    destination = await promptInteractive("Which country are you traveling to? ");
  }

  console.log(`\n🔍 Searching for travel info: ${citizenship} citizen, ${departingFrom} → ${destination}...\n`);

  const now = new Date();
  const currentDate = now.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  const searchPrompt = `Today is ${currentDate}. Search the web for CURRENT travel info for a ${citizenship} citizen traveling from ${departingFrom} to ${destination}. Only use sources from the past 3 months for visa/entry info.

IMPORTANT: Output plain text only. No markdown formatting (no **, no ##, no |pipes|). Use simple indentation and dashes for structure.

1. APPS - For each category, list 2-3 options as:
   AppName: pros / cons (3-5 words each)

   Categories: Maps/navigation, Public transport, Rideshare/taxis, Payment/wallet, Food delivery, Communication/messaging

2. SIM/CONNECTIVITY
   - eSIM options and providers with prices
   - Physical SIM cards: where to buy, cost
   - Getting a local number if needed

3. VISA/ENTRY (${citizenship} passport, departing from ${departingFrom})
   - Visa requirement (yes/no, duration)
   - Key restrictions
   - Any special rules based on departure country
   - Source: [include URL where you found this info]

4. PRE-TRAVEL
   - Online forms/declarations (only if CONFIRMED required - say "none required" if not found)
   - Health requirements (only if CONFIRMED required - say "none required" if not found)
   - Source: [include URL where you found this info]

Be concise. Only include pre-travel requirements you can confirm from official sources - do not guess or assume forms exist.`;

  const claudePath = "claude";
  const claude = spawn(claudePath, ["-p", "--model", "sonnet", "--dangerously-skip-permissions", searchPrompt], {
    stdio: ["inherit", "pipe", "pipe"],
  });

  claude.stdout.on("data", (data) => {
    process.stdout.write(data.toString());
  });

  claude.stderr.on("data", (data) => {
    process.stderr.write(data.toString());
  });

  claude.on("close", (code) => {
    console.log("\n" + "─".repeat(50));
    console.log("⚠️  DISCLAIMER: This info is AI-generated and may be");
    console.log("outdated or inaccurate. Always verify with official");
    console.log("government sources before traveling. The authors accept");
    console.log("no liability for decisions based on this information.");
    console.log("─".repeat(50) + "\n");
    process.exit(code);
  });

  claude.on("error", (err) => {
    console.error("Failed to start Claude:", err);
    process.exit(1);
  });
}

main();
