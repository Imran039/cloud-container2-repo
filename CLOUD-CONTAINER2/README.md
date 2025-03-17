# CLOUD-CONTAINER2

This microservice handles calculations for stored files.

## Endpoints:

### 1. Calculate Total for a Product

- **POST /calculate**
- Reads the file from the persistent volume and calculates the total of the specified product.
- **Request JSON:**
  ```json
  {
    "file": "file.dat",
    "product": "wheat"
  }
  ```
