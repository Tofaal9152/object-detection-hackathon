# Project Setup Instructions
1. Ensure you have the `.env` file configured with the required backend endpoint `NEXT_PUBLIC_BACKEND_URL`.

2. Install dependencies:
    ```bash
    npm install
    ```
    If the above command does not work, try:
    ```bash
    npm i --legacy-peer-deps
    ```

3. Start the development server:
    ```bash
    npm run dev
    ```

4. Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to view your project.

5. To run the project on a different port:
    ```bash
    npm run dev -- -p <<PORT_NUMBER>>
    ```
    Example:
    ```bash
    npm run dev -- -p 4000
    ```
    Replace `<<PORT_NUMBER>>` with your desired port (e.g., `4000`).

6. Your project should now be running successfully at the specified port.

