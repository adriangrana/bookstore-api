# Hexagonal Architecture Project

Seed project for hexagonal architecture with Node.js and TypeScript.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Folder Structure](#folder-structure)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Introduction

This project is a seed project to demonstrate the implementation of hexagonal architecture (also known as ports and adapters) using Node.js, TypeScript, Express, and MongoDB. Hexagonal architecture aims to decouple the core business logic from the infrastructure, making the application more modular, testable, and maintainable.

## Features

- **Hexagonal Architecture**: Clean separation of concerns between business logic and infrastructure.
- **Node.js**: JavaScript runtime for server-side development.
- **TypeScript**: Statically typed superset of JavaScript.
- **Express**: Fast, unopinionated, minimalist web framework for Node.js.
- **MongoDB**: NoSQL database for storing user data.
- **Swagger**: API documentation and testing.

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/hexagonal-architecture-project.git
   cd hexagonal-architecture-project

2. **Install dependencies:**

	```bash
	npm install

3. **Set up MongoDB:**

    You can use a local MongoDB instance or use Docker to run MongoDB. To run MongoDB using Docker,       use the following command:

	```bash
	docker run -d --name mongodb_hexagonal_project -p 27017:27017 -e MONGO_INITDB_DATABASE=test mongo

4. **Configure environment variables:**

    Create a .env file in the root directory and add your MongoDB connection string:

    ```bash
    # .env file
    MONGO_URI=mongodb://localhost:27017/test

5. **Compile TypeScript:**

    ```bash
    npm run build

## Usage

1. **Start the server:**

    ```bash
    npm run start

2. **Access the API documentation:**
Open your browser and navigate to http://localhost:3000/api-docs to view the Swagger UI for API documentation and testing.

## API Documentation
The API documentation is provided by Swagger. You can access it at http://localhost:3000/api-docs once the server is running.

## Folder Structure
```arduino
src/
├── application/
│   ├── services/
│   │   └── userService.ts
├── domain/
│   ├── entities/
│   │   └── user.ts
│   ├── repositories/
│   │   └── userRepository.ts
├── infrastructure/
│   ├── controllers/
│   │   └── userController.ts
│   ├── database/
│   │   ├── mongoose.ts
│   │   └── mongooseUserRepository.ts
│   ├── routes/
│   │   └── userRoutes.ts
│   └── config/
│       └── swaggerConfig.ts
├── app.ts
└── server.ts
```

## Technologies Used
- Node.js
- TypeScript
- Express
- MongoDB
- Mongoose
- Swagger

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any changes.

## License
This project is licensed under the MIT License.