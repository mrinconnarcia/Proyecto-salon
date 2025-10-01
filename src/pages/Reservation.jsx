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
  Checkbox,
} from "@mui/material";
import { X } from "lucide-react";
import "../assets/styles/reservationModal.css";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { StaticDateTimePicker } from "@mui/x-date-pickers/StaticDateTimePicker";
import dayjs from "dayjs";
import "dayjs/locale/es"; // 📌 importar español
dayjs.locale("es");

// 🚀 Ahora son solo 3 pasos
const steps = ["Datos del Cliente y Fecha", "Paquete", "Resumen"];

// Ejemplo de fechas ocupadas (simulación backend)
const occupiedDates = [
  dayjs("2025-09-25"),
  dayjs("2025-09-28"),
  dayjs("2025-10-02"),
];

const ReservationModal = ({ isOpen, onClose }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    nombre: "",
    apellidos: "",
    telefono: "",
    ine: null,
    fecha: null,
    horaInicio: null,
    horaFin: null,
    paquete: null,
    extras: [],
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

  const handlePaqueteSelect = (paquete) =>
    setFormData({ ...formData, paquete });

  const handleExtraSelect = (extra) => {
    const newExtras = formData.extras.includes(extra)
      ? formData.extras.filter((e) => e !== extra)
      : [...formData.extras, extra];
    setFormData({ ...formData, extras: newExtras });
  };

  const isDateDisabled = (date) =>
    occupiedDates.some((d) => d.isSame(date, "day"));

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 rounded-3xl shadow-2xl w-full max-w-5xl mx-auto relative animate-scale-in overflow-y-auto min-h-2/3 max-h-[90vh]">
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
            className="text-center mb-6 font-bold text-gray-800"
          >
            Reservación del Salón
          </Typography>

          {/* Stepper */}
          <Stepper activeStep={activeStep} alternativeLabel className="mt-8">
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <Box className="mt-6">
            {/* Paso 1 - Datos + Fecha */}
            {activeStep === 0 && (
              <Card className="shadow-lg rounded-2xl py-3 px-2">
                <CardContent className="flex" >
                  <Grid container >
                    <Grid item xs={6}>
                      <TextField
                        variant="standard"
                        label="Nombre"
                        required
                        fullWidth
                        value={formData.nombre}
                        onChange={(e) =>
                          setFormData({ ...formData, nombre: e.target.value })
                        }
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        variant="standard"
                        label="Apellidos"
                        required
                        fullWidth
                        value={formData.apellidos}
                        onChange={(e) =>
                          setFormData({ ...formData, apellidos: e.target.value })
                        }
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        variant="standard"
                        label="Teléfono"
                        required
                        fullWidth
                        value={formData.telefono}
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
                  <Box className="mt-6">
                    <Typography className="mb-2 font-semibold text-gray-700">
                      Selecciona fecha y hora (9am - 11pm)
                    </Typography>
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
                              actions: ["clear"], // botones visibles
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
                <CardActions style={{display:'flex', justifyContent:'right'}}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                  >
                    Siguiente
                  </Button>
                </CardActions>
              </Card>
            )}

            {/* Paso 2 - Selección de Paquete
              PASO 2: PAQUETES, PASO3: PERSONALIZAR (listar Botanas, Bebidas, Muisca)   */}
            {activeStep === 1 && (
              <Card className="shadow-lg rounded-2xl">
                <CardContent>
                  <Typography className="mb-6 text-xl font-bold text-gray-800 text-center">
                    Arma tu experiencia 🎉
                  </Typography>

                  <Grid container spacing={3}>
                    {/* Columna Botanas */}
                    <Grid item xs={12} md={4}>
                      <Typography variant="h6" className="mb-2 text-amber-900">
                        Botanas
                      </Typography>
                      {[
                        { name: "Nachos con queso", price: 150, img: "/images/nachos.jpg" },
                        { name: "Palomitas gourmet", price: 120, img: "/images/palomitas.jpg" },
                        { name: "Brochetas de fruta", price: 180, img: "/images/fruta.jpg" },
                      ].map((item) => (
                        <Card
                          key={item.name}
                          className={`flex justify-between items-center mb-2 p-2 cursor-pointer border ${
                            formData.extras.includes(item.name)
                              ? "border-amber-500 bg-amber-50"
                              : "border-gray-200"
                          }`}
                          onClick={() => handleExtraSelect(item.name)}
                        >
                          <Box>
                            <Typography className="font-medium">{item.name}</Typography>
                            <Typography variant="body2" color="text.secondary">
                              ${item.price} MXN
                            </Typography>
                          </Box>
                          <img
                            src={item.img}
                            alt={item.name}
                            className="w-16 h-12 rounded-lg object-cover"
                          />
                        </Card>
                      ))}
                    </Grid>

                    {/* Columna Música */}
                    <Grid item xs={12} md={4}>
                      <Typography variant="h6" className="mb-2 text-amber-900">
                        Música
                      </Typography>

                      {/* DJs */}
                      <Typography variant="subtitle2" color="text.secondary" className="mt-2">
                        DJs
                      </Typography>
                      {[
                        { name: "DJ Luna", price: 2000, img: "/images/dj-luna.jpg" },
                        { name: "DJ Fire", price: 2500, img: "/images/dj-fire.jpg" },
                      ].map((item) => (
                        <Card
                          key={item.name}
                          className={`flex justify-between items-center mb-2 p-2 cursor-pointer border ${
                            formData.extras.includes(item.name)
                              ? "border-amber-500 bg-amber-50"
                              : "border-gray-200"
                          }`}
                          onClick={() => handleExtraSelect(item.name)}
                        >
                          <Box>
                            <Typography className="font-medium">{item.name}</Typography>
                            <Typography variant="body2" color="text.secondary">
                              ${item.price} MXN
                            </Typography>
                          </Box>
                          <img
                            src={item.img}
                            alt={item.name}
                            className="w-16 h-12 rounded-lg object-cover"
                          />
                        </Card>
                      ))}

                      {/* Norteño */}
                      <Typography variant="subtitle2" color="text.secondary" className="mt-4">
                        Norteño
                      </Typography>
                      {[
                        { name: "Los Tigres del Valle", price: 4000, img: "/images/norteno1.jpg" },
                        { name: "Los Rancheros", price: 3500, img: "/images/norteno2.jpg" },
                      ].map((item) => (
                        <Card
                          key={item.name}
                          className={`flex justify-between items-center mb-2 p-2 cursor-pointer border ${
                            formData.extras.includes(item.name)
                              ? "border-amber-500 bg-amber-50"
                              : "border-gray-200"
                          }`}
                          onClick={() => handleExtraSelect(item.name)}
                        >
                          <Box>
                            <Typography className="font-medium">{item.name}</Typography>
                            <Typography variant="body2" color="text.secondary">
                              ${item.price} MXN
                            </Typography>
                          </Box>
                          <img
                            src={item.img}
                            alt={item.name}
                            className="w-16 h-12 rounded-lg object-cover"
                          />
                        </Card>
                      ))}
                    </Grid>
                    

                    {/* Columna Paquetes */}
                    <Grid item xs={12} md={4}>
                      <Typography variant="h6" className="mb-2 text-amber-900">
                        Paquetes Armados
                      </Typography>
                      {[
                        {
                          name: "Paquete Fiesta",
                          details: "Incluye Nachos, DJ Luna, 50 refrescos",
                          price: 4500,
                          img: "/images/fiesta.jpg",
                        },
                        {
                          name: "Paquete Premium",
                          details: "Palomitas, Brochetas, Norteño Los Tigres del Valle",
                          price: 7000,
                          img: "/images/premium.jpg",
                        },
                        {
                          name: "Paquete VIP",
                          details: "Todas las botanas + DJ Fire + Norteño Rancheros",
                          price: 10000,
                          img: "/images/vip.jpg",
                        },
                      ].map((item) => (
                        <Card
                          key={item.name}
                          className={`flex justify-between items-center mb-3 p-3 cursor-pointer border ${
                            formData.paquete === item.name
                              ? "border-orange-500 bg-orange-50"
                              : "border-gray-200"
                          }`}
                          onClick={() => handlePaqueteSelect(item.name)}
                        >
                          <Box>
                            <Typography className="font-bold">{item.name}</Typography>
                            <Typography variant="body2" color="text.secondary">
                              {item.details}
                            </Typography>
                            <Typography variant="body2" className="text-green-700 font-semibold">
                              ${item.price} MXN
                            </Typography>
                          </Box>
                          <img
                            src={item.img}
                            alt={item.name}
                            className="w-20 h-14 rounded-lg object-cover"
                          />
                        </Card>
                      ))}
                    </Grid>
                  </Grid>
                </CardContent>

                <CardActions style={{ display: "flex", justifyContent: "right" }}>
                  <Button onClick={handleBack}>Atrás</Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                  >
                    Siguiente
                  </Button>
                </CardActions>
              </Card>
            )}


            {/* Paso 3 - Resumen */}
            {activeStep === 2 && (
              <Card className="shadow-lg rounded-2xl">
                <CardContent>
                  <Typography variant="h6">
                    Resumen de tu reservación
                  </Typography>
                  <ul className="list-disc ml-6 mt-2 text-gray-700">
                    <li>
                      <b>Cliente:</b> {formData.nombre} {formData.apellidos}
                    </li>
                    <li>
                      <b>Teléfono:</b> {formData.telefono}
                    </li>
                    <li>
                      <b>Fecha:</b> {formData.fecha?.toDate().toLocaleDateString()}{" "}
                      {formData.horaInicio?.toLocaleTimeString()} -{" "}
                      {formData.horaFin?.toLocaleTimeString()}
                    </li>
                    <li>
                      <b>Paquete:</b> {formData.paquete}
                    </li>
                    <li>
                      <b>Extras:</b> {formData.extras.join(", ")}
                    </li>
                  </ul>
                  <Typography className="mt-4 text-lg font-bold text-green-700">
                    Total: $15,000 MXN
                  </Typography>
                </CardContent>
                <CardActions style={{display:'flex', justifyContent:'right'}}>
                  <Button onClick={handleBack}>Atrás</Button>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => {
                      alert("Reservación confirmada 🚀");
                      onClose();
                    }}
                  >
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
