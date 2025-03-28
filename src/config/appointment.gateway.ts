import { Appointment } from '@/appointments/entities/appointment.entity';
import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*', 
  },
})
export class AppointmentGateway {
  @WebSocketServer()
  server: Server;

  // Método para emitir el evento al crear una cita
  sendAppointmentUpdate(appointment: Appointment) {
    this.server.emit('appointmentCreated', appointment);
  }

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    console.log('Mensaje recibido:', payload);
    return 'Mensaje recibido en el servidor';
  }
}
