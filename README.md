# 📜 LogWatch

A Node.js-based real-time log viewer that streams the last **10 lines** of a log file and updates live in the browser using **Express**, **Socket.IO**, and a custom **Watcher**.

---

## 🚀 Features

- 📄 Monitors a specific log file (`test.log`).
- 🔄 Streams the **latest 10 lines** in real time.
- 🌐 Simple web interface served via Express.
- ⚡ Uses **Socket.IO** for instant log updates.
- 🛠 Custom **Watcher** class to handle file change events.

---

## 📂 Project Structure

```
├── public/
│   ├── index.html       # Frontend UI
│   ├── styles.css       # Styling (optional)
├── server.js            # Main server file
├── watcher.js           # Custom log file watcher
├── test.log             # Log file being watched
└── package.json         # Dependencies & scripts
```

---

## 🛠 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/aniketmore-pixel/realtime-log-viewer.git
   cd realtime-log-viewer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create a `test.log` file**
   ```bash
   echo "Starting log viewer..." > test.log
   ```

4. **Start the server**
   ```bash
   node server.js
   ```

5. **Open the app**
   ```
   http://localhost:3000/log
   ```

---

## ⚡ How It Works

### **1. server.js**
- Sets up an Express server.
- Serves the static frontend from `/public`.
- Uses **Socket.IO** to communicate with clients.
- Integrates the custom **Watcher** to detect file changes and push updates.

### **2. watcher.js**
- Extends Node.js's `EventEmitter`.
- Watches a specific log file using `fs.watchFile()`.
- Keeps only the **latest 10 lines** in memory.
- Emits a `process` event whenever new lines are added.

### **3. Frontend**
- Connects to the server via **Socket.IO**.
- Displays the latest logs in real time.

---

## 🔧 API & Events

### **Socket.IO Events**

| Event          | Direction  | Description                              |
|---------------|-----------|------------------------------------------|
| `init`        | Server → Client | Sends the last 10 log lines when a client connects. |
| `update-log`  | Server → Client | Sends updated log lines when the file changes. |

---

## 📌 Example Log Updates

```bash
# Append a log line
$ echo "[INFO] New log entry" >> test.log

# Clients instantly receive:
[INFO] New log entry
```

---

## 🛡️ Requirements

- **Node.js** ≥ 16.x
- **npm** ≥ 8.x

---

## 💡 Author
Aniket More 

---

## 🖥️ Preview
Once running, open your browser:
```
http://localhost:3000/log
```

Logs will appear and update in real-time 🚀

