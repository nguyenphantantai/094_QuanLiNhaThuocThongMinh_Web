import { useQuery } from "@tanstack/react-query";
import { Product } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";

interface MedicineProductGridProps { searchQuery: string; }

export default function MedicineProductGrid({ searchQuery }: MedicineProductGridProps) {
  const { addItem } = useCart();
  const { data: products, isLoading, error } = useQuery<Product[]>({
    queryKey: ["/api/products", { search: searchQuery }],
    queryFn: async ({ queryKey }) => {
      const [, params] = queryKey as [string, { search?: string }];
      let url = "/api/products";
      const urlParams = new URLSearchParams();

      if (params.search && params.search.trim()) {
        urlParams.append("search", params.search.trim());
      }

      if (urlParams.toString()) {
        url += `?${urlParams.toString()}`;
      }

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      return response.json();
    },
  });

  if (isLoading) {
    return (
      <section className="bg-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="bg-card rounded-xl p-4 shadow-md">
                <Skeleton className="w-full h-32 rounded-lg mb-3" />
                <Skeleton className="h-4 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2 mb-2" />
                <Skeleton className="h-8 w-full" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-white py-8">
        <div className="container mx-auto px-4">
          <div className="text-center py-8">
            <p className="text-destructive">Không thể tải sản phẩm. Vui lòng thử lại sau.</p>
          </div>
        </div>
      </section>
    );
  }

  if (!products || products.length === 0) {
    return (
      <section className="bg-white py-8">
        <div className="container mx-auto px-4">
          <div className="text-center py-8">
            <p className="text-muted-foreground">{searchQuery ? "Không tìm thấy sản phẩm phù hợp" : "Không có sản phẩm nào"}</p>
          </div>
        </div>
      </section>
    );
  }

  const format = (n: string) => new Intl.NumberFormat("vi-VN").format(parseInt(n || "0"));
  const discountMoney = (p: Product) => (p.originalPrice ? Math.max(0, parseInt(p.originalPrice) - parseInt(p.price)) : 0);

  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-4 max-w-screen-2xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
          {products.map((p) => (
            <div key={p.id} className="bg-white rounded-xl overflow-hidden shadow-md border">
              <div className="relative p-3">
                {discountMoney(p) > 0 && (
                  <div className="absolute left-3 top-3 text-[12px] font-semibold bg-red-500 text-white rounded-md px-2 py-1">
                    {`Giảm ${format(discountMoney(p).toString())} đ`}
                  </div>
                )}
                {p.isNew && (
                  <div className="absolute right-3 top-3 text-[11px] font-bold bg-emerald-500 text-white rounded-full px-2 py-0.5">MỚI</div>
                )}
                <img src={p.imageUrl} alt={p.name} className="w-full h-36 object-cover rounded-lg" />
              </div>

              <div className="px-4 pb-4">
                <div className="h-12 text-sm font-medium line-clamp-2 mb-2 text-foreground">{p.name}</div>
                {p.originalPrice && parseInt(p.originalPrice) > parseInt(p.price) && (
                  <div className="text-xs text-muted-foreground line-through mb-1">{format(p.originalPrice)} đ</div>
                )}
                <div className="text-primary font-extrabold text-lg mb-2">{format(p.price)} đ/{p.unit}</div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs bg-red-500 text-white px-3 py-1 rounded-full">Đang bán chạy</span>
                </div>
                <Button onClick={() => addItem(p)} className="w-full">Chọn sản phẩm</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


