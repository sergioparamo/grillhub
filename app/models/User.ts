export interface User {
  firstName: string;
  lastName: string;
  email: string;
  profileImageUrl?: string; // Optional profile image
  phone?: string; // Optional phone number
  createdAt?: string; // ISO 8601 format
  updatedAt?: string; // ISO 8601 format
  eventsOrganized?: string[]; // List of event IDs organized by this user
  eventsAttended?: string[]; // List of event IDs this user has attended
}  