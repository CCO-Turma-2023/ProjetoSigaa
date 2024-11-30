import DiscMatricula from "../../components/subMenuMatriculas";

export default function CriarTurma() {


  return (
    <div className="align-center flex h-screen w-full flex-1 flex-col justify-center bg-backgroundLinear">
      <div className="ml-[2rem] flex h-[90%] w-[95%] flex-col bg-white">
        <div className=" m-[1rem] ml-[2rem] text-3xl flex">
          <h1> 1° Semestre - 2025</h1>
        </div>
        <div className="mb-3 ml-4 flex h-[3px] w-[97%] bg-[#d0d2d3]"></div>
        <div className="min-h-[60%] max-h-[60%] overflow-auto">
            <div className=" flex flex-row flex-wrap w-full gap-[2rem] justify-center">
              <DiscMatricula />
              <DiscMatricula />
              <DiscMatricula />
              <DiscMatricula />
              <DiscMatricula />
              <DiscMatricula />
              <DiscMatricula />
              <DiscMatricula />
              <DiscMatricula />
              <DiscMatricula />
          </div>
        </div>
        
        <div className="flex flex-col gap-[2rem] mb-2 h-1/4 w-full justify-center items-center text-center">
          <div className="ml-4 flex h-[3px] w-[97%] bg-[#d0d2d3]"></div>
          <button className="w-[10%] h-[4rem] border border-xl rounded-lg bg-[#1f73f7]">Criar Nova Turma</button>
        </div>
      </div>
    </div>
  );
}

/*
<div className="align-center flex h-screen w-full flex-1 flex-col justify-center bg-backgroundLinear">
<div className="m-[2rem] h-[90%] w-[95%] overflow-x-auto bg-white p-3">
  <h1 className="m-[1rem] text-3xl">Histórico de Turmas</h1>
  <div className="m-[1.2rem] flex flex-col gap-4 overflow-auto">
    <Disciplina disciplina={disc} />
    <Disciplina disciplina={disc} />
    <Disciplina disciplina={disc} />
    <Disciplina disciplina={disc} />
    <Disciplina disciplina={disc} />
    <Disciplina disciplina={disc} />
    <Disciplina disciplina={disc} />
  </div>
</div>
</div>
*/