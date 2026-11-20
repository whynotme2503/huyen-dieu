# Huyen Dieu · Hướng dẫn sử dụng

## 1. Cấu trúc thư mục
- `index.html`, `style.css`, `app.js`, `teacher.js`, `api.js`: giao diện và logic, thường không cần sửa.
- `data.js`: danh sách từ vựng từng bài (nơi bạn thêm bài mới).
- `config.js`: dán link Google Apps Script vào đây.
- `audio/`: file nghe (1.mp3 đến 30.mp3).
- `apps-script/Code.gs`: mã dán vào Google Sheet.

## 2. Kết nối Google Sheet (làm một lần)
1. Tạo Google Sheet mới, đặt tên "Huyen Dieu - Kết quả".
2. Vào **Tiện ích mở rộng → Apps Script**. Xóa code mẫu, dán toàn bộ `apps-script/Code.gs`, bấm Lưu.
3. Chọn hàm `setup`, bấm **Chạy**, cấp quyền khi Google hỏi. Các tab `HocSinh`, `KetQua`, `BaiTap`, `CaiDat`, `TongHop` tự được tạo. **Mã giáo viên** nằm ở tab `CaiDat`, ô B1 (đổi được, giữ bí mật).
4. **Triển khai → Tùy chọn triển khai mới → Ứng dụng web**: "Thực thi dưới tên: Tôi", "Ai có quyền truy cập: Bất kỳ ai". Bấm Triển khai, sao chép link kết thúc bằng `/exec`.
5. Mở `config.js`, dán link vào `url: ""`.
6. Đưa cả thư mục lên mạng (xem mục 3).

Khi sửa `Code.gs` về sau: **Triển khai → Quản lý bản triển khai → Sửa → Phiên bản mới → Triển khai** (link giữ nguyên).

## 3. Đưa web lên mạng để có link chia sẻ
Cách dễ nhất (miễn phí): vào https://app.netlify.com/drop, kéo cả thư mục này vào, nhận link dạng `ten-gi-do.netlify.app`. Cũng có thể dùng GitHub Pages hoặc Cloudflare Pages. Khi sửa `data.js` hoặc `config.js`, đưa thư mục lên lại.

## 4. Dùng hằng ngày
- **Cấp tài khoản:** đăng nhập bằng mã giáo viên → tab *Tài khoản* → nhập mỗi dòng "Họ tên, Lớp" → *Tạo mã đăng nhập* → gửi mã cho từng em. Có thể khóa/mở tài khoản.
- **Giao bài tập:** tab *Bài tập* → chọn bài, game, hạn nộp, lớp. Học sinh thấy ở trang chủ; tab này cho biết ai đã nộp, ai chưa.
- **Xem kết quả:**
  - *Tổng quan*: số liệu cả lớp, hoạt động 14 ngày, học sinh cần chú ý, từ sai nhiều.
  - *Theo bài*: chọn bài, xem từng game, bảng điểm cao nhất của từng em, từ khó.
  - *Theo học sinh*: nhận xét tự động, xu hướng điểm, kỹ năng Nghe / Mặt chữ / Pinyin, từ hay sai, lịch sử.
  - Lọc theo lớp và theo thời gian (7 ngày, 30 ngày, tất cả).
- **Google Sheet:** tab `KetQua` có từng lượt làm bài, tab `TongHop` tự tính điểm trung bình theo học sinh và bài. Bạn có thể lọc, tạo biểu đồ hoặc xuất Excel như Sheet bình thường.

## 4b. Lớp học và file quản lý riêng
- Tab **Lớp**: tạo lớp, xem nhanh từng lớp (số học sinh, điểm TB, bài tập đang mở), bấm **Tạo file quản lý riêng** để sinh một file Google Sheet riêng cho lớp (tab Tổng quan, Kết quả, Bài tập). Bấm **Cập nhật file** để làm mới.
- Google Sheet gốc cũng có sẵn tab `KQ - Tên lớp` cho từng lớp, tự cập nhật mỗi khi học sinh làm bài.
- Tab **Tài khoản**: chọn lớp khi thêm học sinh, đổi lớp bằng ô chọn ở từng dòng.
- Tab **Bài tập**: tick nhiều lớp, mỗi lớp một hạn nộp riêng, lọc theo lớp và theo trạng thái (đang mở, đã hết hạn).
- **Sau khi nâng cấp Code.gs**: dán lại Code.gs, chạy lại hàm `setup` (cấp thêm quyền tạo file), rồi Triển khai → Quản lý bản triển khai → Sửa → Phiên bản mới.

