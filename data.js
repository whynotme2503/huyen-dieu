/* ===========================================================
   HUYEN DIEU · DỮ LIỆU BÀI HỌC
   -----------------------------------------------------------
   CÁCH THÊM TỪ MỚI VÀO MỘT BÀI:
   Tìm bài tương ứng (ví dụ id: 3), điền "topic" (chủ đề) rồi thêm từng dòng vào "words":
       ["chữ Hán", "pinyin có dấu", "nghĩa tiếng Việt", "audio/31.mp3"],

   Phần tử thứ 4 là file nghe, đặt trong thư mục audio/ (có thể bỏ trống, khi đó
   web tự đọc bằng giọng tiếng Trung của thiết bị).
   Hiện tại audio/1.mp3 → 30.mp3 là 30 từ của bài 1 (13 từ) và bài 2 (17 từ), đúng thứ tự.

   Bài nào có ít nhất 1 từ sẽ tự mở khóa, không cần sửa code khác.
   =========================================================== */

window.HD_CONFIG = {
  siteName: "Huyen Dieu",
  tagline: "Ôn HSK 1 · nghe, mặt chữ, pinyin",
  phone: "0799 052 526",
  questionsPerRound: 10,   // số câu mỗi lượt chơi
  matchPairs: 6,           // số cặp mỗi lượt game ghép cặp
  audioBase: ""            // tiền tố đường dẫn file âm thanh (thường để trống)
};

