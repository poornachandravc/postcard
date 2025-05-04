# Postcard Service

This directory contains the Go backend service for managing postcards.

## Running the Service

1.  **Navigate to the service directory:**
    ```bash
    cd postcard-service
    ```

2.  **Build the application:**
    From within the `postcard-service` directory, run:
    ```bash
    go build ./cmd/postcard-service/main.go
    ```
    This will create an executable file named `main` (or `main.exe` on Windows) in the `postcard-service` directory.

3.  **Run the executable:**
    ```bash
    ./main
    ```

4.  The service will start and listen on port **8080** by default.

Alternatively, you can run the service directly without building first:

```bash
go run ./cmd/postcard-service/main.go
```

This will compile and run the application in one step. The service will still listen on port 8080.
