import React from 'react'
import Layout from '../../components/layout/Layout'
import ProductCard from '../../components/productCard/ProductCard'

const AllProducts = () => {
  return (
    <Layout>
 <ProductCard limit="-1" />
    </Layout>

  )
}

export default AllProducts
