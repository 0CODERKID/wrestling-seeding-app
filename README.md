# Wrestling Seeding App

This is a [Next.js](https://nextjs.org/) project for managing wrestling tournament data, including wrestler information and seeding criteria.

## Getting Started

### Prerequisites

Ensure you have the following installed on your machine:
- Node.js (v14 or later)
- npm (v6 or later) or yarn (v1.22 or later)
- MongoDB (local or cloud instance)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/wrestling-seeding-app.git
   cd wrestling-seeding-app
   ```

2. **Install dependencies:**

   Using npm:
   ```bash
   npm install
   ```

   Using yarn:
   ```bash
   yarn install
   ```

3. **Set up environment variables:**

   Create a `.env.local` file in the root directory and add the following variables:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. **Seed the database (optional for testing):**

   If you want to seed the database with test data, run:
   ```bash
   node seed-test-db.js
   ```

5. **Run the development server:**

   Using npm:
   ```bash
   npm run dev
   ```

   Using yarn:
   ```bash
   yarn dev
   ```

   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Running Tests

To run the tests, use the following commands:

Using npm:
```bash
npm run test
```

Using yarn:
```bash
yarn test
```

For watch mode:
```bash
npm run test:watch
```
or
```bash
yarn test:watch
```

### Project Structure

- **`app/`**: Contains the main application components and pages. This is where the core of your Next.js application resides. For example, `app/page.tsx` is the main page component.
  ```typescript:app/page.tsx
  startLine: 1
  endLine: 122
  ```

- **`lib/`**: Contains utility functions and MongoDB client setup. For instance, `lib/mongodb.ts` sets up the MongoDB client connection.
  ```typescript:lib/mongodb.ts
  startLine: 1
  endLine: 37
  ```

- **`types/`**: Contains TypeScript type definitions. This helps in maintaining type safety across the application. For example, `types/wrestler.d.ts` defines the structure of wrestler data.
  ```typescript:types/wrestler.d.ts
  startLine: 1
  endLine: 18
  ```

- **`__tests__/`**: Contains test files. These are used to ensure the functionality of your application through unit and integration tests. For example, `__tests__/sample.test.js` is a simple test file.
  ```javascript:__tests__/sample.test.js
  startLine: 1
  endLine: 5
  ```

### API Routes

- **POST `/api/submit-wrestler-data`**: Submits wrestler data.
  ```typescript:app/api/submit-wrestler-data/route.ts
  startLine: 1
  endLine: 31
  ```

- **GET `/api/get-wrestler-data`**: Retrieves wrestler data.
  ```typescript:app/api/get-wrestler-data/route.ts
  startLine: 1
  endLine: 28
  ```

- **GET `/api/get-schools`**: Retrieves the list of schools.
  ```typescript:app/api/get-schools/route.ts
  startLine: 1
  endLine: 21
  ```

### Additional Explanations

- **Environment Variables**: The application relies on environment variables for configuration, such as `MONGODB_URI` for the MongoDB connection string and `JWT_SECRET` for JWT authentication. These should be set in a `.env.local` file.

- **Database Seeding**: The `seed-test-db.js` script is used to populate the database with initial test data. This is useful for development and testing purposes.
  ```javascript:seed-test-db.js
  startLine: 1
  endLine: 37
  ```

- **Authentication**: The application uses JWT for authentication. The `JWT_SECRET` environment variable is used to sign the tokens. The login API route handles the authentication logic.
  ```typescript:app/api/login/route.ts
  startLine: 1
  endLine: 31
  ```

- **Component Structure**: The application is built using React components. For example, `WrestlerForm` is a component used to handle the form for entering wrestler data.
  ```typescript:app/components/WrestlerForm.tsx
  startLine: 1
  endLine: 200
  ```

### Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

### Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.