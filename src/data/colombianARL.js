export const colombianARL = [
    { code: 'ARL001', name: 'ARL Positiva' },
    { code: 'ARL002', name: 'Seguros Bolívar' },
    { code: 'ARL003', name: 'Seguros de Vida Aurora' },
    { code: 'ARL004', name: 'Liberty Seguros' },
    { code: 'ARL005', name: 'Mapfre' },
    { code: 'ARL006', name: 'Colmena' },
    { code: 'ARL007', name: 'Seguros Alfa' },
    { code: 'ARL008', name: 'AXA Colpatria' },
    { code: 'ARL009', name: 'La Equidad' },
    { code: 'ARL010', name: 'ARL Sura' }
].sort((a, b) => a.name.localeCompare(b.name));

export const getARLName = (code) => {
    const arl = colombianARL.find(a => a.code === code);
    return arl ? arl.name : code;
};
