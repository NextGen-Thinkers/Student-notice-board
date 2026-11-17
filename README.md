# Student Notice Board

A browser based notice board for students. The project is implemented with plain HTML, CSS, and JavaScript, and saves its data in the browser's `localStorage`.

## Features

- Register student accounts with a name, email, password, year, and section.
- Sign in as a registered student or the built in administrator.
- Post notices for a selected year. Each notice stores its subject, text, date, author, and target year.
- Browse notices saved in the current browser.
- Edit a user's name and password.
- Administrator controls include notice creation and a command to clear saved notices and comments.
- Responsive viewport metadata and a styled dashboard layout.

The notice form enforces a maximum of 10 notices in `localStorage`; it does not reset this count by date. Although the interface includes comment and image upload controls, comment handling is not implemented in `script.js`, and uploaded profile and notice images are not saved or displayed.

## Requirements

- A modern web browser with JavaScript and `localStorage` enabled.
- No Node.js, package manager, database, or build tools are required.

## Run locally

1. Clone or download this repository.
2. Open `index.html` in a web browser.

Alternatively, serve the repository directory with any static HTTP server and open the local URL it provides. For example, with Python installed:

```bash
python -m http.server 8000
```

Then visit <http://localhost:8000>.

## Usage

1. Register from the login screen with an email, password, name, year, and section.
2. Sign in using the same email and password.
3. Use **View Notice** to see notices stored in this browser.
4. Use **Edit profile** to update the name or password.
5. Sign in as the administrator to access the notice creation and delete-all controls.

The administrator login currently defined in `script.js` is:

- Email: `admin2007@gmail.com`
- Password: `admin@2007`

These credentials are embedded in client-side source code and are visible to anyone who can access the app. This is a demonstration implementation and must not be used to protect sensitive data or deployed as a secure multi-user service.

## Data and configuration

There are no environment variables or external configuration files. Application state is stored in the browser's `localStorage` under these keys:

- `users` — registered user records
- `notices` — notices posted from the app
- `comments` — cleared by the administrator action, but not otherwise implemented

Data is local to the browser profile and origin. It is not shared between users or devices and can be removed by clearing the browser's site data. Passwords are stored as plain text in `localStorage`; the hard-coded administrator credentials and client-side role checks are also not secure.

## Tech stack

- HTML (`index.html`)
- CSS (`style.css`)
- Vanilla JavaScript (`script.js`)
- Browser `localStorage` for persistence

## Build and tests

The repository has no build scripts, dependency manifest, or automated test suite. Open `index.html` directly or serve the files statically; there is no build step.

## Project structure

```text
.
├── index.html   # Login, registration, dashboard, and notice forms
├── script.js    # Authentication, localStorage, profile, and notice logic
├── style.css    # Page and dashboard styles
└── README.md
```
