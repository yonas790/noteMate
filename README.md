# Note Taking App

A simple note-taking application built with Flutter, Node.js, and MySQL.

## Project Structure
- `backend/` - Node.js server code
- `frontend/` - Flutter application code

## Database Schema

The application uses MySQL with the following schema:

```sql
CREATE TABLE notes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Field Descriptions
- `id`: Unique identifier for each note (auto-incrementing)
- `title`: Note title (required, max 255 characters)
- `content`: Note content (optional, can store large text)
- `created_at`: Timestamp of note creation (automatically set)

## Setup Instructions

### Backend Setup
1. Install Node.js dependencies:
```bash
cd backend
npm install
```

2. Set up MySQL database:
- Create a database named `notes_db`
- Update the database configuration in `backend/config/db.config.js`

3. Start the server:
```bash
npm start
```

### Frontend Setup
1. Make sure you have Flutter installed
2. Install dependencies:
```bash
cd frontend
flutter pub get
```

3. Run the app:
```bash
flutter run
```

## Features
- Create new notes
- View all notes (shared notes)
- Update existing notes
- Delete notes  