"use client";

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
import DialogCriarEvento from "../dialogCriarEvento";
import DialogEditarEvento from "../dialogEditarEvento";

interface Event {
  title: string; // Título do evento
  date: string; // Data no formato ISO (YYYY-MM-DD)
  color: string; // Cor do evento
  extendedProps?: {
    description?: string; // Descrição do evento (opcional)
  };
}

export default function MyCalendar() {
  const [fecharComponente, setFecharComponente] = useState(true);
  const [fecharComponenteEditavel, setFecharComponenteEditavel] =
    useState(true);

  const [dataEscolhida, setDataEscolhida] = useState<string>("");
  const [events, setEvents] = useState<any[]>([]);
  const [currentYear, setCurrentYear] = useState<number>(
    new Date().getFullYear(),
  );
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null);

  const [editarEvento, setEditarEvento] = useState<any | null>(null);

  let usuario: User | null = DecodificarToken();

  // Pegar API e DB
  const fetchHolidays = useCallback(async (year: number) => {
    try {
      // Obter feriados
      const response = await axios.get(
        `https://brasilapi.com.br/api/feriados/v1/${year}`,
      );

      const holidayEvents = response.data.map((holiday: any) => ({
        title: holiday.name,
        date: holiday.date,
        color: "red",
        extendedProps: {
          type: holiday.type,
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

      let allEvents;

      if (pegarEventos.data) {
        allEvents = [...holidayEvents, ...pegarEventos.data];
      } else {
        allEvents = [...holidayEvents];
      }

      setEvents((prevEvents) => [
        ...prevEvents.filter(
          (event) =>
            !allEvents.some(
              (newEvent) =>
                newEvent.date === event.date && newEvent.title === event.title,
            ),
        ),
        ...allEvents,
      ]);

      // Atualizar localStorage
      localStorage.setItem("events", JSON.stringify(allEvents));
    } catch (error) {
      console.error(`Erro ao buscar feriados para o ano ${year}:`, error);
    }
  }, []);

  // Ano atual e manter no localstorage as datas já obtidas
  useEffect(() => {
    const storedEvents = localStorage.getItem("events");
    if (storedEvents) {
      setEvents(JSON.parse(storedEvents));
    } else {
      fetchHolidays(currentYear);
    }
  }, [fetchHolidays]);

  // Caso mudar de ano
  useEffect(() => {
    fetchHolidays(currentYear);
  }, [currentYear]);

  // Pegar um ano novo
  const handleDatesSet = (arg: any) => {
    const newYear = new Date(arg.start).getFullYear();
    if (newYear !== currentYear) {
      setCurrentYear(newYear);
    }
  };

  // Visualizar evento
  const handleEventClick = (info: any) => {
    const { title, extendedProps, start } = info.event;
    const description =
      extendedProps?.description || info.event.extendedProps.type;
    const eventDate = start
      ? start.toLocaleDateString("pt-BR")
      : "Data desconhecida";

    if (usuario?.type === 1) {
      setDataEscolhida(info.dateStr);
      setFecharComponenteEditavel(false);
      setEditarEvento({ title, description, eventDate });
    } else {
      setSelectedEvent({ title, description, eventDate });
    }
  };

  // Criar evento no dia
  const handleDateClick = (info: any) => {
    if (usuario?.type === 1) {
      setDataEscolhida(info.dateStr);
      setFecharComponente(false);
    }
  };

  const adicionarEventos = (infos: any) => {
    setEvents((eventosAntigos) => [...eventosAntigos, infos]);
  };

  return (
    <div>
      {!fecharComponente && (
        <DialogCriarEvento
          fecharComponente={setFecharComponente}
          adicionarEventos={adicionarEventos}
          data={dataEscolhida}
          curso={usuario?.curso}
        />
      )}
      {!fecharComponenteEditavel && (
        <DialogEditarEvento
          fecharComponenteEditavel={setFecharComponenteEditavel}
          evento={editarEvento}
          todosEvents={events}
          setEvents={setEvents}
        />
      )}
      <div className="h-full border border-white bg-[rgba(0,17,61,1)] p-2 text-white sm:w-[20rem] sm:text-xs lg:w-[45rem] lg:text-[0.9rem]">
        {selectedEvent && (
          <DialogData
            title={selectedEvent.title}
            description={selectedEvent.description}
            eventDate={selectedEvent.eventDate}
            onClose={() => setSelectedEvent(null)}
          />
        )}
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          editable={true}
          selectable={true}
          datesSet={handleDatesSet}
          events={events}
          eventClick={handleEventClick}
          dateClick={handleDateClick}
          locale={ptBR}
        />
      </div>{" "}
    </div>
  );
}
