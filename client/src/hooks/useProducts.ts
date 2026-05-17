import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export interface Product {
  id: string
  category: string
  name: string
  description: string
  price: string
  image: string
  isNew: boolean
  gallery?: string[]
}

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from('products')
      .select('*, product_images(image_url)')
      .eq('is_active', true)
      .order('created_at', { ascending: false })

    if (!error && data) {
      setProducts(data.map(p => ({
        id: p.id,
        category: p.category_id, // will map to category name later
        name: p.name,
        description: p.description,
        price: `₹${Number(p.price).toLocaleString('en-IN')}`,
        image: p.image,
        isNew: p.is_new,
        gallery: p.product_images?.map((img: any) => img.image_url)
      })))
    }
    setLoading(false)
  }

  const addProduct = async (product: Omit<Product, 'id'>) => {
    const priceNum = parseFloat(product.price.replace(/[^0-9.]/g, ''))
    const { data, error } = await supabase
      .from('products')
      .insert({
        name: product.name,
        description: product.description,
        price: priceNum,
        image: product.image,
        is_new: product.isNew,
        is_active: true
      })
      .select()
      .single()

    if (!error && data) {
      await fetchProducts()
      return true
    }
    return false
  }

  useEffect(() => { fetchProducts() }, [])

  return { products, loading, fetchProducts, addProduct }
}
