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
    id: 1, zh: "AI小语，你好！", topic: "Chào hỏi", words: [
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
    id: 2, zh: "我叫李文", topic: "Hỏi tên", words: [
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
    id: 3, zh: "我是中国人", topic: "Quốc gia, gia đình", words: [
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
    id: 4, zh: "我有两个孩子", topic: "Gia đình, tuổi tác", words: [
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
  { id: 5, zh: "今天我休息", topic: "Hôm nay anh được nghỉ", words: [
      ["今天", "jīntiān", "hôm nay", "", "dt."],
      ["号", "hào", "ngày, mùng", "", "lượng."],
      ["月", "yuè", "tháng", "", "dt."],
      ["日", "rì", "ngày", "", "lượng."],
      ["星期", "xīngqī", "thứ, tuần", "", "dt."],
      ["星期日", "Xīngqīrì", "Chủ nhật", "", "dt."],
      ["星期天", "Xīngqītiān", "Chủ nhật", "", "dt."],
      ["休息", "xiūxi", "nghỉ, nghỉ ngơi", "", "đgt."],
      ["会", "huì", "biết, có thể", "", "đtnn."],
      ["做饭", "zuò fàn", "nấu ăn", "", ""],
      ["做", "zuò", "làm, nấu", "", "đgt."],
      ["面条儿", "miàntiáor", "mì, mì sợi", "", "dt."],
      ["饺子", "jiǎozi", "sủi cảo", "", "dt."],
      ["一些", "yìxiē", "một số, một vài", "", "sl."],
      ["菜", "cài", "món ăn, rau", "", "dt."],
      ["下班", "xiàbān", "tan làm, tan ca", "", "đgt."],
      ["新", "xīn", "mới", "", "tt."],
      ["电脑", "diànnǎo", "máy tính, máy vi tính", "", "dt."],
      ["真", "zhēn", "thật, thực sự", "", "phó."],
      ["好看", "hǎokàn", "đẹp", "", "tt."],
      ["喜欢", "xǐhuan", "thích", "", "đgt."],
      ["它", "tā", "nó", "", "đt."]
    ] },
  { id: 6, zh: "你的手机号是多少？", topic: "Số điện thoại di động của bạn là bao nhiêu?", words: [
      ["手机", "shǒujī", "điện thoại di động", "", "dt."],
      ["电话", "diànhuà", "điện thoại (máy cố định)", "", "dt."],
      ["号", "hào", "số", "", "dt."],
      ["明天", "míngtiān", "ngày mai", "", "dt."],
      ["去", "qù", "đi", "", "đgt."],
      ["哪儿", "nǎr", "đâu, chỗ nào, nơi nào", "", "đt."],
      ["想", "xiǎng", "muốn", "", "đtnn."],
      ["超市", "chāoshì", "siêu thị", "", "dt."],
      ["买", "mǎi", "mua", "", "đgt."],
      ["东西", "dōngxi", "đồ, đồ đạc", "", "dt."],
      ["些", "xiē", "một ít, một vài", "", "lượng."],
      ["牛奶", "niúnǎi", "sữa (bò)", "", "dt."],
      ["吃", "chī", "ăn", "", "đgt."],
      ["晚饭", "wǎnfàn", "bữa tối", "", "dt."],
      ["那边", "nàbiān", "bên kia, chỗ đó", "", "đt."],
      ["包子", "bāozi", "bánh bao (có nhân)", "", "dt."],
      ["非常", "fēicháng", "rất, vô cùng, cực kỳ", "", "phó."],
      ["好吃", "hǎochī", "ngon", "", "tt."],
      ["米饭", "mǐfàn", "cơm (cơm trắng)", "", "dt."],
      ["怎么", "zěnme", "thế nào, bằng cách nào, như thế nào", "", "đt."],
      ["坐", "zuò", "ngồi, đi (xe, tàu...)", "", "đgt."],
      ["出租车", "chūzūchē", "xe taxi", "", "dt."],
      ["西安饭店", "Xī'ān Fàndiàn", "nhà hàng Tây An", "", "dt. riêng"]
    ] },
  { id: 7, zh: "我晚上六点半下班", topic: "Em tan làm lúc 6 rưỡi tối", words: [
      ["现在", "xiànzài", "bây giờ, hiện tại", "", "dt."],
      ["点", "diǎn", "giờ", "", "lượng."],
      ["早上", "zǎoshang", "buổi sáng, sáng sớm", "", "dt."],
      ["上午", "shàngwǔ", "buổi sáng", "", "dt."],
      ["分", "fēn", "phút", "", "lượng."],
      ["课", "kè", "tiết học, giờ học", "", "dt."],
      ["下午", "xiàwǔ", "buổi chiều", "", "dt."],
      ["见", "jiàn", "gặp, gặp mặt", "", "đgt."],
      ["吧", "ba", "nhé (cuối câu: đề nghị, gợi ý, thương lượng, yêu cầu)", "", "trợ."],
      ["电影院", "diànyǐngyuàn", "rạp chiếu phim, rạp chiếu bóng", "", "dt."],
      ["看", "kàn", "xem, nhìn, đọc", "", "đgt."],
      ["电影", "diànyǐng", "phim, điện ảnh", "", "dt."],
      ["事", "shì", "việc, sự việc", "", "dt."],
      ["上课", "shàngkè", "lên lớp, đi học", "", "đgt."],
      ["呢", "ne", "(cuối câu, nhấn mạnh hoặc duy trì ngữ khí trong câu trần thuật và câu hỏi)", "", "trợ."],
      ["半", "bàn", "một nửa, rưỡi", "", "số."],
      ["下课", "xiàkè", "tan học", "", "đgt."],
      ["在", "zài", "ở, tại", "", "đgt."],
      ["家", "jiā", "nhà", "", "dt."],
      ["里", "li/lǐ", "trong, bên trong", "", "dt."],
      ["晚上", "wǎnshang", "buổi tối", "", "dt."],
      ["医院", "yīyuàn", "bệnh viện", "", "dt."],
      ["上班", "shàngbān", "đi làm, vào ca", "", "đgt."],
      ["店", "diàn", "cửa hàng, cửa tiệm", "", "dt."],
      ["菜", "cài", "thức ăn, món ăn, rau", "", "dt."],
      ["分钟", "fēnzhōng", "phút", "", "lượng."],
      ["后", "hòu", "sau, sau đó", "", "dt."]
    ] },
  { id: 8, zh: "我爸爸也在医院工作", topic: "Bố em cũng làm việc ở bệnh viện", words: [
      ["房间", "fángjiān", "căn phòng", "", "dt."],
      ["外", "wài", "ngoài, bên ngoài", "", "dt."],
      ["只", "zhī", "con (chim, chó, hổ...)", "", "lượng."],
      ["小", "xiǎo", "nhỏ, bé", "", "tt."],
      ["猫", "māo", "mèo", "", "dt."],
      ["没", "méi", "không, chưa", "", "phó."],
      ["看见", "kànjiàn", "nhìn thấy, trông thấy", "", "đgt."],
      ["桌子", "zhuōzi", "bàn, cái bàn", "", "dt."],
      ["下", "xià", "dưới, bên dưới", "", "dt."],
      ["漂亮", "piàoliang", "đẹp, xinh đẹp", "", "tt."],
      ["在", "zài", "ở, tại", "", "giới."],
      ["学校", "xuéxiào", "trường học", "", "dt."],
      ["书店", "shūdiàn", "hiệu sách, nhà sách", "", "dt."],
      ["前", "qián", "phía trước", "", "dt."],
      ["能", "néng", "có thể", "", "đtnn."],
      ["到", "dào", "đến", "", "đgt."],
      ["午饭", "wǔfàn", "bữa trưa", "", "dt."],
      ["饭", "fàn", "cơm", "", "dt."],
      ["大", "dà", "lớn, to", "", "tt."],
      ["病人", "bìngrén", "bệnh nhân", "", "dt."],
      ["多", "duō", "nhiều", "", "tt."],
      ["医生", "yīshēng", "bác sĩ", "", "dt."],
      ["工作", "gōngzuò", "làm việc", "", "đgt."],
      ["胡医生", "Hú yīshēng", "bác sĩ Hồ", "", "dt. riêng"]
    ] },
  { id: 9, zh: "我明天上午在学校学习", topic: "Sáng mai mình học ở trường", words: [
      ["前边", "qiánbian", "phía trước", "", "dt."],
      ["边", "bian/biān", "phía, bên", "", "htố./dt."],
      ["家", "jiā", "cái, chiếc (dùng cho cửa hàng, cơ quan, doanh nghiệp)", "", "lượng."],
      ["那个", "nàge", "đó, cái đó", "", "đt."],
      ["外边", "wàibian", "phía ngoài, bên ngoài", "", "dt."],
      ["椅子", "yǐzi", "ghế", "", "dt."],
      ["上", "shang/shàng", "trên, trước (dùng sau danh từ, chỉ vị trí)", "", "dt."],
      ["本", "běn", "quyển, cuốn", "", "lượng."],
      ["书", "shū", "sách", "", "dt."],
      ["那", "nà", "kia, đó", "", "đt."],
      ["第", "dì", "thứ (biểu thị số thứ tự)", "", "ttố."],
      ["学习", "xuéxí", "học, học tập", "", "đgt."],
      ["做", "zuò", "làm", "", "đgt."],
      ["白天", "báitiān", "ban ngày", "", "dt."],
      ["读书", "dúshū", "đọc sách, xem sách", "", "đgt."],
      ["和", "hé", "với, cùng", "", "giới."],
      ["朋友", "péngyou", "bạn, bạn bè", "", "dt."],
      ["唱", "chàng", "hát", "", "đgt."],
      ["歌", "gē", "bài hát", "", "dt."],
      ["好听", "hǎotīng", "hay, nghe hay", "", "tt."],
      ["电视", "diànshì", "ti vi, vô tuyến", "", "dt."],
      ["狗", "gǒu", "chó", "", "dt."],
      ["玩", "wán", "chơi", "", "đgt."]
    ] },
  { id: 10, zh: "这儿的苹果真便宜！", topic: "Táo ở đây rẻ thật!", words: [
      ["杯子", "bēizi", "cốc, ly", "", "dt."],
      ["售货员", "shòuhuòyuán", "nhân viên bán hàng", "", "dt."],
      ["这边", "zhèbiān", "bên này, phía này", "", "đt."],
      ["钱", "qián", "tiền", "", "dt."],
      ["这些", "zhèxiē", "những cái này", "", "đt."],
      ["块", "kuài", "đồng (đơn vị tiền tệ)", "", "lượng."],
      ["那些", "nàxiē", "những cái kia", "", "đt."],
      ["这儿", "zhèr", "ở đây, chỗ này", "", "đt."],
      ["水果", "shuǐguǒ", "hoa quả, trái cây", "", "dt."],
      ["少", "shǎo", "ít", "", "tt."],
      ["斤", "jīn", "cân (đơn vị đo lường của Trung Quốc, 1 cân bằng 0,5 kg)", "", "lượng."],
      ["苹果", "píngguǒ", "táo", "", "dt."],
      ["便宜", "piányi", "rẻ", "", "tt."],
      ["商店", "shāngdiàn", "cửa hàng", "", "dt."],
      ["衣服", "yīfu", "quần áo", "", "dt."],
      ["件", "jiàn", "chiếc, cái (dùng cho quần áo)", "", "lượng."],
      ["元", "yuán", "đồng (nhân dân tệ)", "", "lượng."],
      ["怎么样", "zěnmeyàng", "thế nào, như thế nào", "", "đt."],
      ["贵", "guì", "đắt", "", "tt."],
      ["穿", "chuān", "mặc", "", "đgt."],
      ["女", "nǚ", "nữ, con gái", "", "tt."],
      ["男", "nán", "nam, con trai", "", "tt."],
      ["那儿", "nàr", "ở kia, chỗ đó", "", "đt."]
    ] },
  { id: 11, zh: "我读大学呢", topic: "Em đang học đại học", words: [
      ["时候", "shíhou", "lúc, khi", "", "dt."],
      ["饭店", "fàndiàn", "nhà hàng, khách sạn", "", "dt."],
      ["知道", "zhīdào", "biết, nhận ra", "", "đgt."],
      ["正在", "zhèngzài", "đang (làm gì)", "", "phó."],
      ["找", "zhǎo", "tìm, kiếm", "", "đgt."],
      ["开车", "kāichē", "lái xe (ô tô)", "", "đgt."],
      ["车", "chē", "xe", "", "dt."],
      ["在", "zài", "đang", "", "phó."],
      ["读", "dú", "học, đọc", "", "đgt."],
      ["大学", "dàxué", "đại học", "", "dt."],
      ["大学生", "dàxuéshēng", "sinh viên", "", "dt."],
      ["学", "xué", "học", "", "đgt."],
      ["医", "yī", "y, y học, y khoa", "", "dt."],
      ["弟弟", "dìdi", "em trai", "", "dt."],
      ["起床", "qǐchuáng", "thức dậy, ngủ dậy, dậy", "", "đgt."],
      ["睡觉", "shuìjiào", "ngủ", "", "đgt."],
      ["睡", "shuì", "ngủ", "", "đgt."],
      ["那里", "nàlǐ", "ở kia, chỗ đó", "", "đt."],
      ["哪里", "nǎlǐ", "đâu, chỗ nào, nơi nào", "", "đt."],
      ["昨天", "zuótiān", "hôm qua", "", "dt."],
      ["问", "wèn", "hỏi", "", "đgt."],
      ["对", "duì", "với, đối với", "", "giới."],
      ["说", "shuō", "nói", "", "đgt."],
      ["要", "yào", "cần, muốn, phải", "", "đtnn."],
      ["小朋友", "xiǎopéngyǒu", "bạn nhỏ", "", "dt."]
    ] },
  { id: 12, zh: "昨天下雪了", topic: "Hôm qua tuyết rơi rồi", words: [
      ["天气", "tiānqì", "thời tiết", "", "dt."],
      ["这里", "zhèlǐ", "ở đây, chỗ này", "", "đt."],
      ["天", "tiān", "thời tiết, trời / ngày", "", "dt./lượng."],
      ["下雨", "xià yǔ", "mưa, mưa rơi", "", ""],
      ["了", "le", "(cuối câu, chỉ sự thay đổi tình hình hoặc trạng thái)", "", "trợ."],
      ["雨", "yǔ", "mưa", "", "dt."],
      ["有点儿", "yǒudiǎnr", "hơi, hơi... một chút", "", "phó."],
      ["觉得", "juéde", "cảm thấy", "", "đgt."],
      ["冷", "lěng", "lạnh", "", "tt."],
      ["下", "xià", "(mưa, tuyết...) rơi", "", "đgt."],
      ["雪", "xuě", "tuyết", "", "dt."],
      ["来", "lái", "đến", "", "đgt."],
      ["公司", "gōngsī", "công ty", "", "dt."],
      ["生病", "shēngbìng", "ốm, bị ốm, bệnh, bị bệnh", "", "đgt."],
      ["看病", "kànbìng", "khám bệnh", "", "đgt."],
      ["病", "bìng", "ốm, bị ốm, bệnh, bị bệnh", "", "đgt."],
      ["一点儿", "yìdiǎnr", "một chút, một ít", "", "sl."],
      ["药", "yào", "thuốc", "", "dt."],
      ["回", "huí", "về, quay về", "", "đgt."],
      ["再", "zài", "sau đó, mới (chỉ trình tự)", "", "phó."],
      ["喝", "hē", "uống", "", "đgt."],
      ["热", "rè", "nóng, ấm", "", "tt."],
      ["水", "shuǐ", "nước", "", "dt."]
    ] },
  { id: 13, zh: "请给我一杯茶", topic: "Cho tôi một cốc trà", words: [
      ["可以", "kěyǐ", "có thể, được (cho phép làm gì)", "", "đtnn."],
      ["再", "zài", "lại, thêm lần nữa", "", "phó."],
      ["问题", "wèntí", "câu hỏi, vấn đề", "", "dt."],
      ["卖", "mài", "bán", "", "đgt."],
      ["打电话", "dǎ diànhuà", "gọi điện thoại", "", ""],
      ["一下", "yíxià", "một chút, thử (dùng sau động từ, biểu thị hành động xảy ra nhanh hoặc thử làm)", "", "sl."],
      ["服务员", "fúwùyuán", "nhân viên phục vụ, người phục vụ", "", "dt."],
      ["女士", "nǚshì", "bà, cô, quý bà, quý cô", "", "dt."],
      ["请", "qǐng", "mời, xin, hãy", "", "đgt."],
      ["坐", "zuò", "ngồi", "", "đgt."],
      ["给", "gěi", "đưa cho, cho", "", "đgt."],
      ["杯", "bēi", "ly, cốc, tách", "", "dt."],
      ["要", "yào", "cần, muốn", "", "đgt."],
      ["早饭", "zǎofàn", "bữa sáng", "", "dt."],
      ["这个", "zhège", "cái này", "", "đt."],
      ["面包", "miànbāo", "bánh mì", "", "dt."],
      ["鸡蛋", "jīdàn", "trứng gà", "", "dt."],
      ["先生", "xiānsheng", "anh, ông, ngài, quý ông", "", "dt."],
      ["一半", "yíbàn", "một nửa", "", "số."],
      ["茶", "chá", "trà, chè", "", "dt."]
    ] },
  { id: 14, zh: "我看了一个电影", topic: "Mình đã xem một bộ phim", words: [
      ["上", "shàng", "lên (xe, tàu...) / lên, bắt đầu (làm gì đó vào thời gian cố định)", "", "đgt."],
      ["火车", "huǒchē", "tàu, tàu hoả, xe lửa", "", "dt."],
      ["中午", "zhōngwǔ", "buổi trưa", "", "dt."],
      ["开", "kāi", "lái, chạy, khởi hành (phương tiện giao thông)", "", "đgt."],
      ["有些", "yǒuxiē", "có một số, có một vài", "", "đt."],
      ["有的", "yǒude", "có người, có cái", "", "đt."],
      ["了", "le", "(sau động từ, chỉ sự hoàn thành của động tác)", "", "trợ."],
      ["写", "xiě", "viết", "", "đgt."],
      ["都", "dōu", "đều", "", "phó."],
      ["听见", "tīngjiàn", "nghe thấy", "", "đgt."],
      ["不要", "búyào", "đừng, không được", "", "phó."],
      ["说话", "shuōhuà", "nói chuyện", "", "đgt."],
      ["听", "tīng", "nghe", "", "đgt."],
      ["哪些", "nǎxiē", "những... nào", "", "đt."],
      ["字", "zì", "chữ", "", "dt."],
      ["汉语", "Hànyǔ", "tiếng Trung Quốc, tiếng Hán", "", "dt. riêng"],
      ["汉字", "Hànzì", "chữ Hán", "", "dt. riêng"],
      ["明年", "míngnián", "sang năm, năm tới", "", "dt."],
      ["中学", "zhōngxué", "trường trung học, trung học", "", "dt."],
      ["小学", "xiǎoxué", "trường tiểu học, tiểu học", "", "dt."],
      ["中学生", "zhōngxuéshēng", "học sinh trung học, học sinh cấp hai", "", "dt."],
      ["小学生", "xiǎoxuéshēng", "học sinh tiểu học, học sinh cấp một", "", "dt."],
      ["上学", "shàngxué", "đi học, bắt đầu đi học", "", "đgt."],
      ["他们", "tāmen", "họ, chúng, bọn họ, các anh ấy, các em ấy...", "", "đt."],
      ["她们", "tāmen", "họ, chúng, bọn họ, các chị ấy, các em ấy...", "", "đt."],
      ["它们", "tāmen", "chúng (đại từ nhân xưng ngôi thứ ba số nhiều, chỉ vật)", "", "đt."],
      ["晚", "wǎn", "muộn, trễ", "", "tt."]
    ] },
  { id: 15, zh: "大兴机场见！", topic: "Hẹn gặp ở sân bay Đại Hưng!", words: [
      ["爱", "ài", "thích, yêu thích", "", "đgt."],
      ["哪个", "nǎge", "cái nào, nào", "", "đt."],
      ["去年", "qùnián", "năm ngoái", "", "dt."],
      ["男朋友", "nánpéngyou", "bạn trai, người yêu", "", "dt."],
      ["几", "jǐ", "vài, mấy", "", "số."],
      ["年", "nián", "năm", "", "dt."],
      ["好玩儿", "hǎowánr", "vui, thích, thú vị", "", "tt."],
      ["西安", "Xī'ān", "Tây An", "", "dt. riêng"],
      ["北京", "Běijīng", "Bắc Kinh", "", "dt. riêng"],
      ["飞机", "fēijī", "máy bay", "", "dt."],
      ["要", "yào", "cần, mất (thời gian)", "", "đgt."],
      ["小时", "xiǎoshí", "tiếng đồng hồ, giờ", "", "dt."],
      ["家人", "jiārén", "người nhà", "", "dt."],
      ["时间", "shíjiān", "thời gian", "", "dt."],
      ["机场", "jīchǎng", "sân bay", "", "dt."],
      ["接", "jiē", "đón, tiếp đón", "", "đgt."],
      ["住", "zhù", "ở", "", "đgt."],
      ["早", "zǎo", "sớm", "", "tt."],
      ["那", "nà", "vậy thì, thế thì", "", "liên."],
      ["大兴机场", "Dàxīng Jīchǎng", "sân bay Đại Hưng", "", "dt. riêng"]
    ] }
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
    id: "sheet-b2", lesson: 2, title: "HSK1 – Bài 2",
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
  },
  {
    id: "sheet-b3", lesson: 3, title: "HSK1 – Bài 3",
    parts: [
      { title: "Phần 1. Chọn pinyin đúng", type: "choice", items: [
        { q: "越南语", opts: ["Yuènányǔ", "Yuénányǔ", "Yuènànyǔ"], a: 0 },
        { q: "女朋友", opts: ["nǚ péngyǒu", "nǚpéngyou", "nǔpéngyou"], a: 1 },
        { q: "谁", opts: ["shuì", "shéi", "shěi"], a: 1, exp: "Cũng có cách đọc shuí." },
        { q: "不太", opts: ["bù tài", "bú tài", "bū tài"], a: 1, exp: "不 đứng trước thanh 4 thì đổi thành bú." }
      ] },
      { title: "Phần 2. Chọn đáp án đúng", type: "choice", items: [
        { q: "“Thái Lan” tiếng Trung là:", opts: ["法国", "泰国", "英国"], a: 1 },
        { q: "妹妹 nghĩa là:", opts: ["chị gái", "em gái", "bạn gái"], a: 1 },
        { q: "Từ nào chỉ ngôn ngữ?", opts: ["中国", "中文", "中国人"], a: 1 },
        { q: "Khi nói về chị gái, ta dùng:", opts: ["他", "她", "你们"], a: 1 }
      ] },
      { title: "Phần 3. Trợ từ 的", type: "mixed", note: "Câu 10, 11: gõ chữ Hán.", ph: "Gõ chữ Hán tại đây", items: [
        { q: "“Giáo viên của tôi” là:", opts: ["老师的我", "我的老师", "我老师的"], a: 1, exp: "Người sở hữu đứng trước 的, vật được sở hữu đứng sau." },
        { q: "Điền từ: 这是 ___ 的名字？ (Đây là tên của ai?)", a: ["谁"] },
        { q: "Dịch sang tiếng Trung: “bạn học của chị gái tôi”", a: ["我姐姐的同学", "我的姐姐的同学"] }
      ] },
      { title: "Phần 4. Biến đổi câu (是 / 不是 / 吗)", type: "type", note: "Gõ chữ Hán, không cần chú ý dấu câu.", ph: "Gõ câu tại đây", items: [
        { q: "他是越南人。→ Đổi thành câu hỏi dùng 吗", a: ["他是越南人吗"] },
        { q: "她是我妹妹。→ Đổi thành câu phủ định", a: ["她不是我妹妹", "她不是我的妹妹"] },
        { q: "王老师是中国人。", fields: [{"label": "Đặt câu hỏi dùng 吗", "a": ["王老师是中国人吗"]}, {"label": "Trả lời phủ định", "a": ["不他不是中国人", "他不是中国人"]}] },
        { q: "你们是学生。", fields: [{"label": "Đặt câu hỏi dùng 吗", "a": ["你们是学生吗"]}, {"label": "Trả lời khẳng định bằng 对", "a": ["对我们是学生"]}], exp: "Câu hỏi dùng 你们 thì câu trả lời phải đổi sang 我们." }
      ] },
      { title: "Phần 5. Tìm lỗi sai và sửa lại", type: "type", note: "Gõ lại câu đã sửa cho đúng.", ph: "Gõ câu đúng tại đây", items: [
        { q: "你叫什么名字吗？", a: ["你叫什么名字"], exp: "Câu đã có từ để hỏi 什么 thì không thêm 吗." },
        { q: "他是不中国人。", a: ["他不是中国人"], exp: "不 phải đứng trước 是." },
        { q: "我是很高兴。", a: ["我很高兴"], exp: "Trước tính từ dùng 很, không dùng 是." },
        { q: "她是哪国人吗？", a: ["她是哪国人"], exp: "Câu đã có 哪 nên bỏ 吗." },
        { q: "A: 你忙吗？ B: 我不忙太。", a: ["我不太忙"], exp: "Thứ tự đúng là 不太 + tính từ." }
      ] },
      { title: "Phần 6. Chọn câu đáp phù hợp", type: "choice", items: [
        { q: "你是哪国人？", opts: ["我是学生", "我是越南人", "我叫 Lan"], a: 1 },
        { q: "她是谁？", opts: ["她是我姐姐", "她是英国", "她很忙"], a: 0 },
        { q: "你工作忙吗？", opts: ["不客气", "不太忙", "不是"], a: 1 },
        { q: "你是法国人吗？", opts: ["对，我是法国人", "我是法国", "是，法国"], a: 0 },
        { q: "喂，你好！请问，你是 Lan 吗？", opts: ["对，我是 Lan。", "我叫 Lan 吗？", "没关系。"], a: 0 }
      ] },
      { title: "Phần 7. Điền từ vào hội thoại", type: "choice", note: "Từ cho sẵn: 喂 / 吗 / 不太 / 还 / 谁 / 的 / 哪 / 想\n\nHội thoại 1 (gọi điện thoại)\nA: (26) ___，姐姐！\nB: 妹妹，你好！你工作忙 (27) ___？\nA: (28) ___ 忙，(29) ___ 好。\n\nHội thoại 2 (xem ảnh)\nA: 这是 (30) ___？\nB: 这是我 (31) ___ 老师。\nA: 她是 (32) ___ 国人？\nB: 她是英国人。\nA: 我 (33) ___ 认识她。", items: [
        { q: "A: (26) ___，姐姐！", sub: "Chọn từ cho chỗ trống (26)", opts: ["喂", "吗", "不太", "还", "谁", "的", "哪", "想"], a: 0 },
        { q: "B: 妹妹，你好！你工作忙 (27) ___？", sub: "Chọn từ cho chỗ trống (27)", opts: ["喂", "吗", "不太", "还", "谁", "的", "哪", "想"], a: 1 },
        { q: "A: (28) ___ 忙，(29) ___ 好。", sub: "Chọn từ cho chỗ trống (28)", opts: ["喂", "吗", "不太", "还", "谁", "的", "哪", "想"], a: 2 },
        { q: "A: (28) ___ 忙，(29) ___ 好。", sub: "Chọn từ cho chỗ trống (29)", opts: ["喂", "吗", "不太", "还", "谁", "的", "哪", "想"], a: 3 },
        { q: "A: 这是 (30) ___？", sub: "Chọn từ cho chỗ trống (30)", opts: ["喂", "吗", "不太", "还", "谁", "的", "哪", "想"], a: 4 },
        { q: "B: 这是我 (31) ___ 老师。", sub: "Chọn từ cho chỗ trống (31)", opts: ["喂", "吗", "不太", "还", "谁", "的", "哪", "想"], a: 5 },
        { q: "A: 她是 (32) ___ 国人？", sub: "Chọn từ cho chỗ trống (32)", opts: ["喂", "吗", "不太", "还", "谁", "的", "哪", "想"], a: 6 },
        { q: "A: 我 (33) ___ 认识她。", sub: "Chọn từ cho chỗ trống (33)", opts: ["喂", "吗", "不太", "还", "谁", "的", "哪", "想"], a: 7 }
      ] },
      { title: "Phần 8. Sắp xếp thành câu đúng", type: "order", items: [
        { w: ["是", "他", "吗", "越南人"], a: "他是越南人吗？" },
        { w: ["的", "这", "是", "女朋友", "我"], a: "这是我的女朋友。" },
        { w: ["不", "她", "法国人", "是", "也"], a: "她也不是法国人。", exp: "也 luôn đứng trước 不." },
        { w: ["人", "老师", "哪", "国", "你们", "的", "是"], a: "你们的老师是哪国人？" }
      ] },
      { title: "Phần 9. Dịch sang tiếng Trung", type: "type", note: "Gõ chữ Hán, không cần chú ý dấu câu. Có hay không có 的 trước từ chỉ người thân đều được tính đúng.", ph: "Gõ câu tiếng Trung tại đây", items: [
        { q: "Đây là ai? Đây là em gái tôi.", a: ["这是谁这是我妹妹", "这是谁这是我的妹妹"] },
        { q: "Anh ấy không phải người Trung Quốc, anh ấy là người Thái Lan.", a: ["他不是中国人他是泰国人"] },
        { q: "Chị gái bạn có bận không?", a: ["你姐姐忙吗", "你的姐姐忙吗"] },
        { q: "Chúng tôi là học sinh, họ cũng là học sinh.", a: ["我们是学生他们也是学生", "我们是学生她们也是学生"], exp: "Nói về nhóm nữ có thể dùng 她们." }
      ] }
    ]
  },
  {
    "id": "sheet-b4",
    "lesson": 4,
    "title": "HSK1 – Bài 4",
    "parts": [
      {
        "title": "Phần 1. Điền chữ Hán vào chỗ trống",
        "note": "Mỗi chỗ trống điền 1 từ, có thể là 1 hoặc 2 chữ.",
        "ph": "Gõ chữ Hán",
        "items": [
          {
            "vi": "Nhà tôi có 4 người.",
            "q": "我 ___ 有四口人。",
            "a": [
              "家"
            ]
          },
          {
            "vi": "Bạn có bạn gái không?",
            "q": "你 ___ 女朋友吗？",
            "a": [
              "有"
            ]
          },
          {
            "vi": "Tôi không có em gái.",
            "q": "我 ___ 妹妹。",
            "a": [
              "没有"
            ]
          },
          {
            "vi": "Cô ấy có một con trai và một con gái.",
            "q": "她有一个 ___ 和一个 ___。",
            "fields": [
              {
                "label": "Chỗ trống 1",
                "a": [
                  "儿子"
                ]
              },
              {
                "label": "Chỗ trống 2",
                "a": [
                  "女儿"
                ]
              }
            ]
          },
          {
            "vi": "Bố mẹ bạn có khỏe không?",
            "q": "你 ___ ___ 好吗？",
            "fields": [
              {
                "label": "Chỗ trống 1",
                "a": [
                  "爸爸"
                ]
              },
              {
                "label": "Chỗ trống 2",
                "a": [
                  "妈妈"
                ]
              }
            ]
          },
          {
            "vi": "Năm nay tôi 20 tuổi.",
            "q": "我 ___ 二十岁。",
            "a": [
              "今年"
            ]
          },
          {
            "vi": "Con trai tôi 7 tuổi.",
            "q": "我儿子七 ___。",
            "a": [
              "岁"
            ]
          },
          {
            "vi": "Tôi là người Việt Nam, còn bạn?",
            "q": "我是越南人，你 ___？",
            "a": [
              "呢"
            ]
          },
          {
            "vi": "Thầy Vương có mấy đứa con?",
            "q": "王老师有几个 ___？",
            "a": [
              "孩子"
            ]
          },
          {
            "vi": "Bố và mẹ tôi là người Pháp.",
            "q": "我爸爸 ___ 妈妈是法国人。",
            "a": [
              "和"
            ]
          }
        ]
      },
      {
        "title": "Phần 2. Chọn chữ đúng",
        "items": [
          {
            "vi": "Nhà tôi có 5 người.",
            "q": "我家有五 ___ 人。",
            "opts": [
              "口",
              "日"
            ],
            "a": 0
          },
          {
            "vi": "Bạn có mấy đứa con?",
            "q": "你有 ___ 个孩子？",
            "opts": [
              "九",
              "几"
            ],
            "a": 1
          },
          {
            "vi": "Anh ấy có một con trai.",
            "q": "他有一个 ___ 子。",
            "opts": [
              "儿",
              "几"
            ],
            "a": 0
          },
          {
            "vi": "Tôi không có chị gái.",
            "q": "我 ___ 有姐姐。",
            "opts": [
              "没",
              "不"
            ],
            "a": 0
          },
          {
            "vi": "Tôi không phải người Trung Quốc.",
            "q": "我 ___ 是中国人。",
            "opts": [
              "没",
              "不"
            ],
            "a": 1
          },
          {
            "vi": "Năm nay mẹ tôi 40 tuổi.",
            "q": "我妈妈今 ___ 四十岁。",
            "opts": [
              "年",
              "午"
            ],
            "a": 0
          }
        ]
      },
      {
        "title": "Phần 3. Ghép chữ thành từ",
        "note": "Dùng các chữ dưới đây để ghép ít nhất 8 từ đã học. Một chữ có thể dùng nhiều lần. Gõ các từ cách nhau bằng dấu cách.",
        "ph": "Ví dụ: 爸爸 妈妈 …",
        "items": [
          {
            "q": "Viết ít nhất 8 từ ghép được:",
            "sub": "爸 · 妈 · 儿 · 女 · 子 · 孩 · 今 · 年 · 多 · 少 · 大 · 没 · 有 · 家",
            "valid": [
              "爸爸",
              "妈妈",
              "儿子",
              "女儿",
              "孩子",
              "今年",
              "多少",
              "多大",
              "没有",
              "大家"
            ],
            "min": 8,
            "exp": "Có 10 từ đã học ghép được, đạt từ 8 từ trở lên là đủ."
          }
        ]
      },
      {
        "title": "Phần 4a. Viết các số sau bằng chữ Hán",
        "ph": "Gõ bằng chữ Hán",
        "items": [
          {
            "q": "15",
            "a": [
              "十五"
            ]
          },
          {
            "q": "48",
            "a": [
              "四十八"
            ]
          },
          {
            "q": "99",
            "a": [
              "九十九"
            ]
          },
          {
            "q": "101",
            "a": [
              "一百零一"
            ]
          },
          {
            "q": "110",
            "a": [
              "一百一十"
            ]
          },
          {
            "q": "520",
            "a": [
              "五百二十"
            ]
          },
          {
            "q": "1.005",
            "a": [
              "一千零五"
            ]
          },
          {
            "q": "3.080",
            "a": [
              "三千零八十"
            ]
          },
          {
            "q": "6.666",
            "a": [
              "六千六百六十六"
            ]
          },
          {
            "q": "9.999",
            "a": [
              "九千九百九十九"
            ]
          }
        ]
      },
      {
        "title": "Phần 4b. Viết các số sau bằng chữ số",
        "ph": "Gõ bằng chữ số",
        "items": [
          {
            "q": "七十三",
            "a": [
              "73"
            ]
          },
          {
            "q": "二百零九",
            "a": [
              "209"
            ]
          },
          {
            "q": "一千一百",
            "a": [
              "1100"
            ]
          },
          {
            "q": "四千零四",
            "a": [
              "4004"
            ]
          },
          {
            "q": "八千八百零八",
            "a": [
              "8808"
            ]
          }
        ]
      },
      {
        "title": "Phần 4c. Tính rồi ghi kết quả bằng chữ Hán",
        "ph": "Gõ kết quả bằng chữ Hán",
        "items": [
          {
            "q": "二十 + 三十五",
            "a": [
              "五十五"
            ]
          },
          {
            "q": "一百 − 一",
            "a": [
              "九十九"
            ]
          },
          {
            "q": "九 × 九",
            "a": [
              "八十一"
            ]
          },
          {
            "q": "一千二百 + 三百",
            "a": [
              "一千五百"
            ]
          }
        ]
      },
      {
        "title": "Phần 5. Chọn từ đúng",
        "items": [
          {
            "q": "你家有 ___ 口人？",
            "opts": [
              "几",
              "多大",
              "多"
            ],
            "a": 0
          },
          {
            "q": "你女儿今年 ___ 岁？",
            "opts": [
              "几",
              "多大",
              "多"
            ],
            "a": 0
          },
          {
            "q": "王老师今年 ___？",
            "opts": [
              "几",
              "多大",
              "多少"
            ],
            "a": 1
          },
          {
            "q": "你们有 ___ 学生？",
            "opts": [
              "几",
              "多少",
              "多大"
            ],
            "a": 1,
            "exp": "Không chọn 几 được, vì 几 bắt buộc phải có lượng từ đi kèm."
          },
          {
            "q": "我是学生，你 ___？",
            "opts": [
              "吗",
              "呢",
              "多"
            ],
            "a": 1
          },
          {
            "q": "我有一个儿子 ___ 一个女儿。",
            "opts": [
              "和",
              "也",
              "呢"
            ],
            "a": 0
          }
        ]
      },
      {
        "title": "Phần 6. Tìm lỗi sai và sửa lại",
        "note": "Gõ lại cả câu đã sửa cho đúng.",
        "ph": "Gõ câu đúng tại đây",
        "items": [
          {
            "q": "我不有妹妹。",
            "a": [
              "我没有妹妹"
            ]
          },
          {
            "q": "我家有三个口人。",
            "a": [
              "我家有三口人",
              "我家有三个人"
            ],
            "exp": "Có 2 cách sửa, cách nào cũng tính đúng: 我家有三口人。 hoặc 我家有三个人。"
          },
          {
            "q": "他有十二学生。",
            "a": [
              "他有十二个学生"
            ]
          },
          {
            "q": "我有姐姐和我有妹妹。",
            "a": [
              "我有姐姐和妹妹",
              "我有姐姐也有妹妹"
            ],
            "exp": "Có 2 cách sửa: 我有姐姐和妹妹。 hoặc 我有姐姐，也有妹妹。"
          },
          {
            "q": "你今年多大吗？",
            "a": [
              "你今年多大"
            ]
          },
          {
            "q": "我没有是老师。",
            "a": [
              "我不是老师",
              "我没有老师"
            ],
            "exp": "Có 2 cách sửa: 我不是老师。 hoặc 我没有老师。"
          }
        ]
      },
      {
        "title": "Phần 7. Đọc hiểu (trả lời bằng chữ Hán)",
        "note": "Đọc đoạn văn rồi trả lời. Chỉ ghi số cũng tính đúng. Câu trả lời có hoặc không có chủ ngữ (她家, Lan 家, 她…) đều được.",
        "passage": "你们好！我叫 Lan，我是越南人。我家有五口人：爸爸、妈妈、姐姐、妹妹和我。我爸爸今年四十八岁，他是老师，工作很忙。我妈妈今年四十六岁，她是中文老师。我姐姐今年二十四岁，她有一个女儿，今年三岁。我妹妹今年九岁，她是学生。我爸爸妈妈没有儿子。我有很多中国朋友，你们呢？",
        "ph": "Gõ câu trả lời",
        "items": [
          {
            "q": "Lan 家有几口人？",
            "a": [
              "五口人",
              "五",
              "有五口人",
              "家有五口人"
            ],
            "pre": [
              "",
              "她",
              "他",
              "lan",
              "她家",
              "他家",
              "lan家"
            ]
          },
          {
            "q": "Lan 的妈妈今年多大？",
            "a": [
              "四十六岁",
              "四十六"
            ],
            "pre": [
              "",
              "她",
              "他",
              "妈妈",
              "她妈妈",
              "lan的妈妈",
              "今年",
              "她今年",
              "妈妈今年",
              "她妈妈今年",
              "lan的妈妈今年"
            ]
          },
          {
            "q": "Lan 的姐姐有孩子吗？",
            "a": [
              "re:有|有(，)?(她|lan的姐姐|姐姐|lan姐姐)?有(一个)?(女儿|孩子)|(她|lan的姐姐|姐姐|lan姐姐)有(一个)?(女儿|孩子)"
            ],
            "show": "有，她有一个女儿。"
          },
          {
            "q": "Lan 姐姐的女儿今年几岁？",
            "a": [
              "三岁",
              "三"
            ],
            "pre": [
              "",
              "她",
              "他",
              "女儿",
              "她女儿",
              "今年",
              "她今年",
              "女儿今年",
              "她女儿今年",
              "姐姐的女儿",
              "姐姐的女儿今年",
              "lan姐姐的女儿",
              "lan姐姐的女儿今年"
            ]
          },
          {
            "q": "Lan 的爸爸妈妈有几个孩子？",
            "a": [
              "三个",
              "三",
              "三个孩子",
              "三个女儿",
              "有三个女儿"
            ],
            "pre": [
              "",
              "他们",
              "他们有"
            ],
            "exp": "Đây là câu bẫy: bài đọc không nói thẳng số con, phải tự suy ra từ chi tiết nhà có ba chị em gái (姐姐、妹妹和我) và 没有儿子."
          },
          {
            "q": "Lan 的爸爸妈妈有儿子吗？",
            "a": [
              "re:没有|没有儿子|没有(他们|爸爸妈妈|lan的爸爸妈妈|她爸爸妈妈|她的爸爸妈妈)没有儿子|(他们|爸爸妈妈|lan的爸爸妈妈|她爸爸妈妈|她的爸爸妈妈)没有儿子"
            ],
            "pre": [
              "",
              "他们",
              "爸爸妈妈",
              "我爸爸妈妈"
            ],
            "show": "没有。/ 他们没有儿子。"
          }
        ]
      },
      {
        "title": "Phần 8. Sắp xếp thành câu đúng",
        "items": [
          {
            "w": [
              "口",
              "家",
              "几",
              "人",
              "你",
              "有"
            ],
            "a": "你家有几口人？"
          },
          {
            "w": [
              "学生",
              "多少",
              "王老师",
              "有",
              "个"
            ],
            "a": "王老师有多少个学生？"
          },
          {
            "w": [
              "有",
              "孩子",
              "几个",
              "你"
            ],
            "a": "你有几个孩子？"
          },
          {
            "q": "→ ___，你呢？",
            "w": [
              "中国人",
              "不",
              "是",
              "我"
            ],
            "a": "我不是中国人。",
            "exp": "Câu hoàn chỉnh: 我不是中国人，你呢？"
          }
        ]
      },
      {
        "title": "Phần 9. Dịch sang tiếng Trung",
        "note": "Gõ chữ Hán. Dấu 、và ， thay cho nhau đều được, không chấm gắt dấu câu.",
        "ph": "Gõ câu tiếng Trung",
        "items": [
          {
            "q": "Nhà tôi có 3 người: bố, mẹ và tôi.",
            "a": [
              "re:我家有三(口|个)人(是|有)?爸爸妈妈和?我"
            ],
            "show": "我家有三口人：爸爸、妈妈和我。"
          },
          {
            "q": "Năm nay thầy Vương bao nhiêu tuổi? Năm nay thầy 39 tuổi.",
            "a": [
              "re:(王老师今年|今年王老师|王老师)(多大|多少岁)(他|她|老师|王老师)?(今年)?(他|她|老师|王老师)?三十九岁?"
            ],
            "exp": "Không dùng 几岁 để hỏi tuổi người lớn (几岁 chỉ dùng hỏi trẻ em dưới 10 tuổi), nên câu dùng 几岁 tính sai. Dùng 多大 hoặc 多少岁.",
            "show": "王老师今年多大？他今年三十九岁。"
          },
          {
            "q": "Bạn có mấy đứa con? Tôi có một đứa con trai.",
            "a": [
              "re:你有(几|多少)个孩子(我)?有?一个儿子"
            ],
            "show": "你有几个孩子？我有一个儿子。"
          },
          {
            "q": "Con gái tôi năm nay 9 tuổi.",
            "a": [
              "re:(我的?女儿今年|今年我的?女儿)九岁"
            ],
            "show": "我女儿今年九岁。"
          },
          {
            "q": "Tôi không có bạn gái, còn bạn?",
            "a": [
              "re:我没有女朋友(你呢|你有吗|你有女朋友吗)"
            ],
            "show": "我没有女朋友，你呢？"
          },
          {
            "q": "Thầy có bao nhiêu học sinh? Có 1.200 học sinh.",
            "a": [
              "re:(老师|您|老师您|王老师|你)有多少个*学生(我)?有?一千二百个*(学生)?"
            ],
            "show": "老师有多少（个）学生？有一千二百个学生。"
          },
          {
            "q": "Bạn có con gái không? Không có.",
            "a": [
              "re:你有女儿吗(没有|我没有|没有我没有|没有女儿|我没有女儿|没有我没有女儿)"
            ],
            "show": "你有女儿吗？没有。"
          },
          {
            "q": "Bố mẹ tôi có ba đứa con, không có con gái.",
            "a": [
              "re:我的?爸爸和?妈妈有三个孩子(他们|我们)?(没有女儿|没有女孩子)"
            ],
            "show": "我爸爸妈妈有三个孩子，没有女儿。"
          }
        ]
      }
    ]
  },
  {
    "id": "sheet-b5-1",
    "lesson": 5,
    "title": "Bài tập HSK1 - Bài 5 (1)",
    "parts": [
      {
        "title": "Phần 1. Trắc nghiệm",
        "items": [
          {
            "q": "今天星期一，___ 天星期二。",
            "opts": [
              "明",
              "朋"
            ],
            "a": 0
          },
          {
            "q": "我哥哥会做 ___。",
            "opts": [
              "饭",
              "饮"
            ],
            "a": 0
          },
          {
            "q": "___ 天我很忙，今天不忙。",
            "opts": [
              "昨",
              "作"
            ],
            "a": 0
          },
          {
            "q": "今天 ___ 星期三。",
            "opts": [
              "不",
              "不是",
              "没有"
            ],
            "a": 1
          },
          {
            "q": "我 ___ 做饭。",
            "opts": [
              "不会",
              "有",
              "是"
            ],
            "a": 0
          },
          {
            "q": "今天 ___？",
            "opts": [
              "星期几",
              "几星期",
              "多少星期"
            ],
            "a": 0
          }
        ]
      },
      {
        "title": "Phần 2. Nối câu hỏi với câu trả lời",
        "note": "Chọn câu trả lời phù hợp cho mỗi câu hỏi. Có 1 câu trả lời thừa.",
        "box": [
          "不会，我会做面条。",
          "有，我有一个哥哥。",
          "十一月二十三号。",
          "我休息。",
          "星期二。"
        ],
        "items": [
          {
            "q": "今天几月几号？",
            "opts": [
              "A",
              "B",
              "C",
              "D",
              "E"
            ],
            "a": 2
          },
          {
            "q": "明天星期几？",
            "opts": [
              "A",
              "B",
              "C",
              "D",
              "E"
            ],
            "a": 4
          },
          {
            "q": "你会包饺子吗？",
            "opts": [
              "A",
              "B",
              "C",
              "D",
              "E"
            ],
            "a": 0
          },
          {
            "q": "你有兄弟姐妹吗？",
            "opts": [
              "A",
              "B",
              "C",
              "D",
              "E"
            ],
            "a": 1
          }
        ]
      },
      {
        "title": "Phần 3. Điền từ vào hội thoại",
        "note": "Từ cho sẵn, mỗi từ dùng đúng 1 lần: 号 / 星期几 / 休息 / 一些 / 会",
        "passage": "A：今天几月几（11）___？\nB：今天十一月二十号。\nA：今天（12）___？\nB：星期五。明天星期六，我不工作。\nA：明天你做什么？\nB：我（13）___。我想做（14）___越南菜。你（15）___做越南菜吗？",
        "items": [
          {
            "q": "（11）",
            "opts": [
              "号",
              "星期几",
              "休息",
              "一些",
              "会"
            ],
            "a": 0
          },
          {
            "q": "（12）",
            "opts": [
              "号",
              "星期几",
              "休息",
              "一些",
              "会"
            ],
            "a": 1
          },
          {
            "q": "（13）",
            "opts": [
              "号",
              "星期几",
              "休息",
              "一些",
              "会"
            ],
            "a": 2
          },
          {
            "q": "（14）",
            "opts": [
              "号",
              "星期几",
              "休息",
              "一些",
              "会"
            ],
            "a": 3
          },
          {
            "q": "（15）",
            "opts": [
              "号",
              "星期几",
              "休息",
              "一些",
              "会"
            ],
            "a": 4
          }
        ]
      },
      {
        "title": "Phần 4. Điền chữ Hán vào câu",
        "ph": "Gõ chữ Hán",
        "items": [
          {
            "vi": "Ngày mai là Chủ nhật, tôi nghỉ ngơi.",
            "q": "明天星期天，我 ___。",
            "a": [
              "休息"
            ]
          },
          {
            "vi": "Mẹ tôi biết nấu cơm, bố tôi không biết.",
            "q": "我妈妈会 ___，我爸爸不会。",
            "a": [
              "做饭"
            ]
          },
          {
            "vi": "Bạn có anh chị em không?",
            "q": "你有 ___ 吗？",
            "a": [
              "兄弟姐妹"
            ]
          },
          {
            "vi": "Tôi có một anh trai và một em trai.",
            "q": "我有一个 ___ 和一个 ___。",
            "fields": [
              {
                "label": "Chỗ trống 1",
                "a": [
                  "哥哥"
                ]
              },
              {
                "label": "Chỗ trống 2",
                "a": [
                  "弟弟"
                ]
              }
            ],
            "exp": "Đúng thứ tự: anh (哥哥) trước, em (弟弟) sau."
          },
          {
            "vi": "Tháng này tôi rất bận.",
            "q": "___ 我很忙。",
            "a": [
              "这个月"
            ]
          }
        ]
      },
      {
        "title": "Phần 5. Sắp xếp thành câu đúng",
        "items": [
          {
            "w": [
              "号",
              "几",
              "今天",
              "月",
              "几"
            ],
            "a": "今天几月几号？"
          },
          {
            "w": [
              "会",
              "饺子",
              "你",
              "包",
              "吗"
            ],
            "a": "你会包饺子吗？"
          },
          {
            "w": [
              "一些",
              "我",
              "中国菜",
              "会",
              "做"
            ],
            "a": "我会做一些中国菜。"
          }
        ]
      },
      {
        "title": "Phần 6. Sửa lỗi sai",
        "note": "Gõ lại cả câu đã sửa cho đúng.",
        "ph": "Gõ câu đúng tại đây",
        "items": [
          {
            "q": "今天是不星期一。",
            "a": [
              "今天不是星期一"
            ]
          },
          {
            "q": "今天星期三号。",
            "vi": "Hôm nay thứ Tư.",
            "a": [
              "今天星期三",
              "今天是星期三",
              "今天周三",
              "今天是周三"
            ]
          },
          {
            "q": "我会不做饭。",
            "a": [
              "我不会做饭"
            ]
          },
          {
            "q": "今天十一月二十三号，二零二六年。",
            "vi": "Hôm nay là ngày 23 tháng 11 năm 2026.",
            "a": [
              "今天二零二六年十一月二十三号",
              "今天是二零二六年十一月二十三号",
              "今天二零二六年十一月二十三日",
              "今天是二零二六年十一月二十三日"
            ],
            "exp": "Thứ tự trong tiếng Trung: năm → tháng → ngày."
          }
        ]
      },
      {
        "title": "Phần 7. Đọc hiểu",
        "note": "Đọc đoạn văn rồi trả lời bằng chữ Hán. Trả lời ngắn hay cả câu đều được.",
        "passage": "今天是十一月二十号，星期五。明天星期六，我不工作，我休息。我哥哥会做饭，他会做很多中国菜。我弟弟不会做饭，他会包饺子。明天我们家包饺子。我妈妈是越南人，她会做一些越南菜，她不会做中国菜。",
        "ph": "Gõ câu trả lời",
        "items": [
          {
            "q": "明天几号？",
            "pre": [
              ""
            ],
            "a": [
              "二十一号",
              "二十一日",
              "十一月二十一号",
              "十一月二十一日",
              "21",
              "21号",
              "21日"
            ]
          },
          {
            "q": "昨天星期几？",
            "pre": [
              ""
            ],
            "a": [
              "星期四",
              "周四",
              "4"
            ]
          },
          {
            "q": "谁不会做饭？",
            "pre": [
              ""
            ],
            "a": [
              "弟弟",
              "我弟弟",
              "他弟弟",
              "他的弟弟",
              "弟弟不会做饭",
              "我弟弟不会做饭"
            ]
          },
          {
            "q": "妈妈会做中国菜吗？",
            "pre": [
              ""
            ],
            "a": [
              "不会",
              "她不会",
              "她不会做中国菜",
              "不会，她会做越南菜",
              "不会，她不会做中国菜",
              "妈妈不会做中国菜"
            ]
          },
          {
            "q": "明天他们家做什么？",
            "pre": [
              ""
            ],
            "a": [
              "包饺子",
              "他们包饺子",
              "明天他们家包饺子",
              "他们家包饺子"
            ]
          }
        ]
      },
      {
        "title": "Phần 8. Đọc lịch rồi trả lời",
        "note": "Trả lời bằng chữ Hán.",
        "passage": "王老师这个星期：\n周一：工作\n周二：工作\n周三：休息\n周四：工作\n周五：工作\n周六：包饺子\n周日：休息",
        "ph": "Gõ câu trả lời",
        "items": [
          {
            "q": "王老师星期几休息？",
            "pre": [
              ""
            ],
            "a": [
              "re:(他|王老师)?(星期三|周三)和?(星期天|星期日|周日)(休息)?|(他|王老师)?(星期天|星期日|周日)和?(星期三|周三)(休息)?"
            ],
            "show": "星期三和星期天",
            "exp": "Chấp nhận cả hai thứ tự."
          },
          {
            "q": "王老师星期四工作吗？",
            "pre": [
              ""
            ],
            "a": [
              "工作",
              "他工作",
              "他星期四工作",
              "对，他星期四工作",
              "王老师星期四工作"
            ]
          },
          {
            "q": "王老师星期几包饺子？",
            "pre": [
              ""
            ],
            "a": [
              "星期六",
              "周六",
              "他星期六包饺子",
              "6",
              "王老师星期六包饺子"
            ]
          }
        ]
      },
      {
        "title": "Phần 9. Dịch sang tiếng Trung",
        "note": "Gõ chữ Hán. Không chấm gắt dấu câu.",
        "ph": "Gõ câu tiếng Trung",
        "items": [
          {
            "q": "Hôm qua là ngày 10 tháng 5, thứ Sáu.",
            "a": [
              "re:昨天是?五月十(号|日)(星期五|周五)"
            ],
            "show": "昨天五月十号，星期五。"
          },
          {
            "q": "Mẹ tôi biết nấu mì, mẹ không biết gói sủi cảo.",
            "a": [
              "re:(我的?)?妈妈会做面条儿?(她|我的?妈妈)?不会包饺子"
            ],
            "show": "我妈妈会做面条，她不会包饺子。"
          }
        ]
      }
    ]
  },
  {
    "id": "sheet-h1-1-py",
    "lesson": 1,
    "title": "Pinyin",
    "intro": "Bấm nút Nghe ở mỗi câu (nghe lại bao nhiêu lần cũng được) rồi chọn phiên âm đúng. Làm xong bấm Nộp bài để xem đáp án và giải thích.",
    "parts": [
      {
        "title": "Phần I — Thanh mẫu (câu 1–7)",
        "note": "Vận mẫu và thanh điệu của ba đáp án giống nhau, chỉ khác phụ âm đầu.",
        "items": [
          {
            "q": "",
            "opts": [
              "xīwàng",
              "shīwàng",
              "sīwàng"
            ],
            "a": 0,
            "audio": "audio/py/h1-1b-1.mp3",
            "pyopts": true,
            "exp": "希望 xīwàng — bẫy nặng: shīwàng là từ thật (失望)"
          },
          {
            "q": "",
            "opts": [
              "zhìjǐ",
              "cìjǐ",
              "zìjǐ"
            ],
            "a": 2,
            "audio": "audio/py/h1-1b-2.mp3",
            "pyopts": true,
            "exp": "自己 zìjǐ — z đầu lưỡi, không cuốn (zh) và không bật hơi (c)"
          },
          {
            "q": "",
            "opts": [
              "lǔnì",
              "nǔlì",
              "lǔlì"
            ],
            "a": 1,
            "audio": "audio/py/h1-1b-3.mp3",
            "pyopts": true,
            "exp": "努力 nǔlì — n đi trước, l đi sau — dễ bị đảo"
          },
          {
            "q": "",
            "opts": [
              "gěpà",
              "kěbà",
              "kěpà"
            ],
            "a": 2,
            "audio": "audio/py/h1-1b-4.mp3",
            "pyopts": true,
            "exp": "可怕 kěpà — cả hai âm đều bật hơi"
          },
          {
            "q": "",
            "opts": [
              "tìtú",
              "dìtú",
              "dìdú"
            ],
            "a": 1,
            "audio": "audio/py/h1-1b-5.mp3",
            "pyopts": true,
            "exp": "地图 dìtú — d không bật hơi, t bật hơi"
          },
          {
            "q": "",
            "opts": [
              "xìnghú",
              "xìngfú",
              "jìngfú"
            ],
            "a": 1,
            "audio": "audio/py/h1-1b-6.mp3",
            "pyopts": true,
            "exp": "幸福 xìngfú — f môi–răng, h sát vòm mềm"
          },
          {
            "q": "",
            "opts": [
              "lánhòu",
              "ránkòu",
              "ránhòu"
            ],
            "a": 2,
            "audio": "audio/py/h1-1b-7.mp3",
            "pyopts": true,
            "exp": "然后 ránhòu — r cuốn lưỡi, người Việt hay đọc thành l"
          }
        ]
      },
      {
        "title": "Phần II — Vận mẫu (câu 8–15)",
        "note": "Thanh mẫu và thanh điệu giống nhau, chỉ khác phần vận.",
        "items": [
          {
            "q": "",
            "opts": [
              "zhēngzhèng",
              "zhēnzhèn",
              "zhēnzhèng"
            ],
            "a": 2,
            "audio": "audio/py/h1-1b-8.mp3",
            "pyopts": true,
            "exp": "真正 zhēnzhèng — âm 1 đuôi -n, âm 2 đuôi -ng"
          },
          {
            "q": "",
            "opts": [
              "xīngqíng",
              "xīnqíng",
              "xīnqín"
            ],
            "a": 1,
            "audio": "audio/py/h1-1b-9.mp3",
            "pyopts": true,
            "exp": "心情 xīnqíng — in rồi ing — đúng thứ tự này"
          },
          {
            "q": "",
            "opts": [
              "bāngmáng",
              "bānmáng",
              "bāngmán"
            ],
            "a": 0,
            "audio": "audio/py/h1-1b-10.mp3",
            "pyopts": true,
            "exp": "帮忙 bāngmáng — cả hai âm đều đuôi -ng"
          },
          {
            "q": "",
            "opts": [
              "hòuléi",
              "hàolái",
              "hòulái"
            ],
            "a": 2,
            "audio": "audio/py/h1-1b-11.mp3",
            "pyopts": true,
            "exp": "后来 hòulái — hòu (không phải hào), lái (không phải léi)"
          },
          {
            "q": "",
            "opts": [
              "xūyào",
              "xūyòu",
              "xīyào"
            ],
            "a": 0,
            "audio": "audio/py/h1-1b-12.mp3",
            "pyopts": true,
            "exp": "需要 xūyào — xū là ü, môi tròn; yào đuôi -ao"
          },
          {
            "q": "",
            "opts": [
              "dōushǎo",
              "duōshǎo",
              "duōshǒu"
            ],
            "a": 1,
            "audio": "audio/py/h1-1b-13.mp3",
            "pyopts": true,
            "exp": "多少 duōshǎo — duō (uo) rất dễ nghe thành dōu (ou)"
          },
          {
            "q": "",
            "opts": [
              "juédìng",
              "jiédìng",
              "juédòng"
            ],
            "a": 0,
            "audio": "audio/py/h1-1b-14.mp3",
            "pyopts": true,
            "exp": "决定 juédìng — jué là üe, không phải ie"
          },
          {
            "q": "",
            "opts": [
              "huánjìn",
              "huángjìng",
              "huánjìng"
            ],
            "a": 2,
            "audio": "audio/py/h1-1b-15.mp3",
            "pyopts": true,
            "exp": "环境 huánjìng — uan rồi ing — hai đuôi khác nhau"
          }
        ]
      },
      {
        "title": "Phần III — Tổng hợp (câu 16–25)",
        "note": "Ba đáp án khác nhau ở cả thanh mẫu, vận mẫu và thanh điệu — phải nghe đủ ba tầng mới loại đúng.",
        "items": [
          {
            "q": "",
            "opts": [
              "lǎoshī",
              "láoshí",
              "lāosī"
            ],
            "a": 0,
            "audio": "audio/py/h1-1b-16.mp3",
            "pyopts": true,
            "exp": "老师 lǎoshī — thanh 3 + 1; bẫy láoshí là 2 + 2"
          },
          {
            "q": "",
            "opts": [
              "gòngzuō",
              "gōngzhuò",
              "gōngzuò"
            ],
            "a": 2,
            "audio": "audio/py/h1-1b-17.mp3",
            "pyopts": true,
            "exp": "工作 gōngzuò — 1 + 4; zuò không cuốn lưỡi"
          },
          {
            "q": "",
            "opts": [
              "liànxí",
              "niànxī",
              "liánxǐ"
            ],
            "a": 0,
            "audio": "audio/py/h1-1b-18.mp3",
            "pyopts": true,
            "exp": "练习 liànxí — 4 + 2; đầu l rõ ràng"
          },
          {
            "q": "",
            "opts": [
              "lǐyōu",
              "lǜyóu",
              "nǜyóu"
            ],
            "a": 1,
            "audio": "audio/py/h1-1b-19.mp3",
            "pyopts": true,
            "exp": "旅游 lǜyóu — l + ü thanh 3, rồi thanh 2"
          },
          {
            "q": "",
            "opts": [
              "tūrán",
              "dūrán",
              "tūlǎn"
            ],
            "a": 0,
            "audio": "audio/py/h1-1b-20.mp3",
            "pyopts": true,
            "exp": "突然 tūrán — 1 + 2; t bật hơi, r cuốn lưỡi"
          },
          {
            "q": "",
            "opts": [
              "lóngyī",
              "róngyí",
              "róngyì"
            ],
            "a": 2,
            "audio": "audio/py/h1-1b-21.mp3",
            "pyopts": true,
            "exp": "容易 róngyì — 2 + 4; bẫy lớn nhất là róngyí (2 + 2)"
          },
          {
            "q": "",
            "opts": [
              "liúnǎi",
              "niúnài",
              "niúnǎi"
            ],
            "a": 2,
            "audio": "audio/py/h1-1b-22.mp3",
            "pyopts": true,
            "exp": "牛奶 niúnǎi — 2 + 3; thanh 3 xuống rồi lên"
          },
          {
            "q": "",
            "opts": [
              "zhǔnbèi",
              "zūnbēi",
              "chǔnbèi"
            ],
            "a": 0,
            "audio": "audio/py/h1-1b-23.mp3",
            "pyopts": true,
            "exp": "准备 zhǔnbèi — zh cuốn lưỡi, đuôi -n, thanh 3 + 4"
          },
          {
            "q": "",
            "opts": [
              "xīngxiān",
              "xīnxiān",
              "xīnxián"
            ],
            "a": 1,
            "audio": "audio/py/h1-1b-24.mp3",
            "pyopts": true,
            "exp": "新鲜 xīnxiān — cả hai thanh 1; bẫy xián ở thanh 2"
          },
          {
            "q": "",
            "opts": [
              "shuǐjiào",
              "shuìjiào",
              "suìjiào"
            ],
            "a": 1,
            "audio": "audio/py/h1-1b-25.mp3",
            "pyopts": true,
            "exp": "睡觉 shuìjiào"
          }
        ]
      }
    ]
  }
];

window.HD_QUOTES = [
  ["祝你学习进步", "zhù nǐ xuéxí jìnbù", "Chúc bạn học tập tiến bộ"],
  ["好好学习，天天向上", "hǎohǎo xuéxí, tiāntiān xiàngshàng", "Chăm chỉ học tập, ngày ngày tiến bộ"],
  ["每天进步一点点", "měitiān jìnbù yìdiǎndiǎn", "Mỗi ngày tiến bộ thêm một chút"],
  ["学习加油！", "xuéxí jiāyóu", "Học tập cố lên!"],
  ["祝你考试顺利", "zhù nǐ kǎoshì shùnlì", "Chúc bạn thi cử thuận lợi"],
  ["祝你考试成功", "zhù nǐ kǎoshì chénggōng", "Chúc bạn thi thành công"],
  ["祝你今天学得开心", "zhù nǐ jīntiān xué de kāixīn", "Chúc bạn hôm nay học thật vui"],
  ["愿你每天都有收获", "yuàn nǐ měitiān dōu yǒu shōuhuò", "Mong mỗi ngày bạn đều có thu hoạch"],
  ["坚持就是胜利", "jiānchí jiù shì shènglì", "Kiên trì chính là chiến thắng"],
  ["熟能生巧", "shú néng shēng qiǎo", "Luyện nhiều sẽ thành thạo"],
  ["学无止境", "xué wú zhǐjìng", "Học tập không có điểm dừng"],
  ["活到老，学到老", "huó dào lǎo, xué dào lǎo", "Sống đến già, học đến già"],
  ["有志者事竟成", "yǒu zhì zhě shì jìng chéng", "Có chí thì nên"],
  ["千里之行，始于足下", "qiān lǐ zhī xíng, shǐ yú zúxià", "Đi ngàn dặm bắt đầu từ một bước chân"],
  ["学而时习之，不亦说乎", "xué ér shí xí zhī, bú yì yuè hū", "Học rồi thường xuyên ôn tập, chẳng phải vui sao"],
  ["三人行，必有我师", "sān rén xíng, bì yǒu wǒ shī", "Ba người cùng đi, ắt có người làm thầy ta"],
  ["书山有路勤为径", "shū shān yǒu lù qín wéi jìng", "Núi sách có đường, chăm chỉ là lối đi"],
  ["学海无涯苦作舟", "xué hǎi wú yá kǔ zuò zhōu", "Biển học vô bờ, lấy sự khổ luyện làm thuyền"],
  ["一分耕耘，一分收获", "yì fēn gēngyún, yì fēn shōuhuò", "Một phần cố gắng, một phần thu hoạch"],
  ["只要努力，就会进步", "zhǐyào nǔlì, jiù huì jìnbù", "Chỉ cần cố gắng thì sẽ tiến bộ"],
  ["今天也要好好学习", "jīntiān yě yào hǎohǎo xuéxí", "Hôm nay cũng phải học thật chăm nhé"],
  ["祝你汉语越来越好", "zhù nǐ Hànyǔ yuè lái yuè hǎo", "Chúc tiếng Trung của bạn ngày càng tốt"],
  ["祝你学习愉快", "zhù nǐ xuéxí yúkuài", "Chúc bạn học tập vui vẻ"],
  ["你一定可以的", "nǐ yídìng kěyǐ de", "Bạn nhất định làm được"],
  ["慢慢来，别着急", "mànmàn lái, bié zháojí", "Cứ từ từ, đừng vội"],
  ["不怕慢，只怕站", "bú pà màn, zhǐ pà zhàn", "Không sợ chậm, chỉ sợ đứng yên"],
  ["多听，多说，多练习", "duō tīng, duō shuō, duō liànxí", "Nghe nhiều, nói nhiều, luyện nhiều"],
  ["多写几遍，记得更牢", "duō xiě jǐ biàn, jì de gèng láo", "Viết thêm vài lần, sẽ nhớ chắc hơn"],
  ["错了没关系，再来一次", "cuò le méi guānxi, zài lái yí cì", "Sai cũng không sao, làm lại lần nữa"],
  ["你今天又进步了", "nǐ jīntiān yòu jìnbù le", "Hôm nay bạn lại tiến bộ rồi"],
  ["祝你天天有进步", "zhù nǐ tiāntiān yǒu jìnbù", "Chúc bạn ngày nào cũng có tiến bộ"],
  ["学好汉语，从今天开始", "xuéhǎo Hànyǔ, cóng jīntiān kāishǐ", "Học giỏi tiếng Trung, bắt đầu từ hôm nay"],
  ["勤能补拙", "qín néng bǔ zhuō", "Cần cù bù thông minh"],
  ["功夫不负有心人", "gōngfu bú fù yǒuxīnrén", "Có công mài sắt có ngày nên kim"],
  ["加油，你是最棒的", "jiāyóu, nǐ shì zuì bàng de", "Cố lên, bạn là giỏi nhất"],
  ["今天的努力，明天的实力", "jīntiān de nǔlì, míngtiān de shílì", "Nỗ lực hôm nay là thực lực ngày mai"],
  ["祝你记得牢，学得快", "zhù nǐ jì de láo, xué de kuài", "Chúc bạn nhớ lâu, học nhanh"],
  ["学习让你更有力量", "xuéxí ràng nǐ gèng yǒu lìliàng", "Học tập giúp bạn thêm sức mạnh"],
  ["读书破万卷，下笔如有神", "dú shū pò wàn juàn, xià bǐ rú yǒu shén", "Đọc vỡ vạn cuốn sách, hạ bút như có thần"],
  ["祝你每次测验都得高分", "zhù nǐ měi cì cèyàn dōu dé gāofēn", "Chúc bạn bài kiểm tra nào cũng đạt điểm cao"],
  ["祝你听得懂，说得好", "zhù nǐ tīng de dǒng, shuō de hǎo", "Chúc bạn nghe hiểu, nói tốt"],
  ["认真学习，快乐成长", "rènzhēn xuéxí, kuàilè chéngzhǎng", "Học nghiêm túc, trưởng thành vui vẻ"],
  ["越学越有趣", "yuè xué yuè yǒuqù", "Càng học càng thấy thú vị"],
  ["坚持每天练习", "jiānchí měitiān liànxí", "Kiên trì luyện tập mỗi ngày"],
  ["祝你学有所成", "zhù nǐ xué yǒu suǒ chéng", "Chúc bạn học có kết quả"],
  ["愿你的努力都有回报", "yuàn nǐ de nǔlì dōu yǒu huíbào", "Mong mọi nỗ lực của bạn đều có đền đáp"],
  ["开始就是成功的一半", "kāishǐ jiù shì chénggōng de yíbàn", "Bắt đầu là đã thành công một nửa"],
  ["别放弃，继续加油", "bié fàngqì, jìxù jiāyóu", "Đừng bỏ cuộc, tiếp tục cố lên"],
  ["祝你学习顺利，天天开心", "zhù nǐ xuéxí shùnlì, tiāntiān kāixīn", "Chúc bạn học tập thuận lợi, ngày nào cũng vui"],
  ["天道酬勤", "tiān dào chóu qín", "Trời không phụ người chăm chỉ"]
];

/* ============================================================
   VÍ DỤ & NGỮ PHÁP cho mục Tra từ. Khóa là chữ Hán của từ; mỗi từ có thể có nhiều ví dụ.
   ex: [[câu Hán, pinyin, nghĩa], ...]   gram: ghi chú ngữ pháp (không bắt buộc)
   ============================================================ */
window.HD_EXTRA = {
 "你好": {
  "ex": [
   [
    "你好！",
    "Nǐ hǎo!",
    "Xin chào!"
   ],
   [
    "老师，你好！",
    "Lǎoshī, nǐ hǎo!",
    "Chào thầy/cô ạ!"
   ]
  ],
  "gram": "Chào hỏi thông thường: 你 + 好. Với thầy cô, người lớn tuổi nên dùng 您好."
 },
 "大家": {
  "ex": [
   [
    "大家好！",
    "Dàjiā hǎo!",
    "Chào mọi người!"
   ]
  ],
  "gram": "大家 + 好 dùng để chào cả nhóm người."
 },
 "好": {
  "ex": [
   [
    "我很好。",
    "Wǒ hěn hǎo.",
    "Tôi khỏe."
   ],
   [
    "你好！",
    "Nǐ hǎo!",
    "Xin chào!"
   ]
  ],
  "gram": "Tính từ làm vị ngữ thường có 很 đứng trước: 我很好 (không nói 我好 khi chỉ miêu tả)."
 },
 "学生": {
  "ex": [
   [
    "我是学生。",
    "Wǒ shì xuésheng.",
    "Tôi là học sinh."
   ]
  ],
  "gram": "Cấu trúc 是: A 是 B (A là B)."
 },
 "们": {
  "ex": [
   [
    "学生们好！",
    "Xuéshengmen hǎo!",
    "Chào các em học sinh!"
   ]
  ],
  "gram": "们 đặt sau đại từ hoặc danh từ chỉ người để chỉ số nhiều: 我们, 你们, 他们, 同学们."
 },
 "老师": {
  "ex": [
   [
    "老师好！",
    "Lǎoshī hǎo!",
    "Em chào thầy/cô ạ!"
   ],
   [
    "我是老师。",
    "Wǒ shì lǎoshī.",
    "Tôi là giáo viên."
   ]
  ],
  "gram": "Gọi thầy cô: Họ + 老师, ví dụ 王老师."
 },
 "您": {
  "ex": [
   [
    "老师，您好！",
    "Lǎoshī, nín hǎo!",
    "Chào thầy/cô ạ!"
   ]
  ],
  "gram": "您 là dạng lịch sự của 你, dùng với thầy cô và người lớn tuổi."
 },
 "你们": {
  "ex": [
   [
    "你们好！",
    "Nǐmen hǎo!",
    "Chào các bạn!"
   ]
  ],
  "gram": "你们 = 你 + 们, số nhiều của 你."
 },
 "谢谢": {
  "ex": [
   [
    "谢谢你！",
    "Xièxie nǐ!",
    "Cảm ơn bạn!"
   ],
   [
    "谢谢老师！",
    "Xièxie lǎoshī!",
    "Em cảm ơn thầy/cô!"
   ]
  ],
  "gram": "Đáp lại bằng 不客气."
 },
 "不客气": {
  "ex": [
   [
    "A：谢谢！ B：不客气。",
    "A: Xièxie! B: Bú kèqi.",
    "A: Cảm ơn! B: Đừng khách sáo."
   ]
  ],
  "gram": "不 đứng trước thanh 4 đọc thành bú: 不客气 (bú kèqi)."
 },
 "同学": {
  "ex": [
   [
    "同学们好！",
    "Tóngxuémen hǎo!",
    "Chào các bạn!"
   ],
   [
    "他是我的同学。",
    "Tā shì wǒ de tóngxué.",
    "Anh ấy là bạn học của tôi."
   ]
  ]
 },
 "再见": {
  "ex": [
   [
    "老师再见！",
    "Lǎoshī zàijiàn!",
    "Em chào thầy/cô, tạm biệt ạ!"
   ]
  ]
 },
 "王老师": {
  "ex": [
   [
    "王老师，您好！",
    "Wáng lǎoshī, nín hǎo!",
    "Chào thầy/cô Vương ạ!"
   ],
   [
    "王老师，再见！",
    "Wáng lǎoshī, zàijiàn!",
    "Thầy/cô Vương, tạm biệt ạ!"
   ]
  ],
  "gram": "Gọi thầy cô giáo: Họ + 老师."
 },
 "请问": {
  "ex": [
   [
    "请问，你叫什么名字？",
    "Qǐngwèn, nǐ jiào shénme míngzi?",
    "Xin hỏi, bạn tên là gì?"
   ]
  ],
  "gram": "请问 đặt đầu câu để hỏi một cách lịch sự."
 },
 "请": {
  "ex": [
   [
    "请问，您是王老师吗？",
    "Qǐngwèn, nín shì Wáng lǎoshī ma?",
    "Xin hỏi, cô/thầy là cô/thầy Vương phải không ạ?"
   ]
  ],
  "gram": "请 + động từ = mời/xin hãy …; 请问 = xin hỏi."
 },
 "问": {
  "ex": [
   [
    "我问老师。",
    "Wǒ wèn lǎoshī.",
    "Tôi hỏi thầy/cô."
   ]
  ]
 },
 "你": {
  "ex": [
   [
    "你是学生。",
    "Nǐ shì xuésheng.",
    "Bạn là học sinh."
   ]
  ]
 },
 "叫": {
  "ex": [
   [
    "我叫王明。",
    "Wǒ jiào Wáng Míng.",
    "Tôi tên là Vương Minh."
   ]
  ],
  "gram": "叫 + tên: giới thiệu tên. Hỏi tên: 你叫什么名字？"
 },
 "什么": {
  "ex": [
   [
    "你叫什么名字？",
    "Nǐ jiào shénme míngzi?",
    "Bạn tên là gì?"
   ]
  ],
  "gram": "Từ để hỏi (什么, 谁, 哪) đứng đúng vị trí của thông tin cần hỏi, không đảo lên đầu câu."
 },
 "名字": {
  "ex": [
   [
    "我的名字是Lan。",
    "Wǒ de míngzi shì Lan.",
    "Tên tôi là Lan."
   ]
  ]
 },
 "我": {
  "ex": [
   [
    "我是老师。",
    "Wǒ shì lǎoshī.",
    "Tôi là giáo viên."
   ]
  ]
 },
 "不": {
  "ex": [
   [
    "我不是老师。",
    "Wǒ bú shì lǎoshī.",
    "Tôi không phải là giáo viên."
   ]
  ],
  "gram": "不 đặt trước động từ/tính từ để phủ định. Trước thanh 4 đọc thành bú: 不是 (bú shì)."
 },
 "是": {
  "ex": [
   [
    "我是学生。",
    "Wǒ shì xuésheng.",
    "Tôi là học sinh."
   ],
   [
    "我不是老师。",
    "Wǒ bú shì lǎoshī.",
    "Tôi không phải là giáo viên."
   ]
  ],
  "gram": "Câu chữ 是: A 是 B (A là B). Phủ định: A 不是 B."
 },
 "对不起": {
  "ex": [
   [
    "对不起，老师！",
    "Duìbuqǐ, lǎoshī!",
    "Xin lỗi thầy/cô ạ!"
   ]
  ],
  "gram": "Đáp lại lời xin lỗi bằng 没关系 hoặc 没事."
 },
 "没关系": {
  "ex": [
   [
    "A：对不起！ B：没关系。",
    "A: Duìbuqǐ! B: Méi guānxi.",
    "A: Xin lỗi! B: Không sao đâu."
   ]
  ]
 },
 "没事": {
  "ex": [
   [
    "A：对不起！ B：没事。",
    "A: Duìbuqǐ! B: Méishì.",
    "A: Xin lỗi! B: Không có gì."
   ]
  ]
 },
 "很": {
  "ex": [
   [
    "我很好。",
    "Wǒ hěn hǎo.",
    "Tôi rất khỏe."
   ],
   [
    "我很高兴。",
    "Wǒ hěn gāoxìng.",
    "Tôi rất vui."
   ]
  ],
  "gram": "很 đứng trước tính từ làm vị ngữ. Câu khẳng định miêu tả thường có 很, nghĩa 'rất' ở đây khá nhẹ."
 },
 "高兴": {
  "ex": [
   [
    "认识你，我很高兴。",
    "Rènshi nǐ, wǒ hěn gāoxìng.",
    "Quen bạn, tôi rất vui."
   ]
  ]
 },
 "认识": {
  "ex": [
   [
    "认识你很高兴。",
    "Rènshi nǐ hěn gāoxìng.",
    "Rất vui được quen bạn."
   ]
  ],
  "gram": "认识 + người = quen biết ai. Câu 认识你很高兴: cụm 认识你 làm chủ ngữ."
 },
 "也": {
  "ex": [
   [
    "我也是学生。",
    "Wǒ yě shì xuésheng.",
    "Tôi cũng là học sinh."
   ]
  ],
  "gram": "也 đứng sau chủ ngữ, trước động từ hoặc tính từ. Khi có phủ định: 我也不是老师."
 },
 "人": {
  "ex": [
   [
    "他是中国人。",
    "Tā shì Zhōngguó rén.",
    "Anh ấy là người Trung Quốc."
   ]
  ],
  "gram": "Tên nước + 人 = người nước đó: 中国人, 越南人, 法国人."
 },
 "的": {
  "ex": [
   [
    "这是我的老师。",
    "Zhè shì wǒ de lǎoshī.",
    "Đây là thầy/cô của tôi."
   ],
   [
    "你的中文很好。",
    "Nǐ de Zhōngwén hěn hǎo.",
    "Tiếng Trung của bạn rất tốt."
   ]
  ],
  "gram": "A 的 B = B của A. Với người thân có thể lược 的: 我姐姐, 我妈妈."
 },
 "中国": {
  "ex": [
   [
    "她是中国人。",
    "Tā shì Zhōngguó rén.",
    "Cô ấy là người Trung Quốc."
   ]
  ]
 },
 "法国": {
  "ex": [
   [
    "他是法国人。",
    "Tā shì Fǎguó rén.",
    "Anh ấy là người Pháp."
   ]
  ]
 },
 "越南": {
  "ex": [
   [
    "我是越南人。",
    "Wǒ shì Yuènán rén.",
    "Tôi là người Việt Nam."
   ]
  ]
 },
 "英国": {
  "ex": [
   [
    "她是英国人。",
    "Tā shì Yīngguó rén.",
    "Cô ấy là người Anh."
   ]
  ]
 },
 "中文": {
  "ex": [
   [
    "你的中文很好。",
    "Nǐ de Zhōngwén hěn hǎo.",
    "Tiếng Trung của bạn rất tốt."
   ]
  ],
  "gram": "中文 chỉ tiếng Trung nói chung."
 },
 "越南语": {
  "ex": [
   [
    "你的越南语很好。",
    "Nǐ de Yuènányǔ hěn hǎo.",
    "Tiếng Việt của bạn rất tốt."
   ]
  ],
  "gram": "Tên nước + 语 = ngôn ngữ của nước đó."
 },
 "这": {
  "ex": [
   [
    "这是我的老师。",
    "Zhè shì wǒ de lǎoshī.",
    "Đây là thầy/cô của tôi."
   ]
  ],
  "gram": "这 + 是 + danh từ = đây là …"
 },
 "谁": {
  "ex": [
   [
    "她是谁？",
    "Tā shì shéi?",
    "Cô ấy là ai?"
   ]
  ],
  "gram": "谁 đứng đúng vị trí của người cần hỏi. Đọc shéi hoặc shuí."
 },
 "女朋友": {
  "ex": [
   [
    "她是我的女朋友。",
    "Tā shì wǒ de nǚpéngyou.",
    "Cô ấy là bạn gái tôi."
   ]
  ]
 },
 "哪": {
  "ex": [
   [
    "你是哪国人？",
    "Nǐ shì nǎ guó rén?",
    "Bạn là người nước nào?"
   ]
  ],
  "gram": "哪 + (lượng từ) + danh từ: hỏi 'nào'. 哪国人 = người nước nào."
 },
 "国": {
  "ex": [
   [
    "我是越南人，你是哪国人？",
    "Wǒ shì Yuènán rén, nǐ shì nǎ guó rén?",
    "Tôi là người Việt Nam, còn bạn là người nước nào?"
   ]
  ]
 },
 "她": {
  "ex": [
   [
    "她是我的老师。",
    "Tā shì wǒ de lǎoshī.",
    "Cô ấy là giáo viên của tôi."
   ]
  ],
  "gram": "她 chỉ nữ, 他 chỉ nam. Cả hai đều đọc tā."
 },
 "泰国": {
  "ex": [
   [
    "她是泰国人。",
    "Tā shì Tàiguó rén.",
    "Cô ấy là người Thái Lan."
   ]
  ]
 },
 "他": {
  "ex": [
   [
    "他是我的同学。",
    "Tā shì wǒ de tóngxué.",
    "Anh ấy là bạn học của tôi."
   ]
  ],
  "gram": "他 chỉ nam, 她 chỉ nữ. Cả hai đều đọc tā."
 },
 "喂": {
  "ex": [
   [
    "喂，你好！",
    "Wèi, nǐ hǎo!",
    "A lô, xin chào!"
   ]
  ],
  "gram": "喂 dùng khi nghe hoặc gọi điện thoại, hoặc để gọi ai đó."
 },
 "姐姐": {
  "ex": [
   [
    "她是我姐姐。",
    "Tā shì wǒ jiějie.",
    "Cô ấy là chị gái tôi."
   ]
  ],
  "gram": "Với người thân thường lược 的: 我姐姐."
 },
 "妹妹": {
  "ex": [
   [
    "她是我妹妹。",
    "Tā shì wǒ mèimei.",
    "Cô ấy là em gái tôi."
   ]
  ]
 },
 "哥哥": {
  "ex": [
   [
    "他是我哥哥。",
    "Tā shì wǒ gēge.",
    "Anh ấy là anh trai tôi."
   ]
  ]
 },
 "弟弟": {
  "ex": [
   [
    "他是我弟弟。",
    "Tā shì wǒ dìdi.",
    "Cậu ấy là em trai tôi."
   ]
  ]
 },
 "兄弟姐妹": {
  "ex": [
   [
    "你有兄弟姐妹吗？",
    "Nǐ yǒu xiōngdì jiěmèi ma?",
    "Bạn có anh chị em không?"
   ]
  ],
  "gram": "Gồm 兄 (anh), 弟 (em trai), 姐 (chị), 妹 (em gái): chỉ chung anh chị em ruột."
 },
 "工作": {
  "ex": [
   [
    "你工作忙吗？",
    "Nǐ gōngzuò máng ma?",
    "Công việc của bạn có bận không?"
   ]
  ],
  "gram": "工作 vừa là danh từ (công việc) vừa là động từ (làm việc)."
 },
 "还": {
  "ex": [
   [
    "你还忙吗？",
    "Nǐ hái máng ma?",
    "Bạn vẫn còn bận à?"
   ],
   [
    "他还是学生。",
    "Tā hái shì xuésheng.",
    "Anh ấy vẫn là học sinh."
   ]
  ],
  "gram": "还 (hái) = vẫn, còn; đứng trước động từ hoặc tính từ."
 },
 "忙": {
  "ex": [
   [
    "我很忙。",
    "Wǒ hěn máng.",
    "Tôi rất bận."
   ]
  ]
 },
 "吗": {
  "ex": [
   [
    "你忙吗？",
    "Nǐ máng ma?",
    "Bạn có bận không?"
   ],
   [
    "你是学生吗？",
    "Nǐ shì xuésheng ma?",
    "Bạn là học sinh à?"
   ]
  ],
  "gram": "吗 đặt cuối câu trần thuật để tạo câu hỏi có/không."
 },
 "对": {
  "ex": [
   [
    "对，我是老师。",
    "Duì, wǒ shì lǎoshī.",
    "Đúng, tôi là giáo viên."
   ]
  ],
  "gram": "对 = đúng; phủ định là 不对."
 },
 "太": {
  "ex": [
   [
    "太好了！",
    "Tài hǎo le!",
    "Tốt quá!"
   ]
  ],
  "gram": "太 + tính từ + 了 = quá …, thường dùng để cảm thán."
 },
 "不太": {
  "ex": [
   [
    "我不太忙。",
    "Wǒ bú tài máng.",
    "Tôi không bận lắm."
   ]
  ],
  "gram": "不太 + tính từ = không … lắm (phủ định nhẹ). 不 trước thanh 4 đọc bú."
 },
 "我们": {
  "ex": [
   [
    "我们是同学。",
    "Wǒmen shì tóngxué.",
    "Chúng tôi là bạn học."
   ]
  ]
 },
 "他们": {
  "ex": [
   [
    "他们是学生。",
    "Tāmen shì xuésheng.",
    "Họ là học sinh."
   ]
  ]
 },
 "想": {
  "ex": [
   [
    "我想认识你。",
    "Wǒ xiǎng rènshi nǐ.",
    "Tôi muốn làm quen với bạn."
   ],
   [
    "我想你。",
    "Wǒ xiǎng nǐ.",
    "Tôi nhớ bạn."
   ]
  ],
  "gram": "想 + động từ = muốn làm gì; 想 + người = nhớ ai."
 },
 "有": {
  "ex": [
   [
    "我有哥哥。",
    "Wǒ yǒu gēge.",
    "Tôi có anh trai."
   ]
  ],
  "gram": "Phủ định của 有 là 没有, không dùng 不有."
 },
 "没有": {
  "ex": [
   [
    "我没有弟弟。",
    "Wǒ méiyǒu dìdi.",
    "Tôi không có em trai."
   ]
  ],
  "gram": "没有 là phủ định của 有. Cũng có thể nói tắt là 没."
 },
 "多少": {
  "ex": [
   [
    "你家有多少口人？",
    "Nǐ jiā yǒu duōshao kǒu rén?",
    "Nhà bạn có bao nhiêu người?"
   ]
  ],
  "gram": "多少 hỏi số lượng không giới hạn; 几 hỏi số lượng nhỏ (thường dưới 10)."
 },
 "个": {
  "ex": [
   [
    "这个人是谁？",
    "Zhège rén shì shéi?",
    "Người này là ai?"
   ]
  ],
  "gram": "个 là lượng từ phổ biến nhất: số từ + 个 + danh từ."
 },
 "呢": {
  "ex": [
   [
    "我很好，你呢？",
    "Wǒ hěn hǎo, nǐ ne?",
    "Tôi khỏe, còn bạn?"
   ]
  ],
  "gram": "Danh từ/đại từ + 呢？ = còn … thì sao? Dùng để hỏi lại theo câu trước."
 },
 "家": {
  "ex": [
   [
    "你家有几口人？",
    "Nǐ jiā yǒu jǐ kǒu rén?",
    "Nhà bạn có mấy người?"
   ]
  ],
  "gram": "家 = nhà, gia đình: 我家 (nhà tôi)."
 },
 "房子": {
  "ex": [
   [
    "我家的房子很大。",
    "Wǒ jiā de fángzi hěn dà.",
    "Nhà của tôi rất rộng."
   ]
  ]
 },
 "几": {
  "ex": [
   [
    "你家有几口人？",
    "Nǐ jiā yǒu jǐ kǒu rén?",
    "Nhà bạn có mấy người?"
   ]
  ],
  "gram": "几 + lượng từ + danh từ: hỏi số lượng nhỏ (thường dưới 10)."
 },
 "口": {
  "ex": [
   [
    "我家有四口人。",
    "Wǒ jiā yǒu sì kǒu rén.",
    "Nhà tôi có bốn người."
   ]
  ],
  "gram": "口 là lượng từ dùng đếm số người trong gia đình."
 },
 "爸爸": {
  "ex": [
   [
    "我爸爸是老师。",
    "Wǒ bàba shì lǎoshī.",
    "Bố tôi là giáo viên."
   ]
  ]
 },
 "妈妈": {
  "ex": [
   [
    "我妈妈很忙。",
    "Wǒ māma hěn máng.",
    "Mẹ tôi rất bận."
   ]
  ]
 },
 "和": {
  "ex": [
   [
    "我和你是同学。",
    "Wǒ hé nǐ shì tóngxué.",
    "Tôi và bạn là bạn học."
   ]
  ],
  "gram": "和 thường dùng để nối danh từ/đại từ: A 和 B."
 },
 "儿子": {
  "ex": [
   [
    "他是我儿子。",
    "Tā shì wǒ érzi.",
    "Cậu ấy là con trai tôi."
   ]
  ]
 },
 "孩子": {
  "ex": [
   [
    "你有孩子吗？",
    "Nǐ yǒu háizi ma?",
    "Bạn có con chưa?"
   ]
  ]
 },
 "女儿": {
  "ex": [
   [
    "她是我女儿。",
    "Tā shì wǒ nǚ'ér.",
    "Cô bé là con gái tôi."
   ]
  ]
 },
 "岁": {
  "ex": [
   [
    "你儿子几岁？",
    "Nǐ érzi jǐ suì?",
    "Con trai bạn mấy tuổi?"
   ]
  ],
  "gram": "Hỏi tuổi trẻ nhỏ: 几岁？ Câu trả lời: số + 岁."
 },
 "今年": {
  "ex": [
   [
    "今年你多大？",
    "Jīnnián nǐ duō dà?",
    "Năm nay bạn bao nhiêu tuổi?"
   ]
  ],
  "gram": "Từ chỉ thời gian đứng đầu câu hoặc sau chủ ngữ, trước động từ."
 },
 "去年": {
  "ex": [
   [
    "去年我很忙。",
    "Qùnián wǒ hěn máng.",
    "Năm ngoái tôi rất bận."
   ]
  ],
  "gram": "Từ chỉ thời gian đứng đầu câu hoặc sau chủ ngữ, trước động từ."
 },
 "明年": {
  "ex": [
   [
    "明年我想去中国。",
    "Míngnián wǒ xiǎng qù Zhōngguó.",
    "Sang năm tôi muốn đi Trung Quốc."
   ]
  ],
  "gram": "Từ chỉ thời gian đứng đầu câu hoặc sau chủ ngữ, trước động từ."
 },
 "多大": {
  "ex": [
   [
    "你今年多大？",
    "Nǐ jīnnián duō dà?",
    "Năm nay bạn bao nhiêu tuổi?"
   ]
  ],
  "gram": "Hỏi tuổi bạn bè, người trạc tuổi: 你多大？ Hỏi trẻ nhỏ dùng 你几岁？"
 },
 "多": {
  "ex": [
   [
    "学生很多。",
    "Xuésheng hěn duō.",
    "Học sinh rất nhiều."
   ],
   [
    "你多大？",
    "Nǐ duō dà?",
    "Bạn bao nhiêu tuổi?"
   ]
  ],
  "gram": "多 + tính từ (大, 高…) dùng để hỏi mức độ: 多大 = lớn bao nhiêu."
 },
 "大": {
  "ex": [
   [
    "这个房子很大。",
    "Zhège fángzi hěn dà.",
    "Căn nhà này rất lớn."
   ]
  ]
 }
};

/* Âm thanh câu luyện nghe (ghi âm) */
window.HD_SENT_AUDIO = {
"你好": "audio/s1.mp3",
"老师你好": "audio/s2.mp3",
"大家好": "audio/s3.mp3",
"学生们好": "audio/s4.mp3",
"老师好": "audio/s5.mp3",
"老师您好": "audio/s6.mp3",
"你们好": "audio/s7.mp3",
"谢谢你": "audio/s8.mp3",
"谢谢老师": "audio/s9.mp3",
"同学们好": "audio/s10.mp3",
"老师再见": "audio/s11.mp3",
"王老师您好": "audio/s12.mp3",
"王老师再见": "audio/s13.mp3",
"请问你叫什么名字": "audio/s14.mp3",
"我问老师": "audio/s15.mp3",
"你是学生": "audio/s16.mp3",
"你叫什么名字": "audio/s17.mp3",
"我是老师": "audio/s18.mp3",
"我不是老师": "audio/s19.mp3",
"我是学生": "audio/s20.mp3",
"对不起老师": "audio/s21.mp3",
"我很好": "audio/s22.mp3",
"我很高兴": "audio/s23.mp3",
"认识你我很高兴": "audio/s24.mp3",
"认识你很高兴": "audio/s25.mp3",
"我也是学生": "audio/s26.mp3",
"他是中国人": "audio/s27.mp3",
"这是我的老师": "audio/s28.mp3",
"你的中文很好": "audio/s29.mp3",
"她是中国人": "audio/s30.mp3",
"他是法国人": "audio/s31.mp3",
"我是越南人": "audio/s32.mp3",
"她是英国人": "audio/s33.mp3",
"你的越南语很好": "audio/s34.mp3",
"她是谁": "audio/s35.mp3",
"她是我的女朋友": "audio/s36.mp3",
"你是哪国人": "audio/s37.mp3",
"我是越南人你是哪国人": "audio/s38.mp3",
"她是我的老师": "audio/s39.mp3",
"她是泰国人": "audio/s40.mp3",
"他是我的同学": "audio/s41.mp3",
"喂你好": "audio/s42.mp3",
"她是我姐姐": "audio/s43.mp3",
"她是我妹妹": "audio/s44.mp3",
"他是我哥哥": "audio/s45.mp3",
"他是我弟弟": "audio/s46.mp3",
"你工作忙吗": "audio/s47.mp3",
"你还忙吗": "audio/s48.mp3",
"他还是学生": "audio/s49.mp3",
"我很忙": "audio/s50.mp3",
"你忙吗": "audio/s51.mp3",
"你是学生吗": "audio/s52.mp3",
"对我是老师": "audio/s53.mp3",
"我不太忙": "audio/s54.mp3",
"我们是同学": "audio/s55.mp3",
"他们是学生": "audio/s56.mp3",
"我想认识你": "audio/s57.mp3",
"我想你": "audio/s58.mp3"
};

/* ---------- HSK 2 và HSK 3 ----------
   Thêm bài vào đây, cùng định dạng như HD_LESSONS: { id: "2-1", topic: "Chủ đề", words: [[chữ Hán, pinyin, nghĩa, file âm thanh], ...] }
   HSK 2 dùng id "2-1", "2-2"…, HSK 3 dùng id "3-1", "3-2"…  Đang để trống: web hiện "HSK 2 / HSK 3 sắp có". */
window.HD_LESSONS2 = [];
/* HSK 3: Giáo trình New HSK 3 (18 bài), phần "Từ mới". Phần tử thứ 5 = từ loại (dt., đgt., tt....) */
window.HD_LESSONS3 = [
  { id: "3-1", zh: "我们去机场接你们", topic: "Anh chị sẽ đến sân bay đón các em", words: [
    ["以为", "yǐwéi", "cho rằng, nghĩ rằng", "", "đgt."],
    ["像", "xiàng", "giống, giống như", "", "đgt."],
    ["长", "zhǎng", "phát triển, lớn lên", "", "đgt."],
    ["身高", "shēngāo", "chiều cao", "", "dt."],
    ["米", "mǐ", "mét (đơn vị đo lường)", "", "lượng."],
    ["瘦", "shòu", "gầy, ốm", "", "tt."],
    ["接", "jiē", "đón", "", "đgt."],
    ["行李", "xíngli", "hành lý", "", "dt."],
    ["丢", "diū", "làm mất, bị mất", "", "đgt."],
    ["箱子", "xiāngzi", "va li", "", "dt."],
    ["号码", "hàomǎ", "số, mã số", "", "dt."],
    ["好像", "hǎoxiàng", "dường như, có vẻ như", "", "phó."],
    ["重要", "zhòngyào", "quan trọng", "", "tt."],
    ["着急", "zháojí", "lo lắng, sốt ruột", "", "tt."],
    ["护照", "hùzhào", "hộ chiếu", "", "dt."],
    ["服务台", "fúwùtái", "quầy phục vụ", "", "dt."],
    ["应该", "yīnggāi", "nên", "", "đtnn."],
    ["站", "zhàn", "đứng", "", "đgt."],
    ["中间", "zhōngjiān", "ở giữa, trung gian", "", "dt."],
    ["短", "duǎn", "ngắn", "", "tt."],
    ["头发", "tóufa", "tóc", "", "dt."],
    ["年轻", "niánqīng", "trẻ, trẻ tuổi", "", "tt."],
    ["发现", "fāxiàn", "phát hiện, tìm thấy", "", "đgt."],
    ["不见", "bújiàn", "bị mất, không thấy", "", "đgt."],
    ["带", "dài", "mang, dẫn, đưa", "", "đgt."],
    ["帮助", "bāngzhù", "giúp, giúp đỡ", "", "đgt."],
    ["照片", "zhàopiàn", "ảnh (chụp)", "", "dt."]
  ] },
  { id: "3-2", zh: "你们想吃什么就点什么", topic: "Các em muốn ăn món gì thì gọi món đó", words: [
    ["菜单", "càidān", "thực đơn", "", "dt."],
    ["又", "yòu", "lại, vừa", "", "phó."],
    ["饿", "è", "đói", "", "tt."],
    ["渴", "kě", "khát", "", "tt."],
    ["客气", "kèqi", "khách sáo, khách khí", "", "đgt./tt."],
    ["饮料", "yǐnliào", "đồ uống", "", "dt."],
    ["好久", "hǎojiǔ", "lâu, rất lâu", "", "tt."],
    ["服务", "fúwù", "phục vụ", "", "đgt."],
    ["员", "yuán", "đặt sau danh từ hoặc động từ để chỉ người", "", "htố."],
    ["双", "shuāng", "đôi", "", "lượng."],
    ["筷子", "kuàizi", "đũa", "", "dt."],
    ["勺子", "sháozi", "thìa", "", "dt."],
    ["碗", "wǎn", "bát", "", "dt."],
    ["马上", "mǎshàng", "lập tức, ngay lập tức", "", "phó."],
    ["热情", "rèqíng", "nhiệt tình", "", "tt."],
    ["尝", "cháng", "nếm, thử", "", "đgt."],
    ["记", "jì", "nhớ, ghi nhớ", "", "đgt."],
    ["用", "yòng", "dùng, sử dụng", "", "đgt."],
    ["鸡", "jī", "gà", "", "dt."],
    ["张", "zhāng", "tờ, bức (dùng cho giấy, tranh...)", "", "lượng."],
    ["不用", "búyòng", "không cần", "", "phó."],
    ["选", "xuǎn", "chọn, lựa chọn", "", "đgt."],
    ["外卖", "wàimài", "đồ ăn giao tận nơi, đặt đồ ăn giao tận nơi", "", "dt./đgt."],
    ["方便", "fāngbiàn", "thuận tiện, tiện lợi", "", "tt."],
    ["蛋糕", "dàngāo", "bánh ngọt, bánh kem, bánh ga tô", "", "dt."],
    ["只", "zhǐ", "chỉ", "", "phó."],
    ["方便面", "fāngbiànmiàn", "mì ăn liền", "", "dt."],
    ["简单", "jiǎndān", "đơn giản", "", "tt."]
  ] },
  { id: "3-3", zh: "这个小区挺好的", topic: "Khu dân cư này khá tốt", words: [
    ["初中", "chūzhōng", "trung học cơ sở, cấp hai", "", "dt."],
    ["咱们", "zánmen", "chúng ta", "", "dt."],
    ["换", "huàn", "thay, thay đổi, đổi", "", "đgt."],
    ["房子", "fángzi", "nhà, căn nhà", "", "dt."],
    ["小区", "xiǎoqū", "khu dân cư, khu nhà ở", "", "dt."],
    ["环境", "huánjìng", "môi trường", "", "dt."],
    ["挺", "tǐng", "khá, rất", "", "phó."],
    ["空调", "kōngtiáo", "máy điều hoà", "", "dt."],
    ["洗衣机", "xǐyījī", "máy giặt", "", "dt."],
    ["层", "céng", "tầng", "", "lượng."],
    ["花园", "huāyuán", "vườn hoa", "", "dt."],
    ["灯", "dēng", "đèn", "", "dt."],
    ["关", "guān", "tắt, đóng", "", "đgt."],
    ["冰箱", "bīngxiāng", "tủ lạnh", "", "dt."],
    ["卫生间", "wèishēngjiān", "nhà vệ sinh", "", "dt."],
    ["打扫", "dǎsǎo", "dọn dẹp, quét dọn", "", "đgt."],
    ["搬家", "bānjiā", "chuyển nhà", "", "đgt."],
    ["办", "bàn", "làm, xử lý", "", "đgt."],
    ["信用卡", "xìnyòngkǎ", "thẻ tín dụng", "", "dt."],
    ["还", "huán", "trả, hoàn trả", "", "đgt."],
    ["听说", "tīngshuō", "nghe nói", "", "đgt."],
    ["银行", "yínháng", "ngân hàng", "", "dt."],
    ["才", "cái", "(mãi)... mới", "", "phó."],
    ["纸", "zhǐ", "giấy", "", "dt."],
    ["搬", "bān", "chuyển, mang, bê", "", "đgt."],
    ["需要", "xūyào", "cần, cần thiết, nhu cầu", "", "đgt./dt."]
  ] },
  { id: "3-4", zh: "这家宾馆跟别的都不一样", topic: "Khách sạn này không giống như những khách sạn khác", words: [
    ["假期", "jiàqī", "kỳ nghỉ", "", "dt."],
    ["海", "hǎi", "biển", "", "dt."],
    ["草原", "cǎoyuán", "thảo nguyên", "", "dt."],
    ["主意", "zhǔyi", "ý tưởng", "", "dt."],
    ["骑", "qí", "cưỡi", "", "đgt."],
    ["马", "mǎ", "ngựa", "", "dt."],
    ["羊", "yáng", "cừu, dê", "", "dt."],
    ["月亮", "yuèliang", "mặt trăng", "", "dt."],
    ["一定", "yídìng", "nhất định, chắc chắn", "", "phó."],
    ["刻", "kè", "khắc (15 phút)", "", "lượng."],
    ["起飞", "qǐfēi", "cất cánh", "", "đgt."],
    ["宾馆", "bīnguǎn", "khách sạn", "", "dt."],
    ["特别", "tèbié", "đặc biệt, rất, vô cùng", "", "tt./phó."],
    ["别的", "biéde", "khác", "", "đt."],
    ["一样", "yíyàng", "giống nhau", "", "tt."],
    ["牛", "niú", "bò", "", "dt."],
    ["相机", "xiàngjī", "máy ảnh", "", "dt."],
    ["欢迎", "huānyíng", "chào đón, hoan nghênh", "", "đgt."],
    ["司机", "sījī", "tài xế", "", "dt."],
    ["晚点", "wǎndiǎn", "muộn, muộn giờ, trễ giờ", "", "đgt."],
    ["久", "jiǔ", "lâu", "", "tt."],
    ["除了", "chúle", "ngoài... (ra), trừ... (ra)", "", "giới."],
    ["以外", "yǐwài", "(ngoài)... ra", "", "dt."],
    ["先", "xiān", "trước, trước tiên", "", "phó."],
    ["一直", "yìzhí", "luôn luôn, suốt", "", "phó."],
    ["干净", "gānjìng", "sạch, sạch sẽ", "", "tt."],
    ["满意", "mǎnyì", "hài lòng", "", "đgt."]
  ] },
  { id: "3-5", zh: "这样的照片才好看", topic: "Những bức ảnh như thế này mới đẹp", words: [
    ["总是", "zǒngshì", "luôn luôn", "", "phó."],
    ["终于", "zhōngyú", "cuối cùng", "", "phó."],
    ["爬", "pá", "leo, leo trèo", "", "đgt."],
    ["山", "shān", "núi đồi", "", "dt."],
    ["锻炼", "duànliàn", "tập luyện, tập thể dục", "", "đgt."],
    ["照", "zhào", "chụp (ảnh)", "", "đgt."],
    ["鞋", "xié", "giày", "", "dt."],
    ["大衣", "dàyī", "áo khoác", "", "dt."],
    ["拍照", "pāizhào", "chụp ảnh", "", "đgt."],
    ["感兴趣", "gǎn xìngqù", "hứng thú, có hứng thú (với)", "", ""],
    ["照相", "zhàoxiàng", "chụp ảnh", "", "đgt."],
    ["难看", "nánkàn", "xấu, khó coi", "", "tt."],
    ["比较", "bǐjiào", "so sánh, tương đối", "", "đgt./phó."],
    ["水平", "shuǐpíng", "trình độ, mức", "", "dt."],
    ["太阳", "tàiyáng", "mặt trời", "", "dt."],
    ["树", "shù", "cây", "", "dt."],
    ["干", "gàn", "làm", "", "đgt."],
    ["电", "diàn", "điện", "", "dt."],
    ["收到", "shōudào", "nhận được", "", "đgt."],
    ["封", "fēng", "bức, lá (thư)", "", "lượng."],
    ["邮件", "yóujiàn", "email, thư điện tử", "", "dt."],
    ["难过", "nánguò", "buồn, buồn rầu", "", "tt."],
    ["哈哈", "hāhā", "ha ha (tiếng cười)", "", ""],
    ["音乐", "yīnyuè", "âm nhạc", "", "dt."],
    ["兴趣", "xìngqù", "hứng thú", "", "dt."],
    ["会", "huì", "buổi gặp mặt, bữa tiệc", "", "dt."],
    ["结束", "jiéshù", "kết thúc", "", "đgt."]
  ] },
  { id: "3-6", zh: "高铁上还可以点外卖", topic: "Trên tàu cao tốc vẫn có thể đặt đồ ăn giao tận nơi", words: [
    ["该", "gāi", "nên", "", "đtnn."],
    ["打算", "dǎsuàn", "dự định, kế hoạch", "", "đgt./dt."],
    ["高铁", "gāotiě", "tàu cao tốc", "", "dt."],
    ["行", "xíng", "được, có thể", "", "đgt./tt."],
    ["路口", "lùkǒu", "giao lộ, lối rẽ, đầu đường", "", "dt."],
    ["小心", "xiǎoxīn", "cẩn thận, chú ý", "", "đgt./tt."],
    ["迟到", "chídào", "đến muộn", "", "đgt."],
    ["红绿灯", "hónglǜdēng", "đèn giao thông, đèn xanh đèn đỏ", "", "dt."],
    ["后来", "hòulái", "sau đó, về sau", "", "dt."],
    ["急", "jí", "gấp, lo lắng", "", "tt./đgt."],
    ["如果", "rúguǒ", "nếu", "", "liên."],
    ["以前", "yǐqián", "trước đây", "", "dt."],
    ["耳机", "ěrjī", "tai nghe", "", "dt."],
    ["充电宝", "chōngdiànbǎo", "sạc dự phòng", "", "dt."],
    ["常用", "cháng yòng", "thường dùng", "", ""],
    ["越", "yuè", "càng... (càng...)", "", "phó."],
    ["分开", "fēnkāi", "tách ra", "", "đgt."],
    ["检查", "jiǎnchá", "kiểm tra", "", "đgt."],
    ["刷", "shuā", "quét (thẻ, mã QR...)", "", "đgt."],
    ["检票", "jiǎnpiào", "kiểm vé", "", "đgt."],
    ["电梯", "diàntī", "thang máy", "", "dt."],
    ["放假", "fàngjià", "nghỉ phép, nghỉ lễ", "", "đgt."],
    ["沙发", "shāfā", "ghế sofa", "", "dt."],
    ["安静", "ānjìng", "yên tĩnh", "", "tt."],
    ["选择", "xuǎnzé", "chọn, lựa chọn", "", "đgt."],
    ["必须", "bìxū", "phải, nhất định phải", "", "phó."]
  ] },
  { id: "3-7", zh: "那条裙子比短裤更好看", topic: "Chiếc váy đó đẹp hơn quần soóc", words: [
    ["辆", "liàng", "chiếc (dùng cho xe cộ)", "", "lượng."],
    ["自行车", "zìxíngchē", "xe đạp", "", "dt."],
    ["旧", "jiù", "cũ", "", "tt."],
    ["矮", "ǎi", "thấp, lùn", "", "tt."],
    ["试", "shì", "thử", "", "đgt."],
    ["黄色", "huángsè", "màu vàng", "", "dt."],
    ["短裤", "duǎnkù", "quần soóc", "", "dt."],
    ["大小", "dàxiǎo", "kích cỡ", "", "dt."],
    ["合适", "héshì", "phù hợp", "", "tt."],
    ["裙子", "qúnzi", "váy, đầm", "", "dt."],
    ["更", "gèng", "càng, hơn", "", "phó."],
    ["决定", "juédìng", "quyết định", "", "đgt./dt."],
    ["西瓜", "xīguā", "dưa hấu", "", "dt."],
    ["新鲜", "xīnxiān", "tươi, tươi mới", "", "tt."],
    ["甜", "tián", "ngọt", "", "tt."],
    ["公斤", "gōngjīn", "kilôgam", "", "lượng."],
    ["冰", "bīng", "đông, đá", "", "đgt./dt."],
    ["极", "jí", "cực kỳ", "", "phó."],
    ["斤", "jīn", "cân (0,5 kilôgam)", "", "lượng."],
    ["香蕉", "xiāngjiāo", "chuối tiêu", "", "dt."],
    ["一共", "yígòng", "tổng cộng", "", "phó."],
    ["毛", "máo", "hào (đơn vị tiền tệ)", "", "lượng."],
    ["结婚", "jiéhūn", "kết hôn", "", "đgt."],
    ["不但", "búdàn", "không những", "", "liên."],
    ["而且", "érqiě", "mà còn", "", "liên."],
    ["声", "shēng", "tiếng (dùng cho âm thanh), âm thanh", "", "lượng./dt."],
    ["开机", "kāijī", "mở máy, bật máy", "", "đgt."]
  ] },
  { id: "3-8", zh: "今天我出院了", topic: "Hôm nay tôi xuất viện rồi", words: [
    ["最近", "zuìjìn", "gần đây", "", "dt."],
    ["常", "cháng", "thường, thường xuyên", "", "phó."],
    ["体育馆", "tǐyùguǎn", "nhà thi đấu", "", "dt."],
    ["习惯", "xíguàn", "thói quen, quen với", "", "dt./đgt."],
    ["胖", "pàng", "béo", "", "tt."],
    ["健康", "jiànkāng", "khoẻ mạnh", "", "tt."],
    ["以后", "yǐhòu", "sau, sau này, về sau", "", "dt."],
    ["羽毛球", "yǔmáoqiú", "cầu lông", "", "dt."],
    ["耳朵", "ěrduo", "tai", "", "dt."],
    ["感冒", "gǎnmào", "bị cảm, cảm", "", "đgt./dt."],
    ["发烧", "fāshāo", "sốt", "", "đgt."],
    ["低", "dī", "thấp", "", "tt."],
    ["关心", "guānxīn", "quan tâm", "", "đgt."],
    ["注意", "zhùyì", "chú ý", "", "đgt."],
    ["突然", "tūrán", "đột nhiên, đột ngột", "", "tt."],
    ["住院", "zhùyuàn", "nằm viện", "", "đgt."],
    ["担心", "dānxīn", "lo lắng", "", "đgt."],
    ["腿", "tuǐ", "chân", "", "dt."],
    ["病人", "bìngrén", "bệnh nhân", "", "dt."],
    ["差不多", "chàbuduō", "gần như, tương tự, xấp xỉ", "", "phó./tt."],
    ["得", "děi", "phải, cần", "", "đtnn."],
    ["开心", "kāixīn", "vui vẻ", "", "tt."],
    ["出院", "chūyuàn", "xuất viện", "", "đgt."],
    ["开", "kāi", "kê (đơn thuốc)", "", "đgt."],
    ["种", "zhǒng", "loại", "", "lượng."],
    ["方法", "fāngfǎ", "phương pháp", "", "dt."],
    ["其他", "qítā", "khác", "", "dt."],
    ["心里", "xīnlǐ", "trong lòng", "", "dt."]
  ] },
  { id: "3-9", zh: "打不好没关系", topic: "Chơi không tốt cũng không sao", words: [
    ["校园", "xiàoyuán", "khuôn viên trường", "", "dt."],
    ["卡", "kǎ", "thẻ", "", "dt."],
    ["球场", "qiúchǎng", "sân bóng", "", "dt."],
    ["为了", "wèile", "vì, để", "", "giới."],
    ["运动会", "yùndònghuì", "đại hội thể dục thể thao", "", "dt."],
    ["男生", "nánshēng", "nam sinh, nam giới", "", "dt."],
    ["练", "liàn", "luyện, tập", "", "đgt."],
    ["参加", "cānjiā", "tham gia", "", "đgt."],
    ["网球", "wǎngqiú", "quần vợt, tennis", "", "dt."],
    ["比赛", "bǐsài", "trận đấu, thi đấu", "", "dt./đgt."],
    ["练习", "liànxí", "luyện tập, bài tập", "", "đgt./dt."],
    ["好多", "hǎoduō", "khá nhiều", "", "số."],
    ["几乎", "jīhū", "hầu như", "", "phó."],
    ["只是", "zhǐshì", "chỉ là, nhưng", "", "phó./liên."],
    ["啤酒", "píjiǔ", "bia", "", "dt."],
    ["回", "huí", "vụ, lần", "", "lượng."],
    ["紧张", "jǐnzhāng", "căng thẳng, hồi hộp", "", "tt."],
    ["主要", "zhǔyào", "chủ yếu, chính", "", "tt."],
    ["受到", "shòudào", "bị, nhận, chịu, nhận được", "", "đgt."],
    ["影响", "yǐngxiǎng", "sự ảnh hưởng, ảnh hưởng", "", "dt./đgt."],
    ["得分", "défēn", "ghi điểm, ghi bàn, tỉ số", "", "đgt./dt."],
    ["体育", "tǐyù", "thể dục, thể thao", "", "dt."],
    ["世界", "shìjiè", "thế giới", "", "dt."],
    ["运动员", "yùndòngyuán", "vận động viên", "", "dt."],
    ["得到", "dédào", "đạt được, nhận được", "", "đgt."],
    ["成绩", "chéngjì", "thành tích, kết quả", "", "dt."]
  ] },
  { id: "3-10", zh: "你明天再把书还给我", topic: "Ngày mai em trả lại sách cho cô nhé", words: [
    ["数学", "shùxué", "môn Toán, toán học", "", "dt."],
    ["认真", "rènzhēn", "chăm chỉ, nghiêm túc", "", "tt."],
    ["笔记", "bǐjì", "ghi chép", "", "dt."],
    ["清楚", "qīngchu", "rõ ràng, hiểu rõ", "", "tt./đgt."],
    ["黑板", "hēibǎn", "bảng đen", "", "dt."],
    ["把", "bǎ", "dùng để đưa tân ngữ của động từ lên trước động từ", "", "giới."],
    ["作业", "zuòyè", "bài tập về nhà", "", "dt."],
    ["遍", "biàn", "lượt", "", "lượng."],
    ["提高", "tígāo", "nâng cao", "", "đgt."],
    ["历史", "lìshǐ", "môn Lịch sử, lịch sử", "", "dt."],
    ["难", "nán", "khó, khó khăn", "", "tt."],
    ["要求", "yāoqiú", "yêu cầu, đòi hỏi", "", "dt./đgt."],
    ["差", "chà", "kém, thiếu", "", "tt./đgt."],
    ["复习", "fùxí", "ôn tập", "", "đgt."],
    ["外语", "wàiyǔ", "ngoại ngữ", "", "dt."],
    ["当然", "dāngrán", "đương nhiên, dĩ nhiên", "", "phó."],
    ["遇到", "yùdào", "gặp, gặp phải", "", "đgt."],
    ["办公室", "bàngōngshì", "văn phòng, phòng làm việc", "", "dt."],
    ["页", "yè", "trang (giấy, sách)", "", "lượng."],
    ["对话", "duìhuà", "đối thoại, hội thoại, trò chuyện", "", "đgt."],
    ["明白", "míngbai", "hiểu, rõ ràng", "", "đgt./tt."],
    ["讲", "jiǎng", "giảng, giải thích", "", "đgt."],
    ["句", "jù", "câu (nói, văn)", "", "lượng."],
    ["句子", "jùzi", "câu", "", "dt."],
    ["年级", "niánjí", "khối lớp", "", "dt."],
    ["后年", "hòunián", "năm kia, năm sau", "", "dt."],
    ["一般", "yìbān", "bình thường, phổ biến", "", "tt."],
    ["努力", "nǔlì", "chăm chỉ, nỗ lực", "", "tt./đgt."]
  ] },
  { id: "3-11", zh: "看来我没办法解决这个问题", topic: "Xem ra em không thể giải quyết vấn đề này", words: [
    ["会议", "huìyì", "cuộc họp, hội nghị", "", "dt."],
    ["经理", "jīnglǐ", "giám đốc", "", "dt."],
    ["开会", "kāihuì", "họp", "", "đgt."],
    ["后天", "hòutiān", "ngày kia", "", "dt."],
    ["地点", "dìdiǎn", "địa điểm", "", "dt."],
    ["室", "shì", "phòng", "", "dt."],
    ["发", "fā", "gửi", "", "đgt."],
    ["笔记本（电脑）", "bǐjìběn (diànnǎo)", "máy tính xách tay", "", "dt."],
    ["或者", "huòzhě", "hoặc, hoặc là", "", "liên."],
    ["声音", "shēngyīn", "âm thanh", "", "dt."],
    ["看来", "kànlái", "xem ra, dường như, có vẻ như", "", "đgt."],
    ["办法", "bànfǎ", "biện pháp, cách", "", "dt."],
    ["解决", "jiějué", "giải quyết", "", "đgt."],
    ["只能", "zhǐ néng", "chỉ có thể", "", ""],
    ["别人", "biérén", "người khác", "", "đt."],
    ["请假", "qǐngjià", "xin nghỉ, xin nghỉ phép", "", "đgt."],
    ["同事", "tóngshì", "đồng nghiệp", "", "dt."],
    ["休假", "xiūjià", "nghỉ phép", "", "đgt."],
    ["怕", "pà", "sợ", "", "đgt."],
    ["邮箱", "yóuxiāng", "hộp thư điện tử", "", "dt."],
    ["愿意", "yuànyì", "sẵn lòng, bằng lòng", "", "đtnn."],
    ["城市", "chéngshì", "thành phố", "", "dt."],
    ["离开", "líkāi", "rời khỏi", "", "đgt."],
    ["机会", "jīhuì", "cơ hội", "", "dt."],
    ["生活", "shēnghuó", "cuộc sống, sinh sống", "", "dt./đgt."],
    ["为", "wèi", "vì", "", "giới."],
    ["或", "huò", "hoặc, hoặc là", "", "liên."]
  ] },
  { id: "3-12", zh: "这个季节天气变化很快", topic: "Thời tiết thay đổi rất nhanh vào mùa này", words: [
    ["街", "jiē", "phố, đường phố", "", "dt."],
    ["开花", "kāihuā", "nở hoa, trổ hoa", "", "đgt."],
    ["公园", "gōngyuán", "công viên", "", "dt."],
    ["船", "chuán", "thuyền", "", "dt."],
    ["工作日", "gōngzuòrì", "ngày làm việc", "", "dt."],
    ["地方", "dìfang", "địa điểm, nơi", "", "dt."],
    ["刚才", "gāngcái", "vừa rồi, lúc nãy", "", "dt."],
    ["刮", "guā", "(gió) thổi", "", "đgt."],
    ["风", "fēng", "gió", "", "dt."],
    ["新闻", "xīnwén", "tin tức", "", "dt."],
    ["伞", "sǎn", "ô, dù", "", "dt."],
    ["借", "jiè", "mượn", "", "đgt."],
    ["把", "bǎ", "cái, chiếc (vật có tay cầm)", "", "lượng."],
    ["雨衣", "yǔyī", "áo mưa", "", "dt."],
    ["变", "biàn", "thay đổi", "", "đgt."],
    ["季节", "jìjié", "mùa", "", "dt."],
    ["变化", "biànhuà", "thay đổi, sự thay đổi", "", "đgt./dt."],
    ["冬天", "dōngtiān", "mùa đông", "", "dt."],
    ["常常", "chángcháng", "thường xuyên", "", "phó."],
    ["关注", "guānzhù", "quan tâm", "", "đgt."],
    ["四季", "sìjì", "bốn mùa", "", "dt."],
    ["春天", "chūntiān", "mùa xuân", "", "dt."],
    ["夏天", "xiàtiān", "mùa hè", "", "dt."],
    ["凉快", "liángkuai", "mát mẻ", "", "tt."],
    ["秋天", "qiūtiān", "mùa thu", "", "dt."],
    ["叶子", "yèzi", "lá", "", "dt."],
    ["变成", "biànchéng", "trở thành, biến thành", "", "đgt."]
  ] },
  { id: "3-13", zh: "我的新邻居来自英国", topic: "Hàng xóm mới của tôi đến từ Vương quốc Anh", words: [
    ["请客", "qǐngkè", "đãi khách, mời khách", "", "đgt."],
    ["南方", "nánfāng", "miền Nam", "", "dt."],
    ["北方", "běifāng", "miền Bắc", "", "dt."],
    ["做法", "zuòfǎ", "cách làm", "", "dt."],
    ["不同", "bù tóng", "khác nhau", "", ""],
    ["加", "jiā", "thêm", "", "đgt."],
    ["的话", "dehuà", "nếu", "", "trợ."],
    ["做客", "zuòkè", "làm khách", "", "đgt."],
    ["邻居", "línjū", "hàng xóm, láng giềng", "", "dt."],
    ["放心", "fàngxīn", "yên tâm", "", "đgt."],
    ["酒", "jiǔ", "rượu", "", "dt."],
    ["放", "fàng", "đặt, để", "", "đgt."],
    ["客人", "kèrén", "khách, khách hàng", "", "dt."],
    ["晚会", "wǎnhuì", "dạ hội (buổi biểu diễn, giao lưu vào buổi tối)", "", "dt."],
    ["礼物", "lǐwù", "quà, món quà", "", "dt."],
    ["画家", "huàjiā", "hoạ sĩ", "", "dt."],
    ["盘子", "pánzi", "đĩa", "", "dt."],
    ["一边", "yìbiān", "vừa (…vừa…)", "", "phó."],
    ["聊天儿", "liáotiānr", "trò chuyện, nói chuyện, tán gẫu", "", "đgt."],
    ["来自", "láizì", "đến từ", "", "đgt."],
    ["夫妻", "fūqī", "vợ chồng", "", "dt."],
    ["直到", "zhídào", "cho đến, mãi đến", "", "đgt."],
    ["地图", "dìtú", "bản đồ", "", "dt."],
    ["点", "diǎn", "điểm, chấm nhỏ", "", "dt."],
    ["感到", "gǎndào", "cảm thấy", "", "đgt."],
    ["东方", "dōngfāng", "phương Đông", "", "dt."],
    ["文化", "wénhuà", "văn hoá", "", "dt."]
  ] },
  { id: "3-14", zh: "这本书被别人借走了", topic: "Quyển sách này đã bị người khác mượn rồi", words: [
    ["词典", "cídiǎn", "từ điển", "", "dt."],
    ["最好", "zuìhǎo", "tốt nhất", "", "phó."],
    ["节", "jié", "tiết, giờ (học)", "", "lượng."],
    ["图书馆", "túshūguǎn", "thư viện", "", "dt."],
    ["被", "bèi", "bị, được", "", "giới."],
    ["名人", "míngrén", "người nổi tiếng, danh nhân", "", "dt."],
    ["故事", "gùshi", "câu chuyện", "", "dt."],
    ["然后", "ránhòu", "sau đó", "", "liên."],
    ["报纸", "bàozhǐ", "báo, tờ báo", "", "dt."],
    ["忘记", "wàngjì", "quên", "", "đgt."],
    ["电子书", "diànzǐshū", "sách điện tử", "", "dt."],
    ["女生", "nǚshēng", "nữ sinh", "", "dt."],
    ["表演", "biǎoyǎn", "biểu diễn, diễn", "", "đgt."],
    ["节目", "jiémù", "tiết mục", "", "dt."],
    ["怎么办", "zěnme bàn", "làm (như) thế nào", "", ""],
    ["校长", "xiàozhǎng", "hiệu trưởng", "", "dt."],
    ["面前", "miànqián", "phía trước", "", "dt."],
    ["有些", "yǒuxiē", "có một vài, có một số", "", "phó."],
    ["相信", "xiāngxìn", "tin, tin tưởng, tin rằng", "", "đgt."],
    ["新年", "xīnnián", "năm mới", "", "dt."],
    ["班级", "bānjí", "lớp học, cấp học", "", "dt."],
    ["跳", "tiào", "nhảy, khiêu vũ", "", "đgt."],
    ["留学生", "liúxuéshēng", "lưu học sinh", "", "dt."],
    ["最后", "zuìhòu", "cuối cùng", "", "dt."],
    ["一块儿", "yíkuàir", "cùng, cùng nhau, cùng một chỗ", "", "phó./dt."],
    ["网站", "wǎngzhàn", "trang web", "", "dt."],
    ["视频", "shìpín", "đoạn phim, video", "", "dt."]
  ] },
  { id: "3-15", zh: "我是半个南京人", topic: "Em cũng là một nửa người Nam Kinh", words: [
    ["蓝", "lán", "màu xanh lam, xanh dương", "", "tt."],
    ["段", "duàn", "đoạn, quãng (thời gian, không gian)", "", "lượng."],
    ["附近", "fùjìn", "gần đó, lân cận", "", "dt."],
    ["马路", "mǎlù", "đường chính, đường cái", "", "dt."],
    ["平时", "píngshí", "thường ngày", "", "dt."],
    ["放学", "fàngxué", "tan học", "", "đgt."],
    ["游戏", "yóuxì", "trò chơi", "", "dt."],
    ["老人", "lǎorén", "người già", "", "dt."],
    ["根据", "gēnjù", "căn cứ vào, dựa vào", "", "giới./đgt."],
    ["了解", "liǎojiě", "hiểu, hiểu rõ, tìm hiểu", "", "đgt."],
    ["可是", "kěshì", "nhưng, tuy nhiên", "", "liên."],
    ["以上", "yǐshàng", "trở lên, trên", "", "dt."],
    ["有名", "yǒumíng", "nổi tiếng, có tiếng", "", "tt."],
    ["景点", "jǐngdiǎn", "cảnh điểm, điểm du lịch", "", "dt."],
    ["游客", "yóukè", "du khách", "", "dt."],
    ["外地", "wàidì", "nơi khác, vùng khác, địa phương khác", "", "dt."],
    ["聊", "liáo", "trò chuyện, nói chuyện", "", "đgt."],
    ["河", "hé", "sông", "", "dt."],
    ["关系", "guānxì", "quan hệ", "", "dt."],
    ["养", "yǎng", "nuôi dưỡng", "", "đgt."],
    ["西北", "xīběi", "tây bắc", "", "dt."],
    ["经过", "jīngguò", "đi qua, trải qua, trải nghiệm", "", "đgt./dt."],
    ["草地", "cǎodì", "thảm cỏ, đồng cỏ", "", "dt."],
    ["遇见", "yùjiàn", "gặp, tình cờ gặp", "", "đgt."]
  ] },
  { id: "3-16", zh: "我听说有的熊猫出国了", topic: "Con nghe nói có một số con gấu trúc đã ra nước ngoài", words: [
    ["脏", "zāng", "bẩn", "", "tt."],
    ["可爱", "kě’ài", "đáng yêu, dễ thương", "", "tt."],
    ["一会儿", "yíhuìr", "một lúc, một lát", "", "phó."],
    ["脚", "jiǎo", "chân, bàn chân", "", "dt."],
    ["照顾", "zhàogù", "chăm sóc", "", "đgt."],
    ["好像", "hǎoxiàng", "dường như", "", "đgt."],
    ["认得", "rènde", "nhận ra", "", "đgt."],
    ["周末", "zhōumò", "cuối tuần", "", "dt."],
    ["动物园", "dòngwùyuán", "vườn bách thú, sở thú", "", "dt."],
    ["动物", "dòngwù", "động vật", "", "dt."],
    ["大熊猫", "dàxióngmāo", "gấu trúc, gấu mèo", "", "dt."],
    ["奇怪", "qíguài", "kỳ lạ, kỳ quái", "", "tt."],
    ["其实", "qíshí", "thực ra", "", "phó."],
    ["竹子", "zhúzi", "tre", "", "dt."],
    ["国宝", "guóbǎo", "quốc bảo, bảo vật quốc gia", "", "dt."],
    ["全", "quán", "toàn bộ", "", "tt."],
    ["野生", "yěshēng", "hoang dã", "", "tt."],
    ["关于", "guānyú", "về..., có liên quan tới", "", "giới."],
    ["饱", "bǎo", "no", "", "tt."],
    ["张", "zhāng", "mở (miệng)", "", "đgt."],
    ["嘴", "zuǐ", "miệng", "", "dt."],
    ["身边", "shēnbiān", "bên cạnh", "", "dt."],
    ["半天", "bàntiān", "nửa ngày, một lúc lâu", "", "sl."],
    ["脸", "liǎn", "mặt, khuôn mặt", "", "dt."],
    ["大人", "dàren", "người lớn", "", "dt."],
    ["喜爱", "xǐ’ài", "yêu thích", "", "đgt."]
  ] },
  { id: "3-17", zh: "我要多向认真的人学习", topic: "Mình sẽ học hỏi từ những người cẩn thận", words: [
    ["向", "xiàng", "hướng về", "", "giới."],
    ["楼梯", "lóutī", "cầu thang bộ", "", "dt."],
    ["害怕", "hàipà", "sợ, sợ hãi", "", "đgt."],
    ["生气", "shēngqì", "giận, tức giận", "", "đgt."],
    ["常见", "cháng jiàn", "thường thấy", "", ""],
    ["聪明", "cōngmíng", "thông minh", "", "tt."],
    ["错", "cuò", "sai, lỗi, lỗi sai", "", "dt."],
    ["认为", "rènwéi", "cho rằng, nhận thấy", "", "đgt."],
    ["到处", "dàochù", "mọi nơi, khắp nơi", "", "phó."],
    ["继续", "jìxù", "tiếp tục", "", "đgt."],
    ["同意", "tóngyì", "đồng ý", "", "đgt."],
    ["可", "kě", "nhưng, nhưng mà", "", "liên."],
    ["屋子", "wūzi", "phòng, căn phòng, ngôi nhà", "", "dt."],
    ["有关", "yǒuguān", "liên quan, có liên quan", "", "đgt./giới."],
    ["关机", "guānjī", "tắt máy", "", "đgt."],
    ["前天", "qiántiān", "hôm kia", "", "dt."],
    ["留学", "liúxué", "du học", "", "đgt."],
    ["国家", "guójiā", "quốc gia, đất nước", "", "dt."],
    ["比如", "bǐrú", "ví dụ", "", "đgt."],
    ["查", "chá", "tra, tìm", "", "đgt."],
    ["有用", "yǒuyòng", "hữu ích", "", "tt."],
    ["容易", "róngyì", "dễ, dễ dàng", "", "tt."],
    ["回答", "huídá", "trả lời", "", "đgt."],
    ["方向", "fāngxiàng", "phương hướng", "", "dt."],
    ["只有", "zhǐyǒu", "chỉ có", "", "liên."],
    ["真正", "zhēnzhèng", "thực sự", "", "phó."],
    ["难题", "nántí", "vấn đề khó, vấn đề nan giải", "", "dt."]
  ] },
  { id: "3-18", zh: "我学会了包饺子", topic: "Cháu đã học được cách gói sủi cảo", words: [
    ["怎样", "zěnyàng", "thế nào", "", "đt."],
    ["过节", "guòjié", "đón lễ", "", "đgt."],
    ["节", "jié", "lễ", "", "dt."],
    ["节日", "jiérì", "ngày lễ", "", "dt."],
    ["联欢", "liánhuān", "liên hoan", "", "đgt."],
    ["大概", "dàgài", "khoảng, đại khái, chung chung", "", "phó./tt."],
    ["阿姨", "āyí", "cô, dì", "", "dt."],
    ["叔叔", "shūshu", "chú", "", "dt."],
    ["收", "shōu", "nhận, thu", "", "đgt."],
    ["总", "zǒng", "luôn luôn", "", "phó."],
    ["起", "qǐ", "(nói) đến (dùng sau động từ, chỉ người/vật liên quan)", "", "đgt."],
    ["见面", "jiànmiàn", "gặp mặt", "", "đgt."],
    ["矿泉水", "kuàngquánshuǐ", "nước khoáng, nước suối", "", "dt."],
    ["刚刚", "gānggāng", "vừa mới", "", "phó."],
    ["出发", "chūfā", "xuất phát", "", "đgt."],
    ["不久", "bùjiǔ", "không lâu", "", "tt."],
    ["发生", "fāshēng", "xảy ra", "", "đgt."],
    ["刚", "gāng", "vừa, vừa mới", "", "phó."],
    ["只要", "zhǐyào", "chỉ cần", "", "liên."],
    ["学期", "xuéqī", "học kỳ", "", "dt."],
    ["毕业", "bìyè", "tốt nghiệp", "", "đgt."],
    ["出生", "chūshēng", "sinh, sinh ra", "", "đgt."],
    ["过去", "guòqù", "quá khứ, trước kia", "", "dt."],
    ["懂得", "dǒngde", "hiểu", "", "đgt."],
    ["坚持", "jiānchí", "kiên trì", "", "đgt."],
    ["完成", "wánchéng", "hoàn thành", "", "đgt."],
    ["目标", "mùbiāo", "mục tiêu", "", "dt."],
    ["发展", "fāzhǎn", "phát triển", "", "đgt."]
  ] }
];
