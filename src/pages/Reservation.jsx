import React, { useState } from "react";
import {
  Box,
  Button,
  Stepper,
  Step,
  StepLabel,
  TextField,
  Typography,
  Card,
  CardContent,
  CardActions,
  Grid,
  FormControlLabel,
  IconButton,
} from "@mui/material";
import { X, Plus, Minus } from "lucide-react";
import "../assets/styles/reservationModal.css";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDateTimePicker } from "@mui/x-date-pickers/StaticDateTimePicker";
import dayjs from "dayjs";
import "dayjs/locale/es"; // importar español
dayjs.locale("es");

// 🚀 Ahora son solo 3 pasos
const steps = ["Datos de reservación", "Paquetes", "Personalización", "Resumen"];

// Ejemplo de fechas ocupadas (simulación backend)
const occupiedDates = [dayjs("2025-09-25"), dayjs("2025-09-28"), dayjs("2025-10-02")];

// 🔹 Productos disponibles
const paquetes = [
  { name: "Paquete Fiesta", details: "Nachos, DJ Smooky, 50 refrescos", price: 4500, img: "./src/assets/img/Logo_letra.png" },
  { name: "Paquete Premium", details: "Palomitas, Brochetas, Norteño Tigres", price: 7000, img: "./src/assets/img/Logo_letra.png" },
  { name: "Paquete VIP", details: "Todas las botanas + DJ Fire + Rancheros", price: 10000, img: "./src/assets/img/Logo_letra.png" },
];

const botanas = [
  { name: "Tinga de pollo (para 10 personas)", price: 150, img: "./src/assets/img/Logo_letra.png" },
  { name: "Ensalada Rusa (para 10 personas)", price: 120, img: "./src/assets/img/Logo_letra.png" },
  { name: "Salchicha Enchipotlada (para 10 personas)", price: 180, img: "./src/assets/img/Logo_letra.png" },
];

const bebidas = [
  { name: "Refrescos 3 ltrs", price: 60, img: "./src/assets/img/Logo_letra.png" },
  { name: "Cerveza (24)", price: 800, img: "./src/assets/img/Logo_letra.png" },
  { name: "Cócteles", price: 1200, img: "./src/assets/img/Logo_letra.png" },
];

const musica = [
  { name: "DJ Smooky", price: 2000, img: "./src/assets/img/Logo_letra.png" },
  { name: "DJ BizzaRap", price: 2500, img: "./src/assets/img/Logo_letra.png" },
  { name: "Los Tigres del Valle", price: 4000, img: "./src/assets/img/Logo_letra.png" },
  { name: "Los Vagantes", price: 3500, img: "./src/assets/img/Logo_letra.png" },
];

