"use client";

import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import ptBR from "@fullcalendar/core/locales/pt-br"; // Importando o idioma
import axios from "axios";

const MyCalendar = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [currentYear, setCurrentYear] = useState<number>(
    new Date().getFullYear(),
  ); // Ano inicial

  const fetchHolidays = async (year: number) => {
    try {
      const response = await axios.get(
        `https://brasilapi.com.br/api/feriados/v1/${year}`,
      );

      // Transformar os feriados em eventos
      const holidayEvents = response.data.map((holiday: any) => ({
        title: holiday.name,
        date: holiday.date,
        color: "red", // Cor dos feriados
        extendedProps: {
          type: holiday.type, // Tipo do feriado
        },
      }));

      // Atualizar os eventos no estado
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
        title: "Reunião de Equipe",
        date: "2024-12-01",
        color: "blue",
        extendedProps: {
          description: "Reunião mensal com a equipe.",
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

    // Adiciona os eventos personalizados
    setEvents((prevEvents) => [...prevEvents, ...extraEvents]);
  };

  useEffect(() => {
    // Busca os feriados quando o ano muda
    fetchHolidays(currentYear);
  }, [currentYear]);

  useEffect(() => {
    // Adiciona eventos extras ao carregar o componente
    addExtraEvents();
  }, []);

  const handleDatesSet = (arg: any) => {
    const newYear = new Date(arg.start).getFullYear(); // Ano do intervalo visível no calendário
    if (newYear !== currentYear) {
      setCurrentYear(newYear); // Atualiza o ano se mudou
    }
  };

  const handleDateClick = (arg: any) => {
    alert(`Você clicou na data: ${arg.dateStr}`);
  };

  return (
    <div className="h-full w-[50rem] border border-white bg-[rgba(0,17,61,1)] p-2 text-white">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        editable={true}
        selectable={true}
        dateClick={(info) => {
          handleDateClick(info);
        }}
        datesSet={handleDatesSet} // Callback para capturar o intervalo visível
        events={events}
        eventClick={(info) => {
          alert(
            `Evento: ${info.event.title}\nDescrição: ${
              info.event.extendedProps?.description || "Nenhuma descrição"
            }`,
          );
        }}
        locale={ptBR} // Definindo o idioma para pt-br
      />
    </div>
  );
};

export default MyCalendar;
