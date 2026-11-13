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

## 5. Thêm bài mới
Mở `data.js`, tìm bài cần thêm (Bài 3 đến Bài 15 có sẵn khung), điền `topic` và thêm dòng:
`["chữ Hán", "pinyin có dấu", "nghĩa", "audio/31.mp3"],`
Bỏ phần file nghe thì web đọc bằng giọng tiếng Trung của thiết bị. Bài có từ sẽ tự mở khóa.

## 6. Bảo mật
Mã đăng nhập hoạt động như mật khẩu, mỗi em một mã. Giữ kín mã giáo viên và link Google Sheet. Mã bị lộ thì khóa và tạo mã mới.
