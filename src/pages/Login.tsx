import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { Lock } from 'lucide-react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(username, password);
    navigate('/status');
  };

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