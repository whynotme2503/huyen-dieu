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
  { id: 3, topic: "", words: [] },
  { id: 4, topic: "", words: [] },
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
