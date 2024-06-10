# im3 Gateway

im3 is a decentralized streaming platform that leverages LiveKit as its infrastructure. This repository serves as a gateway using the LiveKit SDK to manage creating and joining meetings.

## Project Structure

```plaintext
livekit-gateway/
├── db/
│   └── redisClient.mjs
├── routes/
│   └── meetings.mjs
│   └── tokens.mjs
├── config/
│   └── config.mjs
├── .gitignore
├── server.mjs
├── package.json
└── README.md
```

## Prerequisites

- Node.js (version 18.16.1 or higher)
- npm (Node Package Manager)

## Setup Instructions

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Im3-protocol/im3-node-gateway
   cd im3-gateway
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Configuration**:
   Create a `config.mjs` file inside the `config` directory with your LiveKit API credentials and server URL:
   ```javascript
   export const API_KEY = 'your_api_key';
   export const API_SECRET = 'your_api_secret';
   export const LIVEKIT_HOST = 'your_livekit_server_url';
   ```

4. **Run the Server**:
   ```bash
   npm start
   ```

## API Endpoints

### Create a Meeting

**Endpoint**: `POST /api/create-meeting`

**Request Body**:
```json
{
  "username": "username"
}
```

**Response**:
```json
{
  "roomName": "meeting_2024-06-08_14:30:00",
  "url": "your_livekit_server_url/join/meeting_2024-06-08_14:30:00",
  "adminToken": "admin_jwt_token"
}
```

### Join a Meeting

**Endpoint**: `POST /api/join-meeting`

**Request Body**:
```json
{
  "url": "your_meeting_url",
  "username": "username"
}
```

**Response**:
```json
{
  "token": "user_jwt_token"
}
```

## Directory Explanation

- **db/db.mjs**: Sets up an in-memory SQLite database with tables for users, meetings, and tokens.
- **routes/meetings.mjs**: Handles the creation of new meetings.
- **routes/tokens.mjs**: Manages the generation of tokens for joining meetings.
- **config/config.mjs**: Contains the configuration for LiveKit API credentials and server URL.
- **server.mjs**: The main server file that sets up the Express.js server and routes.


## Contact

For any questions or suggestions, please contact Hooman (DMind) Dehghani via [GitHub](https://github.com/itsDMind).

- **Name:** Hooman (DMind) Dehghani
- **GitHub Username:** [itsDMind](https://github.com/itsDMind)
