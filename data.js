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
