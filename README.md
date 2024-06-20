# Bookstore API

API for bookstore application.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Folder Structure](#folder-structure)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)


## Features

- **Hexagonal Architecture**: Clean separation of concerns between business logic and infrastructure.
- **Node.js**: JavaScript runtime for server-side development.
- **TypeScript**: Statically typed superset of JavaScript.
- **Express**: Fast, unopinionated, minimalist web framework for Node.js.
- **MongoDB**: NoSQL database for storing book data.
- **Swagger**: API documentation and testing.
- **Jest**: JavaScript library for creating, running, and structuring tests.

## Installation



2. **Install dependencies:**

	```bash
	npm install

3. **Set up MongoDB:**

    You can use a local MongoDB instance or use Docker to run MongoDB. To run MongoDB using Docker,       use the following command:

	```bash
	docker run -d --name mongodb_bookstore_project -p 27017:27017 -e MONGO_INITDB_DATABASE=bookstore mongo

4. **Configure environment variables:**

    Create a .env file in the root directory and add your MongoDB connection string:

    ```bash
    # .env file
    MONGO_URI=mongodb://localhost:27017/bookstore
    PORT=3000

5. **Compile TypeScript:**

    ```bash
    npm run build

## Usage

1. **Test the code:**

    ```bash
    npm run test

2. **Test the code with coverage:**

    ```bash
    npm run test:cov

3. **Start the server:**

    ```bash
    npm run start

4. **Access the API documentation:**
Open your browser and navigate to http://localhost:3000/api-docs to view the Swagger UI for API documentation and testing.

## API Documentation
The API documentation is provided by Swagger. You can access it at http://localhost:3000/api-docs once the server is running.

## Folder Structure
```arduino
src/
├── application/
│   ├── services/
│   │   └── bookService.ts
│   │   └── bookService.test.ts
├── domain/
│   ├── entities/
│   │   └── book.ts
│   ├── repositories/
│   │   └── bookRepository.ts
├── infrastructure/
│   ├── config/
│   │   └── swaggerConfig.ts
│   ├── controllers/
│   │   └── bookController.ts
│   │   └── bookController.test.ts
│   ├── database/
│   │   ├── mongoose.ts
│   │   └── mongoose.test.ts
│   │   └── mongooseBookRepository.ts
│   │   └── mongooseBookRepository.test.ts
│   ├── routes/
│   │   └── bookRoutes.ts
│   └── config/
│       └── swaggerConfig.ts
├── app.ts
├── app.test.ts
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