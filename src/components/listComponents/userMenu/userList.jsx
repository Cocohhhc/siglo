'use client';
import { HiCheck, HiOutlineBuildingOffice, HiOutlineMagnifyingGlass } from "react-icons/hi2";

// ── Clases de Tailwind por departamento para badges ──
const DEP_STYLES = [
    { bg: 'bg-red-50', text: 'text-red-600', border: 'border-red-200' },
    { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200' },
    { bg: 'bg-green-50', text: 'text-green-600', border: 'border-green-200' },
    { bg: 'bg-yellow-50', text: 'text-yellow-600', border: 'border-yellow-200' },
    { bg: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-200' },
    { bg: 'bg-orange-50', text: 'text-orange-600', border: 'border-orange-200' },
    { bg: 'bg-teal-50', text: 'text-teal-600', border: 'border-teal-200' },
    { bg: 'bg-pink-50', text: 'text-pink-600', border: 'border-pink-200' },
];

function getDepStyle(depId) {
    const idx = ((Number(depId) || 0) - 1) % DEP_STYLES.length;
    return DEP_STYLES[idx >= 0 ? idx : 0];
}

export default function UserList({ users, selectedUser, handleSelect }) {
    return (
        <div className="flex-1 overflow-y-auto px-6 py-3">
            {users.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full opacity-60">
                    <HiOutlineMagnifyingGlass className="w-12 h-12 text-(--color-300) mb-3" />
                    <p className="text-sm text-(--text-primary)">
                        No se encontraron usuarios
                    </p>
                </div>
            ) : (
                <div className="flex flex-col gap-2">
                    {users.map(user => {
                        const depName = typeof user.departamento === 'object'
                            ? (user.departamento?.name || user.departamento?.nombre || '')
                            : (user.departamento || '');

                        const depId = typeof user.departamento === 'object'
                            ? user.departamento?.id
                            : user.departamentoId;

                        const depStyle = getDepStyle(depId);
                        const isSelected = selectedUser === user.id;

                        return (
                            <div
                                key={user.id}
                                onClick={() => handleSelect(user.id)}
                                className={`
                                    flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-200 border-2
                                    ${isSelected 
                                        ? 'bg-(--color-100) border-(--color-500)' 
                                        : 'bg-transparent border-transparent hover:bg-(--color-50)'}
                                `}
                            >
                                {/* Avatar */}
                                <div
                                    className={`
                                        w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0 transition-colors
                                        ${isSelected ? 'bg-(--color-500)' : 'bg-(--color-300)'}
                                    `}
                                >
                                    {user.name?.charAt(0)?.toUpperCase() || '?'}
                                </div>

                                {/* Info */}
                                <div className="flex flex-col flex-1 min-w-0 gap-1">
                                    <span className="text-sm font-semibold truncate text-(--color-900)">
                                        {user.name}
                                    </span>
                                    {depName && (
                                        <span className={`
                                            inline-flex items-center gap-1 overflow-hidden text-[0.7rem] font-bold px-2 py-0.5 rounded-full border w-fit leading-tight tracking-wide
                                            ${depStyle.bg} ${depStyle.text} ${depStyle.border}
                                        `}>
                                            <HiOutlineBuildingOffice className="w-3 h-3 shrink-0" />
                                            <span className="truncate">{depName}</span>
                                        </span>
                                    )}
                                </div>

                                {/* Check indicator */}
                                {isSelected && (
                                    <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 bg-(--color-500)">
                                        <HiCheck className="w-3.5 h-3.5 text-white stroke-[3px]" />
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
