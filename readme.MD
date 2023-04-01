# Coderhouse Feat GraphQL and Testing

To run de development enviroment you can use npm start
Testing enviroment needs to start after the server is listening any other way you can rerun the tests by presing h and following a
  ```bash
  npm start 
  npm run test
   ```

## GraphqQL Route

http://localhost:8080/gql
  
## GraphQL Schemas
  
```javascript 
  export const schema=buildSchema(`
    type Product{
        name: String
        price:Int
        rate:Int
        description:String
        _id:String
    }
    type Query{
        products:[Product]
        productById(id: String):Product
    }
    type Mutation {
        addProduct(name:String,price:Int,rate:Int,description:String):Product
        updateProduct(name:String,price:Int,rate:Int,description:String,id:String):Product
        deleteProduct(id: String):Product
    }        
`)
```



