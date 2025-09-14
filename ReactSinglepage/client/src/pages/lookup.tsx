import Header from "@/components/header";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Card } from "@/components/ui/card";
import { Search } from "lucide-react";
import { useState } from "react";

export default function LookupPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const popular = [
    { label: "Bệnh Phổi Tắc Nghẽn Mạn Tính", imageUrl: "https://production-cdn.pharmacity.io/digital/original/plain/blog/Nhung-dieu-can-biet-ve-benh-phoi-tac-nghen-man-tinh.png" },
    { label: "Trào Ngược Dạ Dày", imageUrl: "https://production-cdn.pharmacity.io/digital/original/plain/blog/traonguocdaday.png" },
    { label: "Bệnh Sởi", imageUrl: "https://production-cdn.pharmacity.io/digital/original/plain/blog/benh-soi-la-gi.png" },
    { label: "Bạch Hầu", imageUrl: "https://production-cdn.pharmacity.io/digital/original/plain/blog/bach-hau-1.webp" },
    { label: "Bệnh Cúm", imageUrl: "https://production-cdn.pharmacity.io/digital/original/plain/blog/benh-cum-mua.png" },
    { label: "Tay Chân Miệng", imageUrl: "https://production-cdn.pharmacity.io/digital/original/plain/blog/6O8D9s5k-benh-tay-chan-mieng.png" },
    { label: "Đau Mắt Đỏ", imageUrl: "https://production-cdn.pharmacity.io/digital/original/plain/blog/luu-y-khi-dau-mat-do-1-1.jpeg" },
    { label: "Tiểu Đường Thai Kỳ", imageUrl: "https://production-cdn.pharmacity.io/digital/original/plain/blog/C5beVEzq-Dai-thao-duong-thai-ky.png" },
    { label: "Tiểu Đường Tuýp 1", imageUrl: "https://production-cdn.pharmacity.io/digital/original/plain/blog/jEVc78M2-tieu-duong-2.jpg" },
    { label: "Tiểu Đường Tuýp 2", imageUrl: "https://production-cdn.pharmacity.io/digital/original/plain/blog/tieu-duong-tuyp-2.png" },
    { label: "Hen Suyễn", imageUrl: "https://production-cdn.pharmacity.io/digital/original/plain/blog/nhung-dieu-can-biet-ve-benh-hen-suyen.png" },
    { label: "Tiêu Chảy", imageUrl: "https://production-cdn.pharmacity.io/digital/original/plain/blog/tieu-chay-1.png" },
    { label: "Sốt Siêu Vi", imageUrl: "https://production-cdn.pharmacity.io/digital/original/plain/blog/sot-sieu-vi-1.jpg" },
    { label: "Giời Leo", imageUrl: "https://production-cdn.pharmacity.io/digital/original/plain/blog/gioi-leo-2.jpg" },
    { label: "Suy Thận Cấp", imageUrl: "https://production-cdn.pharmacity.io/digital/original/plain/blog/suy-than-1-1.webp" },
    { label: "Thuỷ Đậu", imageUrl: "https://production-cdn.pharmacity.io/digital/original/plain/blog/benh-thuy-dau-1.webp" },
    { label: "Tăng Huyết Áp", imageUrl: "https://production-cdn.pharmacity.io/digital/original/plain/blog/tang-huyet-ap-1.jpg" },
    { label: "Viêm Phế Quản", imageUrl: "https://production-cdn.pharmacity.io/digital/original/plain/blog/viem-phe-quan-la-gi-1.jpg" },
    { label: "Táo Bón", imageUrl: "https://production-cdn.pharmacity.io/digital/original/plain/blog/tao-bon-la-gi-1.jpg" },
    { label: "Bệnh Trĩ", imageUrl: "https://production-cdn.pharmacity.io/digital/original/plain/blog/eqNW91bk-benh-tri-4.png" },
    { label: "Alzheimer", imageUrl: "https://production-cdn.pharmacity.io/digital/original/plain/blog/Alzheimer-1.jpeg" },
    { label: "Chậm Kinh", imageUrl: "https://production-cdn.pharmacity.io/digital/original/plain/blog/cham-kinh-la-gi-4.jpg" },
    { label: "Mất Kinh", imageUrl: "https://production-cdn.pharmacity.io/digital/original/plain/blog/2bjOxPzP-mat-kinh-la-gi-1.jpg" },
    { label: "Tự Kỷ", imageUrl: "https://production-cdn.pharmacity.io/digital/original/plain/blog/tu-ky-1.webp" },
    { label: "Uốn Ván", imageUrl: "https://production-cdn.pharmacity.io/digital/original/plain/blog/lVQexeLE-bn-2.png" },
    { label: "Sốt Xuất Huyết", imageUrl: "https://production-cdn.pharmacity.io/digital/original/plain/blog/tre-em-de-bi-benh-sot-xuat-huyet.png" },
  ];

  const bodyParts = [
    { label: "Đầu", imageUrl: "https://production-cdn.pharmacity.io/digital/original/plain/blog/Head.png" },
    { label: "Tai Mũi Họng", imageUrl: "https://production-cdn.pharmacity.io/digital/original/plain/blog/Ear-nose-lips.png" },
    { label: "Ngực", imageUrl: "https://production-cdn.pharmacity.io/digital/original/plain/blog/Belly.png" },
    { label: "Cổ Vai Gáy", imageUrl: "https://production-cdn.pharmacity.io/digital/original/plain/blog/Shoulder.png" },
    { label: "Da", imageUrl: "https://production-cdn.pharmacity.io/digital/original/plain/blog/Skin-1-300x300-1.png" },
    { label: "Sinh dục", imageUrl: "https://production-cdn.pharmacity.io/digital/original/plain/blog/XY-300x300-1.png" },
    { label: "Tứ chi", imageUrl: "https://production-cdn.pharmacity.io/digital/original/plain/blog/Hand-foot-new.png" },
  ];

  const seasonal = [
    { label: "Bệnh Phổi Tắc Nghẽn Mạn Tính", imageUrl: "https://production-cdn.pharmacity.io/digital/original/plain/blog/Nhung-dieu-can-biet-ve-benh-phoi-tac-nghen-man-tinh.png" },
    { label: "Trào Ngược Dạ Dày", imageUrl: "https://production-cdn.pharmacity.io/digital/original/plain/blog/traonguocdaday.png" },
    { label: "Bệnh Sởi", imageUrl: "https://production-cdn.pharmacity.io/digital/original/plain/blog/benh-soi-la-gi.png" },
    { label: "Đau Mắt Đỏ", imageUrl: "https://production-cdn.pharmacity.io/digital/original/plain/blog/luu-y-khi-dau-mat-do-1-1.jpeg" },
    { label: "Bệnh Cúm", imageUrl: "https://production-cdn.pharmacity.io/digital/original/plain/blog/benh-cum-mua.png" },
    { label: "Sốt Phát Ban", imageUrl: "https://production-cdn.pharmacity.io/digital/original/plain/blog/sot-phat-ban.jpeg" },
    { label: "Bệnh Dị Ứng", imageUrl: "https://production-cdn.pharmacity.io/digital/original/plain/blog/benh-di-ung-1.jpg" },
    { label: "Đau Cơ Xương Khớp", imageUrl: "https://production-cdn.pharmacity.io/digital/original/plain/blog/dau-co-xuong-khop.png" },
    { label: "Viêm Họng Cấp", imageUrl: "https://production-cdn.pharmacity.io/digital/original/plain/blog/viem-hong-cap-3.jpg" },
    { label: "Tay Chân Miệng", imageUrl: "https://production-cdn.pharmacity.io/digital/original/plain/blog/6O8D9s5k-benh-tay-chan-mieng.png" },
    { label: "Viêm Phế Quản", imageUrl: "https://production-cdn.pharmacity.io/digital/original/plain/blog/viem-phe-quan-la-gi-1.jpg" },
    { label: "Viêm Xoang", imageUrl: "https://production-cdn.pharmacity.io/digital/original/plain/blog/viem-xoang-nen-an-gi-1.jpg" },
    { label: "Viêm Mũi Dị Ứng", imageUrl: "https://production-cdn.pharmacity.io/digital/original/plain/blog/viem-mui-di-ung-1.jpeg" },
    { label: "Ho", imageUrl: "https://production-cdn.pharmacity.io/digital/original/plain/blog/ho-1.webp" },
  ];

  const specialties = [
    { key: "timMach", label: "Bệnh Tim Mạch", imageUrl: "https://production-cdn.pharmacity.io/digital/original/plain/blog/TimMach.png" },
    { key: "coXuong", label: "Bệnh Cơ Xương Khớp", imageUrl: "https://production-cdn.pharmacity.io/digital/original/plain/blog/CoXuongKhop.png" },
    { key: "hohap", label: "Bệnh Hô Hấp", imageUrl: "https://production-cdn.pharmacity.io/digital/original/plain/blog/HoHap.png" },
    { key: "truyenNhiem", label: "Bệnh Truyền Nhiễm", imageUrl: "https://production-cdn.pharmacity.io/digital/original/plain/blog/TruyenNhiem.png" },
    { key: "thanKinh", label: "Bệnh Thần Kinh", imageUrl: "https://production-cdn.pharmacity.io/digital/original/plain/blog/ThanKinh.png" },
    { key: "da", label: "Bệnh Về Da", imageUrl: "https://production-cdn.pharmacity.io/digital/original/plain/blog/DaTocMong.png" },
    { key: "than", label: "Bệnh Thận - Tiết Niệu", imageUrl: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?q=80&w=400&auto=format&fit=crop" },
    { key: "tamly", label: "Bệnh Tâm Lý - Tâm Thần", imageUrl: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=400&auto=format&fit=crop" },
    { key: "taimuihong", label: "Bệnh Tai Mũi Họng", imageUrl: "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=400&auto=format&fit=crop" },
    { key: "sinhSan", label: "Sức Khỏe Sinh Sản", imageUrl: "https://images.unsplash.com/photo-1586015555751-63bb77f432a4?q=80&w=400&auto=format&fit=crop" },
    { key: "gioiTinh", label: "Sức Khỏe Giới Tính", imageUrl: "https://images.unsplash.com/photo-1596817576312-08c1f0c7b3a6?q=80&w=400&auto=format&fit=crop" },
    { key: "noiTiet", label: "Bệnh Nội Tiết - Chuyển Hóa", imageUrl: "https://images.unsplash.com/photo-1604908176997-4316514d4671?q=80&w=400&auto=format&fit=crop" },
    { key: "mau", label: "Bệnh Về Máu", imageUrl: "https://images.unsplash.com/photo-1618378894316-aac8fdf5d8d6?q=80&w=400&auto=format&fit=crop" },
    { key: "mat", label: "Bệnh Về Mắt", imageUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop" },
    { key: "diUng", label: "Bệnh Dị Ứng", imageUrl: "https://images.unsplash.com/photo-1594386596782-cf2a999b95f6?q=80&w=400&auto=format&fit=crop" },
    { key: "rangHamMat", label: "Bệnh Răng Hàm Mặt", imageUrl: "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=400&auto=format&fit=crop" },
    { key: "ungThu", label: "Ung thư", imageUrl: "https://images.unsplash.com/photo-1586015555751-63bb77f432a4?q=80&w=400&auto=format&fit=crop" },
    { key: "tieuHoa", label: "Bệnh Tiêu Hóa", imageUrl: "https://images.unsplash.com/photo-1604908176997-4316514d4671?q=80&w=400&auto=format&fit=crop" },
  ];

  const [activeSpecialty, setActiveSpecialty] = useState<string>("hohap");

  const specialtyItems: Record<string, string[]> = {
    hohap: [
      "Cúm RSV",
      "U phổi",
      "Bụi phổi silic",
      "Beryllium",
      "Khí phế thũng",
      "Xuất huyết phế nang vô căn",
      "Viêm phổi do Mycoplasma pneumoniae",
      "Áp-xe phổi",
      "Bụi phổi abtbet (amiăng)",
      "Phổi kẽ",
      "Bệnh Covid-19",
      "Giãn phế quản",
      "Bụi phổi",
      "MERS",
      "Chấn thương khí quản",
      "Ngưng thở khi ngủ do tắc nghẽn",
      "Viêm phổi do nấm",
      "Phổi kẽ",
      "Xơ phổi vô căn",
      "Viêm phổi kẽ lympho bào",
      "Bệnh phổi tắc nghẽn mạn tính (COPD)",
      "Chứng tạo đờm do virus",
      "Xuất huyết phế nang lan tỏa",
      "Viêm phổi do Metapneumovirus",
      "Tăng áp phổi",
      "Viêm phổi do Pneumocystis jirovecii",
      "Viêm phổi do tụ cầu",
      "Viêm phổi tăng bạch cầu ái toan",
      "Bụi phổi bông",
      "Suy hô hấp mạn",
    ],
  };

  const groups = [
    {
      title: "Bệnh Người Cao Tuổi",
      items: [
        "Tăng huyết áp",
        "Alzheimer",
        "Tai biến mạch máu não",
        "Bệnh tim mạch",
        "Loãng xương ở nam",
      ],
      image: "https://production-cdn.pharmacity.io/digital/original/plain/blog/NguoiCaoTuoi.png",
    },
    {
      title: "Bệnh Nam Giới",
      items: [
        "Mãn dục nam",
        "Yếu sinh lý",
        "Rối loạn cương dương",
        "Liệt dương",
        "Xuất tinh sớm",
      ],
      image: "https://production-cdn.pharmacity.io/digital/original/plain/blog/Men-300x300-1.png",
    },
    {
      title: "Bệnh Nữ Giới",
      items: [
        "Chậm kinh",
        "Hội chứng buồng trứng đa nang",
        "Ung thư vú",
        "U nang buồng trứng",
        "Nang vú",
      ],
      image: "https://production-cdn.pharmacity.io/digital/original/plain/blog/Women.png",
    },
    {
      title: "Bệnh Trẻ Em",
      items: ["Tay chân miệng", "Thủy đậu", "Tự kỷ", "Đinh thắng lưỡi", "Cảm lạnh"],
      image: "https://production-cdn.pharmacity.io/digital/original/plain/blog/TreEm.png",
    },
    {
      title: "Bệnh Tuổi Dậy Thì",
      items: ["Mụn trứng cá", "Chàm", "Viêm họng", "Mụn ẩn", "Rối loạn kinh nguyệt"],
      image: "https://production-cdn.pharmacity.io/digital/original/plain/blog/TuoiDayThi.png",
    },
    {
      title: "Bệnh Phụ Nữ Mang Thai",
      items: ["Tiểu đường thai kỳ", "Chửa trứng", "Suy thai", "Bể sản dịch", "Nha bám thấp"],
      image: "https://production-cdn.pharmacity.io/digital/original/plain/blog/MangThai.png",
    },
  ];

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
                <BreadcrumbPage>Bệnh</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Những điều cần biết về bệnh</h1>
          <div className="relative w-[340px] max-w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Tìm kiếm thông tin về bệnh..." className="pl-9" />
          </div>
        </div>

        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-3">Bộ phận cơ thể</h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 gap-4">
            {bodyParts.map((bp) => (
              <Card key={bp.label} className="p-4 text-center">
                <div className="mx-auto h-16 w-16 rounded-full bg-blue-50 mb-2 overflow-hidden">
                  <img 
                    src={bp.imageUrl} 
                    alt={bp.label}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="text-sm">{bp.label}</div>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-3">Bệnh phổ biến</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {popular.map((disease, idx) => (
              <Card key={disease.label} className="p-0 border rounded-xl overflow-hidden">
                <div className="h-28 bg-muted">
                  <img 
                    src={disease.imageUrl} 
                    alt={disease.label}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="px-4 py-3 text-sm font-medium">{disease.label}</div>
              </Card>
            ))}
          </div>
          <div className="flex justify-center mt-4">
            <Button variant="outline">Xem thêm</Button>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-3">Nhóm bệnh theo mùa</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {seasonal.map((disease) => (
              <Card key={disease.label} className="p-0 border rounded-xl overflow-hidden">
                <div className="h-20 bg-muted">
                  <img 
                    src={disease.imageUrl} 
                    alt={disease.label}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="px-4 py-3 text-sm font-medium line-clamp-2">{disease.label}</div>
              </Card>
            ))}
          </div>
          <div className="flex justify-center mt-4">
            <Button variant="outline">Xem thêm</Button>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-3">Bệnh theo đối tượng</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {groups.map((g) => (
              <Card key={g.title} className="p-0 border rounded-xl overflow-hidden">
                <div className="grid grid-cols-[1fr_120px] gap-0">
                  <div className="p-5">
                    <div className="font-semibold mb-2">{g.title}</div>
                    <ul className="list-disc list-inside space-y-1 text-[13px] text-foreground/90">
                      {g.items.map((x) => (
                        <li key={x}>{x}</li>
                      ))}
                    </ul>
                  </div>
                  <img src={g.image} alt="" className="h-full w-full object-cover" />
                </div>
                <div className="flex justify-end p-3 pt-0">
                  <Button size="sm" variant="secondary">Xem</Button>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-3">Chuyên trang bệnh học</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {specialties.slice(0, 6).map((s) => (
              <div key={s.key} className="text-center">
                <div className="mx-auto h-20 w-20 rounded-full bg-cyan-50 border border-cyan-200 mb-2 overflow-hidden">
                  <img 
                    src={s.imageUrl} 
                    alt={s.label}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="text-sm font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-3">Nhóm bệnh chuyên khoa</h2>
          <div className="flex flex-wrap gap-2 mb-4">
            {specialties.map((s) => (
              <Button
                key={s.key}
                onClick={() => setActiveSpecialty(s.key)}
                variant={activeSpecialty === s.key ? "default" : "outline"}
                size="sm"
                className="rounded-full"
              >
                {s.label}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[0, 1, 2].map((col) => (
              <ul key={col} className="space-y-3">
                {specialtyItems[activeSpecialty].filter((_, i) => i % 3 === col).slice(0, 10).map((name) => (
                  <li key={name}>
                    <a href="#" className="text-sky-700 hover:underline text-[15px]">{name}</a>
                  </li>
                ))}
              </ul>
            ))}
          </div>

          <div className="flex justify-center mt-6">
            <Button variant="outline">Xem thêm</Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}


