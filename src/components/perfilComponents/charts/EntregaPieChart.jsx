'use client';
import { PieChart } from '@mui/x-charts/PieChart';
import { Box, Typography, useTheme } from '@mui/material';

export default function EntregaPieChart({ counts }) {
    // El usuario pidió pasar la cantidad directamente
    
    const chartData = [
        { id: 0, value: counts.enviadas || 0, label: 'Pendiente', color: '#f59e0b' }, // Amber 500
        { id: 1, value: counts.aceptadas || 0, label: 'Aceptada', color: '#10b981' }, // Emerald 500
        { id: 2, value: counts.rechazadas || 0, label: 'Rechazada', color: '#ef4444' }, // Red 500
    ].filter(item => item.value > 0);

    const total = (counts.enviadas || 0) + (counts.aceptadas || 0) + (counts.rechazadas || 0);

    if (total === 0) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', p: 3 }}>
                <Typography variant="body2" color="text.secondary">No hay datos de envíos</Typography>
            </Box>
        );
    }


    return (
        <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', p: 2 }}>
            <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 'bold', color: 'gray.700', alignSelf: 'flex-start' }}>
                Resumen de Envíos (Emisor)
            </Typography>
            <Box sx={{ width: '100%', flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <PieChart
                    series={[
                        {
                            data: chartData,
                            innerRadius: 35,
                            outerRadius: 65,
                            paddingAngle: 5,
                            cornerRadius: 6,
                            startAngle: -90,
                            endAngle: 180,
                        },
                    ]}
                    width={280}
                    height={180}
                    margin={{ right: 80 }}
                    legend={{
                        direction: 'column',
                        position: { vertical: 'middle', horizontal: 'right' },
                        labelStyle: {
                            fontSize: 12,
                            fontWeight: 500
                        },
                        itemMarkWidth: 10,
                        itemMarkHeight: 10,
                        markGap: 5,
                        itemGap: 10,
                    }}
                    sx={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                />
            </Box>
        </Box>
    );
}

