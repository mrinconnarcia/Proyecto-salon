"use client";

import { useState } from "react";
import { Smartphone } from "lucide-react";

export default function PaymentMethod() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    eventDate: "",
    package: "",
    receipt: null,
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 py-6 px-4">
      <div className="w-full max-w-4xl mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-amber-800 mb-2">
            Transferencia Bancaria
          </h1>
          <p className="text-amber-600">
            Completa el formulario y sube tu comprobante de pago
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-4 md:p-6 bg-amber-50 border-amber-200">
            <div className="flex items-center mb-4">
              <div className="w-6 h-6 rounded-full border-2 border-amber-500 bg-amber-500 mr-3 flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <Smartphone className="w-5 h-5 text-amber-600 mr-2" />
              <span className="font-semibold text-gray-800">
                Transferencia Bancaria
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Información bancaria */}
              <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-amber-500">
                <h4 className="font-semibold text-gray-800 mb-3">
                  Datos para transferencia:
                </h4>
                <div className="space-y-2 text-sm">
                  <p>
                    <span className="font-medium">Banco:</span> BBVA Bancomer
                  </p>
                  <p>
                    <span className="font-medium">Titular:</span> [Nombre del
                    Negocio]
                  </p>
                  <p>
                    <span className="font-medium">Número de cuenta:</span>{" "}
                    0123456789012345
                  </p>
                  <p>
                    <span className="font-medium">CLABE:</span>{" "}
                    012180001234567890
                  </p>
                </div>
              </div>

              {/* Instrucciones */}
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-5 w-5 text-blue-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-blue-800 mb-2">
                      Instrucciones importantes:
                    </h3>
                    <div className="text-xs text-blue-700 space-y-1">
                      <p>• Concepto: "Evento - [Tu nombre]"</p>
                      <p>• Sube foto clara del comprobante</p>
                      <p>• Confirmación en 24-48 horas</p>
                      <p>• Guarda tu comprobante</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre(s) completos *
                  </label>
                  <input
                    type="text"
                    placeholder="Ingresa tu nombre completo"
                    value={formData.firstName}
                    onChange={(e) =>
                      handleInputChange("firstName", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Apellidos *
                  </label>
                  <input
                    type="text"
                    placeholder="Ingresa tus apellidos"
                    value={formData.lastName}
                    onChange={(e) =>
                      handleInputChange("lastName", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Fecha del evento *
                  </label>
                  <input
                    type="date"
                    value={formData.eventDate}
                    onChange={(e) =>
                      handleInputChange("eventDate", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Paquete seleccionado *
                  </label>
                  <select
                    value={formData.package}
                    onChange={(e) =>
                      handleInputChange("package", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
                    required
                  >
                    <option value="">Selecciona tu paquete</option>
                    <option value="basico">Paquete Básico - $X,XXX</option>
                    <option value="premium">Paquete Premium - $X,XXX</option>
                    <option value="deluxe">Paquete Deluxe - $X,XXX</option>
                  </select>
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Comprobante de transferencia *
                </label>
                <div className="w-full px-4 py-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-amber-400 transition-all duration-200">
                  <div className="text-center">
                    <svg
                      className="mx-auto h-8 w-8 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="mt-2">
                      <label htmlFor="file-upload" className="cursor-pointer">
                        <span className="text-amber-600 font-medium hover:text-amber-500">
                          Subir comprobante
                        </span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                          accept="image/*"
                        />
                      </label>
                      <p className="text-gray-500 text-xs mt-1">
                        PNG, JPG, GIF hasta 10MB
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="inline-flex items-center bg-white rounded-full px-4 py-2 shadow-md">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
            <span className="text-sm text-gray-600 font-medium">
              Pago seguro y encriptado
            </span>
          </div>

          <button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold py-3 px-6 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-amber-300">
            Confirmar Pago
          </button>
        </div>
      </div>
    </div>
  );
}
