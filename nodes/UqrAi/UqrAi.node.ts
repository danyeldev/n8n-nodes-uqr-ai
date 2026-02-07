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
		icon: 'file:uqr-ai.svg',
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
			{
				displayName: 'Content',
				name: 'content',
				type: 'string',
				displayOptions: {
					show: {
						operation: ['create'],
						resource: ['qrCode'],
					},
				},
				default: '',
				placeholder: 'https://example.com',
				description: 'The URL or text content to encode in the QR code',
				required: true,
			},
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
				description: 'Optional name for the QR code',
			},
			{
				displayName: 'Dynamic',
				name: 'isDynamic',
				type: 'boolean',
				displayOptions: {
					show: {
						operation: ['create'],
						resource: ['qrCode'],
					},
				},
				default: true,
				description: 'Whether the QR code is dynamic (editable)',
			},
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
			{
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				displayOptions: {
					show: {
						operation: ['create', 'update'],
						resource: ['qrCode'],
					},
				},
				options: [
					{
						displayName: 'Active',
						name: 'active',
						type: 'boolean',
						default: true,
						description: 'Whether the QR code is active',
					},
				],
			},
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
						const content = this.getNodeParameter('content', i) as string;
						const name = this.getNodeParameter('name', i) as string;
						const isDynamic = this.getNodeParameter('isDynamic', i) as boolean;
						const additionalFields = this.getNodeParameter('additionalFields', i) as {
							active?: boolean;
						};

						const body: IDataObject = {
							content,
							isDynamic,
						};

						if (name) {
							body.name = name;
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
						const additionalFields = this.getNodeParameter('additionalFields', i) as {
							active?: boolean;
						};

						const body: IDataObject = {};

						if (name) {
							body.name = name;
						}

						Object.assign(body, additionalFields);

						responseData = await this.helpers.request({
							method: 'PATCH',
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
