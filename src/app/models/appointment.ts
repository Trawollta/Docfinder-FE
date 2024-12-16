export interface Appointment {
  doctor: {
    id: number;
    name: string;   
  };
  date: string;     
  start_time: string; 
  end_time: string;   
}
