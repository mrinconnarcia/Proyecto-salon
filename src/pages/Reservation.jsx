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
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addHours, setHours, setMinutes } from "date-fns";
import { X } from "lucide-react";
// import '../assets/styles/reservationModal.css'

const steps = ["Datos del Cliente", "Fecha y Hora", "Paquete", "Resumen"];

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
    paquete: null,
    extras: [],
  });

  // Simulación de fechas ocupadas (backend)
  const fechasOcupadas = [new Date(2025, 8, 25, 9), new Date(2025, 8, 28, 15)];

  if (!isOpen) return null;

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);
  const handleFileChange = (e) =>
    setFormData({ ...formData, ine: e.target.files[0] });

  const handleDateChange = (date) => {
    const horaInicio = setMinutes(setHours(date, date.getHours()), 0);
    const horaFin = addHours(horaInicio, 7);
    setFormData({ ...formData, fecha: date, horaInicio, horaFin });
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
    fechasOcupadas.some(
      (ocupada) =>
        date.getDate() === ocupada.getDate() &&
        date.getMonth() === ocupada.getMonth() &&
        date.getFullYear() === ocupada.getFullYear()
    );

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 rounded-3xl shadow-2xl w-full max-w-3xl mx-auto relative animate-scale-in overflow-y-auto min-h-2/3 max-h-[90vh]">
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
            {/* Paso 1 */}
            {activeStep === 0 && (
              <Card className="shadow-lg rounded-2xl py-3 px-2">
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <TextField
                        label="Nombre"
                        fullWidth
                        value={formData.nombre}
                        onChange={(e) =>
                          setFormData({ ...formData, nombre: e.target.value })
                        }
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        label="Apellidos"
                        fullWidth
                        value={formData.apellidos}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            apellidos: e.target.value,
                          })
                        }
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        label="Teléfono"
                        fullWidth
                        value={formData.telefono}
                        onChange={(e) =>
                          setFormData({ ...formData, telefono: e.target.value })
                        }
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <input
                        type="file"
                        accept="image/*,application/pdf"
                        onChange={handleFileChange}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
                <CardActions>
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
                      <b>Fecha:</b> {formData.fecha?.toLocaleDateString()}{" "}
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
                <CardActions>
                  <Button onClick={handleBack}>Atrás</Button>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => {
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
