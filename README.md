# Wanderlust

A full-stack web application for listing and booking luxury travel accommodations around the globe.

## Features
- Complete CRUD operations for travel listings.
- Image upload support.
- User Authentication (Login, Register, Logout).
- Interactive Maps integration (via MapBox).
- Responsive UI structured with EJS and Bootstrap.

## Prerequisites
- Node.js (v16+)
- MongoDB (Running locally or via Atlas)

## Running Locally

1. Clone the repository and install dependencies:
```bash
npm install
```

2. Set up environment variables (if you are using cloud integrations). Create a `.env` file in the root folder:
```text
Cloud_name=YOUR_CLOUD_NAME
Cloud_API_KEY=YOUR_CLOUDINARY_KEY
Cloud_API_Secret=YOUR_CLOUDINARY_SECRET
MAPBOX_TOKEN=YOUR_MAPBOX_TOKEN
```

3. (Optional) Initialize default data:
```bash
node init/index.js
```

4. Run the application:
```bash
nodemon app.js
# or
node app.js
```
The application will start at `http://localhost:3000`.
