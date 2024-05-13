CRUD MANAGEMENT PRODUCT

List api:
POST /product/create-new-a-product: Create a new product.
GET /product/get-all-product: Get all products.
GET /product/get-product/:id: Get product by ID
PUT /product/update-product/:id: Update product by ID.
DELETE /product/delete-product/:id: Delete product by ID.

Step 1 : cd folder server

Step 2 : npm install

Step 3 : create file .env in root folder and setup PORT = 4000
URI_DATABASE = 'mongodb+srv://product:123456789P@cluster0.mjsr5vi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
NAME_DB = 'product_test'
PRODUCT_COLLECTION = "product"

Step 4 : npm run dev
