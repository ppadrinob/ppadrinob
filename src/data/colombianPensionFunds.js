export const colombianPensionFunds = [
    { code: 'AFP001', name: 'Porvenir' },
    { code: 'AFP002', name: 'Protección' },
    { code: 'AFP003', name: 'Colfondos' },
    { code: 'AFP004', name: 'Skandia' },
    { code: 'RPM001', name: 'Colpensiones' }
].sort((a, b) => a.name.localeCompare(b.name));

export const getPensionFundName = (code) => {
    const fund = colombianPensionFunds.find(f => f.code === code);
    return fund ? fund.name : code;
};