window.HD_LESSONS = [
  {
    id: 1, topic: "Chào hỏi", words: [
      ["你好", "nǐ hǎo", "xin chào", "audio/1.mp3"],
      ["大家", "dàjiā", "mọi người", "audio/2.mp3"],
      ["好", "hǎo", "tốt, khỏe", "audio/3.mp3"],
      ["学生", "xuésheng", "học sinh", "audio/4.mp3"],
      ["们", "men", "(hậu tố chỉ số nhiều)", "audio/5.mp3"],
      ["老师", "lǎoshī", "thầy giáo, cô giáo", "audio/6.mp3"],
      ["您", "nín", "ngài, ông, bà (kính trọng)", "audio/7.mp3"],
      ["你们", "nǐmen", "các bạn", "audio/8.mp3"],
      ["谢谢", "xièxie", "cảm ơn", "audio/9.mp3"],
      ["不客气", "bú kèqi", "đừng khách sáo", "audio/10.mp3"],
      ["同学", "tóngxué", "bạn học", "audio/11.mp3"],
      ["再见", "zàijiàn", "tạm biệt", "audio/12.mp3"],
      ["王老师", "wáng lǎoshī", "thầy/cô Vương", "audio/13.mp3"]
    ]
  },
  {
    id: 2, topic: "Hỏi tên", words: [
      ["请问", "qǐngwèn", "xin hỏi", "audio/14.mp3"],
      ["请", "qǐng", "xin mời, làm ơn", "audio/15.mp3"],
      ["问", "wèn", "hỏi", "audio/16.mp3"],
      ["你", "nǐ", "bạn", "audio/17.mp3"],
      ["叫", "jiào", "tên là, gọi", "audio/18.mp3"],
      ["什么", "shénme", "cái gì", "audio/19.mp3"],
      ["名字", "míngzi", "tên", "audio/20.mp3"],
      ["我", "wǒ", "tôi", "audio/21.mp3"],
      ["不", "bù", "không", "audio/22.mp3"],
      ["是", "shì", "là", "audio/23.mp3"],
      ["对不起", "duìbuqǐ", "xin lỗi", "audio/24.mp3"],
      ["没关系", "méi guānxi", "không sao", "audio/25.mp3"],
      ["没事", "méishì", "không có gì", "audio/26.mp3"],
      ["很", "hěn", "rất", "audio/27.mp3"],
      ["高兴", "gāoxìng", "vui mừng", "audio/28.mp3"],
      ["认识", "rènshi", "quen biết", "audio/29.mp3"],
      ["也", "yě", "cũng", "audio/30.mp3"]
    ]
  },
  {
    id: 3, topic: "Quốc gia, gia đình", words: [
      ["人", "rén", "người", "audio/31.mp3"],
      ["的", "de", "của", "audio/32.mp3"],
      ["中国", "Zhōngguó", "Trung Quốc", "audio/33.mp3"],
      ["法国", "Fǎguó", "Pháp", "audio/34.mp3"],
      ["越南", "Yuènán", "Việt Nam", "audio/35.mp3"],
      ["英国", "Yīngguó", "Anh", "audio/36.mp3"],
      ["中文", "Zhōngwén", "tiếng Trung", "audio/37.mp3"],
      ["越南语", "Yuènányǔ", "tiếng Việt", "audio/38.mp3"],
      ["这", "zhè", "đây, này", "audio/39.mp3"],
      ["谁", "shéi", "ai", "audio/40.mp3"],
      ["女朋友", "nǚpéngyou", "bạn gái", "audio/41.mp3"],
      ["哪", "nǎ", "nào", "audio/42.mp3"],
      ["国", "guó", "nước, quốc gia", "audio/43.mp3"],
      ["她", "tā", "cô ấy, bà ấy", "audio/44.mp3"],
      ["泰国", "Tàiguó", "Thái Lan", "audio/45.mp3"],
      ["他", "tā", "anh ấy, ông ấy", "audio/46.mp3"],
      ["喂", "wèi", "alô", "audio/47.mp3"],
      ["姐姐", "jiějie", "chị gái", "audio/48.mp3"],
      ["妹妹", "mèimei", "em gái", "audio/49.mp3"],
      ["哥哥", "gēge", "anh trai", "audio/50.mp3"],
      ["弟弟", "dìdi", "em trai", "audio/51.mp3"],
      ["兄弟姐妹", "xiōngdì jiěmèi", "anh chị em", "audio/52.mp3"],
      ["工作", "gōngzuò", "công việc, làm việc", "audio/53.mp3"],
      ["还", "hái", "còn, vẫn", "audio/54.mp3"],
      ["忙", "máng", "bận", "audio/55.mp3"],
      ["吗", "ma", "không (trợ từ nghi vấn)", "audio/56.mp3"],
      ["对", "duì", "đúng", "audio/57.mp3"],
      ["太", "tài", "quá", "audio/58.mp3"],
      ["不太", "bú tài", "không … lắm", "audio/59.mp3"],
      ["我们", "wǒmen", "chúng tôi, chúng ta", "audio/60.mp3"],
      ["他们", "tāmen", "họ", "audio/61.mp3"],
      ["想", "xiǎng", "muốn, nhớ", "audio/62.mp3"]
    ]
  },
  {
    id: 4, topic: "Gia đình, tuổi tác", words: [
      ["有", "yǒu", "có", "audio/63.mp3"],
      ["没有", "méiyǒu", "không có", "audio/64.mp3"],
      ["多少", "duōshao", "bao nhiêu", "audio/65.mp3"],
      ["个", "gè", "cái, người (lượng từ)", "audio/66.mp3"],
      ["呢", "ne", "còn … thì sao? (trợ từ)", "audio/67.mp3"],
      ["家", "jiā", "nhà, gia đình", "audio/68.mp3"],
      ["房子", "fángzi", "căn nhà", "audio/69.mp3"],
      ["几", "jǐ", "mấy", "audio/70.mp3"],
      ["口", "kǒu", "khẩu (lượng từ chỉ số người trong gia đình)", "audio/71.mp3"],
      ["爸爸", "bàba", "bố", "audio/72.mp3"],
      ["妈妈", "māma", "mẹ", "audio/73.mp3"],
      ["和", "hé", "và", "audio/74.mp3"],
      ["儿子", "érzi", "con trai", "audio/75.mp3"],
      ["孩子", "háizi", "con, trẻ em", "audio/76.mp3"],
      ["女儿", "nǚ'ér", "con gái", "audio/77.mp3"],
      ["岁", "suì", "tuổi", "audio/78.mp3"],
      ["今年", "jīnnián", "năm nay", "audio/79.mp3"],
      ["去年", "qùnián", "năm ngoái", "audio/80.mp3"],
      ["明年", "míngnián", "năm sau", "audio/81.mp3"],
      ["多大", "duō dà", "bao nhiêu tuổi", "audio/82.mp3"],
      ["多", "duō", "nhiều, bao nhiêu", "audio/83.mp3"],
      ["大", "dà", "lớn", "audio/84.mp3"]
    ]
  },
  { id: 5, topic: "", words: [] },
  { id: 6, topic: "", words: [] },
  { id: 7, topic: "", words: [] },
  { id: 8, topic: "", words: [] },
  { id: 9, topic: "", words: [] },
  { id: 10, topic: "", words: [] },
  { id: 11, topic: "", words: [] },
  { id: 12, topic: "", words: [] },
  { id: 13, topic: "", words: [] },
  { id: 14, topic: "", words: [] },
  { id: 15, topic: "", words: [] }
];

/* ===========================================================
   CÂU NÓI Ở TRANG CHỦ (mỗi ngày hiện một câu, học sinh bấm "Câu khác" để đổi)
   Thêm câu mới: ["chữ Hán", "pinyin", "nghĩa tiếng Việt"],
   =========================================================== */

/* ============================================================
   BÀI TẬP TỰ SOẠN (phiếu nhiều phần). Giáo viên giao ở Bảng giáo viên > Bài tập > ô "Game".
   Loại phần: "choice" (chọn đáp án, a = vị trí đáp án đúng bắt đầu từ 0),
              "order" (sắp xếp từ thành câu, w = các từ, a = câu đúng),
              "type" (gõ chữ Hán, a = danh sách đáp án chấp nhận, không chấm gắt dấu câu).
   ============================================================ */
