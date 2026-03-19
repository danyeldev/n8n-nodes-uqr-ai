# n8n-nodes-uqr-ai

[![n8n](https://img.shields.io/badge/n8n-community%20node-orange)](https://n8n.io/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

This is an n8n community node for [uqr.ai](https://uqr.ai) - a dynamic QR code API that allows you to create, manage, and track QR codes.

## Features

- **Create QR Codes** - Generate QR codes for websites, text, email, vCard, WiFi, phone, SMS, location, PDF, images, files, links, galleries, and MP3
- **Update QR Codes** - Modify content, name, domain, status, design, and more
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
2. Select **QR Code** resource → **Create** operation
3. Choose the **QR Type** (Website, Text, Email, vCard, WiFi, etc.)
4. Fill in the required fields for the chosen type
5. Optionally configure:
   - **Name**: Display name for the QR code
   - **Short Link Domain**: Custom domain for short links (e.g. `uqr.sh`)
   - **Options**: QR code design (colors, dot styles, logo, frame)
   - **Folder ID**: Organize into folders
   - **UTM Parameters**: Source, medium, campaign tracking

### Supported QR Types

| Type | Required Fields |
|------|----------------|
| Website (URL) | `url` |
| Text | `text` |
| Email | `email` (+ optional `subject`, `body`) |
| vCard (Contact) | At least one of `first_name`, `last_name`, `phone` |
| WiFi | `ssid` (+ optional `password`, `security`) |
| Phone | `phone` |
| SMS | `phone` (+ optional `message`) |
| Location | `latitude`, `longitude` |
| PDF | `pdf_title`, `pdf_download_url` |
| Image Gallery | `image_gallery_title`, `image_gallery_images` (JSON) |
| Image | `image_title`, `image_download_url` |
| File | `file_title`, `file_download_url` |
| List of Links | `links_title`, `links_list` (JSON) |
| MP3 | `mp3_title`, `mp3_file_url` |

### Update a QR Code

1. Select **QR Code** → **Update**
2. Enter the **QR Code ID**
3. Configure update fields:
   - **Name**: Change display name
   - **URL** / **Text**: Update content
   - **Short Link Domain**: Change the short link domain
   - **Status**: Activate or deactivate
   - **Options**: Update QR design
   - **UTM Parameters**: Update tracking params

### Get QR Code Details

1. Select **QR Code** → **Get**
2. Enter the **QR Code ID**
3. Response includes `short_url`, `short_link_domain`, `image`, and all QR data

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

- [uqr.ai API Docs](https://uqr.ai/api-docs)

## Resources

- [n8n Community Nodes Documentation](https://docs.n8n.io/integrations/community-nodes/)
- [uqr.ai Website](https://uqr.ai)
- [uqr.ai API Documentation](https://uqr.ai/api-docs)

## License

MIT - See [LICENSE](./LICENSE) for details.

## Support

For issues or questions:

- [GitHub Issues](https://github.com/danyeldev/n8n-nodes-uqr-ai/issues)
- [uqr.ai Support](https://uqr.ai/support)

---

Built with ❤️ for the n8n community.
