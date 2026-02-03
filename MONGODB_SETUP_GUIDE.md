# MongoDB Atlas Setup Guide

Follow these steps to set up your database and connect it to the **Money Master** backend.

### 1. Create a MongoDB Atlas Account
- Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register).
- Sign up for a free account.

### 2. Create a Free Cluster
- Once logged in, click **"Create"** to build a new database.
- Select the **M0 (Free)** tier.
- Choose a provider (e.g., AWS) and a region near you.
- Click **"Create Deployment"**.

### 3. Set Up Security
- **Database User**: Create a username and password. **Keep these details safe!** You will need them for your connection string.
- **IP Access List**: Click **"Add My Current IP Address"** or, for easier local development, click **"Allow Access from Anywhere"** (0.0.0.0/0).

### 4. Get Your Connection String
- Go to the **"Database"** section in the sidebar.
- Click the **"Connect"** button on your cluster.
- Select **"Drivers"** (under "Connect your application").
- Select **Node.js** as the driver.
- Copy the connection string. It looks like this:
  `mongodb+srv://<username>:<password>@cluster0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

### 5. Update Your Backend
- Go to your backend folder: `money-manager-backend`.
- Open the `.env` file (create it if it doesn't exist by copying `.env.example`).
- Paste your connection string into the `MONGODB_URI` variable, replacing `<username>` and `<password>` with the details you created in Step 3.

```env
PORT=5000
MONGODB_URI=mongodb+srv://isa:yourpassword@cluster0.mongodb.net/money-manager?retryWrites=true&w=majority
FRONTEND_URL=http://localhost:8080
```

### 6. Start the Server
- In your terminal, inside the `money-manager-backend` folder, run:
  ```bash
  npm run dev
  ```
- You should see **"Connected to MongoDB"** in the terminal!
