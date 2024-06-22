# HTTP Proxy Server with Express and http-proxy-middleware

This project is a simple HTTP proxy server using Node.js, Express, and the http-proxy-middleware library. It redirects incoming requests to different ports based on the hostname and caches database requests for improved performance.

## Features

- **Hostname-based redirection:** Uses a JSON file to map hostnames to specific ports.
- **Server status control:** Easily put a server in an `offline` status directly from the database.
- **Caching:** Database requests are cached for 10 seconds to reduce load and improve response times.

## Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/4RM4C4/Hostname-Redirect-Proxy.git
    cd Hostname-Redirect-Proxy
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Set up environment variables:**
    Create a .env file in the root directory of the project with the following content:
    ```dotenv
    PORT=12345
    DATABASE_URL=mariadb://username:password@host:port/database_name
    ```

4. **Set up the database:**
    Create a MariaDB database and a table for URL configurations.
    Use the following schema for the urls table:
    ```sql
    CREATE TABLE urls (
       id INT AUTO_INCREMENT PRIMARY KEY,
       hostname VARCHAR(255) NOT NULL UNIQUE,
       port INT NOT NULL,
       status BOOLEAN NOT NULL
    );
    ```
    Adjust the hostnames and ports according to your needs.

## Usage

1. **Start the server:**
    ```bash
    npm start
    ```

2. **Make requests:**
    - Requests to configured hostnames will be redirected to their respective ports.
    - If a server is set to `offline`, requests will receive a `503 Service Unavailable` response.
    - The database query results are cached for 10 seconds to improve performance for repeated requests.

## Project Structure

```plaintext
├── config
│   ├── database.js        # Database connection configuration
├── models
│   ├── url.js             # URL model definition
├── utils
│   ├── config.js          # Configuration file for environment variables and HTTPS credentials
│   ├── logger.js          # Logger utility
├── app.js                 # Main application file
├── package.json           # npm configuration file
└── README.md              # This file
