# n8n-nodes-uqr-ai

[![n8n](https://img.shields.io/badge/n8n-community%20node-orange)](https://n8n.io/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

This is an n8n community node for [uqr.ai](https://uqr.ai) - a dynamic QR code API that allows you to create, manage, and track QR codes.

## Features

- **Create QR Codes** - Generate static or dynamic QR codes with custom styling
- **Update QR Codes** - Modify content of dynamic QR codes without changing the code itself
- **List QR Codes** - Get all your QR codes with pagination
- **Get QR Code** - Retrieve details of a specific QR code
- **Delete QR Codes** - Remove QR codes from your account
- **Analytics** - Track scans and get detailed statistics

## Installation

### Community Node (Recommended)

1. Go to **Settings** → **Community Nodes** in your n8n instance
2. Click **Install** and enter: `n8n-nodes-uqr-ai`
3. Restart n8n

### Manual Installation

```bash
npm install n8n-nodes-uqr-ai
```

## Setup

### 1. Get Your API Key

1. Sign up at [uqr.ai](https://uqr.ai)
2. Go to your dashboard → API Settings
3. Generate a new API key (starts with `uqr_`)

### 2. Configure Credentials in n8n

1. Open n8n → **Credentials** → **New**
2. Search for **uqr.ai API**
3. Enter your API key
4. Save

## Usage

### Create a QR Code

1. Add the **uqr.ai** node to your workflow
2. Select **QR Code** resource
3. Select **Create** operation
4. Configure:
   - **Content**: URL or text to encode
   - **Name**: Optional name for the QR code
   - **Dynamic**: Check for editable QR codes
   - **Additional Fields**: Size, colors, error correction, logo

### Update a QR Code

1. Select **QR Code** → **Update**
2. Enter the **QR Code ID**
3. Provide new **Content** or **Name**

### Get QR Code Details

1. Select **QR Code** → **Get**
2. Enter the **QR Code ID**

### List All QR Codes

1. Select **QR Code** → **List**
2. Optionally set **Limit** or check **Return All**

### Delete a QR Code

1. Select **QR Code** → **Delete**
2. Enter the **QR Code ID**

### Get Scan Analytics

1. Select **QR Code** → **Get Scans** or **Analytics** → **Get Scans**
2. Enter the **QR Code ID** (optional for Analytics resource)
3. Optionally set date range

## Example Workflows

### Generate QR Code from Form Submission

```
[Webhook] → [uqr.ai: Create QR Code] → [Send Email]
```

### Track QR Code Scans Daily

```
[Schedule Trigger] → [uqr.ai: Get Scans] → [Google Sheets: Append]
```

### Update QR Code Content

```
[Webhook] → [uqr.ai: Update QR Code] → [Slack: Send Message]
```

## API Reference

For detailed API documentation, visit:

- [uqr.ai API Docs](https://uqr.ai/docs/api)

## Resources

- [n8n Community Nodes Documentation](https://docs.n8n.io/integrations/community-nodes/)
- [uqr.ai Website](https://uqr.ai)
- [uqr.ai API Documentation](https://uqr.ai/docs/api)

## License

MIT - See [LICENSE](./LICENSE) for details.

## Support

For issues or questions:

- [GitHub Issues](https://github.com/danyeldev/n8n-nodes-uqr-ai/issues)
- [uqr.ai Support](https://uqr.ai/support)

---

Built with ❤️ for the n8n community.
