import { Search, User, ShoppingCart, MapPin, Phone, Bell, Menu, ChevronDown, Pill, Stethoscope, Syringe, Thermometer, Sparkles, Heart, LogOut } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Link, useLocation } from "wouter";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useCart } from "@/hooks/use-cart";
import GarenaAuthDialog from "./garena-auth-dialog";

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function Header({ searchQuery, onSearchChange }: HeaderProps) {
  const headerRef = useRef<HTMLElement | null>(null);
  const [headerHeight, setHeaderHeight] = useState<number>(0);
  const [location] = useLocation();
  const isCartPage = location.startsWith("/cart");
  const { items } = useCart();
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const navRef = useRef<HTMLDivElement | null>(null);
  const [user, setUser] = useState<any>(null);

  // Check if user is logged in
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
    setUser(null);
    window.location.reload();
  };

  useLayoutEffect(() => {
    const measure = () => {
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.getBoundingClientRect().height);
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!navRef.current) return;
      if (!navRef.current.contains(e.target as Node)) {
        setIsCategoryOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    // Close menu when navigating to other pages
    setIsCategoryOpen(false);
  }, [location]);

  return (
    <>
    <header ref={headerRef} className="bg-primary text-primary-foreground fixed top-0 left-0 right-0 z-50 w-full">
      <div className="container mx-auto px-4">
        {/* Main header */}
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center mr-6 shrink-0">
            <div className="text-2xl font-bold mr-2 leading-tight">
              <span className="text-white">NHÀ THUỐC</span><br />
              <span className="text-secondary text-3xl">Pharmacy</span>
            </div>
          </div>
          
          {/* Search bar */}
          <div className="flex-1 mx-6 max-w-[920px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                data-testid="input-search"
                type="text"
                placeholder="Bạn đang tìm gì hôm nay..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full h-12 pl-10 pr-20 rounded-full text-foreground bg-white border-0 focus-visible:ring-2 focus-visible:ring-secondary"
              />
              <Button
                data-testid="button-search"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-secondary hover:bg-secondary/90 text-secondary-foreground px-5 h-9 rounded-full"
              >
                Tìm
              </Button>
            </div>
            {/* Suggestion links under search */}
            <div className="mt-2 hidden md:flex flex-wrap gap-4 text-xs text-primary-foreground/90">
              {[
                "sữa dinh dưỡng",
                "probiotics",
                "khẩu trang",
                "kem chống nắng",
                "collagen",
                "giải nhiệt",
                "hạ sốt",
                "Mua 1 Tặng 1",
              ].map((label) => (
                <a key={label} href="#" className="hover:underline">
                  {label}
                </a>
              ))}
            </div>
          </div>
          
          {/* User actions */}
          <div className="flex items-center gap-3 shrink-0">
            <Button variant="ghost" size="icon" className="text-primary-foreground">
              <Bell className="h-5 w-5" />
            </Button>
            {isCartPage ? (
              <Link href="/cart">
                <Button
                  data-testid="button-cart"
                  variant="ghost"
                  size="icon"
                  className="relative text-primary-foreground"
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground rounded-full text-xs min-w-5 h-5 px-1 flex items-center justify-center">
                    {itemCount}
                  </span>
                </Button>
              </Link>
            ) : (
              <Dialog>
                <DialogTrigger asChild>
                  <Link href="/cart">
                    <Button
                      data-testid="button-cart"
                      variant="ghost"
                      size="icon"
                      className="relative text-primary-foreground"
                    >
                      <ShoppingCart className="h-5 w-5" />
                      <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground rounded-full text-xs min-w-5 h-5 px-1 flex items-center justify-center">
                        {itemCount}
                      </span>
                    </Button>
                  </Link>
                </DialogTrigger>
                <DialogContent overlayClassName="bg-black/30" className="max-w-2xl w-[92vw] p-0">
                  <div className="p-6 border-b">
                    <h3 className="text-xl font-semibold">Giỏ hàng</h3>
                  </div>
                  <div className="p-6">
                    <div className="text-center text-muted-foreground">Chưa có sản phẩm nào trong giỏ hàng.</div>
                    <div className="mt-6 flex justify-start">
                      <Button variant="secondary">Tiếp tục mua sắm</Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            )}
            <span className="h-6 w-px bg-primary-foreground/30" />
            {user ? (
              <div className="flex items-center gap-2">
                <span className="text-sm text-primary-foreground">
                  Xin chào, {user.firstName} {user.lastName}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="text-primary-foreground hover:text-secondary"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <GarenaAuthDialog>
                <Button
                  data-testid="button-login"
                  className="rounded-full bg-white text-primary hover:bg-white/90 px-4 h-9"
                >
                  <User className="h-4 w-4 mr-2" />
                  <span className="text-sm">Đăng nhập/ Đăng ký</span>
                </Button>
              </GarenaAuthDialog>
            )}
          </div>
        </div>
        
        {/* Navigation */}
        <nav className="border-t border-primary-foreground/20 py-2" ref={navRef}>
          <div className="relative flex items-center gap-6 text-sm">
            <Button className="rounded-md bg-primary-foreground text-primary px-4 h-9" onClick={() => setIsCategoryOpen((v) => !v)}>
              <Menu className="h-4 w-4 mr-2" />
              Danh mục
              <ChevronDown className={`h-4 w-4 ml-2 transition-transform ${isCategoryOpen ? "rotate-180" : ""}`} />
            </Button>

            {isCategoryOpen && (
              <div className="absolute left-0 top-[110%] z-40 w-[1180px] max-w-[95vw] bg-background text-foreground rounded-md shadow-xl border overflow-hidden">
                <div className="grid grid-cols-[300px_1fr]">
                  <div className="bg-muted/40">
                    {[
                      { label: "Thuốc", icon: Pill, href: "/thuoc" },
                      { label: "Tra cứu bệnh", icon: Stethoscope, href: "/benh" },
                      { label: "Thực phẩm bảo vệ sức khỏe", icon: Sparkles, href: "/thuc-pham" },
                      { label: "Chăm sóc cá nhân", icon: Heart, href: "/cham-soc-ca-nhan" },
                      { label: "Chăm sóc sắc đẹp", icon: Sparkles, href: "/cham-soc-sac-dep" },
                      { label: "Thiết bị y tế", icon: Syringe, href: "/thiet-bi-y-te" },
                      { label: "Sản phẩm tiện lợi", icon: Thermometer },
                    ].map((item, idx) => (
                      <Link key={item.label} href={(item as any).href || "#"} className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-background transition-colors ${idx === 0 ? "bg-background" : ""}`}>
                        {(() => {
                          const Icon = item.icon;
                          return <Icon className="h-5 w-5 text-primary" />;
                        })()}
                        <span className="text-sm">{item.label}</span>
                      </Link>
                    ))}
                  </div>

                  <div className="p-6">
                    <div className="grid grid-cols-5 gap-6">
                      {[
                        { label: "Thuốc không kê đơn" },
                        { label: "Thuốc kê đơn" },
                        { label: "Thuốc khác" },
                        { label: "Vitamin & Thực phẩm..." },
                        { label: "Xem tất cả", href: "/thuoc" },
                      ].map((item) => (
                        <Link key={item.label} href={(item as any).href || "#"} className="flex flex-col items-center gap-3">
                          <div className="h-24 w-full rounded-md bg-muted" />
                          <div className="text-sm text-center leading-snug">{item.label}</div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
            <ul className="flex items-center gap-6 overflow-x-auto">
              <li>
                <Link href="/thuoc" className="hover:text-secondary transition-colors" data-testid="link-medicine">
                  Thuốc
                </Link>
              </li>
              <li>
                <Link href="/benh" className="hover:text-secondary transition-colors" data-testid="link-lookup">
                  Tra cứu bệnh
                </Link>
              </li>
              <li>
                <Link href="/thuc-pham" className="hover:text-secondary transition-colors" data-testid="link-supplements">
                  Thực phẩm bảo vệ sức khỏe
                </Link>
              </li>
              <li>
                <Link href="/me-va-be" className="hover:text-secondary transition-colors" data-testid="link-mother-baby">
                  Mẹ và bé
                </Link>
              </li>
              <li>
                <Link href="/cham-soc-ca-nhan" className="hover:text-secondary transition-colors" data-testid="link-personal-care">
                  Chăm sóc cá nhân
                </Link>
              </li>
              <li>
                <Link href="/cham-soc-sac-dep" className="hover:text-secondary transition-colors" data-testid="link-beauty-care">
                  Chăm sóc sắc đẹp
                </Link>
              </li>
              <li>
                <Link href="/thiet-bi-y-te" className="hover:text-secondary transition-colors" data-testid="link-medical-devices">
                  Thiết bị y tế
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
    <div style={{ height: headerHeight }} />
    </>
  );
}
