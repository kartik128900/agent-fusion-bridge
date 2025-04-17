
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/components/ui/use-toast';
import { AgentService } from '@/services/agent';
import type { AgentFormData, AgentConfig } from '@/types/agent';

const agentService = new AgentService(
  'your_vapi_key_here',
  'your_retell_key_here'
);

export function CreateAgentForm() {
  const { toast } = useToast();
  const [formData, setFormData] = useState<AgentFormData>({
    name: '',
    voiceId: '',
    provider: 'vapi',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const config: AgentConfig = formData.provider === 'vapi' 
        ? { 
            provider: 'vapi',
            name: formData.name,
            voiceId: formData.voiceId,
            externalId: formData.externalId || formData.name 
          }
        : {
            provider: 'retell',
            name: formData.name,
            voiceId: formData.voiceId
          };
        
      await agentService.createAgent(config);
      
      toast({
        title: 'Success!',
        description: 'Agent created successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to create agent',
        variant: 'destructive',
      });
    }
  };

  return (
    <Card className="w-full max-w-md p-6 space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label>Provider</Label>
          <RadioGroup
            value={formData.provider}
            onValueChange={(value) => setFormData({ ...formData, provider: value as 'vapi' | 'retell' })}
            className="flex space-x-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="vapi" id="vapi" />
              <Label htmlFor="vapi">Vapi</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="retell" id="retell" />
              <Label htmlFor="retell">Retell</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label htmlFor="name">Agent Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="voiceId">Voice ID</Label>
          <Input
            id="voiceId"
            value={formData.voiceId}
            onChange={(e) => setFormData({ ...formData, voiceId: e.target.value })}
            required
          />
        </div>

        {formData.provider === 'vapi' && (
          <div className="space-y-2">
            <Label htmlFor="externalId">External ID (Optional)</Label>
            <Input
              id="externalId"
              value={formData.externalId || ''}
              onChange={(e) => setFormData({ ...formData, externalId: e.target.value })}
              placeholder="Defaults to agent name if empty"
            />
          </div>
        )}

        <Button type="submit" className="w-full">
          Create Agent
        </Button>
      </form>
    </Card>
  );
}
