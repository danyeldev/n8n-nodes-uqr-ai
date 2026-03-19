import type {
	ICredentialType,
	ICredentialTestRequest,
	INodeProperties,
} from 'n8n-workflow';

export class UqrAiApi implements ICredentialType {
	name = 'uqrAiApi';
	displayName = 'uqr.ai API';
	documentationUrl = 'https://uqr.ai/api-docs';

	properties: INodeProperties[] = [
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

	test: ICredentialTestRequest = {
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
