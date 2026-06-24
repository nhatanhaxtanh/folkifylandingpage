import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Music, Clock, MapPin, Star } from "lucide-react";
import Navbar from "@/components/Navbar";
import FooterColumn from "@/components/ui/footer-column";

const instruments: Record<string, {
  name: string;
  type: string;
  difficulty: number;
  origin: string;
  era: string;
  shortDesc: string;
  history: { title: string; content: string }[];
  facts: string[];
  color: string;
  image: string;
  imagePos?: string;
}> = {
  "dan-tranh": {
    name: "Đàn Tranh",
    type: "Dây gảy",
    difficulty: 3,
    origin: "Trung Quốc — du nhập vào Việt Nam",
    era: "Khoảng thế kỷ 7–9",
    image: "/instrument-dan-tranh.jpg",
    imagePos: "center",
    shortDesc: "Nhạc cụ 16 dây, biểu tượng của âm nhạc truyền thống Việt Nam.",
    history: [
      {
        title: "Nguồn gốc từ phương Bắc",
        content: "Đàn Tranh có nguồn gốc từ đàn Zheng của Trung Quốc, được du nhập vào Việt Nam qua nhiều thế kỷ giao lưu văn hóa. Tuy nhiên, qua thời gian, người Việt đã cải biến nhạc cụ này để phù hợp với âm nhạc và thẩm mỹ của mình, tạo ra bản sắc riêng biệt.",
      },
      {
        title: "Thời kỳ cung đình Huế",
        content: "Đàn Tranh trở thành nhạc cụ quan trọng trong nhã nhạc cung đình Huế — thể loại âm nhạc nghi lễ của triều Nguyễn (1802–1945). Nó được dùng trong các buổi lễ hoàng gia, yến tiệc và biểu diễn nghệ thuật cung đình. UNESCO đã công nhận nhã nhạc cung đình Huế là Di sản Văn hóa Phi vật thể của Nhân loại năm 2003.",
      },
      {
        title: "Lan rộng ra dân gian",
        content: "Ngoài cung đình, Đàn Tranh còn phổ biến trong dân gian, đặc biệt là trong Đờn ca tài tử ở Nam Bộ và nhạc thính phòng Huế. Loại đàn có 16 dây và được lên dây theo ngũ cung, tạo ra âm thanh trong trẻo, du dương đặc trưng của âm nhạc Việt Nam.",
      },
      {
        title: "Vị trí trong âm nhạc hiện đại",
        content: "Ngày nay, Đàn Tranh được giảng dạy rộng rãi tại các nhạc viện và trường âm nhạc trên toàn quốc. Nhiều nghệ sĩ đương đại đã kết hợp Đàn Tranh với nhạc jazz, pop và các thể loại quốc tế, mở ra chân trời mới cho nhạc cụ truyền thống này.",
      },
    ],
    facts: [
      "Có 16 dây kim loại, mỗi dây có một con nhạn (bridge) có thể điều chỉnh",
      "Được chơi bằng móng đeo ở ngón tay phải",
      "Âm vực rộng khoảng 3–4 quãng tám",
      "Xuất hiện trong hầu hết các thể loại nhạc cổ truyền Việt Nam",
    ],
    color: "#52b788",
  },
  "dan-bau": {
    name: "Đàn Bầu",
    type: "Dây",
    difficulty: 4,
    origin: "Việt Nam — thuần Việt",
    era: "Khoảng thế kỷ 10–11",
    shortDesc: "Nhạc cụ một dây độc đáo với âm thanh réo rắt, huyền diệu.",
    image: "/instrument-dan-bau.jpg",
    imagePos: "center 70%",
    history: [
      {
        title: "Nhạc cụ thuần Việt",
        content: "Đàn Bầu là nhạc cụ độc đáo nhất của Việt Nam — không có nhạc cụ nào tương đương trên thế giới. Được cho là ra đời khoảng thế kỷ 10–11, đàn Bầu phản ánh tư duy âm nhạc sáng tạo của người Việt với chỉ một sợi dây duy nhất nhưng có thể tạo ra vô số âm thanh.",
      },
      {
        title: "Truyền thuyết và huyền thoại",
        content: "Có nhiều truyền thuyết xung quanh sự ra đời của đàn Bầu. Một trong số đó kể về người phụ nữ mù nghèo tên Thị Bầu đã sáng chế ra nhạc cụ này từ một quả bầu khô và một sợi dây tre. Tên gọi 'đàn Bầu' cũng xuất phát từ đây — 'bầu' có nghĩa là quả bầu.",
      },
      {
        title: "Vai trò trong đời sống văn hóa",
        content: "Trong lịch sử, đàn Bầu thường gắn liền với những người hát xẩm — nghệ nhân hát rong ở miền Bắc Việt Nam. Âm thanh của đàn Bầu được ví như tiếng khóc, tiếng than, phản ánh nỗi lòng của người dân trong thời kỳ khó khăn. Đây cũng là nhạc cụ xuất hiện nhiều trong văn học và thơ ca Việt Nam.",
      },
      {
        title: "Kỹ thuật biểu diễn đặc biệt",
        content: "Điểm đặc biệt của đàn Bầu là kỹ thuật dùng cần đàn (gắn với quả bầu) để thay đổi độ căng của dây, tạo ra các âm bội (harmonics). Người chơi cần kiểm soát cực kỳ tinh tế để tạo ra những âm thanh réo rắt, luyến láy đặc trưng không thể nhầm lẫn.",
      },
    ],
    facts: [
      "Là nhạc cụ một dây duy nhất sử dụng hệ thống âm bội như vậy trên thế giới",
      "Âm thanh được khuếch đại bởi quả bầu hoặc hộp cộng hưởng",
      "Kỹ thuật chơi mất nhiều năm để thành thạo",
      "Được UNESCO ghi nhận trong di sản nhã nhạc cung đình Huế",
    ],
    color: "#74c69d",
  },
  "dan-nguyet": {
    name: "Đàn Nguyệt",
    type: "Dây gảy",
    difficulty: 3,
    origin: "Trung Á — qua Trung Quốc vào Việt Nam",
    era: "Khoảng thế kỷ 11–13",
    shortDesc: "Đàn hình mặt trăng, thường dùng trong hát chèo và cải lương.",
    image: "/instrument-dan-nguyet.jpg",
    imagePos: "center",
    history: [
      {
        title: "Hành trình từ Trung Á",
        content: "Đàn Nguyệt có tổ tiên là các nhạc cụ dây từ Trung Á, du nhập vào Trung Quốc dưới dạng đàn Ruan rồi tiếp tục vào Việt Nam. Tên gọi 'Nguyệt' (月 — mặt trăng) xuất phát từ hình dáng tròn của hộp đàn, gợi lên hình ảnh vầng trăng rằm.",
      },
      {
        title: "Vai trò trong sân khấu truyền thống",
        content: "Đàn Nguyệt là linh hồn của nhiều thể loại sân khấu truyền thống Việt Nam. Trong hát Chèo (miền Bắc), đàn Nguyệt dẫn dắt giai điệu và đệm cho diễn viên. Trong Cải lương (miền Nam), nó là nhạc cụ không thể thiếu trong ban nhạc đệm. Trong hát Văn — nghi lễ tâm linh thờ Mẫu — đàn Nguyệt tạo ra không khí linh thiêng, huyền bí.",
      },
      {
        title: "Đặc điểm âm thanh và cấu tạo",
        content: "Đàn Nguyệt có 2 dây tơ hoặc nylon, cần đàn dài với các phím gỗ. Âm thanh vang, sáng và có độ ngân dài đặc trưng. Người chơi thường dùng miếng gảy (pick) bằng sừng hoặc nhựa để tạo ra âm thanh giòn, rõ ràng.",
      },
      {
        title: "Sức sống đương đại",
        content: "Trong thế kỷ 21, đàn Nguyệt được các nghệ sĩ trẻ tái khám phá và đưa vào các dự án âm nhạc đương đại. Nhiều album fusion kết hợp đàn Nguyệt với guitar điện, synthesizer đã thu hút sự chú ý của giới âm nhạc quốc tế.",
      },
    ],
    facts: [
      "Hộp đàn hình tròn như mặt trăng, đường kính khoảng 30–35 cm",
      "Có 2 dây, thường lên dây theo quãng bốn hoặc quãng năm",
      "Cần đàn dài với 8–11 phím",
      "Là nhạc cụ chủ đạo trong hát Văn, Chèo và Cải lương",
    ],
    color: "#95d5b2",
  },
  "sao-truc": {
    name: "Sáo Trúc",
    type: "Hơi",
    difficulty: 2,
    origin: "Việt Nam — bản địa",
    era: "Hàng nghìn năm trước Công nguyên",
    shortDesc: "Nhạc cụ hơi từ cây tre, thanh âm trong trẻo bay bổng.",
    image: "/instrument-sao-truc.jpg",
    imagePos: "center",
    history: [
      {
        title: "Nhạc cụ lâu đời nhất",
        content: "Sáo Trúc là một trong những nhạc cụ lâu đời nhất của người Việt, gắn liền với nền văn minh lúa nước và cuộc sống làng quê. Bằng chứng khảo cổ cho thấy sáo trúc đã xuất hiện tại vùng Đông Nam Á từ hàng nghìn năm trước Công nguyên.",
      },
      {
        title: "Gắn liền với thiên nhiên và đời sống",
        content: "Sáo Trúc được làm từ ống tre — loại cây gần gũi với đời sống người Việt. Tiếng sáo gắn với hình ảnh cánh đồng lúa, chăn trâu, làng quê yên bình. Trong văn học dân gian, tiếng sáo thường xuất hiện như biểu tượng của tình yêu đôi lứa và cuộc sống thanh bình.",
      },
      {
        title: "Các loại sáo trúc",
        content: "Sáo trúc Việt Nam có nhiều loại: Sáo ngang (thổi ngang, phổ biến nhất), Tiêu (thổi dọc, âm trầm hơn), Sáo Mèo (của người Hmông, có âm sắc đặc biệt). Mỗi vùng miền lại có cách chế tác và kỹ thuật thổi riêng, tạo nên sự phong phú đa dạng.",
      },
      {
        title: "Từ dân gian đến nghệ thuật bác học",
        content: "Từ nhạc cụ của người chăn trâu và nông dân, Sáo Trúc dần được đưa vào cung đình và trở thành phần quan trọng trong nhã nhạc. Ngày nay, sáo trúc được giảng dạy tại các nhạc viện và là nhạc cụ được giới thiệu nhiều nhất với người mới bắt đầu học nhạc cổ truyền.",
      },
    ],
    facts: [
      "Làm từ ống tre già có thành dày, thường dài 40–55 cm",
      "Có 6 lỗ bấm chính tạo ra âm giai ngũ cung",
      "Âm vực khoảng 2–3 quãng tám tùy loại sáo",
      "Dễ học nhất trong các nhạc cụ truyền thống Việt Nam",
    ],
    color: "#40916c",
  },
  "dan-ty-ba": {
    name: "Đàn Tỳ Bà",
    type: "Dây gảy",
    difficulty: 4,
    origin: "Ba Tư — qua Trung Quốc vào Việt Nam",
    era: "Khoảng thế kỷ 7–9",
    shortDesc: "Đàn lê hình quả tỳ bà, phổ biến trong cung đình Huế.",
    image: "/instrument-dan-ty-ba.webp",
    imagePos: "center",
    history: [
      {
        title: "Con đường tơ lụa đến Việt Nam",
        content: "Đàn Tỳ Bà (琵琶) có nguồn gốc từ vùng Trung Á và Ba Tư, du nhập vào Trung Quốc qua con đường tơ lụa và tiếp tục vào Việt Nam. Tên 'Tỳ Bà' là phiên âm của chữ Hán 琵琶 (pipa). Tại Việt Nam, đàn được cải biến để phù hợp với âm nhạc ngũ cung của người Việt.",
      },
      {
        title: "Cung đình và quý tộc",
        content: "Trong lịch sử, Đàn Tỳ Bà thường được gắn với tầng lớp quý tộc và cung đình. Tại Huế, đàn Tỳ Bà là một trong những nhạc cụ chính của ban nhạc cung đình, thường được biểu diễn trong các buổi yến tiệc hoàng gia và nghi lễ quan trọng.",
      },
      {
        title: "Kỹ thuật điêu luyện",
        content: "Đàn Tỳ Bà nổi tiếng là khó học nhất trong các nhạc cụ truyền thống. Người chơi cần thành thạo nhiều kỹ thuật phức tạp: gảy nhanh (轮指 — lun zhi), gảy lăn ngón, nhấn rung dây, và các kỹ thuật tay trái tinh tế. Tốc độ gảy cực nhanh của Tỳ Bà tạo ra hiệu ứng âm thanh đặc sắc không nhạc cụ nào bắt chước được.",
      },
      {
        title: "Biểu tượng văn chương",
        content: "Đàn Tỳ Bà xuất hiện nhiều trong thơ ca và văn học cổ điển. Nổi tiếng nhất là bài thơ 'Tỳ Bà Hành' của Bạch Cư Dị (Trung Quốc) được truyền bá rộng rãi tại Việt Nam. Hình ảnh đàn Tỳ Bà gắn với người kỹ nữ tài hoa và nỗi bi thương của kiếp người.",
      },
    ],
    facts: [
      "Hộp đàn hình quả lê, 4 dây tơ hoặc nylon",
      "Cần đàn ngắn với 6 phím lớn và nhiều phím nhỏ hơn",
      "Âm vực rộng hơn 3 quãng tám",
      "Được biểu diễn độc tấu hoặc trong ban nhạc thính phòng",
    ],
    color: "#1b4332",
  },
  "dan-nhi": {
    name: "Đàn Nhị",
    type: "Dây kéo",
    difficulty: 4,
    origin: "Trung Quốc — du nhập vào Việt Nam",
    era: "Khoảng thế kỷ 10–12",
    shortDesc: "Đàn 2 dây kéo vĩ, âm thanh tha thiết như tiếng người than.",
    image: "/instrument-dan-nhi.jpg",
    imagePos: "center",
    history: [
      {
        title: "Từ Erhu đến Đàn Nhị",
        content: "Đàn Nhị có nguồn gốc từ đàn Erhu (二胡) của Trung Quốc, được du nhập vào Việt Nam khoảng thế kỷ 10–12 trong giai đoạn giao lưu văn hóa mạnh mẽ giữa hai nước. Tại Việt Nam, đàn được Việt hóa về kỹ thuật, âm điệu và phong cách biểu diễn, tạo ra cá tính riêng.",
      },
      {
        title: "Giọng nói của tâm hồn",
        content: "Âm thanh của Đàn Nhị được người Việt ví như tiếng khóc, tiếng than, tiếng nói của tâm hồn. Khả năng diễn đạt cảm xúc của đàn Nhị gần giống giọng người hơn bất kỳ nhạc cụ nào khác. Chính vì vậy, nó trở thành nhạc cụ không thể thiếu trong các thể loại âm nhạc kể chuyện và sân khấu.",
      },
      {
        title: "Linh hồn của sân khấu truyền thống",
        content: "Đàn Nhị đóng vai trò trung tâm trong ban nhạc của Chèo, Tuồng, Cải lương và Hát Văn. Tiếng đàn Nhị dẫn dắt cảm xúc khán giả qua từng cung bậc của vở diễn. Người nghệ nhân đàn Nhị giỏi có thể 'nói chuyện' với diễn viên trên sân khấu qua tiếng đàn.",
      },
      {
        title: "Kỹ thuật đặc thù",
        content: "Khác với violin phương Tây, cây vĩ của đàn Nhị nằm giữa hai dây, không thể tháo ra. Người chơi phải học cách kiểm soát áp lực và góc độ của vĩ để tạo ra âm thanh trong, không tạp. Kỹ thuật rung tay trái và nhấn nhá tạo nên những âm 'luyến' đặc trưng của âm nhạc Việt.",
      },
    ],
    facts: [
      "Chỉ có 2 dây, vĩ kẹp cố định giữa hai dây",
      "Hộp cộng hưởng hình lục giác hoặc bát giác, bọc da rắn hoặc da trăn",
      "Được đặt trên đùi khi biểu diễn, không kẹp dưới cằm như violin",
      "Âm thanh có thể bắt chước giọng người ở độ chính xác cao",
    ],
    color: "#2d6a4f",
  },
};

