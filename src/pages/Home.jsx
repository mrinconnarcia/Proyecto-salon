import React, { useState, useEffect } from "react";
import {
  Play,
  MapPin,
  ClipboardPlus,
  Mail,
  Star,
  Menu,
  X,
  MapPinned,
  Sparkles,
  Users,
  Trophy,
  HeartHandshake,
  Clock,
  Phone,
  PartyPopper,
} from "lucide-react";
import ReservationAlert from "../components/ReservationAlert";

const CasaChetumal = () => {
  const [currentVideo, setCurrentVideo] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playingVideo, setPlayingVideo] = useState(null);
  const [showReservationModal, setShowReservationModal] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const videos = [
    {
      id: 1,
      title: "Salón Principal",
      description: "Espacios elegantes diseñados para crear momentos únicos",
      thumbnail:
        "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      videoUrl:
        "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    },
    {
      id: 2,
      title: "Alberca y Jardines",
      description:
        "Ambientes al aire libre perfectos para cualquier celebración",
      thumbnail:
        "https://cdn.pixabay.com/photo/2019/12/28/19/44/house-4725577_1280.jpg",
      videoUrl:
        "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    },
    {
      id: 3,
      title: "Decoración Personalizada",
      description: "Cada detalle pensado para reflejar tu estilo personal",
      thumbnail:
        "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      videoUrl:
        "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    },
  ];

  const handleVideoClick = (index) => {
    setCurrentVideo(index);
    setPlayingVideo(playingVideo === index ? null : index);
  };

  const handleReservationClick = () => {
    setShowReservationModal(true);
    setIsMobileMenuOpen(false);
  };

  const handleCloseModal = () => {
    setShowReservationModal(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavClick = (href) => {
    setIsMobileMenuOpen(false);
    if (href.startsWith("#")) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideo((prev) => (prev + 1) % videos.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Cerrar menú móvil cuando se cambia el tamaño de pantalla
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <header className="bg-orange-200 backdrop-blur-md shadow-lg sticky top-0 z-50 transition-all duration-300">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-900 to-orange-950 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">C</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-900 to-orange-950 bg-clip-text text-transparent">
                  Casa Chetumal
                </h1>
                <p className="text-sm text-gray-900">Eventos Especiales</p>
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#paquetes"
                className="text-gray-950 hover:text-amber-950 transition-colors duration-300 font-medium"
                onClick={() => handleNavClick("#paquetes")}
              >
                Paquetes
              </a>
              <a
                href="#contacto"
                className="text-gray-950 hover:text-amber-950 transition-colors duration-300 font-medium"
                onClick={() => handleNavClick("#contacto")}
              >
                Contacto
              </a>
              <button
                className="bg-gradient-to-r from-amber-900 to-orange-900 text-white px-6 py-2 rounded-full hover:from-amber-950 hover:to-orange-950 transform hover:scale-105 transition-all duration-300 shadow-lg"
                onClick={handleReservationClick}
              >
                Reserva Ahora
              </button>
            </div>

            <div className="md:hidden">
              <button
                onClick={toggleMobileMenu}
                className="text-gray-900 hover:text-amber-950 transition-colors duration-300 p-2"
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          <div
            className={`md:hidden transition-all duration-300 ease-in-out ${
              isMobileMenuOpen
                ? "max-h-64 opacity-100 mt-4"
                : "max-h-0 opacity-0 overflow-hidden"
            }`}
          >
            <div className="py-4 border-t border-amber-300">
              <div className="flex flex-col space-y-4">
                <a
                  href="#paquetes"
                  className="text-gray-950 hover:text-amber-950 transition-colors duration-300 font-medium py-2 px-4 hover:bg-amber-100 rounded-lg"
                  onClick={() => handleNavClick("#paquetes")}
                >
                  Paquetes
                </a>
                <a
                  href="#contacto"
                  className="text-gray-950 hover:text-amber-950 transition-colors duration-300 font-medium py-2 px-4 hover:bg-amber-100 rounded-lg"
                  onClick={() => handleNavClick("#contacto")}
                >
                  Contacto
                </a>
                <button
                  className="bg-gradient-to-r from-amber-900 to-orange-900 text-white px-6 py-3 rounded-full hover:from-amber-950 hover:to-orange-950 transition-all duration-300 shadow-lg mx-4 font-medium"
                  onClick={handleReservationClick}
                >
                  <ClipboardPlus className="inline-block mr-2" size={16} />
                  Reserva Ahora
                </button>
              </div>
            </div>
          </div>
        </nav>
      </header>

      <section className="relative py-20 px-6">
        <div className="container mx-auto text-center">
          <div className="mb-8 animate-fade-in">
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold text-gray-800 mb-6 leading-tight">
              Bienvenido a{" "}
              <span className="bg-gradient-to-r from-amber-900 to-orange-950 bg-clip-text text-transparent">
                Casa Chetumal
              </span>
            </h2>
            <p className="text-lg md:text-xl lg:text-2xl text-gray-900 mb-8 max-w-3xl mx-auto leading-relaxed">
              El espacio perfecto para tus eventos especiales, donde cada
              momento se convierte en un recuerdo inolvidable
            </p>
            <button className="bg-gradient-to-r from-amber-900 to-orange-900 text-white px-6 md:px-8 py-3 md:py-4 rounded-full text-base md:text-lg font-semibold hover:from-amber-950 hover:to-orange-950 transform hover:scale-105 transition-all duration-300 shadow-xl">
              <MapPin className="inline-block mr-2" size={20} />
              Ver Ubicación
            </button>
          </div>

          {/* elementos que flotan 👀 */}
          <div className="absolute top-20 left-10 w-20 h-20 bg-amber-200 rounded-full opacity-20 animate-bounce"></div>
          <div className="absolute top-32 right-16 w-16 h-16 bg-orange-200 rounded-full opacity-30 animate-pulse"></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-yellow-200 rounded-full opacity-25 animate-bounce delay-1000"></div>
        </div>
      </section>

      <section className="py-20 px-6 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
              Descubre Nuestros Espacios
            </h3>
            <div className="flex justify-center items-center space-x-2 mb-4">
              <div className="w-8 h-1 bg-gradient-to-r from-transparent to-amber-400 rounded-full"></div>
              <div className="w-16 h-1 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full"></div>
              <div className="w-8 h-1 bg-gradient-to-r from-orange-500 to-transparent rounded-full"></div>
            </div>{" "}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {videos.map((video, index) => (
              <div
                key={video.id}
                className={`relative group cursor-pointer transform transition-all duration-500 hover:scale-105 ${
                  currentVideo === index
                    ? "scale-105 shadow-2xl"
                    : "hover:shadow-xl"
                }`}
                onClick={() => handleVideoClick(index)}
              >
                <div className="relative overflow-hidden rounded-t-3xl bg-gradient-to-br from-amber-100 to-orange-100 aspect-square">
                  {playingVideo === index ? (
                    <video
                      className="w-full h-full object-cover"
                      autoPlay
                      controls
                      loop
                      muted
                      onError={() => setPlayingVideo(null)}
                    >
                      <source src={video.videoUrl} type="video/mp4" />
                      Tu navegador no soporta videos HTML5.
                    </video>
                  ) : (
                    <>
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover transition-transform duration-950 group-hover:scale-110"
                      />

                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-all duration-300"></div>

                      {/* Play del boton */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-all duration-300 shadow-lg">
                          <Play className="text-amber-900 ml-1" size={24} />
                        </div>
                      </div>

                      {/* Activar indicador */}
                      {currentVideo === index && (
                        <div className="absolute top-4 right-4">
                          <div className="w-4 h-4 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full animate-pulse shadow-lg"></div>
                        </div>
                      )}
                    </>
                  )}
                </div>

                <div className="mt-6 text-center">
                  <h4 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
                    {video.title}
                  </h4>
                  <p className="text-gray-900 leading-relaxed text-sm md:text-base">
                    {video.description}
                  </p>

                  <div className="flex justify-center mt-3 mb-7 space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 text-amber-400 fill-current"
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* indicador del progreso del Video */}
          <div className="flex justify-center mt-12 space-x-3">
            {videos.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentVideo === index
                    ? "bg-gradient-to-r from-amber-500 to-orange-500 w-8"
                    : "bg-gray-300 hover:bg-amber-300"
                }`}
                onClick={() => setCurrentVideo(index)}
              ></button>
            ))}
          </div>
        </div>
      </section>

      <section id="paquetes" className="py-20 px-6 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 relative overflow-hidden">
        {/* Elementos decorativos de fondo */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-amber-200/30 to-orange-200/30 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-16 w-40 h-40 bg-gradient-to-tl from-yellow-200/20 to-orange-300/20 rounded-full blur-2xl animate-bounce"></div>
        <div className="absolute top-1/2 left-1/3 w-20 h-20 bg-amber-300/20 rounded-full blur-lg animate-ping"></div>
        
        <div className="container mx-auto text-center relative z-10">
          {/* Título con decoración mejorada */}
          <div className="mb-20">
            <div className="inline-block relative">
              <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 relative">
                ¿Por qué elegir{" "}
                <span className="bg-gradient-to-r from-amber-600 to-orange-700 bg-clip-text text-transparent">
                  Casa Chetumal?
                </span>
              </h3>
              {/* Línea decorativa animada */}
              <div className="flex justify-center items-center space-x-2 mb-4">
                <div className="w-8 h-1 bg-gradient-to-r from-transparent to-amber-400 rounded-full"></div>
                <div className="w-16 h-1 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full"></div>
                <div className="w-8 h-1 bg-gradient-to-r from-orange-500 to-transparent rounded-full"></div>
              </div>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Descubre las ventajas exclusivas que hacen de nuestro espacio la elección perfecta
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: "Ubicación Premium",
                description:
                  "En el corazón de la ciudad con fácil acceso y estacionamiento amplio para todos tus invitados",
                icon: MapPinned,
                gradient: "from-amber-400 to-orange-500",
                shadowColor: "shadow-amber-200",
                delay: "delay-0"
              },
              {
                title: "Servicios Completos",
                description:
                  "Todo lo que necesitas en un solo lugar para tu evento perfecto, sin complicaciones adicionales",
                icon: Sparkles,
                gradient: "from-orange-400 to-yellow-500", 
                shadowColor: "shadow-orange-200",
                delay: "delay-150"
              },
              {
                title: "Atención Personalizada",
                description:
                  "Un equipo dedicado y profesional que se encarga de cada detalle para hacer tu día especial",
                icon: HeartHandshake,
                gradient: "from-orange-500 to-amber-400",
                shadowColor: "shadow-yellow-200", 
                delay: "delay-300"
              },
            ].map((feature, index) => (
              <div
                key={index}
                className={`group relative bg-white/80 backdrop-blur-lg rounded-3xl p-8 md:p-10 transform hover:scale-105 transition-all duration-500 ${feature.shadowColor} shadow-xl hover:shadow-2xl border border-white/50 ${feature.delay} animate-fade-in-up`}
              >
                {/* Gradiente decorativo superior */}
                <div className={`absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-gradient-to-br ${feature.gradient} rounded-full opacity-20 group-hover:opacity-30 transition-opacity duration-300 blur-sm`}></div>
                
                {/* Borde brillante animado */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-sm -z-10`}></div>
                
                {/* Contenedor del icono con efecto glassmorphism */}
                <div className={`relative mb-6 inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br ${feature.gradient} rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:rotate-6`}>
                  <div className="absolute inset-0 bg-white/20 rounded-2xl backdrop-blur-sm"></div>
                  <feature.icon 
                    size={32} 
                    className="text-white relative z-10 group-hover:scale-110 transition-transform duration-300 drop-shadow-lg" 
                  />
                </div>

                {/* Título con gradiente */}
                <h4 className={`text-xl md:text-2xl font-bold mb-4 bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300`}>
                  {feature.title}
                </h4>
                
                {/* Descripción mejorada */}
                <p className="text-gray-700 text-sm md:text-base leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                  {feature.description}
                </p>

                {/* Puntos decorativos */}
                <div className="flex justify-center space-x-2 mt-6">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 bg-gradient-to-r ${feature.gradient} rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-300`}
                      style={{ animationDelay: `${i * 0.1}s` }}
                    ></div>
                  ))}
                </div>

                {/* Efecto de brillo en hover */}
                <div className="absolute top-4 right-4 w-6 h-6 bg-white/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-ping"></div>
              </div>
            ))}
          </div>

          {/* Sección adicional con estadísticas */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { number: "500+", label: "Eventos Realizados", icon: PartyPopper },
              { number: "98%", label: "Clientes Satisfechos", icon: Trophy },
              { number: "15", label: "Años de Experiencia", icon: Star },
              { number: "24/7", label: "Soporte Disponible", icon: Phone },
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 text-center transform hover:scale-105 transition-all duration-300 border border-white/30 shadow-lg hover:shadow-xl group"
              >
                <div className="mb-3 inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl">
                  <stat.icon size={20} className="text-white group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-700 bg-clip-text text-transparent mb-1">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CSS adicional para las animaciones */}
        <style jsx>{`
          @keyframes fade-in-up {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          .animate-fade-in-up {
            animation: fade-in-up 0.8s ease-out forwards;
          }
        `}</style>
      </section>

      <section id="contacto" className="py-20 px-6 bg-gray-900 text-white">
        <div className="container mx-auto text-center">
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            ¿Listo para crear momentos inolvidables?
          </h3>
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Reserva hoy y permítenos hacer de tu evento algo extraordinario
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 md:px-8 py-3 md:py-4 rounded-full text-base md:text-lg font-semibold hover:from-amber-900 hover:to-orange-900 transform hover:scale-105 transition-all duration-300 shadow-xl w-full sm:w-auto"
              onClick={handleReservationClick}
            >
              <ClipboardPlus className="inline-block mr-2" size={20} />
              Reservar ahora
            </button>
            <button className="border-2 border-amber-500 text-amber-500 px-6 md:px-8 py-3 md:py-4 rounded-full text-base md:text-lg font-semibold hover:bg-amber-900 hover:border-amber-900 hover:text-white transition-all duration-300 w-full sm:w-auto">
              <Mail className="inline-block mr-2" size={20} />
              Enviar Mensaje
            </button>
          </div>
        </div>
      </section>

      <div className="border-t border-dashed border-orange-300"></div>

      <footer className="bg-gray-900 text-white py-12 px-6">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-900 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">C</span>
            </div>
            <span className="text-2xl font-bold">Casa Chetumal</span>
          </div>

          <p className="text-gray-400 mb-6">
            Todos los derechos reservados © 2025 Casa Chetumal
          </p>

          <div className="flex justify-center space-x-6 text-sm">
            <a href="#" className="hover:text-amber-400 transition-colors">
              Términos
            </a>
            <a href="#" className="hover:text-amber-400 transition-colors">
              Privacidad
            </a>
            <a href="#" className="hover:text-amber-400 transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </footer>

      <ReservationAlert
        isOpen={showReservationModal}
        onClose={handleCloseModal}
      />

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
      `}</style>
    </div>
  );
};

export default CasaChetumal;
