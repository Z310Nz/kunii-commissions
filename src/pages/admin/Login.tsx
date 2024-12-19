import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { Lock, ListChecks, CheckSquare, Image } from 'lucide-react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(username, password);
  };

  if (isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#D3E4FD] to-white p-8">
        <div className="max-w-md mx-auto animate-fade-in">
          <Card className="p-8 bg-white/80 backdrop-blur border-none shadow-lg">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-[#1A1F2C] mb-6">Admin Dashboard</h1>
              <p className="text-gray-600 mb-8">Select a page to manage:</p>
            </div>
            
            <div className="space-y-4">
              <Button 
                onClick={() => navigate('/status')}
                className="w-full py-6 flex items-center justify-center gap-2 text-lg"
              >
                <CheckSquare className="w-5 h-5" />
                Commission Status
              </Button>
              
              <Button 
                onClick={() => navigate('/queue')}
                className="w-full py-6 flex items-center justify-center gap-2 text-lg"
                variant="secondary"
              >
                <ListChecks className="w-5 h-5" />
                Commission Queue
              </Button>

              <Button 
                onClick={() => navigate('/prices')}
                className="w-full py-6 flex items-center justify-center gap-2 text-lg"
                variant="outline"
              >
                <Image className="w-5 h-5" />
                Commission Prices
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#D3E4FD] to-white p-8">
      <div className="max-w-md mx-auto animate-fade-in">
        <Card className="p-8 bg-white/80 backdrop-blur border-none shadow-lg">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <Lock className="w-12 h-12 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-[#1A1F2C]">Admin Login</h1>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="text-lg py-6"
              />
            </div>
            <div>
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="text-lg py-6"
              />
            </div>
            <Button type="submit" className="w-full text-lg py-6">
              Login
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Login;