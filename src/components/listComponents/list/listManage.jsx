import List from "./list";
import NotFound from "@/src/components/ui/notFound/notFound";

export default function ListManage({ info, buttonUpdate, buttonCreate }) {
    return(    
        <div className="flex flex-col gap-4">
            {info.length > 0 ? info.map(item => (
                <div key={item.id}>
                    <List info={item} buttonCreate={buttonCreate} buttonUpdate={buttonUpdate}/>
                </div>
            )) 
            : 
                <NotFound message="No se encontraron resultados" /> 
            }
        </div>
    )
}