## 4c. Tập viết chữ Hán
Ở trang bài học, bấm biểu tượng bút cạnh từng từ để tập viết chữ của từ đó, hoặc bấm game **Tập viết chữ Hán** để tập tất cả chữ của bài. Có xem hoạt ảnh thứ tự nét, tập viết theo nét mờ và tự viết có chấm lỗi. Dữ liệu nét nằm trong `chars/` (thư viện Hanzi Writer, dữ liệu Make Me a Hanzi, giấy phép Arphic). Chữ mới chưa có trong `chars/` sẽ tự tải qua Internet.

## 5. Thêm bài mới
Mở `data.js`, tìm bài cần thêm (Bài 3 đến Bài 15 có sẵn khung), điền `topic` và thêm dòng:
`["chữ Hán", "pinyin có dấu", "nghĩa", "audio/31.mp3"],`
Bỏ phần file nghe thì web đọc bằng giọng tiếng Trung của thiết bị. Bài có từ sẽ tự mở khóa.

## 6. Bảo mật
Mã đăng nhập hoạt động như mật khẩu, mỗi em một mã. Giữ kín mã giáo viên và link Google Sheet. Mã bị lộ thì khóa và tạo mã mới.

## Cập nhật tối ưu (sao lưu, bảo mật, ôn từ hay sai, cài như app)

1. **Sao lưu tự động**: sau khi dán Code.gs mới, chạy hàm `setup` một lần (cấp thêm quyền Drive và trình kích hoạt). Mỗi Chủ nhật 2 giờ sáng hệ thống tự sao chép Sheet vào thư mục "Huyen Dieu - Sao lưu" trong Drive, giữ 8 bản gần nhất. Muốn sao lưu ngay: chạy hàm `backupNow`.
2. **Phát hành lại**: Triển khai > Quản lý các bản triển khai > Chỉnh sửa (biểu tượng bút) > Phiên bản: Phiên bản mới > Triển khai. Link /exec giữ nguyên.
3. **Chống dò mã**: nếu có quá 60 lần nhập sai trong 10 phút, mọi lượt đăng nhập tạm khóa 10 phút rồi tự mở lại.
4. **Dữ liệu lớn**: trang giáo viên mặc định tải 120 ngày gần nhất cho nhanh. Chọn khoảng "Tất cả" trong bộ lọc thì web tự tải toàn bộ.
5. **Ôn từ hay sai và chuỗi ngày**: trang chủ học sinh gợi ý các từ hay làm sai, có nút ôn nhanh; hiển thị số ngày luyện liên tiếp.
6. **Nhắc nộp bài**: trong mục Bài tập, mở bài giao rồi bấm "Sao chép lời nhắc" để dán vào Zalo hoặc nhóm lớp.
7. **Cài như app**: trên điện thoại mở link web, chọn "Thêm vào màn hình chính".
8. **Âm thanh**: từ vựng bài mới cần có file mp3 riêng từng từ (audio/31.mp3, ...). Chưa có file thì web dùng giọng đọc của máy, chất lượng tùy máy.

## Bài tập soạn sẵn (phiếu nhiều phần)

Bài tập như "Bài tập HSK1 – Bài 2" nằm trong `data.js` (mục `HD_SHEETS`). Để giao: Bảng giáo viên > Bài tập > ô "Game" > nhóm "Bài tập soạn sẵn" > chọn lớp và hạn nộp > Giao bài tập. Học sinh nộp xong thấy ngay số câu đúng/tổng, câu đúng sai và đáp án. Muốn thêm phiếu mới, gửi nội dung và đáp án cho người hỗ trợ để thêm vào `HD_SHEETS`.

## Tra từ và lời chúc hằng ngày

- **Tra từ** (thanh điều hướng): học sinh gõ chữ Hán, pinyin (có hoặc không dấu) hoặc nghĩa tiếng Việt. Kết quả có nghĩa, ví dụ, ghi chú ngữ pháp, nghe đọc, xem thứ tự nét và luyện viết. Ví dụ và ngữ pháp nằm ở `HD_EXTRA` trong `data.js`, khóa là chữ Hán của từ. Khi thêm từ mới ở bài sau, thêm cả mục tương ứng vào `HD_EXTRA` để từ đó có ví dụ.
- **Lời chúc trang chủ**: 50 câu về học tập trong `HD_QUOTES`, mỗi ngày đổi một câu theo thứ tự, không có âm thanh. Muốn thêm câu mới, thêm dòng `["chữ Hán", "pinyin", "nghĩa"]`.

## Xem chi tiết bài làm của học sinh

Bảng giáo viên > Bài tập > mở một bài đã giao (bài tập soạn sẵn). Bấm vào tên học sinh trong mục "Đã làm" để xem các câu sai: học sinh trả lời gì và đáp án đúng là gì (lượt làm gần nhất). Bên dưới có mục "Câu nhiều bạn sai nhất". Trong Google Sheet, cột "Từ sai" của sheet KetQua cũng ghi các câu sai dạng "Câu 2: A. gāoxīng".

