import React from 'react';
import { ArrowLeft, Home, Users, FileText, BarChart3 } from 'lucide-react';

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-[#353030] dark:to-slate-800 flex items-center justify-center p-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8 relative">
          <svg
            className="w-80 h-80 mx-auto mb-8 animate-pulse"
            viewBox="0 0 400 400"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="200"
              cy="200"
              r="180"
              fill="url(#gradient1)"
              opacity="0.1"
            />
            <text
              x="200"
              y="160"
              textAnchor="middle"
              fontSize="72"
              fontWeight="bold"
              fill="url(#gradient2)"
              className="animate-bounce"
            >
              404
            </text>

            {/* HR Icons Floating Around */}
            <g className="animate-spin" style={{ transformOrigin: '200px 200px', animationDuration: '20s' }}>
              {/* Users Icon */}
              <circle cx="120" cy="120" r="25" fill="url(#gradient3)" opacity="0.8" />
              <Users className="w-6 h-6" x="114" y="114" />

              {/* Documents Icon */}
              <circle cx="280" cy="120" r="25" fill="url(#gradient4)" opacity="0.8" />
              <FileText className="w-6 h-6" x="274" y="114" />

              {/* Charts Icon */}
              <circle cx="120" cy="280" r="25" fill="url(#gradient5)" opacity="0.8" />
              <BarChart3 className="w-6 h-6" x="114" y="274" />

              {/* Home Icon */}
              <circle cx="280" cy="280" r="25" fill="url(#gradient6)" opacity="0.8" />
              <Home className="w-6 h-6" x="274" y="274" />
            </g>

            {/* Connecting Lines */}
            <path
              d="M120 120 L280 120 L280 280 L120 280 Z"
              stroke="url(#gradient7)"
              strokeWidth="2"
              strokeDasharray="5,5"
              fill="none"
              opacity="0.3"
              className="animate-pulse"
            />

            {/* Gradients */}
            <defs>
              <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#2563eb" />
                <stop offset="100%" stopColor="#65a30d" />
              </linearGradient>
              <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#2563eb" />
                <stop offset="50%" stopColor="#7c3aed" />
                <stop offset="100%" stopColor="#65a30d" />
              </linearGradient>
              <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#1d4ed8" />
              </linearGradient>
              <linearGradient id="gradient4" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#059669" />
              </linearGradient>
              <linearGradient id="gradient5" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#d97706" />
              </linearGradient>
              <linearGradient id="gradient6" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ef4444" />
                <stop offset="100%" stopColor="#dc2626" />
              </linearGradient>
              <linearGradient id="gradient7" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#2563eb" />
                <stop offset="100%" stopColor="#65a30d" />
              </linearGradient>
            </defs>
          </svg>

          {/* Floating Elements */}
          <div className="absolute top-10 left-10 animate-bounce delay-100">
            <div className="w-8 h-8 bg-blue-500 rounded-full opacity-20"></div>
          </div>
          <div className="absolute top-20 right-16 animate-bounce delay-300">
            <div className="w-6 h-6 bg-lime-500 rounded-full opacity-30"></div>
          </div>
          <div className="absolute bottom-16 left-20 animate-bounce delay-500">
            <div className="w-4 h-4 bg-purple-500 rounded-full opacity-25"></div>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-lime-600 animate-pulse">
            Page Introuvable
          </h1>

          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
            Oops ! Cette ressource RH n'existe pas
          </h2>

          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Il semblerait que la page que vous recherchez dans votre système de gestion des ressources humaines
            ait été déplacée, supprimée ou n'existe tout simplement pas. Ne vous inquiétez pas,
            notre équipe RH est là pour vous aider !
          </p>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            <div className="flex items-center space-x-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-4 py-2 rounded-full text-sm font-medium">
              <Users className="w-4 h-4" />
              <span>Gestion d'équipe</span>
            </div>
            <div className="flex items-center space-x-2 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 px-4 py-2 rounded-full text-sm font-medium">
              <FileText className="w-4 h-4" />
              <span>Documents RH</span>
            </div>
            <div className="flex items-center space-x-2 bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200 px-4 py-2 rounded-full text-sm font-medium">
              <BarChart3 className="w-4 h-4" />
              <span>Analytics</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
            <button className="group flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
              <Home className="w-5 h-5 group-hover:animate-pulse" />
              <span>Retour au Tableau de Bord</span>
            </button>

            <button className="group flex items-center space-x-2 bg-gradient-to-r from-lime-600 to-lime-700 hover:from-lime-700 hover:to-lime-800 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span>Page Précédente</span>
            </button>
          </div>

          {/* Help Section */}
          <div className="mt-16 p-8 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              Besoin d'aide ?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Notre équipe support RH est disponible pour vous accompagner dans l'utilisation de la plateforme.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:support@votre-saas.com"
                className="inline-flex items-center justify-center px-6 py-3 border border-blue-300 dark:border-blue-700 text-blue-700 dark:text-blue-300 bg-transparent hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg font-medium transition-colors duration-200"
              >
                Contacter le Support
              </a>
              <a
                href="/documentation"
                className="inline-flex items-center justify-center px-6 py-3 border border-lime-300 dark:border-lime-700 text-lime-700 dark:text-lime-300 bg-transparent hover:bg-lime-50 dark:hover:bg-lime-900/20 rounded-lg font-medium transition-colors duration-200"
              >
                Consulter la Documentation
              </a>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 text-sm text-gray-500 dark:text-gray-400">
          <p>© 2025 Votre SaaS RH - Gestion simplifiée des ressources humaines</p>
        </div>
      </div>
    </div>
  );
};