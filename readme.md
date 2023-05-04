Frontend Usage

To use the backend API in your frontend application, you can follow these steps:

Ensure that the backend server is running. If not, refer to the Installation section in the README file of the backend project for instructions on how to start the server.

In your frontend application, make HTTP requests to the appropriate endpoints of the backend API.

Base URL: https://restapi-contact-book.onrender.com/api

Available endpoints:

User Routes:

POST /users/register: Register a new user.
POST /users/login: Log in with user credentials.
GET /users/current: Get current user's details.
POST /users/logout: Log out the current user.
PATCH /users/avatars: Update user's avatar.
PATCH /users: Update user's subscription.

Contacts Routes:

GET /contacts: Get all contacts.
GET /contacts/{contactId}: Get a specific contact by ID.
POST /contacts: Create a new contact.
PUT /contacts/{contactId}: Update a specific contact by ID.
DELETE /contacts/{contactId}: Delete a specific contact by ID.
Note: Replace {contactId} with the actual ID of the contact.

Make requests to the desired endpoints using your preferred HTTP client library (e.g., Axios, Fetch API) in your frontend application. Here's an example using Axios:

javascript
Copy code
import axios from 'axios';

// Register a new user
axios.post('https://restapi-contact-book.onrender.com/api/users/register', {
  email: 'john@example.com',
  password: 'password123',
});

// Log in with user credentials
axios.post('https://restapi-contact-book.onrender.com/api/users/login', {
  email: 'john@example.com',
  password: 'password123',
});

// Get current user's details (requires authentication)
axios.get('https://restapi-contact-book.onrender.com/api/users/current', {
  headers: {
    Authorization: 'Bearer {jwtToken}',
  },
});

// Update user's avatar (requires authentication)
axios.patch('https://restapi-contact-book.onrender.com/api/users/avatars', formData, {
  headers: {
    Authorization: 'Bearer {jwtToken}',
    'Content-Type': 'multipart/form-data',
  },
});

// Get all contacts
axios.get('https://restapi-contact-book.onrender.com/api/contacts');

// Create a new contact
axios.post('https://restapi-contact-book.onrender.com/api/contacts', {
  name: 'Jane Doe',
  phone: '1234567890',
  email: 'jane@example.com',
});

// Update a specific contact by ID
axios.put('https://restapi-contact-book.onrender.com/api/contacts/{contactId}', {
  name: 'Updated Name',
  phone: '9876543210',
});

// Delete a specific contact by ID
axios.delete('https://restapi-contact-book.onrender.com/api/contacts/{contactId}');
Note: Replace {jwtToken} with the actual JSON Web Token (JWT) received after logging in.

Handle the responses from the backend API in your frontend application as needed. You can refer to the API documentation or the backend code for the expected response formats and data structures.