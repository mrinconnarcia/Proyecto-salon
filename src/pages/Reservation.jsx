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
<<<<<<< HEAD
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
=======
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addHours, setHours, setMinutes } from "date-fns";
import { X } from "lucide-react";
// import '../assets/styles/reservationModal.css'

const steps = ["Datos del Cliente", "Fecha y Hora", "Paquete", "Resumen"];

const ReservationModal = ({ isOpen, onClose, onAddToCart }) => {
>>>>>>> c549941e4dce969ffe7dc4dd543cbf0b6a411004
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

<<<<<<< HEAD
=======
  // Simulación de fechas ocupadas (backend)
  const fechasOcupadas = [new Date(2025, 8, 25, 9), new Date(2025, 8, 28, 15)];

>>>>>>> c549941e4dce969ffe7dc4dd543cbf0b6a411004
  if (!isOpen) return null;

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);
<<<<<<< HEAD

=======
>>>>>>> c549941e4dce969ffe7dc4dd543cbf0b6a411004
  const handleFileChange = (e) =>
    setFormData({ ...formData, ine: e.target.files[0] });

  const handleDateChange = (date) => {
<<<<<<< HEAD
    if (!date) return;
    const start = date.toDate();
    const end = new Date(start.getTime() + 7 * 60 * 60 * 1000); // +7 horas
    setFormData({ ...formData, fecha: date, horaInicio: start, horaFin: end });
=======
    const horaInicio = setMinutes(setHours(date, date.getHours()), 0);
    const horaFin = addHours(horaInicio, 7);
    setFormData({ ...formData, fecha: date, horaInicio, horaFin });
>>>>>>> c549941e4dce969ffe7dc4dd543cbf0b6a411004
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
<<<<<<< HEAD
    occupiedDates.some((d) => d.isSame(date, "day"));

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 rounded-3xl shadow-2xl w-full max-w-5xl mx-auto relative animate-scale-in overflow-y-auto min-h-2/3 max-h-[90vh]">
=======
    fechasOcupadas.some(
      (ocupada) =>
        date.getDate() === ocupada.getDate() &&
        date.getMonth() === ocupada.getMonth() &&
        date.getFullYear() === ocupada.getFullYear()
    );

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 rounded-3xl shadow-2xl w-full max-w-3xl mx-auto relative animate-scale-in overflow-y-auto min-h-2/3 max-h-[90vh]">
>>>>>>> c549941e4dce969ffe7dc4dd543cbf0b6a411004
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
<<<<<<< HEAD
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
=======
            {/* Paso 1 */}
            {activeStep === 0 && (
              <Card className="shadow-lg rounded-2xl py-3 px-2">
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <TextField
                        label="Nombre"
>>>>>>> c549941e4dce969ffe7dc4dd543cbf0b6a411004
                        fullWidth
                        value={formData.nombre}
                        onChange={(e) =>
                          setFormData({ ...formData, nombre: e.target.value })
                        }
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
<<<<<<< HEAD
                        variant="standard"
                        label="Apellidos"
                        required
                        fullWidth
                        value={formData.apellidos}
                        onChange={(e) =>
                          setFormData({ ...formData, apellidos: e.target.value })
=======
                        label="Apellidos"
                        fullWidth
                        value={formData.apellidos}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            apellidos: e.target.value,
                          })
>>>>>>> c549941e4dce969ffe7dc4dd543cbf0b6a411004
                        }
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
<<<<<<< HEAD
                        variant="standard"
                        label="Teléfono"
                        required
=======
                        label="Teléfono"
>>>>>>> c549941e4dce969ffe7dc4dd543cbf0b6a411004
                        fullWidth
                        value={formData.telefono}
                        onChange={(e) =>
                          setFormData({ ...formData, telefono: e.target.value })
                        }
                      />
                    </Grid>
                    <Grid item xs={6}>
<<<<<<< HEAD
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
=======
                      <input
                        type="file"
                        accept="image/*,application/pdf"
                        onChange={handleFileChange}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
                <CardActions>
>>>>>>> c549941e4dce969ffe7dc4dd543cbf0b6a411004
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

<<<<<<< HEAD
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
=======
            {/* Paso 2 -- IMPLEMENTAR EL USO DEL COMPONENTE DATETIME DE mui PARA TENER UN SELECTOR MAS BONITO
                ADEMÁS INVESTIGAR COMO INVALIDAR LA SELECCION DE FECHAS DETERMINADAS Y AGREGAR MARCADORES A ESAS FECHAS
                https://mui.com/x/react-date-pickers/date-time-picker/#landscape-orientation
                https://mui.com/x/react-date-pickers/ */}
            {activeStep === 1 && (
              <Card className="shadow-lg rounded-2xl">
                <CardContent>
                  <Typography className="mb-2 font-semibold text-gray-700">
                    Selecciona fecha y hora (9am - 11pm)
                  </Typography>
                  <DatePicker
                    selected={formData.fecha}
                    onChange={handleDateChange}
                    showTimeSelect
                    minTime={setHours(setMinutes(new Date(), 0), 9)}
                    maxTime={setHours(setMinutes(new Date(), 0), 23)}
                    filterDate={(date) => !isDateDisabled(date)}
                    dateFormat="dd/MM/yyyy h:mm aa"
                    className="border p-2 rounded-md w-full focus:ring-2 focus:ring-orange-400"
                    popperModifiers={[
                      {
                        name: "offset",
                        options: { offset: [0, 10] }, // separa un poco del input
                      },
                      {
                        name: "preventOverflow",
                        options: { boundary: "viewport" }, // evita que se corte
                      },
                    ]}
                    popperContainer={({ children }) => (
                      <div className="z-50">{children}</div> // asegura que flote sobre todo
                    )}
                  />

                  {formData.horaInicio && (
                    <p className="mt-2 text-gray-600">
                      Inicio: {formData.horaInicio.toLocaleTimeString()} | Fin:{" "}
                      {formData.horaFin.toLocaleTimeString()}
                    </p>
                  )}
                </CardContent>
                <CardActions>
>>>>>>> c549941e4dce969ffe7dc4dd543cbf0b6a411004
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

<<<<<<< HEAD

            {/* Paso 3 - Resumen */}
            {activeStep === 2 && (
              <Card className="shadow-lg rounded-2xl">
                <CardContent>
=======
            {/* Paso 3 */}
            {activeStep === 2 && (
              <Card className="shadow-lg rounded-2xl">
                <CardContent>
                  <Typography className="mb-4 font-semibold">
                    Selecciona tu paquete:
                  </Typography>
                  <Grid container spacing={2}>
                    {["Básico", "Premium", "VIP"].map((p) => (
                      <Grid item xs={4} key={p}>
                        <Card
                          onClick={() => handlePaqueteSelect(p)}
                          className={`cursor-pointer p-4 ${
                            formData.paquete === p
                              ? "bg-orange-100 border-2 border-orange-500"
                              : ""
                          }`}
                        >
                          <Typography>{p}</Typography>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                  <Typography className="mt-4 font-semibold">
                    Extras:
                  </Typography>
                  {["Botanas", "DJ", "Banda", "Norteño"].map((extra) => (
                    <FormControlLabel
                      key={extra}
                      control={
                        <Checkbox
                          checked={formData.extras.includes(extra)}
                          onChange={() => handleExtraSelect(extra)}
                        />
                      }
                      label={extra}
                    />
                  ))}
                </CardContent>
                <CardActions>
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

            {/* Paso 4 */}
            {activeStep === 3 && (
              <Card className="shadow-lg rounded-2xl">
                <CardContent>
>>>>>>> c549941e4dce969ffe7dc4dd543cbf0b6a411004
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
<<<<<<< HEAD
                      <b>Fecha:</b> {formData.fecha?.toDate().toLocaleDateString()}{" "}
=======
                      <b>Fecha:</b> {formData.fecha?.toLocaleDateString()}{" "}
>>>>>>> c549941e4dce969ffe7dc4dd543cbf0b6a411004
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
<<<<<<< HEAD
                <CardActions style={{display:'flex', justifyContent:'right'}}>
=======
                <CardActions>
>>>>>>> c549941e4dce969ffe7dc4dd543cbf0b6a411004
                  <Button onClick={handleBack}>Atrás</Button>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => {
<<<<<<< HEAD
                      alert("Reservación confirmada 🚀");
=======
                      const reserva = {
                        cliente: `${formData.nombre} ${formData.apellidos}`,
                        telefono: formData.telefono,
                        fecha: formData.fecha?.toLocaleDateString(),
                        hora: `${formData.horaInicio?.toLocaleTimeString()} - ${formData.horaFin?.toLocaleTimeString()}`,
                        paquete: formData.paquete,
                        extras: formData.extras,
                        total: 15000, // aquí puedes calcular dinámicamente
                      };
                      onAddToCart(reserva); // lo mandamos al carrito
>>>>>>> c549941e4dce969ffe7dc4dd543cbf0b6a411004
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
