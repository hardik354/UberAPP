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
