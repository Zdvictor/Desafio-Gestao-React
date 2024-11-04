import React, { useEffect, useContext } from 'react';
import {useParams} from "react-router-dom"
import { PreVisualizationContext } from '../../context/preVisualizationContext';

//TOOLTIPS
import { Tooltip as ReactTooltip } from 'react-tooltip';



//MATERIAL-UI
import { TextField, Grid, Paper, Typography, Button, Box, Switch, FormControlLabel, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';


//PREVIEW
import Preview from '../../components/preview';


const Contact = () => {

    const {formData, setFormData, errors, setErrors, handleBringData, loading} = useContext(PreVisualizationContext)
    const {id} = useParams()




  const handleChange = (e) => {

    const error = `error${e.target.name}`
    console.log(error)
    setErrors({ ...errors, [error]: "" })

    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePhotoChange = (e) => {
    setErrors({ ...errors, errorphoto: "" }); 
    const file = e.target.files[0];
    if (file) {
    
        const photoUrl = URL.createObjectURL(file); 
        setFormData({ ...formData, photoFile: file, photo: photoUrl }); 
    }
};



  const handleSwitchChange = () => {
    
    setFormData({ ...formData, roundedPhoto: !formData.roundedPhoto });
  };

  return (
    <Box  sx={{ padding: '20px' }}>

      <Grid container spacing={3}>
        {/* Formulário */}
        <Grid item xs={12} md={5}>
          <Paper elevation={3} style={{ padding: '100px' }}>
            <Typography variant="h6" gutterBottom>
              Informações de contato
            </Typography>
            <TextField
              label="Nome"
              name="firstName"
              fullWidth
              margin="normal"
              value={formData.firstName}
              onChange={handleChange}
            />

            <Typography variant="h200" color='red' gutterBottom>
              {errors.errorfirstName}
            </Typography>

            <TextField
              label="Sobrenome"
              name="lastName"
              fullWidth
              margin="normal"
              value={formData.lastName}
              onChange={handleChange}
            />

            <Typography variant="h200" color='red' gutterBottom>
              {errors.errorlastName}
            </Typography>

             <FormControl fullWidth margin="normal">
              <InputLabel id="gender-label">Sexo</InputLabel>
              <Select
                labelId="gender-label"
                id="gender"
                name="gender"
                value={formData.gender}
                label="Sexo"
                onChange={handleChange}
              >
                <MenuItem value="Masculino">Masculino</MenuItem>
                <MenuItem value="Feminino">Feminino</MenuItem>
                <MenuItem value="Outro">Outro</MenuItem>
              </Select>
            </FormControl>
            
            <Typography variant="h200" color='red' gutterBottom>
              {errors.errorgender}
            </Typography>

            <TextField
              label="Endereço"
              name="address"
              fullWidth
              margin="normal"
              value={formData.address}
              onChange={handleChange}
            />
            <Typography variant="h200" color='red' gutterBottom>
              {errors.erroraddress}
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  label="Telefone"
                  name="phone"
                  fullWidth
                  margin="normal"
                  value={formData.phone}
                  onChange={handleChange}
                />
            <Typography variant="h200" color='red' gutterBottom>
              {errors.errorphone}
            </Typography>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  data-tooltip-id="email-tooltip"
                  data-tooltip-content="Não e Possivel Alterar Email no Modo de Edição" 
                  disabled={id && true}
                  label="E-mail"
                  name="email"
                  fullWidth
                  margin="normal"
                  value={formData.email}
                  onChange={handleChange}
                />

            <Typography variant="h200" color='red' gutterBottom>
              {errors.erroremail}
            </Typography>

            {id && <ReactTooltip id="email-tooltip" />}

            
              </Grid>
            </Grid>
            <TextField
              label="Nacionalidade"
              name="nationality"
              fullWidth
              margin="normal"
              value={formData.nationality}
              onChange={handleChange}
            />
            <Typography variant="h200" color='red' gutterBottom>
              {errors.errornationality}
            </Typography>
            <TextField
              label="Data de nascimento"
              type="date"
              name="birthdate"
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
              value={formData.birthdate}
              onChange={handleChange}
            />

             <Typography variant="h200" color='red' gutterBottom>
              {errors.errorbirthdate}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '15px' }}>
              <Button
                variant="outlined"
                component="label"
                style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}
              >
                <PhotoCamera />
                Adicionar Foto
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handlePhotoChange}
                />
              </Button>

              <FormControlLabel
                control={
                  <Switch
                    checked={formData.roundedPhoto}
                    onChange={handleSwitchChange}
                  />
                }
                label="Foto Redonda"
              />
            </Box>
            <Typography variant="h200" color='red' gutterBottom>
              {errors.errorphoto}
            </Typography>
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

export default Contact;