window.HD_SHEETS = [
  {
    id: "sheet-b2", lesson: 2, title: "Bài tập HSK1 – Bài 2",
    parts: [
      { title: "Phần 1. Chọn pinyin đúng", type: "choice", items: [
        { q: "老师", opts: ["lǎoshī", "láoshì", "lǎoshí"], a: 0 },
        { q: "高兴", opts: ["gāoxīng", "gāoxìng", "gǎoxìng"], a: 1 },
        { q: "不客气", opts: ["bù kěqi", "bú kèqi", "bū kèqì"], a: 1 },
        { q: "认识", opts: ["rènshi", "rénshì", "rěnshi"], a: 0 }
      ] },
      { title: "Phần 2. Chọn đáp án đúng", type: "choice", items: [
        { q: "“Xin lỗi” tiếng Trung là:", opts: ["没关系", "对不起", "不客气"], a: 1 },
        { q: "同学 nghĩa là:", opts: ["thầy giáo", "mọi người", "bạn học"], a: 2 },
        { q: "“Mọi người” tiếng Trung là:", opts: ["大家", "你们", "学生"], a: 0 }
      ] },
      { title: "Phần 3. Chọn câu đáp phù hợp", type: "choice", items: [
        { q: "A: 谢谢！", opts: ["没关系", "不客气", "再见"], a: 1 },
        { q: "A: 对不起！", opts: ["没关系", "谢谢", "你好"], a: 0 },
        { q: "A: 你叫什么名字？", opts: ["我是学生", "我很高兴", "我叫 Lan"], a: 2 },
        { q: "A: 认识你很高兴！", opts: ["不客气", "认识你我也很高兴", "没事"], a: 1 }
      ] },
      { title: "Phần 4. Điền từ vào chỗ trống", note: "Từ cho sẵn: 您 / 也 / 不 / 请问", type: "choice", items: [
        { q: "王老师，___好！", opts: ["您", "也", "不", "请问"], a: 0 },
        { q: "___，你叫什么名字？", opts: ["您", "也", "不", "请问"], a: 3 },
        { q: "我是学生，你___是学生。", opts: ["您", "也", "不", "请问"], a: 1 },
        { q: "我___是老师，我是学生。", opts: ["您", "也", "不", "请问"], a: 2 }
      ] },
      { title: "Phần 5. Sắp xếp thành câu đúng", type: "order", items: [
        { w: ["名字", "叫", "你", "什么"], a: "你叫什么名字？" },
        { w: ["也", "我", "学生", "是"], a: "我也是学生。" },
        { w: ["高兴", "认识", "很", "你"], a: "认识你很高兴。" }
      ] },
      { title: "Phần 6. Dịch sang tiếng Trung (gõ chữ Hán)", note: "Không cần chú ý dấu câu.", type: "type", items: [
        { q: "Tôi không phải là giáo viên.", a: ["我不是老师"] },
        { q: "Thầy Vương, tạm biệt thầy!", a: ["王老师，再见！"] }
      ] }
    ]
  }
];

window.HD_QUOTES = [
  ["加油！", "jiāyóu", "Cố lên!"],
  ["每天进步一点点", "měitiān jìnbù yìdiǎndiǎn", "Mỗi ngày tiến bộ thêm một chút"],
  ["慢慢来，比较快", "mànman lái, bǐjiào kuài", "Cứ từ từ thì lại nhanh hơn"],
  ["有志者事竟成", "yǒu zhì zhě shì jìng chéng", "Có chí thì nên"],
  ["千里之行，始于足下", "qiān lǐ zhī xíng, shǐ yú zúxià", "Hành trình ngàn dặm bắt đầu từ một bước chân"],
  ["天天向上", "tiāntiān xiàng shàng", "Mỗi ngày một tiến bộ"],
  ["好好学习，天天向上", "hǎohǎo xuéxí, tiāntiān xiàng shàng", "Chăm chỉ học tập, ngày ngày tiến bộ"],
  ["坚持就是胜利", "jiānchí jiù shì shènglì", "Kiên trì chính là chiến thắng"],
  ["祝你今天开心", "zhù nǐ jīntiān kāixīn", "Chúc bạn hôm nay vui vẻ"],
  ["今天也要加油", "jīntiān yě yào jiāyóu", "Hôm nay cũng cố lên nhé"],
  ["学而时习之，不亦说乎", "xué ér shí xí zhī, bú yì yuè hū", "Học rồi thường xuyên ôn tập, chẳng phải vui sao"],
  ["熟能生巧", "shú néng shēng qiǎo", "Quen tay hay việc"],
  ["谢谢你，辛苦了", "xièxie nǐ, xīnkǔ le", "Cảm ơn bạn, vất vả rồi"],
  ["祝你学习进步", "zhù nǐ xuéxí jìnbù", "Chúc bạn học tập tiến bộ"],
  ["你真棒", "nǐ zhēn bàng", "Bạn giỏi quá!"]
];