## Quản lý theo lớp trong Google Sheet (bản mới)

- Google Sheet gốc: mở tab **Các lớp** (luôn nằm đầu tiên). Mỗi lớp một dòng với số học sinh, số lượt làm, điểm trung bình, bài tập đang mở, hoạt động gần nhất và link **Mở file lớp**.
- File riêng của từng lớp (nằm trong thư mục Drive "Huyen Dieu - Các lớp") gồm các tab: **Tổng quan**, **Bài tập** (ai nộp, ai chưa), **Bài 1, Bài 2…** (điểm cao nhất của từng bạn ở từng game), **CT …** (từng câu đúng/sai của bài tập soạn sẵn, dòng cuối đếm số bạn sai mỗi câu), **Xem từng bạn** (chọn tên ở ô B1) và **Kết quả** (nhật ký đầy đủ).
- Các tab hệ thống HocSinh, KetQua, BaiTap, Lop, CaiDat vẫn cần giữ, đừng xóa hay đổi tên. Các tab cũ dạng "KQ - Tên lớp" không còn tự cập nhật nữa, có thể xóa.
- Cập nhật: tự động mỗi ngày 23 giờ. Muốn xem ngay: Bảng giáo viên > Lớp > "Cập nhật file của tất cả các lớp ngay".
- Sau khi dán Code.gs mới: chạy hàm `setup` (cấp thêm quyền Drive), rồi Triển khai > Quản lý bản triển khai > Chỉnh sửa > Phiên bản mới.

## Bảng xếp hạng thi đua (trang chủ)

- Hiện ngay trang chủ: **Xếp hạng lớp** và **Bảng chung · top 10** nằm cạnh nhau (điện thoại thì xếp dọc), chuyển **Tuần này / Tháng này**.
- Điểm mỗi lượt làm: tối đa 10 điểm theo % đúng (lượt cần ≥ 5 câu), tối đa 12 lượt/ngày; nộp bài tập đúng hạn +20 điểm (lần nộp đầu).
- Xếp hạng lớp theo **điểm trung bình mỗi bạn** (công bằng giữa lớp đông và lớp ít người).
- Tên hiển thị rút gọn (vd "An N."), không lộ mã học sinh. Bảng cập nhật mỗi ~5 phút.
- Cần dán Code.gs mới và Deploy → Phiên bản mới.

## Ôn lại theo lịch

- Từ học sinh làm sai sẽ được nhắc lại ở thẻ "Đến hạn ôn lại hôm nay" trên trang chủ: sau **1 ngày**, rồi **3 ngày**, rồi **7 ngày**.
- Làm đúng khi đã đến hạn thì từ lên mức tiếp theo; làm sai thì quay về đầu (1 ngày). Đúng đủ 3 lần thì xong, không nhắc nữa.
- Tính từ lịch sử kết quả sẵn có, không cần sửa Code.gs hay deploy lại.

## Mục tiêu tuần và huy hiệu

- Trang chủ học sinh có thẻ **Mục tiêu tuần này**: học đủ **5 ngày** trong tuần (tuần tính từ Thứ Hai), hiện 7 chấm T2–CN.
- **9 huy hiệu:** 3/7/14 ngày liền, 100/500 câu đúng, điểm tuyệt đối, bài tập đầu tiên, nộp 5 bài tập, ôn thuộc 10 từ. Đạt huy hiệu mới thì hiện thông báo ngay.
- Tính từ lịch sử kết quả sẵn có, không cần sửa Code.gs hay deploy lại. Giáo viên xem thử không thấy thẻ này.

## Luyện nghe câu

- Mục **Luyện nghe** (thanh menu và ô trên trang chủ): học sinh **chọn bài trước** (Bài 1, 2, 3, 4… hoặc Tổng hợp), rồi nghe 1 câu tiếng Trung, chọn nghĩa tiếng Việt đúng trong 4 đáp án. Mỗi lượt 8 câu, có nút "Nghe chậm"; sau mỗi câu hiện chữ Hán và pinyin.
- Câu lấy từ phần ví dụ của các từ đã học, nên bài mới thêm ví dụ vào `HD_EXTRA` là có thêm câu luyện nghe.
- Âm thanh là giọng đọc tiếng Trung có sẵn trên thiết bị (chưa phải giọng người thật). Nếu máy chưa có giọng tiếng Trung, web sẽ nhắc học sinh cài thêm.
- Kết quả được ghi theo đúng bài đã chọn, như các game khác (tên "Nghe câu → chọn nghĩa"), tính vào bảng xếp hạng và huy hiệu. Không cần sửa Code.gs.
