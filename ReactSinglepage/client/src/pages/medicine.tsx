import Header from "@/components/header";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import MedicineProductGrid from "@/components/medicine-product-grid";
import { useState } from "react";

export default function MedicinePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState<string | undefined>(undefined);
  const [brandFilterQuery, setBrandFilterQuery] = useState("");
  const [showAllBrands, setShowAllBrands] = useState(false);

  const categories = [
    {
      label: "Thuốc không kê đơn",
      imageUrl:
        "https://production-cdn.pharmacity.io/digital/256x256/plain/e-com/images/ecommerce/20240223191727-0-P00126_5.png",
    },
    {
      label: "Thuốc kê đơn",
      imageUrl:
        "https://production-cdn.pharmacity.io/digital/256x256/plain/e-com/images/ecommerce/20240223191446-0-P00218_1_l.png",
    },
    {
      label: "Thuốc khác",
      imageUrl:
        "https://production-cdn.pharmacity.io/digital/256x256/plain/e-com/images/product/20241114032116-0-P01147_1.png?versionId=vjQWD_h1BWBzg10ZLGzWbTfrxumLOzPo",
    },
    {
      label: "Vitamin & Thực phẩm chức năng",
      imageUrl:
        "https://production-cdn.pharmacity.io/digital/256x256/plain/e-com/images/product/20241128031704-0-P28451_1.jpg?versionId=co6QK3WcZuzQyCzl5q6CrXov0GkwnoEu",
    },
  ];

  const brands = [
    "STELLA",
    "DHG Pharma",
    "Davipharm",
    "Hasan- Demarpharm",
    "Domesco",
    "Pymepharco",
    "Imexpharm",
    "Traphaco",
    "Sao Thái Dương",
  ];

  const visibleBrands = (showAllBrands ? brands : brands.slice(0, 5)).filter((b) =>
    b.toLowerCase().includes(brandFilterQuery.toLowerCase())
  );

  return (
    <div className="bg-background min-h-screen">
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <main className="mx-auto max-w-screen-2xl px-6 py-8">
        <div className="mb-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Trang chủ</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Thuốc</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <h1 className="text-2xl font-bold mb-4">Thuốc</h1>

        <section className="bg-card border rounded-xl overflow-hidden mb-6">
          <div className="grid grid-cols-2 sm:grid-cols-4">
            {categories.map((c) => (
              <div key={c.label} className="p-4 border-r last:border-r-0 border-b sm:border-b-0">
                <div className="h-24 w-24 mx-auto rounded-full bg-muted mb-2 overflow-hidden flex items-center justify-center">
                  <img
                    src={c.imageUrl}
                    alt={c.label}
                    className="h-full w-full object-contain p-2"
                    loading="lazy"
                  />
                </div>
                <div className="text-sm text-center leading-snug">{c.label}</div>
              </div>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
          <aside className="bg-card rounded-xl border p-4 h-max">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-semibold">Bộ lọc</h2>
              <Button variant="ghost" size="sm">Thiết lập lại</Button>
            </div>

            <div className="space-y-6">
              <div>
                <div className="text-sm font-medium mb-2">Khoảng giá</div>
                <div className="flex items-center gap-2">
                  <Input placeholder="Tối thiểu" className="h-9" />
                  <Input placeholder="Tối đa" className="h-9" />
                </div>
                <Button className="mt-3 w-full">Áp dụng</Button>

                <div className="mt-3 space-y-2">
                  <RadioGroup value={priceRange} onValueChange={setPriceRange} className="space-y-3">
                    <div className="flex items-center gap-2">
                      <RadioGroupItem id="pr1" value="lt-100" />
                      <Label htmlFor="pr1" className="font-normal">Dưới 100.000 đ</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem id="pr2" value="100-300" />
                      <Label htmlFor="pr2" className="font-normal">100.000 đ - 300.000 đ</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem id="pr3" value="300-500" />
                      <Label htmlFor="pr3" className="font-normal">300.000 đ - 500.000 đ</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem id="pr4" value=">500" />
                      <Label htmlFor="pr4" className="font-normal">Trên 500.000 đ</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>

              <div className="h-px bg-border" />

              <div>
                <div className="text-sm font-medium mb-2">Thương hiệu</div>
                <Input
                  value={brandFilterQuery}
                  onChange={(e) => setBrandFilterQuery(e.target.value)}
                  placeholder="Nhập tên thương hiệu"
                  className="h-9 mb-3"
                />
                <div className="space-y-3">
                  {visibleBrands.map((b) => (
                    <div key={b} className="flex items-center gap-2">
                      <Checkbox id={`brand-${b}`} />
                      <Label htmlFor={`brand-${b}`} className="font-normal">{b}</Label>
                    </div>
                  ))}
                </div>
                {brands.length > 5 && !showAllBrands && (
                  <Button variant="link" className="px-0 mt-2" onClick={() => setShowAllBrands(true)}>Xem thêm</Button>
                )}
              </div>
            </div>
          </aside>

          <section>
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm text-muted-foreground">Sắp xếp theo:</div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">Giá giảm dần</Button>
                <Button variant="outline" size="sm">Giá tăng dần</Button>
              </div>
            </div>

            <MedicineProductGrid searchQuery={searchQuery} />
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}


