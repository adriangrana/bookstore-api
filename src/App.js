import React, { useState } from 'react';
import { Container, TextField, Radio, RadioGroup, FormControlLabel, FormLabel, Button, Typography } from '@mui/material';

function App() {
  const [prestamo, setPrestamo] = useState('');
  const [interes, setInteres] = useState('');
  const [euribor, setEuribor] = useState('');
  const [tiempo, setTiempo] = useState('');
  const [tipoInteres, setTipoInteres] = useState('fijo');
  const [cuotaMensual, setCuotaMensual] = useState('');

  const calcularCuota = () => {
    const interesCalculado = tipoInteres === 'variable' ? parseFloat(euribor.replace(',', '.')) + parseFloat(interes.replace(',', '.')) : parseFloat(interes.replace(',', '.'));
    const i_mensual = interesCalculado / 12 / 100;
    const n_meses = parseFloat(tiempo) * 12;

    const cuota = prestamo * (i_mensual * Math.pow((1 + i_mensual), n_meses)) / (Math.pow((1 + i_mensual), n_meses) - 1);
    setCuotaMensual(cuota.toFixed(2));
  };

  return (

    <Container maxWidth="sm">
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <Typography variant="h4" component="h1" gutterBottom>
        Calculadora de Crédito Hipotecario
      </Typography>
      <TextField
        label="Monto del préstamo (€)"
        variant="outlined"
        fullWidth
        margin="normal"
        value={prestamo}
        onChange={(e) => setPrestamo(e.target.value)}
      />
      <TextField
        label="Tasa de interés (%)"
        variant="outlined"
        fullWidth
        margin="normal"
        value={interes}
        onChange={(e) => setInteres(e.target.value)}
      />
      <TextField
        label="Euribor actual (%)"
        variant="outlined"
        fullWidth
        margin="normal"
        disabled={tipoInteres === 'fijo'}
        value={euribor}
        onChange={(e) => setEuribor(e.target.value)}
      />
      <TextField
        label="Tiempo (años)"
        variant="outlined"
        fullWidth
        margin="normal"
        value={tiempo}
        onChange={(e) => setTiempo(e.target.value)}
      />
      <FormLabel component="legend">Tipo de interés</FormLabel>
      <RadioGroup
        row
        value={tipoInteres}
        onChange={(e) => setTipoInteres(e.target.value)}
      >
        <FormControlLabel value="fijo" control={<Radio />} label="Fijo" />
        <FormControlLabel value="variable" control={<Radio />} label="Variable (Euribor + Diferencial)" />
      </RadioGroup>
      <Button variant="contained" color="primary" fullWidth onClick={calcularCuota}>
        Calcular Cuota
      </Button>
      {cuotaMensual && (
        <Typography variant="h6" component="p" marginTop={2}>
          Cuota Mensual: {cuotaMensual}€
        </Typography>
      )}
    </Container>
  );
}

export default App;
