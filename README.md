# 🚀 Project Setup Instructions

## 1. Set up environment file

Make sure you have a `.env` file with this line:

```
NEXT_PUBLIC_BACKEND_URL=your_backend_url_here
```

---

## 2. Install dependencies

Run this in your terminal:

```bash
npm install
```

If it fails, try:

```bash
npm i --legacy-peer-deps
```

---

## 3. Start the development server

```bash
npm run dev
```

Then open your browser and go to:  
[http://localhost:3000](http://localhost:3000)

---

## 🔧 Run Build and Start (Production Mode)

### Step 1: Build the project

```bash
npm run build
```

### Step 2: Start the project

```bash
npm start
```
<!-- End -->
## 4.if --> Run on a different port (Development Mode)

Use this command:

```bash
npm run dev -- -p 4000
```

Replace `4000` with any port number you prefer.

---

### Step 3: Start on a different port (if default doesn't work)

Set the `PORT` environment variable before starting:

```bash
PORT=4000 npm start
```

(Replace `4000` with your desired port)

---

