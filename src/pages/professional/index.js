import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PreVisualizationContext } from '../../context/preVisualizationContext';
import { TextField, Grid, Paper, Typography, Box, Switch, FormControlLabel, FormControl, Select, MenuItem, InputLabel, Checkbox } from '@mui/material';

// PREVIEW
import Preview from '../../components/preview';

const Professional = () => {

  const { formData, setFormData, errors, setErrors, validateContact, loading } = useContext(PreVisualizationContext);
  const navigate = useNavigate()

  useEffect(() => {

    const isValid = validateContact();

    if(!isValid) {

      navigate("/informacoes-contato")

    }


  }, [validateContact, navigate])

  const handleChange = (e) => {

    const error = `error${e.target.name}`
    console.log(error)
    setErrors({ ...errors, [error]: "" })

    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePhotoChange = (e) => {
    setFormData({ ...formData, photo: URL.createObjectURL(e.target.files[0]) });
  };

  const handleSwitchChange = () => {
    setFormData({ ...formData, roundedPhoto: !formData.roundedPhoto });
  };

  const handleCheckboxChange = () => {
    setFormData({ ...formData, currentlyWorking: !formData.currentlyWorking, termination:  formData.termination ? "" : formData.termination });
  };

  return (
    <Box sx={{ padding: '20px' }}>
      <Grid container spacing={3}>
        {/* Formulário */}
        <Grid item xs={12} md={5}>
          <Paper elevation={3} style={{ padding: '100px' }}>
            <Typography variant="h6" gutterBottom>
              Informações Profissionais
            </Typography>
            <TextField
              label="Cargo"
              name="role"
              fullWidth
              margin="normal"
              value={formData.role}
              onChange={handleChange}
            />
            <Typography variant="h200" color='red' gutterBottom>
              {errors.errorrole}
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <FormControl fullWidth margin="normal">
                  <InputLabel id="level-label">Nível</InputLabel>
                  <Select
                    labelId="level-label"
                    id="level"
                    name="level"
                    value={formData.level}
                    label="Nível"
                    onChange={handleChange}
                  >
                    <MenuItem value="Junior">Junior</MenuItem>
                    <MenuItem value="Pleno">Pleno</MenuItem>
                    <MenuItem value="Senior">Senior</MenuItem>
                  </Select>
                </FormControl>
                <Typography variant="h200" color='red' gutterBottom>
                      {errors.errorlevel}
                  </Typography>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Salário"
                  name="wage"
                  fullWidth
                  margin="normal"
                  value={formData.wage}
                  onChange={handleChange}
                  type="number"
                  inputProps={{ step: "0.01" }}
                />
                  <Typography variant="h200" color='red' gutterBottom>
                      {errors.errorwage}
                  </Typography>
              </Grid>
            </Grid>

            <TextField
              label="Data de Admissão"
              type="date"
              name="admission"
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
              value={formData.admission}
              onChange={handleChange}
            />

                  <Typography variant="h200" color='red' gutterBottom>
                      {errors.erroradmission}
                  </Typography>

            {/* Input de Data de Demissão e Checkbox */}
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={6}>
                <TextField
                  label="Data de Demissão"
                  type="date"
                  name="termination"
                  fullWidth
                  margin="normal"
                  InputLabelProps={{ shrink: true }}
                  value={formData.termination}
                  onChange={handleChange}
                  disabled={formData.currentlyWorking}
                />
              </Grid>
              <Grid item xs={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.currentlyWorking}
                      onChange={handleCheckboxChange}
                      color="primary"
                    />
                  }
                  label="Trabalho aqui atualmente"
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Pré-visualização */}
        <Preview />
      </Grid>

      {loading &&<div className="loading-container">
                <div className="loading"></div>
      </div>}
    </Box>
  );
};

export default Professional;

