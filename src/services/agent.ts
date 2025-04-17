
import type { AgentConfig, VapiAgentConfig, RetellAgentConfig } from '@/types/agent';

const VAPI_BASE_URL = 'https://api.vapi.ai';
const RETELL_BASE_URL = 'https://api.retellai.com';

export class AgentService {
  private vapiApiKey: string;
  private retellApiKey: string;

  constructor(vapiApiKey: string, retellApiKey: string) {
    this.vapiApiKey = vapiApiKey;
    this.retellApiKey = retellApiKey;
  }

  async createAgent(config: AgentConfig) {
    if (config.provider === 'vapi') {
      return this.createVapiAgent(config);
    } else {
      return this.createRetellAgent(config);
    }
  }

  private async createVapiAgent(config: VapiAgentConfig) {
    const response = await fetch(`${VAPI_BASE_URL}/v1/assistants`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.vapiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: config.name,
        external_id: config.externalId,
        voice_id: config.voiceId,
      }),
    });

    if (!response.ok) {
      throw new Error(`Vapi API error: ${response.statusText}`);
    }

    return response.json();
  }

  private async createRetellAgent(config: RetellAgentConfig) {
    const response = await fetch(`${RETELL_BASE_URL}/agents`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.retellApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: config.name,
        voice_id: config.voiceId,
      }),
    });

    if (!response.ok) {
      throw new Error(`Retell API error: ${response.statusText}`);
    }

    return response.json();
  }
}
