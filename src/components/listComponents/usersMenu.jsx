
export default function UsersMenu({users, onSelect}) {
    return (
        <>
            {users.map(user => (
                <div key={user.id}>
                    <p onClick={() => onSelect(user.id)} className="text-center">{user.name}</p>
                </div>
            ))}
        </>
    )
}