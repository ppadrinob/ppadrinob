export const colombianEPS = [
    { code: 'EPS001', name: 'Aliansalud EPS' },
    { code: 'EPS002', name: 'Salud Total EPS' },
    { code: 'EPS005', name: 'EPS Sanitas' },
    { code: 'EPS010', name: 'EPS Sura' },
    { code: 'EPS017', name: 'Famisanar' },
    { code: 'EPS018', name: 'Servicio Occidental de Salud (SOS)' },
    { code: 'EPS012', name: 'Comfenalco Valle' },
    { code: 'EPS008', name: 'Compensar EPS' },
    { code: 'EPS037', name: 'Nueva EPS' },
    { code: 'EPS046', name: 'Salud Mía' },
    { code: 'EPS040', name: 'Savia Salud' },
    { code: 'EPS047', name: 'Salud Bolívar' },
    { code: 'EPSS42', name: 'Coosalud' },
    { code: 'EPSS48', name: 'Mutual Ser' },
    { code: 'CCFC55', name: 'Cajacopi Atlántico' },
    { code: 'EPSC25', name: 'Capresoca' },
    { code: 'CCFC20', name: 'Comfachocó' },
    { code: 'CCF050', name: 'Comfaoriente' },
    { code: 'CCF033', name: 'EPS Familiar de Colombia' },
    { code: 'ESS062', name: 'Asmet Salud' },
    { code: 'ESS118', name: 'Emssanar' },
    { code: 'EPSS34', name: 'Capital Salud' },
    { code: 'EPSI01', name: 'Dusakawi' },
    { code: 'EPSI03', name: 'Asociación Indígena del Cauca (AIC)' },
    { code: 'EPSI04', name: 'Anas Wayuu' },
    { code: 'EPSI05', name: 'Mallamas' },
    { code: 'EPSI06', name: 'Pijaos Salud' },
    { code: 'EAS016', name: 'Empresas Públicas de Medellín (EPM)' },
    { code: 'EAS027', name: 'Fondo de Pasivo Social de Ferrocarriles' }
].sort((a, b) => a.name.localeCompare(b.name));

export const getEPSName = (code) => {
    const eps = colombianEPS.find(e => e.code === code);
    return eps ? eps.name : code;
};
