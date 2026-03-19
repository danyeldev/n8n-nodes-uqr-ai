import type {
	IExecuteFunctions,
	IDataObject,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';

export class UqrAi implements INodeType {
	description: INodeTypeDescription = {
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

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		const length = items.length;

		const credentials = await this.getCredentials('uqrAiApi');
		const apiKey = credentials.apiKey as string;
		const baseURL = (credentials.baseUrl as string) || 'https://uqr.ai/api/v1';

		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;

		for (let i = 0; i < length; i++) {
			try {
				let responseData: IDataObject = {};

				if (resource === 'qrCode') {
					if (operation === 'create') {
						const typeId = this.getNodeParameter('typeId', i) as number;
						const name = this.getNodeParameter('name', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

						const body: IDataObject = {
							type_id: typeId,
						};

						if (name) {
							body.name = name;
						}

						// Map type-specific required fields to API field names
						switch (typeId) {
							case 1: // Website
								body.url = this.getNodeParameter('url', i) as string;
								break;
							case 2: // Text
								body.text = this.getNodeParameter('text', i) as string;
								break;
							case 3: // Email
								body.email = this.getNodeParameter('email', i) as string;
								break;
							case 4: { // vCard
								const firstName = this.getNodeParameter('firstName', i) as string;
								const lastName = this.getNodeParameter('lastName', i) as string;
								const vcardPhone = this.getNodeParameter('vcardPhone', i) as string;
								if (firstName) body.first_name = firstName;
								if (lastName) body.last_name = lastName;
								if (vcardPhone) body.phone = vcardPhone;
								break;
							}
							case 5: // WiFi
								body.ssid = this.getNodeParameter('ssid', i) as string;
								break;
							case 6: // Phone
							case 12: // SMS
								body.phone = this.getNodeParameter('phone', i) as string;
								break;
							case 13: // Location
								body.latitude = this.getNodeParameter('latitude', i) as number;
								body.longitude = this.getNodeParameter('longitude', i) as number;
								break;
							case 14: // PDF
								body.pdf_title = this.getNodeParameter('pdfTitle', i) as string;
								body.pdf_download_url = this.getNodeParameter('pdfDownloadUrl', i) as string;
								break;
							case 15: // Image Gallery
								body.image_gallery_title = this.getNodeParameter('imageGalleryTitle', i) as string;
								body.image_gallery_images = this.getNodeParameter('imageGalleryImages', i);
								break;
							case 17: // Image
								body.image_title = this.getNodeParameter('imageTitle', i) as string;
								body.image_download_url = this.getNodeParameter('imageDownloadUrl', i) as string;
								break;
							case 19: // File
								body.file_title = this.getNodeParameter('fileTitle', i) as string;
								body.file_download_url = this.getNodeParameter('fileDownloadUrl', i) as string;
								break;
							case 20: // List of Links
								body.links_title = this.getNodeParameter('linksTitle', i) as string;
								body.links_list = this.getNodeParameter('linksList', i);
								break;
							case 21: // MP3
								body.mp3_title = this.getNodeParameter('mp3Title', i) as string;
								body.mp3_file_url = this.getNodeParameter('mp3FileUrl', i) as string;
								break;
						}

						// Map additional fields, renaming vCard-specific keys
						if (additionalFields.vcardEmail) {
							body.email = additionalFields.vcardEmail;
							delete additionalFields.vcardEmail;
						}

						// Parse JSON fields
						if (typeof additionalFields.options === 'string' && additionalFields.options) {
							additionalFields.options = JSON.parse(additionalFields.options as string);
						}
						if (typeof additionalFields.theme === 'string' && additionalFields.theme) {
							additionalFields.theme = JSON.parse(additionalFields.theme as string);
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
						}) as IDataObject;

					} else if (operation === 'update') {
						const qrCodeId = this.getNodeParameter('qrCodeId', i) as string;
						const name = this.getNodeParameter('name', i) as string;
						const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;

						const body: IDataObject = {};

						if (name) {
							body.name = name;
						}

						// Parse JSON fields
						if (typeof updateFields.options === 'string' && updateFields.options) {
							updateFields.options = JSON.parse(updateFields.options as string);
						}
						if (typeof updateFields.theme === 'string' && updateFields.theme) {
							updateFields.theme = JSON.parse(updateFields.theme as string);
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
						}) as IDataObject;

					} else if (operation === 'get') {
						const qrCodeId = this.getNodeParameter('qrCodeId', i) as string;

						responseData = await this.helpers.request({
							method: 'GET',
							url: `/qr-codes/${qrCodeId}`,
							baseURL,
							headers: {
								'x-api-key': apiKey,
							},
							json: true,
						}) as IDataObject;

					} else if (operation === 'list') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const limit = returnAll ? 100 : (this.getNodeParameter('limit', i) as number);

						const qs: IDataObject = {
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
						}) as IDataObject;

					} else if (operation === 'delete') {
						const qrCodeId = this.getNodeParameter('qrCodeId', i) as string;

						responseData = await this.helpers.request({
							method: 'DELETE',
							url: `/qr-codes/${qrCodeId}`,
							baseURL,
							headers: {
								'x-api-key': apiKey,
							},
							json: true,
						}) as IDataObject;

					} else if (operation === 'getScans') {
						const qrCodeId = this.getNodeParameter('qrCodeId', i) as string;

						responseData = await this.helpers.request({
							method: 'GET',
							url: `/qr-codes/${qrCodeId}/scans`,
							baseURL,
							headers: {
								'x-api-key': apiKey,
							},
							json: true,
						}) as IDataObject;
					}

				} else if (resource === 'analytics') {
					if (operation === 'getScans') {
						const filters = this.getNodeParameter('filters', i) as {
							qrCodeId?: string;
							startDate?: string;
							endDate?: string;
						};

						const qs: IDataObject = {};

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
						}) as IDataObject;
					}
				}

				const executionData = this.helpers.constructExecutionMetaData(
					this.helpers.returnJsonArray(responseData),
					{ itemData: { item: i } },
				);
				returnData.push(...executionData);
			} catch (error) {
				if (this.continueOnFail()) {
					const errorMessage = error instanceof Error ? error.message : 'Unknown error';
					const executionErrorData = this.helpers.constructExecutionMetaData(
						this.helpers.returnJsonArray({ error: errorMessage }),
						{ itemData: { item: i } },
					);
					returnData.push(...executionErrorData);
					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}
}
