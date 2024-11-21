export interface Task {
  id: number;
  name: string;
  description: string;
  assignee: string;
  priority: 'Low' | 'Medium' | 'High';
  status: 'To do' | 'In progress' | 'Completed';
}