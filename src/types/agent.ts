
export interface BaseAgentConfig {
  name: string;
  voiceId: string;
  provider: 'vapi' | 'retell';
}

export interface VapiAgentConfig extends BaseAgentConfig {
  provider: 'vapi';
  externalId: string;
}

export interface RetellAgentConfig extends BaseAgentConfig {
  provider: 'retell';
}

export type AgentConfig = VapiAgentConfig | RetellAgentConfig;

export interface AgentFormData {
  name: string;
  voiceId: string;
  provider: 'vapi' | 'retell';
  externalId?: string;
}
