import { Link } from "wouter";

export default function CategoryNavigation() {
  const categories = [
    { name: "Tư vấn mua thuốc", icon: "💊", slug: "tu-van-mua-thuoc" },
    { name: "Hệ thống dược sĩ", icon: "❤️", slug: "he-thong-duoc-si" },
    { name: "Mã giảm giá hàng", icon: "📊", slug: "ma-giam-gia" },
    { name: "Chi tiết sức khỏe", icon: "🚚", slug: "chi-tiet-suc-khoe" },
    { name: "Chăm đẹp chuẩn", icon: "🌿", slug: "cham-dep-chuan" },
    { name: "Deal hot tháng 9", icon: "🔥", slug: "deal-hot-thang-9" },
    { name: "Lịch sử Đơn vàng", icon: "⏰", slug: "lich-su-don-vang" },
    { name: "Xem thêm", icon: "➡️", slug: "xem-them" },
  ];

  return (
    <section className="bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
          {categories.map((category) => (
            <Link key={category.slug} href={`/${category.slug}`} className="text-center category-icon cursor-pointer" data-testid={`category-${category.slug}`}>
              <div
                className={`rounded-xl p-4 mb-2 mx-auto w-16 h-16 flex items-center justify-center transition-colors ${
                  category.slug === "tu-van-mua-thuoc"
                    ? "bg-blue-100"
                    : category.slug === "he-thong-duoc-si"
                    ? "bg-green-100"
                    : category.slug === "ma-giam-gia"
                    ? "bg-orange-100"
                    : category.slug === "chi-tiet-suc-khoe"
                    ? "bg-red-100"
                    : category.slug === "cham-dep-chuan"
                    ? "bg-purple-100"
                    : category.slug === "deal-hot-thang-9"
                    ? "bg-pink-100"
                    : category.slug === "lich-su-don-vang"
                    ? "bg-yellow-100"
                    : "bg-gray-100"
                }`}
              >
                <span className="text-2xl">{category.icon}</span>
              </div>
              <span className="text-sm font-medium">{category.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
