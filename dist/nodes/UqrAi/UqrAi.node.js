"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UqrAi = void 0;
class UqrAi {
    constructor() {
        this.description = {
            displayName: 'uqr.ai',
            name: 'uqrAi',
            icon: 'file:logo.png',
            group: ['transform'],
            version: 1,
            subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
            description: 'Create and manage dynamic QR codes with uqr.ai',
            defaults: {
                name: 'uqr.ai',
            },
            inputs: ['main'],
            outputs: ['main'],
            credentials: [
                {
                    name: 'uqrAiApi',
                    required: true,
                },
            ],
            properties: [
                // ─── Resource ───
                {
                    displayName: 'Resource',
                    name: 'resource',
                    type: 'options',
                    noDataExpression: true,
                    options: [
                        {
                            name: 'QR Code',
                            value: 'qrCode',
                        },
                        {
                            name: 'Analytics',
                            value: 'analytics',
                        },
                    ],
                    default: 'qrCode',
                },
                // ─── QR Code Operations ───
                {
                    displayName: 'Operation',
                    name: 'operation',
                    type: 'options',
                    noDataExpression: true,
                    displayOptions: {
                        show: {
                            resource: ['qrCode'],
                        },
                    },
                    options: [
                        {
                            name: 'Create',
                            value: 'create',
                            description: 'Create a new QR code',
                            action: 'Create a QR code',
                        },
                        {
                            name: 'Delete',
                            value: 'delete',
                            description: 'Delete a QR code',
                            action: 'Delete a QR code',
                        },
                        {
                            name: 'Get',
                            value: 'get',
                            description: 'Get a QR code',
                            action: 'Get a QR code',
                        },
                        {
                            name: 'Get Scans',
                            value: 'getScans',
                            description: 'Get scan analytics for a QR code',
                            action: 'Get scan analytics for a QR code',
                        },
                        {
                            name: 'List',
                            value: 'list',
                            description: 'List all QR codes',
                            action: 'List all QR codes',
                        },
                        {
                            name: 'Update',
                            value: 'update',
                            description: 'Update a QR code',
                            action: 'Update a QR code',
                        },
                    ],
                    default: 'create',
                },
                // ─── Analytics Operations ───
                {
                    displayName: 'Operation',
                    name: 'operation',
                    type: 'options',
                    noDataExpression: true,
                    displayOptions: {
                        show: {
                            resource: ['analytics'],
                        },
                    },
                    options: [
                        {
                            name: 'Get Scans',
                            value: 'getScans',
                            description: 'Get scan analytics',
                            action: 'Get scan analytics',
                        },
                    ],
                    default: 'getScans',
                },
                // ─── Create: Required Fields ───
                {
                    displayName: 'QR Type',
                    name: 'typeId',
                    type: 'options',
                    displayOptions: {
                        show: {
                            operation: ['create'],
                            resource: ['qrCode'],
                        },
                    },
                    options: [
                        { name: 'Website (URL)', value: 1 },
                        { name: 'Text', value: 2 },
                        { name: 'Email', value: 3 },
                        { name: 'vCard (Contact)', value: 4 },
                        { name: 'WiFi', value: 5 },
                        { name: 'Phone', value: 6 },
                        { name: 'SMS', value: 12 },
                        { name: 'Location', value: 13 },
                        { name: 'PDF', value: 14 },
                        { name: 'Image Gallery', value: 15 },
                        { name: 'Image', value: 17 },
                        { name: 'File', value: 19 },
                        { name: 'List of Links', value: 20 },
                        { name: 'MP3', value: 21 },
                    ],
                    default: 1,
                    description: 'The type of QR code to create',
                    required: true,
                },
                // ─── Type-specific required fields ───
                // Website (type 1)
                {
                    displayName: 'URL',
                    name: 'url',
                    type: 'string',
                    displayOptions: {
                        show: {
                            operation: ['create'],
                            resource: ['qrCode'],
                            typeId: [1],
                        },
                    },
                    default: '',
                    placeholder: 'https://example.com',
                    description: 'The URL to encode in the QR code',
                    required: true,
                },
                // Text (type 2)
                {
                    displayName: 'Text',
                    name: 'text',
                    type: 'string',
                    displayOptions: {
                        show: {
                            operation: ['create'],
                            resource: ['qrCode'],
                            typeId: [2],
                        },
                    },
                    default: '',
                    placeholder: 'Hello World',
                    description: 'The text content to encode',
                    required: true,
                },
                // Email (type 3)
                {
                    displayName: 'Email',
                    name: 'email',
                    type: 'string',
                    displayOptions: {
                        show: {
                            operation: ['create'],
                            resource: ['qrCode'],
                            typeId: [3],
                        },
                    },
                    default: '',
                    placeholder: 'user@example.com',
                    description: 'The email address',
                    required: true,
                },
                // Phone (type 6) and SMS (type 12)
                {
                    displayName: 'Phone Number',
                    name: 'phone',
                    type: 'string',
                    displayOptions: {
                        show: {
                            operation: ['create'],
                            resource: ['qrCode'],
                            typeId: [6, 12],
                        },
                    },
                    default: '',
                    placeholder: '+1234567890',
                    description: 'The phone number',
                    required: true,
                },
                // WiFi (type 5)
                {
                    displayName: 'SSID (Network Name)',
                    name: 'ssid',
                    type: 'string',
                    displayOptions: {
                        show: {
                            operation: ['create'],
                            resource: ['qrCode'],
                            typeId: [5],
                        },
                    },
                    default: '',
                    placeholder: 'MyWiFiNetwork',
                    description: 'The WiFi network name',
                    required: true,
                },
                // Location (type 13)
                {
                    displayName: 'Latitude',
                    name: 'latitude',
                    type: 'number',
                    displayOptions: {
                        show: {
                            operation: ['create'],
                            resource: ['qrCode'],
                            typeId: [13],
                        },
                    },
                    default: 0,
                    description: 'The latitude coordinate',
                    required: true,
                    typeOptions: {
                        numberPrecision: 8,
                    },
                },
                {
                    displayName: 'Longitude',
                    name: 'longitude',
                    type: 'number',
                    displayOptions: {
                        show: {
                            operation: ['create'],
                            resource: ['qrCode'],
                            typeId: [13],
                        },
                    },
                    default: 0,
                    description: 'The longitude coordinate',
                    required: true,
                    typeOptions: {
                        numberPrecision: 8,
                    },
                },
                // PDF (type 14)
                {
                    displayName: 'PDF Title',
                    name: 'pdfTitle',
                    type: 'string',
                    displayOptions: {
                        show: {
                            operation: ['create'],
                            resource: ['qrCode'],
                            typeId: [14],
                        },
                    },
                    default: '',
                    description: 'Title of the PDF document',
                    required: true,
                },
                {
                    displayName: 'PDF Download URL',
                    name: 'pdfDownloadUrl',
                    type: 'string',
                    displayOptions: {
                        show: {
                            operation: ['create'],
                            resource: ['qrCode'],
                            typeId: [14],
                        },
                    },
                    default: '',
                    placeholder: 'https://example.com/document.pdf',
                    description: 'URL to the PDF file',
                    required: true,
                },
                // Image (type 17)
                {
                    displayName: 'Image Title',
                    name: 'imageTitle',
                    type: 'string',
                    displayOptions: {
                        show: {
                            operation: ['create'],
                            resource: ['qrCode'],
                            typeId: [17],
                        },
                    },
                    default: '',
                    description: 'Title of the image',
                    required: true,
                },
                {
                    displayName: 'Image Download URL',
                    name: 'imageDownloadUrl',
                    type: 'string',
                    displayOptions: {
                        show: {
                            operation: ['create'],
                            resource: ['qrCode'],
                            typeId: [17],
                        },
                    },
                    default: '',
                    placeholder: 'https://example.com/image.png',
                    description: 'URL to the image file',
                    required: true,
                },
                // File (type 19)
                {
                    displayName: 'File Title',
                    name: 'fileTitle',
                    type: 'string',
                    displayOptions: {
                        show: {
                            operation: ['create'],
                            resource: ['qrCode'],
                            typeId: [19],
                        },
                    },
                    default: '',
                    description: 'Title of the file',
                    required: true,
                },
                {
                    displayName: 'File Download URL',
                    name: 'fileDownloadUrl',
                    type: 'string',
                    displayOptions: {
                        show: {
                            operation: ['create'],
                            resource: ['qrCode'],
                            typeId: [19],
                        },
                    },
                    default: '',
                    placeholder: 'https://example.com/file.zip',
                    description: 'URL to the file',
                    required: true,
                },
                // Image Gallery (type 15)
                {
                    displayName: 'Gallery Title',
                    name: 'imageGalleryTitle',
                    type: 'string',
                    displayOptions: {
                        show: {
                            operation: ['create'],
                            resource: ['qrCode'],
                            typeId: [15],
                        },
                    },
                    default: '',
                    description: 'Title of the image gallery',
                    required: true,
                },
                {
                    displayName: 'Gallery Images (JSON)',
                    name: 'imageGalleryImages',
                    type: 'json',
                    displayOptions: {
                        show: {
                            operation: ['create'],
                            resource: ['qrCode'],
                            typeId: [15],
                        },
                    },
                    default: '[]',
                    description: 'Array of image objects with url and name, e.g. [{"url":"https://...","name":"Photo 1"}]',
                    required: true,
                },
                // List of Links (type 20)
                {
                    displayName: 'Links Title',
                    name: 'linksTitle',
                    type: 'string',
                    displayOptions: {
                        show: {
                            operation: ['create'],
                            resource: ['qrCode'],
                            typeId: [20],
                        },
                    },
                    default: '',
                    description: 'Title of the links page',
                    required: true,
                },
                {
                    displayName: 'Links List (JSON)',
                    name: 'linksList',
                    type: 'json',
                    displayOptions: {
                        show: {
                            operation: ['create'],
                            resource: ['qrCode'],
                            typeId: [20],
                        },
                    },
                    default: '[]',
                    description: 'Array of link objects, e.g. [{"url":"https://...","text":"My Link"}]',
                    required: true,
                },
                // MP3 (type 21)
                {
                    displayName: 'MP3 Title',
                    name: 'mp3Title',
                    type: 'string',
                    displayOptions: {
                        show: {
                            operation: ['create'],
                            resource: ['qrCode'],
                            typeId: [21],
                        },
                    },
                    default: '',
                    description: 'Title of the audio track',
                    required: true,
                },
                {
                    displayName: 'MP3 File URL',
                    name: 'mp3FileUrl',
                    type: 'string',
                    displayOptions: {
                        show: {
                            operation: ['create'],
                            resource: ['qrCode'],
                            typeId: [21],
                        },
                    },
                    default: '',
                    placeholder: 'https://example.com/track.mp3',
                    description: 'URL to the MP3 file',
                    required: true,
                },
                // vCard (type 4) – at least one of first_name, last_name, or phone is required
                {
                    displayName: 'First Name',
                    name: 'firstName',
                    type: 'string',
                    displayOptions: {
                        show: {
                            operation: ['create'],
                            resource: ['qrCode'],
                            typeId: [4],
                        },
                    },
                    default: '',
                    description: 'Contact first name (at least one of first name, last name, or phone is required)',
                },
                {
                    displayName: 'Last Name',
                    name: 'lastName',
                    type: 'string',
                    displayOptions: {
                        show: {
                            operation: ['create'],
                            resource: ['qrCode'],
                            typeId: [4],
                        },
                    },
                    default: '',
                    description: 'Contact last name',
                },
                {
                    displayName: 'Phone (vCard)',
                    name: 'vcardPhone',
                    type: 'string',
                    displayOptions: {
                        show: {
                            operation: ['create'],
                            resource: ['qrCode'],
                            typeId: [4],
                        },
                    },
                    default: '',
                    placeholder: '+1234567890',
                    description: 'Contact phone number',
                },
                // ─── Shared fields for get/update/delete/getScans ───
                {
                    displayName: 'QR Code ID',
                    name: 'qrCodeId',
                    type: 'string',
                    displayOptions: {
                        show: {
                            operation: ['update', 'get', 'delete', 'getScans'],
                            resource: ['qrCode'],
                        },
                    },
                    default: '',
                    description: 'The ID of the QR code',
                    required: true,
                },
                // ─── Create & Update: Common optional fields ───
                {
                    displayName: 'Name',
                    name: 'name',
                    type: 'string',
                    displayOptions: {
                        show: {
                            operation: ['create', 'update'],
                            resource: ['qrCode'],
                        },
                    },
                    default: '',
                    placeholder: 'My QR Code',
                    description: 'Display name for the QR code',
                },
                // ─── List options ───
                {
                    displayName: 'Return All',
                    name: 'returnAll',
                    type: 'boolean',
                    displayOptions: {
                        show: {
                            operation: ['list'],
                            resource: ['qrCode'],
                        },
                    },
                    default: false,
                    description: 'Whether to return all results or only up to a given limit',
                },
                {
                    displayName: 'Limit',
                    name: 'limit',
                    type: 'number',
                    displayOptions: {
                        show: {
                            operation: ['list'],
                            resource: ['qrCode'],
                            returnAll: [false],
                        },
                    },
                    typeOptions: {
                        minValue: 1,
                    },
                    default: 50,
                    description: 'Max number of results to return',
                },
                // ─── Additional Fields (Create) ───
                {
                    displayName: 'Additional Fields',
                    name: 'additionalFields',
                    type: 'collection',
                    placeholder: 'Add Field',
                    default: {},
                    displayOptions: {
                        show: {
                            operation: ['create'],
                            resource: ['qrCode'],
                        },
                    },
                    options: [
                        {
                            displayName: 'Short Link Domain',
                            name: 'short_link_domain',
                            type: 'string',
                            default: '',
                            placeholder: 'uqr.sh',
                            description: 'Domain for the short link (e.g. uqr.sh). Uses system default if not specified.',
                        },
                        {
                            displayName: 'Folder ID',
                            name: 'folder_id',
                            type: 'string',
                            default: '',
                            description: 'Folder UUID to organize QR codes',
                        },
                        {
                            displayName: 'Template ID',
                            name: 'template_id',
                            type: 'string',
                            default: '',
                            description: 'Design template UUID to apply',
                        },
                        {
                            displayName: 'Team ID',
                            name: 'team_id',
                            type: 'string',
                            default: '',
                            description: 'Team UUID to assign the QR code to',
                        },
                        {
                            displayName: 'Options (JSON)',
                            name: 'options',
                            type: 'json',
                            default: '',
                            description: 'QR code design options as JSON (dotsOptions, backgroundOptions, cornersSquareOptions, etc.)',
                        },
                        {
                            displayName: 'Theme (JSON)',
                            name: 'theme',
                            type: 'json',
                            default: '',
                            description: 'Theme configuration for landing pages as JSON',
                        },
                        // Type-specific optional fields
                        {
                            displayName: 'Email Subject',
                            name: 'subject',
                            type: 'string',
                            default: '',
                            description: 'Email subject (for Email QR type)',
                        },
                        {
                            displayName: 'Email Body',
                            name: 'body',
                            type: 'string',
                            default: '',
                            description: 'Email body text (for Email QR type)',
                        },
                        {
                            displayName: 'SMS Message',
                            name: 'message',
                            type: 'string',
                            default: '',
                            description: 'SMS message text (for SMS QR type)',
                        },
                        {
                            displayName: 'WiFi Password',
                            name: 'password',
                            type: 'string',
                            default: '',
                            description: 'WiFi password (for WiFi QR type)',
                        },
                        {
                            displayName: 'WiFi Security',
                            name: 'security',
                            type: 'options',
                            options: [
                                { name: 'WPA/WPA2', value: 'WPA' },
                                { name: 'WEP', value: 'WEP' },
                                { name: 'None', value: 'nopass' },
                            ],
                            default: 'WPA',
                            description: 'WiFi security type (for WiFi QR type)',
                        },
                        {
                            displayName: 'Location Name',
                            name: 'location',
                            type: 'string',
                            default: '',
                            description: 'Location name (for Location QR type)',
                        },
                        {
                            displayName: 'PDF Description',
                            name: 'pdf_description',
                            type: 'string',
                            default: '',
                            description: 'Description for the PDF (for PDF QR type)',
                        },
                        {
                            displayName: 'Image Description',
                            name: 'image_description',
                            type: 'string',
                            default: '',
                            description: 'Description for the image (for Image QR type)',
                        },
                        {
                            displayName: 'File Description',
                            name: 'file_description',
                            type: 'string',
                            default: '',
                            description: 'Description for the file (for File QR type)',
                        },
                        {
                            displayName: 'Gallery Description',
                            name: 'image_gallery_description',
                            type: 'string',
                            default: '',
                            description: 'Description for the gallery (for Image Gallery QR type)',
                        },
                        {
                            displayName: 'Links Description',
                            name: 'links_description',
                            type: 'string',
                            default: '',
                            description: 'Description for the links page (for List of Links QR type)',
                        },
                        {
                            displayName: 'MP3 Description',
                            name: 'mp3_description',
                            type: 'string',
                            default: '',
                            description: 'Description for the audio (for MP3 QR type)',
                        },
                        {
                            displayName: 'MP3 Cover Image URL',
                            name: 'mp3_cover_image_url',
                            type: 'string',
                            default: '',
                            description: 'Cover image URL (for MP3 QR type)',
                        },
                        // vCard optional fields
                        {
                            displayName: 'Email (vCard)',
                            name: 'vcardEmail',
                            type: 'string',
                            default: '',
                            description: 'Contact email address (for vCard QR type)',
                        },
                        {
                            displayName: 'Company',
                            name: 'company',
                            type: 'string',
                            default: '',
                            description: 'Company name (for vCard QR type)',
                        },
                        {
                            displayName: 'Job Title',
                            name: 'job_title',
                            type: 'string',
                            default: '',
                            description: 'Job title (for vCard QR type)',
                        },
                        {
                            displayName: 'Address',
                            name: 'address',
                            type: 'string',
                            default: '',
                            description: 'Street address (for vCard QR type)',
                        },
                        {
                            displayName: 'City',
                            name: 'city',
                            type: 'string',
                            default: '',
                            description: 'City (for vCard QR type)',
                        },
                        {
                            displayName: 'State',
                            name: 'state',
                            type: 'string',
                            default: '',
                            description: 'State or province (for vCard QR type)',
                        },
                        {
                            displayName: 'ZIP Code',
                            name: 'zip',
                            type: 'string',
                            default: '',
                            description: 'ZIP or postal code (for vCard QR type)',
                        },
                        {
                            displayName: 'Country',
                            name: 'country',
                            type: 'string',
                            default: '',
                            description: 'Country (for vCard QR type)',
                        },
                        // UTM Parameters
                        {
                            displayName: 'UTM Source',
                            name: 'utm_source',
                            type: 'string',
                            default: '',
                            description: 'UTM source parameter for tracking',
                        },
                        {
                            displayName: 'UTM Medium',
                            name: 'utm_medium',
                            type: 'string',
                            default: '',
                            description: 'UTM medium parameter for tracking',
                        },
                        {
                            displayName: 'UTM Campaign',
                            name: 'utm_campaign',
                            type: 'string',
                            default: '',
                            description: 'UTM campaign parameter for tracking',
                        },
                    ],
                },
                // ─── Additional Fields (Update) ───
                {
                    displayName: 'Update Fields',
                    name: 'updateFields',
                    type: 'collection',
                    placeholder: 'Add Field',
                    default: {},
                    displayOptions: {
                        show: {
                            operation: ['update'],
                            resource: ['qrCode'],
                        },
                    },
                    options: [
                        {
                            displayName: 'URL',
                            name: 'url',
                            type: 'string',
                            default: '',
                            description: 'New URL (for Website QR type)',
                        },
                        {
                            displayName: 'Text',
                            name: 'text',
                            type: 'string',
                            default: '',
                            description: 'New text content (for Text QR type)',
                        },
                        {
                            displayName: 'Short Link Domain',
                            name: 'short_link_domain',
                            type: 'string',
                            default: '',
                            placeholder: 'uqr.sh',
                            description: 'Change the short link domain',
                        },
                        {
                            displayName: 'Status',
                            name: 'status',
                            type: 'options',
                            options: [
                                { name: 'Active', value: 1 },
                                { name: 'Inactive', value: 2 },
                            ],
                            default: 1,
                            description: 'QR code status',
                        },
                        {
                            displayName: 'Folder ID',
                            name: 'folder_id',
                            type: 'string',
                            default: '',
                            description: 'Folder UUID to move QR code into',
                        },
                        {
                            displayName: 'Template ID',
                            name: 'template_id',
                            type: 'string',
                            default: '',
                            description: 'Design template UUID to apply',
                        },
                        {
                            displayName: 'Options (JSON)',
                            name: 'options',
                            type: 'json',
                            default: '',
                            description: 'QR code design options as JSON',
                        },
                        {
                            displayName: 'Theme (JSON)',
                            name: 'theme',
                            type: 'json',
                            default: '',
                            description: 'Theme configuration as JSON',
                        },
                        {
                            displayName: 'UTM Source',
                            name: 'utm_source',
                            type: 'string',
                            default: '',
                            description: 'UTM source parameter',
                        },
                        {
                            displayName: 'UTM Medium',
                            name: 'utm_medium',
                            type: 'string',
                            default: '',
                            description: 'UTM medium parameter',
                        },
                        {
                            displayName: 'UTM Campaign',
                            name: 'utm_campaign',
                            type: 'string',
                            default: '',
                            description: 'UTM campaign parameter',
                        },
                    ],
                },
                // ─── Analytics Filters ───
                {
                    displayName: 'Filters',
                    name: 'filters',
                    type: 'collection',
                    placeholder: 'Add Filter',
                    default: {},
                    displayOptions: {
                        show: {
                            resource: ['analytics'],
                            operation: ['getScans'],
                        },
                    },
                    options: [
                        {
                            displayName: 'QR Code ID',
                            name: 'qrCodeId',
                            type: 'string',
                            default: '',
                            description: 'Filter by specific QR code ID',
                        },
                        {
                            displayName: 'Start Date',
                            name: 'startDate',
                            type: 'dateTime',
                            default: '',
                            description: 'Filter scans from this date',
                        },
                        {
                            displayName: 'End Date',
                            name: 'endDate',
                            type: 'dateTime',
                            default: '',
                            description: 'Filter scans until this date',
                        },
                    ],
                },
            ],
        };
    }
    async execute() {
        const items = this.getInputData();
        const returnData = [];
        const length = items.length;
        const credentials = await this.getCredentials('uqrAiApi');
        const apiKey = credentials.apiKey;
        const baseURL = credentials.baseUrl || 'https://uqr.ai/api/v1';
        const resource = this.getNodeParameter('resource', 0);
        const operation = this.getNodeParameter('operation', 0);
        for (let i = 0; i < length; i++) {
            try {
                let responseData = {};
                if (resource === 'qrCode') {
                    if (operation === 'create') {
                        const typeId = this.getNodeParameter('typeId', i);
                        const name = this.getNodeParameter('name', i);
                        const additionalFields = this.getNodeParameter('additionalFields', i);
                        const body = {
                            type_id: typeId,
                        };
                        if (name) {
                            body.name = name;
                        }
                        // Map type-specific required fields to API field names
                        switch (typeId) {
                            case 1: // Website
                                body.url = this.getNodeParameter('url', i);
                                break;
                            case 2: // Text
                                body.text = this.getNodeParameter('text', i);
                                break;
                            case 3: // Email
                                body.email = this.getNodeParameter('email', i);
                                break;
                            case 4: { // vCard
                                const firstName = this.getNodeParameter('firstName', i);
                                const lastName = this.getNodeParameter('lastName', i);
                                const vcardPhone = this.getNodeParameter('vcardPhone', i);
                                if (firstName)
                                    body.first_name = firstName;
                                if (lastName)
                                    body.last_name = lastName;
                                if (vcardPhone)
                                    body.phone = vcardPhone;
                                break;
                            }
                            case 5: // WiFi
                                body.ssid = this.getNodeParameter('ssid', i);
                                break;
                            case 6: // Phone
                            case 12: // SMS
                                body.phone = this.getNodeParameter('phone', i);
                                break;
                            case 13: // Location
                                body.latitude = this.getNodeParameter('latitude', i);
                                body.longitude = this.getNodeParameter('longitude', i);
                                break;
                            case 14: // PDF
                                body.pdf_title = this.getNodeParameter('pdfTitle', i);
                                body.pdf_download_url = this.getNodeParameter('pdfDownloadUrl', i);
                                break;
                            case 15: // Image Gallery
                                body.image_gallery_title = this.getNodeParameter('imageGalleryTitle', i);
                                body.image_gallery_images = this.getNodeParameter('imageGalleryImages', i);
                                break;
                            case 17: // Image
                                body.image_title = this.getNodeParameter('imageTitle', i);
                                body.image_download_url = this.getNodeParameter('imageDownloadUrl', i);
                                break;
                            case 19: // File
                                body.file_title = this.getNodeParameter('fileTitle', i);
                                body.file_download_url = this.getNodeParameter('fileDownloadUrl', i);
                                break;
                            case 20: // List of Links
                                body.links_title = this.getNodeParameter('linksTitle', i);
                                body.links_list = this.getNodeParameter('linksList', i);
                                break;
                            case 21: // MP3
                                body.mp3_title = this.getNodeParameter('mp3Title', i);
                                body.mp3_file_url = this.getNodeParameter('mp3FileUrl', i);
                                break;
                        }
                        // Map additional fields, renaming vCard-specific keys
                        if (additionalFields.vcardEmail) {
                            body.email = additionalFields.vcardEmail;
                            delete additionalFields.vcardEmail;
                        }
                        // Parse JSON fields
                        if (typeof additionalFields.options === 'string' && additionalFields.options) {
                            additionalFields.options = JSON.parse(additionalFields.options);
                        }
                        if (typeof additionalFields.theme === 'string' && additionalFields.theme) {
                            additionalFields.theme = JSON.parse(additionalFields.theme);
                        }
                        // Remove empty string values so they don't override defaults
                        for (const key of Object.keys(additionalFields)) {
                            if (additionalFields[key] === '') {
                                delete additionalFields[key];
                            }
                        }
                        Object.assign(body, additionalFields);
                        responseData = await this.helpers.request({
                            method: 'POST',
                            url: '/qr-codes',
                            baseURL,
                            headers: {
                                'x-api-key': apiKey,
                                'Content-Type': 'application/json',
                            },
                            body,
                            json: true,
                        });
                    }
                    else if (operation === 'update') {
                        const qrCodeId = this.getNodeParameter('qrCodeId', i);
                        const name = this.getNodeParameter('name', i);
                        const updateFields = this.getNodeParameter('updateFields', i);
                        const body = {};
                        if (name) {
                            body.name = name;
                        }
                        // Parse JSON fields
                        if (typeof updateFields.options === 'string' && updateFields.options) {
                            updateFields.options = JSON.parse(updateFields.options);
                        }
                        if (typeof updateFields.theme === 'string' && updateFields.theme) {
                            updateFields.theme = JSON.parse(updateFields.theme);
                        }
                        // Remove empty string values
                        for (const key of Object.keys(updateFields)) {
                            if (updateFields[key] === '') {
                                delete updateFields[key];
                            }
                        }
                        Object.assign(body, updateFields);
                        responseData = await this.helpers.request({
                            method: 'PUT',
                            url: `/qr-codes/${qrCodeId}`,
                            baseURL,
                            headers: {
                                'x-api-key': apiKey,
                                'Content-Type': 'application/json',
                            },
                            body,
                            json: true,
                        });
                    }
                    else if (operation === 'get') {
                        const qrCodeId = this.getNodeParameter('qrCodeId', i);
                        responseData = await this.helpers.request({
                            method: 'GET',
                            url: `/qr-codes/${qrCodeId}`,
                            baseURL,
                            headers: {
                                'x-api-key': apiKey,
                            },
                            json: true,
                        });
                    }
                    else if (operation === 'list') {
                        const returnAll = this.getNodeParameter('returnAll', i);
                        const limit = returnAll ? 100 : this.getNodeParameter('limit', i);
                        const qs = {
                            limit,
                        };
                        responseData = await this.helpers.request({
                            method: 'GET',
                            url: '/qr-codes',
                            baseURL,
                            headers: {
                                'x-api-key': apiKey,
                            },
                            qs,
                            json: true,
                        });
                    }
                    else if (operation === 'delete') {
                        const qrCodeId = this.getNodeParameter('qrCodeId', i);
                        responseData = await this.helpers.request({
                            method: 'DELETE',
                            url: `/qr-codes/${qrCodeId}`,
                            baseURL,
                            headers: {
                                'x-api-key': apiKey,
                            },
                            json: true,
                        });
                    }
                    else if (operation === 'getScans') {
                        const qrCodeId = this.getNodeParameter('qrCodeId', i);
                        responseData = await this.helpers.request({
                            method: 'GET',
                            url: `/qr-codes/${qrCodeId}/scans`,
                            baseURL,
                            headers: {
                                'x-api-key': apiKey,
                            },
                            json: true,
                        });
                    }
                }
                else if (resource === 'analytics') {
                    if (operation === 'getScans') {
                        const filters = this.getNodeParameter('filters', i);
                        const qs = {};
                        if (filters.qrCodeId) {
                            qs.qrCodeId = filters.qrCodeId;
                        }
                        if (filters.startDate) {
                            qs.startDate = filters.startDate;
                        }
                        if (filters.endDate) {
                            qs.endDate = filters.endDate;
                        }
                        responseData = await this.helpers.request({
                            method: 'GET',
                            url: '/analytics/scans',
                            baseURL,
                            headers: {
                                'x-api-key': apiKey,
                            },
                            qs,
                            json: true,
                        });
                    }
                }
                const executionData = this.helpers.constructExecutionMetaData(this.helpers.returnJsonArray(responseData), { itemData: { item: i } });
                returnData.push(...executionData);
            }
            catch (error) {
                if (this.continueOnFail()) {
                    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
                    const executionErrorData = this.helpers.constructExecutionMetaData(this.helpers.returnJsonArray({ error: errorMessage }), { itemData: { item: i } });
                    returnData.push(...executionErrorData);
                    continue;
                }
                throw error;
            }
        }
        return [returnData];
    }
}
exports.UqrAi = UqrAi;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXFyQWkubm9kZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL25vZGVzL1VxckFpL1VxckFpLm5vZGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBUUEsTUFBYSxLQUFLO0lBQWxCO1FBQ0MsZ0JBQVcsR0FBeUI7WUFDbkMsV0FBVyxFQUFFLFFBQVE7WUFDckIsSUFBSSxFQUFFLE9BQU87WUFDYixJQUFJLEVBQUUsZUFBZTtZQUNyQixLQUFLLEVBQUUsQ0FBQyxXQUFXLENBQUM7WUFDcEIsT0FBTyxFQUFFLENBQUM7WUFDVixRQUFRLEVBQUUsOERBQThEO1lBQ3hFLFdBQVcsRUFBRSxnREFBZ0Q7WUFDN0QsUUFBUSxFQUFFO2dCQUNULElBQUksRUFBRSxRQUFRO2FBQ2Q7WUFDRCxNQUFNLEVBQUUsQ0FBQyxNQUFNLENBQUM7WUFDaEIsT0FBTyxFQUFFLENBQUMsTUFBTSxDQUFDO1lBQ2pCLFdBQVcsRUFBRTtnQkFDWjtvQkFDQyxJQUFJLEVBQUUsVUFBVTtvQkFDaEIsUUFBUSxFQUFFLElBQUk7aUJBQ2Q7YUFDRDtZQUNELFVBQVUsRUFBRTtnQkFDWCxtQkFBbUI7Z0JBQ25CO29CQUNDLFdBQVcsRUFBRSxVQUFVO29CQUN2QixJQUFJLEVBQUUsVUFBVTtvQkFDaEIsSUFBSSxFQUFFLFNBQVM7b0JBQ2YsZ0JBQWdCLEVBQUUsSUFBSTtvQkFDdEIsT0FBTyxFQUFFO3dCQUNSOzRCQUNDLElBQUksRUFBRSxTQUFTOzRCQUNmLEtBQUssRUFBRSxRQUFRO3lCQUNmO3dCQUNEOzRCQUNDLElBQUksRUFBRSxXQUFXOzRCQUNqQixLQUFLLEVBQUUsV0FBVzt5QkFDbEI7cUJBQ0Q7b0JBQ0QsT0FBTyxFQUFFLFFBQVE7aUJBQ2pCO2dCQUVELDZCQUE2QjtnQkFDN0I7b0JBQ0MsV0FBVyxFQUFFLFdBQVc7b0JBQ3hCLElBQUksRUFBRSxXQUFXO29CQUNqQixJQUFJLEVBQUUsU0FBUztvQkFDZixnQkFBZ0IsRUFBRSxJQUFJO29CQUN0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QUFHLGFBQWEsQ0FBQyxDQUFDO1lBQ25DLENBQUM7WUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO2dCQUNoQixJQUFJLElBQUksQ0FBQyxjQUFjLEVBQUUsRUFBRSxDQUFDO29CQUMzQixNQUFNLFlBQVksR0FBRyxLQUFLLFlBQVksS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxlQUFlLENBQUM7b0JBQzlFLE1BQU0sa0JBQWtCLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQywwQkFBMEIsQ0FDakUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFFLENBQUMsRUFDckQsRUFBRSxRQUFRLEVBQUUsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FDekIsQ0FBQztvQkFDRixVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsa0JBQWtCLENBQUMsQ0FBQztvQkFDdkMsU0FBUztnQkFDVixDQUFDO2dCQUNELE1BQU0sS0FBSyxDQUFDO1lBQ2IsQ0FBQztRQUNGLENBQUM7UUFFRCxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDckIsQ0FBQztDQUNEO0FBL3NDRCxzQkErc0NDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHR5cGUge1xuXHRJRXhlY3V0ZUZ1bmN0aW9ucyxcblx0SURhdGFPYmplY3QsXG5cdElOb2RlRXhlY3V0aW9uRGF0YSxcblx0SU5vZGVUeXBlLFxuXHRJTm9kZVR5cGVEZXNjcmlwdGlvbixcbn0gZnJvbSAnbjhuLXdvcmtmbG93JztcblxuZXhwb3J0IGNsYXNzIFVxckFpIGltcGxlbWVudHMgSU5vZGVUeXBlIHtcblx0ZGVzY3JpcHRpb246IElOb2RlVHlwZURlc2NyaXB0aW9uID0ge1xuXHRcdGRpc3BsYXlOYW1lOiAndXFyLmFpJyxcblx0XHRuYW1lOiAndXFyQWknLFxuXHRcdGljb246ICdmaWxlOmxvZ28ucG5nJyxcblx0XHRncm91cDogWyd0cmFuc2Zvcm0nXSxcblx0XHR2ZXJzaW9uOiAxLFxuXHRcdHN1YnRpdGxlOiAnPXt7JHBhcmFtZXRlcltcIm9wZXJhdGlvblwiXSArIFwiOiBcIiArICRwYXJhbWV0ZXJbXCJyZXNvdXJjZVwiXX19Jyxcblx0XHRkZXNjcmlwdGlvbjogJ0NyZWF0ZSBhbmQgbWFuYWdlIGR5bmFtaWMgUVIgY29kZXMgd2l0aCB1cXIuYWknLFxuXHRcdGRlZmF1bHRzOiB7XG5cdFx0XHRuYW1lOiAndXFyLmFpJyxcblx0XHR9LFxuXHRcdGlucHV0czogWydtYWluJ10sXG5cdFx0b3V0cHV0czogWydtYWluJ10sXG5cdFx0Y3JlZGVudGlhbHM6IFtcblx0XHRcdHtcblx0XHRcdFx0bmFtZTogJ3VxckFpQXBpJyxcblx0XHRcdFx0cmVxdWlyZWQ6IHRydWUsXG5cdFx0XHR9LFxuXHRcdF0sXG5cdFx0cHJvcGVydGllczogW1xuXHRcdFx0Ly8g4pSA4pSA4pSAIFJlc291cmNlIOKUgOKUgOKUgFxuXHRcdFx0e1xuXHRcdFx0XHRkaXNwbGF5TmFtZTogJ1Jlc291cmNlJyxcblx0XHRcdFx0bmFtZTogJ3Jlc291cmNlJyxcblx0XHRcdFx0dHlwZTogJ29wdGlvbnMnLFxuXHRcdFx0XHRub0RhdGFFeHByZXNzaW9uOiB0cnVlLFxuXHRcdFx0XHRvcHRpb25zOiBbXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0bmFtZTogJ1FSIENvZGUnLFxuXHRcdFx0XHRcdFx0dmFsdWU6ICdxckNvZGUnLFxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0bmFtZTogJ0FuYWx5dGljcycsXG5cdFx0XHRcdFx0XHR2YWx1ZTogJ2FuYWx5dGljcycsXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XSxcblx0XHRcdFx0ZGVmYXVsdDogJ3FyQ29kZScsXG5cdFx0XHR9LFxuXG5cdFx0XHQvLyDilIDilIDilIAgUVIgQ29kZSBPcGVyYXRpb25zIOKUgOKUgOKUgFxuXHRcdFx0e1xuXHRcdFx0XHRkaXNwbGF5TmFtZTogJ09wZXJhdGlvbicsXG5cdFx0XHRcdG5hbWU6ICdvcGVyYXRpb24nLFxuXHRcdFx0XHR0eXBlOiAnb3B0aW9ucycsXG5cdFx0XHRcdG5vRGF0YUV4cHJlc3Npb246IHRydWUsXG5cdFx0XHRcdGRpc3BsYXlPcHRpb25zOiB7XG5cdFx0XHRcdFx0c2hvdzoge1xuXHRcdFx0XHRcdFx0cmVzb3VyY2U6IFsncXJDb2RlJ10sXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0fSxcblx0XHRcdFx0b3B0aW9uczogW1xuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdG5hbWU6ICdDcmVhdGUnLFxuXHRcdFx0XHRcdFx0dmFsdWU6ICdjcmVhdGUnLFxuXHRcdFx0XHRcdFx0ZGVzY3JpcHRpb246ICdDcmVhdGUgYSBuZXcgUVIgY29kZScsXG5cdFx0XHRcdFx0XHRhY3Rpb246ICdDcmVhdGUgYSBRUiBjb2RlJyxcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdG5hbWU6ICdEZWxldGUnLFxuXHRcdFx0XHRcdFx0dmFsdWU6ICdkZWxldGUnLFxuXHRcdFx0XHRcdFx0ZGVzY3JpcHRpb246ICdEZWxldGUgYSBRUiBjb2RlJyxcblx0XHRcdFx0XHRcdGFjdGlvbjogJ0RlbGV0ZSBhIFFSIGNvZGUnLFxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0bmFtZTogJ0dldCcsXG5cdFx0XHRcdFx0XHR2YWx1ZTogJ2dldCcsXG5cdFx0XHRcdFx0XHRkZXNjcmlwdGlvbjogJ0dldCBhIFFSIGNvZGUnLFxuXHRcdFx0XHRcdFx0YWN0aW9uOiAnR2V0IGEgUVIgY29kZScsXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRuYW1lOiAnR2V0IFNjYW5zJyxcblx0XHRcdFx0XHRcdHZhbHVlOiAnZ2V0U2NhbnMnLFxuXHRcdFx0XHRcdFx0ZGVzY3JpcHRpb246ICdHZXQgc2NhbiBhbmFseXRpY3MgZm9yIGEgUVIgY29kZScsXG5cdFx0XHRcdFx0XHRhY3Rpb246ICdHZXQgc2NhbiBhbmFseXRpY3MgZm9yIGEgUVIgY29kZScsXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRuYW1lOiAnTGlzdCcsXG5cdFx0XHRcdFx0XHR2YWx1ZTogJ2xpc3QnLFxuXHRcdFx0XHRcdFx0ZGVzY3JpcHRpb246ICdMaXN0IGFsbCBRUiBjb2RlcycsXG5cdFx0XHRcdFx0XHRhY3Rpb246ICdMaXN0IGFsbCBRUiBjb2RlcycsXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRuYW1lOiAnVXBkYXRlJyxcblx0XHRcdFx0XHRcdHZhbHVlOiAndXBkYXRlJyxcblx0XHRcdFx0XHRcdGRlc2NyaXB0aW9uOiAnVXBkYXRlIGEgUVIgY29kZScsXG5cdFx0XHRcdFx0XHRhY3Rpb246ICdVcGRhdGUgYSBRUiBjb2RlJyxcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRdLFxuXHRcdFx0XHRkZWZhdWx0OiAnY3JlYXRlJyxcblx0XHRcdH0sXG5cblx0XHRcdC8vIOKUgOKUgOKUgCBBbmFseXRpY3MgT3BlcmF0aW9ucyDilIDilIDilIBcblx0XHRcdHtcblx0XHRcdFx0ZGlzcGxheU5hbWU6ICdPcGVyYXRpb24nLFxuXHRcdFx0XHRuYW1lOiAnb3BlcmF0aW9uJyxcblx0XHRcdFx0dHlwZTogJ29wdGlvbnMnLFxuXHRcdFx0XHRub0RhdGFFeHByZXNzaW9uOiB0cnVlLFxuXHRcdFx0XHRkaXNwbGF5T3B0aW9uczoge1xuXHRcdFx0XHRcdHNob3c6IHtcblx0XHRcdFx0XHRcdHJlc291cmNlOiBbJ2FuYWx5dGljcyddLFxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdH0sXG5cdFx0XHRcdG9wdGlvbnM6IFtcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRuYW1lOiAnR2V0IFNjYW5zJyxcblx0XHRcdFx0XHRcdHZhbHVlOiAnZ2V0U2NhbnMnLFxuXHRcdFx0XHRcdFx0ZGVzY3JpcHRpb246ICdHZXQgc2NhbiBhbmFseXRpY3MnLFxuXHRcdFx0XHRcdFx0YWN0aW9uOiAnR2V0IHNjYW4gYW5hbHl0aWNzJyxcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRdLFxuXHRcdFx0XHRkZWZhdWx0OiAnZ2V0U2NhbnMnLFxuXHRcdFx0fSxcblxuXHRcdFx0Ly8g4pSA4pSA4pSAIENyZWF0ZTogUmVxdWlyZWQgRmllbGRzIOKUgOKUgOKUgFxuXHRcdFx0e1xuXHRcdFx0XHRkaXNwbGF5TmFtZTogJ1FSIFR5cGUnLFxuXHRcdFx0XHRuYW1lOiAndHlwZUlkJyxcblx0XHRcdFx0dHlwZTogJ29wdGlvbnMnLFxuXHRcdFx0XHRkaXNwbGF5T3B0aW9uczoge1xuXHRcdFx0XHRcdHNob3c6IHtcblx0XHRcdFx0XHRcdG9wZXJhdGlvbjogWydjcmVhdGUnXSxcblx0XHRcdFx0XHRcdHJlc291cmNlOiBbJ3FyQ29kZSddLFxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdH0sXG5cdFx0XHRcdG9wdGlvbnM6IFtcblx0XHRcdFx0XHR7IG5hbWU6ICdXZWJzaXRlIChVUkwpJywgdmFsdWU6IDEgfSxcblx0XHRcdFx0XHR7IG5hbWU6ICdUZXh0JywgdmFsdWU6IDIgfSxcblx0XHRcdFx0XHR7IG5hbWU6ICdFbWFpbCcsIHZhbHVlOiAzIH0sXG5cdFx0XHRcdFx0eyBuYW1lOiAndkNhcmQgKENvbnRhY3QpJywgdmFsdWU6IDQgfSxcblx0XHRcdFx0XHR7IG5hbWU6ICdXaUZpJywgdmFsdWU6IDUgfSxcblx0XHRcdFx0XHR7IG5hbWU6ICdQaG9uZScsIHZhbHVlOiA2IH0sXG5cdFx0XHRcdFx0eyBuYW1lOiAnU01TJywgdmFsdWU6IDEyIH0sXG5cdFx0XHRcdFx0eyBuYW1lOiAnTG9jYXRpb24nLCB2YWx1ZTogMTMgfSxcblx0XHRcdFx0XHR7IG5hbWU6ICdQREYnLCB2YWx1ZTogMTQgfSxcblx0XHRcdFx0XHR7IG5hbWU6ICdJbWFnZSBHYWxsZXJ5JywgdmFsdWU6IDE1IH0sXG5cdFx0XHRcdFx0eyBuYW1lOiAnSW1hZ2UnLCB2YWx1ZTogMTcgfSxcblx0XHRcdFx0XHR7IG5hbWU6ICdGaWxlJywgdmFsdWU6IDE5IH0sXG5cdFx0XHRcdFx0eyBuYW1lOiAnTGlzdCBvZiBMaW5rcycsIHZhbHVlOiAyMCB9LFxuXHRcdFx0XHRcdHsgbmFtZTogJ01QMycsIHZhbHVlOiAyMSB9LFxuXHRcdFx0XHRdLFxuXHRcdFx0XHRkZWZhdWx0OiAxLFxuXHRcdFx0XHRkZXNjcmlwdGlvbjogJ1RoZSB0eXBlIG9mIFFSIGNvZGUgdG8gY3JlYXRlJyxcblx0XHRcdFx0cmVxdWlyZWQ6IHRydWUsXG5cdFx0XHR9LFxuXG5cdFx0XHQvLyDilIDilIDilIAgVHlwZS1zcGVjaWZpYyByZXF1aXJlZCBmaWVsZHMg4pSA4pSA4pSAXG5cblx0XHRcdC8vIFdlYnNpdGUgKHR5cGUgMSlcblx0XHRcdHtcblx0XHRcdFx0ZGlzcGxheU5hbWU6ICdVUkwnLFxuXHRcdFx0XHRuYW1lOiAndXJsJyxcblx0XHRcdFx0dHlwZTogJ3N0cmluZycsXG5cdFx0XHRcdGRpc3BsYXlPcHRpb25zOiB7XG5cdFx0XHRcdFx0c2hvdzoge1xuXHRcdFx0XHRcdFx0b3BlcmF0aW9uOiBbJ2NyZWF0ZSddLFxuXHRcdFx0XHRcdFx0cmVzb3VyY2U6IFsncXJDb2RlJ10sXG5cdFx0XHRcdFx0XHR0eXBlSWQ6IFsxXSxcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHR9LFxuXHRcdFx0XHRkZWZhdWx0OiAnJyxcblx0XHRcdFx0cGxhY2Vob2xkZXI6ICdodHRwczovL2V4YW1wbGUuY29tJyxcblx0XHRcdFx0ZGVzY3JpcHRpb246ICdUaGUgVVJMIHRvIGVuY29kZSBpbiB0aGUgUVIgY29kZScsXG5cdFx0XHRcdHJlcXVpcmVkOiB0cnVlLFxuXHRcdFx0fSxcblxuXHRcdFx0Ly8gVGV4dCAodHlwZSAyKVxuXHRcdFx0e1xuXHRcdFx0XHRkaXNwbGF5TmFtZTogJ1RleHQnLFxuXHRcdFx0XHRuYW1lOiAndGV4dCcsXG5cdFx0XHRcdHR5cGU6ICdzdHJpbmcnLFxuXHRcdFx0XHRkaXNwbGF5T3B0aW9uczoge1xuXHRcdFx0XHRcdHNob3c6IHtcblx0XHRcdFx0XHRcdG9wZXJhdGlvbjogWydjcmVhdGUnXSxcblx0XHRcdFx0XHRcdHJlc291cmNlOiBbJ3FyQ29kZSddLFxuXHRcdFx0XHRcdFx0dHlwZUlkOiBbMl0sXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0fSxcblx0XHRcdFx0ZGVmYXVsdDogJycsXG5cdFx0XHRcdHBsYWNlaG9sZGVyOiAnSGVsbG8gV29ybGQnLFxuXHRcdFx0XHRkZXNjcmlwdGlvbjogJ1RoZSB0ZXh0IGNvbnRlbnQgdG8gZW5jb2RlJyxcblx0XHRcdFx0cmVxdWlyZWQ6IHRydWUsXG5cdFx0XHR9LFxuXG5cdFx0XHQvLyBFbWFpbCAodHlwZSAzKVxuXHRcdFx0e1xuXHRcdFx0XHRkaXNwbGF5TmFtZTogJ0VtYWlsJyxcblx0XHRcdFx0bmFtZTogJ2VtYWlsJyxcblx0XHRcdFx0dHlwZTogJ3N0cmluZycsXG5cdFx0XHRcdGRpc3BsYXlPcHRpb25zOiB7XG5cdFx0XHRcdFx0c2hvdzoge1xuXHRcdFx0XHRcdFx0b3BlcmF0aW9uOiBbJ2NyZWF0ZSddLFxuXHRcdFx0XHRcdFx0cmVzb3VyY2U6IFsncXJDb2RlJ10sXG5cdFx0XHRcdFx0XHR0eXBlSWQ6IFszXSxcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHR9LFxuXHRcdFx0XHRkZWZhdWx0OiAnJyxcblx0XHRcdFx0cGxhY2Vob2xkZXI6ICd1c2VyQGV4YW1wbGUuY29tJyxcblx0XHRcdFx0ZGVzY3JpcHRpb246ICdUaGUgZW1haWwgYWRkcmVzcycsXG5cdFx0XHRcdHJlcXVpcmVkOiB0cnVlLFxuXHRcdFx0fSxcblxuXHRcdFx0Ly8gUGhvbmUgKHR5cGUgNikgYW5kIFNNUyAodHlwZSAxMilcblx0XHRcdHtcblx0XHRcdFx0ZGlzcGxheU5hbWU6ICdQaG9uZSBOdW1iZXInLFxuXHRcdFx0XHRuYW1lOiAncGhvbmUnLFxuXHRcdFx0XHR0eXBlOiAnc3RyaW5nJyxcblx0XHRcdFx0ZGlzcGxheU9wdGlvbnM6IHtcblx0XHRcdFx0XHRzaG93OiB7XG5cdFx0XHRcdFx0XHRvcGVyYXRpb246IFsnY3JlYXRlJ10sXG5cdFx0XHRcdFx0XHRyZXNvdXJjZTogWydxckNvZGUnXSxcblx0XHRcdFx0XHRcdHR5cGVJZDogWzYsIDEyXSxcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHR9LFxuXHRcdFx0XHRkZWZhdWx0OiAnJyxcblx0XHRcdFx0cGxhY2Vob2xkZXI6ICcrMTIzNDU2Nzg5MCcsXG5cdFx0XHRcdGRlc2NyaXB0aW9uOiAnVGhlIHBob25lIG51bWJlcicsXG5cdFx0XHRcdHJlcXVpcmVkOiB0cnVlLFxuXHRcdFx0fSxcblxuXHRcdFx0Ly8gV2lGaSAodHlwZSA1KVxuXHRcdFx0e1xuXHRcdFx0XHRkaXNwbGF5TmFtZTogJ1NTSUQgKE5ldHdvcmsgTmFtZSknLFxuXHRcdFx0XHRuYW1lOiAnc3NpZCcsXG5cdFx0XHRcdHR5cGU6ICdzdHJpbmcnLFxuXHRcdFx0XHRkaXNwbGF5T3B0aW9uczoge1xuXHRcdFx0XHRcdHNob3c6IHtcblx0XHRcdFx0XHRcdG9wZXJhdGlvbjogWydjcmVhdGUnXSxcblx0XHRcdFx0XHRcdHJlc291cmNlOiBbJ3FyQ29kZSddLFxuXHRcdFx0XHRcdFx0dHlwZUlkOiBbNV0sXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0fSxcblx0XHRcdFx0ZGVmYXVsdDogJycsXG5cdFx0XHRcdHBsYWNlaG9sZGVyOiAnTXlXaUZpTmV0d29yaycsXG5cdFx0XHRcdGRlc2NyaXB0aW9uOiAnVGhlIFdpRmkgbmV0d29yayBuYW1lJyxcblx0XHRcdFx0cmVxdWlyZWQ6IHRydWUsXG5cdFx0XHR9LFxuXG5cdFx0XHQvLyBMb2NhdGlvbiAodHlwZSAxMylcblx0XHRcdHtcblx0XHRcdFx0ZGlzcGxheU5hbWU6ICdMYXRpdHVkZScsXG5cdFx0XHRcdG5hbWU6ICdsYXRpdHVkZScsXG5cdFx0XHRcdHR5cGU6ICdudW1iZXInLFxuXHRcdFx0XHRkaXNwbGF5T3B0aW9uczoge1xuXHRcdFx0XHRcdHNob3c6IHtcblx0XHRcdFx0XHRcdG9wZXJhdGlvbjogWydjcmVhdGUnXSxcblx0XHRcdFx0XHRcdHJlc291cmNlOiBbJ3FyQ29kZSddLFxuXHRcdFx0XHRcdFx0dHlwZUlkOiBbMTNdLFxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdH0sXG5cdFx0XHRcdGRlZmF1bHQ6IDAsXG5cdFx0XHRcdGRlc2NyaXB0aW9uOiAnVGhlIGxhdGl0dWRlIGNvb3JkaW5hdGUnLFxuXHRcdFx0XHRyZXF1aXJlZDogdHJ1ZSxcblx0XHRcdFx0dHlwZU9wdGlvbnM6IHtcblx0XHRcdFx0XHRudW1iZXJQcmVjaXNpb246IDgsXG5cdFx0XHRcdH0sXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRkaXNwbGF5TmFtZTogJ0xvbmdpdHVkZScsXG5cdFx0XHRcdG5hbWU6ICdsb25naXR1ZGUnLFxuXHRcdFx0XHR0eXBlOiAnbnVtYmVyJyxcblx0XHRcdFx0ZGlzcGxheU9wdGlvbnM6IHtcblx0XHRcdFx0XHRzaG93OiB7XG5cdFx0XHRcdFx0XHRvcGVyYXRpb246IFsnY3JlYXRlJ10sXG5cdFx0XHRcdFx0XHRyZXNvdXJjZTogWydxckNvZGUnXSxcblx0XHRcdFx0XHRcdHR5cGVJZDogWzEzXSxcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHR9LFxuXHRcdFx0XHRkZWZhdWx0OiAwLFxuXHRcdFx0XHRkZXNjcmlwdGlvbjogJ1RoZSBsb25naXR1ZGUgY29vcmRpbmF0ZScsXG5cdFx0XHRcdHJlcXVpcmVkOiB0cnVlLFxuXHRcdFx0XHR0eXBlT3B0aW9uczoge1xuXHRcdFx0XHRcdG51bWJlclByZWNpc2lvbjogOCxcblx0XHRcdFx0fSxcblx0XHRcdH0sXG5cblx0XHRcdC8vIFBERiAodHlwZSAxNClcblx0XHRcdHtcblx0XHRcdFx0ZGlzcGxheU5hbWU6ICdQREYgVGl0bGUnLFxuXHRcdFx0XHRuYW1lOiAncGRmVGl0bGUnLFxuXHRcdFx0XHR0eXBlOiAnc3RyaW5nJyxcblx0XHRcdFx0ZGlzcGxheU9wdGlvbnM6IHtcblx0XHRcdFx0XHRzaG93OiB7XG5cdFx0XHRcdFx0XHRvcGVyYXRpb246IFsnY3JlYXRlJ10sXG5cdFx0XHRcdFx0XHRyZXNvdXJjZTogWydxckNvZGUnXSxcblx0XHRcdFx0XHRcdHR5cGVJZDogWzE0XSxcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHR9LFxuXHRcdFx0XHRkZWZhdWx0OiAnJyxcblx0XHRcdFx0ZGVzY3JpcHRpb246ICdUaXRsZSBvZiB0aGUgUERGIGRvY3VtZW50Jyxcblx0XHRcdFx0cmVxdWlyZWQ6IHRydWUsXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRkaXNwbGF5TmFtZTogJ1BERiBEb3dubG9hZCBVUkwnLFxuXHRcdFx0XHRuYW1lOiAncGRmRG93bmxvYWRVcmwnLFxuXHRcdFx0XHR0eXBlOiAnc3RyaW5nJyxcblx0XHRcdFx0ZGlzcGxheU9wdGlvbnM6IHtcblx0XHRcdFx0XHRzaG93OiB7XG5cdFx0XHRcdFx0XHRvcGVyYXRpb246IFsnY3JlYXRlJ10sXG5cdFx0XHRcdFx0XHRyZXNvdXJjZTogWydxckNvZGUnXSxcblx0XHRcdFx0XHRcdHR5cGVJZDogWzE0XSxcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHR9LFxuXHRcdFx0XHRkZWZhdWx0OiAnJyxcblx0XHRcdFx0cGxhY2Vob2xkZXI6ICdodHRwczovL2V4YW1wbGUuY29tL2RvY3VtZW50LnBkZicsXG5cdFx0XHRcdGRlc2NyaXB0aW9uOiAnVVJMIHRvIHRoZSBQREYgZmlsZScsXG5cdFx0XHRcdHJlcXVpcmVkOiB0cnVlLFxuXHRcdFx0fSxcblxuXHRcdFx0Ly8gSW1hZ2UgKHR5cGUgMTcpXG5cdFx0XHR7XG5cdFx0XHRcdGRpc3BsYXlOYW1lOiAnSW1hZ2UgVGl0bGUnLFxuXHRcdFx0XHRuYW1lOiAnaW1hZ2VUaXRsZScsXG5cdFx0XHRcdHR5cGU6ICdzdHJpbmcnLFxuXHRcdFx0XHRkaXNwbGF5T3B0aW9uczoge1xuXHRcdFx0XHRcdHNob3c6IHtcblx0XHRcdFx0XHRcdG9wZXJhdGlvbjogWydjcmVhdGUnXSxcblx0XHRcdFx0XHRcdHJlc291cmNlOiBbJ3FyQ29kZSddLFxuXHRcdFx0XHRcdFx0dHlwZUlkOiBbMTddLFxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdH0sXG5cdFx0XHRcdGRlZmF1bHQ6ICcnLFxuXHRcdFx0XHRkZXNjcmlwdGlvbjogJ1RpdGxlIG9mIHRoZSBpbWFnZScsXG5cdFx0XHRcdHJlcXVpcmVkOiB0cnVlLFxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0ZGlzcGxheU5hbWU6ICdJbWFnZSBEb3dubG9hZCBVUkwnLFxuXHRcdFx0XHRuYW1lOiAnaW1hZ2VEb3dubG9hZFVybCcsXG5cdFx0XHRcdHR5cGU6ICdzdHJpbmcnLFxuXHRcdFx0XHRkaXNwbGF5T3B0aW9uczoge1xuXHRcdFx0XHRcdHNob3c6IHtcblx0XHRcdFx0XHRcdG9wZXJhdGlvbjogWydjcmVhdGUnXSxcblx0XHRcdFx0XHRcdHJlc291cmNlOiBbJ3FyQ29kZSddLFxuXHRcdFx0XHRcdFx0dHlwZUlkOiBbMTddLFxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdH0sXG5cdFx0XHRcdGRlZmF1bHQ6ICcnLFxuXHRcdFx0XHRwbGFjZWhvbGRlcjogJ2h0dHBzOi8vZXhhbXBsZS5jb20vaW1hZ2UucG5nJyxcblx0XHRcdFx0ZGVzY3JpcHRpb246ICdVUkwgdG8gdGhlIGltYWdlIGZpbGUnLFxuXHRcdFx0XHRyZXF1aXJlZDogdHJ1ZSxcblx0XHRcdH0sXG5cblx0XHRcdC8vIEZpbGUgKHR5cGUgMTkpXG5cdFx0XHR7XG5cdFx0XHRcdGRpc3BsYXlOYW1lOiAnRmlsZSBUaXRsZScsXG5cdFx0XHRcdG5hbWU6ICdmaWxlVGl0bGUnLFxuXHRcdFx0XHR0eXBlOiAnc3RyaW5nJyxcblx0XHRcdFx0ZGlzcGxheU9wdGlvbnM6IHtcblx0XHRcdFx0XHRzaG93OiB7XG5cdFx0XHRcdFx0XHRvcGVyYXRpb246IFsnY3JlYXRlJ10sXG5cdFx0XHRcdFx0XHRyZXNvdXJjZTogWydxckNvZGUnXSxcblx0XHRcdFx0XHRcdHR5cGVJZDogWzE5XSxcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHR9LFxuXHRcdFx0XHRkZWZhdWx0OiAnJyxcblx0XHRcdFx0ZGVzY3JpcHRpb246ICdUaXRsZSBvZiB0aGUgZmlsZScsXG5cdFx0XHRcdHJlcXVpcmVkOiB0cnVlLFxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0ZGlzcGxheU5hbWU6ICdGaWxlIERvd25sb2FkIFVSTCcsXG5cdFx0XHRcdG5hbWU6ICdmaWxlRG93bmxvYWRVcmwnLFxuXHRcdFx0XHR0eXBlOiAnc3RyaW5nJyxcblx0XHRcdFx0ZGlzcGxheU9wdGlvbnM6IHtcblx0XHRcdFx0XHRzaG93OiB7XG5cdFx0XHRcdFx0XHRvcGVyYXRpb246IFsnY3JlYXRlJ10sXG5cdFx0XHRcdFx0XHRyZXNvdXJjZTogWydxckNvZGUnXSxcblx0XHRcdFx0XHRcdHR5cGVJZDogWzE5XSxcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHR9LFxuXHRcdFx0XHRkZWZhdWx0OiAnJyxcblx0XHRcdFx0cGxhY2Vob2xkZXI6ICdodHRwczovL2V4YW1wbGUuY29tL2ZpbGUuemlwJyxcblx0XHRcdFx0ZGVzY3JpcHRpb246ICdVUkwgdG8gdGhlIGZpbGUnLFxuXHRcdFx0XHRyZXF1aXJlZDogdHJ1ZSxcblx0XHRcdH0sXG5cblx0XHRcdC8vIEltYWdlIEdhbGxlcnkgKHR5cGUgMTUpXG5cdFx0XHR7XG5cdFx0XHRcdGRpc3BsYXlOYW1lOiAnR2FsbGVyeSBUaXRsZScsXG5cdFx0XHRcdG5hbWU6ICdpbWFnZUdhbGxlcnlUaXRsZScsXG5cdFx0XHRcdHR5cGU6ICdzdHJpbmcnLFxuXHRcdFx0XHRkaXNwbGF5T3B0aW9uczoge1xuXHRcdFx0XHRcdHNob3c6IHtcblx0XHRcdFx0XHRcdG9wZXJhdGlvbjogWydjcmVhdGUnXSxcblx0XHRcdFx0XHRcdHJlc291cmNlOiBbJ3FyQ29kZSddLFxuXHRcdFx0XHRcdFx0dHlwZUlkOiBbMTVdLFxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdH0sXG5cdFx0XHRcdGRlZmF1bHQ6ICcnLFxuXHRcdFx0XHRkZXNjcmlwdGlvbjogJ1RpdGxlIG9mIHRoZSBpbWFnZSBnYWxsZXJ5Jyxcblx0XHRcdFx0cmVxdWlyZWQ6IHRydWUsXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRkaXNwbGF5TmFtZTogJ0dhbGxlcnkgSW1hZ2VzIChKU09OKScsXG5cdFx0XHRcdG5hbWU6ICdpbWFnZUdhbGxlcnlJbWFnZXMnLFxuXHRcdFx0XHR0eXBlOiAnanNvbicsXG5cdFx0XHRcdGRpc3BsYXlPcHRpb25zOiB7XG5cdFx0XHRcdFx0c2hvdzoge1xuXHRcdFx0XHRcdFx0b3BlcmF0aW9uOiBbJ2NyZWF0ZSddLFxuXHRcdFx0XHRcdFx0cmVzb3VyY2U6IFsncXJDb2RlJ10sXG5cdFx0XHRcdFx0XHR0eXBlSWQ6IFsxNV0sXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0fSxcblx0XHRcdFx0ZGVmYXVsdDogJ1tdJyxcblx0XHRcdFx0ZGVzY3JpcHRpb246ICdBcnJheSBvZiBpbWFnZSBvYmplY3RzIHdpdGggdXJsIGFuZCBuYW1lLCBlLmcuIFt7XCJ1cmxcIjpcImh0dHBzOi8vLi4uXCIsXCJuYW1lXCI6XCJQaG90byAxXCJ9XScsXG5cdFx0XHRcdHJlcXVpcmVkOiB0cnVlLFxuXHRcdFx0fSxcblxuXHRcdFx0Ly8gTGlzdCBvZiBMaW5rcyAodHlwZSAyMClcblx0XHRcdHtcblx0XHRcdFx0ZGlzcGxheU5hbWU6ICdMaW5rcyBUaXRsZScsXG5cdFx0XHRcdG5hbWU6ICdsaW5rc1RpdGxlJyxcblx0XHRcdFx0dHlwZTogJ3N0cmluZycsXG5cdFx0XHRcdGRpc3BsYXlPcHRpb25zOiB7XG5cdFx0XHRcdFx0c2hvdzoge1xuXHRcdFx0XHRcdFx0b3BlcmF0aW9uOiBbJ2NyZWF0ZSddLFxuXHRcdFx0XHRcdFx0cmVzb3VyY2U6IFsncXJDb2RlJ10sXG5cdFx0XHRcdFx0XHR0eXBlSWQ6IFsyMF0sXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0fSxcblx0XHRcdFx0ZGVmYXVsdDogJycsXG5cdFx0XHRcdGRlc2NyaXB0aW9uOiAnVGl0bGUgb2YgdGhlIGxpbmtzIHBhZ2UnLFxuXHRcdFx0XHRyZXF1aXJlZDogdHJ1ZSxcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdGRpc3BsYXlOYW1lOiAnTGlua3MgTGlzdCAoSlNPTiknLFxuXHRcdFx0XHRuYW1lOiAnbGlua3NMaXN0Jyxcblx0XHRcdFx0dHlwZTogJ2pzb24nLFxuXHRcdFx0XHRkaXNwbGF5T3B0aW9uczoge1xuXHRcdFx0XHRcdHNob3c6IHtcblx0XHRcdFx0XHRcdG9wZXJhdGlvbjogWydjcmVhdGUnXSxcblx0XHRcdFx0XHRcdHJlc291cmNlOiBbJ3FyQ29kZSddLFxuXHRcdFx0XHRcdFx0dHlwZUlkOiBbMjBdLFxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdH0sXG5cdFx0XHRcdGRlZmF1bHQ6ICdbXScsXG5cdFx0XHRcdGRlc2NyaXB0aW9uOiAnQXJyYXkgb2YgbGluayBvYmplY3RzLCBlLmcuIFt7XCJ1cmxcIjpcImh0dHBzOi8vLi4uXCIsXCJ0ZXh0XCI6XCJNeSBMaW5rXCJ9XScsXG5cdFx0XHRcdHJlcXVpcmVkOiB0cnVlLFxuXHRcdFx0fSxcblxuXHRcdFx0Ly8gTVAzICh0eXBlIDIxKVxuXHRcdFx0e1xuXHRcdFx0XHRkaXNwbGF5TmFtZTogJ01QMyBUaXRsZScsXG5cdFx0XHRcdG5hbWU6ICdtcDNUaXRsZScsXG5cdFx0XHRcdHR5cGU6ICdzdHJpbmcnLFxuXHRcdFx0XHRkaXNwbGF5T3B0aW9uczoge1xuXHRcdFx0XHRcdHNob3c6IHtcblx0XHRcdFx0XHRcdG9wZXJhdGlvbjogWydjcmVhdGUnXSxcblx0XHRcdFx0XHRcdHJlc291cmNlOiBbJ3FyQ29kZSddLFxuXHRcdFx0XHRcdFx0dHlwZUlkOiBbMjFdLFxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdH0sXG5cdFx0XHRcdGRlZmF1bHQ6ICcnLFxuXHRcdFx0XHRkZXNjcmlwdGlvbjogJ1RpdGxlIG9mIHRoZSBhdWRpbyB0cmFjaycsXG5cdFx0XHRcdHJlcXVpcmVkOiB0cnVlLFxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0ZGlzcGxheU5hbWU6ICdNUDMgRmlsZSBVUkwnLFxuXHRcdFx0XHRuYW1lOiAnbXAzRmlsZVVybCcsXG5cdFx0XHRcdHR5cGU6ICdzdHJpbmcnLFxuXHRcdFx0XHRkaXNwbGF5T3B0aW9uczoge1xuXHRcdFx0XHRcdHNob3c6IHtcblx0XHRcdFx0XHRcdG9wZXJhdGlvbjogWydjcmVhdGUnXSxcblx0XHRcdFx0XHRcdHJlc291cmNlOiBbJ3FyQ29kZSddLFxuXHRcdFx0XHRcdFx0dHlwZUlkOiBbMjFdLFxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdH0sXG5cdFx0XHRcdGRlZmF1bHQ6ICcnLFxuXHRcdFx0XHRwbGFjZWhvbGRlcjogJ2h0dHBzOi8vZXhhbXBsZS5jb20vdHJhY2subXAzJyxcblx0XHRcdFx0ZGVzY3JpcHRpb246ICdVUkwgdG8gdGhlIE1QMyBmaWxlJyxcblx0XHRcdFx0cmVxdWlyZWQ6IHRydWUsXG5cdFx0XHR9LFxuXG5cdFx0XHQvLyB2Q2FyZCAodHlwZSA0KSDigJMgYXQgbGVhc3Qgb25lIG9mIGZpcnN0X25hbWUsIGxhc3RfbmFtZSwgb3IgcGhvbmUgaXMgcmVxdWlyZWRcblx0XHRcdHtcblx0XHRcdFx0ZGlzcGxheU5hbWU6ICdGaXJzdCBOYW1lJyxcblx0XHRcdFx0bmFtZTogJ2ZpcnN0TmFtZScsXG5cdFx0XHRcdHR5cGU6ICdzdHJpbmcnLFxuXHRcdFx0XHRkaXNwbGF5T3B0aW9uczoge1xuXHRcdFx0XHRcdHNob3c6IHtcblx0XHRcdFx0XHRcdG9wZXJhdGlvbjogWydjcmVhdGUnXSxcblx0XHRcdFx0XHRcdHJlc291cmNlOiBbJ3FyQ29kZSddLFxuXHRcdFx0XHRcdFx0dHlwZUlkOiBbNF0sXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0fSxcblx0XHRcdFx0ZGVmYXVsdDogJycsXG5cdFx0XHRcdGRlc2NyaXB0aW9uOiAnQ29udGFjdCBmaXJzdCBuYW1lIChhdCBsZWFzdCBvbmUgb2YgZmlyc3QgbmFtZSwgbGFzdCBuYW1lLCBvciBwaG9uZSBpcyByZXF1aXJlZCknLFxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0ZGlzcGxheU5hbWU6ICdMYXN0IE5hbWUnLFxuXHRcdFx0XHRuYW1lOiAnbGFzdE5hbWUnLFxuXHRcdFx0XHR0eXBlOiAnc3RyaW5nJyxcblx0XHRcdFx0ZGlzcGxheU9wdGlvbnM6IHtcblx0XHRcdFx0XHRzaG93OiB7XG5cdFx0XHRcdFx0XHRvcGVyYXRpb246IFsnY3JlYXRlJ10sXG5cdFx0XHRcdFx0XHRyZXNvdXJjZTogWydxckNvZGUnXSxcblx0XHRcdFx0XHRcdHR5cGVJZDogWzRdLFxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdH0sXG5cdFx0XHRcdGRlZmF1bHQ6ICcnLFxuXHRcdFx0XHRkZXNjcmlwdGlvbjogJ0NvbnRhY3QgbGFzdCBuYW1lJyxcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdGRpc3BsYXlOYW1lOiAnUGhvbmUgKHZDYXJkKScsXG5cdFx0XHRcdG5hbWU6ICd2Y2FyZFBob25lJyxcblx0XHRcdFx0dHlwZTogJ3N0cmluZycsXG5cdFx0XHRcdGRpc3BsYXlPcHRpb25zOiB7XG5cdFx0XHRcdFx0c2hvdzoge1xuXHRcdFx0XHRcdFx0b3BlcmF0aW9uOiBbJ2NyZWF0ZSddLFxuXHRcdFx0XHRcdFx0cmVzb3VyY2U6IFsncXJDb2RlJ10sXG5cdFx0XHRcdFx0XHR0eXBlSWQ6IFs0XSxcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHR9LFxuXHRcdFx0XHRkZWZhdWx0OiAnJyxcblx0XHRcdFx0cGxhY2Vob2xkZXI6ICcrMTIzNDU2Nzg5MCcsXG5cdFx0XHRcdGRlc2NyaXB0aW9uOiAnQ29udGFjdCBwaG9uZSBudW1iZXInLFxuXHRcdFx0fSxcblxuXHRcdFx0Ly8g4pSA4pSA4pSAIFNoYXJlZCBmaWVsZHMgZm9yIGdldC91cGRhdGUvZGVsZXRlL2dldFNjYW5zIOKUgOKUgOKUgFxuXHRcdFx0e1xuXHRcdFx0XHRkaXNwbGF5TmFtZTogJ1FSIENvZGUgSUQnLFxuXHRcdFx0XHRuYW1lOiAncXJDb2RlSWQnLFxuXHRcdFx0XHR0eXBlOiAnc3RyaW5nJyxcblx0XHRcdFx0ZGlzcGxheU9wdGlvbnM6IHtcblx0XHRcdFx0XHRzaG93OiB7XG5cdFx0XHRcdFx0XHRvcGVyYXRpb246IFsndXBkYXRlJywgJ2dldCcsICdkZWxldGUnLCAnZ2V0U2NhbnMnXSxcblx0XHRcdFx0XHRcdHJlc291cmNlOiBbJ3FyQ29kZSddLFxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdH0sXG5cdFx0XHRcdGRlZmF1bHQ6ICcnLFxuXHRcdFx0XHRkZXNjcmlwdGlvbjogJ1RoZSBJRCBvZiB0aGUgUVIgY29kZScsXG5cdFx0XHRcdHJlcXVpcmVkOiB0cnVlLFxuXHRcdFx0fSxcblxuXHRcdFx0Ly8g4pSA4pSA4pSAIENyZWF0ZSAmIFVwZGF0ZTogQ29tbW9uIG9wdGlvbmFsIGZpZWxkcyDilIDilIDilIBcblx0XHRcdHtcblx0XHRcdFx0ZGlzcGxheU5hbWU6ICdOYW1lJyxcblx0XHRcdFx0bmFtZTogJ25hbWUnLFxuXHRcdFx0XHR0eXBlOiAnc3RyaW5nJyxcblx0XHRcdFx0ZGlzcGxheU9wdGlvbnM6IHtcblx0XHRcdFx0XHRzaG93OiB7XG5cdFx0XHRcdFx0XHRvcGVyYXRpb246IFsnY3JlYXRlJywgJ3VwZGF0ZSddLFxuXHRcdFx0XHRcdFx0cmVzb3VyY2U6IFsncXJDb2RlJ10sXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0fSxcblx0XHRcdFx0ZGVmYXVsdDogJycsXG5cdFx0XHRcdHBsYWNlaG9sZGVyOiAnTXkgUVIgQ29kZScsXG5cdFx0XHRcdGRlc2NyaXB0aW9uOiAnRGlzcGxheSBuYW1lIGZvciB0aGUgUVIgY29kZScsXG5cdFx0XHR9LFxuXG5cdFx0XHQvLyDilIDilIDilIAgTGlzdCBvcHRpb25zIOKUgOKUgOKUgFxuXHRcdFx0e1xuXHRcdFx0XHRkaXNwbGF5TmFtZTogJ1JldHVybiBBbGwnLFxuXHRcdFx0XHRuYW1lOiAncmV0dXJuQWxsJyxcblx0XHRcdFx0dHlwZTogJ2Jvb2xlYW4nLFxuXHRcdFx0XHRkaXNwbGF5T3B0aW9uczoge1xuXHRcdFx0XHRcdHNob3c6IHtcblx0XHRcdFx0XHRcdG9wZXJhdGlvbjogWydsaXN0J10sXG5cdFx0XHRcdFx0XHRyZXNvdXJjZTogWydxckNvZGUnXSxcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHR9LFxuXHRcdFx0XHRkZWZhdWx0OiBmYWxzZSxcblx0XHRcdFx0ZGVzY3JpcHRpb246ICdXaGV0aGVyIHRvIHJldHVybiBhbGwgcmVzdWx0cyBvciBvbmx5IHVwIHRvIGEgZ2l2ZW4gbGltaXQnLFxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0ZGlzcGxheU5hbWU6ICdMaW1pdCcsXG5cdFx0XHRcdG5hbWU6ICdsaW1pdCcsXG5cdFx0XHRcdHR5cGU6ICdudW1iZXInLFxuXHRcdFx0XHRkaXNwbGF5T3B0aW9uczoge1xuXHRcdFx0XHRcdHNob3c6IHtcblx0XHRcdFx0XHRcdG9wZXJhdGlvbjogWydsaXN0J10sXG5cdFx0XHRcdFx0XHRyZXNvdXJjZTogWydxckNvZGUnXSxcblx0XHRcdFx0XHRcdHJldHVybkFsbDogW2ZhbHNlXSxcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHR9LFxuXHRcdFx0XHR0eXBlT3B0aW9uczoge1xuXHRcdFx0XHRcdG1pblZhbHVlOiAxLFxuXHRcdFx0XHR9LFxuXHRcdFx0XHRkZWZhdWx0OiA1MCxcblx0XHRcdFx0ZGVzY3JpcHRpb246ICdNYXggbnVtYmVyIG9mIHJlc3VsdHMgdG8gcmV0dXJuJyxcblx0XHRcdH0sXG5cblx0XHRcdC8vIOKUgOKUgOKUgCBBZGRpdGlvbmFsIEZpZWxkcyAoQ3JlYXRlKSDilIDilIDilIBcblx0XHRcdHtcblx0XHRcdFx0ZGlzcGxheU5hbWU6ICdBZGRpdGlvbmFsIEZpZWxkcycsXG5cdFx0XHRcdG5hbWU6ICdhZGRpdGlvbmFsRmllbGRzJyxcblx0XHRcdFx0dHlwZTogJ2NvbGxlY3Rpb24nLFxuXHRcdFx0XHRwbGFjZWhvbGRlcjogJ0FkZCBGaWVsZCcsXG5cdFx0XHRcdGRlZmF1bHQ6IHt9LFxuXHRcdFx0XHRkaXNwbGF5T3B0aW9uczoge1xuXHRcdFx0XHRcdHNob3c6IHtcblx0XHRcdFx0XHRcdG9wZXJhdGlvbjogWydjcmVhdGUnXSxcblx0XHRcdFx0XHRcdHJlc291cmNlOiBbJ3FyQ29kZSddLFxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdH0sXG5cdFx0XHRcdG9wdGlvbnM6IFtcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRkaXNwbGF5TmFtZTogJ1Nob3J0IExpbmsgRG9tYWluJyxcblx0XHRcdFx0XHRcdG5hbWU6ICdzaG9ydF9saW5rX2RvbWFpbicsXG5cdFx0XHRcdFx0XHR0eXBlOiAnc3RyaW5nJyxcblx0XHRcdFx0XHRcdGRlZmF1bHQ6ICcnLFxuXHRcdFx0XHRcdFx0cGxhY2Vob2xkZXI6ICd1cXIuc2gnLFxuXHRcdFx0XHRcdFx0ZGVzY3JpcHRpb246ICdEb21haW4gZm9yIHRoZSBzaG9ydCBsaW5rIChlLmcuIHVxci5zaCkuIFVzZXMgc3lzdGVtIGRlZmF1bHQgaWYgbm90IHNwZWNpZmllZC4nLFxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0ZGlzcGxheU5hbWU6ICdGb2xkZXIgSUQnLFxuXHRcdFx0XHRcdFx0bmFtZTogJ2ZvbGRlcl9pZCcsXG5cdFx0XHRcdFx0XHR0eXBlOiAnc3RyaW5nJyxcblx0XHRcdFx0XHRcdGRlZmF1bHQ6ICcnLFxuXHRcdFx0XHRcdFx0ZGVzY3JpcHRpb246ICdGb2xkZXIgVVVJRCB0byBvcmdhbml6ZSBRUiBjb2RlcycsXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRkaXNwbGF5TmFtZTogJ1RlbXBsYXRlIElEJyxcblx0XHRcdFx0XHRcdG5hbWU6ICd0ZW1wbGF0ZV9pZCcsXG5cdFx0XHRcdFx0XHR0eXBlOiAnc3RyaW5nJyxcblx0XHRcdFx0XHRcdGRlZmF1bHQ6ICcnLFxuXHRcdFx0XHRcdFx0ZGVzY3JpcHRpb246ICdEZXNpZ24gdGVtcGxhdGUgVVVJRCB0byBhcHBseScsXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRkaXNwbGF5TmFtZTogJ1RlYW0gSUQnLFxuXHRcdFx0XHRcdFx0bmFtZTogJ3RlYW1faWQnLFxuXHRcdFx0XHRcdFx0dHlwZTogJ3N0cmluZycsXG5cdFx0XHRcdFx0XHRkZWZhdWx0OiAnJyxcblx0XHRcdFx0XHRcdGRlc2NyaXB0aW9uOiAnVGVhbSBVVUlEIHRvIGFzc2lnbiB0aGUgUVIgY29kZSB0bycsXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRkaXNwbGF5TmFtZTogJ09wdGlvbnMgKEpTT04pJyxcblx0XHRcdFx0XHRcdG5hbWU6ICdvcHRpb25zJyxcblx0XHRcdFx0XHRcdHR5cGU6ICdqc29uJyxcblx0XHRcdFx0XHRcdGRlZmF1bHQ6ICcnLFxuXHRcdFx0XHRcdFx0ZGVzY3JpcHRpb246ICdRUiBjb2RlIGRlc2lnbiBvcHRpb25zIGFzIEpTT04gKGRvdHNPcHRpb25zLCBiYWNrZ3JvdW5kT3B0aW9ucywgY29ybmVyc1NxdWFyZU9wdGlvbnMsIGV0Yy4pJyxcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdGRpc3BsYXlOYW1lOiAnVGhlbWUgKEpTT04pJyxcblx0XHRcdFx0XHRcdG5hbWU6ICd0aGVtZScsXG5cdFx0XHRcdFx0XHR0eXBlOiAnanNvbicsXG5cdFx0XHRcdFx0XHRkZWZhdWx0OiAnJyxcblx0XHRcdFx0XHRcdGRlc2NyaXB0aW9uOiAnVGhlbWUgY29uZmlndXJhdGlvbiBmb3IgbGFuZGluZyBwYWdlcyBhcyBKU09OJyxcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdC8vIFR5cGUtc3BlY2lmaWMgb3B0aW9uYWwgZmllbGRzXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0ZGlzcGxheU5hbWU6ICdFbWFpbCBTdWJqZWN0Jyxcblx0XHRcdFx0XHRcdG5hbWU6ICdzdWJqZWN0Jyxcblx0XHRcdFx0XHRcdHR5cGU6ICdzdHJpbmcnLFxuXHRcdFx0XHRcdFx0ZGVmYXVsdDogJycsXG5cdFx0XHRcdFx0XHRkZXNjcmlwdGlvbjogJ0VtYWlsIHN1YmplY3QgKGZvciBFbWFpbCBRUiB0eXBlKScsXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRkaXNwbGF5TmFtZTogJ0VtYWlsIEJvZHknLFxuXHRcdFx0XHRcdFx0bmFtZTogJ2JvZHknLFxuXHRcdFx0XHRcdFx0dHlwZTogJ3N0cmluZycsXG5cdFx0XHRcdFx0XHRkZWZhdWx0OiAnJyxcblx0XHRcdFx0XHRcdGRlc2NyaXB0aW9uOiAnRW1haWwgYm9keSB0ZXh0IChmb3IgRW1haWwgUVIgdHlwZSknLFxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0ZGlzcGxheU5hbWU6ICdTTVMgTWVzc2FnZScsXG5cdFx0XHRcdFx0XHRuYW1lOiAnbWVzc2FnZScsXG5cdFx0XHRcdFx0XHR0eXBlOiAnc3RyaW5nJyxcblx0XHRcdFx0XHRcdGRlZmF1bHQ6ICcnLFxuXHRcdFx0XHRcdFx0ZGVzY3JpcHRpb246ICdTTVMgbWVzc2FnZSB0ZXh0IChmb3IgU01TIFFSIHR5cGUpJyxcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdGRpc3BsYXlOYW1lOiAnV2lGaSBQYXNzd29yZCcsXG5cdFx0XHRcdFx0XHRuYW1lOiAncGFzc3dvcmQnLFxuXHRcdFx0XHRcdFx0dHlwZTogJ3N0cmluZycsXG5cdFx0XHRcdFx0XHRkZWZhdWx0OiAnJyxcblx0XHRcdFx0XHRcdGRlc2NyaXB0aW9uOiAnV2lGaSBwYXNzd29yZCAoZm9yIFdpRmkgUVIgdHlwZSknLFxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0ZGlzcGxheU5hbWU6ICdXaUZpIFNlY3VyaXR5Jyxcblx0XHRcdFx0XHRcdG5hbWU6ICdzZWN1cml0eScsXG5cdFx0XHRcdFx0XHR0eXBlOiAnb3B0aW9ucycsXG5cdFx0XHRcdFx0XHRvcHRpb25zOiBbXG5cdFx0XHRcdFx0XHRcdHsgbmFtZTogJ1dQQS9XUEEyJywgdmFsdWU6ICdXUEEnIH0sXG5cdFx0XHRcdFx0XHRcdHsgbmFtZTogJ1dFUCcsIHZhbHVlOiAnV0VQJyB9LFxuXHRcdFx0XHRcdFx0XHR7IG5hbWU6ICdOb25lJywgdmFsdWU6ICdub3Bhc3MnIH0sXG5cdFx0XHRcdFx0XHRdLFxuXHRcdFx0XHRcdFx0ZGVmYXVsdDogJ1dQQScsXG5cdFx0XHRcdFx0XHRkZXNjcmlwdGlvbjogJ1dpRmkgc2VjdXJpdHkgdHlwZSAoZm9yIFdpRmkgUVIgdHlwZSknLFxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0ZGlzcGxheU5hbWU6ICdMb2NhdGlvbiBOYW1lJyxcblx0XHRcdFx0XHRcdG5hbWU6ICdsb2NhdGlvbicsXG5cdFx0XHRcdFx0XHR0eXBlOiAnc3RyaW5nJyxcblx0XHRcdFx0XHRcdGRlZmF1bHQ6ICcnLFxuXHRcdFx0XHRcdFx0ZGVzY3JpcHRpb246ICdMb2NhdGlvbiBuYW1lIChmb3IgTG9jYXRpb24gUVIgdHlwZSknLFxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0ZGlzcGxheU5hbWU6ICdQREYgRGVzY3JpcHRpb24nLFxuXHRcdFx0XHRcdFx0bmFtZTogJ3BkZl9kZXNjcmlwdGlvbicsXG5cdFx0XHRcdFx0XHR0eXBlOiAnc3RyaW5nJyxcblx0XHRcdFx0XHRcdGRlZmF1bHQ6ICcnLFxuXHRcdFx0XHRcdFx0ZGVzY3JpcHRpb246ICdEZXNjcmlwdGlvbiBmb3IgdGhlIFBERiAoZm9yIFBERiBRUiB0eXBlKScsXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRkaXNwbGF5TmFtZTogJ0ltYWdlIERlc2NyaXB0aW9uJyxcblx0XHRcdFx0XHRcdG5hbWU6ICdpbWFnZV9kZXNjcmlwdGlvbicsXG5cdFx0XHRcdFx0XHR0eXBlOiAnc3RyaW5nJyxcblx0XHRcdFx0XHRcdGRlZmF1bHQ6ICcnLFxuXHRcdFx0XHRcdFx0ZGVzY3JpcHRpb246ICdEZXNjcmlwdGlvbiBmb3IgdGhlIGltYWdlIChmb3IgSW1hZ2UgUVIgdHlwZSknLFxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0ZGlzcGxheU5hbWU6ICdGaWxlIERlc2NyaXB0aW9uJyxcblx0XHRcdFx0XHRcdG5hbWU6ICdmaWxlX2Rlc2NyaXB0aW9uJyxcblx0XHRcdFx0XHRcdHR5cGU6ICdzdHJpbmcnLFxuXHRcdFx0XHRcdFx0ZGVmYXVsdDogJycsXG5cdFx0XHRcdFx0XHRkZXNjcmlwdGlvbjogJ0Rlc2NyaXB0aW9uIGZvciB0aGUgZmlsZSAoZm9yIEZpbGUgUVIgdHlwZSknLFxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0ZGlzcGxheU5hbWU6ICdHYWxsZXJ5IERlc2NyaXB0aW9uJyxcblx0XHRcdFx0XHRcdG5hbWU6ICdpbWFnZV9nYWxsZXJ5X2Rlc2NyaXB0aW9uJyxcblx0XHRcdFx0XHRcdHR5cGU6ICdzdHJpbmcnLFxuXHRcdFx0XHRcdFx0ZGVmYXVsdDogJycsXG5cdFx0XHRcdFx0XHRkZXNjcmlwdGlvbjogJ0Rlc2NyaXB0aW9uIGZvciB0aGUgZ2FsbGVyeSAoZm9yIEltYWdlIEdhbGxlcnkgUVIgdHlwZSknLFxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0ZGlzcGxheU5hbWU6ICdMaW5rcyBEZXNjcmlwdGlvbicsXG5cdFx0XHRcdFx0XHRuYW1lOiAnbGlua3NfZGVzY3JpcHRpb24nLFxuXHRcdFx0XHRcdFx0dHlwZTogJ3N0cmluZycsXG5cdFx0XHRcdFx0XHRkZWZhdWx0OiAnJyxcblx0XHRcdFx0XHRcdGRlc2NyaXB0aW9uOiAnRGVzY3JpcHRpb24gZm9yIHRoZSBsaW5rcyBwYWdlIChmb3IgTGlzdCBvZiBMaW5rcyBRUiB0eXBlKScsXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRkaXNwbGF5TmFtZTogJ01QMyBEZXNjcmlwdGlvbicsXG5cdFx0XHRcdFx0XHRuYW1lOiAnbXAzX2Rlc2NyaXB0aW9uJyxcblx0XHRcdFx0XHRcdHR5cGU6ICdzdHJpbmcnLFxuXHRcdFx0XHRcdFx0ZGVmYXVsdDogJycsXG5cdFx0XHRcdFx0XHRkZXNjcmlwdGlvbjogJ0Rlc2NyaXB0aW9uIGZvciB0aGUgYXVkaW8gKGZvciBNUDMgUVIgdHlwZSknLFxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0ZGlzcGxheU5hbWU6ICdNUDMgQ292ZXIgSW1hZ2UgVVJMJyxcblx0XHRcdFx0XHRcdG5hbWU6ICdtcDNfY292ZXJfaW1hZ2VfdXJsJyxcblx0XHRcdFx0XHRcdHR5cGU6ICdzdHJpbmcnLFxuXHRcdFx0XHRcdFx0ZGVmYXVsdDogJycsXG5cdFx0XHRcdFx0XHRkZXNjcmlwdGlvbjogJ0NvdmVyIGltYWdlIFVSTCAoZm9yIE1QMyBRUiB0eXBlKScsXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHQvLyB2Q2FyZCBvcHRpb25hbCBmaWVsZHNcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRkaXNwbGF5TmFtZTogJ0VtYWlsICh2Q2FyZCknLFxuXHRcdFx0XHRcdFx0bmFtZTogJ3ZjYXJkRW1haWwnLFxuXHRcdFx0XHRcdFx0dHlwZTogJ3N0cmluZycsXG5cdFx0XHRcdFx0XHRkZWZhdWx0OiAnJyxcblx0XHRcdFx0XHRcdGRlc2NyaXB0aW9uOiAnQ29udGFjdCBlbWFpbCBhZGRyZXNzIChmb3IgdkNhcmQgUVIgdHlwZSknLFxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0ZGlzcGxheU5hbWU6ICdDb21wYW55Jyxcblx0XHRcdFx0XHRcdG5hbWU6ICdjb21wYW55Jyxcblx0XHRcdFx0XHRcdHR5cGU6ICdzdHJpbmcnLFxuXHRcdFx0XHRcdFx0ZGVmYXVsdDogJycsXG5cdFx0XHRcdFx0XHRkZXNjcmlwdGlvbjogJ0NvbXBhbnkgbmFtZSAoZm9yIHZDYXJkIFFSIHR5cGUpJyxcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdGRpc3BsYXlOYW1lOiAnSm9iIFRpdGxlJyxcblx0XHRcdFx0XHRcdG5hbWU6ICdqb2JfdGl0bGUnLFxuXHRcdFx0XHRcdFx0dHlwZTogJ3N0cmluZycsXG5cdFx0XHRcdFx0XHRkZWZhdWx0OiAnJyxcblx0XHRcdFx0XHRcdGRlc2NyaXB0aW9uOiAnSm9iIHRpdGxlIChmb3IgdkNhcmQgUVIgdHlwZSknLFxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0ZGlzcGxheU5hbWU6ICdBZGRyZXNzJyxcblx0XHRcdFx0XHRcdG5hbWU6ICdhZGRyZXNzJyxcblx0XHRcdFx0XHRcdHR5cGU6ICdzdHJpbmcnLFxuXHRcdFx0XHRcdFx0ZGVmYXVsdDogJycsXG5cdFx0XHRcdFx0XHRkZXNjcmlwdGlvbjogJ1N0cmVldCBhZGRyZXNzIChmb3IgdkNhcmQgUVIgdHlwZSknLFxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0ZGlzcGxheU5hbWU6ICdDaXR5Jyxcblx0XHRcdFx0XHRcdG5hbWU6ICdjaXR5Jyxcblx0XHRcdFx0XHRcdHR5cGU6ICdzdHJpbmcnLFxuXHRcdFx0XHRcdFx0ZGVmYXVsdDogJycsXG5cdFx0XHRcdFx0XHRkZXNjcmlwdGlvbjogJ0NpdHkgKGZvciB2Q2FyZCBRUiB0eXBlKScsXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRkaXNwbGF5TmFtZTogJ1N0YXRlJyxcblx0XHRcdFx0XHRcdG5hbWU6ICdzdGF0ZScsXG5cdFx0XHRcdFx0XHR0eXBlOiAnc3RyaW5nJyxcblx0XHRcdFx0XHRcdGRlZmF1bHQ6ICcnLFxuXHRcdFx0XHRcdFx0ZGVzY3JpcHRpb246ICdTdGF0ZSBvciBwcm92aW5jZSAoZm9yIHZDYXJkIFFSIHR5cGUpJyxcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdGRpc3BsYXlOYW1lOiAnWklQIENvZGUnLFxuXHRcdFx0XHRcdFx0bmFtZTogJ3ppcCcsXG5cdFx0XHRcdFx0XHR0eXBlOiAnc3RyaW5nJyxcblx0XHRcdFx0XHRcdGRlZmF1bHQ6ICcnLFxuXHRcdFx0XHRcdFx0ZGVzY3JpcHRpb246ICdaSVAgb3IgcG9zdGFsIGNvZGUgKGZvciB2Q2FyZCBRUiB0eXBlKScsXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRkaXNwbGF5TmFtZTogJ0NvdW50cnknLFxuXHRcdFx0XHRcdFx0bmFtZTogJ2NvdW50cnknLFxuXHRcdFx0XHRcdFx0dHlwZTogJ3N0cmluZycsXG5cdFx0XHRcdFx0XHRkZWZhdWx0OiAnJyxcblx0XHRcdFx0XHRcdGRlc2NyaXB0aW9uOiAnQ291bnRyeSAoZm9yIHZDYXJkIFFSIHR5cGUpJyxcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdC8vIFVUTSBQYXJhbWV0ZXJzXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0ZGlzcGxheU5hbWU6ICdVVE0gU291cmNlJyxcblx0XHRcdFx0XHRcdG5hbWU6ICd1dG1fc291cmNlJyxcblx0XHRcdFx0XHRcdHR5cGU6ICdzdHJpbmcnLFxuXHRcdFx0XHRcdFx0ZGVmYXVsdDogJycsXG5cdFx0XHRcdFx0XHRkZXNjcmlwdGlvbjogJ1VUTSBzb3VyY2UgcGFyYW1ldGVyIGZvciB0cmFja2luZycsXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRkaXNwbGF5TmFtZTogJ1VUTSBNZWRpdW0nLFxuXHRcdFx0XHRcdFx0bmFtZTogJ3V0bV9tZWRpdW0nLFxuXHRcdFx0XHRcdFx0dHlwZTogJ3N0cmluZycsXG5cdFx0XHRcdFx0XHRkZWZhdWx0OiAnJyxcblx0XHRcdFx0XHRcdGRlc2NyaXB0aW9uOiAnVVRNIG1lZGl1bSBwYXJhbWV0ZXIgZm9yIHRyYWNraW5nJyxcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdGRpc3BsYXlOYW1lOiAnVVRNIENhbXBhaWduJyxcblx0XHRcdFx0XHRcdG5hbWU6ICd1dG1fY2FtcGFpZ24nLFxuXHRcdFx0XHRcdFx0dHlwZTogJ3N0cmluZycsXG5cdFx0XHRcdFx0XHRkZWZhdWx0OiAnJyxcblx0XHRcdFx0XHRcdGRlc2NyaXB0aW9uOiAnVVRNIGNhbXBhaWduIHBhcmFtZXRlciBmb3IgdHJhY2tpbmcnLFxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdF0sXG5cdFx0XHR9LFxuXG5cdFx0XHQvLyDilIDilIDilIAgQWRkaXRpb25hbCBGaWVsZHMgKFVwZGF0ZSkg4pSA4pSA4pSAXG5cdFx0XHR7XG5cdFx0XHRcdGRpc3BsYXlOYW1lOiAnVXBkYXRlIEZpZWxkcycsXG5cdFx0XHRcdG5hbWU6ICd1cGRhdGVGaWVsZHMnLFxuXHRcdFx0XHR0eXBlOiAnY29sbGVjdGlvbicsXG5cdFx0XHRcdHBsYWNlaG9sZGVyOiAnQWRkIEZpZWxkJyxcblx0XHRcdFx0ZGVmYXVsdDoge30sXG5cdFx0XHRcdGRpc3BsYXlPcHRpb25zOiB7XG5cdFx0XHRcdFx0c2hvdzoge1xuXHRcdFx0XHRcdFx0b3BlcmF0aW9uOiBbJ3VwZGF0ZSddLFxuXHRcdFx0XHRcdFx0cmVzb3VyY2U6IFsncXJDb2RlJ10sXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0fSxcblx0XHRcdFx0b3B0aW9uczogW1xuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdGRpc3BsYXlOYW1lOiAnVVJMJyxcblx0XHRcdFx0XHRcdG5hbWU6ICd1cmwnLFxuXHRcdFx0XHRcdFx0dHlwZTogJ3N0cmluZycsXG5cdFx0XHRcdFx0XHRkZWZhdWx0OiAnJyxcblx0XHRcdFx0XHRcdGRlc2NyaXB0aW9uOiAnTmV3IFVSTCAoZm9yIFdlYnNpdGUgUVIgdHlwZSknLFxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0ZGlzcGxheU5hbWU6ICdUZXh0Jyxcblx0XHRcdFx0XHRcdG5hbWU6ICd0ZXh0Jyxcblx0XHRcdFx0XHRcdHR5cGU6ICdzdHJpbmcnLFxuXHRcdFx0XHRcdFx0ZGVmYXVsdDogJycsXG5cdFx0XHRcdFx0XHRkZXNjcmlwdGlvbjogJ05ldyB0ZXh0IGNvbnRlbnQgKGZvciBUZXh0IFFSIHR5cGUpJyxcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdGRpc3BsYXlOYW1lOiAnU2hvcnQgTGluayBEb21haW4nLFxuXHRcdFx0XHRcdFx0bmFtZTogJ3Nob3J0X2xpbmtfZG9tYWluJyxcblx0XHRcdFx0XHRcdHR5cGU6ICdzdHJpbmcnLFxuXHRcdFx0XHRcdFx0ZGVmYXVsdDogJycsXG5cdFx0XHRcdFx0XHRwbGFjZWhvbGRlcjogJ3Vxci5zaCcsXG5cdFx0XHRcdFx0XHRkZXNjcmlwdGlvbjogJ0NoYW5nZSB0aGUgc2hvcnQgbGluayBkb21haW4nLFxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0ZGlzcGxheU5hbWU6ICdTdGF0dXMnLFxuXHRcdFx0XHRcdFx0bmFtZTogJ3N0YXR1cycsXG5cdFx0XHRcdFx0XHR0eXBlOiAnb3B0aW9ucycsXG5cdFx0XHRcdFx0XHRvcHRpb25zOiBbXG5cdFx0XHRcdFx0XHRcdHsgbmFtZTogJ0FjdGl2ZScsIHZhbHVlOiAxIH0sXG5cdFx0XHRcdFx0XHRcdHsgbmFtZTogJ0luYWN0aXZlJywgdmFsdWU6IDIgfSxcblx0XHRcdFx0XHRcdF0sXG5cdFx0XHRcdFx0XHRkZWZhdWx0OiAxLFxuXHRcdFx0XHRcdFx0ZGVzY3JpcHRpb246ICdRUiBjb2RlIHN0YXR1cycsXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRkaXNwbGF5TmFtZTogJ0ZvbGRlciBJRCcsXG5cdFx0XHRcdFx0XHRuYW1lOiAnZm9sZGVyX2lkJyxcblx0XHRcdFx0XHRcdHR5cGU6ICdzdHJpbmcnLFxuXHRcdFx0XHRcdFx0ZGVmYXVsdDogJycsXG5cdFx0XHRcdFx0XHRkZXNjcmlwdGlvbjogJ0ZvbGRlciBVVUlEIHRvIG1vdmUgUVIgY29kZSBpbnRvJyxcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdGRpc3BsYXlOYW1lOiAnVGVtcGxhdGUgSUQnLFxuXHRcdFx0XHRcdFx0bmFtZTogJ3RlbXBsYXRlX2lkJyxcblx0XHRcdFx0XHRcdHR5cGU6ICdzdHJpbmcnLFxuXHRcdFx0XHRcdFx0ZGVmYXVsdDogJycsXG5cdFx0XHRcdFx0XHRkZXNjcmlwdGlvbjogJ0Rlc2lnbiB0ZW1wbGF0ZSBVVUlEIHRvIGFwcGx5Jyxcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdGRpc3BsYXlOYW1lOiAnT3B0aW9ucyAoSlNPTiknLFxuXHRcdFx0XHRcdFx0bmFtZTogJ29wdGlvbnMnLFxuXHRcdFx0XHRcdFx0dHlwZTogJ2pzb24nLFxuXHRcdFx0XHRcdFx0ZGVmYXVsdDogJycsXG5cdFx0XHRcdFx0XHRkZXNjcmlwdGlvbjogJ1FSIGNvZGUgZGVzaWduIG9wdGlvbnMgYXMgSlNPTicsXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRkaXNwbGF5TmFtZTogJ1RoZW1lIChKU09OKScsXG5cdFx0XHRcdFx0XHRuYW1lOiAndGhlbWUnLFxuXHRcdFx0XHRcdFx0dHlwZTogJ2pzb24nLFxuXHRcdFx0XHRcdFx0ZGVmYXVsdDogJycsXG5cdFx0XHRcdFx0XHRkZXNjcmlwdGlvbjogJ1RoZW1lIGNvbmZpZ3VyYXRpb24gYXMgSlNPTicsXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRkaXNwbGF5TmFtZTogJ1VUTSBTb3VyY2UnLFxuXHRcdFx0XHRcdFx0bmFtZTogJ3V0bV9zb3VyY2UnLFxuXHRcdFx0XHRcdFx0dHlwZTogJ3N0cmluZycsXG5cdFx0XHRcdFx0XHRkZWZhdWx0OiAnJyxcblx0XHRcdFx0XHRcdGRlc2NyaXB0aW9uOiAnVVRNIHNvdXJjZSBwYXJhbWV0ZXInLFxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0ZGlzcGxheU5hbWU6ICdVVE0gTWVkaXVtJyxcblx0XHRcdFx0XHRcdG5hbWU6ICd1dG1fbWVkaXVtJyxcblx0XHRcdFx0XHRcdHR5cGU6ICdzdHJpbmcnLFxuXHRcdFx0XHRcdFx0ZGVmYXVsdDogJycsXG5cdFx0XHRcdFx0XHRkZXNjcmlwdGlvbjogJ1VUTSBtZWRpdW0gcGFyYW1ldGVyJyxcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdGRpc3BsYXlOYW1lOiAnVVRNIENhbXBhaWduJyxcblx0XHRcdFx0XHRcdG5hbWU6ICd1dG1fY2FtcGFpZ24nLFxuXHRcdFx0XHRcdFx0dHlwZTogJ3N0cmluZycsXG5cdFx0XHRcdFx0XHRkZWZhdWx0OiAnJyxcblx0XHRcdFx0XHRcdGRlc2NyaXB0aW9uOiAnVVRNIGNhbXBhaWduIHBhcmFtZXRlcicsXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XSxcblx0XHRcdH0sXG5cblx0XHRcdC8vIOKUgOKUgOKUgCBBbmFseXRpY3MgRmlsdGVycyDilIDilIDilIBcblx0XHRcdHtcblx0XHRcdFx0ZGlzcGxheU5hbWU6ICdGaWx0ZXJzJyxcblx0XHRcdFx0bmFtZTogJ2ZpbHRlcnMnLFxuXHRcdFx0XHR0eXBlOiAnY29sbGVjdGlvbicsXG5cdFx0XHRcdHBsYWNlaG9sZGVyOiAnQWRkIEZpbHRlcicsXG5cdFx0XHRcdGRlZmF1bHQ6IHt9LFxuXHRcdFx0XHRkaXNwbGF5T3B0aW9uczoge1xuXHRcdFx0XHRcdHNob3c6IHtcblx0XHRcdFx0XHRcdHJlc291cmNlOiBbJ2FuYWx5dGljcyddLFxuXHRcdFx0XHRcdFx0b3BlcmF0aW9uOiBbJ2dldFNjYW5zJ10sXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0fSxcblx0XHRcdFx0b3B0aW9uczogW1xuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdGRpc3BsYXlOYW1lOiAnUVIgQ29kZSBJRCcsXG5cdFx0XHRcdFx0XHRuYW1lOiAncXJDb2RlSWQnLFxuXHRcdFx0XHRcdFx0dHlwZTogJ3N0cmluZycsXG5cdFx0XHRcdFx0XHRkZWZhdWx0OiAnJyxcblx0XHRcdFx0XHRcdGRlc2NyaXB0aW9uOiAnRmlsdGVyIGJ5IHNwZWNpZmljIFFSIGNvZGUgSUQnLFxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0ZGlzcGxheU5hbWU6ICdTdGFydCBEYXRlJyxcblx0XHRcdFx0XHRcdG5hbWU6ICdzdGFydERhdGUnLFxuXHRcdFx0XHRcdFx0dHlwZTogJ2RhdGVUaW1lJyxcblx0XHRcdFx0XHRcdGRlZmF1bHQ6ICcnLFxuXHRcdFx0XHRcdFx0ZGVzY3JpcHRpb246ICdGaWx0ZXIgc2NhbnMgZnJvbSB0aGlzIGRhdGUnLFxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0ZGlzcGxheU5hbWU6ICdFbmQgRGF0ZScsXG5cdFx0XHRcdFx0XHRuYW1lOiAnZW5kRGF0ZScsXG5cdFx0XHRcdFx0XHR0eXBlOiAnZGF0ZVRpbWUnLFxuXHRcdFx0XHRcdFx0ZGVmYXVsdDogJycsXG5cdFx0XHRcdFx0XHRkZXNjcmlwdGlvbjogJ0ZpbHRlciBzY2FucyB1bnRpbCB0aGlzIGRhdGUnLFxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdF0sXG5cdFx0XHR9LFxuXHRcdF0sXG5cdH07XG5cblx0YXN5bmMgZXhlY3V0ZSh0aGlzOiBJRXhlY3V0ZUZ1bmN0aW9ucyk6IFByb21pc2U8SU5vZGVFeGVjdXRpb25EYXRhW11bXT4ge1xuXHRcdGNvbnN0IGl0ZW1zID0gdGhpcy5nZXRJbnB1dERhdGEoKTtcblx0XHRjb25zdCByZXR1cm5EYXRhOiBJTm9kZUV4ZWN1dGlvbkRhdGFbXSA9IFtdO1xuXHRcdGNvbnN0IGxlbmd0aCA9IGl0ZW1zLmxlbmd0aDtcblxuXHRcdGNvbnN0IGNyZWRlbnRpYWxzID0gYXdhaXQgdGhpcy5nZXRDcmVkZW50aWFscygndXFyQWlBcGknKTtcblx0XHRjb25zdCBhcGlLZXkgPSBjcmVkZW50aWFscy5hcGlLZXkgYXMgc3RyaW5nO1xuXHRcdGNvbnN0IGJhc2VVUkwgPSAoY3JlZGVudGlhbHMuYmFzZVVybCBhcyBzdHJpbmcpIHx8ICdodHRwczovL3Vxci5haS9hcGkvdjEnO1xuXG5cdFx0Y29uc3QgcmVzb3VyY2UgPSB0aGlzLmdldE5vZGVQYXJhbWV0ZXIoJ3Jlc291cmNlJywgMCkgYXMgc3RyaW5nO1xuXHRcdGNvbnN0IG9wZXJhdGlvbiA9IHRoaXMuZ2V0Tm9kZVBhcmFtZXRlcignb3BlcmF0aW9uJywgMCkgYXMgc3RyaW5nO1xuXG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuXHRcdFx0dHJ5IHtcblx0XHRcdFx0bGV0IHJlc3BvbnNlRGF0YTogSURhdGFPYmplY3QgPSB7fTtcblxuXHRcdFx0XHRpZiAocmVzb3VyY2UgPT09ICdxckNvZGUnKSB7XG5cdFx0XHRcdFx0aWYgKG9wZXJhdGlvbiA9PT0gJ2NyZWF0ZScpIHtcblx0XHRcdFx0XHRcdGNvbnN0IHR5cGVJZCA9IHRoaXMuZ2V0Tm9kZVBhcmFtZXRlcigndHlwZUlkJywgaSkgYXMgbnVtYmVyO1xuXHRcdFx0XHRcdFx0Y29uc3QgbmFtZSA9IHRoaXMuZ2V0Tm9kZVBhcmFtZXRlcignbmFtZScsIGkpIGFzIHN0cmluZztcblx0XHRcdFx0XHRcdGNvbnN0IGFkZGl0aW9uYWxGaWVsZHMgPSB0aGlzLmdldE5vZGVQYXJhbWV0ZXIoJ2FkZGl0aW9uYWxGaWVsZHMnLCBpKSBhcyBJRGF0YU9iamVjdDtcblxuXHRcdFx0XHRcdFx0Y29uc3QgYm9keTogSURhdGFPYmplY3QgPSB7XG5cdFx0XHRcdFx0XHRcdHR5cGVfaWQ6IHR5cGVJZCxcblx0XHRcdFx0XHRcdH07XG5cblx0XHRcdFx0XHRcdGlmIChuYW1lKSB7XG5cdFx0XHRcdFx0XHRcdGJvZHkubmFtZSA9IG5hbWU7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdC8vIE1hcCB0eXBlLXNwZWNpZmljIHJlcXVpcmVkIGZpZWxkcyB0byBBUEkgZmllbGQgbmFtZXNcblx0XHRcdFx0XHRcdHN3aXRjaCAodHlwZUlkKSB7XG5cdFx0XHRcdFx0XHRcdGNhc2UgMTogLy8gV2Vic2l0ZVxuXHRcdFx0XHRcdFx0XHRcdGJvZHkudXJsID0gdGhpcy5nZXROb2RlUGFyYW1ldGVyKCd1cmwnLCBpKSBhcyBzdHJpbmc7XG5cdFx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHRcdGNhc2UgMjogLy8gVGV4dFxuXHRcdFx0XHRcdFx0XHRcdGJvZHkudGV4dCA9IHRoaXMuZ2V0Tm9kZVBhcmFtZXRlcigndGV4dCcsIGkpIGFzIHN0cmluZztcblx0XHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdFx0Y2FzZSAzOiAvLyBFbWFpbFxuXHRcdFx0XHRcdFx0XHRcdGJvZHkuZW1haWwgPSB0aGlzLmdldE5vZGVQYXJhbWV0ZXIoJ2VtYWlsJywgaSkgYXMgc3RyaW5nO1xuXHRcdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0XHRjYXNlIDQ6IHsgLy8gdkNhcmRcblx0XHRcdFx0XHRcdFx0XHRjb25zdCBmaXJzdE5hbWUgPSB0aGlzLmdldE5vZGVQYXJhbWV0ZXIoJ2ZpcnN0TmFtZScsIGkpIGFzIHN0cmluZztcblx0XHRcdFx0XHRcdFx0XHRjb25zdCBsYXN0TmFtZSA9IHRoaXMuZ2V0Tm9kZVBhcmFtZXRlcignbGFzdE5hbWUnLCBpKSBhcyBzdHJpbmc7XG5cdFx0XHRcdFx0XHRcdFx0Y29uc3QgdmNhcmRQaG9uZSA9IHRoaXMuZ2V0Tm9kZVBhcmFtZXRlcigndmNhcmRQaG9uZScsIGkpIGFzIHN0cmluZztcblx0XHRcdFx0XHRcdFx0XHRpZiAoZmlyc3ROYW1lKSBib2R5LmZpcnN0X25hbWUgPSBmaXJzdE5hbWU7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKGxhc3ROYW1lKSBib2R5Lmxhc3RfbmFtZSA9IGxhc3ROYW1lO1xuXHRcdFx0XHRcdFx0XHRcdGlmICh2Y2FyZFBob25lKSBib2R5LnBob25lID0gdmNhcmRQaG9uZTtcblx0XHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRjYXNlIDU6IC8vIFdpRmlcblx0XHRcdFx0XHRcdFx0XHRib2R5LnNzaWQgPSB0aGlzLmdldE5vZGVQYXJhbWV0ZXIoJ3NzaWQnLCBpKSBhcyBzdHJpbmc7XG5cdFx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHRcdGNhc2UgNjogLy8gUGhvbmVcblx0XHRcdFx0XHRcdFx0Y2FzZSAxMjogLy8gU01TXG5cdFx0XHRcdFx0XHRcdFx0Ym9keS5waG9uZSA9IHRoaXMuZ2V0Tm9kZVBhcmFtZXRlcigncGhvbmUnLCBpKSBhcyBzdHJpbmc7XG5cdFx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHRcdGNhc2UgMTM6IC8vIExvY2F0aW9uXG5cdFx0XHRcdFx0XHRcdFx0Ym9keS5sYXRpdHVkZSA9IHRoaXMuZ2V0Tm9kZVBhcmFtZXRlcignbGF0aXR1ZGUnLCBpKSBhcyBudW1iZXI7XG5cdFx0XHRcdFx0XHRcdFx0Ym9keS5sb25naXR1ZGUgPSB0aGlzLmdldE5vZGVQYXJhbWV0ZXIoJ2xvbmdpdHVkZScsIGkpIGFzIG51bWJlcjtcblx0XHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdFx0Y2FzZSAxNDogLy8gUERGXG5cdFx0XHRcdFx0XHRcdFx0Ym9keS5wZGZfdGl0bGUgPSB0aGlzLmdldE5vZGVQYXJhbWV0ZXIoJ3BkZlRpdGxlJywgaSkgYXMgc3RyaW5nO1xuXHRcdFx0XHRcdFx0XHRcdGJvZHkucGRmX2Rvd25sb2FkX3VybCA9IHRoaXMuZ2V0Tm9kZVBhcmFtZXRlcigncGRmRG93bmxvYWRVcmwnLCBpKSBhcyBzdHJpbmc7XG5cdFx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHRcdGNhc2UgMTU6IC8vIEltYWdlIEdhbGxlcnlcblx0XHRcdFx0XHRcdFx0XHRib2R5LmltYWdlX2dhbGxlcnlfdGl0bGUgPSB0aGlzLmdldE5vZGVQYXJhbWV0ZXIoJ2ltYWdlR2FsbGVyeVRpdGxlJywgaSkgYXMgc3RyaW5nO1xuXHRcdFx0XHRcdFx0XHRcdGJvZHkuaW1hZ2VfZ2FsbGVyeV9pbWFnZXMgPSB0aGlzLmdldE5vZGVQYXJhbWV0ZXIoJ2ltYWdlR2FsbGVyeUltYWdlcycsIGkpO1xuXHRcdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0XHRjYXNlIDE3OiAvLyBJbWFnZVxuXHRcdFx0XHRcdFx0XHRcdGJvZHkuaW1hZ2VfdGl0bGUgPSB0aGlzLmdldE5vZGVQYXJhbWV0ZXIoJ2ltYWdlVGl0bGUnLCBpKSBhcyBzdHJpbmc7XG5cdFx0XHRcdFx0XHRcdFx0Ym9keS5pbWFnZV9kb3dubG9hZF91cmwgPSB0aGlzLmdldE5vZGVQYXJhbWV0ZXIoJ2ltYWdlRG93bmxvYWRVcmwnLCBpKSBhcyBzdHJpbmc7XG5cdFx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHRcdGNhc2UgMTk6IC8vIEZpbGVcblx0XHRcdFx0XHRcdFx0XHRib2R5LmZpbGVfdGl0bGUgPSB0aGlzLmdldE5vZGVQYXJhbWV0ZXIoJ2ZpbGVUaXRsZScsIGkpIGFzIHN0cmluZztcblx0XHRcdFx0XHRcdFx0XHRib2R5LmZpbGVfZG93bmxvYWRfdXJsID0gdGhpcy5nZXROb2RlUGFyYW1ldGVyKCdmaWxlRG93bmxvYWRVcmwnLCBpKSBhcyBzdHJpbmc7XG5cdFx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHRcdGNhc2UgMjA6IC8vIExpc3Qgb2YgTGlua3Ncblx0XHRcdFx0XHRcdFx0XHRib2R5LmxpbmtzX3RpdGxlID0gdGhpcy5nZXROb2RlUGFyYW1ldGVyKCdsaW5rc1RpdGxlJywgaSkgYXMgc3RyaW5nO1xuXHRcdFx0XHRcdFx0XHRcdGJvZHkubGlua3NfbGlzdCA9IHRoaXMuZ2V0Tm9kZVBhcmFtZXRlcignbGlua3NMaXN0JywgaSk7XG5cdFx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHRcdGNhc2UgMjE6IC8vIE1QM1xuXHRcdFx0XHRcdFx0XHRcdGJvZHkubXAzX3RpdGxlID0gdGhpcy5nZXROb2RlUGFyYW1ldGVyKCdtcDNUaXRsZScsIGkpIGFzIHN0cmluZztcblx0XHRcdFx0XHRcdFx0XHRib2R5Lm1wM19maWxlX3VybCA9IHRoaXMuZ2V0Tm9kZVBhcmFtZXRlcignbXAzRmlsZVVybCcsIGkpIGFzIHN0cmluZztcblx0XHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0Ly8gTWFwIGFkZGl0aW9uYWwgZmllbGRzLCByZW5hbWluZyB2Q2FyZC1zcGVjaWZpYyBrZXlzXG5cdFx0XHRcdFx0XHRpZiAoYWRkaXRpb25hbEZpZWxkcy52Y2FyZEVtYWlsKSB7XG5cdFx0XHRcdFx0XHRcdGJvZHkuZW1haWwgPSBhZGRpdGlvbmFsRmllbGRzLnZjYXJkRW1haWw7XG5cdFx0XHRcdFx0XHRcdGRlbGV0ZSBhZGRpdGlvbmFsRmllbGRzLnZjYXJkRW1haWw7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdC8vIFBhcnNlIEpTT04gZmllbGRzXG5cdFx0XHRcdFx0XHRpZiAodHlwZW9mIGFkZGl0aW9uYWxGaWVsZHMub3B0aW9ucyA9PT0gJ3N0cmluZycgJiYgYWRkaXRpb25hbEZpZWxkcy5vcHRpb25zKSB7XG5cdFx0XHRcdFx0XHRcdGFkZGl0aW9uYWxGaWVsZHMub3B0aW9ucyA9IEpTT04ucGFyc2UoYWRkaXRpb25hbEZpZWxkcy5vcHRpb25zIGFzIHN0cmluZyk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRpZiAodHlwZW9mIGFkZGl0aW9uYWxGaWVsZHMudGhlbWUgPT09ICdzdHJpbmcnICYmIGFkZGl0aW9uYWxGaWVsZHMudGhlbWUpIHtcblx0XHRcdFx0XHRcdFx0YWRkaXRpb25hbEZpZWxkcy50aGVtZSA9IEpTT04ucGFyc2UoYWRkaXRpb25hbEZpZWxkcy50aGVtZSBhcyBzdHJpbmcpO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHQvLyBSZW1vdmUgZW1wdHkgc3RyaW5nIHZhbHVlcyBzbyB0aGV5IGRvbid0IG92ZXJyaWRlIGRlZmF1bHRzXG5cdFx0XHRcdFx0XHRmb3IgKGNvbnN0IGtleSBvZiBPYmplY3Qua2V5cyhhZGRpdGlvbmFsRmllbGRzKSkge1xuXHRcdFx0XHRcdFx0XHRpZiAoYWRkaXRpb25hbEZpZWxkc1trZXldID09PSAnJykge1xuXHRcdFx0XHRcdFx0XHRcdGRlbGV0ZSBhZGRpdGlvbmFsRmllbGRzW2tleV07XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0T2JqZWN0LmFzc2lnbihib2R5LCBhZGRpdGlvbmFsRmllbGRzKTtcblxuXHRcdFx0XHRcdFx0cmVzcG9uc2VEYXRhID0gYXdhaXQgdGhpcy5oZWxwZXJzLnJlcXVlc3Qoe1xuXHRcdFx0XHRcdFx0XHRtZXRob2Q6ICdQT1NUJyxcblx0XHRcdFx0XHRcdFx0dXJsOiAnL3FyLWNvZGVzJyxcblx0XHRcdFx0XHRcdFx0YmFzZVVSTCxcblx0XHRcdFx0XHRcdFx0aGVhZGVyczoge1xuXHRcdFx0XHRcdFx0XHRcdCd4LWFwaS1rZXknOiBhcGlLZXksXG5cdFx0XHRcdFx0XHRcdFx0J0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcblx0XHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdFx0Ym9keSxcblx0XHRcdFx0XHRcdFx0anNvbjogdHJ1ZSxcblx0XHRcdFx0XHRcdH0pIGFzIElEYXRhT2JqZWN0O1xuXG5cdFx0XHRcdFx0fSBlbHNlIGlmIChvcGVyYXRpb24gPT09ICd1cGRhdGUnKSB7XG5cdFx0XHRcdFx0XHRjb25zdCBxckNvZGVJZCA9IHRoaXMuZ2V0Tm9kZVBhcmFtZXRlcigncXJDb2RlSWQnLCBpKSBhcyBzdHJpbmc7XG5cdFx0XHRcdFx0XHRjb25zdCBuYW1lID0gdGhpcy5nZXROb2RlUGFyYW1ldGVyKCduYW1lJywgaSkgYXMgc3RyaW5nO1xuXHRcdFx0XHRcdFx0Y29uc3QgdXBkYXRlRmllbGRzID0gdGhpcy5nZXROb2RlUGFyYW1ldGVyKCd1cGRhdGVGaWVsZHMnLCBpKSBhcyBJRGF0YU9iamVjdDtcblxuXHRcdFx0XHRcdFx0Y29uc3QgYm9keTogSURhdGFPYmplY3QgPSB7fTtcblxuXHRcdFx0XHRcdFx0aWYgKG5hbWUpIHtcblx0XHRcdFx0XHRcdFx0Ym9keS5uYW1lID0gbmFtZTtcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0Ly8gUGFyc2UgSlNPTiBmaWVsZHNcblx0XHRcdFx0XHRcdGlmICh0eXBlb2YgdXBkYXRlRmllbGRzLm9wdGlvbnMgPT09ICdzdHJpbmcnICYmIHVwZGF0ZUZpZWxkcy5vcHRpb25zKSB7XG5cdFx0XHRcdFx0XHRcdHVwZGF0ZUZpZWxkcy5vcHRpb25zID0gSlNPTi5wYXJzZSh1cGRhdGVGaWVsZHMub3B0aW9ucyBhcyBzdHJpbmcpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0aWYgKHR5cGVvZiB1cGRhdGVGaWVsZHMudGhlbWUgPT09ICdzdHJpbmcnICYmIHVwZGF0ZUZpZWxkcy50aGVtZSkge1xuXHRcdFx0XHRcdFx0XHR1cGRhdGVGaWVsZHMudGhlbWUgPSBKU09OLnBhcnNlKHVwZGF0ZUZpZWxkcy50aGVtZSBhcyBzdHJpbmcpO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHQvLyBSZW1vdmUgZW1wdHkgc3RyaW5nIHZhbHVlc1xuXHRcdFx0XHRcdFx0Zm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXModXBkYXRlRmllbGRzKSkge1xuXHRcdFx0XHRcdFx0XHRpZiAodXBkYXRlRmllbGRzW2tleV0gPT09ICcnKSB7XG5cdFx0XHRcdFx0XHRcdFx0ZGVsZXRlIHVwZGF0ZUZpZWxkc1trZXldO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdE9iamVjdC5hc3NpZ24oYm9keSwgdXBkYXRlRmllbGRzKTtcblxuXHRcdFx0XHRcdFx0cmVzcG9uc2VEYXRhID0gYXdhaXQgdGhpcy5oZWxwZXJzLnJlcXVlc3Qoe1xuXHRcdFx0XHRcdFx0XHRtZXRob2Q6ICdQVVQnLFxuXHRcdFx0XHRcdFx0XHR1cmw6IGAvcXItY29kZXMvJHtxckNvZGVJZH1gLFxuXHRcdFx0XHRcdFx0XHRiYXNlVVJMLFxuXHRcdFx0XHRcdFx0XHRoZWFkZXJzOiB7XG5cdFx0XHRcdFx0XHRcdFx0J3gtYXBpLWtleSc6IGFwaUtleSxcblx0XHRcdFx0XHRcdFx0XHQnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuXHRcdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0XHRib2R5LFxuXHRcdFx0XHRcdFx0XHRqc29uOiB0cnVlLFxuXHRcdFx0XHRcdFx0fSkgYXMgSURhdGFPYmplY3Q7XG5cblx0XHRcdFx0XHR9IGVsc2UgaWYgKG9wZXJhdGlvbiA9PT0gJ2dldCcpIHtcblx0XHRcdFx0XHRcdGNvbnN0IHFyQ29kZUlkID0gdGhpcy5nZXROb2RlUGFyYW1ldGVyKCdxckNvZGVJZCcsIGkpIGFzIHN0cmluZztcblxuXHRcdFx0XHRcdFx0cmVzcG9uc2VEYXRhID0gYXdhaXQgdGhpcy5oZWxwZXJzLnJlcXVlc3Qoe1xuXHRcdFx0XHRcdFx0XHRtZXRob2Q6ICdHRVQnLFxuXHRcdFx0XHRcdFx0XHR1cmw6IGAvcXItY29kZXMvJHtxckNvZGVJZH1gLFxuXHRcdFx0XHRcdFx0XHRiYXNlVVJMLFxuXHRcdFx0XHRcdFx0XHRoZWFkZXJzOiB7XG5cdFx0XHRcdFx0XHRcdFx0J3gtYXBpLWtleSc6IGFwaUtleSxcblx0XHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdFx0anNvbjogdHJ1ZSxcblx0XHRcdFx0XHRcdH0pIGFzIElEYXRhT2JqZWN0O1xuXG5cdFx0XHRcdFx0fSBlbHNlIGlmIChvcGVyYXRpb24gPT09ICdsaXN0Jykge1xuXHRcdFx0XHRcdFx0Y29uc3QgcmV0dXJuQWxsID0gdGhpcy5nZXROb2RlUGFyYW1ldGVyKCdyZXR1cm5BbGwnLCBpKSBhcyBib29sZWFuO1xuXHRcdFx0XHRcdFx0Y29uc3QgbGltaXQgPSByZXR1cm5BbGwgPyAxMDAgOiAodGhpcy5nZXROb2RlUGFyYW1ldGVyKCdsaW1pdCcsIGkpIGFzIG51bWJlcik7XG5cblx0XHRcdFx0XHRcdGNvbnN0IHFzOiBJRGF0YU9iamVjdCA9IHtcblx0XHRcdFx0XHRcdFx0bGltaXQsXG5cdFx0XHRcdFx0XHR9O1xuXG5cdFx0XHRcdFx0XHRyZXNwb25zZURhdGEgPSBhd2FpdCB0aGlzLmhlbHBlcnMucmVxdWVzdCh7XG5cdFx0XHRcdFx0XHRcdG1ldGhvZDogJ0dFVCcsXG5cdFx0XHRcdFx0XHRcdHVybDogJy9xci1jb2RlcycsXG5cdFx0XHRcdFx0XHRcdGJhc2VVUkwsXG5cdFx0XHRcdFx0XHRcdGhlYWRlcnM6IHtcblx0XHRcdFx0XHRcdFx0XHQneC1hcGkta2V5JzogYXBpS2V5LFxuXHRcdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0XHRxcyxcblx0XHRcdFx0XHRcdFx0anNvbjogdHJ1ZSxcblx0XHRcdFx0XHRcdH0pIGFzIElEYXRhT2JqZWN0O1xuXG5cdFx0XHRcdFx0fSBlbHNlIGlmIChvcGVyYXRpb24gPT09ICdkZWxldGUnKSB7XG5cdFx0XHRcdFx0XHRjb25zdCBxckNvZGVJZCA9IHRoaXMuZ2V0Tm9kZVBhcmFtZXRlcigncXJDb2RlSWQnLCBpKSBhcyBzdHJpbmc7XG5cblx0XHRcdFx0XHRcdHJlc3BvbnNlRGF0YSA9IGF3YWl0IHRoaXMuaGVscGVycy5yZXF1ZXN0KHtcblx0XHRcdFx0XHRcdFx0bWV0aG9kOiAnREVMRVRFJyxcblx0XHRcdFx0XHRcdFx0dXJsOiBgL3FyLWNvZGVzLyR7cXJDb2RlSWR9YCxcblx0XHRcdFx0XHRcdFx0YmFzZVVSTCxcblx0XHRcdFx0XHRcdFx0aGVhZGVyczoge1xuXHRcdFx0XHRcdFx0XHRcdCd4LWFwaS1rZXknOiBhcGlLZXksXG5cdFx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRcdGpzb246IHRydWUsXG5cdFx0XHRcdFx0XHR9KSBhcyBJRGF0YU9iamVjdDtcblxuXHRcdFx0XHRcdH0gZWxzZSBpZiAob3BlcmF0aW9uID09PSAnZ2V0U2NhbnMnKSB7XG5cdFx0XHRcdFx0XHRjb25zdCBxckNvZGVJZCA9IHRoaXMuZ2V0Tm9kZVBhcmFtZXRlcigncXJDb2RlSWQnLCBpKSBhcyBzdHJpbmc7XG5cblx0XHRcdFx0XHRcdHJlc3BvbnNlRGF0YSA9IGF3YWl0IHRoaXMuaGVscGVycy5yZXF1ZXN0KHtcblx0XHRcdFx0XHRcdFx0bWV0aG9kOiAnR0VUJyxcblx0XHRcdFx0XHRcdFx0dXJsOiBgL3FyLWNvZGVzLyR7cXJDb2RlSWR9L3NjYW5zYCxcblx0XHRcdFx0XHRcdFx0YmFzZVVSTCxcblx0XHRcdFx0XHRcdFx0aGVhZGVyczoge1xuXHRcdFx0XHRcdFx0XHRcdCd4LWFwaS1rZXknOiBhcGlLZXksXG5cdFx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRcdGpzb246IHRydWUsXG5cdFx0XHRcdFx0XHR9KSBhcyBJRGF0YU9iamVjdDtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0fSBlbHNlIGlmIChyZXNvdXJjZSA9PT0gJ2FuYWx5dGljcycpIHtcblx0XHRcdFx0XHRpZiAob3BlcmF0aW9uID09PSAnZ2V0U2NhbnMnKSB7XG5cdFx0XHRcdFx0XHRjb25zdCBmaWx0ZXJzID0gdGhpcy5nZXROb2RlUGFyYW1ldGVyKCdmaWx0ZXJzJywgaSkgYXMge1xuXHRcdFx0XHRcdFx0XHRxckNvZGVJZD86IHN0cmluZztcblx0XHRcdFx0XHRcdFx0c3RhcnREYXRlPzogc3RyaW5nO1xuXHRcdFx0XHRcdFx0XHRlbmREYXRlPzogc3RyaW5nO1xuXHRcdFx0XHRcdFx0fTtcblxuXHRcdFx0XHRcdFx0Y29uc3QgcXM6IElEYXRhT2JqZWN0ID0ge307XG5cblx0XHRcdFx0XHRcdGlmIChmaWx0ZXJzLnFyQ29kZUlkKSB7XG5cdFx0XHRcdFx0XHRcdHFzLnFyQ29kZUlkID0gZmlsdGVycy5xckNvZGVJZDtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGlmIChmaWx0ZXJzLnN0YXJ0RGF0ZSkge1xuXHRcdFx0XHRcdFx0XHRxcy5zdGFydERhdGUgPSBmaWx0ZXJzLnN0YXJ0RGF0ZTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGlmIChmaWx0ZXJzLmVuZERhdGUpIHtcblx0XHRcdFx0XHRcdFx0cXMuZW5kRGF0ZSA9IGZpbHRlcnMuZW5kRGF0ZTtcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0cmVzcG9uc2VEYXRhID0gYXdhaXQgdGhpcy5oZWxwZXJzLnJlcXVlc3Qoe1xuXHRcdFx0XHRcdFx0XHRtZXRob2Q6ICdHRVQnLFxuXHRcdFx0XHRcdFx0XHR1cmw6ICcvYW5hbHl0aWNzL3NjYW5zJyxcblx0XHRcdFx0XHRcdFx0YmFzZVVSTCxcblx0XHRcdFx0XHRcdFx0aGVhZGVyczoge1xuXHRcdFx0XHRcdFx0XHRcdCd4LWFwaS1rZXknOiBhcGlLZXksXG5cdFx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRcdHFzLFxuXHRcdFx0XHRcdFx0XHRqc29uOiB0cnVlLFxuXHRcdFx0XHRcdFx0fSkgYXMgSURhdGFPYmplY3Q7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0Y29uc3QgZXhlY3V0aW9uRGF0YSA9IHRoaXMuaGVscGVycy5jb25zdHJ1Y3RFeGVjdXRpb25NZXRhRGF0YShcblx0XHRcdFx0XHR0aGlzLmhlbHBlcnMucmV0dXJuSnNvbkFycmF5KHJlc3BvbnNlRGF0YSksXG5cdFx0XHRcdFx0eyBpdGVtRGF0YTogeyBpdGVtOiBpIH0gfSxcblx0XHRcdFx0KTtcblx0XHRcdFx0cmV0dXJuRGF0YS5wdXNoKC4uLmV4ZWN1dGlvbkRhdGEpO1xuXHRcdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdFx0aWYgKHRoaXMuY29udGludWVPbkZhaWwoKSkge1xuXHRcdFx0XHRcdGNvbnN0IGVycm9yTWVzc2FnZSA9IGVycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogJ1Vua25vd24gZXJyb3InO1xuXHRcdFx0XHRcdGNvbnN0IGV4ZWN1dGlvbkVycm9yRGF0YSA9IHRoaXMuaGVscGVycy5jb25zdHJ1Y3RFeGVjdXRpb25NZXRhRGF0YShcblx0XHRcdFx0XHRcdHRoaXMuaGVscGVycy5yZXR1cm5Kc29uQXJyYXkoeyBlcnJvcjogZXJyb3JNZXNzYWdlIH0pLFxuXHRcdFx0XHRcdFx0eyBpdGVtRGF0YTogeyBpdGVtOiBpIH0gfSxcblx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdHJldHVybkRhdGEucHVzaCguLi5leGVjdXRpb25FcnJvckRhdGEpO1xuXHRcdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHRocm93IGVycm9yO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBbcmV0dXJuRGF0YV07XG5cdH1cbn1cbiJdfQ==