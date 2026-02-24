'use client';
import { useState, useMemo } from "react";

// Components
import Button from "@/src/components/ui/button/button";
import InputLogin from "@/src/components/ui/inputs/inputs";
import DropDowm from "@/src/components/ui/dropDown/dropDown";
import UserList from "./userList";

export default function UsersMenu({ users, onSelect, onSubmit }) {
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedDepartamento, setSelectedDepartamento] = useState('todos');
    const [search, setSearch] = useState('');
    // Extraer departamentos únicos
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
        <section className="w-full h-full flex flex-col overflow-hidden rounded-2xl shadow-(--shadow-card)"
        >
            {/* Header */}
            <div className="px-6 pt-6 pb-4 bg-linear-to-br from-(--color-500) to-(--color-700)"
            >
                <h2 className="text-xl font-bold text-white mb-1">Seleccionar receptor</h2>
                <p className="text-sm text-(--color-100)">
                    Filtra por departamento y selecciona un usuario
                </p>
            </div>

            {/* Filtros */}
            <div className="px-6 py-4 flex flex-col gap-3 border-b border-(--color-200)"
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
            <UserList
                users={filteredUsers}
                selectedUser={selectedUser}
                handleSelect={handleSelect}
            />

            {/* Footer */}
            <div className="px-6 py-4 flex gap-3 border-t border-(--color-200)"
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