# UberAPP Backend API Documentation

This document describes the endpoints, services, and overall architecture of the Backend. The backend uses Express, Mongoose, JWT authentication, and Socket.io for real-time communication between users and captains.

## Table of Contents
- [Setup](#setup)
- [Environment Variables](#environment-variables)
- [User Endpoints](#user-endpoints)
- [Captain Endpoints](#captain-endpoints)
- [Ride Endpoints](#ride-endpoints)
- [Payment Endpoints](#payment-endpoints)
- [Maps Endpoints](#maps-endpoints)
- [Socket.io Integration](#socketio-integration)
- [Examples](#examples)

## Setup

1. Install dependencies:
   ```sh
   npm install
   ```
2. Create a `.env` file at the root of the Backend folder with:
   ```
   PORT=3000
   DB_CONNECT=your_mongodb_url
   JWT_SECRET=your_jwt_secret
   GOOGLE_MAPS_API=your_google_maps_api_key
   ```
3. Start the server:
   ```sh
   npm run dev  # if using nodemon or similar
   ```

## Environment Variables

- **PORT**: Server port (default: 3000)
- **DB_CONNECT**: MongoDB connection string
- **JWT_SECRET**: Secret for JWT token generation
- **GOOGLE_MAPS_API**: API key for Google Maps services

## User Endpoints

### Register User
- **Endpoint:** `POST /users/register`
- **Request Body:**
  ```json
  {
    "fullname": { "firstname": "John", "lastname": "Doe" },
    "email": "john.doe@example.com",
    "password": "yourpassword",
    "phone": "1234567890"
  }
  ```
- **Success Response:** `201 Created`
  ```json
  {
    "token": "jwt_token_here",
    "user": { "id": "user_id", "fullname": { "firstname": "John", "lastname": "Doe" }, "email": "john.doe@example.com" }
  }
  ```

### Login User
- **Endpoint:** `POST /users/login`
- **Request Body:**
  ```json
  {
    "email": "john.doe@example.com",
    "password": "yourpassword"
  }
  ```
- **Success Response:** `200 OK`
  ```json
  {
    "token": "jwt_token_here",
    "user": { "id": "user_id", "fullname": { "firstname": "John", "lastname": "Doe" }, "email": "john.doe@example.com" }
  }
  ```

### Get User Profile
- **Endpoint:** `GET /users/profile`
- **Headers:** `Authorization: Bearer jwt_token_here`
- **Success Response:** `200 OK`
  ```json
  {
    "id": "user_id",
    "fullname": { "firstname": "John", "lastname": "Doe" },
    "email": "john.doe@example.com"
  }
  ```

### Logout User
- **Endpoint:** `GET /users/logout`
- **Headers:** `Authorization: Bearer jwt_token_here`
- **Success Response:** `200 OK`
  ```json
  { "message": "Logged out" }
  ```

## Captain Endpoints

### Register Captain
- **Endpoint:** `POST /captains/register`
- **Request Body:**
  ```json
  {
    "fullname": { "firstname": "John", "lastname": "Smith" },
    "email": "john.smith@example.com",
    "password": "securepass123",
    "vehicle": {
      "color": "black",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
  ```
- **Success Response:** `201 Created`
  ```json
  {
    "token": "jwt_token_here",
    "captain": {
      "id": "captain_id",
      "fullname": { "firstname": "John", "lastname": "Smith" },
      "email": "john.smith@example.com",
      "vehicle": { "color": "black", "plate": "ABC123", "capacity": 4, "vehicleType": "car" }
    }
  }
  ```

### Login Captain
- **Endpoint:** `POST /captains/login`
- **Request Body:**
  ```json
  {
    "email": "john.smith@example.com",
    "password": "securepass123"
  }
  ```
- **Success Response:** `200 OK` with captain details in the response.

### Get Captain Profile
- **Endpoint:** `GET /captains/profile`
- **Headers:** `Authorization: Bearer jwt_token_here`
- **Response:** Captain profile details.

### Logout Captain
- **Endpoint:** `GET /captains/logout`
- **Headers:** `Authorization: Bearer jwt_token_here`
- **Success Response:** `200 OK`
  ```json
  { "message": "Logout successfully" }
  ```

## Ride Endpoints

### Create Ride
- **Endpoint:** `POST /rides/create`
- **Headers:** `Authorization: Bearer jwt_token_here`
- **Request Body:**
  ```json
  {
    "pickup": "123 Main St, City",
    "destination": "456 Park Ave, City",
    "vehicleType": "car"
  }
  ```
- **Success Response:** `201 Created`
  ```json
  {
    "id": "ride_id",
    "user": "user_id",
    "pickup": "123 Main St, City",
    "destination": "456 Park Ave, City",
    "fare": 150,
    "status": "pending",
    "otp": "123456"
  }
  ```
*After creation, the backend also emits a "new-ride" socket event for all nearby captains.*

### Get Fare Estimate
- **Endpoint:** `GET /rides/get-fare`
- **Headers:** `Authorization: Bearer jwt_token_here`
- **Query Params:** `pickup` and `destination`
- **Success Response:** `200 OK`
  ```json
  {
    "auto": 120,
    "car": 180,
    "moto": 80
  }
  ```

### Confirm Ride (Captain)
- **Endpoint:** `POST /rides/confirm`
- **Headers:** `Authorization: Bearer captain_jwt_token`
- **Request Body:**
  ```json
  {
    "rideId": "ride_id"
  }
  ```
- **Success Response:** `200 OK` (emits a "ride-confirmed" event to the user)

### Start Ride (Captain)
- **Endpoint:** `GET /rides/start-ride`
- **Headers:** `Authorization: Bearer captain_jwt_token`
- **Query Params:** `rideId` and `otp`
- **Success Response:** `200 OK` (emits a "ride-started" event to the user)

### End Ride (Captain)
- **Endpoint:** `POST /rides/end-ride`
- **Headers:** `Authorization: Bearer captain_jwt_token`
- **Request Body:**
  ```json
  { "rideId": "ride_id" }
  ```
- **Success Response:** `200 OK` (emits a "ride-ended" event to the user)

## Payment Endpoints

### Confirm Payment
- **Endpoint:** `POST /payment/confirm`
- **Headers:** `Authorization: Bearer jwt_token_here`
- **Request Body:**
  ```json
  {
    "rideId": "ride_id",
    "method": "cash", // or "upi"
    "upiId": "example@upi" // provide only for UPI payments
  }
  ```
- **Success Response:** `200 OK`
  ```json
  {
    "message": "Payment successful",
    "ride": { /* ride data with updated payment details */ }
  }
  ```
*This endpoint simulates payment confirmation and notifies the captain via socket ("payment-received" event).*

## Maps Endpoints

### Get Coordinates
- **Endpoint:** `GET /maps/get-coordinates`
- **Headers:** `Authorization: Bearer jwt_token_here`
- **Query Param:** `address`
- **Success Response:** `200 OK`
  ```json
  { "ltd": 12.9716, "lng": 77.5946 }
  ```

### Get Distance & Time
- **Endpoint:** `GET /maps/get-distance-time`
- **Headers:** `Authorization: Bearer jwt_token_here`
- **Query Params:** `origin`, `destination`
- **Success Response:** `200 OK`
  ```json
  {
    "distance": { "value": 15000, "text": "15 km" },
    "duration": { "value": 1800, "text": "30 mins" }
  }
  ```

### Get Suggestions
- **Endpoint:** `GET /maps/get-suggestions`
- **Headers:** `Authorization: Bearer jwt_token_here`
- **Query Param:** `input`
- **Success Response:** `200 OK`
  ```json
  [{ "description": "Address suggestion 1" }, { "description": "Address suggestion 2" }]
  ```

## Socket.io Integration

- The backend initializes Socket.io in `socket.js` to manage real-time notifications.
- On user or captain login, a socket is joined and the server stores the socket ID.
- Examples:
  - When a ride is created, a "new-ride" event is emitted to captains.
  - When payment is confirmed, a "payment-received" event is sent to the captain.
  - When a ride is started or ended, corresponding events notify the user.

## Architecture Summary

- Express handles routing and middleware.
- Mongoose models represent users, captains, rides, and token blacklisting.
- JWT manages authentication.
- Socket.io provides real-time ride and payment updates.
- Google Maps API services provide geocoding, distance, and autocomplete functionality.

---

Feel free to extend the documentation as needed.