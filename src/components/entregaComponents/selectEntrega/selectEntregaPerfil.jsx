import Button from "@/src/components/ui/button/button";

export default function SelectEntrega({activeTab, setActiveTab}) {
    return (
        <article className="">
            <div className="">
                <h1 className="text-(length:--h1)">Entregas</h1>
                <p className="text-(length:--p)">Aquí puedes ver tus entregas enviadas y aceptadas</p>
            </div>
            <div className="flex items-center gap-4">
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
            </div>
        </article>
    )
}