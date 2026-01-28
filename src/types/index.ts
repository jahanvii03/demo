export type Message = {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp?: string;
  suggestions?: string[];
};
