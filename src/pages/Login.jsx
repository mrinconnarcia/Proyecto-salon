import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, Smartphone, ArrowRight } from 'lucide-react';

export default function MobileLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert('¡Login exitoso!');
      
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-ping"></div>
      </div>

      <div className="w-full max-w-sm mx-auto relative z-10">
        {/* Header con icono */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full mb-4 shadow-lg">
            <Smartphone className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Bienvenido</h1>
          <p className="text-purple-200">Inicia sesión para continuar</p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
          <div className="space-y-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-purple-300" />
              </div>
              <input
                type="email"
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200"
                required
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-purple-300" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-12 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-purple-300 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-purple-400 bg-transparent border-white/30 rounded focus:ring-purple-400 focus:ring-2"
                />
                <span className="ml-2 text-sm text-purple-200">Recordarme</span>
              </label>
              <a href="#" className="text-sm text-purple-300 hover:text-white transition-colors">
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-4 rounded-2xl font-semibold shadow-lg hover:from-purple-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Iniciando sesión...</span>
                </div>
              ) : (
                <>
                  <span>Iniciar Sesión</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </div>

          <div className="mt-8 text-center">
            <p className="text-purple-200">
              ¿No tienes cuenta?{' '}
              <a href="#" className="text-purple-300 hover:text-white font-semibold transition-colors">
                Regístrate aquí
              </a>
            </p>
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-purple-300 text-sm">
            Al continuar, aceptas nuestros{' '}
            <a href="#" className="underline hover:text-white transition-colors">
              Términos de Servicio
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}