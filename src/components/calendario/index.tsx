import { Calendar } from "rsuite";

export default function MyCalendar() {
  const handleDateClick = (arg: any) => {
    alert(`Você clicou na data: ${arg.dateStr}`);
  };

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth" // Define a visualização inicial
        editable={true} // Permite arrastar eventos
        selectable={true} // Permite selecionar datas
        dateClick={(info: any) => {
          handleDateClick(info);
        }} // Evento ao clicar em uma data
        events={[
          { title: "Evento 1", date: "2024-11-25" },
          { title: "Evento 2", date: "2024-11-26" },
        ]} // Lista de eventos
      />
    </div>
  );
}
