import React, {useContext } from 'react';
import { PreVisualizationContext } from '../../context/preVisualizationContext';

// MATERIAL UI
import { Grid, Paper, Typography, Box } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

//COMPONENTS
import PreviewFooter from "../preview-footer"

const Preview = () => {
    
    const { formData, formRef } = useContext(PreVisualizationContext);

    const formatDate = (date) => {
        if (!date) return '';
        const [year, month, day] = date.split('-');
        return `${day}/${month}/${year}`;
    };
    
    return (

        <>
        
            <Grid item xs={12} md={6} style={{ marginBottom: '100px' }}>
                <Paper ref={formRef} elevation={3} style={{ padding: '20px', backgroundColor: '#ffffff', color: '#000' }}>
                    <Typography variant="h5" style={{ textAlign: 'center' }} gutterBottom>
                        Informações Pessoais
                    </Typography>

                    <Typography variant="h5" gutterBottom>
                        {formData.firstName || 'Seu Nome'}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '15px' }}>
                        {formData.photo ? (
                            <img
                                src={formData.photo}
                                alt="Foto de Perfil"
                                style={{
                                    width: '150px',
                                    height: '150px',
                                    borderRadius: formData.roundedPhoto ? '50%' : '0%',
                                    objectFit: 'cover',
                                }}
                            />
                        ) : (
                            <AccountCircleIcon style={{ fontSize: '150px', color: '#ccc' }} />
                        )}
                    </Box>
                    <Typography variant="subtitle1">
                        <strong>Sobrenome:</strong> {formData.lastName}
                    </Typography>
                    <Typography variant="subtitle1">
                        <strong>Sexo:</strong> {formData.gender}
                    </Typography>
                    <Typography variant="subtitle1">
                        <strong>Endereço:</strong> {formData.address}
                    </Typography>
                    <Typography variant="subtitle1">
                        <strong>Telefone:</strong> {formData.phone}
                    </Typography>
                    <Typography variant="subtitle1">
                        <strong>E-mail:</strong> {formData.email}
                    </Typography>
                    <Typography variant="subtitle1">
                        <strong>Nacionalidade:</strong> {formData.nationality}
                    </Typography>
                    <Typography variant="subtitle1">
                        <strong>Data de Nascimento:</strong> {formatDate(formData.birthdate)}
                    </Typography>
                    <hr />
                    <Typography variant="h5" style={{ textAlign: 'center', marginTop: '20px' }} gutterBottom>
                        Informações Profissionais
                    </Typography>
                    <Typography variant="subtitle1">
                        <strong>Cargo:</strong> {formData.role}
                    </Typography>
                    <Typography variant="subtitle1">
                        <strong>Nível:</strong> {formData.level}
                    </Typography>
                    <Typography variant="subtitle1">
                        <strong>Salário:</strong> {formData.wage}
                    </Typography>
                    <Typography variant="subtitle1">
                        <strong>Data de Admissão:</strong> {formatDate(formData.admission)}
                    </Typography>
                    <Typography variant="subtitle1">
                        <strong>Data de Demissão:</strong> {formatDate(formData.termination)}
                    </Typography>
                </Paper>
            </Grid>

            <PreviewFooter />

        </>
    );
};

export default Preview;
