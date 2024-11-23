
export interface PropsDisciplina {
    codigo: string;
    nome: string;
    periodo: string;
    ano: string;
    horarios: [string];
    situacao: string;
}

export default function Disciplina ({disciplina} : {disciplina: PropsDisciplina}){

    
    return (
        <div>
            <h2 className="mb-[1rem]">{disciplina.codigo} - {disciplina.nome}</h2>
            <div className="flex gap-[5rem]">
                <div className="flex flex-col">
                    <p>Período/Ano</p>
                    <p>{disciplina.periodo}/{disciplina.ano}</p>
                </div>
                
                <div className="flex flex-col">
                    <p>Horário</p>
                    <p>{disciplina.horarios}</p>   
                </div>
                
                <div className="flex flex-col">
                    <p>Situação</p>
                    <p>{disciplina.situacao}</p>
                </div>
                
                <div className="flex flex-col">
                    {disciplina.situacao !== "Trancado" &&
                    <>
                        <p>Ações</p>
                        <button>Solicitar trancamento</button> 
                    </>
                    }
                </div>
                
            </div>
        </div>
    )
}