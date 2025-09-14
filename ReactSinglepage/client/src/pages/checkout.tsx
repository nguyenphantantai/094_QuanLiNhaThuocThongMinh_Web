import Header from "@/components/header";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { useCart } from "@/hooks/use-cart";

export default function CheckoutPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const { items } = useCart();
  const [paymentMethod, setPaymentMethod] = useState<string>("cod");

  const toNum = (s: string) => parseInt(s || "0");
  const format = (n: number) => new Intl.NumberFormat("vi-VN").format(n);
  const subtotal = items.reduce((sum, i) => sum + toNum(i.product.price) * i.quantity, 0);

  return (
    <div className="bg-background min-h-screen">
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <main className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-4">
          <Link href="/cart" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:underline">
            <ArrowLeft className="h-4 w-4" />
            Quay lại giỏ hàng
          </Link>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">
          <section className="bg-card rounded-2xl border p-8">
            <h2 className="text-lg font-semibold mb-4">Thông tin nhận hàng</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input className="h-11 rounded-md border px-3" placeholder="Họ và tên người đặt" />
              <input className="h-11 rounded-md border px-3" placeholder="Số điện thoại" />
              <input className="h-11 rounded-md border px-3 md:col-span-2" placeholder="Email (không bắt buộc)" />
            </div>

            <h3 className="font-semibold mt-8 mb-3">Địa chỉ nhận hàng</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input className="h-11 rounded-md border px-3" placeholder="Họ và tên người nhận" />
              <input className="h-11 rounded-md border px-3" placeholder="Số điện thoại" />
              <input className="h-11 rounded-md border px-3" placeholder="Tỉnh/Thành phố" />
              <input className="h-11 rounded-md border px-3" placeholder="Quận/Huyện" />
              <input className="h-11 rounded-md border px-3 md:col-span-2" placeholder="Phường/Xã" />
              <input className="h-11 rounded-md border px-3 md:col-span-2" placeholder="Địa chỉ cụ thể" />
            </div>
            <h3 className="font-semibold mt-8 mb-3">Chọn phương thức thanh toán</h3>
            <div className="divide-y rounded-xl border">
              {[
                { id: "cod", label: "Thanh toán tiền mặt khi nhận hàng" },
                { id: "qr", label: "Thanh toán bằng chuyển khoản (QR Code)" },
                { id: "atm", label: "Thanh toán bằng thẻ ATM nội địa và tài khoản ngân hàng" },
                { id: "card", label: "Thanh toán bằng thẻ quốc tế Visa, Master, JCB, AMEX (GooglePay, ApplePay)" },
                { id: "zalopay", label: "Thanh toán bằng ví ZaloPay" },
                { id: "momo", label: "Thanh toán bằng ví MoMo" },
                { id: "vnpay", label: "Thanh toán bằng VNPAY" },
              ].map((m) => (
                <label key={m.id} className="flex items-center gap-3 p-4 cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    className="h-4 w-4"
                    checked={paymentMethod === m.id}
                    onChange={() => setPaymentMethod(m.id)}
                  />
                  <span className="text-sm">{m.label}</span>
                </label>
              ))}
            </div>
          </section>

          <aside className="bg-card rounded-2xl border p-8 h-max">
            <h3 className="font-semibold mb-4">Thành tiền</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex justify-between"><span>Tổng tiền</span><span>{format(subtotal)}đ</span></div>
              <div className="flex justify-between"><span>Giảm giá</span><span>0đ</span></div>
            </div>
            <Button className="mt-6 w-full">Hoàn tất</Button>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}


