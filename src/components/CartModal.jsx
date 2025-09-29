import React from "react";

const CartModal = ({ isOpen, onClose, cartItems, onProceedToPayment }) => {
  if (!isOpen) return null;

  const total = cartItems.reduce((acc, item) => acc + item.total, 0);

  const handlePayment = () => {
    if (cartItems.length > 0) {
      onProceedToPayment(cartItems, total);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-600">
          ✖
        </button>
        <h2 className="text-lg font-bold mb-4">Resumen de compras</h2>

        {cartItems.length === 0 ? (
          <p className="text-gray-500">Tu carrito está vacío</p>
        ) : (
          <div className="space-y-4">
            {cartItems.map((item, idx) => (
              <div key={idx} className="border-b pb-2">
                <p><b>Cliente:</b> {item.cliente}</p>
                <p><b>Paquete:</b> {item.paquete}</p>
                <p><b>Extras:</b> {item.extras.join(", ")}</p>
                <p className="text-gray-600 text-sm">{item.fecha} - {item.hora}</p>
                <p className="font-semibold">Total: ${item.total}</p>
              </div>
            ))}

            <div className="flex justify-between border-t pt-2">
              <span className="font-bold">Gran Total</span>
              <span className="font-bold">${total}</span>
            </div>
          </div>
        )}

        <button 
          onClick={handlePayment}
          disabled={cartItems.length === 0}
          className="mt-6 w-full bg-amber-700 text-white py-2 rounded-lg hover:bg-amber-800 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Pagar
        </button>
      </div>
    </div>
  );
};

export default CartModal;