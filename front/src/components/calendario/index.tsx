import { useEffect, useState, useCallback } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import ptBR from "@fullcalendar/core/locales/pt-br";
import axios, { AxiosRequestConfig } from "axios";
import DialogData from "../dialog";
import DecodificarToken from "../../utils/tokenDecode";
import { User } from "../../pages/inicio/page";
import DialogEvento from "../dialogEventos";

export default function MyCalendar() {
  const [fecharComponente, setFecharComponente] = useState(true);
  const [fecharComponenteEditavel, setFecharComponenteEditavel] =
    useState(true);

  const [dataEscolhida, setDataEscolhida] = useState<string>("");
  const [eventos, setEventos] = useState<any[]>([]);
  const [anoAtual, setanoAtual] = useState<number>(new Date().getFullYear());
  const [selecionarEvento, setselecionarEvento] = useState<any | null>(null);

  const [editarEvento, setEditarEvento] = useState<any | null>(null);

  let usuario: User | null = DecodificarToken();

  // Pegar API e DB
  const pegarEventos = async (year: number) => {
    try {
      // Obter feriados
      const response = await axios.get(
        `https://brasilapi.com.br/api/feriados/v1/${year}`,
      );

      const feriadosEventos = response.data.map((feriados: any) => ({
        title: feriados.name,
        date: feriados.date,
        color: "red",
        extendedProps: {
          type: feriados.type,
        },
      }));

      const config: AxiosRequestConfig = {
        headers: {
          curso: usuario?.curso,
        },
      };

      const pegarEventos = await axios.get(
        "http://localhost:3200/eventos/pegarEventos",
        config,
      );

      let allEventos;

      if (pegarEventos.data) {
        allEventos = [...feriadosEventos, ...pegarEventos.data];
      } else {
        allEventos = [...feriadosEventos];
      }

      setEventos((prevEventos) => [
        ...prevEventos.filter(
          (event) =>
            !allEventos.some(
              (newEvent) =>
                newEvent.date === event.date && newEvent.title === event.title,
            ),
        ),
        ...allEventos,
      ]);

      // Atualizar localStorage
      localStorage.setItem("eventos", JSON.stringify(allEventos));
    } catch (error) {
      console.error(`Erro ao buscar feriados para o ano ${year}:`, error);
    }
  };

  // Ano atual e manter no localstorage as datas já obtidas
  useEffect(() => {
    const storedEventos = localStorage.getItem("eventos");
    if (storedEventos) {
      setEventos(JSON.parse(storedEventos));
    } else {
      pegarEventos(anoAtual);
    }
  }, []);

  // Pegar um ano novo
  const mudarAno = (arg: any) => {
    const newYear = new Date(arg.start).getFullYear();
    if (newYear !== anoAtual) {
      setanoAtual(newYear);
      pegarEventos(newYear);
    }
  };

  // Visualizar evento
  const visualizarEvento = (info: any) => {
    const { title, extendedProps, start, backgroundColor } = info.event;
    const description =
      extendedProps?.description || info.event.extendedProps.type;
    const eventDate = start
      ? start.toLocaleDateString("pt-BR")
      : "Data desconhecida";

    if (usuario?.type === 1 && description !== "national") {
      setDataEscolhida(info.dateStr);
      setFecharComponenteEditavel(false);
      setEditarEvento({
        title,
        description,
        eventDate,
        color: backgroundColor,
      });
    } else {
      setselecionarEvento({ title, description, eventDate });
    }
  };

  // Criar evento no dia
  const criarEvento = (info: any) => {
    if (usuario?.type === 1) {
      setDataEscolhida(info.dateStr);
      setFecharComponente(false);
    }
  };

  const adicionarEventos = (infos: any) => {
    setEventos((eventosAntigos) => [...eventosAntigos, infos]);
  };

  return (
    <div className="m-[3rem]">
      <h1 className="mb-[1rem] text-2xl font-bold text-white">Calendário</h1>
      <div>
        {!fecharComponente && (
          <DialogEvento
            fecharComponente={setFecharComponente}
            adicionarEventos={adicionarEventos}
            data={dataEscolhida}
            curso={usuario?.curso}
          />
        )}
        {!fecharComponenteEditavel && (
          <DialogEvento
            fecharComponente={setFecharComponenteEditavel}
            todosEventos={eventos}
            setEventos={setEventos}
            evento={editarEvento}
          />
        )}
        <div className="h-full border border-white bg-[rgba(0,17,61,1)] p-2 text-white sm:w-[20rem] sm:text-xs lg:w-[40rem] lg:text-[0.9rem]">
          {selecionarEvento && (
            <DialogData
              title={selecionarEvento.title}
              description={selecionarEvento.description}
              eventDate={selecionarEvento.eventDate}
              onClose={() => setselecionarEvento(null)}
            />
          )}
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            datesSet={mudarAno}
            events={eventos}
            eventClick={visualizarEvento}
            dateClick={criarEvento}
            locale={ptBR}
          />
        </div>
      </div>
    </div>
  );
}
