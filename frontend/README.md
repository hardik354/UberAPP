# UberAPP Frontend

This document outlines the setup and usage of the Frontend for the UberAPP project. The frontend uses React, Vite, Tailwind CSS, and Socket.io-client to connect with the backend services.

## Table of Contents
- [Setup](#setup)
- [Environment Variables](#environment-variables)
- [Folder Structure](#folder-structure)
- [Key Pages and Components](#key-pages-and-components)
- [Payment Flow Example](#payment-flow-example)
- [Running and Building](#running-and-building)

## Setup

1. Install dependencies:
   ```sh
   npm install
   ```
2. Create a `.env` file at the root of the `frontend` folder. Example:
   ```
   VITE_BASE_URL=http://localhost:3000
   VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
   ```
3. Start the development server:
   ```sh
   npm run dev
   ```

## Environment Variables

- **VITE_BASE_URL**: URL of the backend server.
- **VITE_GOOGLE_MAPS_API_KEY**: API key for Google Maps (used in LiveTracking component).

## Folder Structure

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── ConfirmRide.jsx
│   │   ├── FinishRide.jsx
│   │   ├── LiveTracking.jsx
│   │   ├── LocationSearchPanel.jsx
│   │   ├── LookingForDriver.jsx
│   │   ├── RidePopUp.jsx
│   │   ├── VehiclePanel.jsx
│   │   └── ...
│   ├── context/
│   │   ├── CaptainContext.jsx
│   │   ├── SocketContext.jsx
│   │   └── UserContext.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Payment.jsx         // New Payment page for cash/UPI options
│   │   ├── Riding.jsx
│   │   ├── Start.jsx
│   │   ├── UserLogin.jsx
│   │   ├── UserSignup.jsx
│   │   ├── CaptainHome.jsx
│   │   ├── CaptainLogin.jsx
│   │   └── ...
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── tailwind.config.js
├── vite.config.js
└── package.json
```

## Key Pages and Components

- **Payment.jsx**  
  Provides a user interface for choosing between Cash and UPI payments.  
  Key functionality:
  - Choose payment method (cash/upi)
  - Provide UPI ID if needed
  - Confirm payment by calling the backend endpoint `/payment/confirm`
  
- **Riding.jsx**  
  Contains the "Make a Payment" button which navigates to the Payment page with ride data passed via React Router state.

- **SocketContext.jsx**  
  Maintains socket connection with the backend for real-time updates.

## Payment Flow Example

1. **User Ride Page**  
   In the `Riding.jsx` page, after the ride ends, the user can click:
   ```jsx
   <button onClick={() => navigate('/payment', { state: { ride } })}
     className='w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg'>
     Make a Payment
   </button>
   ```
2. **Payment Page**  
   The `Payment.jsx` page displays payment options:
   - User selects “Cash” or “UPI”
   - If UPI is selected, the user enters a UPI ID.
   - On confirmation, a POST request is sent to the backend endpoint `/payment/confirm` with the ride ID, selected method, and (if applicable) UPI ID.
   - On success, the user is navigated back to the Home page.
   
   Sample request payload for UPI:
   ```json
   {
     "rideId": "ride_id_here",
     "method": "upi",
     "upiId": "example@upi"
   }
   ```
3. **Real-Time Updates**  
   The Socket.io connection ensures that once the payment is confirmed, the captain is notified via the "payment-received" event.

## Running and Building

- **Development Server:**
  ```sh
  npm run dev
  ```
- **Build for Production:**
  ```sh
  npm run build
  ```
- **Preview Build:**
  ```sh
  npm run preview
  ```

## Additional Notes

- Tailwind CSS is configured in `tailwind.config.js` and imported in `index.css`.
- Vite is used as the build tool, and its configuration is defined in `vite.config.js`.
- ESLint configuration is set up in `eslint.config.js` to maintain code quality.

---

Feel free to update this documentation with any additional changes.