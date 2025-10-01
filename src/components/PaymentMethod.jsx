import { useState } from "react";
import { Smartphone, Banknote } from "lucide-react";

const PaymentMethod = ({ cartData, onBack }) => {
  const [selectedMethod, setSelectedMethod] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    receipt: null,
  });

  const parseDate = (dateStr) => {
    if (!dateStr) return null;
    // Soporta formato dd/mm/yyyy
    const parts = dateStr.split("/");
    if (parts.length === 3) {
      const [day, month, year] = parts;
      return new Date(`${year}-${month}-${day}`);
    }
    return new Date(dateStr); // fallback ISO o válido
  };

  const isWithinWeek = () => {
    if (!cartData?.items?.[0]?.fecha) return false;

    const eventDate = parseDate(cartData.items[0].fecha);
    const today = new Date();
    const diffTime = eventDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    console.log(
      "Hoy:",
      today,
      "Evento:",
      eventDate,
      "Días restantes:",
      diffDays
    );

    return diffDays >= 5;
  };

  const showCashOption = isWithinWeek(); // true si faltan 5 días

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        receipt: file,
      }));
    }
  };

  const handleSubmit = () => {
    if (!selectedMethod) {
      alert("Por favor selecciona un método de pago");
      return;
    }

    if (!formData.firstName || !formData.lastName) {
      alert("Por favor completa todos los campos requeridos");
      return;
    }

    if (selectedMethod === "transfer" && !formData.receipt) {
      alert("Por favor sube el comprobante de transferencia");
      return;
    }

    alert(
      `Pago confirmado por ${
        selectedMethod === "transfer" ? "Transferencia" : "Efectivo"
      }\nTotal: $${cartData.total}`
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 py-6 px-4">
      <div className="w-full max-w-4xl mx-auto">
        <button
          onClick={onBack}
          className="mb-4 text-amber-700 hover:text-amber-800 font-medium flex items-center gap-2"
        >
          ← Volver al carrito
        </button>

        <div className="text-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-amber-800 mb-2">
            Método de Pago
          </h1>
          <p className="text-amber-600">
            Selecciona tu forma de pago preferida
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Resumen de tu compra
          </h2>
          {cartData?.items?.map((item, idx) => (
            <div key={idx} className="border-b pb-3 mb-3">
              <p className="font-semibold">{item.cliente}</p>
              <p className="text-sm text-gray-600">Paquete: {item.paquete}</p>
              <p className="text-sm text-gray-600">
                Fecha: {item.fecha} - {item.hora}
              </p>
              <p className="text-sm text-gray-600">
                Extras: {item.extras.join(", ")}
              </p>
            </div>
          ))}
          <div className="flex justify-between items-center pt-3 border-t-2">
            <span className="text-xl font-bold">Total a pagar:</span>
            <span className="text-2xl font-bold text-amber-700">
              ${cartData?.total}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Transferencia bancaria */}
          <div
            onClick={() => setSelectedMethod("transfer")}
            className={`bg-white rounded-2xl shadow-xl p-6 cursor-pointer border-2 transition-all ${
              selectedMethod === "transfer"
                ? "border-amber-500 ring-4 ring-amber-200"
                : "border-transparent hover:border-amber-300"
            }`}
          >
            <div className="flex items-center mb-4">
              <Smartphone className="w-8 h-8 text-amber-600 mr-3" />
              <h3 className="text-lg font-bold text-gray-800">
                Transferencia Bancaria
              </h3>
            </div>
            <p className="text-sm text-gray-600">
              Pago inmediato con confirmación en 24-48 horas
            </p>
          </div>

          {showCashOption && (
            <div
              onClick={() => setSelectedMethod("cash")}
              className={`bg-white rounded-2xl shadow-xl p-6 cursor-pointer border-2 transition-all ${
                selectedMethod === "cash"
                  ? "border-amber-500 ring-4 ring-amber-200"
                  : "border-transparent hover:border-amber-300"
              }`}
            >
              <div className="flex items-center mb-4">
                <Banknote className="w-8 h-8 text-green-600 mr-3" />
                <h3 className="text-lg font-bold text-gray-800">
                  Pago en Efectivo
                </h3>
              </div>
              <p className="text-sm text-gray-600">Paga el día del evento</p>
            </div>
          )}
        </div>

        {selectedMethod === "transfer" && (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="p-4 md:p-6 bg-amber-50">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Información para transferencia
              </h3>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
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
                        <p>
                          • Concepto: "Evento - {cartData?.items?.[0]?.cliente}"
                        </p>
                        <p>• Sube foto clara del comprobante</p>
                        <p>• Confirmación en 24-48 horas</p>
                        <p>• Guarda tu comprobante</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Comprobante de transferencia *
                </label>
                <div className="w-full px-4 py-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-amber-400 transition-all">
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
                          {formData.receipt
                            ? formData.receipt.name
                            : "Subir comprobante"}
                        </span>
                        <input
                          id="file-upload"
                          type="file"
                          className="sr-only"
                          accept="image/*"
                          onChange={handleFileChange}
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
        )}

        {selectedMethod === "cash" && (
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Pago en Efectivo
            </h3>

            <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500 mb-6">
              <h4 className="font-semibold text-green-800 mb-2">
                Instrucciones:
              </h4>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• Realiza el pago en efectivo el día del evento</li>
                <li>• Lleva el monto exacto: ${cartData?.total}</li>
                <li>• Presenta esta confirmación al llegar</li>
              </ul>
            </div>

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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  required
                />
              </div>
            </div>
          </div>
        )}

        {selectedMethod && (
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="inline-flex items-center bg-white rounded-full px-4 py-2 shadow-md">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <span className="text-sm text-gray-600 font-medium">
                Pago seguro y encriptado
              </span>
            </div>

            <button
              onClick={handleSubmit}
              className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold py-3 px-6 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-amber-300"
            >
              Confirmar Pago
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentMethod;
