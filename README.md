# HTTP Proxy Server with Express and http-proxy-middleware

This project is a simple HTTP proxy server using Node.js, Express, and the `http-proxy-middleware` library. It redirects incoming requests to different ports based on the hostname.

## Features

- **Hostname-based redirection:** Uses a JSON file to map hostnames to specific ports.
- **CORS support:** Cross-Origin Resource Sharing (CORS) support.
- **Server status control:** Easily put a server in an `offline` state to stop redirecting requests.

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

3. **Configure the hostname.json file:**
    Create a `hostname.json` file in the root directory of the project with the following format:
    ```json
    {
      "example.com": { "port": 3456, "status": "online" },
      "another-example.com": { "port": 4567, "status": "offline" }
    }
    ```
    Adjust the hostnames and ports according to your needs.

## Usage

1. **Start the server:**
    ```bash
    npm start
    ```

2. **Make requests:**
    - Requests to `example.com` will be redirected to port `3456`.
    - Requests to `another-example.com` will be discarded because the status is `offline`.
    - You can update the `hostname.json` file to change the status of a server to `online` or `offline`.

## Project Structure

```plaintext
├── utils
│   ├── config.js          # Config file
├── hostname.json          # Configuration file for hostname-based redirection
├── app.js                 # Main application file
├── package.json           # npm configuration file
└── README.md              # This file
