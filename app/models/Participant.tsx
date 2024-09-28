export interface Participant {
    eventId: string;
    userId: string;
    status: 'confirmed' | 'pending' | 'canceled';
    joinedAt: string; // ISO 8601 format
  }  