export const colombianCompensationFunds = [
    { code: 'CCF001', name: 'Cafamaz' },
    { code: 'CCF002', name: 'Comfama' },
    { code: 'CCF003', name: 'Combarranquilla' },
    { code: 'CCF004', name: 'Cajacopi Atlántico' },
    { code: 'CCF005', name: 'Comfamiliar Atlántico' },
    { code: 'CCF006', name: 'Comfenalco Cartagena' },
    { code: 'CCF007', name: 'Comfaboy' },
    { code: 'CCF008', name: 'Confa' },
    { code: 'CCF009', name: 'Comfacasanare' },
    { code: 'CCF010', name: 'Comfacauca' },
    { code: 'CCF011', name: 'Comfaca' },
    { code: 'CCF012', name: 'Comfacesar' },
    { code: 'CCF013', name: 'Comfacor' },
    { code: 'CCF014', name: 'Cafam' },
    { code: 'CCF015', name: 'Colsubsidio' },
    { code: 'CCF016', name: 'Compensar' },
    { code: 'CCF017', name: 'Comfacundi' },
    { code: 'CCF018', name: 'Comfaguajira' },
    { code: 'CCF019', name: 'Comfamiliar Huila' },
    { code: 'CCF020', name: 'Cajamag' },
    { code: 'CCF021', name: 'Cofrem' },
    { code: 'CCF022', name: 'Comfanorte' },
    { code: 'CCF023', name: 'Comfaoriente' },
    { code: 'CCF024', name: 'Comfamiliar Putumayo' },
    { code: 'CCF025', name: 'Comfenalco Quindío' },
    { code: 'CCF026', name: 'Comfamiliar Risaralda' },
    { code: 'CCF027', name: 'Comfenalco Santander' },
    { code: 'CCF028', name: 'Cajasan' },
    { code: 'CCF029', name: 'Comfasucre' },
    { code: 'CCF030', name: 'Cafasur' },
    { code: 'CCF031', name: 'Comfenalco Tolima' },
    { code: 'CCF032', name: 'Comfatolima' },
    { code: 'CCF033', name: 'Comfenalco Valle' },
    { code: 'CCF034', name: 'Comfandi' },
    { code: 'CCF035', name: 'Cajasai' },
    { code: 'CCF036', name: 'Comfachocó' }
].sort((a, b) => a.name.localeCompare(b.name));

export const getCompensationFundName = (code) => {
    const fund = colombianCompensationFunds.find(f => f.code === code);
    return fund ? fund.name : code;
};
