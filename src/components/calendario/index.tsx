"use client";

import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import ptBR from "@fullcalendar/core/locales/pt-br"; // Importando o idioma
import axios from "axios";
import DialogData from "../dialog";

const MyCalendar = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [currentYear, setCurrentYear] = useState<number>(
    new Date().getFullYear(),
  );
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null); // Estado para armazenar o evento selecionado

  const fetchHolidays = async (year: number) => {
    try {
      const response = await axios.get(
        `https://brasilapi.com.br/api/feriados/v1/${year}`,
      );

      const holidayEvents = response.data.map((holiday: any) => ({
        title: holiday.name,
        date: holiday.date,
        color: "red", // Cor dos feriados
        extendedProps: {
          type: holiday.type, // Tipo do feriado
        },
      }));

      setEvents((prevEvents) => [
        ...prevEvents.filter((event) => !event.extendedProps?.type), // Remove feriados antigos
        ...holidayEvents,
      ]);
    } catch (error) {
      console.error(`Erro ao buscar feriados para o ano ${year}:`, error);
    }
  };

  const addExtraEvents = () => {
    const extraEvents = [
      {
        title: "Prova do japones fia da puta",
        date: "2024-12-04",
        color: "blue",
        extendedProps: {
          description: "ARROMBADO",
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
          description: "Sessão de treinamento sobre novas ferramentas.",
        },
      },
    ];

    setEvents((prevEvents) => [...prevEvents, ...extraEvents]);
  };

  useEffect(() => {
    fetchHolidays(currentYear);
  }, [currentYear]);

  useEffect(() => {
    addExtraEvents();
  }, []);

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
      : "Data desconhecida"; // Formata a data do evento

    setSelectedEvent({ title, description, eventDate }); // Armazena o evento completo
  };

  return (
    <div className="h-full w-[40rem] border border-white bg-[rgba(0,17,61,1)] p-2 text-white">
      {selectedEvent && (
        <DialogData
          title={selectedEvent.title}
          description={selectedEvent.description}
          eventDate={selectedEvent.eventDate} // Passa a data para o DialogData
          onClose={() => setSelectedEvent(null)} // Função para fechar o diálogo
        />
      )}
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        editable={true}
        selectable={true}
        datesSet={handleDatesSet}
        events={events}
        eventClick={(info) => {
          handleEventClick(info); // Passa o evento para ser exibido no DialogData
        }}
        locale={ptBR}
      />
    </div>
  );
};

export default MyCalendar;
