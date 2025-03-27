# AIX Comms - Vanilla TypeScript Version

This is the vanilla TypeScript version of the AIX Comms application, built using Web Components and TypeScript.

## Features

- Web Components-based architecture
- TypeScript for type safety
- WebSocket communication
- Authentication system
- Game lobby system
- Real-time game state management

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## Installation

1. Clone the repository
2. Navigate to the vanilla directory:
   ```bash
   cd vanilla
   ```
3. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

## Development

To start the development server:

```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:3000`.

## Building for Production

To build the application for production:

```bash
npm run build
# or
yarn build
```

To preview the production build:

```bash
npm run preview
# or
yarn preview
```

## Project Structure

```
vanilla/
├── src/
│   ├── components/     # Web Components
│   ├── services/       # Application services
│   ├── types/         # TypeScript type definitions
│   ├── utils/         # Utility functions
│   ├── constants/     # Constants and configuration
│   ├── engine/        # Game engine
│   ├── stores/        # State management
│   ├── main.ts        # Application entry point
│   └── index.css      # Global styles
├── index.html         # HTML entry point
├── tsconfig.json      # TypeScript configuration
├── vite.config.ts     # Vite configuration
└── package.json       # Project dependencies
```

## Authentication

The application supports two quick login shortcuts:

- Press 'R' to login as admin@tyenet.com
- Press 'T' to login as admin1@tyenet.com

## License

This project is proprietary and confidential.
