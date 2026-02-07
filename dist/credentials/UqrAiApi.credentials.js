"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UqrAiApi = void 0;
class UqrAiApi {
    constructor() {
        this.name = 'uqrAiApi';
        this.displayName = 'uqr.ai API';
        this.documentationUrl = 'https://uqr.ai/docs/api';
        this.properties = [
            {
                displayName: 'API Key',
                name: 'apiKey',
                type: 'string',
                typeOptions: {
                    password: true,
                },
                default: '',
                description: 'Your uqr.ai API key (starts with uqr_ prefix)',
                required: true,
                placeholder: 'uqr_your_api_key_here',
            },
            {
                displayName: 'API Base URL',
                name: 'baseUrl',
                type: 'string',
                default: 'https://uqr.ai/api/v1',
                description: 'The base URL for the uqr.ai API',
                required: true,
            },
        ];
        this.test = {
            request: {
                baseURL: '={{ $credentials.baseUrl }}',
                url: '/qr-codes',
                method: 'GET',
                headers: {
                    'x-api-key': '={{ $credentials.apiKey }}',
                },
            },
        };
    }
}
exports.UqrAiApi = UqrAiApi;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXFyQWlBcGkuY3JlZGVudGlhbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9jcmVkZW50aWFscy9VcXJBaUFwaS5jcmVkZW50aWFscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFNQSxNQUFhLFFBQVE7SUFBckI7UUFDQyxTQUFJLEdBQUcsVUFBVSxDQUFDO1FBQ2xCLGdCQUFXLEdBQUcsWUFBWSxDQUFDO1FBQzNCLHFCQUFnQixHQUFHLHlCQUF5QixDQUFDO1FBRTdDLGVBQVUsR0FBc0I7WUFDL0I7Z0JBQ0MsV0FBVyxFQUFFLFNBQVM7Z0JBQ3RCLElBQUksRUFBRSxRQUFRO2dCQUNkLElBQUksRUFBRSxRQUFRO2dCQUNkLFdBQVcsRUFBRTtvQkFDWixRQUFRLEVBQUUsSUFBSTtpQkFDZDtnQkFDRCxPQUFPLEVBQUUsRUFBRTtnQkFDWCxXQUFXLEVBQUUsK0NBQStDO2dCQUM1RCxRQUFRLEVBQUUsSUFBSTtnQkFDZCxXQUFXLEVBQUUsdUJBQXVCO2FBQ3BDO1lBQ0Q7Z0JBQ0MsV0FBVyxFQUFFLGNBQWM7Z0JBQzNCLElBQUksRUFBRSxTQUFTO2dCQUNmLElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSx1QkFBdUI7Z0JBQ2hDLFdBQVcsRUFBRSxpQ0FBaUM7Z0JBQzlDLFFBQVEsRUFBRSxJQUFJO2FBQ2Q7U0FDRCxDQUFDO1FBRUYsU0FBSSxHQUEyQjtZQUM5QixPQUFPLEVBQUU7Z0JBQ1IsT0FBTyxFQUFFLDZCQUE2QjtnQkFDdEMsR0FBRyxFQUFFLFdBQVc7Z0JBQ2hCLE1BQU0sRUFBRSxLQUFLO2dCQUNiLE9BQU8sRUFBRTtvQkFDUixXQUFXLEVBQUUsNEJBQTRCO2lCQUN6QzthQUNEO1NBQ0QsQ0FBQztJQUNILENBQUM7Q0FBQTtBQXRDRCw0QkFzQ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdHlwZSB7XG5cdElDcmVkZW50aWFsVHlwZSxcblx0SUNyZWRlbnRpYWxUZXN0UmVxdWVzdCxcblx0SU5vZGVQcm9wZXJ0aWVzLFxufSBmcm9tICduOG4td29ya2Zsb3cnO1xuXG5leHBvcnQgY2xhc3MgVXFyQWlBcGkgaW1wbGVtZW50cyBJQ3JlZGVudGlhbFR5cGUge1xuXHRuYW1lID0gJ3VxckFpQXBpJztcblx0ZGlzcGxheU5hbWUgPSAndXFyLmFpIEFQSSc7XG5cdGRvY3VtZW50YXRpb25VcmwgPSAnaHR0cHM6Ly91cXIuYWkvZG9jcy9hcGknO1xuXG5cdHByb3BlcnRpZXM6IElOb2RlUHJvcGVydGllc1tdID0gW1xuXHRcdHtcblx0XHRcdGRpc3BsYXlOYW1lOiAnQVBJIEtleScsXG5cdFx0XHRuYW1lOiAnYXBpS2V5Jyxcblx0XHRcdHR5cGU6ICdzdHJpbmcnLFxuXHRcdFx0dHlwZU9wdGlvbnM6IHtcblx0XHRcdFx0cGFzc3dvcmQ6IHRydWUsXG5cdFx0XHR9LFxuXHRcdFx0ZGVmYXVsdDogJycsXG5cdFx0XHRkZXNjcmlwdGlvbjogJ1lvdXIgdXFyLmFpIEFQSSBrZXkgKHN0YXJ0cyB3aXRoIHVxcl8gcHJlZml4KScsXG5cdFx0XHRyZXF1aXJlZDogdHJ1ZSxcblx0XHRcdHBsYWNlaG9sZGVyOiAndXFyX3lvdXJfYXBpX2tleV9oZXJlJyxcblx0XHR9LFxuXHRcdHtcblx0XHRcdGRpc3BsYXlOYW1lOiAnQVBJIEJhc2UgVVJMJyxcblx0XHRcdG5hbWU6ICdiYXNlVXJsJyxcblx0XHRcdHR5cGU6ICdzdHJpbmcnLFxuXHRcdFx0ZGVmYXVsdDogJ2h0dHBzOi8vdXFyLmFpL2FwaS92MScsXG5cdFx0XHRkZXNjcmlwdGlvbjogJ1RoZSBiYXNlIFVSTCBmb3IgdGhlIHVxci5haSBBUEknLFxuXHRcdFx0cmVxdWlyZWQ6IHRydWUsXG5cdFx0fSxcblx0XTtcblxuXHR0ZXN0OiBJQ3JlZGVudGlhbFRlc3RSZXF1ZXN0ID0ge1xuXHRcdHJlcXVlc3Q6IHtcblx0XHRcdGJhc2VVUkw6ICc9e3sgJGNyZWRlbnRpYWxzLmJhc2VVcmwgfX0nLFxuXHRcdFx0dXJsOiAnL3FyLWNvZGVzJyxcblx0XHRcdG1ldGhvZDogJ0dFVCcsXG5cdFx0XHRoZWFkZXJzOiB7XG5cdFx0XHRcdCd4LWFwaS1rZXknOiAnPXt7ICRjcmVkZW50aWFscy5hcGlLZXkgfX0nLFxuXHRcdFx0fSxcblx0XHR9LFxuXHR9O1xufVxuIl19