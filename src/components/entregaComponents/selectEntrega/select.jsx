import Button from "@/src/components/ui/button/button";

export default function SelectEntrega({activeTab, setActiveTab}) {
    return (
        <article className="">
            <div className="">
                <h1 className="text-(length:--h1)">Hacer nueva entrega</h1>
            </div>
            <div className="flex items-center gap-4">
                <Button value="Hacer nueva entrega" variant="primary" size="sm" />
                <Button 
                    value="Entregas recibidas" 
                    variant={activeTab === 'recibidas' ? 'primary' : 'history'} 
                    size="sm" 
                    onClick={() => setActiveTab('recibidas')}
                />
                <Button 
                    value="Entregas enviadas" 
                    variant={activeTab === 'enviadas' ? 'primary' : 'history'} 
                    size="sm" 
                    onClick={() => setActiveTab('enviadas')}
                />
                <Button 
                    value="Entregas aceptadas" 
                    variant={activeTab === 'aceptadas' ? 'primary' : 'history'} 
                    size="sm" 
                    onClick={() => setActiveTab('aceptadas')}
                />
                <Button 
                    value="Entregas rechazadas" 
                    variant={activeTab === 'rechazadas' ? 'primary' : 'history'} 
                    size="sm" 
                    onClick={() => setActiveTab('rechazadas')}
                />
            </div>
        </article>
    )
}