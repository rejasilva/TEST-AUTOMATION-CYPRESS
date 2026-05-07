describe('API Testing Fake Store API', () => {

  // 1. GET ALL PRODUCTS
  it('GET All Products', () => {

    cy.request('GET', 'https://fakestoreapi.com/products')
      .then((response) => {

        expect(response.status).to.eq(200)

      })
  })

  // 2. GET SINGLE PRODUCT
  it('GET Single Product', () => {

    cy.request('GET', 'https://fakestoreapi.com/products/1')
      .then((response) => {

        expect(response.status).to.eq(200)
        expect(response.body.id).to.eq(1)

      })
  })

  // 3. GET ALL CATEGORIES
  it('GET Categories', () => {

    cy.request('GET', 'https://fakestoreapi.com/products/categories')
      .then((response) => {

        expect(response.status).to.eq(200)

      })
  })

  // 4. CREATE PRODUCT
  it('POST Create Product', () => {

    cy.request('POST', 'https://fakestoreapi.com/products', {
      title: 'Test Product',
      price: 100
    }).then((response) => {

      expect(response.status).to.be.oneOf([200, 201])

    })
  })

  // 5. UPDATE PRODUCT
  it('PUT Update Product', () => {

    cy.request('PUT', 'https://fakestoreapi.com/products/1', {
      title: 'Updated Product',
      price: 200
    }).then((response) => {

      expect(response.status).to.eq(200)

    })
  })

  // 6. DELETE PRODUCT
  it('DELETE Product', () => {

    cy.request('DELETE', 'https://fakestoreapi.com/products/1')
      .then((response) => {

        expect(response.status).to.eq(200)

      })
  })

  // 7. GET CARTS
  it('GET Carts', () => {

    cy.request('GET', 'https://fakestoreapi.com/carts')
      .then((response) => {

        expect(response.status).to.eq(200)

      })
  })

})