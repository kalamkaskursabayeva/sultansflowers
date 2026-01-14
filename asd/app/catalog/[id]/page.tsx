"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/header"
import { useRouter } from "next/navigation"
import { mockProducts } from "@/lib/mock-data"

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const [product, setProduct] = useState<any>(null)
  const [quantity, setQuantity] = useState(10)
  const [deliveryDate, setDeliveryDate] = useState("")
  const [loading, setLoading] = useState(true)
  const [addingToCart, setAddingToCart] = useState(false)
  const router = useRouter()
  const [productId, setProductId] = useState("")

  useEffect(() => {
    const resolveParams = async () => {
      const { id } = await params
      setProductId(id)
    }
    resolveParams()
  }, [params])

  useEffect(() => {
    if (!productId) return

    // Find product from mock data
    const foundProduct = mockProducts.find((p) => p.id === productId)
    setProduct(foundProduct || null)
    setLoading(false)
  }, [productId])

  const handleAddToCart = async () => {
    if (quantity < (product?.min_order_quantity || 10)) {
      alert(`Minimum order quantity is ${product?.min_order_quantity || 10}`)
      return
    }

    setAddingToCart(true)
    // Mock add to cart
    setTimeout(() => {
      alert("Added to cart!")
      router.push("/cart")
      setAddingToCart(false)
    }, 500)
  }

  if (loading)
    return (
      <div>
        <Header />
        Loading...
      </div>
    )
  if (!product)
    return (
      <div>
        <Header />
        Product not found
      </div>
    )

  return (
    <div>
      <Header />
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-muted rounded-lg h-96 flex items-center justify-center">
            <div className="text-9xl">🌹</div>
          </div>

          <div>
            <h1 className="text-4xl font-bold text-foreground mb-4">{product.name}</h1>
            <p className="text-lg text-muted-foreground mb-8">{product.description}</p>

            <div className="space-y-4 mb-8">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Color</p>
                  <p className="font-semibold text-foreground">{product.color}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Variety</p>
                  <p className="font-semibold text-foreground">{product.variety}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Stem Length</p>
                  <p className="font-semibold text-foreground">{product.stem_length}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Packaging</p>
                  <p className="font-semibold text-foreground">{product.packaging_type}</p>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6 mb-8">
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <p className="text-sm text-muted-foreground">Price per unit</p>
                  <p className="text-3xl font-bold text-primary">${product.price_per_unit}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Min. order</p>
                  <p className="text-2xl font-bold">{product.min_order_quantity}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-muted-foreground">In stock</p>
                  <p className="text-2xl font-bold text-primary">{product.stock_quantity}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Next delivery</p>
                  <p className="text-sm font-semibold">
                    {product.next_delivery_date ? new Date(product.next_delivery_date).toLocaleDateString() : "TBA"}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Quantity</label>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(Math.max(product.min_order_quantity || 10, Number.parseInt(e.target.value)))
                  }
                  className="w-full px-4 py-2 border border-border rounded-lg"
                  min={product.min_order_quantity || 10}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Desired Delivery Date (optional)
                </label>
                <input
                  type="date"
                  value={deliveryDate}
                  onChange={(e) => setDeliveryDate(e.target.value)}
                  className="w-full px-4 py-2 border border-border rounded-lg"
                />
              </div>

              <button
                onClick={handleAddToCart}
                disabled={addingToCart}
                className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:bg-accent transition-colors disabled:opacity-50"
              >
                {addingToCart ? "Adding..." : "Add to Cart"}
              </button>

              <a
                href="https://wa.me/your-number"
                className="block text-center py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                Order via WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
