# WYYLD MILES — Model Context Protocol (MCP) Server

The **WYYLD MILES MCP Server** connects AI models (Antigravity, Claude, Cursor, ChatGPT, and custom LLM agents) directly to the WYYLD MILES Himalayan travel, rental, and booking infrastructure.

---

## 🛠️ Available MCP Tools (9 Tools)

| Tool Name | Description | Key Parameters |
| :--- | :--- | :--- |
| `search_tour_packages` | Search curated Himalayan circuits (Kashmir, Ladakh, Himachal, Spiti). | `region`, `travelStyle`, `maxBudgetINR`, `minDurationDays` |
| `get_package_details` | Retrieve day-by-day itineraries, inclusions, exclusions, and starting rates. | `slugOrId` (e.g. `"kashmir-paradise-circuit"`) |
| `search_adventure_bikes` | Discover adventure motorcycles (Royal Enfield Himalayan 450, Classic 350, KTM 390 ADV). | `brand`, `maxDailyRateINR` |
| `compare_adventure_bikes` | Compare technical specs side-by-side for up to 3 bikes (cc, BHP, torque, fuel tank, ABS, deposit). | `bikeSlugs` (e.g. `["royal-enfield-himalayan-450", "ktm-390-adventure"]`) |
| `search_car_rentals` | Search 4x4 vehicles & passenger transport (Mahindra Thar 4x4, Scorpio-N, Innova Crysta). | `category`, `selfDriveOnly`, `minSeats` |
| `search_stays_and_houseboats` | Search Dal Lake cedar houseboats, ski chalets in Gulmarg, and apple orchard cottages. | `state`, `propertyType`, `maxPricePerNightINR` |
| `list_himalayan_destinations` | List destinations with altitudes, best travel seasons, weather, and popular activities. | `state` (`"Kashmir"`, `"Ladakh"`, `"Himachal"`, `"Uttarakhand"`) |
| `create_booking_enquiry` | Record a formal booking request in the persistent database, generating a reference code (`WM-2026-XXXX`). | `type`, `itemTitle`, `customerName`, `customerEmail`, `customerPhone`, `startDate`, `endDate`, `guestsCount` |
| `track_enquiry_status` | Retrieve live enquiry status (`PENDING`, `UNDER_REVIEW`, `CONFIRMED`, `CANCELLED`) and notes. | `reference` (e.g. `"WM-2026-9340"`), `customerEmail` |

---

## 🚀 How to Run the MCP Server

### 1. Stdio Transport (Local CLI & Agent Configuration)

Run directly via Node.js or npm:

```bash
# Via npm script
npm run mcp

# Or directly with Node
node scripts/mcp-server.js
```

### 2. Antigravity Configuration (`mcp_config.json`)

Already configured in `~/.gemini/config/mcp_config.json` and `.agents/mcp_config.json`:

```json
{
  "mcpServers": {
    "wyld-miles": {
      "command": "node",
      "args": [
        "C:\\Users\\sshek\\.gemini\\antigravity\\scratch\\wyld-miles\\scripts\\mcp-server.js"
      ],
      "env": {
        "NODE_ENV": "production"
      }
    }
  }
}
```

### 3. Claude Desktop / Claude Code Configuration

Add to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "wyld-miles": {
      "command": "node",
      "args": [
        "C:\\Users\\sshek\\.gemini\\antigravity\\scratch\\wyld-miles\\scripts\\mcp-server.js"
      ]
    }
  }
}
```

### 4. Streamable HTTP / JSON-RPC 2.0 Endpoint

The Next.js server also serves an HTTP endpoint:

- **Endpoint URL**: `http://localhost:3000/api/mcp`
- **GET**: Returns server metadata, protocol version, and the full schema of all 9 tools.
- **POST**: Accepts JSON-RPC 2.0 requests (`initialize`, `tools/list`, `tools/call`).

#### Example Tool Call via cURL / PowerShell:

```bash
curl -X POST http://localhost:3000/api/mcp \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "tools/call",
    "params": {
      "name": "search_adventure_bikes",
      "arguments": { "brand": "Royal Enfield" }
    }
  }'
```
