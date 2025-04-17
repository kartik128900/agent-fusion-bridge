
import { CreateAgentForm } from '@/components/CreateAgentForm';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Create AI Agent</h1>
        <p className="text-gray-600">
          Unified interface for creating agents with Vapi or Retell
        </p>
      </div>
      <CreateAgentForm />
    </div>
  );
};

export default Index;
