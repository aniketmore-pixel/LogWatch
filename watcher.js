const events = require("events");
const fs = require("fs");

const TRAILING_LINES = 10;

class Watcher extends events.EventEmitter {
  constructor(watchFile) {
    super();
    this.watchFile = watchFile;
    this.store = [];
  }

  getLogs() {
    return this.store;
  }

  _updateStore(newLines) {
    newLines = newLines.filter(line => line.trim() !== "");
    this.store.push(...newLines);
    while (this.store.length > TRAILING_LINES) {
      this.store.shift();
    }
  }

  watch(curr, prev) {
    if (curr.size <= prev.size) return;

    const readSize = curr.size - prev.size;
    const buffer = Buffer.alloc(readSize);

    fs.open(this.watchFile, 'r', (err, fd) => {
      if (err) return console.error("Error opening file:", err);

      fs.read(fd, buffer, 0, readSize, prev.size, (err, bytesRead) => {
        fs.close(fd, () => {});
        if (err) return console.error("Error reading file:", err);

        if (bytesRead > 0) {
          const data = buffer.toString('utf8', 0, bytesRead);
          const newLines = data.split('\n').filter(line => line.trim() !== "");
          this._updateStore(newLines);
          this.emit('process', this.store);
        }
      });
    });
  }

  start() {
    fs.readFile(this.watchFile, 'utf8', (err, data) => {
      if (!err && data) {
        const lines = data.split('\n').filter(line => line.trim() !== "");
        this.store = lines.slice(-TRAILING_LINES);
      }

      fs.watchFile(this.watchFile, { interval: 1000 }, (curr, prev) => {
        this.watch(curr, prev);
      });

      this.emit('process', this.store); // emit initial logs
    });
  }
}

module.exports = Watcher;
