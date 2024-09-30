export interface Event {
  title: string;
  description: string;
  location: string;
  date: string; // ISO 8601 format
  time: string;
  adminId: string; // ID of the user who is the organizer
  maxParticipants?: number;
  imageUrl?: string;
  createdAt: string; // ISO 8601 format
  updatedAt?: string; // ISO 8601 format
}