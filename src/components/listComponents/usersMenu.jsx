'use client';
import { useState, useMemo } from "react";
import Button from "@/src/components/ui/button/button";
import InputLogin from "@/src/components/ui/inputs/inputs";
import DropDowm from "@/src/components/ui/dropDown/dropDown";

export default function UsersMenu({ users, onSelect, onSubmit }) {
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedDepartamento, setSelectedDepartamento] = useState('todos');
    const [search, setSearch] = useState('');

    // Extraer departamentos únicos (departamento puede ser un objeto con id y name)
    const departamentos = useMemo(() => {
        const depMap = new Map();
        users.forEach(u => {
            const dep = u.departamento;
            if (dep && typeof dep === 'object' && dep.id != null) {
                depMap.set(dep.id, dep.name || dep.nombre || `Dep ${dep.id}`);
            } else if (dep && typeof dep === 'string') {
                depMap.set(dep, dep);
            }
        });
        return Array.from(depMap, ([id, name]) => ({ id, name }));
    }, [users]);

    // Filtrar usuarios por departamento y búsqueda
    const filteredUsers = useMemo(() => {
        return users.filter(user => {
            const depId = String(user.departamento?.id ?? user.departamento ?? '');
            const matchDep = selectedDepartamento === 'todos' || depId === String(selectedDepartamento);
            const matchSearch = user.name?.toLowerCase().includes(search.toLowerCase());
            return matchDep && matchSearch;
        });
    }, [users, selectedDepartamento, search]);

    const handleSelect = (userId) => {
        setSelectedUser(userId);
        onSelect(userId);
    };

    return (
        <section className="w-full h-full flex flex-col overflow-hidden rounded-2xl"
            style={{ boxShadow: 'var(--shadow-card)' }}
        >
            {/* Header */}
            <div className="px-6 pt-6 pb-4"
                style={{ background: 'linear-gradient(135deg, var(--color-500), var(--color-700))' }}
            >
                <h2 className="text-xl font-bold text-white mb-1">Seleccionar receptor</h2>
                <p className="text-sm" style={{ color: 'var(--color-100)' }}>
                    Filtra por departamento y selecciona un usuario
                </p>
            </div>

            {/* Filtros */}
            <div className="px-6 py-4 flex flex-col gap-3 border-b"
                style={{ borderColor: 'var(--color-200)' }}
            >
                {/* Búsqueda con InputLogin */}
                <InputLogin
                    variant="primary"
                    type="text"
                    placeholder="Buscar usuario..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                {/* Filtro por departamento */}
                {departamentos.length > 0 && (
                    <DropDowm
                        options={departamentos}
                        defaultLabel="Todos los departamentos"
                        setUserDepartament={(val) => setSelectedDepartamento(val || 'todos')}
                    />
                )}
            </div>

            {/* Lista de usuarios */}
            <div className="flex-1 overflow-y-auto px-6 py-3">
                {filteredUsers.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full opacity-60">
                        <p className="text-sm" style={{ color: 'var(--text-primary)' }}>
                            No se encontraron usuarios
                        </p>
                    </div>
                ) : (
                    <div className="flex flex-col gap-2">
                        {filteredUsers.map(user => {
                            const depName = typeof user.departamento === 'object'
                                ? (user.departamento?.name || user.departamento?.nombre || '')
                                : (user.departamento || '');

                            return (
                                <div
                                    key={user.id}
                                    onClick={() => handleSelect(user.id)}
                                    className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-200"
                                    style={{
                                        background: selectedUser === user.id ? 'var(--color-100)' : 'transparent',
                                        border: selectedUser === user.id ? '2px solid var(--color-500)' : '2px solid transparent',
                                    }}
                                    onMouseEnter={(e) => {
                                        if (selectedUser !== user.id) {
                                            e.currentTarget.style.background = 'var(--color-50)';
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (selectedUser !== user.id) {
                                            e.currentTarget.style.background = 'transparent';
                                        }
                                    }}
                                >
                                    {/* Avatar */}
                                    <div
                                        className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0"
                                        style={{
                                            background: selectedUser === user.id
                                                ? 'var(--color-500)'
                                                : 'var(--color-300)',
                                        }}
                                    >
                                        {user.name?.charAt(0)?.toUpperCase() || '?'}
                                    </div>

                                    {/* Info */}
                                    <div className="flex flex-col flex-1 min-w-0">
                                        <span className="text-sm font-semibold truncate"
                                            style={{ color: 'var(--color-900)' }}
                                        >
                                            {user.name}
                                        </span>
                                        {depName && (
                                            <span className="text-xs truncate"
                                                style={{ color: 'var(--text-primary)' }}
                                            >
                                                {depName}
                                            </span>
                                        )}
                                    </div>

                                    {/* Check indicator */}
                                    {selectedUser === user.id && (
                                        <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                                            style={{ background: 'var(--color-500)' }}
                                        >
                                            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="px-6 py-4 flex gap-3 border-t"
                style={{ borderColor: 'var(--color-200)' }}
            >
                <Button
                    onClick={onSubmit}
                    value="Aceptar"
                    variant={selectedUser ? 'primary' : 'disabled'}
                    size="sm"
                    width="full"
                />
            </div>
        </section>
    );
}