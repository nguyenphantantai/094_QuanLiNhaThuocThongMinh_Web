import { useQuery } from "@tanstack/react-query";
import { Product } from "@shared/schema";
import ProductCard from "./product-card";
import { Skeleton } from "@/components/ui/skeleton";

export default function TopSellingSection() {
  const { data: topSelling, isLoading, error } = useQuery<Product[]>({
    queryKey: ["/api/products/new"],
  });

  if (isLoading) {
    return (
      <section className="bg-muted py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-foreground">Top bán chạy toàn quốc</h2>
            <a href="#" className="text-primary hover:text-primary/80 font-medium">Xem thêm</a>
          </div>
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

  if (error || !topSelling?.length) {
    return (
      <section className="bg-muted py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-foreground">Top bán chạy toàn quốc</h2>
            <a href="#" className="text-primary hover:text-primary/80 font-medium">Xem thêm</a>
          </div>
          <div className="text-center py-8">
            <p className="text-muted-foreground">Không có sản phẩm bán chạy nào</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-muted py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-foreground">Top bán chạy toàn quốc</h2>
          <a href="#" className="text-primary hover:text-primary/80 font-medium" data-testid="link-view-more-top-selling">
            Xem thêm
          </a>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {topSelling.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