export function generateStaticParams() {
  return Object.keys(instruments).map((slug) => ({ slug }));
}

export default async function InstrumentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const inst = instruments[slug];
  if (!inst) notFound();

  return (
    <div className="min-h-screen bg-zinc-50">
      <Navbar />

      {/* Hero */}
      <div className="relative overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={inst.image}
          alt={inst.name}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: inst.imagePos ?? "center" }}
        />
        <div className="absolute inset-0 bg-[#0a1f14]/75" />
        <div className="relative max-w-5xl mx-auto px-6 pt-28 pb-20">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs font-medium text-[#95d5b2]/70 uppercase tracking-widest">Nhạc cụ truyền thống</span>
            <span className="text-[#95d5b2]/30">·</span>
            <span className="text-xs font-medium px-2.5 py-0.5 rounded-full border border-[#52b788]/30 text-[#95d5b2]">{inst.type}</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight">{inst.name}</h1>
          <p className="text-[#95d5b2] text-xl max-w-xl leading-relaxed mb-10">{inst.shortDesc}</p>

          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2 text-[#95d5b2]/70">
              <MapPin className="w-4 h-4 text-[#52b788]" strokeWidth={1.5} />
              <span className="text-sm">{inst.origin}</span>
            </div>
            <div className="flex items-center gap-2 text-[#95d5b2]/70">
              <Clock className="w-4 h-4 text-[#52b788]" strokeWidth={1.5} />
              <span className="text-sm">{inst.era}</span>
            </div>
            <div className="flex items-center gap-2 text-[#95d5b2]/70">
              <Music className="w-4 h-4 text-[#52b788]" strokeWidth={1.5} />
              <span className="text-sm">Độ khó:</span>
              <div className="flex gap-1">
                {[1,2,3,4,5].map((i) => (
                  <div key={i} className={`w-2 h-2 rounded-full ${i <= inst.difficulty ? "bg-[#52b788]" : "bg-[#52b788]/20"}`} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* History */}
          <div className="lg:col-span-2 space-y-10">
            <div>
              <h2 className="text-2xl font-bold text-[#0a1f14] mb-8 flex items-center gap-2">
                <span className="w-1 h-7 rounded-full bg-[#52b788] inline-block" />
                Lịch sử hình thành
              </h2>
              <div className="space-y-8">
                {inst.history.map((section, i) => (
                  <div key={i} className="flex gap-5">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-[#52b788]/10 flex items-center justify-center flex-shrink-0 text-[#52b788] font-bold text-sm">
                        {i + 1}
                      </div>
                      {i < inst.history.length - 1 && (
                        <div className="w-px flex-1 bg-[#52b788]/15 mt-3" />
                      )}
                    </div>
                    <div className="pb-8">
                      <h3 className="text-[#0a1f14] font-semibold text-lg mb-2">{section.title}</h3>
                      <p className="text-zinc-600 leading-relaxed">{section.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Facts */}
            <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm p-6">
              <h3 className="font-bold text-[#0a1f14] mb-4 flex items-center gap-2">
                <Star className="w-4 h-4 text-[#52b788]" strokeWidth={1.5} />
                Đặc điểm nổi bật
              </h3>
              <ul className="space-y-3">
                {inst.facts.map((fact, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#52b788] mt-2 flex-shrink-0" />
                    <span className="text-sm text-zinc-600 leading-relaxed">{fact}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <div
              className="rounded-2xl p-6 text-white"
              style={{ background: `linear-gradient(135deg, #0a1f14, ${inst.color})` }}
            >
              <p className="font-bold text-lg mb-1">Bắt đầu học {inst.name}</p>
              <p className="text-white/60 text-sm mb-5 leading-relaxed">
                Khám phá {inst.name} qua các bài học được thiết kế từ cơ bản đến nâng cao.
              </p>
              <Link
                href="/signup"
                className="flex items-center justify-center w-full h-11 rounded-xl font-semibold text-[#0a1f14] text-sm transition-all hover:opacity-90"
                style={{ background: "linear-gradient(135deg, #52b788, #95d5b2)" }}
              >
                Học miễn phí ngay
              </Link>
            </div>

            {/* Other instruments */}
            <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm p-6">
              <h3 className="font-bold text-[#0a1f14] mb-4 text-sm">Nhạc cụ khác</h3>
              <div className="space-y-2">
                {Object.entries(instruments)
                  .filter(([s]) => s !== slug)
                  .map(([s, ins]) => (
                    <Link
                      key={s}
                      href={`/instruments/${s}`}
                      className="flex items-center justify-between py-2 px-3 rounded-xl hover:bg-zinc-50 transition-colors group"
                    >
                      <div>
                        <p className="text-sm font-medium text-[#0a1f14]">{ins.name}</p>
                        <p className="text-xs text-zinc-400">{ins.type}</p>
                      </div>
                      <ArrowLeft className="w-3.5 h-3.5 text-zinc-300 group-hover:text-[#52b788] rotate-180 transition-colors" />
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterColumn />
    </div>
  );
}
