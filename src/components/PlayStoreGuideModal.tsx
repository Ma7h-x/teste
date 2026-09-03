import React, { useState } from 'react';
import { 
  X, 
  Smartphone, 
  Terminal, 
  Globe, 
  UploadCloud, 
  CheckCircle2, 
  ExternalLink, 
  Sparkles, 
  Heart, 
  Copy, 
  Check,
  ShieldCheck,
  FileCode,
  Layers,
  Download,
  AlertCircle,
  HelpCircle
} from 'lucide-react';

interface PlayStoreGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PlayStoreGuideModal: React.FC<PlayStoreGuideModalProps> = ({
  isOpen,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'pwabuilder' | 'strategy' | 'twa' | 'capacitor' | 'playconsole'>('pwabuilder');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  if (!isOpen) return null;

  const manifestJsonString = JSON.stringify({
    id: "/",
    name: "Vitória • Gestor Acadêmico & Estudos",
    short_name: "Vitória",
    description: "Aplicativo universitário completo para gestão de matérias, provas, notas, cálculo de médias, simulador de aprovação e ferramentas de estudo.",
    lang: "pt-BR",
    dir: "ltr",
    start_url: "/",
    scope: "/",
    display: "standalone",
    display_override: [
      "window-controls-overlay",
      "standalone",
      "minimal-ui"
    ],
    orientation: "portrait",
    background_color: "#ffffff",
    theme_color: "#2563eb",
    categories: ["education", "productivity", "utilities"],
    prefer_related_applications: false,
    related_applications: [],
    launch_handler: {
      client_mode: "focus-existing"
    },
    share_target: {
      action: "/",
      method: "GET",
      params: {
        title: "title",
        text: "text",
        url: "url"
      }
    },
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any"
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any"
      },
      {
        src: "/icon-maskable.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable"
      }
    ],
    screenshots: [
      {
        src: "/screenshot-mobile.png",
        sizes: "1080x1920",
        type: "image/png",
        form_factor: "narrow",
        label: "Painel acadêmico de estudos, matérias e simuladores"
      }
    ],
    shortcuts: [
      {
        name: "Simulador de Médias",
        short_name: "Simulador",
        description: "Calcular nota necessária para aprovação",
        url: "/#lab",
        icons: [{ src: "/icon-192.png", sizes: "192x192" }]
      },
      {
        name: "Provas e Trabalhos",
        short_name: "Provas",
        description: "Ver cronograma de avaliações",
        url: "/#exams",
        icons: [{ src: "/icon-192.png", sizes: "192x192" }]
      }
    ]
  }, null, 2);

  const handleCopyCode = (code: string, index: number) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleDownloadManifest = () => {
    const blob = new Blob([manifestJsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'manifest.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-stone-900/60 backdrop-blur-xs animate-fadeIn">
      <div 
        className="bg-white rounded-3xl w-full max-w-lg max-h-[92vh] flex flex-col shadow-2xl overflow-hidden border border-stone-100"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-stone-100 flex items-center justify-between bg-gradient-to-r from-stone-900 via-zinc-800 to-stone-900 text-white">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-white/20 backdrop-blur-xs flex items-center justify-center font-bold text-white">
              <Smartphone className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-black flex items-center gap-1.5">
                Publicação Play Store & PWA 🚀
              </h2>
              <p className="text-[11px] text-stone-300">
                Manifesto completo pré-configurado, ícones e pacote .AAB
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-stone-300 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-stone-200 bg-stone-50 text-xs font-bold shrink-0 overflow-x-auto">
          <button
            onClick={() => setActiveTab('pwabuilder')}
            className={`py-2.5 px-4 whitespace-nowrap transition border-b-2 flex items-center gap-1.5 ${
              activeTab === 'pwabuilder'
                ? 'border-blue-600 text-blue-600 bg-white'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <Globe className="w-3.5 h-3.5" /> 1. PWABuilder (.AAB Online)
          </button>

          <button
            onClick={() => setActiveTab('strategy')}
            className={`py-2.5 px-4 whitespace-nowrap transition border-b-2 flex items-center gap-1.5 ${
              activeTab === 'strategy'
                ? 'border-pink-600 text-pink-600 bg-white'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <Heart className="w-3.5 h-3.5" /> 2. Modo Vitória vs Público
          </button>

          <button
            onClick={() => setActiveTab('twa')}
            className={`py-2.5 px-4 whitespace-nowrap transition border-b-2 flex items-center gap-1.5 ${
              activeTab === 'twa'
                ? 'border-indigo-600 text-indigo-600 bg-white'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" /> 3. Bubblewrap CLI
          </button>

          <button
            onClick={() => setActiveTab('capacitor')}
            className={`py-2.5 px-4 whitespace-nowrap transition border-b-2 flex items-center gap-1.5 ${
              activeTab === 'capacitor'
                ? 'border-emerald-600 text-emerald-600 bg-white'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5" /> 4. Capacitor (Android Studio)
          </button>

          <button
            onClick={() => setActiveTab('playconsole')}
            className={`py-2.5 px-4 whitespace-nowrap transition border-b-2 flex items-center gap-1.5 ${
              activeTab === 'playconsole'
                ? 'border-amber-600 text-amber-600 bg-white'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <UploadCloud className="w-3.5 h-3.5" /> 5. Play Console
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 text-xs text-stone-700">
          {activeTab === 'pwabuilder' && (
            <div className="space-y-4 animate-fadeIn">
              {/* Alert box explaining why the URL gave no manifest */}
              <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-2xl space-y-2">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-amber-900 text-xs">
                      Por que o PWABuilder listou todos esses campos como ausentes?
                    </h3>
                    <p className="text-[11px] text-amber-800 leading-relaxed mt-1">
                      As URLs do Google AI Studio (<code>ais-pre-...</code>) possuem uma proteção de segurança do Google (<code>cookie_check</code>). Quando o robô do PWABuilder tenta acessar a URL para ler o manifesto automaticamente, o Google bloqueia o robô e redireciona para uma página de login. Por isso, o PWABuilder não conseguiu ler o arquivo pela URL e listou todos os campos (Required, Recommended, Optional) como se não existissem.
                    </p>
                    <p className="text-[11px] text-amber-900 font-bold mt-1">
                      ✅ Solução imediata: O manifesto já está 100% pronto abaixo com TODOS esses campos preenchidos! Basta copiar o JSON ou baixar o arquivo.
                    </p>
                  </div>
                </div>
              </div>

              {/* Complete Manifest Pre-configured */}
              <div className="p-4 bg-blue-50/70 border border-blue-200 rounded-2xl space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-blue-700 tracking-wider">
                      Todos os campos preenchidos (Required, Recommended & Optional)
                    </span>
                    <h3 className="font-bold text-blue-950 text-sm">
                      Manifesto Completo Pronto para Copiar
                    </h3>
                  </div>
                  <button
                    onClick={handleDownloadManifest}
                    className="px-2.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition"
                  >
                    <Download className="w-3.5 h-3.5" /> Baixar manifest.json
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-2 text-[10px]">
                  <div className="p-2 bg-white rounded-xl border border-blue-100">
                    <strong className="text-emerald-700 block">✓ Required:</strong>
                    <span className="text-stone-600">name, short_name, start_url, icons (192, 512)</span>
                  </div>
                  <div className="p-2 bg-white rounded-xl border border-blue-100">
                    <strong className="text-blue-700 block">✓ Recommended:</strong>
                    <span className="text-stone-600">id, orientation, display, theme, background, screenshots, description</span>
                  </div>
                  <div className="p-2 bg-white rounded-xl border border-blue-100">
                    <strong className="text-indigo-700 block">✓ Optional:</strong>
                    <span className="text-stone-600">dir, lang, scope, shortcuts, launch_handler, display_override</span>
                  </div>
                </div>

                {/* Copy Manifest JSON code */}
                <div className="space-y-1 pt-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-stone-600">
                      Código JSON do manifesto (copie com 1 clique):
                    </span>
                    <button
                      onClick={() => handleCopyCode(manifestJsonString, 99)}
                      className="px-2 py-1 rounded-md bg-stone-900 text-white text-[10px] font-bold flex items-center gap-1 hover:bg-black transition"
                    >
                      {copiedIndex === 99 ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" /> Copiado!
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" /> Copiar JSON
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="p-2.5 bg-stone-900 text-stone-200 rounded-xl text-[10px] font-mono max-h-36 overflow-y-auto leading-tight">
                    {manifestJsonString}
                  </pre>
                </div>
              </div>

              {/* Step by step for PWABuilder */}
              <div className="space-y-2">
                <h4 className="font-bold text-stone-900 text-xs flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                  Como usar no PWABuilder sem cadastrar nada:
                </h4>

                <div className="space-y-2 text-[11px]">
                  <div className="p-2.5 bg-stone-50 rounded-xl border border-stone-200 flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                      1
                    </span>
                    <div>
                      <strong className="text-stone-900 block">Ative a URL no AI Studio:</strong>
                      <span className="text-stone-600">
                        No canto superior direito da tela do Google AI Studio, clique em <strong>Share (Compartilhar)</strong>. Isso tornará a URL <code>ais-pre-...</code> pública para o PWABuilder ler diretamente.
                      </span>
                    </div>
                  </div>

                  <div className="p-2.5 bg-stone-50 rounded-xl border border-stone-200 flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                      2
                    </span>
                    <div>
                      <strong className="text-stone-900 block">Ou cole o manifesto no PWABuilder:</strong>
                      <span className="text-stone-600">
                        No site <strong>pwabuilder.com</strong>, se a URL não carregar de imediato, clique na aba <strong>"Manifest Options"</strong> e cole o JSON copiado acima. Todos os campos serão preenchidos automaticamente.
                      </span>
                    </div>
                  </div>

                  <div className="p-2.5 bg-stone-50 rounded-xl border border-stone-200 flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                      3
                    </span>
                    <div>
                      <strong className="text-stone-900 block">Gerar o pacote Android (.AAB):</strong>
                      <span className="text-stone-600">
                        Clique em <strong>Package for Store &gt; Android &gt; Generate Package</strong>. O PWABuilder criará o <code>.aab</code> assinado pronto para a Play Store!
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Direct Icon Links */}
              <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200 flex items-center justify-between">
                <div>
                  <span className="font-bold text-stone-800 text-xs block">Ícones Oficiais Prontos:</span>
                  <span className="text-[10px] text-stone-500">Já salvos em 192x192 e 512x512 no app</span>
                </div>
                <div className="flex gap-1.5">
                  <a
                    href="/icon-512.png"
                    download="icon-512.png"
                    className="px-2.5 py-1 bg-white border border-stone-200 rounded-lg text-[11px] font-bold text-stone-700 hover:bg-stone-100 flex items-center gap-1"
                  >
                    <Download className="w-3 h-3" /> Ícone 512px
                  </a>
                </div>
              </div>
            </div>
          )}
          {activeTab === 'strategy' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="p-4 bg-pink-50 border border-pink-200 rounded-2xl">
                <h3 className="font-bold text-pink-900 text-sm mb-1 flex items-center gap-1.5">
                  <Heart className="w-4 h-4 fill-pink-500 text-pink-500" />
                  Como fazer a separação perfeita:
                </h3>
                <p className="text-pink-950/80 leading-relaxed">
                  Você tem em mãos um aplicativo que atende os dois propósitos com perfeição:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 bg-rose-50/70 border border-rose-200 rounded-2xl space-y-1.5">
                  <span className="px-2 py-0.5 rounded-md bg-rose-200 text-rose-800 text-[10px] font-black uppercase">
                    Versão 1: Exclusiva da Vitória
                  </span>
                  <h4 className="font-bold text-rose-950 text-xs">Instalação Direta no Celular Dela</h4>
                  <p className="text-[11px] text-rose-900/80 leading-relaxed">
                    Você não precisa esperar dias de análise do Google para ela usar! Basta abrir o link do app no Chrome do celular dela e tocar em <strong>"Instalar aplicativo"</strong> ou <strong>"Adicionar à tela inicial"</strong>.
                  </p>
                  <p className="text-[11px] text-rose-900/80">
                    O app vira um ícone na tela de início dela, abre em tela cheia sem barra de navegador e mantém os bilhetes de amor do Matheus salvos!
                  </p>
                </div>

                <div className="p-3.5 bg-blue-50/70 border border-blue-200 rounded-2xl space-y-1.5">
                  <span className="px-2 py-0.5 rounded-md bg-blue-200 text-blue-800 text-[10px] font-black uppercase">
                    Versão 2: Pública na Play Store
                  </span>
                  <h4 className="font-bold text-blue-950 text-xs">Para Todos os Universitários</h4>
                  <p className="text-[11px] text-blue-900/80 leading-relaxed">
                    Com o seletor que criamos, qualquer pessoa pode escolher o seu próprio curso (Medicina, Direito, Engenharia, Psicologia, etc.), receber frases de motivação acadêmica e usar as calculadoras.
                  </p>
                  <p className="text-[11px] text-blue-900/80">
                    Você pode publicar com um nome marcante como <strong>"UniFoco • Gestor Universitário de Estudos"</strong> ou <strong>"AcademiApp"</strong>.
                  </p>
                </div>
              </div>

              <div className="p-3.5 bg-stone-100 rounded-2xl border border-stone-200 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <p className="text-[11px] text-stone-700 leading-relaxed">
                  <strong>Dica de ouro:</strong> No menu do topo deste aplicativo, você ou a Vitória podem alternar entre os dois modos a qualquer momento com apenas 1 clique em <em>"Perfil"</em>!
                </p>
              </div>
            </div>
          )}

          {activeTab === 'twa' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="p-3.5 bg-blue-50 border border-blue-200 rounded-2xl">
                <h3 className="font-bold text-blue-900 text-sm mb-1">
                  Método Bubblewrap (Google Trusted Web Activity)
                </h3>
                <p className="text-blue-950/80 text-[11px] leading-relaxed">
                  Esta é a ferramenta oficial do time do Google Chrome. Ela pega o seu web app e gera um pacote <strong>.aab (Android App Bundle)</strong> nativo para a Play Store em poucos minutos, sem você precisar escrever código Java ou Kotlin!
                </p>
              </div>

              <div className="space-y-3">
                <div className="space-y-1">
                  <span className="font-bold text-stone-800 block text-xs">Passo 1: Instalar o CLI do Bubblewrap</span>
                  <div className="relative bg-stone-900 text-stone-100 rounded-xl p-2.5 font-mono text-[11px] flex items-center justify-between">
                    <code>npm i -g @bubblewrap/cli</code>
                    <button
                      onClick={() => handleCopyCode('npm i -g @bubblewrap/cli', 1)}
                      className="p-1 rounded bg-stone-800 hover:bg-stone-700 text-stone-300"
                    >
                      {copiedIndex === 1 ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="font-bold text-stone-800 block text-xs">Passo 2: Iniciar o projeto com o link do seu App</span>
                  <div className="relative bg-stone-900 text-stone-100 rounded-xl p-2.5 font-mono text-[11px] flex items-center justify-between">
                    <code className="truncate pr-8">bubblewrap init --manifest=https://ais-pre-iz6apvh6fw7eez56epwryy-439120396825.us-east5.run.app/manifest.json</code>
                    <button
                      onClick={() => handleCopyCode('bubblewrap init --manifest=https://ais-pre-iz6apvh6fw7eez56epwryy-439120396825.us-east5.run.app/manifest.json', 2)}
                      className="p-1 rounded bg-stone-800 hover:bg-stone-700 text-stone-300 shrink-0"
                    >
                      {copiedIndex === 2 ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                  <p className="text-[10px] text-stone-500">
                    O Bubblewrap vai ler o <code>manifest.json</code> e os ícones de 192px e 512px já configurados no app e configurar o Android SDK automaticamente.
                  </p>
                </div>

                <div className="space-y-1">
                  <span className="font-bold text-stone-800 block text-xs">Passo 3: Compilar o arquivo para a Play Store</span>
                  <div className="relative bg-stone-900 text-stone-100 rounded-xl p-2.5 font-mono text-[11px] flex items-center justify-between">
                    <code>bubblewrap build</code>
                    <button
                      onClick={() => handleCopyCode('bubblewrap build', 3)}
                      className="p-1 rounded bg-stone-800 hover:bg-stone-700 text-stone-300"
                    >
                      {copiedIndex === 3 ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                  <p className="text-[10px] text-stone-500">
                    Isso vai gerar o arquivo <strong>app-release-bundle.aab</strong> assinado com a sua chave digital, pronto para enviar no Google Play Console!
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'capacitor' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl">
                <h3 className="font-bold text-emerald-900 text-sm mb-1">
                  Método Capacitor (Android Studio Nativo)
                </h3>
                <p className="text-emerald-950/80 text-[11px] leading-relaxed">
                  Se você preferir abrir um projeto real no <strong>Android Studio</strong>, testar no emulador do Google e ter total controle sobre permissões de notificações e hardware, use o Capacitor:
                </p>
              </div>

              <div className="space-y-3">
                <div className="space-y-1">
                  <span className="font-bold text-stone-800 block text-xs">Passo 1: Instalar o Capacitor</span>
                  <div className="relative bg-stone-900 text-stone-100 rounded-xl p-2.5 font-mono text-[11px] flex items-center justify-between">
                    <code>npm i @capacitor/core @capacitor/cli @capacitor/android</code>
                    <button
                      onClick={() => handleCopyCode('npm i @capacitor/core @capacitor/cli @capacitor/android', 4)}
                      className="p-1 rounded bg-stone-800 hover:bg-stone-700 text-stone-300"
                    >
                      {copiedIndex === 4 ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="font-bold text-stone-800 block text-xs">Passo 2: Iniciar e adicionar a plataforma Android</span>
                  <div className="relative bg-stone-900 text-stone-100 rounded-xl p-2.5 font-mono text-[11px] flex items-center justify-between">
                    <code>npx cap init "UniEstudos" "com.matheus.uniestudos" --web-dir dist</code>
                    <button
                      onClick={() => handleCopyCode('npx cap init "UniEstudos" "com.matheus.uniestudos" --web-dir dist', 5)}
                      className="p-1 rounded bg-stone-800 hover:bg-stone-700 text-stone-300"
                    >
                      {copiedIndex === 5 ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="font-bold text-stone-800 block text-xs">Passo 3: Criar a pasta do Android e abrir no Android Studio</span>
                  <div className="relative bg-stone-900 text-stone-100 rounded-xl p-2.5 font-mono text-[11px] flex items-center justify-between">
                    <code>npm run build && npx cap add android && npx cap open android</code>
                    <button
                      onClick={() => handleCopyCode('npm run build && npx cap add android && npx cap open android', 6)}
                      className="p-1 rounded bg-stone-800 hover:bg-stone-700 text-stone-300"
                    >
                      {copiedIndex === 6 ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                  <p className="text-[10px] text-stone-500">
                    No Android Studio, basta ir em <em>Build &gt; Generate Signed Bundle / APK</em> para gerar seu pacote da Play Store!
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'playconsole' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-2xl">
                <h3 className="font-bold text-amber-900 text-sm mb-1">
                  Passo a Passo no Google Play Console
                </h3>
                <p className="text-amber-950/80 text-[11px] leading-relaxed">
                  O que você precisa para aprovar o app no Google Play:
                </p>
              </div>

              <div className="space-y-2.5">
                <div className="p-2.5 bg-stone-50 rounded-xl border border-stone-200 flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-stone-900 text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                    1
                  </span>
                  <div>
                    <h4 className="font-bold text-stone-900 text-xs">Conta de Desenvolvedor Google</h4>
                    <p className="text-[11px] text-stone-600">
                      Acesse <strong>play.google.com/console</strong> e pague a taxa única de US$ 25 (vitalícia).
                    </p>
                  </div>
                </div>

                <div className="p-2.5 bg-stone-50 rounded-xl border border-stone-200 flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-stone-900 text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                    2
                  </span>
                  <div>
                    <h4 className="font-bold text-stone-900 text-xs">Imagens do Aplicativo</h4>
                    <p className="text-[11px] text-stone-600">
                      • Ícone de alta resolução: 512 x 512 px (PNG com fundo transparente ou quadrado)<br />
                      • Gráfico de recursos (banner): 1024 x 500 px<br />
                      • Ao menos 2 capturas de tela do celular (você pode tirar prints direto deste simulador!).
                    </p>
                  </div>
                </div>

                <div className="p-2.5 bg-stone-50 rounded-xl border border-stone-200 flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-stone-900 text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                    3
                  </span>
                  <div>
                    <h4 className="font-bold text-stone-900 text-xs">Classificação & Política de Privacidade</h4>
                    <p className="text-[11px] text-stone-600">
                      Como o app é de estudos e não coleta dados sigilosos ou cobra pagamentos, a classificação indicativa é <strong>Livre (Todas as idades)</strong>.
                    </p>
                  </div>
                </div>

                <div className="p-2.5 bg-stone-50 rounded-xl border border-stone-200 flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-stone-900 text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                    4
                  </span>
                  <div>
                    <h4 className="font-bold text-stone-900 text-xs">Subir o arquivo .AAB e Enviar para Análise</h4>
                    <p className="text-[11px] text-stone-600">
                      Em <em>Produção &gt; Criar nova versão</em>, faça o upload do <code>.aab</code> gerado pelo Bubblewrap ou Capacitor. O Google geralmente analisa em 2 a 5 dias úteis e o app fica ao vivo para download no mundo todo!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-stone-100 bg-stone-50 flex items-center justify-between">
          <span className="text-[11px] text-stone-500 font-medium">
            Pronto para exportar e publicar quando quiser
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-stone-900 hover:bg-black text-white rounded-xl text-xs font-bold transition shadow-sm"
          >
            Entendido!
          </button>
        </div>
      </div>
    </div>
  );
};
