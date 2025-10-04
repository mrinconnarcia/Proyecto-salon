import React from "react";
import { X, Trash2 } from "lucide-react";

const CartModal = ({ isOpen, onClose, cartItems, onProceedToPayment, onRemoveItem }) => {
  if (!isOpen) return null;

  const total = cartItems.reduce((acc, item) => acc + item.total, 0);

  const handlePayment = () => {
    if (cartItems.length > 0) {
      onProceedToPayment(cartItems, total);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full flex flex-col max-h-[90vh] relative">
        <div className="p-6 pb-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-bold">Resumen de compras</h2>
          <button 
            onClick={onClose} 
            className="text-gray-600 hover:text-gray-800 transition-colors"
            aria-label="Cerrar"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {cartItems.length === 0 ? (
            <p className="text-gray-500 text-center py-8">Tu carrito está vacío</p>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item, idx) => (
                <div key={idx} className="border rounded-lg p-4 relative hover:shadow-md transition-shadow">
                  <button
                    onClick={() => onRemoveItem(idx)}
                    className="absolute top-2 right-2 text-red-500 hover:text-red-700 hover:bg-red-50 p-1.5 rounded-full transition-colors"
                    aria-label="Eliminar item"
                  >
                    <Trash2 size={18} />
                  </button>

                  <div className="pr-8">
                    <p className="font-semibold text-gray-800 mb-2">
                      <span className="text-gray-600 font-normal">Cliente:</span> {item.cliente}
                    </p>
                    
                    {Object.keys(item.seleccionados).some(key => item.seleccionados[key] > 0) && (
                      <>
                        <p className="font-medium text-gray-700 mb-1">Adicionales:</p>
                        <ul className="ml-4 mb-2 space-y-1">
                          {Object.entries(item.seleccionados).map(([name, qty]) =>
                            qty > 0 && (
                              <li key={name} className="text-sm text-gray-600">
                                <span className="font-medium">{qty}</span> × {name}
                              </li>
                            )
                          )}
                        </ul>
                      </>
                    )}
                    
                    <p className="text-gray-500 text-xs mb-2">
                      📅 {item.fecha} • 🕒 {item.hora}
                    </p>
                    
                    <p className="font-bold text-amber-700">
                      Total: ${item.total}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer fijo con total y botón */}
        <div className="p-6 pt-4 border-t bg-gray-50 rounded-b-2xl">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-bold text-gray-800">Gran Total</span>
            <span className="text-2xl font-bold text-amber-700">${total}</span>
          </div>

          <button 
            onClick={handlePayment}
            disabled={cartItems.length === 0}
            className="w-full bg-amber-700 text-white py-3 rounded-lg hover:bg-amber-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-semibold shadow-lg hover:shadow-xl"
          >
            {cartItems.length === 0 ? 'Carrito vacío' : `Pagar`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartModal;