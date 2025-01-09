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
