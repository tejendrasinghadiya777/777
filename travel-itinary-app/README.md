# 777# Travel Itinerary App

A Node.js application for managing travel itineraries, featuring REST and GraphQL APIs, MongoDB integration, and Docker Compose setup.

## Features

- User authentication (JWT)
- Create, read, update, delete itineraries
- Share itineraries via unique tokens
- GraphQL endpoint for flexible queries
- Reate Limiter
- MongoDB and Mongo Express integration via Docker Compose

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/)
- Node.js (for local development, optional)

## Installation

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd travel-itinary-app
   ```

## Creating a Docker Image for the Web Application

1. **Build the Docker image:**
   ```bash
   docker build -t travel-itinerary-app .
   
## Running with Docker Compose

1. **Build and start all services:**
   ```bash
   docker compose up --d
   ```

2. **Access the application:**
   - **REST API:** [http://localhost:5051/api/itinaries](http://localhost:5051/api/itinaries)
   - **GraphQL Playground:** [http://localhost:5051/graphql](http://localhost:5051/graphql)
   - **Mongo Express:** [http://localhost:8081](http://localhost:8081)

   To open in your browser from the terminal:
   ```bash
   "$BROWSER" http://localhost:8081
   ```

## API Usage

### REST Endpoints

#### Itinerary APIs
- `POST /api/itinaries` - Create itinerary (requires JWT)
- `GET /api/itinaries` - List itineraries (requires JWT)
- `GET /api/itinaries/:id` - Fetch itinerary by ID (requires JWT)
- `PUT /api/itinaries/:id` - Update itinerary by ID (requires JWT)
- `DELETE /api/itinaries/:id` - Delete itinerary by ID (requires JWT)
- `GET /api/itinaries/share/:token` - Get shared itinerary (public)

#### Auth APIs
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login and get JWT token

### GraphQL

- **Endpoint:** `/graphql`
- **Example Query:**
  ```graphql
  query {
    itineraries {
      _id
      title
      destination
      startDate
      endDate
      sharableToken
    }
  }
  ```

## Testing

Unit tests are located in the `tests/unit/` directory.  
Run tests with:
```bash
npm test
```

## Useful Commands

- **Open Mongo Express in browser:**
  ```bash
  "$BROWSER" http://localhost:8081
  ```
- **Open GraphQL Playground:**
  ```bash
  "$BROWSER" http://localhost:5000/graphql
  ```

