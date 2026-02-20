export default function UserList({ users, selectedUser, handleSelect }) {
    return (
        <div className="flex-1 overflow-y-auto px-6 py-3">
            {users.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full opacity-60">
                    <p className="text-sm" style={{ color: 'var(--text-primary)' }}>
                        No se encontraron usuarios
                    </p>
                </div>
            ) : (
                <div className="flex flex-col gap-2">
                    {users.map(user => {
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
     )
}
