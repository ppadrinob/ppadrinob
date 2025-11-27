import React, { useState, useEffect } from 'react';
import { documentTypes } from '../../../data/documentTypes';
import { getCitiesSorted } from '../../../data/colombianCities';
import '../../../styles/index.css';

const EmployeeForm = ({ onSave, onCancel, initialData, companies, userRole, userCompanyId }) => {
    const [formData, setFormData] = useState({
        // Datos Generales
        documentType: '13', // Código del tipo de documento (por defecto CC)
        documentNumber: '',
        documentExpedition: '',
        firstName: '',
        secondName: '',
        firstLastName: '',
        secondLastName: '',
        birthCity: '',
        birthDate: '',
        profession: '',
        civilStatus: 'Soltero',
        email: '',
        gender: 'M',
        address: '',
        city: '',
        phone: '',

        // Datos Laborales
        companyId: userRole === 'company_admin' ? userCompanyId : '',
        costCenter: '',
        position: '',
        boss: '',
        salary: '',
        startDate: '',
        endDate: '',
        workerType: 'Empleado',
        workerSubtype: '',
        bank: '',
        accountType: 'Ahorros',
        accountNumber: '',
        paymentMethod: 'Transferencia',
        paymentForm: 'Mensual',
        contractType: 'Indefinido',
        integralSalary: false,
        transportAllowance: false,
        averageSalary: false,
        workday: 'Completo',
        status: 'Activo',
        stage: 'Indeterminado',

        // Aportes
        healthProvider: '',
        compensationFund: '',
        pensionFund: '',
        arl: '',
        arlPercentage: ''
    });

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="glass-panel" style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{ marginBottom: '1.5rem', fontSize: '1.5rem', fontWeight: 'bold' }}>
                {initialData ? 'Editar Empleado' : 'Nuevo Empleado'}
            </h2>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                {/* Datos Generales */}
                <div className="glass-panel" style={{ padding: '1.5rem', backgroundColor: 'rgba(0,0,0,0.2)' }}>
                    <h3 style={{ color: 'var(--primary-color)', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
                        Datos Generales
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Tipo Documento</label>
                            <select name="documentType" value={formData.documentType} onChange={handleChange} required style={inputStyle}>
                                {documentTypes.map(docType => (
                                    <option key={docType.code} value={docType.code}>
                                        {docType.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Número Documento</label>
                            <input type="text" name="documentNumber" value={formData.documentNumber} onChange={handleChange} required style={inputStyle} />
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Ciudad de Expedición</label>
                            <select name="documentExpedition" value={formData.documentExpedition} onChange={handleChange} style={inputStyle}>
                                <option value="">Seleccionar ciudad...</option>
                                {getCitiesSorted().map(city => (
                                    <option key={city.code} value={city.code}>
                                        {city.name} - {city.department}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Primer Nombre</label>
                            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required style={inputStyle} />
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Segundo Nombre</label>
                            <input type="text" name="secondName" value={formData.secondName} onChange={handleChange} style={inputStyle} />
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Primer Apellido</label>
                            <input type="text" name="firstLastName" value={formData.firstLastName} onChange={handleChange} required style={inputStyle} />
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Segundo Apellido</label>
                            <input type="text" name="secondLastName" value={formData.secondLastName} onChange={handleChange} style={inputStyle} />
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Ciudad Nacimiento</label>
                            <select name="birthCity" value={formData.birthCity} onChange={handleChange} style={inputStyle}>
                                <option value="">Seleccionar ciudad...</option>
                                {getCitiesSorted().map(city => (
                                    <option key={city.code} value={city.code}>
                                        {city.name} - {city.department}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Fecha Nacimiento</label>
                            <input type="date" name="birthDate" value={formData.birthDate} onChange={handleChange} style={inputStyle} />
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Profesión</label>
                            <input type="text" name="profession" value={formData.profession} onChange={handleChange} style={inputStyle} />
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Estado Civil</label>
                            <select name="civilStatus" value={formData.civilStatus} onChange={handleChange} style={inputStyle}>
                                <option value="Soltero">Soltero</option>
                                <option value="Casado">Casado</option>
                                <option value="Unión Libre">Unión Libre</option>
                                <option value="Divorciado">Divorciado</option>
                                <option value="Viudo">Viudo</option>
                            </select>
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Género</label>
                            <select name="gender" value={formData.gender} onChange={handleChange} required style={inputStyle}>
                                <option value="M">Masculino</option>
                                <option value="F">Femenino</option>
                                <option value="Otro">Otro</option>
                            </select>
                        </div>

                        <div style={{ gridColumn: '1 / -1' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Email</label>
                            <input type="email" name="email" value={formData.email} onChange={handleChange} style={inputStyle} />
                        </div>

                        <div style={{ gridColumn: '1 / -1' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Dirección</label>
                            <input type="text" name="address" value={formData.address} onChange={handleChange} style={inputStyle} />
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Ciudad de Residencia</label>
                            <select name="city" value={formData.city} onChange={handleChange} style={inputStyle}>
                                <option value="">Seleccionar ciudad...</option>
                                {getCitiesSorted().map(city => (
                                    <option key={city.code} value={city.code}>
                                        {city.name} - {city.department}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Teléfono</label>
                            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} style={inputStyle} />
                        </div>
                    </div>
                </div>

                {/* Datos Laborales */}
                <div className="glass-panel" style={{ padding: '1.5rem', backgroundColor: 'rgba(0,0,0,0.2)' }}>
                    <h3 style={{ color: 'var(--secondary-color)', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
                        Datos Laborales
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                        {userRole === 'super_admin' && (
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Empresa</label>
                                <select name="companyId" value={formData.companyId} onChange={handleChange} required style={inputStyle}>
                                    <option value="">Seleccionar...</option>
                                    {companies.map(company => (
                                        <option key={company.id} value={company.id}>{company.name}</option>
                                    ))}
                                </select>
                            </div>
                        )}

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Centro de Costo</label>
                            <input type="text" name="costCenter" value={formData.costCenter} onChange={handleChange} style={inputStyle} />
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Cargo</label>
                            <input type="text" name="position" value={formData.position} onChange={handleChange} required style={inputStyle} />
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Jefe</label>
                            <input type="text" name="boss" value={formData.boss} onChange={handleChange} style={inputStyle} />
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Sueldo</label>
                            <input type="number" name="salary" value={formData.salary} onChange={handleChange} required style={inputStyle} />
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Fecha Ingreso</label>
                            <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} required style={inputStyle} />
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Fecha Retiro</label>
                            <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} style={inputStyle} />
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Tipo Trabajador</label>
                            <select name="workerType" value={formData.workerType} onChange={handleChange} style={inputStyle}>
                                <option value="Empleado">Empleado</option>
                                <option value="Contratista">Contratista</option>
                                <option value="Aprendiz">Aprendiz</option>
                            </select>
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Banco</label>
                            <input type="text" name="bank" value={formData.bank} onChange={handleChange} style={inputStyle} />
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Tipo Cuenta</label>
                            <select name="accountType" value={formData.accountType} onChange={handleChange} style={inputStyle}>
                                <option value="Ahorros">Ahorros</option>
                                <option value="Corriente">Corriente</option>
                            </select>
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Número Cuenta</label>
                            <input type="text" name="accountNumber" value={formData.accountNumber} onChange={handleChange} style={inputStyle} />
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Tipo Contrato</label>
                            <select name="contractType" value={formData.contractType} onChange={handleChange} style={inputStyle}>
                                <option value="Indefinido">Indefinido</option>
                                <option value="Fijo">Fijo</option>
                                <option value="Obra o Labor">Obra o Labor</option>
                                <option value="Prestación de Servicios">Prestación de Servicios</option>
                            </select>
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Jornada</label>
                            <select name="workday" value={formData.workday} onChange={handleChange} style={inputStyle}>
                                <option value="Completo">Tiempo Completo</option>
                                <option value="Medio Tiempo">Medio Tiempo</option>
                            </select>
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Estado</label>
                            <select name="status" value={formData.status} onChange={handleChange} style={inputStyle}>
                                <option value="Activo">Activo</option>
                                <option value="Retirado">Retirado</option>
                            </select>
                        </div>

                        <div style={{ gridColumn: '1 / -1', display: 'flex', gap: '2rem', marginTop: '0.5rem' }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                                <input type="checkbox" name="integralSalary" checked={formData.integralSalary} onChange={handleChange} />
                                <span style={{ fontSize: '0.875rem' }}>Salario Integral</span>
                            </label>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                                <input type="checkbox" name="transportAllowance" checked={formData.transportAllowance} onChange={handleChange} />
                                <span style={{ fontSize: '0.875rem' }}>Auxilio de Transporte</span>
                            </label>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                                <input type="checkbox" name="averageSalary" checked={formData.averageSalary} onChange={handleChange} />
                                <span style={{ fontSize: '0.875rem' }}>Salario Promedio</span>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Aportes */}
                <div className="glass-panel" style={{ padding: '1.5rem', backgroundColor: 'rgba(0,0,0,0.2)' }}>
                    <h3 style={{ color: 'var(--accent-color)', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
                        Aportes
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Salud (EPS)</label>
                            <input type="text" name="healthProvider" value={formData.healthProvider} onChange={handleChange} style={inputStyle} />
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Caja Compensación</label>
                            <input type="text" name="compensationFund" value={formData.compensationFund} onChange={handleChange} style={inputStyle} />
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Pensión</label>
                            <input type="text" name="pensionFund" value={formData.pensionFund} onChange={handleChange} style={inputStyle} />
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>ARL</label>
                            <input type="text" name="arl" value={formData.arl} onChange={handleChange} style={inputStyle} />
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Porcentaje ARL</label>
                            <input type="number" step="0.01" name="arlPercentage" value={formData.arlPercentage} onChange={handleChange} style={inputStyle} />
                        </div>
                    </div>
                </div>

                {/* Botones */}
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                    <button
                        type="button"
                        onClick={onCancel}
                        style={{
                            padding: '0.75rem 1.5rem',
                            borderRadius: 'var(--radius-md)',
                            border: '1px solid var(--border-color)',
                            background: 'transparent',
                            color: 'var(--text-primary)',
                            cursor: 'pointer'
                        }}
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        style={{
                            padding: '0.75rem 1.5rem',
                            borderRadius: 'var(--radius-md)',
                            background: 'var(--primary-color)',
                            color: 'white',
                            border: 'none',
                            cursor: 'pointer',
                            fontWeight: '600'
                        }}
                    >
                        Guardar
                    </button>
                </div>
            </form>
        </div>
    );
};

const inputStyle = {
    width: '100%',
    padding: '0.75rem',
    borderRadius: 'var(--radius-md)',
    border: '1px solid var(--border-color)',
    backgroundColor: 'rgba(0,0,0,0.2)',
    color: 'var(--text-primary)',
    outline: 'none'
};

export default EmployeeForm;
