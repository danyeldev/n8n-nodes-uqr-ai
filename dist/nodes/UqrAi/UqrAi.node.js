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
                        const content = this.getNodeParameter('content', i);
                        const name = this.getNodeParameter('name', i);
                        const isDynamic = this.getNodeParameter('isDynamic', i);
                        const additionalFields = this.getNodeParameter('additionalFields', i);
                        const body = {
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
                        });
                    }
                    else if (operation === 'update') {
                        const qrCodeId = this.getNodeParameter('qrCodeId', i);
                        const name = this.getNodeParameter('name', i);
                        const additionalFields = this.getNodeParameter('additionalFields', i);
                        const body = {};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXFyQWkubm9kZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL25vZGVzL1VxckFpL1VxckFpLm5vZGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBUUEsTUFBYSxLQUFLO0lBQWxCO1FBQ0MsZ0JBQVcsR0FBeUI7WUFDbkMsV0FBVyxFQUFFLFFBQVE7WUFDckIsSUFBSSxFQUFFLE9BQU87WUFDYixJQUFJLEVBQUUsZUFBZTtZQUNyQixLQUFLLEVBQUUsQ0FBQyxXQUFXLENBQUM7WUFDcEIsT0FBTyxFQUFFLENBQUM7WUFDVixRQUFRLEVBQUUsOERBQThEO1lBQ3hFLFdBQVcsRUFBRSxnREFBZ0Q7WUFDN0QsUUFBUSxFQUFFO2dCQUNULElBQUksRUFBRSxRQUFRO2FBQ2Q7WUFDRCxNQUFNLEVBQUUsQ0FBQyxNQUFNLENBQUM7WUFDaEIsT0FBTyxFQUFFLENBQUMsTUFBTSxDQUFDO1lBQ2pCLFdBQVcsRUFBRTtnQkFDWjtvQkFDQyxJQUFJLEVBQUUsVUFBVTtvQkFDaEIsUUFBUSxFQUFFLElBQUk7aUJBQ2Q7YUFDRDtZQUNELFVBQVUsRUFBRTtnQkFDWDtvQkFDQyxXQUFXLEVBQUUsVUFBVTtvQkFDdkIsSUFBSSxFQUFFLFVBQVU7b0JBQ2hCLElBQUksRUFBRSxTQUFTO29CQUNmLGdCQUFnQixFQUFFLElBQUk7b0JBQ3RCLE9BQU8sRUFBRTt3QkFDUjs0QkFDQyxJQUFJLEVBQUUsU0FBUzs0QkFDZixLQUFLLEVBQUUsUUFBUTt5QkFDZjt3QkFDRDs0QkFDQyxJQUFJLEVBQUUsV0FBVzs0QkFDakIsS0FBSyxFQUFFLFdBQVc7eUJBQ2xCO3FCQUNEO29CQUNELE9BQU8sRUFBRSxRQUFRO2lCQUNqQjtnQkFDRDtvQkFDQyxXQUFXLEVBQUUsV0FBVztvQkFDeEIsSUFBSSxFQUFFLFdBQVc7b0JBQ2pCLElBQUksRUFBRSxTQUFTO29CQUNmLGdCQUFnQixFQUFFLElBQUk7b0JBQ3RCLGNBQWMsRUFBRTt3QkFDZixJQUFJLEVBQUU7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ZUFBZSxDQUFDO29CQUM5RSxNQUFNLGtCQUFrQixHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsMEJBQTBCLENBQ2pFLElBQUksQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBRSxDQUFDLEVBQ3JELEVBQUUsUUFBUSxFQUFFLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQ3pCLENBQUM7b0JBQ0YsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLGtCQUFrQixDQUFDLENBQUM7b0JBQ3ZDLFNBQVM7Z0JBQ1YsQ0FBQztnQkFDRCxNQUFNLEtBQUssQ0FBQztZQUNiLENBQUM7UUFDRixDQUFDO1FBRUQsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3JCLENBQUM7Q0FDRDtBQTNiRCxzQkEyYkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdHlwZSB7XG5cdElFeGVjdXRlRnVuY3Rpb25zLFxuXHRJRGF0YU9iamVjdCxcblx0SU5vZGVFeGVjdXRpb25EYXRhLFxuXHRJTm9kZVR5cGUsXG5cdElOb2RlVHlwZURlc2NyaXB0aW9uLFxufSBmcm9tICduOG4td29ya2Zsb3cnO1xuXG5leHBvcnQgY2xhc3MgVXFyQWkgaW1wbGVtZW50cyBJTm9kZVR5cGUge1xuXHRkZXNjcmlwdGlvbjogSU5vZGVUeXBlRGVzY3JpcHRpb24gPSB7XG5cdFx0ZGlzcGxheU5hbWU6ICd1cXIuYWknLFxuXHRcdG5hbWU6ICd1cXJBaScsXG5cdFx0aWNvbjogJ2ZpbGU6bG9nby5wbmcnLFxuXHRcdGdyb3VwOiBbJ3RyYW5zZm9ybSddLFxuXHRcdHZlcnNpb246IDEsXG5cdFx0c3VidGl0bGU6ICc9e3skcGFyYW1ldGVyW1wib3BlcmF0aW9uXCJdICsgXCI6IFwiICsgJHBhcmFtZXRlcltcInJlc291cmNlXCJdfX0nLFxuXHRcdGRlc2NyaXB0aW9uOiAnQ3JlYXRlIGFuZCBtYW5hZ2UgZHluYW1pYyBRUiBjb2RlcyB3aXRoIHVxci5haScsXG5cdFx0ZGVmYXVsdHM6IHtcblx0XHRcdG5hbWU6ICd1cXIuYWknLFxuXHRcdH0sXG5cdFx0aW5wdXRzOiBbJ21haW4nXSxcblx0XHRvdXRwdXRzOiBbJ21haW4nXSxcblx0XHRjcmVkZW50aWFsczogW1xuXHRcdFx0e1xuXHRcdFx0XHRuYW1lOiAndXFyQWlBcGknLFxuXHRcdFx0XHRyZXF1aXJlZDogdHJ1ZSxcblx0XHRcdH0sXG5cdFx0XSxcblx0XHRwcm9wZXJ0aWVzOiBbXG5cdFx0XHR7XG5cdFx0XHRcdGRpc3BsYXlOYW1lOiAnUmVzb3VyY2UnLFxuXHRcdFx0XHRuYW1lOiAncmVzb3VyY2UnLFxuXHRcdFx0XHR0eXBlOiAnb3B0aW9ucycsXG5cdFx0XHRcdG5vRGF0YUV4cHJlc3Npb246IHRydWUsXG5cdFx0XHRcdG9wdGlvbnM6IFtcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRuYW1lOiAnUVIgQ29kZScsXG5cdFx0XHRcdFx0XHR2YWx1ZTogJ3FyQ29kZScsXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRuYW1lOiAnQW5hbHl0aWNzJyxcblx0XHRcdFx0XHRcdHZhbHVlOiAnYW5hbHl0aWNzJyxcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRdLFxuXHRcdFx0XHRkZWZhdWx0OiAncXJDb2RlJyxcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdGRpc3BsYXlOYW1lOiAnT3BlcmF0aW9uJyxcblx0XHRcdFx0bmFtZTogJ29wZXJhdGlvbicsXG5cdFx0XHRcdHR5cGU6ICdvcHRpb25zJyxcblx0XHRcdFx0bm9EYXRhRXhwcmVzc2lvbjogdHJ1ZSxcblx0XHRcdFx0ZGlzcGxheU9wdGlvbnM6IHtcblx0XHRcdFx0XHRzaG93OiB7XG5cdFx0XHRcdFx0XHRyZXNvdXJjZTogWydxckNvZGUnXSxcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHR9LFxuXHRcdFx0XHRvcHRpb25zOiBbXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0bmFtZTogJ0NyZWF0ZScsXG5cdFx0XHRcdFx0XHR2YWx1ZTogJ2NyZWF0ZScsXG5cdFx0XHRcdFx0XHRkZXNjcmlwdGlvbjogJ0NyZWF0ZSBhIG5ldyBRUiBjb2RlJyxcblx0XHRcdFx0XHRcdGFjdGlvbjogJ0NyZWF0ZSBhIFFSIGNvZGUnLFxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0bmFtZTogJ0RlbGV0ZScsXG5cdFx0XHRcdFx0XHR2YWx1ZTogJ2RlbGV0ZScsXG5cdFx0XHRcdFx0XHRkZXNjcmlwdGlvbjogJ0RlbGV0ZSBhIFFSIGNvZGUnLFxuXHRcdFx0XHRcdFx0YWN0aW9uOiAnRGVsZXRlIGEgUVIgY29kZScsXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRuYW1lOiAnR2V0Jyxcblx0XHRcdFx0XHRcdHZhbHVlOiAnZ2V0Jyxcblx0XHRcdFx0XHRcdGRlc2NyaXB0aW9uOiAnR2V0IGEgUVIgY29kZScsXG5cdFx0XHRcdFx0XHRhY3Rpb246ICdHZXQgYSBRUiBjb2RlJyxcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdG5hbWU6ICdHZXQgU2NhbnMnLFxuXHRcdFx0XHRcdFx0dmFsdWU6ICdnZXRTY2FucycsXG5cdFx0XHRcdFx0XHRkZXNjcmlwdGlvbjogJ0dldCBzY2FuIGFuYWx5dGljcyBmb3IgYSBRUiBjb2RlJyxcblx0XHRcdFx0XHRcdGFjdGlvbjogJ0dldCBzY2FuIGFuYWx5dGljcyBmb3IgYSBRUiBjb2RlJyxcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdG5hbWU6ICdMaXN0Jyxcblx0XHRcdFx0XHRcdHZhbHVlOiAnbGlzdCcsXG5cdFx0XHRcdFx0XHRkZXNjcmlwdGlvbjogJ0xpc3QgYWxsIFFSIGNvZGVzJyxcblx0XHRcdFx0XHRcdGFjdGlvbjogJ0xpc3QgYWxsIFFSIGNvZGVzJyxcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdG5hbWU6ICdVcGRhdGUnLFxuXHRcdFx0XHRcdFx0dmFsdWU6ICd1cGRhdGUnLFxuXHRcdFx0XHRcdFx0ZGVzY3JpcHRpb246ICdVcGRhdGUgYSBRUiBjb2RlJyxcblx0XHRcdFx0XHRcdGFjdGlvbjogJ1VwZGF0ZSBhIFFSIGNvZGUnLFxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdF0sXG5cdFx0XHRcdGRlZmF1bHQ6ICdjcmVhdGUnLFxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0ZGlzcGxheU5hbWU6ICdPcGVyYXRpb24nLFxuXHRcdFx0XHRuYW1lOiAnb3BlcmF0aW9uJyxcblx0XHRcdFx0dHlwZTogJ29wdGlvbnMnLFxuXHRcdFx0XHRub0RhdGFFeHByZXNzaW9uOiB0cnVlLFxuXHRcdFx0XHRkaXNwbGF5T3B0aW9uczoge1xuXHRcdFx0XHRcdHNob3c6IHtcblx0XHRcdFx0XHRcdHJlc291cmNlOiBbJ2FuYWx5dGljcyddLFxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdH0sXG5cdFx0XHRcdG9wdGlvbnM6IFtcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRuYW1lOiAnR2V0IFNjYW5zJyxcblx0XHRcdFx0XHRcdHZhbHVlOiAnZ2V0U2NhbnMnLFxuXHRcdFx0XHRcdFx0ZGVzY3JpcHRpb246ICdHZXQgc2NhbiBhbmFseXRpY3MnLFxuXHRcdFx0XHRcdFx0YWN0aW9uOiAnR2V0IHNjYW4gYW5hbHl0aWNzJyxcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRdLFxuXHRcdFx0XHRkZWZhdWx0OiAnZ2V0U2NhbnMnLFxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0ZGlzcGxheU5hbWU6ICdDb250ZW50Jyxcblx0XHRcdFx0bmFtZTogJ2NvbnRlbnQnLFxuXHRcdFx0XHR0eXBlOiAnc3RyaW5nJyxcblx0XHRcdFx0ZGlzcGxheU9wdGlvbnM6IHtcblx0XHRcdFx0XHRzaG93OiB7XG5cdFx0XHRcdFx0XHRvcGVyYXRpb246IFsnY3JlYXRlJ10sXG5cdFx0XHRcdFx0XHRyZXNvdXJjZTogWydxckNvZGUnXSxcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHR9LFxuXHRcdFx0XHRkZWZhdWx0OiAnJyxcblx0XHRcdFx0cGxhY2Vob2xkZXI6ICdodHRwczovL2V4YW1wbGUuY29tJyxcblx0XHRcdFx0ZGVzY3JpcHRpb246ICdUaGUgVVJMIG9yIHRleHQgY29udGVudCB0byBlbmNvZGUgaW4gdGhlIFFSIGNvZGUnLFxuXHRcdFx0XHRyZXF1aXJlZDogdHJ1ZSxcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdGRpc3BsYXlOYW1lOiAnUVIgQ29kZSBJRCcsXG5cdFx0XHRcdG5hbWU6ICdxckNvZGVJZCcsXG5cdFx0XHRcdHR5cGU6ICdzdHJpbmcnLFxuXHRcdFx0XHRkaXNwbGF5T3B0aW9uczoge1xuXHRcdFx0XHRcdHNob3c6IHtcblx0XHRcdFx0XHRcdG9wZXJhdGlvbjogWyd1cGRhdGUnLCAnZ2V0JywgJ2RlbGV0ZScsICdnZXRTY2FucyddLFxuXHRcdFx0XHRcdFx0cmVzb3VyY2U6IFsncXJDb2RlJ10sXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0fSxcblx0XHRcdFx0ZGVmYXVsdDogJycsXG5cdFx0XHRcdGRlc2NyaXB0aW9uOiAnVGhlIElEIG9mIHRoZSBRUiBjb2RlJyxcblx0XHRcdFx0cmVxdWlyZWQ6IHRydWUsXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRkaXNwbGF5TmFtZTogJ05hbWUnLFxuXHRcdFx0XHRuYW1lOiAnbmFtZScsXG5cdFx0XHRcdHR5cGU6ICdzdHJpbmcnLFxuXHRcdFx0XHRkaXNwbGF5T3B0aW9uczoge1xuXHRcdFx0XHRcdHNob3c6IHtcblx0XHRcdFx0XHRcdG9wZXJhdGlvbjogWydjcmVhdGUnLCAndXBkYXRlJ10sXG5cdFx0XHRcdFx0XHRyZXNvdXJjZTogWydxckNvZGUnXSxcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHR9LFxuXHRcdFx0XHRkZWZhdWx0OiAnJyxcblx0XHRcdFx0cGxhY2Vob2xkZXI6ICdNeSBRUiBDb2RlJyxcblx0XHRcdFx0ZGVzY3JpcHRpb246ICdPcHRpb25hbCBuYW1lIGZvciB0aGUgUVIgY29kZScsXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRkaXNwbGF5TmFtZTogJ0R5bmFtaWMnLFxuXHRcdFx0XHRuYW1lOiAnaXNEeW5hbWljJyxcblx0XHRcdFx0dHlwZTogJ2Jvb2xlYW4nLFxuXHRcdFx0XHRkaXNwbGF5T3B0aW9uczoge1xuXHRcdFx0XHRcdHNob3c6IHtcblx0XHRcdFx0XHRcdG9wZXJhdGlvbjogWydjcmVhdGUnXSxcblx0XHRcdFx0XHRcdHJlc291cmNlOiBbJ3FyQ29kZSddLFxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdH0sXG5cdFx0XHRcdGRlZmF1bHQ6IHRydWUsXG5cdFx0XHRcdGRlc2NyaXB0aW9uOiAnV2hldGhlciB0aGUgUVIgY29kZSBpcyBkeW5hbWljIChlZGl0YWJsZSknLFxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0ZGlzcGxheU5hbWU6ICdSZXR1cm4gQWxsJyxcblx0XHRcdFx0bmFtZTogJ3JldHVybkFsbCcsXG5cdFx0XHRcdHR5cGU6ICdib29sZWFuJyxcblx0XHRcdFx0ZGlzcGxheU9wdGlvbnM6IHtcblx0XHRcdFx0XHRzaG93OiB7XG5cdFx0XHRcdFx0XHRvcGVyYXRpb246IFsnbGlzdCddLFxuXHRcdFx0XHRcdFx0cmVzb3VyY2U6IFsncXJDb2RlJ10sXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0fSxcblx0XHRcdFx0ZGVmYXVsdDogZmFsc2UsXG5cdFx0XHRcdGRlc2NyaXB0aW9uOiAnV2hldGhlciB0byByZXR1cm4gYWxsIHJlc3VsdHMgb3Igb25seSB1cCB0byBhIGdpdmVuIGxpbWl0Jyxcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdGRpc3BsYXlOYW1lOiAnTGltaXQnLFxuXHRcdFx0XHRuYW1lOiAnbGltaXQnLFxuXHRcdFx0XHR0eXBlOiAnbnVtYmVyJyxcblx0XHRcdFx0ZGlzcGxheU9wdGlvbnM6IHtcblx0XHRcdFx0XHRzaG93OiB7XG5cdFx0XHRcdFx0XHRvcGVyYXRpb246IFsnbGlzdCddLFxuXHRcdFx0XHRcdFx0cmVzb3VyY2U6IFsncXJDb2RlJ10sXG5cdFx0XHRcdFx0XHRyZXR1cm5BbGw6IFtmYWxzZV0sXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0fSxcblx0XHRcdFx0dHlwZU9wdGlvbnM6IHtcblx0XHRcdFx0XHRtaW5WYWx1ZTogMSxcblx0XHRcdFx0fSxcblx0XHRcdFx0ZGVmYXVsdDogNTAsXG5cdFx0XHRcdGRlc2NyaXB0aW9uOiAnTWF4IG51bWJlciBvZiByZXN1bHRzIHRvIHJldHVybicsXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRkaXNwbGF5TmFtZTogJ0FkZGl0aW9uYWwgRmllbGRzJyxcblx0XHRcdFx0bmFtZTogJ2FkZGl0aW9uYWxGaWVsZHMnLFxuXHRcdFx0XHR0eXBlOiAnY29sbGVjdGlvbicsXG5cdFx0XHRcdHBsYWNlaG9sZGVyOiAnQWRkIEZpZWxkJyxcblx0XHRcdFx0ZGVmYXVsdDoge30sXG5cdFx0XHRcdGRpc3BsYXlPcHRpb25zOiB7XG5cdFx0XHRcdFx0c2hvdzoge1xuXHRcdFx0XHRcdFx0b3BlcmF0aW9uOiBbJ2NyZWF0ZScsICd1cGRhdGUnXSxcblx0XHRcdFx0XHRcdHJlc291cmNlOiBbJ3FyQ29kZSddLFxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdH0sXG5cdFx0XHRcdG9wdGlvbnM6IFtcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRkaXNwbGF5TmFtZTogJ0FjdGl2ZScsXG5cdFx0XHRcdFx0XHRuYW1lOiAnYWN0aXZlJyxcblx0XHRcdFx0XHRcdHR5cGU6ICdib29sZWFuJyxcblx0XHRcdFx0XHRcdGRlZmF1bHQ6IHRydWUsXG5cdFx0XHRcdFx0XHRkZXNjcmlwdGlvbjogJ1doZXRoZXIgdGhlIFFSIGNvZGUgaXMgYWN0aXZlJyxcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRdLFxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0ZGlzcGxheU5hbWU6ICdGaWx0ZXJzJyxcblx0XHRcdFx0bmFtZTogJ2ZpbHRlcnMnLFxuXHRcdFx0XHR0eXBlOiAnY29sbGVjdGlvbicsXG5cdFx0XHRcdHBsYWNlaG9sZGVyOiAnQWRkIEZpbHRlcicsXG5cdFx0XHRcdGRlZmF1bHQ6IHt9LFxuXHRcdFx0XHRkaXNwbGF5T3B0aW9uczoge1xuXHRcdFx0XHRcdHNob3c6IHtcblx0XHRcdFx0XHRcdHJlc291cmNlOiBbJ2FuYWx5dGljcyddLFxuXHRcdFx0XHRcdFx0b3BlcmF0aW9uOiBbJ2dldFNjYW5zJ10sXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0fSxcblx0XHRcdFx0b3B0aW9uczogW1xuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdGRpc3BsYXlOYW1lOiAnUVIgQ29kZSBJRCcsXG5cdFx0XHRcdFx0XHRuYW1lOiAncXJDb2RlSWQnLFxuXHRcdFx0XHRcdFx0dHlwZTogJ3N0cmluZycsXG5cdFx0XHRcdFx0XHRkZWZhdWx0OiAnJyxcblx0XHRcdFx0XHRcdGRlc2NyaXB0aW9uOiAnRmlsdGVyIGJ5IHNwZWNpZmljIFFSIGNvZGUgSUQnLFxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0ZGlzcGxheU5hbWU6ICdTdGFydCBEYXRlJyxcblx0XHRcdFx0XHRcdG5hbWU6ICdzdGFydERhdGUnLFxuXHRcdFx0XHRcdFx0dHlwZTogJ2RhdGVUaW1lJyxcblx0XHRcdFx0XHRcdGRlZmF1bHQ6ICcnLFxuXHRcdFx0XHRcdFx0ZGVzY3JpcHRpb246ICdGaWx0ZXIgc2NhbnMgZnJvbSB0aGlzIGRhdGUnLFxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0ZGlzcGxheU5hbWU6ICdFbmQgRGF0ZScsXG5cdFx0XHRcdFx0XHRuYW1lOiAnZW5kRGF0ZScsXG5cdFx0XHRcdFx0XHR0eXBlOiAnZGF0ZVRpbWUnLFxuXHRcdFx0XHRcdFx0ZGVmYXVsdDogJycsXG5cdFx0XHRcdFx0XHRkZXNjcmlwdGlvbjogJ0ZpbHRlciBzY2FucyB1bnRpbCB0aGlzIGRhdGUnLFxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdF0sXG5cdFx0XHR9LFxuXHRcdF0sXG5cdH07XG5cblx0YXN5bmMgZXhlY3V0ZSh0aGlzOiBJRXhlY3V0ZUZ1bmN0aW9ucyk6IFByb21pc2U8SU5vZGVFeGVjdXRpb25EYXRhW11bXT4ge1xuXHRcdGNvbnN0IGl0ZW1zID0gdGhpcy5nZXRJbnB1dERhdGEoKTtcblx0XHRjb25zdCByZXR1cm5EYXRhOiBJTm9kZUV4ZWN1dGlvbkRhdGFbXSA9IFtdO1xuXHRcdGNvbnN0IGxlbmd0aCA9IGl0ZW1zLmxlbmd0aDtcblxuXHRcdGNvbnN0IGNyZWRlbnRpYWxzID0gYXdhaXQgdGhpcy5nZXRDcmVkZW50aWFscygndXFyQWlBcGknKTtcblx0XHRjb25zdCBhcGlLZXkgPSBjcmVkZW50aWFscy5hcGlLZXkgYXMgc3RyaW5nO1xuXHRcdGNvbnN0IGJhc2VVUkwgPSAoY3JlZGVudGlhbHMuYmFzZVVybCBhcyBzdHJpbmcpIHx8ICdodHRwczovL3Vxci5haS9hcGkvdjEnO1xuXG5cdFx0Y29uc3QgcmVzb3VyY2UgPSB0aGlzLmdldE5vZGVQYXJhbWV0ZXIoJ3Jlc291cmNlJywgMCkgYXMgc3RyaW5nO1xuXHRcdGNvbnN0IG9wZXJhdGlvbiA9IHRoaXMuZ2V0Tm9kZVBhcmFtZXRlcignb3BlcmF0aW9uJywgMCkgYXMgc3RyaW5nO1xuXG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuXHRcdFx0dHJ5IHtcblx0XHRcdFx0bGV0IHJlc3BvbnNlRGF0YTogSURhdGFPYmplY3QgPSB7fTtcblxuXHRcdFx0XHRpZiAocmVzb3VyY2UgPT09ICdxckNvZGUnKSB7XG5cdFx0XHRcdFx0aWYgKG9wZXJhdGlvbiA9PT0gJ2NyZWF0ZScpIHtcblx0XHRcdFx0XHRcdGNvbnN0IGNvbnRlbnQgPSB0aGlzLmdldE5vZGVQYXJhbWV0ZXIoJ2NvbnRlbnQnLCBpKSBhcyBzdHJpbmc7XG5cdFx0XHRcdFx0XHRjb25zdCBuYW1lID0gdGhpcy5nZXROb2RlUGFyYW1ldGVyKCduYW1lJywgaSkgYXMgc3RyaW5nO1xuXHRcdFx0XHRcdFx0Y29uc3QgaXNEeW5hbWljID0gdGhpcy5nZXROb2RlUGFyYW1ldGVyKCdpc0R5bmFtaWMnLCBpKSBhcyBib29sZWFuO1xuXHRcdFx0XHRcdFx0Y29uc3QgYWRkaXRpb25hbEZpZWxkcyA9IHRoaXMuZ2V0Tm9kZVBhcmFtZXRlcignYWRkaXRpb25hbEZpZWxkcycsIGkpIGFzIHtcblx0XHRcdFx0XHRcdFx0YWN0aXZlPzogYm9vbGVhbjtcblx0XHRcdFx0XHRcdH07XG5cblx0XHRcdFx0XHRcdGNvbnN0IGJvZHk6IElEYXRhT2JqZWN0ID0ge1xuXHRcdFx0XHRcdFx0XHRjb250ZW50LFxuXHRcdFx0XHRcdFx0XHRpc0R5bmFtaWMsXG5cdFx0XHRcdFx0XHR9O1xuXG5cdFx0XHRcdFx0XHRpZiAobmFtZSkge1xuXHRcdFx0XHRcdFx0XHRib2R5Lm5hbWUgPSBuYW1lO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRPYmplY3QuYXNzaWduKGJvZHksIGFkZGl0aW9uYWxGaWVsZHMpO1xuXG5cdFx0XHRcdFx0XHRyZXNwb25zZURhdGEgPSBhd2FpdCB0aGlzLmhlbHBlcnMucmVxdWVzdCh7XG5cdFx0XHRcdFx0XHRcdG1ldGhvZDogJ1BPU1QnLFxuXHRcdFx0XHRcdFx0XHR1cmw6ICcvcXItY29kZXMnLFxuXHRcdFx0XHRcdFx0XHRiYXNlVVJMLFxuXHRcdFx0XHRcdFx0XHRoZWFkZXJzOiB7XG5cdFx0XHRcdFx0XHRcdFx0J3gtYXBpLWtleSc6IGFwaUtleSxcblx0XHRcdFx0XHRcdFx0XHQnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuXHRcdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0XHRib2R5LFxuXHRcdFx0XHRcdFx0XHRqc29uOiB0cnVlLFxuXHRcdFx0XHRcdFx0fSkgYXMgSURhdGFPYmplY3Q7XG5cblx0XHRcdFx0XHR9IGVsc2UgaWYgKG9wZXJhdGlvbiA9PT0gJ3VwZGF0ZScpIHtcblx0XHRcdFx0XHRcdGNvbnN0IHFyQ29kZUlkID0gdGhpcy5nZXROb2RlUGFyYW1ldGVyKCdxckNvZGVJZCcsIGkpIGFzIHN0cmluZztcblx0XHRcdFx0XHRcdGNvbnN0IG5hbWUgPSB0aGlzLmdldE5vZGVQYXJhbWV0ZXIoJ25hbWUnLCBpKSBhcyBzdHJpbmc7XG5cdFx0XHRcdFx0XHRjb25zdCBhZGRpdGlvbmFsRmllbGRzID0gdGhpcy5nZXROb2RlUGFyYW1ldGVyKCdhZGRpdGlvbmFsRmllbGRzJywgaSkgYXMge1xuXHRcdFx0XHRcdFx0XHRhY3RpdmU/OiBib29sZWFuO1xuXHRcdFx0XHRcdFx0fTtcblxuXHRcdFx0XHRcdFx0Y29uc3QgYm9keTogSURhdGFPYmplY3QgPSB7fTtcblxuXHRcdFx0XHRcdFx0aWYgKG5hbWUpIHtcblx0XHRcdFx0XHRcdFx0Ym9keS5uYW1lID0gbmFtZTtcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0T2JqZWN0LmFzc2lnbihib2R5LCBhZGRpdGlvbmFsRmllbGRzKTtcblxuXHRcdFx0XHRcdFx0cmVzcG9uc2VEYXRhID0gYXdhaXQgdGhpcy5oZWxwZXJzLnJlcXVlc3Qoe1xuXHRcdFx0XHRcdFx0XHRtZXRob2Q6ICdQQVRDSCcsXG5cdFx0XHRcdFx0XHRcdHVybDogYC9xci1jb2Rlcy8ke3FyQ29kZUlkfWAsXG5cdFx0XHRcdFx0XHRcdGJhc2VVUkwsXG5cdFx0XHRcdFx0XHRcdGhlYWRlcnM6IHtcblx0XHRcdFx0XHRcdFx0XHQneC1hcGkta2V5JzogYXBpS2V5LFxuXHRcdFx0XHRcdFx0XHRcdCdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG5cdFx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRcdGJvZHksXG5cdFx0XHRcdFx0XHRcdGpzb246IHRydWUsXG5cdFx0XHRcdFx0XHR9KSBhcyBJRGF0YU9iamVjdDtcblxuXHRcdFx0XHRcdH0gZWxzZSBpZiAob3BlcmF0aW9uID09PSAnZ2V0Jykge1xuXHRcdFx0XHRcdFx0Y29uc3QgcXJDb2RlSWQgPSB0aGlzLmdldE5vZGVQYXJhbWV0ZXIoJ3FyQ29kZUlkJywgaSkgYXMgc3RyaW5nO1xuXG5cdFx0XHRcdFx0XHRyZXNwb25zZURhdGEgPSBhd2FpdCB0aGlzLmhlbHBlcnMucmVxdWVzdCh7XG5cdFx0XHRcdFx0XHRcdG1ldGhvZDogJ0dFVCcsXG5cdFx0XHRcdFx0XHRcdHVybDogYC9xci1jb2Rlcy8ke3FyQ29kZUlkfWAsXG5cdFx0XHRcdFx0XHRcdGJhc2VVUkwsXG5cdFx0XHRcdFx0XHRcdGhlYWRlcnM6IHtcblx0XHRcdFx0XHRcdFx0XHQneC1hcGkta2V5JzogYXBpS2V5LFxuXHRcdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0XHRqc29uOiB0cnVlLFxuXHRcdFx0XHRcdFx0fSkgYXMgSURhdGFPYmplY3Q7XG5cblx0XHRcdFx0XHR9IGVsc2UgaWYgKG9wZXJhdGlvbiA9PT0gJ2xpc3QnKSB7XG5cdFx0XHRcdFx0XHRjb25zdCByZXR1cm5BbGwgPSB0aGlzLmdldE5vZGVQYXJhbWV0ZXIoJ3JldHVybkFsbCcsIGkpIGFzIGJvb2xlYW47XG5cdFx0XHRcdFx0XHRjb25zdCBsaW1pdCA9IHJldHVybkFsbCA/IDEwMCA6ICh0aGlzLmdldE5vZGVQYXJhbWV0ZXIoJ2xpbWl0JywgaSkgYXMgbnVtYmVyKTtcblxuXHRcdFx0XHRcdFx0Y29uc3QgcXM6IElEYXRhT2JqZWN0ID0ge1xuXHRcdFx0XHRcdFx0XHRsaW1pdCxcblx0XHRcdFx0XHRcdH07XG5cblx0XHRcdFx0XHRcdHJlc3BvbnNlRGF0YSA9IGF3YWl0IHRoaXMuaGVscGVycy5yZXF1ZXN0KHtcblx0XHRcdFx0XHRcdFx0bWV0aG9kOiAnR0VUJyxcblx0XHRcdFx0XHRcdFx0dXJsOiAnL3FyLWNvZGVzJyxcblx0XHRcdFx0XHRcdFx0YmFzZVVSTCxcblx0XHRcdFx0XHRcdFx0aGVhZGVyczoge1xuXHRcdFx0XHRcdFx0XHRcdCd4LWFwaS1rZXknOiBhcGlLZXksXG5cdFx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRcdHFzLFxuXHRcdFx0XHRcdFx0XHRqc29uOiB0cnVlLFxuXHRcdFx0XHRcdFx0fSkgYXMgSURhdGFPYmplY3Q7XG5cblx0XHRcdFx0XHR9IGVsc2UgaWYgKG9wZXJhdGlvbiA9PT0gJ2RlbGV0ZScpIHtcblx0XHRcdFx0XHRcdGNvbnN0IHFyQ29kZUlkID0gdGhpcy5nZXROb2RlUGFyYW1ldGVyKCdxckNvZGVJZCcsIGkpIGFzIHN0cmluZztcblxuXHRcdFx0XHRcdFx0cmVzcG9uc2VEYXRhID0gYXdhaXQgdGhpcy5oZWxwZXJzLnJlcXVlc3Qoe1xuXHRcdFx0XHRcdFx0XHRtZXRob2Q6ICdERUxFVEUnLFxuXHRcdFx0XHRcdFx0XHR1cmw6IGAvcXItY29kZXMvJHtxckNvZGVJZH1gLFxuXHRcdFx0XHRcdFx0XHRiYXNlVVJMLFxuXHRcdFx0XHRcdFx0XHRoZWFkZXJzOiB7XG5cdFx0XHRcdFx0XHRcdFx0J3gtYXBpLWtleSc6IGFwaUtleSxcblx0XHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdFx0anNvbjogdHJ1ZSxcblx0XHRcdFx0XHRcdH0pIGFzIElEYXRhT2JqZWN0O1xuXG5cdFx0XHRcdFx0fSBlbHNlIGlmIChvcGVyYXRpb24gPT09ICdnZXRTY2FucycpIHtcblx0XHRcdFx0XHRcdGNvbnN0IHFyQ29kZUlkID0gdGhpcy5nZXROb2RlUGFyYW1ldGVyKCdxckNvZGVJZCcsIGkpIGFzIHN0cmluZztcblxuXHRcdFx0XHRcdFx0cmVzcG9uc2VEYXRhID0gYXdhaXQgdGhpcy5oZWxwZXJzLnJlcXVlc3Qoe1xuXHRcdFx0XHRcdFx0XHRtZXRob2Q6ICdHRVQnLFxuXHRcdFx0XHRcdFx0XHR1cmw6IGAvcXItY29kZXMvJHtxckNvZGVJZH0vc2NhbnNgLFxuXHRcdFx0XHRcdFx0XHRiYXNlVVJMLFxuXHRcdFx0XHRcdFx0XHRoZWFkZXJzOiB7XG5cdFx0XHRcdFx0XHRcdFx0J3gtYXBpLWtleSc6IGFwaUtleSxcblx0XHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdFx0anNvbjogdHJ1ZSxcblx0XHRcdFx0XHRcdH0pIGFzIElEYXRhT2JqZWN0O1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHR9IGVsc2UgaWYgKHJlc291cmNlID09PSAnYW5hbHl0aWNzJykge1xuXHRcdFx0XHRcdGlmIChvcGVyYXRpb24gPT09ICdnZXRTY2FucycpIHtcblx0XHRcdFx0XHRcdGNvbnN0IGZpbHRlcnMgPSB0aGlzLmdldE5vZGVQYXJhbWV0ZXIoJ2ZpbHRlcnMnLCBpKSBhcyB7XG5cdFx0XHRcdFx0XHRcdHFyQ29kZUlkPzogc3RyaW5nO1xuXHRcdFx0XHRcdFx0XHRzdGFydERhdGU/OiBzdHJpbmc7XG5cdFx0XHRcdFx0XHRcdGVuZERhdGU/OiBzdHJpbmc7XG5cdFx0XHRcdFx0XHR9O1xuXG5cdFx0XHRcdFx0XHRjb25zdCBxczogSURhdGFPYmplY3QgPSB7fTtcblxuXHRcdFx0XHRcdFx0aWYgKGZpbHRlcnMucXJDb2RlSWQpIHtcblx0XHRcdFx0XHRcdFx0cXMucXJDb2RlSWQgPSBmaWx0ZXJzLnFyQ29kZUlkO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0aWYgKGZpbHRlcnMuc3RhcnREYXRlKSB7XG5cdFx0XHRcdFx0XHRcdHFzLnN0YXJ0RGF0ZSA9IGZpbHRlcnMuc3RhcnREYXRlO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0aWYgKGZpbHRlcnMuZW5kRGF0ZSkge1xuXHRcdFx0XHRcdFx0XHRxcy5lbmREYXRlID0gZmlsdGVycy5lbmREYXRlO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRyZXNwb25zZURhdGEgPSBhd2FpdCB0aGlzLmhlbHBlcnMucmVxdWVzdCh7XG5cdFx0XHRcdFx0XHRcdG1ldGhvZDogJ0dFVCcsXG5cdFx0XHRcdFx0XHRcdHVybDogJy9hbmFseXRpY3Mvc2NhbnMnLFxuXHRcdFx0XHRcdFx0XHRiYXNlVVJMLFxuXHRcdFx0XHRcdFx0XHRoZWFkZXJzOiB7XG5cdFx0XHRcdFx0XHRcdFx0J3gtYXBpLWtleSc6IGFwaUtleSxcblx0XHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdFx0cXMsXG5cdFx0XHRcdFx0XHRcdGpzb246IHRydWUsXG5cdFx0XHRcdFx0XHR9KSBhcyBJRGF0YU9iamVjdDtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRjb25zdCBleGVjdXRpb25EYXRhID0gdGhpcy5oZWxwZXJzLmNvbnN0cnVjdEV4ZWN1dGlvbk1ldGFEYXRhKFxuXHRcdFx0XHRcdHRoaXMuaGVscGVycy5yZXR1cm5Kc29uQXJyYXkocmVzcG9uc2VEYXRhKSxcblx0XHRcdFx0XHR7IGl0ZW1EYXRhOiB7IGl0ZW06IGkgfSB9LFxuXHRcdFx0XHQpO1xuXHRcdFx0XHRyZXR1cm5EYXRhLnB1c2goLi4uZXhlY3V0aW9uRGF0YSk7XG5cdFx0XHR9IGNhdGNoIChlcnJvcikge1xuXHRcdFx0XHRpZiAodGhpcy5jb250aW51ZU9uRmFpbCgpKSB7XG5cdFx0XHRcdFx0Y29uc3QgZXJyb3JNZXNzYWdlID0gZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiAnVW5rbm93biBlcnJvcic7XG5cdFx0XHRcdFx0Y29uc3QgZXhlY3V0aW9uRXJyb3JEYXRhID0gdGhpcy5oZWxwZXJzLmNvbnN0cnVjdEV4ZWN1dGlvbk1ldGFEYXRhKFxuXHRcdFx0XHRcdFx0dGhpcy5oZWxwZXJzLnJldHVybkpzb25BcnJheSh7IGVycm9yOiBlcnJvck1lc3NhZ2UgfSksXG5cdFx0XHRcdFx0XHR7IGl0ZW1EYXRhOiB7IGl0ZW06IGkgfSB9LFxuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0cmV0dXJuRGF0YS5wdXNoKC4uLmV4ZWN1dGlvbkVycm9yRGF0YSk7XG5cdFx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRcdH1cblx0XHRcdFx0dGhyb3cgZXJyb3I7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIFtyZXR1cm5EYXRhXTtcblx0fVxufVxuIl19