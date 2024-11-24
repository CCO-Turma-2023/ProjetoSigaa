"use client";

import { useEffect, useState, useCallback } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import ptBR from "@fullcalendar/core/locales/pt-br";
import axios from "axios";
import DialogData from "../dialog";

export default function MyCalendar() {
  const [events, setEvents] = useState<any[]>([]);
  const [currentYear, setCurrentYear] = useState<number>(
    new Date().getFullYear(),
  );
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null);

  const fetchHolidays = useCallback(async (year: number) => {
    try {
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

      const extraEvents = [
        {
          title: "Entrega Trabalho Web",
          date: "2024-12-04",
          color: "blue",
          extendedProps: {
            description: "!!!!!",
          },
        },
        {
          title: "Treinamento",
          date: "2024-12-05",
          color: "green",
          extendedProps: {
            description: "Sessão de treinamento sobre novas ferramentas.",
          },
        },
        {
          title: "Prova 2",
          date: "2024-12-05",
          color: "green",
          extendedProps: {
            description: "Prova de revisão.",
          },
        },
      ];

      // Combina os eventos e remove duplicados (com base em título e data)
      const allEvents = [...holidayEvents, ...extraEvents];

      // Atualiza os eventos sem duplicação, verificando título e data
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
    } catch (error) {
      console.error(`Erro ao buscar feriados para o ano ${year}:`, error);
    }
  }, []);

  useEffect(() => {
    // Carrega os feriados e eventos extras ao inicializar ou quando o ano mudar
    fetchHolidays(currentYear);
  }, [currentYear, fetchHolidays]);

  const handleDatesSet = (arg: any) => {
    const newYear = new Date(arg.start).getFullYear();
    if (newYear !== currentYear) {
      setCurrentYear(newYear);
    }
  };

  const handleEventClick = (info: any) => {
    const { title, extendedProps, start } = info.event;
    const description = extendedProps?.description || "Nenhuma descrição";
    const eventDate = start
      ? start.toLocaleDateString("pt-BR")
      : "Data desconhecida";

    setSelectedEvent({ title, description, eventDate });
  };

  return (
    <div className="h-full w-[40rem] border border-white bg-[rgba(0,17,61,1)] p-2 text-white">
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
        locale={ptBR}
      />
    </div>
  );
}
