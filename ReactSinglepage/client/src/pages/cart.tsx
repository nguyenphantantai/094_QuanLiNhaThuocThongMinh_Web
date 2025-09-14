import Header from "@/components/header";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/hooks/use-cart";

export default function CartPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const { items, removeItem, clear } = useCart();

  const format = (n: number) => new Intl.NumberFormat("vi-VN").format(n);
  const toNum = (s: string) => parseInt(s || "0");
  const subtotal = items.reduce((sum, i) => sum + toNum(i.product.price) * i.quantity, 0);

  return (
    <div className="bg-background min-h-screen">
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <main className="mx-auto max-w-7xl px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">
          <section className="bg-card rounded-2xl border p-8">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <Link href="/" className="inline-flex items-center gap-2 hover:underline">
                <ArrowLeft className="h-4 w-4" />
                Tiếp tục mua sắm
              </Link>
            </div>

            <h2 className="text-lg font-semibold mb-4">Giỏ hàng của bạn</h2>

            {items.length === 0 ? (
              <div className="rounded-xl border border-dashed p-14 text-center text-base">
                <p className="text-muted-foreground">Chưa có sản phẩm nào trong giỏ hàng.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map(({ product, quantity }) => (
                  <div key={product.id} className="flex items-center gap-4 p-4 border rounded-xl">
                    <img src={product.imageUrl} alt={product.name} className="w-20 h-20 object-cover rounded-md" />
                    <div className="flex-1">
                      <div className="font-medium">{product.name}</div>
                      <div className="text-sm text-muted-foreground">{format(toNum(product.price))} đ/{product.unit}</div>
                    </div>
                    <div className="w-16 text-center">x{quantity}</div>
                    <div className="w-28 text-right font-semibold">{format(toNum(product.price) * quantity)} đ</div>
                    <Button variant="ghost" onClick={() => removeItem(product.id)}>Xóa</Button>
                  </div>
                ))}
                <div className="flex justify-between pt-2">
                  <Button variant="secondary" onClick={clear}>Xóa tất cả</Button>
                </div>
              </div>
            )}
          </section>

          <aside className="bg-card rounded-2xl border p-8 h-max">
            <h3 className="font-semibold mb-4">Thành tiền</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex justify-between"><span>Tổng tiền</span><span>{format(subtotal)}đ</span></div>
              <div className="flex justify-between"><span>Giảm giá</span><span>0đ</span></div>
            </div>
            <Link href="/checkout">
              <Button className="mt-6 w-full" disabled={items.length === 0}>Mua hàng</Button>
            </Link>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}


