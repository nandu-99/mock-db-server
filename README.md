# **mock-json-db-server**

**mock-json-db-server** is a simple and lightweight tool to emulate a JSON database. It provides a quick and efficient way to mock API endpoints during development and testing, without setting up a full database backend.

---

## **Features**

- Serve data from a JSON file as RESTful API endpoints.
- Supports `GET`, `POST`, `PUT`, and `DELETE` operations.
- Automatically reloads the database when the JSON file is updated.
- Customizable response delay for simulating network latency.
- Easy to set up and use with minimal configuration.

---

## **Installation**

To install the package:
```bash
npm install mock-json-db-server
```

---

## **Usage**

Run the server with a JSON file:
```bash
mock-db-server --file ./path/to/db.json --port 3000 --delay 200
```

### **Options**

| Option         | Alias | Description                                | Default      |
|----------------|-------|--------------------------------------------|--------------|
| `--file`       | `-f`  | Path to the JSON database file (required). | None         |
| `--port`       | `-p`  | Port to run the server.                    | `3000`       |
| `--delay`      | `-d`  | API response delay in milliseconds.        | `0`          |
| `--help`       | `-h`  | Display help for the command.              | N/A          |

---

## **Example**

### **Sample JSON File**
Create a JSON file named `db.json`:
```json
{
  "users": [
    { "id": 1, "name": "Alice", "email": "alice@example.com" },
    { "id": 2, "name": "Bob", "email": "bob@example.com" }
  ],
  "products": [
    { "id": 101, "name": "Laptop", "price": 1200 },
    { "id": 102, "name": "Phone", "price": 800 }
  ]
}
```

### **Start the Server**
Run the server:
```bash
mock-db-server --file ./db.json --port 4000 --delay 300
```

The server will start at `http://localhost:4000`.

### **Available Endpoints**

#### **Users**
1. **Get all users**:
   ```http
   GET /users
   ```

2. **Get a user by ID**:
   ```http
   GET /users/:id
   ```

3. **Create a new user**:
   ```http
   POST /users
   Content-Type: application/json
   Body: { "name": "Charlie", "email": "charlie@example.com" }
   ```

4. **Update a user by ID**:
   ```http
   PUT /users/:id
   Content-Type: application/json
   Body: { "name": "Charlie Brown" }
   ```

5. **Delete a user by ID**:
   ```http
   DELETE /users/:id
   ```

#### **Products**
1. **Get all products**:
   ```http
   GET /products
   ```

2. **Get a product by ID**:
   ```http
   GET /products/:id
   ```

3. **Create a new product**:
   ```http
   POST /products
   Content-Type: application/json
   Body: { "name": "Tablet", "price": 500 }
   ```

4. **Update a product by ID**:
   ```http
   PUT /products/:id
   Content-Type: application/json
   Body: { "price": 600 }
   ```

5. **Delete a product by ID**:
   ```http
   DELETE /products/:id
   ```

---

## **Advanced Features**

### **Auto-Reload**
- The server automatically reloads the database whenever the JSON file is updated.
- No need to restart the server for changes to take effect.

### **Simulate Network Latency**
- Use the `--delay` option to introduce a delay in responses (e.g., `--delay 300` for 300ms).

---

## **Use Cases**

1. **Frontend Development**:
   Quickly test your frontend code with a mocked backend.
   
2. **Integration Testing**:
   Validate API integrations without setting up a real backend.

3. **Prototyping**:
   Test your application idea without building a full backend infrastructure.

---

## **Development**

If you want to develop or contribute to the package:

1. Clone the repository:
   ```bash
   git clone https://github.com/<your-username>/mock-db-server.git
   cd mock-db-server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Link the package globally for local testing:
   ```bash
   npm link
   ```

4. Test the package:
   ```bash
   mock-json-db-server --file ./example.json --port 3000
   ```

---

## **Contributing**

Contributions are welcome! If you find a bug or have a feature request, feel free to open an issue or submit a pull request.

---

## **License**

This project is licensed under the [MIT License](LICENSE).

---