const ReservationModal = ({ isOpen, onClose, onAddToCart }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    nombre: "",
    apellidos: "",
    telefono: "",
    ine: null,
    fecha: null,
    horaInicio: null,
    horaFin: null,
    seleccionados: {}, 
  });

  if (!isOpen) return null;

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);
  const handleFileChange = (e) =>
    setFormData({ ...formData, ine: e.target.files[0] });

  const handleDateChange = (date) => {
    if (!date) return;
    const start = date.toDate();
    const end = new Date(start.getTime() + 7 * 60 * 60 * 1000); // +7 horas
    setFormData({ ...formData, fecha: date, horaInicio: start, horaFin: end });
  };

  const isDateDisabled = (date) =>
    occupiedDates.some((d) => d.isSame(date, "day"));

  // SELECCION DE ELEMENTOS 
    const handleQuantityChange = (item, delta) => {
    setFormData((prev) => {
      const currentQty = prev.seleccionados[item.name] || 0;
      const newQty = Math.max(currentQty + delta, 0);
      return {
        ...prev,
        seleccionados: {
          ...prev.seleccionados,
          [item.name]: newQty,
        },
      };
    });
  };

  const calcularTotal = () => {
    let total = 0;
    const allItems = [...paquetes, ...botanas, ...bebidas, ...musica];
    for (const [name, qty] of Object.entries(formData.seleccionados)) {
      if (qty > 0) {
        const item = allItems.find((i) => i.name === name);
        if (item) total += item.price * qty;
      }
    }
    return total;
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 rounded-3xl shadow-2xl w-full max-w-4xl mx-auto relative animate-scale-in overflow-y-auto min-h-2/3 max-h-[90vh]">
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <X size={28} />
        </button>

        {/* Contenido */}
        <Box className="p-6">
          <Typography
            variant="h4"
            className="text-center mb-4 font-bold text-gray-800"
          >
            Reservación del Salón
          </Typography>

          {/* Stepper */}
          <Stepper activeStep={activeStep} alternativeLabel className="mt-5">
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {(activeStep != 3 ) && (
            <div className="mt-2 bg-blue-50 p-3 rounded-lg border border-blue-200 flex justify-center">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"  clipRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" />
                  </svg>
                 </div>
                <div className="ml-3">
                  <h3 className="text-md font-medium text-blue-800">
                    {activeStep === 0 &&( "Ingrese todos los campos y selecciona tu fecha y hora (horario admitido: 9:00 AM a 11:00 PM)." )}
                    {activeStep === 1 &&("Puedes elegir un paquete o pasar al siguiente paso para personalizar tu experiencia.")}
                    {activeStep === 2 &&("¡Armate con lo que necesites para tu evento!")}
                  </h3>
                  {activeStep === 0 &&(<p className="text-xs text-blue-700 text-center mt-1">De la manera mas amable se le solicita <b>asistir con 30 minutos de anticipación</b>, para la entrega del salón.</p>)}
                </div>
              </div>
            </div>
          )}
          {activeStep === 3 && ("")}

          <Box className="mt-4">
            {/* Paso 1 - Datos + Fecha */}
            {activeStep === 0 && (
              <Card className="shadow-lg rounded-2xl py-3 px-2">
                <CardContent className="flex" >
                  <Grid container >
                    <Grid item xs={6}>
                      <TextField
                        variant="standard" label="Nombre" required fullWidth value={formData.nombre}
                        onChange={(e) =>
                          setFormData({ ...formData, nombre: e.target.value })
                        }
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        variant="standard" label="Apellidos" required fullWidth value={formData.apellidos}
                        onChange={(e) =>
                          setFormData({ ...formData, apellidos: e.target.value })
                        }
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        variant="standard" label="Teléfono" required fullWidth value={formData.telefono}
                        onChange={(e) =>
                          setFormData({ ...formData, telefono: e.target.value })
                        }
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <label htmlFor="file-input">
                        <Button variant="contained" component="span" style={{backgroundColor:'#A96E4A' }}>
                          Subir Idenficacion (INE, IFE, ...)
                        </Button>
                        <input
                          id="file-input"
                          type="file"
                          accept="image/*,application/pdf"
                          required 
                          onChange={handleFileChange}
                        />
                      </label>
                    </Grid>
                  </Grid>

                  {/* Selector de fecha y hora inline */}
                  <Box className="">
                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
                      <StaticDateTimePicker
                          orientation="landscape"
                          value={formData.fecha}
                          onChange={handleDateChange}
                          shouldDisableDate={isDateDisabled}
                          minTime={dayjs().hour(9).minute(0)}
                          maxTime={dayjs().hour(23).minute(0)}
                          slotProps={{
                            actionBar: {
                              actions: [""], // botones visibles
                            },
                            toolbar: {
                              toolbarTitle: (
                                <Box display="flex" alignItems="center" gap={1} margin={'3rem 0'}>
                                  <span
                                    style={{
                                      display: "inline-block",
                                      width: 20,
                                      height: 20,
                                      borderRadius: "50%",
                                      backgroundColor: "#A96E4A",
                                      opacity: 0.7,
                                    }}
                                  ></span>
                                  <Typography variant="body2" color="text.secondary">
                                    Sin disponibilidad
                                  </Typography>
                                </Box>
                              ),
                            },
                            day: (ownerState) => {
                              const isOccupied = occupiedDates.some((d) =>
                                d.isSame(ownerState.day, "day")
                              );
                              return {
                                sx: {
                                  borderRadius: "50%",
                                  ...(isOccupied && {
                                    backgroundColor: "#A96E4A !important", // rojo suave
                                    color: "white !important",
                                    opacity: 0.7,
                                  }),
                                },
                              };
                            },
                          }}
                        />
                    </LocalizationProvider>

                    {formData.horaInicio && (
                      <p className="mt-2 text-gray-600 text-lg">
                        Inicio: {formData.horaInicio.toLocaleTimeString()} | Fin:{" "}
                        {formData.horaFin.toLocaleTimeString()}
                      </p>
                    )}
                  </Box>
                </CardContent>
                <CardActions className="justify-end">
                  <Button variant="contained" onClick={handleNext} style={{ backgroundColor: "#A96E4A" }}>
                    Siguiente
                  </Button>
                </CardActions>
              </Card>
            )}

            {/* Paso 2 - Selección de Paquete  */}
            {activeStep === 1 && (
              <Card className="shadow-lg rounded-2xl">
                <CardContent>
                  <Typography className="text-center font-bold text-xl text-amber-900">
                    Paquetes Predeterminados
                  </Typography>
                  <Grid container spacing={3} className="mt-3">
                    {paquetes.map((item) => (
                      <Grid item size={{ xs: 12, sm: 4 }} key={item.name}>
                        <Card className="p-3 shadow-sm border border-gray-200 rounded-xl">
                          <img src={item.img} alt={item.name} className="w-full min-h-28 object-cover rounded-lg mb-2" />
                          <Typography className="font-bold text-gray-800">{item.name}</Typography>
                          <Typography variant="body2" color="text.secondary">{item.details}</Typography>
                          <Typography className="text-green-700 font-semibold mt-1">${item.price} MXN</Typography>
                          <Box className="flex items-center justify-between mt-2">
                            <IconButton onClick={() => handleQuantityChange(item, -1)}><Minus size={18}/></IconButton>
                            <span>{formData.seleccionados[item.name] || 0}</span>
                            <IconButton onClick={() => handleQuantityChange(item, 1)}><Plus size={18}/></IconButton>
                          </Box>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </CardContent>
                <CardActions className="justify-between">
                  <Button onClick={handleBack}>Atrás</Button>
                  <Button variant="contained" onClick={handleNext} style={{ backgroundColor: "#A96E4A" }}>
                    Siguiente
                  </Button>
                </CardActions>
              </Card>
            )}


            {/* Paso 3 - Personalizar */}
            {activeStep === 2 && (
              <Card className="rounded-2xl shadow-lg">
                <CardContent>
                  <h3 className="text-center font-bold text-xl text-amber-800 mb-3">
                    Personaliza tu experiencia
                  </h3>
                  <Grid container spacing={3} >
                    {[{ title: "Botanas", data: botanas }, { title: "Bebidas", data: bebidas }, { title: "Música", data: musica }].map((col) => (
                      <Grid item size={{ xs: 12, sm: 4 }} key={col.title}>
                        <Typography className="mb-2 font-semibold text-amber-900">{col.title}</Typography>
                        {col.data.map((item) => (
                          <Card key={item.name} className="min-h-25 py-2 px-1 mb-2 border border-amber-300 rounded-lg flex justify-between items-center">
                            <Box style={{width:"40%", marginRight: "0.5rem", }}>
                              <img src={item.img} alt={item.name} className="rounded-lg" style={{background:"#b4a77ebc"}} />
                            </Box>
                            <Box style={{width:"60%", }}>
                              <Typography className="font-medium">{item.name}</Typography>
                              <Typography variant="body2" color="text.secondary">${item.price} MXN</Typography>
                              <Box className="flex items-center justify-between">
                                <IconButton onClick={() => handleQuantityChange(item, -1)}><Minus size={16}/></IconButton>
                                <span>{formData.seleccionados[item.name] || 0}</span>
                                <IconButton onClick={() => handleQuantityChange(item, 1)}><Plus size={16}/></IconButton>
                              </Box>
                            </Box>
                          </Card>
                        ))}
                      </Grid>
                    ))}
                  </Grid>
                </CardContent>
                <CardActions className="justify-between">
                  <Button onClick={handleBack}>Atrás</Button>
                  <Button variant="contained" onClick={handleNext} style={{ backgroundColor: "#A96E4A" }}>
                    Siguiente
                  </Button>
                </CardActions>
              </Card>
            )}


            {/* Paso 4 - Resumen */}
            {activeStep === 3 && (
              <Card className="shadow-lg rounded-2xl">
                <CardContent>
                  <Typography variant="h6" className="mb-4 text-amber-900">Resumen de tu reservación</Typography>
                  <ul className="list-disc ml-6 mb-1 text-gray-700">
                    <li><b>Cliente:</b> {formData.nombre} {formData.apellidos}</li>
                    <li><b>Teléfono:</b> {formData.telefono}</li>
                    <li><b>Fecha:</b> {formData.fecha?.toDate().toLocaleDateString()} {formData.horaInicio?.toLocaleTimeString()} - {formData.horaFin?.toLocaleTimeString()}</li>
                  </ul>
                  {/* Tabla de Adicionales */}
                  <Typography className="mt-4 mb-2 text-gray-700 font-semibold">
                    Adicionales seleccionados:
                  </Typography>
                  <Box className="overflow-x-auto mb-2">
                    <table className="min-w-full border border-amber-200 rounded-lg shadow-sm">
                      <thead className="bg-amber-100 text-amber-900">
                        <tr>
                          <th className="px-4 text-left font-medium">Selección</th>
                          <th className="px-4 text-center font-medium">Cantidad</th>
                          <th className="px-4 text-center font-medium">Precio</th>
                          <th className="px-4 text-right font-medium">Subtotal</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.entries(formData.seleccionados).map(([name, qty]) => {
                          const allItems = [...paquetes, ...botanas, ...bebidas, ...musica];
                          if (qty > 0) {
                            const item = allItems.find((i) => i.name === name);
                            return (
                              <tr key={name} className="border-t border-amber-100 hover:bg-amber-50">
                                <td className="px-4 py-1">{name}</td>
                                <td className="px-4 py-1 text-center">{qty}</td>
                                <td className="px-4 py-1 text-center">${item?.price}</td>
                                <td className="px-4 py-1 text-right">
                                  ${qty * (item?.price || 0)} MXN
                                </td>
                              </tr>
                            );
                          }
                          return null;
                        })}
                      </tbody>
                    </table>
                  </Box>
                  <Typography className="text-lg font-bold text-green-700 text-right">Total: ${calcularTotal()} MXN</Typography>
                </CardContent>

                <CardActions className="justify-between">
                  <Button onClick={handleBack}>Atrás</Button>
                  <Button variant="contained" color="success" onClick={() => {
                    const reserva = {
                        cliente: `${formData.nombre} ${formData.apellidos}`,
                        telefono: formData.telefono,
                        fecha: formData.fecha?.toDate().toLocaleDateString(),
                        hora: `${formData.horaInicio?.toLocaleTimeString()} - ${formData.horaFin?.toLocaleTimeString()}`,
                        seleccionados: formData.seleccionados,
                        total: calcularTotal(),
                      };
                    onAddToCart(reserva);
                    onClose();
                  }}>
                    Confirmar y Enviar al Carrito
                  </Button>
                </CardActions>
              </Card>
            )}
          </Box>
        </Box>
      </div>

      {/* Animación */}
      <style jsx>{`
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        .animate-scale-in {
          animation: scale-in 0.4s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ReservationModal;
