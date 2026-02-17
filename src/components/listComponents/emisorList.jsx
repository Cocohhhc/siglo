
export default function EmisorList({emisor}) {
    return (
        <div>
            {emisor.map(emisor => (
                <p key={emisor.id}>{emisor.name}</p>
            ))}
        </div>
    );
}