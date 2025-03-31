# User Registration API Documentation

## Register User
Endpoint for registering new users in the system.

### Endpoint
```
POST /users/register
```

### Request Body
| Field      | Type   | Description                    | Required |
|------------|--------|--------------------------------|----------|
| firstname  | string | User's first name              | Yes      |
| lastname   | string | User's last name               | Yes      |
| email      | string | User's email address           | Yes      |
| password   | string | User's password                | Yes      |
| phone      | string | User's phone number            | Yes      |

### Response Status Codes
| Status Code | Description                               |
|-------------|------------------------------------------|
| 201         | User successfully created                 |
| 400         | Bad request (invalid or missing data)     |
| 409         | Conflict (email already exists)           |
| 500         | Internal server error                     |

### Example Request
```json
{
  "firstname": "John",
  "lastname": "Doe",
  "email": "john.doe@example.com",
  "password": "yourpassword123",
  "phone": "1234567890"
}
```

### Example Success Response
```json
{
  "message": "User registered successfully",
  "user": {
    "id": "user_id",
    "firstname": "John",
    "lastname": "Doe",
    "email": "john.doe@example.com",
    "phone": "1234567890"
  }
}
```

### Example Error Response
```json
{
  "error": "Email already exists"
}
```

### Notes
- Password must be at least 6 characters long
- Email must be a valid email format
- Phone number must be a valid format

## Login User
Endpoint for authenticating existing users.

### Endpoint
```
POST /users/login
```

### Request Body
| Field     | Type   | Description          | Required |
|-----------|--------|----------------------|----------|
| email     | string | User's email address | Yes      |
| password  | string | User's password      | Yes      |

### Response Status Codes
| Status Code | Description                               |
|-------------|------------------------------------------|
| 200         | User successfully authenticated           |
| 400         | Bad request (invalid or missing data)     |
| 401         | Unauthorized (invalid credentials)        |
| 500         | Internal server error                     |

### Example Request
```json
{
  "email": "john.doe@example.com",
  "password": "yourpassword123"
}
```

### Example Success Response
```json
{
  "message": "User authenticated successfully",
  "token": "jwt_token"
}
```

### Example Error Response
```json
{
  "error": "Invalid email or password"
}
```

### Notes
- Email must be a valid email format
- Password must be at least 6 characters long

## Get User Profile
Endpoint for retrieving the authenticated user's profile.

### Endpoint
```
GET /users/profile
```

### Headers
| Field          | Value         | Description                          | Required |
|----------------|---------------|--------------------------------------|----------|
| Authorization  | Bearer token  | JWT token received during login      | Yes      |

### Response Status Codes
| Status Code | Description                               |
|-------------|------------------------------------------|
| 200         | Profile successfully retrieved            |
| 401         | Unauthorized (invalid or missing token)   |
| 500         | Internal server error                     |

### Example Success Response
```json
{
  "id": "user_id",
  "firstname": "John",
  "lastname": "Doe",
  "email": "john.doe@example.com",
  "phone": "1234567890"
}
```

### Example Error Response
```json
{
  "error": "Unauthorized access"
}
```

## Logout User
Endpoint for logging out the authenticated user.

### Endpoint
```
GET /users/logout
```

### Headers
| Field          | Value         | Description                          | Required |
|----------------|---------------|--------------------------------------|----------|
| Authorization  | Bearer token  | JWT token received during login      | Yes      |

### Response Status Codes
| Status Code | Description                               |
|-------------|------------------------------------------|
| 200         | User successfully logged out              |
| 401         | Unauthorized (invalid or missing token)   |
| 500         | Internal server error                     |

### Example Success Response
```json
{
  "message": "Logged out"
}
```

### Example Error Response
```json
{
  "error": "Unauthorized access"
}
```

### Notes
- The provided token will be blacklisted after logout
- Subsequent requests with the same token will be rejected

# Captain API Documentation

## Register Captain
Endpoint for registering new captains in the system.

### Endpoint
```
POST /captains/register
```

### Request Body
```json
{
  "fullname": {
    "firstname": "John",    // Required, minimum 3 characters
    "lastname": "Smith"     // Optional
  },
  "email": "john.smith@example.com",    // Required, valid email format
  "password": "securepass123",          // Required, minimum 6 characters
  "vehicle": {
    "color": "black",                   // Required, minimum 3 characters
    "plate": "ABC123",                  // Required, minimum 3 characters
    "capacity": 4,                      // Required, minimum value of 1
    "vehicleType": "car"               // Required, must be: "car", "motorcycle", or "auto"
  }
}
```

