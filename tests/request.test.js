import axios from "axios"
import { beforeAll, beforeEach, expect, it } from "vitest";

it("Should create a new product",async ()=>{
    const products = await axios.post('http://localhost:8080/gql', {
        query: `
          mutation {
            addProduct (name:"Adrian",description:"Best Coder Ever",price:12,rate:2) {name,price,rate,description} 
          }
        `
      })
      expect(products.data.data.addProduct).toBeTruthy()
})
it("Should Return a SiNGLE product",async ()=>{
    const id="64287e6231ada84db9093a66"

    const products = await axios.post('http://localhost:8080/gql', {
        query: `
          {
            productById (id:"${id}") {name,price,rate,description} 
          }
        `
      });
      expect(products.data.data.productById).toBeTruthy()
})
it("Should Return a Array of Products",async ()=>{
const products = await axios.post('http://localhost:8080/gql', {
    query: `
      {
        products  {name,price,rate,description,_id} 
      }
    `
  });
expect(products.data.data.products).toBeTruthy()

})
it("Should create an User an then delete it",async ()=>{
let products = await axios.post('http://localhost:8080/gql', {
query: `
  mutation {
    addProduct (name:"Adrian",description:"Best Coder Ever",price:12,rate:2) {name,price,rate,description,_id} 
  }
`
})
const id = products.data.data.addProduct
expect(id).toBeTruthy()
products = await axios.post('http://localhost:8080/gql', {
query: `
  mutation {
    deleteProduct (id:"${id}") {name,price,rate,description} 
  }
`
})
expect(products.data.data.deleteProduct.name).toBeTruthy()

})


    

