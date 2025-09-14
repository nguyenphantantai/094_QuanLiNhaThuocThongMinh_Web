import { Product } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  product: Product;
  variant?: "default" | "hot-deal";
}

export default function ProductCard({ product, variant = "default" }: ProductCardProps) {
  const { addItem } = useCart();
  const formatPrice = (price: string) => {
    const numPrice = parseInt(price);
    return new Intl.NumberFormat("vi-VN").format(numPrice);
  };

  const discount = product.discountPercentage ?? 0;

  const getBadgeContent = () => {
    if (product.isNew) return { text: "MỚI", color: "bg-secondary text-secondary-foreground" };
    if (product.isHot) return { text: "HOT", color: "bg-accent text-accent-foreground" };
    if (discount > 0) {
      return { text: `-${discount}%`, color: "bg-red-500 text-white" };
    }
    return null;
  };

  const badge = getBadgeContent();

  if (variant === "hot-deal") {
    return (
      <div className="product-card bg-gradient-to-br from-red-500 to-orange-500 rounded-xl p-4 relative text-white shadow-lg">
        {badge && (
          <div className="badge">
            <Badge className="bg-yellow-400 text-red-600 font-bold">HOT</Badge>
          </div>
        )}
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-32 object-cover rounded-lg mb-3"
          loading="lazy"
        />
        {discount > 0 && (
          <div className="text-xs mb-1">Giảm {discount}%</div>
        )}
        <div className="bg-yellow-300 text-red-600 text-center font-bold text-lg rounded-full py-1 mb-2">
          {discount}%
        </div>
        <h3 className="font-semibold text-sm mb-2 line-clamp-2" data-testid={`text-product-name-${product.id}`}>
          {product.name}
        </h3>
        <div className="text-lg font-bold mb-3" data-testid={`text-product-price-${product.id}`}>
          {formatPrice(product.price)} đ/{product.unit}
        </div>
        <Button
          data-testid={`button-select-product-${product.id}`}
          className="w-full bg-white text-red-500 hover:bg-gray-100 py-2 rounded-lg text-sm font-semibold transition-colors"
          onClick={() => addItem(product)}
        >
          Chọn sản phẩm
        </Button>
      </div>
    );
  }

  return (
    <div className="product-card bg-card rounded-xl p-4 relative shadow-md">
      {badge && (
        <div className="badge">
          <Badge className={badge.color}>{badge.text}</Badge>
        </div>
      )}
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full h-32 object-cover rounded-lg mb-3"
        loading="lazy"
      />
      {discount > 0 && (
        <div className="text-xs text-muted-foreground mb-1">
          Giảm {formatPrice(
            (parseInt(product.originalPrice || "0") - parseInt(product.price)).toString()
          )} đ
        </div>
      )}
      <h3 className="font-semibold text-sm mb-2 line-clamp-2" data-testid={`text-product-name-${product.id}`}>
        {product.name}
      </h3>
      <div className="flex items-center justify-between mb-2">
        <span className="text-primary font-bold" data-testid={`text-product-price-${product.id}`}>
          {formatPrice(product.price)} đ/{product.unit}
        </span>
      </div>
      {product.originalPrice && parseInt(product.originalPrice) > parseInt(product.price) && (
        <div className="text-xs text-muted-foreground mb-3 line-through">
          {formatPrice(product.originalPrice)} đ
        </div>
      )}
      <Button
        data-testid={`button-select-product-${product.id}`}
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-2 rounded-lg text-sm font-semibold transition-colors"
        onClick={() => addItem(product)}
      >
        Chọn sản phẩm
      </Button>
    </div>
  );
}
