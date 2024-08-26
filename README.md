# Wrestling Tournament Management Application

## Project Overview

This application is designed to streamline the process of managing wrestling tournaments. It allows schools to input and manage wrestler data, including weight classes, season records, and tournament placements. The app is built using Next.js, React, and MongoDB, providing a robust and scalable solution for tournament organizers and participating schools.

### Key Features:

- User authentication for schools
- Data entry for wrestlers across various weight classes
- Season record tracking
- Tournament placement recording
- Data submission to tournament directors

## Installation Guide

### Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)
- MongoDB instance (local or cloud-based)

### Steps

1. Clone the repository:
   ```
   git clone https://github.com/your-username/wrestling-tournament-app.git
   cd wrestling-tournament-app
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add the following:
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. Run the development server:
   ```
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

- `/app`: Contains the main application code
- `/components`: Reusable React components
- `/lib`: Utility functions and database connection
- `/types`: TypeScript type definitions
- `/hooks`: Custom React hooks

## Key Components

### Login Component
```typescript
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../hooks/useAuth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await login(email, password);
      router.push('/admin');
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
```
### WrestlerForm Component
```typescript
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useWrestler } from '../hooks/useWrestler';

const WrestlerForm = () => {
  const [name, setName] = useState('');
  const [weightClass, setWeightClass] = useState('');
  const [seasonRecord, setSeasonRecord] = useState('');
  const [tournamentPlacements, setTournamentPlacements] = useState([]);
  const { user } = useAuth();
  const { addWrestler } = useWrestler();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await addWrestler({
        name,
        weightClass,
        seasonRecord,
        tournamentPlacements,
        schoolId: user.schoolId,
      });
      // Reset form fields
      setName('');
      setWeightClass('');
      setSeasonRecord('');
      setTournamentPlacements([]);
    } catch (error) {
      console.error('Error adding wrestler:', error);
    }
  };

  return (
    <div>
      <h1>Add Wrestler</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={(event) => setName(event.target.value)} />
        </label>
        <br />
        <label>
          Weight Class:
          <input type="text" value={weightClass} onChange={(event) => setWeightClass(event.target.value)} />
        </label>
        <br />
        <label>
          Season Record:
          <input type="text" value={seasonRecord} onChange={(event) => setSeasonRecord(event.target.value)} />
        </label>
        <br />
        <label>
          Tournament Placements:
          <textarea value={tournamentPlacements.join(', ')} onChange={(event) => setTournamentPlacements(event.target.value.split(', '))} />
        </label>
        <br />
        <button type="submit">Add Wrestler</button>
      </form>
    </div>
  );
};

export default WrestlerForm;
```
### API Routes
- Login: `/app/api/login/route.ts`
- Submit Wrestler Data: `/app/api/submit-wrestler-data/route.ts`
- Get Wrestler Data: `/app/api/get-wrestler-data/route.ts`

## Testing

Run the test suite with:
```
npm test
```

## Deployment

This application can be deployed to platforms like Vercel or Netlify. Ensure that you set up the environment variables in your deployment platform's settings.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
