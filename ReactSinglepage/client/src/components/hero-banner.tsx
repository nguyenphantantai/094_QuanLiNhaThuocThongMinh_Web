import { Button } from "@/components/ui/button";

export default function HeroBanner() {
  return (
    <section className="hero-gradient py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main promotional banner */}
          <div className="lg:col-span-2">
            <div className="relative bg-gradient-to-r from-orange-400 via-yellow-400 to-green-400 rounded-2xl p-6 overflow-hidden">
              <div className="absolute top-4 left-4 bg-white rounded-full px-3 py-1 text-sm font-semibold">
                <span className="text-primary">NHÀ THUỐC</span>
                <span className="text-secondary"> Pharmacy</span>
              </div>
              <div className="text-center mt-8">
                <h1 className="text-4xl font-bold text-white mb-2">Gì cũng có</h1>
                <h2 className="text-5xl font-bold text-red-600 mb-4">Siêu deal</h2>
                <div className="bg-yellow-400 text-red-600 font-bold text-2xl px-6 py-2 rounded-full inline-block mb-4">
                  GIẢM ĐẾN 10%
                </div>
              </div>
              {/* Product showcase placeholder */}
              <div className="flex justify-center items-end mt-4 space-x-2">
                <div className="w-16 h-20 bg-white/20 rounded backdrop-blur"></div>
                <div className="w-16 h-20 bg-white/20 rounded backdrop-blur"></div>
                <div className="w-16 h-20 bg-white/20 rounded backdrop-blur"></div>
              </div>
              <Button
                data-testid="button-buy-now"
                className="absolute bottom-4 right-4 bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg font-semibold"
              >
                MUA NGAY
              </Button>
            </div>
          </div>
          
          {/* Side banners */}
          <div className="space-y-4">
            <div className="bg-primary rounded-xl p-6 text-primary-foreground">
              <h3 className="text-lg font-bold mb-2">HƯỚNG DẪN TRA CỨU</h3>
              <h4 className="text-xl font-bold mb-4">THÔNG TIN THUỐC ĐÚNG CÁCH</h4>
              <div className="mt-4 flex items-center">
                <div className="text-3xl mr-4">👨‍⚕️</div>
                <Button
                  data-testid="button-learn-more"
                  variant="secondary"
                  size="sm"
                  className="bg-white/20 text-primary-foreground hover:bg-white/30"
                >
                  TÌM HIỂU
                </Button>
              </div>
            </div>
            
            <div className="bg-blue-50 rounded-xl p-6">
              <div className="text-primary text-sm font-semibold mb-2">
                THỰC PHẨM CHỨC NĂNG CỦA THEMA
              </div>
              <h3 className="text-2xl font-bold text-primary mb-4">PROBIOTICS + ZINC</h3>
              <div className="mt-4 flex items-center justify-between">
                <div className="bg-red-500 text-white font-bold text-lg px-3 py-1 rounded">HOT</div>
                <div className="text-primary font-bold text-xl">120.000đ</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
