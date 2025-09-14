import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { BeautyCareProduct } from "@/data/beauty-care";

interface BeautyCareProductGridProps { products: BeautyCareProduct[]; }

export default function BeautyCareProductGrid({ products }: BeautyCareProductGridProps) {
  const { addItem } = useCart();

  if (!products || products.length === 0) {
    return (
      <section className="bg-white py-8">
        <div className="container mx-auto px-4 max-w-screen-2xl">
          <div className="text-center py-8">
            <p className="text-muted-foreground">Không tìm thấy sản phẩm phù hợp</p>
          </div>
        </div>
      </section>
    );
  }

  const format = (n: string) => new Intl.NumberFormat("vi-VN").format(parseInt(n || "0"));
  const discountMoney = (p: BeautyCareProduct) => (p.originalPrice ? Math.max(0, parseInt(p.originalPrice) - parseInt(p.price)) : 0);

  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-4 max-w-screen-2xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
          {products.map((p) => (
            <div key={p.id} className="bg-white rounded-xl overflow-hidden shadow-md border">
              <div className="relative p-3">
                {discountMoney(p) > 0 && (
                  <div className="absolute left-3 top-3 text-[12px] font-semibold bg-red-500 text-white rounded-md px-2 py-1">
                    {`Giảm ${format(discountMoney(p).toString())} ₫`}
                  </div>
                )}
                {p.isNew && (
                  <div className="absolute right-3 top-3 text-[11px] font-bold bg-emerald-500 text-white rounded-full px-2 py-0.5">MỚI</div>
                )}
                <img src={p.imageUrl} alt={p.name} className="w-full h-36 object-cover rounded-lg" />
              </div>

              <div className="px-4 pb-4">
                <div className="h-12 text-sm font-medium line-clamp-2 mb-2 text-foreground">{p.description}</div>
                {p.originalPrice && parseInt(p.originalPrice) > parseInt(p.price) && (
                  <div className="text-xs text-muted-foreground line-through mb-1">{format(p.originalPrice)} ₫</div>
                )}
                <div className="text-primary font-extrabold text-lg mb-2">{format(p.price)} ₫/{p.unit}</div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs bg-pink-600 text-white px-3 py-1 rounded-full">Chăm sóc sắc đẹp</span>
                </div>
                <Button onClick={() => addItem(p as any)} className="w-full">Chọn sản phẩm</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
