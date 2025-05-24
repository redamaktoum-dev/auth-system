# Auth System

A scalable authentication system built with **Express**, **Node.js**, and **TypeScript**.  
Uses **PostgreSQL** for data persistence and **Redis** for session management.

## Features

- Modular, feature-based folder structure with separation of concerns
- Type-safe database access via **DrizzleORM**
- Input validation using **Zod**
- Robust error handling with a custom `AppError` class and global error middleware
- Secure session handling using Redis-backed sessions

## Tech Stack

- Node.js & Express
- TypeScript
- PostgreSQL
- Redis
- DrizzleORM
- Zod

## Getting Started

### Prerequisites

- Node.js >= 16.x
- PostgreSQL
- Redis

### Installation

1. Clone the repo:

   ```bash
   git clone git@github.com:redamaktoum-dev/auth-system.git
   ```

2. Change into the project directory:

   ```bash
   cd auth-system
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Copy `.env.example` to `.env`:

   ```bash
   cp .env.example .env
   ```

5. Open the `.env` file and fill in your own environment variables.

6. Push migrations:

   ```bash
   npx drizzle-kit push
   ```

7. Start the development server:

   ```bash
   npm run dev
   ```

## Contributing

Feel free to open issues or pull requests for improvements or questions!  
Contributions are always welcome to help make this project better.

## License

This project is licensed under the [MIT License](./LICENSE).
