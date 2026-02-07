"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UqrAi = void 0;
class UqrAi {
    constructor() {
        this.description = {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXFyQWkubm9kZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL25vZGVzL1VxckFpL1VxckFpLm5vZGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBUUEsTUFBYSxLQUFLO0lBQWxCO1FBQ0MsZ0JBQVcsR0FBeUI7WUFDbkMsV0FBVyxFQUFFLFFBQVE7WUFDckIsSUFBSSxFQUFFLE9BQU87WUFDYixJQUFJLEVBQUUsaUJBQWlCO1lBQ3ZCLEtBQUssRUFBRSxDQUFDLFdBQVcsQ0FBQztZQUNwQixPQUFPLEVBQUUsQ0FBQztZQUNWLFFBQVEsRUFBRSw4REFBOEQ7WUFDeEUsV0FBVyxFQUFFLGdEQUFnRDtZQUM3RCxRQUFRLEVBQUU7Z0JBQ1QsSUFBSSxFQUFFLFFBQVE7YUFDZDtZQUNELE1BQU0sRUFBRSxDQUFDLE1BQU0sQ0FBQztZQUNoQixPQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUM7WUFDakIsV0FBVyxFQUFFO2dCQUNaO29CQUNDLElBQUksRUFBRSxVQUFVO29CQUNoQixRQUFRLEVBQUUsSUFBSTtpQkFDZDthQUNEO1lBQ0QsVUFBVSxFQUFFO2dCQUNYO29CQUNDLFdBQVcsRUFBRSxVQUFVO29CQUN2QixJQUFJLEVBQUUsVUFBVTtvQkFDaEIsSUFBSSxFQUFFLFNBQVM7b0JBQ2YsZ0JBQWdCLEVBQUUsSUFBSTtvQkFDdEIsT0FBTyxFQUFFO3dCQUNSOzRCQUNDLElBQUksRUFBRSxTQUFTOzRCQUNmLEtBQUssRUFBRSxRQUFRO3lCQUNmO3dCQUNEOzRCQUNDLElBQUksRUFBRSxXQUFXOzRCQUNqQixLQUFLLEVBQUUsV0FBVzt5QkFDbEI7cUJBQ0Q7b0JBQ0QsT0FBTyxFQUFFLFFBQVE7aUJBQ2pCO2dCQUNEO29CQUNDLFdBQVcsRUFBRSxXQUFXO29CQUN4QixJQUFJLEVBQUUsV0FBVztvQkFDakIsSUFBSSxFQUFFLFNBQVM7b0JBQ2YsZ0JBQWdCLEVBQUUsSUFBSTtvQkFDdEIsY0FBYyxFQUFFO3dCQUNmLElBQUksRUFB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QyxlQUFlLENBQUM7b0JBQzlFLE1BQU0sa0JBQWtCLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQywwQkFBMEIsQ0FDakUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFFLENBQUMsRUFDckQsRUFBRSxRQUFRLEVBQUUsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FDekIsQ0FBQztvQkFDRixVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsa0JBQWtCLENBQUMsQ0FBQztvQkFDdkMsU0FBUztnQkFDVixDQUFDO2dCQUNELE1BQU0sS0FBSyxDQUFDO1lBQ2IsQ0FBQztRQUNGLENBQUM7UUFFRCxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDckIsQ0FBQztDQUNEO0FBM2JELHNCQTJiQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0eXBlIHtcblx0SUV4ZWN1dGVGdW5jdGlvbnMsXG5cdElEYXRhT2JqZWN0LFxuXHRJTm9kZUV4ZWN1dGlvbkRhdGEsXG5cdElOb2RlVHlwZSxcblx0SU5vZGVUeXBlRGVzY3JpcHRpb24sXG59IGZyb20gJ244bi13b3JrZmxvdyc7XG5cbmV4cG9ydCBjbGFzcyBVcXJBaSBpbXBsZW1lbnRzIElOb2RlVHlwZSB7XG5cdGRlc2NyaXB0aW9uOiBJTm9kZVR5cGVEZXNjcmlwdGlvbiA9IHtcblx0XHRkaXNwbGF5TmFtZTogJ3Vxci5haScsXG5cdFx0bmFtZTogJ3VxckFpJyxcblx0XHRpY29uOiAnZmlsZTp1cXItYWkuc3ZnJyxcblx0XHRncm91cDogWyd0cmFuc2Zvcm0nXSxcblx0XHR2ZXJzaW9uOiAxLFxuXHRcdHN1YnRpdGxlOiAnPXt7JHBhcmFtZXRlcltcIm9wZXJhdGlvblwiXSArIFwiOiBcIiArICRwYXJhbWV0ZXJbXCJyZXNvdXJjZVwiXX19Jyxcblx0XHRkZXNjcmlwdGlvbjogJ0NyZWF0ZSBhbmQgbWFuYWdlIGR5bmFtaWMgUVIgY29kZXMgd2l0aCB1cXIuYWknLFxuXHRcdGRlZmF1bHRzOiB7XG5cdFx0XHRuYW1lOiAndXFyLmFpJyxcblx0XHR9LFxuXHRcdGlucHV0czogWydtYWluJ10sXG5cdFx0b3V0cHV0czogWydtYWluJ10sXG5cdFx0Y3JlZGVudGlhbHM6IFtcblx0XHRcdHtcblx0XHRcdFx0bmFtZTogJ3VxckFpQXBpJyxcblx0XHRcdFx0cmVxdWlyZWQ6IHRydWUsXG5cdFx0XHR9LFxuXHRcdF0sXG5cdFx0cHJvcGVydGllczogW1xuXHRcdFx0e1xuXHRcdFx0XHRkaXNwbGF5TmFtZTogJ1Jlc291cmNlJyxcblx0XHRcdFx0bmFtZTogJ3Jlc291cmNlJyxcblx0XHRcdFx0dHlwZTogJ29wdGlvbnMnLFxuXHRcdFx0XHRub0RhdGFFeHByZXNzaW9uOiB0cnVlLFxuXHRcdFx0XHRvcHRpb25zOiBbXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0bmFtZTogJ1FSIENvZGUnLFxuXHRcdFx0XHRcdFx0dmFsdWU6ICdxckNvZGUnLFxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0bmFtZTogJ0FuYWx5dGljcycsXG5cdFx0XHRcdFx0XHR2YWx1ZTogJ2FuYWx5dGljcycsXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XSxcblx0XHRcdFx0ZGVmYXVsdDogJ3FyQ29kZScsXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRkaXNwbGF5TmFtZTogJ09wZXJhdGlvbicsXG5cdFx0XHRcdG5hbWU6ICdvcGVyYXRpb24nLFxuXHRcdFx0XHR0eXBlOiAnb3B0aW9ucycsXG5cdFx0XHRcdG5vRGF0YUV4cHJlc3Npb246IHRydWUsXG5cdFx0XHRcdGRpc3BsYXlPcHRpb25zOiB7XG5cdFx0XHRcdFx0c2hvdzoge1xuXHRcdFx0XHRcdFx0cmVzb3VyY2U6IFsncXJDb2RlJ10sXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0fSxcblx0XHRcdFx0b3B0aW9uczogW1xuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdG5hbWU6ICdDcmVhdGUnLFxuXHRcdFx0XHRcdFx0dmFsdWU6ICdjcmVhdGUnLFxuXHRcdFx0XHRcdFx0ZGVzY3JpcHRpb246ICdDcmVhdGUgYSBuZXcgUVIgY29kZScsXG5cdFx0XHRcdFx0XHRhY3Rpb246ICdDcmVhdGUgYSBRUiBjb2RlJyxcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdG5hbWU6ICdEZWxldGUnLFxuXHRcdFx0XHRcdFx0dmFsdWU6ICdkZWxldGUnLFxuXHRcdFx0XHRcdFx0ZGVzY3JpcHRpb246ICdEZWxldGUgYSBRUiBjb2RlJyxcblx0XHRcdFx0XHRcdGFjdGlvbjogJ0RlbGV0ZSBhIFFSIGNvZGUnLFxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0bmFtZTogJ0dldCcsXG5cdFx0XHRcdFx0XHR2YWx1ZTogJ2dldCcsXG5cdFx0XHRcdFx0XHRkZXNjcmlwdGlvbjogJ0dldCBhIFFSIGNvZGUnLFxuXHRcdFx0XHRcdFx0YWN0aW9uOiAnR2V0IGEgUVIgY29kZScsXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRuYW1lOiAnR2V0IFNjYW5zJyxcblx0XHRcdFx0XHRcdHZhbHVlOiAnZ2V0U2NhbnMnLFxuXHRcdFx0XHRcdFx0ZGVzY3JpcHRpb246ICdHZXQgc2NhbiBhbmFseXRpY3MgZm9yIGEgUVIgY29kZScsXG5cdFx0XHRcdFx0XHRhY3Rpb246ICdHZXQgc2NhbiBhbmFseXRpY3MgZm9yIGEgUVIgY29kZScsXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRuYW1lOiAnTGlzdCcsXG5cdFx0XHRcdFx0XHR2YWx1ZTogJ2xpc3QnLFxuXHRcdFx0XHRcdFx0ZGVzY3JpcHRpb246ICdMaXN0IGFsbCBRUiBjb2RlcycsXG5cdFx0XHRcdFx0XHRhY3Rpb246ICdMaXN0IGFsbCBRUiBjb2RlcycsXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRuYW1lOiAnVXBkYXRlJyxcblx0XHRcdFx0XHRcdHZhbHVlOiAndXBkYXRlJyxcblx0XHRcdFx0XHRcdGRlc2NyaXB0aW9uOiAnVXBkYXRlIGEgUVIgY29kZScsXG5cdFx0XHRcdFx0XHRhY3Rpb246ICdVcGRhdGUgYSBRUiBjb2RlJyxcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRdLFxuXHRcdFx0XHRkZWZhdWx0OiAnY3JlYXRlJyxcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdGRpc3BsYXlOYW1lOiAnT3BlcmF0aW9uJyxcblx0XHRcdFx0bmFtZTogJ29wZXJhdGlvbicsXG5cdFx0XHRcdHR5cGU6ICdvcHRpb25zJyxcblx0XHRcdFx0bm9EYXRhRXhwcmVzc2lvbjogdHJ1ZSxcblx0XHRcdFx0ZGlzcGxheU9wdGlvbnM6IHtcblx0XHRcdFx0XHRzaG93OiB7XG5cdFx0XHRcdFx0XHRyZXNvdXJjZTogWydhbmFseXRpY3MnXSxcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHR9LFxuXHRcdFx0XHRvcHRpb25zOiBbXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0bmFtZTogJ0dldCBTY2FucycsXG5cdFx0XHRcdFx0XHR2YWx1ZTogJ2dldFNjYW5zJyxcblx0XHRcdFx0XHRcdGRlc2NyaXB0aW9uOiAnR2V0IHNjYW4gYW5hbHl0aWNzJyxcblx0XHRcdFx0XHRcdGFjdGlvbjogJ0dldCBzY2FuIGFuYWx5dGljcycsXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XSxcblx0XHRcdFx0ZGVmYXVsdDogJ2dldFNjYW5zJyxcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdGRpc3BsYXlOYW1lOiAnQ29udGVudCcsXG5cdFx0XHRcdG5hbWU6ICdjb250ZW50Jyxcblx0XHRcdFx0dHlwZTogJ3N0cmluZycsXG5cdFx0XHRcdGRpc3BsYXlPcHRpb25zOiB7XG5cdFx0XHRcdFx0c2hvdzoge1xuXHRcdFx0XHRcdFx0b3BlcmF0aW9uOiBbJ2NyZWF0ZSddLFxuXHRcdFx0XHRcdFx0cmVzb3VyY2U6IFsncXJDb2RlJ10sXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0fSxcblx0XHRcdFx0ZGVmYXVsdDogJycsXG5cdFx0XHRcdHBsYWNlaG9sZGVyOiAnaHR0cHM6Ly9leGFtcGxlLmNvbScsXG5cdFx0XHRcdGRlc2NyaXB0aW9uOiAnVGhlIFVSTCBvciB0ZXh0IGNvbnRlbnQgdG8gZW5jb2RlIGluIHRoZSBRUiBjb2RlJyxcblx0XHRcdFx0cmVxdWlyZWQ6IHRydWUsXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRkaXNwbGF5TmFtZTogJ1FSIENvZGUgSUQnLFxuXHRcdFx0XHRuYW1lOiAncXJDb2RlSWQnLFxuXHRcdFx0XHR0eXBlOiAnc3RyaW5nJyxcblx0XHRcdFx0ZGlzcGxheU9wdGlvbnM6IHtcblx0XHRcdFx0XHRzaG93OiB7XG5cdFx0XHRcdFx0XHRvcGVyYXRpb246IFsndXBkYXRlJywgJ2dldCcsICdkZWxldGUnLCAnZ2V0U2NhbnMnXSxcblx0XHRcdFx0XHRcdHJlc291cmNlOiBbJ3FyQ29kZSddLFxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdH0sXG5cdFx0XHRcdGRlZmF1bHQ6ICcnLFxuXHRcdFx0XHRkZXNjcmlwdGlvbjogJ1RoZSBJRCBvZiB0aGUgUVIgY29kZScsXG5cdFx0XHRcdHJlcXVpcmVkOiB0cnVlLFxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0ZGlzcGxheU5hbWU6ICdOYW1lJyxcblx0XHRcdFx0bmFtZTogJ25hbWUnLFxuXHRcdFx0XHR0eXBlOiAnc3RyaW5nJyxcblx0XHRcdFx0ZGlzcGxheU9wdGlvbnM6IHtcblx0XHRcdFx0XHRzaG93OiB7XG5cdFx0XHRcdFx0XHRvcGVyYXRpb246IFsnY3JlYXRlJywgJ3VwZGF0ZSddLFxuXHRcdFx0XHRcdFx0cmVzb3VyY2U6IFsncXJDb2RlJ10sXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0fSxcblx0XHRcdFx0ZGVmYXVsdDogJycsXG5cdFx0XHRcdHBsYWNlaG9sZGVyOiAnTXkgUVIgQ29kZScsXG5cdFx0XHRcdGRlc2NyaXB0aW9uOiAnT3B0aW9uYWwgbmFtZSBmb3IgdGhlIFFSIGNvZGUnLFxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0ZGlzcGxheU5hbWU6ICdEeW5hbWljJyxcblx0XHRcdFx0bmFtZTogJ2lzRHluYW1pYycsXG5cdFx0XHRcdHR5cGU6ICdib29sZWFuJyxcblx0XHRcdFx0ZGlzcGxheU9wdGlvbnM6IHtcblx0XHRcdFx0XHRzaG93OiB7XG5cdFx0XHRcdFx0XHRvcGVyYXRpb246IFsnY3JlYXRlJ10sXG5cdFx0XHRcdFx0XHRyZXNvdXJjZTogWydxckNvZGUnXSxcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHR9LFxuXHRcdFx0XHRkZWZhdWx0OiB0cnVlLFxuXHRcdFx0XHRkZXNjcmlwdGlvbjogJ1doZXRoZXIgdGhlIFFSIGNvZGUgaXMgZHluYW1pYyAoZWRpdGFibGUpJyxcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdGRpc3BsYXlOYW1lOiAnUmV0dXJuIEFsbCcsXG5cdFx0XHRcdG5hbWU6ICdyZXR1cm5BbGwnLFxuXHRcdFx0XHR0eXBlOiAnYm9vbGVhbicsXG5cdFx0XHRcdGRpc3BsYXlPcHRpb25zOiB7XG5cdFx0XHRcdFx0c2hvdzoge1xuXHRcdFx0XHRcdFx0b3BlcmF0aW9uOiBbJ2xpc3QnXSxcblx0XHRcdFx0XHRcdHJlc291cmNlOiBbJ3FyQ29kZSddLFxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdH0sXG5cdFx0XHRcdGRlZmF1bHQ6IGZhbHNlLFxuXHRcdFx0XHRkZXNjcmlwdGlvbjogJ1doZXRoZXIgdG8gcmV0dXJuIGFsbCByZXN1bHRzIG9yIG9ubHkgdXAgdG8gYSBnaXZlbiBsaW1pdCcsXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRkaXNwbGF5TmFtZTogJ0xpbWl0Jyxcblx0XHRcdFx0bmFtZTogJ2xpbWl0Jyxcblx0XHRcdFx0dHlwZTogJ251bWJlcicsXG5cdFx0XHRcdGRpc3BsYXlPcHRpb25zOiB7XG5cdFx0XHRcdFx0c2hvdzoge1xuXHRcdFx0XHRcdFx0b3BlcmF0aW9uOiBbJ2xpc3QnXSxcblx0XHRcdFx0XHRcdHJlc291cmNlOiBbJ3FyQ29kZSddLFxuXHRcdFx0XHRcdFx0cmV0dXJuQWxsOiBbZmFsc2VdLFxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHR5cGVPcHRpb25zOiB7XG5cdFx0XHRcdFx0bWluVmFsdWU6IDEsXG5cdFx0XHRcdH0sXG5cdFx0XHRcdGRlZmF1bHQ6IDUwLFxuXHRcdFx0XHRkZXNjcmlwdGlvbjogJ01heCBudW1iZXIgb2YgcmVzdWx0cyB0byByZXR1cm4nLFxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0ZGlzcGxheU5hbWU6ICdBZGRpdGlvbmFsIEZpZWxkcycsXG5cdFx0XHRcdG5hbWU6ICdhZGRpdGlvbmFsRmllbGRzJyxcblx0XHRcdFx0dHlwZTogJ2NvbGxlY3Rpb24nLFxuXHRcdFx0XHRwbGFjZWhvbGRlcjogJ0FkZCBGaWVsZCcsXG5cdFx0XHRcdGRlZmF1bHQ6IHt9LFxuXHRcdFx0XHRkaXNwbGF5T3B0aW9uczoge1xuXHRcdFx0XHRcdHNob3c6IHtcblx0XHRcdFx0XHRcdG9wZXJhdGlvbjogWydjcmVhdGUnLCAndXBkYXRlJ10sXG5cdFx0XHRcdFx0XHRyZXNvdXJjZTogWydxckNvZGUnXSxcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHR9LFxuXHRcdFx0XHRvcHRpb25zOiBbXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0ZGlzcGxheU5hbWU6ICdBY3RpdmUnLFxuXHRcdFx0XHRcdFx0bmFtZTogJ2FjdGl2ZScsXG5cdFx0XHRcdFx0XHR0eXBlOiAnYm9vbGVhbicsXG5cdFx0XHRcdFx0XHRkZWZhdWx0OiB0cnVlLFxuXHRcdFx0XHRcdFx0ZGVzY3JpcHRpb246ICdXaGV0aGVyIHRoZSBRUiBjb2RlIGlzIGFjdGl2ZScsXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XSxcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdGRpc3BsYXlOYW1lOiAnRmlsdGVycycsXG5cdFx0XHRcdG5hbWU6ICdmaWx0ZXJzJyxcblx0XHRcdFx0dHlwZTogJ2NvbGxlY3Rpb24nLFxuXHRcdFx0XHRwbGFjZWhvbGRlcjogJ0FkZCBGaWx0ZXInLFxuXHRcdFx0XHRkZWZhdWx0OiB7fSxcblx0XHRcdFx0ZGlzcGxheU9wdGlvbnM6IHtcblx0XHRcdFx0XHRzaG93OiB7XG5cdFx0XHRcdFx0XHRyZXNvdXJjZTogWydhbmFseXRpY3MnXSxcblx0XHRcdFx0XHRcdG9wZXJhdGlvbjogWydnZXRTY2FucyddLFxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdH0sXG5cdFx0XHRcdG9wdGlvbnM6IFtcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRkaXNwbGF5TmFtZTogJ1FSIENvZGUgSUQnLFxuXHRcdFx0XHRcdFx0bmFtZTogJ3FyQ29kZUlkJyxcblx0XHRcdFx0XHRcdHR5cGU6ICdzdHJpbmcnLFxuXHRcdFx0XHRcdFx0ZGVmYXVsdDogJycsXG5cdFx0XHRcdFx0XHRkZXNjcmlwdGlvbjogJ0ZpbHRlciBieSBzcGVjaWZpYyBRUiBjb2RlIElEJyxcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdGRpc3BsYXlOYW1lOiAnU3RhcnQgRGF0ZScsXG5cdFx0XHRcdFx0XHRuYW1lOiAnc3RhcnREYXRlJyxcblx0XHRcdFx0XHRcdHR5cGU6ICdkYXRlVGltZScsXG5cdFx0XHRcdFx0XHRkZWZhdWx0OiAnJyxcblx0XHRcdFx0XHRcdGRlc2NyaXB0aW9uOiAnRmlsdGVyIHNjYW5zIGZyb20gdGhpcyBkYXRlJyxcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdGRpc3BsYXlOYW1lOiAnRW5kIERhdGUnLFxuXHRcdFx0XHRcdFx0bmFtZTogJ2VuZERhdGUnLFxuXHRcdFx0XHRcdFx0dHlwZTogJ2RhdGVUaW1lJyxcblx0XHRcdFx0XHRcdGRlZmF1bHQ6ICcnLFxuXHRcdFx0XHRcdFx0ZGVzY3JpcHRpb246ICdGaWx0ZXIgc2NhbnMgdW50aWwgdGhpcyBkYXRlJyxcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRdLFxuXHRcdFx0fSxcblx0XHRdLFxuXHR9O1xuXG5cdGFzeW5jIGV4ZWN1dGUodGhpczogSUV4ZWN1dGVGdW5jdGlvbnMpOiBQcm9taXNlPElOb2RlRXhlY3V0aW9uRGF0YVtdW10+IHtcblx0XHRjb25zdCBpdGVtcyA9IHRoaXMuZ2V0SW5wdXREYXRhKCk7XG5cdFx0Y29uc3QgcmV0dXJuRGF0YTogSU5vZGVFeGVjdXRpb25EYXRhW10gPSBbXTtcblx0XHRjb25zdCBsZW5ndGggPSBpdGVtcy5sZW5ndGg7XG5cblx0XHRjb25zdCBjcmVkZW50aWFscyA9IGF3YWl0IHRoaXMuZ2V0Q3JlZGVudGlhbHMoJ3VxckFpQXBpJyk7XG5cdFx0Y29uc3QgYXBpS2V5ID0gY3JlZGVudGlhbHMuYXBpS2V5IGFzIHN0cmluZztcblx0XHRjb25zdCBiYXNlVVJMID0gKGNyZWRlbnRpYWxzLmJhc2VVcmwgYXMgc3RyaW5nKSB8fCAnaHR0cHM6Ly91cXIuYWkvYXBpL3YxJztcblxuXHRcdGNvbnN0IHJlc291cmNlID0gdGhpcy5nZXROb2RlUGFyYW1ldGVyKCdyZXNvdXJjZScsIDApIGFzIHN0cmluZztcblx0XHRjb25zdCBvcGVyYXRpb24gPSB0aGlzLmdldE5vZGVQYXJhbWV0ZXIoJ29wZXJhdGlvbicsIDApIGFzIHN0cmluZztcblxuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcblx0XHRcdHRyeSB7XG5cdFx0XHRcdGxldCByZXNwb25zZURhdGE6IElEYXRhT2JqZWN0ID0ge307XG5cblx0XHRcdFx0aWYgKHJlc291cmNlID09PSAncXJDb2RlJykge1xuXHRcdFx0XHRcdGlmIChvcGVyYXRpb24gPT09ICdjcmVhdGUnKSB7XG5cdFx0XHRcdFx0XHRjb25zdCBjb250ZW50ID0gdGhpcy5nZXROb2RlUGFyYW1ldGVyKCdjb250ZW50JywgaSkgYXMgc3RyaW5nO1xuXHRcdFx0XHRcdFx0Y29uc3QgbmFtZSA9IHRoaXMuZ2V0Tm9kZVBhcmFtZXRlcignbmFtZScsIGkpIGFzIHN0cmluZztcblx0XHRcdFx0XHRcdGNvbnN0IGlzRHluYW1pYyA9IHRoaXMuZ2V0Tm9kZVBhcmFtZXRlcignaXNEeW5hbWljJywgaSkgYXMgYm9vbGVhbjtcblx0XHRcdFx0XHRcdGNvbnN0IGFkZGl0aW9uYWxGaWVsZHMgPSB0aGlzLmdldE5vZGVQYXJhbWV0ZXIoJ2FkZGl0aW9uYWxGaWVsZHMnLCBpKSBhcyB7XG5cdFx0XHRcdFx0XHRcdGFjdGl2ZT86IGJvb2xlYW47XG5cdFx0XHRcdFx0XHR9O1xuXG5cdFx0XHRcdFx0XHRjb25zdCBib2R5OiBJRGF0YU9iamVjdCA9IHtcblx0XHRcdFx0XHRcdFx0Y29udGVudCxcblx0XHRcdFx0XHRcdFx0aXNEeW5hbWljLFxuXHRcdFx0XHRcdFx0fTtcblxuXHRcdFx0XHRcdFx0aWYgKG5hbWUpIHtcblx0XHRcdFx0XHRcdFx0Ym9keS5uYW1lID0gbmFtZTtcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0T2JqZWN0LmFzc2lnbihib2R5LCBhZGRpdGlvbmFsRmllbGRzKTtcblxuXHRcdFx0XHRcdFx0cmVzcG9uc2VEYXRhID0gYXdhaXQgdGhpcy5oZWxwZXJzLnJlcXVlc3Qoe1xuXHRcdFx0XHRcdFx0XHRtZXRob2Q6ICdQT1NUJyxcblx0XHRcdFx0XHRcdFx0dXJsOiAnL3FyLWNvZGVzJyxcblx0XHRcdFx0XHRcdFx0YmFzZVVSTCxcblx0XHRcdFx0XHRcdFx0aGVhZGVyczoge1xuXHRcdFx0XHRcdFx0XHRcdCd4LWFwaS1rZXknOiBhcGlLZXksXG5cdFx0XHRcdFx0XHRcdFx0J0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcblx0XHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdFx0Ym9keSxcblx0XHRcdFx0XHRcdFx0anNvbjogdHJ1ZSxcblx0XHRcdFx0XHRcdH0pIGFzIElEYXRhT2JqZWN0O1xuXG5cdFx0XHRcdFx0fSBlbHNlIGlmIChvcGVyYXRpb24gPT09ICd1cGRhdGUnKSB7XG5cdFx0XHRcdFx0XHRjb25zdCBxckNvZGVJZCA9IHRoaXMuZ2V0Tm9kZVBhcmFtZXRlcigncXJDb2RlSWQnLCBpKSBhcyBzdHJpbmc7XG5cdFx0XHRcdFx0XHRjb25zdCBuYW1lID0gdGhpcy5nZXROb2RlUGFyYW1ldGVyKCduYW1lJywgaSkgYXMgc3RyaW5nO1xuXHRcdFx0XHRcdFx0Y29uc3QgYWRkaXRpb25hbEZpZWxkcyA9IHRoaXMuZ2V0Tm9kZVBhcmFtZXRlcignYWRkaXRpb25hbEZpZWxkcycsIGkpIGFzIHtcblx0XHRcdFx0XHRcdFx0YWN0aXZlPzogYm9vbGVhbjtcblx0XHRcdFx0XHRcdH07XG5cblx0XHRcdFx0XHRcdGNvbnN0IGJvZHk6IElEYXRhT2JqZWN0ID0ge307XG5cblx0XHRcdFx0XHRcdGlmIChuYW1lKSB7XG5cdFx0XHRcdFx0XHRcdGJvZHkubmFtZSA9IG5hbWU7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdE9iamVjdC5hc3NpZ24oYm9keSwgYWRkaXRpb25hbEZpZWxkcyk7XG5cblx0XHRcdFx0XHRcdHJlc3BvbnNlRGF0YSA9IGF3YWl0IHRoaXMuaGVscGVycy5yZXF1ZXN0KHtcblx0XHRcdFx0XHRcdFx0bWV0aG9kOiAnUEFUQ0gnLFxuXHRcdFx0XHRcdFx0XHR1cmw6IGAvcXItY29kZXMvJHtxckNvZGVJZH1gLFxuXHRcdFx0XHRcdFx0XHRiYXNlVVJMLFxuXHRcdFx0XHRcdFx0XHRoZWFkZXJzOiB7XG5cdFx0XHRcdFx0XHRcdFx0J3gtYXBpLWtleSc6IGFwaUtleSxcblx0XHRcdFx0XHRcdFx0XHQnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuXHRcdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0XHRib2R5LFxuXHRcdFx0XHRcdFx0XHRqc29uOiB0cnVlLFxuXHRcdFx0XHRcdFx0fSkgYXMgSURhdGFPYmplY3Q7XG5cblx0XHRcdFx0XHR9IGVsc2UgaWYgKG9wZXJhdGlvbiA9PT0gJ2dldCcpIHtcblx0XHRcdFx0XHRcdGNvbnN0IHFyQ29kZUlkID0gdGhpcy5nZXROb2RlUGFyYW1ldGVyKCdxckNvZGVJZCcsIGkpIGFzIHN0cmluZztcblxuXHRcdFx0XHRcdFx0cmVzcG9uc2VEYXRhID0gYXdhaXQgdGhpcy5oZWxwZXJzLnJlcXVlc3Qoe1xuXHRcdFx0XHRcdFx0XHRtZXRob2Q6ICdHRVQnLFxuXHRcdFx0XHRcdFx0XHR1cmw6IGAvcXItY29kZXMvJHtxckNvZGVJZH1gLFxuXHRcdFx0XHRcdFx0XHRiYXNlVVJMLFxuXHRcdFx0XHRcdFx0XHRoZWFkZXJzOiB7XG5cdFx0XHRcdFx0XHRcdFx0J3gtYXBpLWtleSc6IGFwaUtleSxcblx0XHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdFx0anNvbjogdHJ1ZSxcblx0XHRcdFx0XHRcdH0pIGFzIElEYXRhT2JqZWN0O1xuXG5cdFx0XHRcdFx0fSBlbHNlIGlmIChvcGVyYXRpb24gPT09ICdsaXN0Jykge1xuXHRcdFx0XHRcdFx0Y29uc3QgcmV0dXJuQWxsID0gdGhpcy5nZXROb2RlUGFyYW1ldGVyKCdyZXR1cm5BbGwnLCBpKSBhcyBib29sZWFuO1xuXHRcdFx0XHRcdFx0Y29uc3QgbGltaXQgPSByZXR1cm5BbGwgPyAxMDAgOiAodGhpcy5nZXROb2RlUGFyYW1ldGVyKCdsaW1pdCcsIGkpIGFzIG51bWJlcik7XG5cblx0XHRcdFx0XHRcdGNvbnN0IHFzOiBJRGF0YU9iamVjdCA9IHtcblx0XHRcdFx0XHRcdFx0bGltaXQsXG5cdFx0XHRcdFx0XHR9O1xuXG5cdFx0XHRcdFx0XHRyZXNwb25zZURhdGEgPSBhd2FpdCB0aGlzLmhlbHBlcnMucmVxdWVzdCh7XG5cdFx0XHRcdFx0XHRcdG1ldGhvZDogJ0dFVCcsXG5cdFx0XHRcdFx0XHRcdHVybDogJy9xci1jb2RlcycsXG5cdFx0XHRcdFx0XHRcdGJhc2VVUkwsXG5cdFx0XHRcdFx0XHRcdGhlYWRlcnM6IHtcblx0XHRcdFx0XHRcdFx0XHQneC1hcGkta2V5JzogYXBpS2V5LFxuXHRcdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0XHRxcyxcblx0XHRcdFx0XHRcdFx0anNvbjogdHJ1ZSxcblx0XHRcdFx0XHRcdH0pIGFzIElEYXRhT2JqZWN0O1xuXG5cdFx0XHRcdFx0fSBlbHNlIGlmIChvcGVyYXRpb24gPT09ICdkZWxldGUnKSB7XG5cdFx0XHRcdFx0XHRjb25zdCBxckNvZGVJZCA9IHRoaXMuZ2V0Tm9kZVBhcmFtZXRlcigncXJDb2RlSWQnLCBpKSBhcyBzdHJpbmc7XG5cblx0XHRcdFx0XHRcdHJlc3BvbnNlRGF0YSA9IGF3YWl0IHRoaXMuaGVscGVycy5yZXF1ZXN0KHtcblx0XHRcdFx0XHRcdFx0bWV0aG9kOiAnREVMRVRFJyxcblx0XHRcdFx0XHRcdFx0dXJsOiBgL3FyLWNvZGVzLyR7cXJDb2RlSWR9YCxcblx0XHRcdFx0XHRcdFx0YmFzZVVSTCxcblx0XHRcdFx0XHRcdFx0aGVhZGVyczoge1xuXHRcdFx0XHRcdFx0XHRcdCd4LWFwaS1rZXknOiBhcGlLZXksXG5cdFx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRcdGpzb246IHRydWUsXG5cdFx0XHRcdFx0XHR9KSBhcyBJRGF0YU9iamVjdDtcblxuXHRcdFx0XHRcdH0gZWxzZSBpZiAob3BlcmF0aW9uID09PSAnZ2V0U2NhbnMnKSB7XG5cdFx0XHRcdFx0XHRjb25zdCBxckNvZGVJZCA9IHRoaXMuZ2V0Tm9kZVBhcmFtZXRlcigncXJDb2RlSWQnLCBpKSBhcyBzdHJpbmc7XG5cblx0XHRcdFx0XHRcdHJlc3BvbnNlRGF0YSA9IGF3YWl0IHRoaXMuaGVscGVycy5yZXF1ZXN0KHtcblx0XHRcdFx0XHRcdFx0bWV0aG9kOiAnR0VUJyxcblx0XHRcdFx0XHRcdFx0dXJsOiBgL3FyLWNvZGVzLyR7cXJDb2RlSWR9L3NjYW5zYCxcblx0XHRcdFx0XHRcdFx0YmFzZVVSTCxcblx0XHRcdFx0XHRcdFx0aGVhZGVyczoge1xuXHRcdFx0XHRcdFx0XHRcdCd4LWFwaS1rZXknOiBhcGlLZXksXG5cdFx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRcdGpzb246IHRydWUsXG5cdFx0XHRcdFx0XHR9KSBhcyBJRGF0YU9iamVjdDtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0fSBlbHNlIGlmIChyZXNvdXJjZSA9PT0gJ2FuYWx5dGljcycpIHtcblx0XHRcdFx0XHRpZiAob3BlcmF0aW9uID09PSAnZ2V0U2NhbnMnKSB7XG5cdFx0XHRcdFx0XHRjb25zdCBmaWx0ZXJzID0gdGhpcy5nZXROb2RlUGFyYW1ldGVyKCdmaWx0ZXJzJywgaSkgYXMge1xuXHRcdFx0XHRcdFx0XHRxckNvZGVJZD86IHN0cmluZztcblx0XHRcdFx0XHRcdFx0c3RhcnREYXRlPzogc3RyaW5nO1xuXHRcdFx0XHRcdFx0XHRlbmREYXRlPzogc3RyaW5nO1xuXHRcdFx0XHRcdFx0fTtcblxuXHRcdFx0XHRcdFx0Y29uc3QgcXM6IElEYXRhT2JqZWN0ID0ge307XG5cblx0XHRcdFx0XHRcdGlmIChmaWx0ZXJzLnFyQ29kZUlkKSB7XG5cdFx0XHRcdFx0XHRcdHFzLnFyQ29kZUlkID0gZmlsdGVycy5xckNvZGVJZDtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGlmIChmaWx0ZXJzLnN0YXJ0RGF0ZSkge1xuXHRcdFx0XHRcdFx0XHRxcy5zdGFydERhdGUgPSBmaWx0ZXJzLnN0YXJ0RGF0ZTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGlmIChmaWx0ZXJzLmVuZERhdGUpIHtcblx0XHRcdFx0XHRcdFx0cXMuZW5kRGF0ZSA9IGZpbHRlcnMuZW5kRGF0ZTtcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0cmVzcG9uc2VEYXRhID0gYXdhaXQgdGhpcy5oZWxwZXJzLnJlcXVlc3Qoe1xuXHRcdFx0XHRcdFx0XHRtZXRob2Q6ICdHRVQnLFxuXHRcdFx0XHRcdFx0XHR1cmw6ICcvYW5hbHl0aWNzL3NjYW5zJyxcblx0XHRcdFx0XHRcdFx0YmFzZVVSTCxcblx0XHRcdFx0XHRcdFx0aGVhZGVyczoge1xuXHRcdFx0XHRcdFx0XHRcdCd4LWFwaS1rZXknOiBhcGlLZXksXG5cdFx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRcdHFzLFxuXHRcdFx0XHRcdFx0XHRqc29uOiB0cnVlLFxuXHRcdFx0XHRcdFx0fSkgYXMgSURhdGFPYmplY3Q7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0Y29uc3QgZXhlY3V0aW9uRGF0YSA9IHRoaXMuaGVscGVycy5jb25zdHJ1Y3RFeGVjdXRpb25NZXRhRGF0YShcblx0XHRcdFx0XHR0aGlzLmhlbHBlcnMucmV0dXJuSnNvbkFycmF5KHJlc3BvbnNlRGF0YSksXG5cdFx0XHRcdFx0eyBpdGVtRGF0YTogeyBpdGVtOiBpIH0gfSxcblx0XHRcdFx0KTtcblx0XHRcdFx0cmV0dXJuRGF0YS5wdXNoKC4uLmV4ZWN1dGlvbkRhdGEpO1xuXHRcdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdFx0aWYgKHRoaXMuY29udGludWVPbkZhaWwoKSkge1xuXHRcdFx0XHRcdGNvbnN0IGVycm9yTWVzc2FnZSA9IGVycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogJ1Vua25vd24gZXJyb3InO1xuXHRcdFx0XHRcdGNvbnN0IGV4ZWN1dGlvbkVycm9yRGF0YSA9IHRoaXMuaGVscGVycy5jb25zdHJ1Y3RFeGVjdXRpb25NZXRhRGF0YShcblx0XHRcdFx0XHRcdHRoaXMuaGVscGVycy5yZXR1cm5Kc29uQXJyYXkoeyBlcnJvcjogZXJyb3JNZXNzYWdlIH0pLFxuXHRcdFx0XHRcdFx0eyBpdGVtRGF0YTogeyBpdGVtOiBpIH0gfSxcblx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdHJldHVybkRhdGEucHVzaCguLi5leGVjdXRpb25FcnJvckRhdGEpO1xuXHRcdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHRocm93IGVycm9yO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBbcmV0dXJuRGF0YV07XG5cdH1cbn1cbiJdfQ==