### Response Status Codes
| Status Code | Description                               |
|-------------|------------------------------------------|
| 201         | Captain successfully created              |
| 400         | Bad request (invalid or missing data)     |
| 409         | Conflict (email already exists)           |
| 500         | Internal server error                     |

### Example Request
```json
{
  "firstname": "John",
  "lastname": "Smith",
  "email": "john.smith@example.com",
  "password": "securepass123",
  "color": "black",
  "plate": "ABC123",
  "capacity": 4,
  "vehicleType": "car"
}
```

### Example Success Response
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",  // JWT auth token
  "captain": {
    "id": "captain_id",
    "fullname": {
      "firstname": "John",
      "lastname": "Smith"
    },
    "email": "john.smith@example.com",
    "vehicle": {
      "color": "black",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    },
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z"
  }
}
```

### Example Error Response
```json
{
  "error": "Email already exists"
}
```

### Notes
- Password must be at least 6 characters long
- Email must be a valid email format
- First name must be at least 3 characters long
- Vehicle color must be at least 3 characters long
- Vehicle plate must be at least 3 characters long
- Vehicle capacity must be at least 1
- Vehicle type must be one of: "car", "motorcycle", "auto"

## Login Captain
### Endpoint
```
POST /captains/login
```

### Request Body
```json
{
  "email": "john.smith@example.com",    // Required, valid email format
  "password": "securepass123"           // Required, minimum 6 characters
}
```

### Success Response (200 OK)
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",  // JWT auth token
  "captain": {
    "id": "captain_id",
    "fullname": {
      "firstname": "John",
      "lastname": "Smith"
    },
    "email": "john.smith@example.com",
    "vehicle": {
      "color": "black",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    },
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z"
  }
}
```

## Get Captain Profile
### Endpoint
```
GET /captains/profile
```

### Headers
```json
{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."  // Required, JWT token
}
```

### Success Response (200 OK)
```json
{
  "captain": {
    "id": "captain_id",
    "fullname": {
      "firstname": "John",
      "lastname": "Smith"
    },
    "email": "john.smith@example.com",
    "vehicle": {
      "color": "black",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    },
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z"
  }
}
```

## Logout Captain
### Endpoint
```
GET /captains/logout
```

### Headers
```json
{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."  // Required, JWT token
}
```

### Success Response (200 OK)
```json
{
  "message": "Logout successfully"
}
```

# Ride API Documentation

## Create Ride
Endpoint for creating a new ride request.

### Endpoint
```
POST /rides/create
```

### Headers
| Field          | Value         | Description                          | Required |
|----------------|---------------|--------------------------------------|----------|
| Authorization  | Bearer token  | JWT token received during login      | Yes      |

### Request Body
| Field         | Type   | Description                    | Required |
|---------------|--------|--------------------------------|----------|
| pickup        | string | Pickup location address        | Yes      |
| destination   | string | Destination location address   | Yes      |
| vehicleType   | string | Type of vehicle (auto/car/moto)| Yes      |

### Response Status Codes
| Status Code | Description                               |
|-------------|------------------------------------------|
| 201         | Ride successfully created                 |
| 400         | Bad request (invalid or missing data)     |
| 401         | Unauthorized (invalid token)              |
| 500         | Internal server error                     |

### Example Request
```json
{
  "pickup": "123 Main St, City",
  "destination": "456 Park Ave, City",
  "vehicleType": "car"
}
```

### Example Success Response
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

## Get Fare Estimate
Endpoint for getting fare estimates for different vehicle types.

### Endpoint
```
GET /rides/get-fare
```

### Headers
| Field          | Value         | Description                          | Required |
|----------------|---------------|--------------------------------------|----------|
| Authorization  | Bearer token  | JWT token received during login      | Yes      |

### Query Parameters
| Field         | Type   | Description                    | Required |
|---------------|--------|--------------------------------|----------|
| pickup        | string | Pickup location address        | Yes      |
| destination   | string | Destination location address   | Yes      |

### Response Status Codes
| Status Code | Description                               |
|-------------|------------------------------------------|
| 200         | Fare estimates retrieved successfully     |
| 400         | Bad request (invalid or missing data)     |
| 401         | Unauthorized (invalid token)              |
| 500         | Internal server error                     |

### Example Success Response
```json
{
  "auto": 120,
  "car": 180,
  "moto": 80
}
```

### Notes
- Fare calculation considers base fare, per km rate, and per minute rate
- Vehicle types available: auto, car, moto
- All addresses must be at least 3 characters long
