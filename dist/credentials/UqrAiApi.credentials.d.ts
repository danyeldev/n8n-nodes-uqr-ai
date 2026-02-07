import type { ICredentialType, ICredentialTestRequest, INodeProperties } from 'n8n-workflow';
export declare class UqrAiApi implements ICredentialType {
    name: string;
    displayName: string;
    documentationUrl: string;
    properties: INodeProperties[];
    test: ICredentialTestRequest;
}
