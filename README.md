# HTTP Proxy Server with Express and http-proxy

This project is a simple HTTP proxy server using Node.js, Express, and the `http-proxy` library. It redirects incoming requests to different ports based on the hostname.

## Features

- **Hostname-based redirection:** Uses a JSON file to map hostnames to specific ports.
- **CORS support:** Cross-Origin Resource Sharing (CORS) support.
- **Request logging:** Logs all incoming requests.
- **Error handling:** Clear error responses for misdirected requests and internal server errors.

## Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/4RM4C4/your_repository.git
    cd your_repository
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Configure the hostname.json file:**
    Create a `hostname.json` file in the root directory of the project with the following format:
    ```json
    {
      "example.com": 3123,
      "another-example.com": 4324
    }
    ```
    Adjust the hostnames and ports according to your needs.

## Usage

1. **Start the server:**
    ```bash
    npm start
    ```

2. **Make requests:**
    - Requests to `example.com` will be redirected to port `3001`.
    - Requests to `another-example.com` will be redirected to port `3002`.

## Project Structure

```plaintext
├── utils
│   ├── logger.js          # Logging requests
│   ├── middleware.js      # Custom middleware
├── hostname.json          # Configuration file for hostname-based redirection
├── app.js                 # Main application file
├── package.json           # npm configuration file
└── README.md              # This file
