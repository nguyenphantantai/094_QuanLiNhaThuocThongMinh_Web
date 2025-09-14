import { useQuery } from "@tanstack/react-query";
import { Product } from "@shared/schema";
import ProductCard from "./product-card";
import { Skeleton } from "@/components/ui/skeleton";

export default function HotDealsSection() {
  const { data: hotDeals, isLoading, error } = useQuery<Product[]>({
    queryKey: ["/api/products/hot"],
  });

  if (isLoading) {
    return (
      <section className="bg-background py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-foreground">Siêu deal ngập tràn</h2>
            <a href="#" className="text-primary hover:text-primary/80 font-medium">Xem thêm</a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="bg-gradient-to-br from-red-500 to-orange-500 rounded-xl p-4">
                <Skeleton className="w-full h-32 rounded-lg mb-3 bg-white/20" />
                <Skeleton className="h-4 w-3/4 mb-2 bg-white/20" />
                <Skeleton className="h-4 w-1/2 mb-2 bg-white/20" />
                <Skeleton className="h-8 w-full bg-white/20" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error || !hotDeals?.length) {
    return (
      <section className="bg-background py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-foreground">Siêu deal ngập tràn</h2>
            <a href="#" className="text-primary hover:text-primary/80 font-medium">Xem thêm</a>
          </div>
          <div className="text-center py-8">
            <p className="text-muted-foreground">Không có deal hot nào hiện tại</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-foreground">Siêu deal ngập tràn</h2>
          <a href="#" className="text-primary hover:text-primary/80 font-medium" data-testid="link-view-more-hot-deals">
            Xem thêm
          </a>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {hotDeals.slice(0, 6).map((product) => (
            <ProductCard key={product.id} product={product} variant="hot-deal" />
          ))}
        </div>
      </div>
    </section>
  );
}
