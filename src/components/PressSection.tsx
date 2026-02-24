import { MdOutlineKeyboardArrowRight } from "react-icons/md";

const YOUTUBE_EMBED_URL = "https://www.youtube.com/embed/7HL5q7OzdAc?start=1";

const PressSection = () => {
  return (
    <section className="my-10 max-w-7xl mx-auto">
      <div className="rounded-2xl bg-white py-6 md:py-8">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold">Báo Chí Nói Gì Về Nệm Rạng Đông</h2>
          <a
            href="https://www.youtube.com/watch?v=7HL5q7OzdAc&t=1s"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-primary hover:opacity-80"
          >
            Xem trên YouTube
            <MdOutlineKeyboardArrowRight size={18} />
          </a>
        </div>

        <div className="grid gap-6 md:grid-cols-[1.2fr_minmax(0,1fr)] items-start">
          <div className="w-full aspect-[16/9] rounded-xl overflow-hidden bg-black shadow-md border border-gray-200">
            <iframe
              src={YOUTUBE_EMBED_URL}
              title="Báo chí nói gì về Nệm Rạng Đông"
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>

          <div className="flex flex-col gap-3 text-sm text-gray-700">
            <p className="font-semibold text-base text-gray-900">
              Được truyền thông tin tưởng, khách hàng lựa chọn
            </p>
            <p>
              Nệm Rạng Đông xuất hiện thường xuyên trên các kênh truyền hình và
              báo chí với những câu chuyện về chất lượng nệm, quy trình sản xuất
              chuẩn hóa và cam kết bảo vệ sức khỏe giấc ngủ cho người Việt.
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                Chia sẻ trải nghiệm thực tế từ khách hàng sau thời gian dài sử
                dụng nệm.
              </li>
              <li>
                Góc nhìn chuyên gia về độ đàn hồi, khả năng nâng đỡ cột sống và
                độ bền của nệm.
              </li>
              <li>
                Hình ảnh nhà máy, quy trình kiểm định chất lượng và dịch vụ hậu
                mãi tận tâm.
              </li>
            </ul>
            <p className="text-xs text-gray-500">
              Nội dung video được trích từ kênh YouTube chính thức và các đơn vị
              truyền thông hợp tác với Nệm Rạng Đông.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PressSection;
