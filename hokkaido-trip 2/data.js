/* =========================================================================
   北海道旅行網站｜資料檔 data.js
   -------------------------------------------------------------------------
   ★ 想改行程、餐廳、清單、照片，只要改這個檔案就好，不用碰其他檔案。
   ★ 規則：文字放在單引號 ' ' 裡面；每一項後面記得加逗號 , 。
   ★ 改完存檔，重新整理網頁即可看到。詳細教學請看網站裡的「使用說明」。
   ========================================================================= */

/* ---------- 照片來源 ----------
   commons('檔名')：Wikimedia Commons 上的照片檔名
   wiki('條目名')：自動抓日文維基百科該條目的代表照片
   也可以直接填完整網址，例如 { src: 'https://.../photo.jpg', credit: '自己拍的' } */
function commons(file, credit) {
  return {
    src: 'https://commons.wikimedia.org/wiki/Special:FilePath/' + encodeURIComponent(file) + '?width=1280',
    credit: credit || 'Wikimedia Commons',
    page: 'https://commons.wikimedia.org/wiki/File:' + encodeURIComponent(file)
  };
}
function wiki(title) { return { wiki: title }; }

const PHOTOS = {
  hero:      commons('Tree_of_Hakodate_Christmas_Fantasy_in_sunset_time.jpg', '掬茶／CC BY-SA 4.0'),
  hakoTree:  commons('Tree_of_Hakodate_Christmas_Fantasy_in_sunset_time.jpg', '掬茶／CC BY-SA 4.0'),
  sapIllum:  commons('Sapporo_White_illumination_29th_-_panoramio_-_t-konno_(2).jpg', 't-konno／CC BY-SA 3.0'),
  sapSnow:   commons('Morning_of_snow_in_sapporo_-_panoramio.jpg', 't-konno／Wikimedia Commons'),
  sapSta:    commons('JR_Sapporo_Sta07s3s2790.jpg', '663highland／Wikimedia Commons'),
  bluePond:  commons('Biei_Blue-pond.jpg', 'MaedaAkihiko／CC BY-SA 4.0'),
  toya:      commons('Laketoya_01.jpg', 'NipponiaNippon／Wikimedia Commons'),
  bayArea:   commons('Bay_area,_Hakodate_(7662428068).jpg', 'Chi King／CC BY 2.0'),
  hakoNight: commons('View_from_Mount_Hakodate_Japan01o.jpg', '663highland／CC BY-SA 3.0'),
  goryokaku: commons('Hakodate_Goryokaku_Panorama_1.JPG', '京浜にけ／CC BY-SA'),
  goryoTower:commons('Goryokaku_Tower_Hakodate_Hokkaido_Japan01n.jpg', '663highland／Wikimedia Commons'),
  chitose:   wiki('新千歳空港'),
  akarenga:  wiki('北海道庁旧本庁舎'),
  jingu:     wiki('北海道神宮'),
  shirahige: wiki('白ひげの滝'),
  hokudai:   wiki('北海道大学'),
  otaruCanal:wiki('小樽運河'),
  orgel:     wiki('小樽オルゴール堂'),
  tanuki:    wiki('狸小路'),
  hachiman:  wiki('八幡坂'),
  church:    wiki('函館ハリストス正教会'),
  asaichi:   wiki('函館朝市'),
  botanical: wiki('函館市熱帯植物園'),
  yukura:    wiki('湯倉神社'),
  hkdAirport:wiki('函館空港'),
  hakoyama:  wiki('函館山ロープウェイ'),
  ningle:    wiki('ニングルテラス')
};

/* ---------- 旅行基本資訊 ---------- */
const TRIP = {
  title: 'HOKKAIDO TRAVEL',
  subtitle: '北海道 冬の旅',
  dateText: '2026.12.14 — 2026.12.21',
  start: '2026-12-14',
  end: '2026-12-21',
  travellers: ['我', '男友'],      // ← 可改成兩人的名字，預算頁的「付款人」會跟著變
  intro: '札幌進、函館出的八天七夜冬季北海道。前三天在札幌看聖誕市集與紅磚夜景，一日遊去美瑛青池，再搭 JR 去小樽散步；第四天搭特急北斗南下洞爺湖，在湖畔溫泉住一晚；最後三天留給函館的海上聖誕樹、元町坡道、函館山夜景、五稜郭與泡湯的猴子。全程以 JR、地鐵、巴士與市電移動。',
  facts: [
    { k: '天數', v: '8 天 7 夜' },
    { k: '住宿城市', v: '札幌 3 晚・洞爺湖 1 晚・函館 3 晚' },
    { k: '交通方式', v: 'JR・地鐵・道南巴士・函館市電・一日遊團（PDF 行程無自駕）' },
    { k: '航班', v: '去程 CI130 TPE→CTS｜回程 JX861 HKD→TPE' }
  ],
  flights: [
    { date: '12/14（一）', label: '去程｜中華航空 CI130・直飛', text: '08:35 台灣時間 桃園 TPE 第二航廈 → 13:20 日本時間 新千歲 CTS 國際線航廈。飛行約 3 小時 45 分。公開冬季班表供參考，請核對電子機票。', link: ['航班班表', 'https://zbordirect.com/en/tools/schedule/TPE/CTS'] },
    { date: '台灣端待確認', label: '機場接送', text: '建議 05:45-06:00 台灣時間抵達桃園機場。接送上車地點、時間、車資待補。', tag: '待確認' },
    { date: '12/21（一）', label: '回程｜星宇航空 JX861・直飛', text: '18:00 日本時間 函館 HKD → 21:40 台灣時間 桃園 TPE 第一航廈。機型 Airbus A330-900neo，飛行約 4 小時 40 分。' }
  ],
  hotels: [
    { nights: '12/14–17・3 晚', name: '東急 Stay 札幌', addr: '札幌市中央區南一条西1丁目13-4（大通站 34 號出口）', q: 'Tokyu Stay Sapporo Minami 1 Nishi 1 13-4' },
    { nights: '12/17–18・1 晚', name: 'The Lake View TOYA 乃之風 Resort', addr: '洞爺湖溫泉（地址以飯店官網為準）', q: 'The Lake View Toya Nonokaze Resort', link: ['飯店 FAQ', 'https://nonokaze-resort.com/faq/'] },
    { nights: '12/18–21・3 晚', name: '函館國際酒店（含早餐）', addr: 'JR 函館站西口步行 10-15 分（地址以飯店官網為準）', q: 'Hakodate Kokusai Hotel' }
  ],
  bookings: [
    '12/15 美瑛富良野一日遊團：已訂，集合時間與地點以憑證為準。',
    '12/16 20:30 札幌「禅」壽喜燒：2 位，¥11,000／人。',
    '12/17 特急北斗 6 號 札幌→洞爺：已訂普通車指定席 2 位，¥13,380。',
    '12/18 特急北斗 10 號 洞爺→函館：待訂（11/18 台灣時間 09:00 開賣）。',
    '12/20 18:00 大黑屋函館五稜郭店：2 位，訂位 #54675。',
    '札幌大黑屋：已取消。'
  ]
};

/* ---------- 每日行程 ----------
   kind 可用：flight 飛機｜train 電車｜bus 巴士｜walk 步行｜spot 景點｜food 餐廳｜hotel 住宿｜event 活動｜shop 逛街｜plan 備案
   tag 可用：'已訂'、'待確認'、'備案'、'彈性'  */
const DAYS = [
  {
    n: 1, date: '2026-12-14', dow: '一', city: '札幌',
    title: '新千歲入境・Toriton・慕尼黑聖誕市集・紅磚夜景',
    cover: 'sapIllum',
    stay: 0,
    items: [
      { time: '13:20', kind: 'flight', title: '新千歲入境 → JR 車站', desc: '領行李、出關後沿 JR 指標往國內線航廈地下。', stay: '國際線入境大廳到月台抓 15-20 分鐘', q: 'New Chitose Airport Station', img: 'chitose' },
      { time: '14:39-15:20', kind: 'train', title: 'JR Airport → 札幌站', desc: '¥1,230，札幌行或小樽行皆可。候選 14:39→15:23、14:50→15:26、14:59→15:36、15:09→15:52、15:20→15:57。', move: 'JR 快速 Airport 約 37-43 分', q: 'Sapporo Station', links: [['官方班表', 'https://www.jrhokkaido.co.jp/airport/']], img: 'sapSta' },
      { time: '15:45-16:25', kind: 'hotel', title: '札幌站 → 東急 Stay 札幌入住', desc: '南北線往真駒內到大通（¥210），34 號出口到飯店。若 16:10 前能到 THE BUTTER，可先外帶；08:00-18:00，否則移 Day 3。', move: '含站內步行抓 20-25 分', addr: '札幌市中央區南一条西1丁目13-4', q: 'Tokyu Stay Sapporo Minami 1 Nishi 1 13-4', links: [['車站到飯店', 'https://www.google.com/maps/dir/?api=1&origin=Sapporo+Station&destination=Tokyu+Stay+Sapporo+Minami+1+Nishi+1+13-4&travelmode=transit'], ['THE BUTTER', 'https://www.google.com/maps/search/?api=1&query=THE+BUTTER+Akarenga+Terrace']] },
      { time: '16:25-16:35 出門', kind: 'food', title: 'Toriton 回轉壽司 北8条光星店', desc: '大通搭東豐線往榮町到東區役所前，再走 12-15 分。約 17:00 取號。點干貝、鮭魚卵、鮪魚。', move: '地鐵 6 分、¥210，再步行 12-15 分', stay: '營業 11:00-22:00，LO 21:30', addr: '札幌市東區北8条東5丁目19-1', q: 'Toriton Kita 8 Jo Kosei', links: [['飯店到壽司', 'https://www.google.com/maps/dir/?api=1&origin=Tokyu+Stay+Sapporo+Minami+1+Nishi+1+13-4&destination=Toriton+Kita+8+Jo+Kosei&travelmode=transit']], food: 'toriton' },
      { time: '等位備案', kind: 'plan', tag: '備案', title: 'BONANZA 湯咖哩', desc: '若等 90 分以上且可離店，走過去，兩人可分一份。Google 營業時間 11:30-15:00、17:00-20:15。', move: '單程步行 10-15 分', addr: '札幌市東區北7条東3丁目15-23', q: 'Bonanza Soup Curry Sapporo', links: [['壽司店到咖哩', 'https://www.google.com/maps/dir/?api=1&origin=Toriton+Kita+8+Jo+Kosei&destination=Bonanza+Soup+Curry+Sapporo&travelmode=walking']], food: 'bonanza' },
      { time: '目標 20:15 前', kind: 'event', title: '大通公園 慕尼黑聖誕市集', desc: '東區役所前搭東豐線往福住到大通。市集 11:00-21:00，餐飲 LO 20:45。', move: '整段 25-35 分、¥210', q: 'Sapporo TV Tower', links: [['市集導航', 'https://www.google.com/maps/search/?api=1&query=Sapporo+TV+Tower']], img: 'sapIllum' },
      { time: '20:45-21:50', kind: 'spot', title: '紅磚廳舍與アカプラ → 回飯店', desc: '點燈 16:30-22:00。若 20:30 後才到大通，優先紅磚夜景。', stay: '留 20-30 分拍照', move: '市集走 12-15 分；回飯店走 15-20 分', q: 'Akapla Sapporo', links: [['紅磚夜景', 'https://www.google.com/maps/search/?api=1&query=Akapla+Sapporo'], ['步行回飯店', 'https://www.google.com/maps/dir/?api=1&origin=Akapla+Sapporo&destination=Tokyu+Stay+Sapporo+Minami+1+Nishi+1+13-4&travelmode=walking']], img: 'akarenga' }
    ],
    notes: [
      '建議 12/14 抵達後有空就先在 JR 新千歲機場站或札幌站領 12/17 北斗紙票（取票資料見 PDF 第 10 頁）。',
      '飛機落地後才開始一連串轉乘，Toriton 晚餐時段常需排隊，取號後可先到附近走走。'
    ]
  },
  {
    n: 2, date: '2026-12-15', dow: '二', city: '美瑛・富良野',
    title: 'Espresso D 外帶・北海道神宮・青池與精靈露台・Seicomart',
    cover: 'bluePond',
    stay: 0,
    items: [
      { time: '07:45 出門', kind: 'food', title: 'Espresso D Works｜只外帶', desc: '08:00 開門，08:15 前買咖啡及布丁。咖啡可外帶，布丁供應及外帶現場問。', move: '飯店步行 10-15 分至 COCONO SUSUKINO 1F', q: 'Espresso D Works COCONO SUSUKINO', links: [['飯店到咖啡店', 'https://www.google.com/maps/dir/?api=1&origin=Tokyu+Stay+Sapporo+Minami+1+Nishi+1+13-4&destination=Espresso+D+Works+COCONO+SUSUKINO&travelmode=walking']], food: 'espressod' },
      { time: '08:15-09:05', kind: 'train', title: '大通 → 圓山公園 → 北海道神宮', desc: '走地下街 Pole Town 到大通東西線月台，搭往宮之澤，參考 08:32／08:36／08:41／08:45。', move: '地鐵 ¥210、約 6 分；下車後步行 15-20 分', q: 'Hokkaido Jingu', links: [['圓山站到神宮', 'https://www.google.com/maps/dir/?api=1&origin=Maruyama+Koen+Station&destination=Hokkaido+Jingu&travelmode=walking']] },
      { time: '09:05-09:45', kind: 'spot', title: '北海道神宮、圓山公園', desc: '神宮冬季 07:00-16:00。參拜、拍照、看御守，公園沿參道走。', stay: '約 40 分', addr: '札幌市中央區宮ヶ丘474', q: 'Hokkaido Jingu', img: 'jingu' },
      { time: '09:45-10:55', kind: 'train', title: '神宮 → JR 札幌站、買午晚餐', desc: '走回圓山公園站，東西線往新札幌到大通，轉南北線往麻生到さっぽろ，¥250。約 10:30 到車站，買飯糰、三明治、水和晚餐。', q: 'Sapporo Station', links: [['神宮到札幌站', 'https://www.google.com/maps/dir/?api=1&origin=Hokkaido+Jingu&destination=Sapporo+Station&travelmode=transit']] },
      { time: '11:05 到附近', kind: 'bus', tag: '待確認', title: '美瑛富良野一日遊｜暫排 11:20 報到、11:30 發車', desc: 'JR 札幌站北口團體巴士乘車區 5 號暫填。憑證確認報到位置、團費、景點順序、青池是否看點燈。主要看白鬚瀑布、青池、精靈露台。', stay: '回札幌暫抓 22:30', q: 'JR Sapporo Station North Exit', links: [['札幌站北口', 'https://www.google.com/maps/search/?api=1&query=JR+Sapporo+Station+North+Exit']] },
      { time: '團體行程', kind: 'spot', title: '白金青池・白鬚瀑布', desc: '冬季青池有點燈活動（以團體行程安排為準）。步道結冰，務必穿防滑鞋。', addr: '上川郡美瑛町白金', q: 'Shirogane Blue Pond', img: 'shirahige' },
      { time: '團體行程', kind: 'spot', title: '精靈露台 Ningle Terrace', desc: '富良野森林中的小木屋商店街，傍晚點燈後最有氣氛。', q: 'Ningle Terrace Furano', img: 'ningle' },
      { time: '約 23:00', kind: 'food', title: 'Seicomart THE KNOT 札幌店｜宵夜', desc: '若回到札幌站，搭南北線往真駒內到薄野（¥210），或步行 25-30 分。店 24 小時，Hot Chef 看現場供應，可買炸雞、熱飯糰、豬排丼。', move: '回飯店走 8-12 分', q: 'Seicomart THE KNOT Sapporo', links: [['札幌站到宵夜', 'https://www.google.com/maps/dir/?api=1&origin=Sapporo+Station&destination=Seicomart+THE+KNOT+Sapporo&travelmode=transit'], ['宵夜後回飯店', 'https://www.google.com/maps/dir/?api=1&origin=Seicomart+THE+KNOT+Sapporo&destination=Tokyu+Stay+Sapporo+Minami+1+Nishi+1+13-4&travelmode=walking']], food: 'seicomart' }
    ],
    notes: [
      '11:00 發車場次備案：神宮改 09:25-09:30 離開；到札幌站優先報到，餐點改快速外帶或前晚買好。',
      '一日遊團大部分時間在戶外，青池與白鬚瀑布步道常結冰，請穿防滑鞋並帶暖暖包。',
      '美瑛 12 月下午約 16 點前後就天黑，拍照抓緊白天時段。'
    ]
  },
  {
    n: 3, date: '2026-12-16', dow: '三', city: '小樽',
    title: '北大 Marche・GARAKU・LeTAO・世壹屋・青之運河・狸小路',
    cover: 'otaruCanal',
    stay: 0,
    items: [
      { time: '09:15 出門', kind: 'food', title: '北大 Marche Café & Labo', desc: '經札幌站北口、北大正門。10:00-16:00，LO 15:30，喝北大牛乳或分乳製甜點。THE BUTTER 備案：08:30 出門，08:45-09:20 用餐後去北大。', move: '飯店步行 30-40 分', addr: '札幌市北區北9条西5丁目 北海道大學百年紀念會館 1F', q: 'Hokudai Marche Cafe and Labo', links: [['北大導航', 'https://www.google.com/maps/dir/?api=1&origin=Tokyu+Stay+Sapporo+Minami+1+Nishi+1+13-4&destination=Hokudai+Marche+Cafe+and+Labo&travelmode=walking']], img: 'hokudai', food: 'hokudai' },
      { time: '10:50 出發', kind: 'food', title: '11:15 排 GARAKU sitatte sapporo', desc: 'Google 營業時間 11:30-15:00／17:00-20:30。點雞腿蔬菜與炙燒豬角煮湯咖哩。', move: '北大步行 18-25 分；吃完走到 JR 月台含進站 10-15 分', q: 'Soup Curry GARAKU sitatte sapporo', links: [['北大到 GARAKU', 'https://www.google.com/maps/dir/?api=1&origin=Hokudai+Marche+Cafe+and+Labo&destination=Soup+Curry+GARAKU+sitatte+sapporo&travelmode=walking']], food: 'garaku' },
      { time: '13:00→13:37', kind: 'train', title: 'JR 札幌 → 南小樽', desc: '小樽行，倒數一站下車。¥800。早班 12:30→13:01，晚班首選 13:30→13:59。', move: '約 37 分', q: 'Minami-Otaru Station', links: [['JR 官方查詢', 'https://www.jrhokkaido.co.jp/global/chinese/train/']] },
      { time: '13:37-15:10', kind: 'spot', title: '音樂盒堂 → LeTAO → 北一硝子', desc: '音樂盒堂本館 09:00-18:00；過街到 LeTAO 本店 09:00-18:00，買霜淇淋或外帶。再走 3-5 分到北一 Hall，晚到可略。', move: '車站走 10-15 分到音樂盒堂', q: 'Otaru Music Box Museum Main Building', links: [['南小樽到音樂盒堂', 'https://www.google.com/maps/dir/?api=1&origin=Minami-Otaru+Station&destination=Otaru+Music+Box+Museum+Main+Building&travelmode=walking']], img: 'orgel', food: 'letao' },
      { time: '15:20-16:50', kind: 'food', title: '世壹屋海膽丼 → 青之運河', desc: '世壹屋 10:00-17:00，LO 16:30，兩人點一碗先問能否共食。飯後走淺草橋至中央橋，日落點燈至 22:30。', move: '北一 Hall 沿堺町通走 12-18 分', addr: '小樽市堺町2-18（世壹屋 小樽運河店）', q: 'Yoichiya Otaru Canal', links: [['世壹屋', 'https://www.google.com/maps/search/?api=1&query=Yoichiya+Otaru+Canal'], ['運河', 'https://www.google.com/maps/dir/?api=1&origin=Asakusa+Bridge+Otaru+Canal&destination=Chuo+Bridge+Otaru+Canal&travelmode=walking']], img: 'otaruCanal', food: 'yoichiya' },
      { time: '16:50-20:15', kind: 'train', title: '小樽站 → 札幌 → 狸小路', desc: '搭 17:30→18:08（備選 17:00→17:33），¥800。札幌轉南北線往真駒內到薄野（¥210）。18:40 左右逛狸小路，唐吉訶德本店 24 小時。', move: '中央橋到小樽站走 12-18 分', q: 'Tanukikoji Shopping Street', links: [['狸小路導航', 'https://www.google.com/maps/dir/?api=1&origin=Sapporo+Station&destination=Tanukikoji+Shopping+Street&travelmode=transit']], img: 'tanuki' },
      { time: '20:30｜已訂', kind: 'food', tag: '已訂', title: '札幌「禅」壽喜燒', desc: '2 位，20:30 到店。套餐 ¥11,000／人，共 ¥22,000。', addr: '札幌市中央區南2条西1丁目 山口中央大樓 B1F', q: '牛しゃぶ・すき焼専門店 禅 札幌 山口中央ビル', links: [['札幌「禅」定位', 'https://www.google.com/maps/search/?api=1&query=%E7%89%9B%E3%81%97%E3%82%83%E3%81%B6%E3%83%BB%E3%81%99%E3%81%8D%E7%84%BC%E5%B0%82%E9%96%80%E5%BA%97%20%E7%A6%85%20%E6%9C%AC%E5%B9%8C%20%E5%B1%B1%E5%8F%A3%E4%B8%AD%E5%A4%AE%E3%83%93%E3%83%AB']], food: 'zen' }
    ],
    notes: [
      '小樽運河旁與堺町通人行道冬天常結冰，走路放慢、穿防滑鞋。',
      '「禅」20:30 到店，狸小路逛完約 20:15 往店家移動即可。',
      '世壹屋：兩人共食一碗請先詢問店家。'
    ]
  },
  {
    n: 4, date: '2026-12-17', dow: '四', city: '洞爺湖',
    title: '早班 JR 自行前往・把白天留給洞爺湖畔',
    cover: 'toya',
    stay: 1,
    items: [
      { time: '07:40-07:50 出門', kind: 'hotel', title: '東急 Stay 札幌退房 → JR 札幌站', desc: '大通搭南北線往麻生至さっぽろ，¥210。目標 08:20 前到 JR 閘門，買早餐或飲水後上車。', move: '含步行抓 20-25 分', q: 'Sapporo Station', links: [['飯店到札幌站', 'https://www.google.com/maps/dir/?api=1&origin=Tokyu+Stay+Sapporo+Minami+1+Nishi+1+13-4&destination=Sapporo+Station&travelmode=transit']] },
      { time: '08:43→10:38', kind: 'train', tag: '已訂', title: '特急北斗 6 號｜札幌 → JR 洞爺', desc: '已訂普通車指定席 2 位，共 ¥13,380。搭車前先領紙票，QR Code 與取票步驟見 PDF 第 10 頁。', move: '約 1 小時 55 分', q: 'Toya Station', links: [['北斗參考班表', 'https://ekitan.com/zh-tw/planner/limited-express/section/exm-110546/exs-110546002/sf-200/st-310'], ['JR 官方查詢', 'https://www.jrhokkaido.co.jp/global/chinese/train/']] },
      { time: '11:00→11:18', kind: 'bus', title: '道南巴士｜JR 洞爺站 → 洞爺湖溫泉', desc: '到站出閘門，找「洞爺駅前」站牌，搭往洞爺湖温泉，¥400。宜備零錢。', move: '下車再走約 8-12 分至乃之風', q: 'Toyako Onsen Bus Terminal', links: [['巴士官網', 'https://www.donanbus.co.jp/map/toyako_toyakoonsen/'], ['巴士站到飯店', 'https://www.google.com/maps/dir/?api=1&origin=Toyako+Onsen+Bus+Terminal&destination=The+Lake+View+Toya+Nonokaze+Resort&travelmode=walking']] },
      { time: '11:30-14:50', kind: 'spot', title: '乃之風寄放行李 → 午餐與湖畔散步', desc: '先向櫃檯詢問入住前寄放行李。午餐放溫泉街（可參考美食頁的洞爺湖補充推薦），下午走湖畔步道和雕刻公園，天候不佳就縮短戶外。', q: 'Toyako Onsen Lakeside Promenade', links: [['乃之風', 'https://www.google.com/maps/search/?api=1&query=The+Lake+View+Toya+Nonokaze+Resort'], ['湖畔步道', 'https://www.google.com/maps/dir/?api=1&origin=The+Lake+View+Toya+Nonokaze+Resort&destination=Toyako+Onsen+Lakeside+Promenade&travelmode=walking']], img: 'toya' },
      { time: '15:00 起', kind: 'hotel', tag: '待確認', title: '乃之風入住・房內泡湯', desc: '退房為隔天 11:00。入住可問 12/17 晚上兩位私湯是否有空。私湯尚未成功預約，官方每整點開場，16:00-23:00，最後一場 22:00。', q: 'The Lake View Toya Nonokaze Resort', links: [['飯店官方 FAQ', 'https://nonokaze-resort.com/faq/'], ['私湯表單', 'https://nonokaze-resort.com/spa_contact']] },
      { time: '建議 18:00', kind: 'food', title: '乃之風晚餐與溫泉', desc: '若是 Le Vent 自助餐，晚餐約 17:00-21:00，20:30 最後點餐。18:00 為建議用餐時間，實際依入住時分配的場次。', q: 'The Lake View Toya Nonokaze Resort', links: [['餐廳資訊', 'https://nonokaze-resort.com/meal']], food: 'levent' }
    ],
    notes: [
      '晚一班 JR 備案：若沒搭到北斗 6 號，搭北斗 8 號 09:45→11:38。11:43 巴士只差 5 分，帶行李以 12:10→12:26 為穩妥轉乘。若再晚，北斗 10 號 10:56→12:50 接 13:10→13:28。',
      '湖畔風大、體感溫度低，散步時帽子與手套一定要戴。'
    ]
  },
  {
    n: 5, date: '2026-12-18', dow: '五', city: '函館港灣',
    title: '洞爺湖早餐・北斗・幸運小丑・海上聖誕樹',
    cover: 'hakoTree',
    stay: 2,
    items: [
      { time: '08:00-10:45', kind: 'hotel', title: '乃之風早餐、湖畔散步、退房', desc: 'Le Vent 自助早餐 07:00-10:00，建議 08:00 用餐。實際入場時段依飯店通知。餐後看天氣散步，10:45 左右退房。', q: 'The Lake View Toya Nonokaze Resort' },
      { time: '11:40 出門', kind: 'bus', title: '乃之風 → 道南巴士 → JR 洞爺站', desc: '12:01→12:23，¥400，離北斗發車約 27 分。錯過就請飯店協助叫車，12:45 的巴士趕不上。', move: '走 8-12 分到洞爺湖溫泉站', q: 'Toyako Onsen Bus Terminal', links: [['飯店到巴士站', 'https://www.google.com/maps/dir/?api=1&origin=The+Lake+View+Toya+Nonokaze+Resort&destination=Toyako+Onsen+Bus+Terminal&travelmode=walking'], ['回程巴士班表', 'https://www.donanbus.co.jp/map/toyako_toyakoonsen2/']] },
      { time: '12:50→14:40', kind: 'train', tag: '待確認', title: '特急北斗 10 號｜洞爺 → JR 函館站', desc: '直達 1 小時 50 分，指定席參考 ¥6,250。買到「函館」，經新函館北斗後再到函館終點。普通車指定席 2 位待訂。', q: 'Hakodate Station', links: [['JR 官方查詢', 'https://www.jrhokkaido.co.jp/global/chinese/train/'], ['JR 訂票', 'https://www.jrhokkaido.co.jp/global/chinese/ticket/reservation/index.html']] },
      { time: '14:40-15:40', kind: 'hotel', title: '函館國際酒店入住', desc: '15:00 起入住，住三晚含早餐。', move: 'JR 函館站西口出站步行，拖行李抓 10-15 分', q: 'Hakodate Kokusai Hotel', links: [['函館站到飯店', 'https://www.google.com/maps/dir/?api=1&origin=Hakodate+Station&destination=Hakodate+Kokusai+Hotel&travelmode=walking']] },
      { time: '15:40-17:30', kind: 'food', title: '金森紅磚倉庫・幸運小丑', desc: '逛店拍港景。灣區本店點中華雞腿漢堡，10:00-21:00、餐點 LO 20:30。隊伍太長先看點燈。', move: '飯店到灣區步行 10-15 分', q: 'Lucky Pierrot Bay Area Main Store', links: [['飯店到幸運小丑', 'https://www.google.com/maps/dir/?api=1&origin=Hakodate+Kokusai+Hotel&destination=Lucky+Pierrot+Bay+Area+Main+Store&travelmode=walking']], img: 'bayArea', food: 'luckypierrot' },
      { time: '17:35 到海邊', kind: 'event', title: '18:00 海上聖誕樹點燈', desc: '在金森紅磚倉庫旁看點燈，18:30 可看樹變紅。這晚不看花火。', addr: '函館市末廣町 紅磚倉庫群前海上', q: 'Hakodate Christmas Fantasy', links: [['活動官網', 'https://www.hakobura.jp/events/371']], img: 'hakoTree' },
      { time: '18:45 後', kind: 'food', title: 'Hasegawa Store 灣區店 → 飯店', desc: '依食量買小份烤豬肉便當（やきとり弁当）分食。灣區店 07:00-22:00，現點現烤，買完沿港邊回飯店。', q: 'Hasegawa Store Bay Area Hakodate', links: [['灣區店到飯店', 'https://www.google.com/maps/dir/?api=1&origin=Hasegawa+Store+Bay+Area+Hakodate&destination=Hakodate+Kokusai+Hotel&travelmode=walking']], food: 'hasegawa' }
    ],
    notes: [
      '聖誕樹點燈時段：16:30-17:45、18:00-22:00（17:45-18:00 之間會熄燈準備點燈儀式）。',
      '北斗 10 號只有這一班能接 12:01 的巴士，錯過時請飯店協助叫車。'
    ]
  },
  {
    n: 6, date: '2026-12-19', dow: '六', city: '元町・函館山',
    title: '八幡坂・教會群・可麗餅・Yoshiya 洋食・函館夜景',
    cover: 'hakoNight',
    stay: 2,
    items: [
      { time: '08:00-10:00', kind: 'food', tag: '彈性', title: '飯店早餐｜函館朝市彈性', desc: '想逛朝市就 09:30 左右到函館站旁的丼飯橫丁，茶夢 07:00-14:00（Google），可吃海鮮丼。早餐吃飽可直接去元町。', addr: '函館市若松町9-15（茶夢）', q: '朝市の味処 茶夢 函館', links: [['飯店到茶夢', 'https://www.google.com/maps/dir/?api=1&origin=Hakodate+Kokusai+Hotel&destination=%E6%9C%9D%E5%B8%82%E3%81%AE%E5%91%B3%E5%87%A6+%E8%8C%B6%E5%A4%A2+%E5%87%BD%E9%A4%A8&travelmode=walking']], img: 'asaichi', food: 'chamu' },
      { time: '10:15-11:45', kind: 'spot', title: '八幡坂 → 元町教會群 → 元町公園', desc: '積雪時放慢走，教會依當日開放情形入內。', move: '飯店到八幡坂抓 20-25 分，各景點間走 5-12 分', q: 'Hachimanzaka Slope Hakodate', links: [['飯店到八幡坂', 'https://www.google.com/maps/dir/?api=1&origin=Hakodate+Kokusai+Hotel&destination=Hachimanzaka+Slope+Hakodate&travelmode=walking']], img: 'hachiman' },
      { time: '11:45-12:15', kind: 'food', title: 'Angelique Voyage 本店｜現做可麗餅', desc: '本店 10:00-19:00，售完可能提早關。兩人買一份分著吃。', move: '元町公園步行 5-10 分', q: 'Angelique Voyage Hakodate', links: [['公園到可麗餅', 'https://www.google.com/maps/dir/?api=1&origin=Motomachi+Park+Hakodate&destination=Angelique+Voyage+Hakodate&travelmode=walking']], img: 'church', food: 'angelique' },
      { time: '12:15-13:30', kind: 'food', title: 'Yoshiya 日式洋食', desc: '點大炸蝦＋漢堡排，或試牛排。午餐 11:00-15:00（Google）。午餐後回飯店休息。若改吃幸運小丑，選十字街銀座店，10:00-20:00。', move: '可麗餅店走去約 10-15 分', q: 'Restaurant Yoshiya Hakodate', links: [['可麗餅到 Yoshiya', 'https://www.google.com/maps/dir/?api=1&origin=Angelique+Voyage+Hakodate&destination=Restaurant+Yoshiya+Hakodate&travelmode=walking']], food: 'yoshiya' },
      { time: '15:30 出發', kind: 'spot', title: '約 16:00 函館山纜車＋山頂展望台', desc: '纜車來回 ¥1,800，通常 10:00 起，上行末班 20:30、下行末班 21:00。', move: '飯店步行 25-30 分到山麓站，最後有上坡', q: 'Mount Hakodate Ropeway Base Station', links: [['飯店到纜車', 'https://www.google.com/maps/dir/?api=1&origin=Hakodate+Kokusai+Hotel&destination=Mount+Hakodate+Ropeway+Base+Station&travelmode=walking'], ['纜車運行', 'https://334.co.jp/ropeway/']], img: 'hakoNight' },
      { time: '17:00 / 18:00', kind: 'event', tag: '彈性', title: '下山・特別花火可選', desc: '想接 18:00 花火，17:00 開始排下山。', move: '山麓站走 15-20 分到港邊', q: 'Hakodate Christmas Fantasy', img: 'hakoTree' },
      { time: '18:45 後', kind: 'food', tag: '待確認', title: '函館晚餐｜待選', desc: '可吃函館湯咖哩或海鮮居酒屋。想吃熱麵，可把函館站前 HAKODATE NOODLES 炎陣當備案。美食頁另有補充推薦。', q: 'HAKODATE NOODLES 炎陣', links: [['炎陣定位', 'https://www.google.com/maps/search/?api=1&query=HAKODATE+NOODLES+%E7%82%8E%E9%99%A3']], food: 'enjin' }
    ],
    notes: [
      '函館日落約 16 點出頭，16:00 上山可以同時看到黃昏與夜景，週六山頂人潮多，下山纜車可能要排隊。',
      'Angelique Voyage 排定 11:45-12:15、Yoshiya 從 12:15 開始，但兩店之間要走 10-15 分，實際約 12:30 才到 Yoshiya。',
      '元町坡道積雪時很滑，下坡請走慢。'
    ]
  },
  {
    n: 7, date: '2026-12-20', dow: '日', city: '五稜郭・湯之川',
    title: 'あじさい鹽拉麵・看猴子泡湯・湯倉神社・美鈴咖啡',
    cover: 'goryokaku',
    stay: 2,
    items: [
      { time: '08:00-09:30', kind: 'train', title: '早餐 → 市役所前電停', desc: '飯店走約 3 分到電停，搭市電往湯の川方向，五稜郭公園前下車後再走約 10 分。', move: '全程抓 35-45 分', q: 'Goryokaku Tower', links: [['飯店到五稜郭塔', 'https://www.google.com/maps/dir/?api=1&origin=Hakodate+Kokusai+Hotel&destination=Goryokaku+Tower&travelmode=transit'], ['市電運賃', 'https://www.city.hakodate.hokkaido.jp/docs/2014012100946/']] },
      { time: '10:15-11:30', kind: 'spot', title: '五稜郭塔 → 五稜郭公園', desc: '塔 09:00-18:00、17:50 停售票，成人 ¥1,200。上塔看星形，散步視雪況。Peaberry 可留作五稜郭區咖啡備案。', addr: '函館市五稜郭町43-9（五稜郭塔）', q: 'Goryokaku Tower', links: [['五稜郭塔官網', 'https://www.goryokaku-tower.co.jp/price/']], img: 'goryokaku' },
      { time: '11:30-12:30', kind: 'food', title: 'あじさい本店｜味彩鹽拉麵', desc: '11:00 開門、LO 20:25，週日預留排隊。', move: '五稜郭塔步行 2-5 分', addr: '函館市五稜郭町29-22', q: '函館麺厨房あじさい本店', links: [['拉麵店定位', 'https://www.google.com/maps/search/?api=1&query=%E5%87%BD%E9%A4%A8%E9%BA%BA%E5%8E%A8%E6%88%BF%E3%81%82%E3%81%98%E3%81%95%E3%81%84%E6%9C%AC%E5%BA%97']], food: 'ajisai' },
      { time: '12:45-13:30', kind: 'train', title: '五稜郭 → 函館市熱帶植物園', desc: '走到五稜郭公園前，搭市電往湯の川終點，約 15-16 分、¥270。下車步行約 15 分。', move: '含等車整段抓 40-45 分', q: 'Hakodate Tropical Botanical Garden', links: [['拉麵店到植物園', 'https://www.google.com/maps/dir/?api=1&origin=Ajisai+Main+Store+Hakodate&destination=Hakodate+Tropical+Botanical+Garden&travelmode=transit']] },
      { time: '13:30-14:30', kind: 'spot', title: '函館市熱帶植物園｜猴山溫泉', desc: '冬季 09:30-16:30，園方公告 12 月開始猴山溫泉。看猴子和溫室。', stay: '留 45-60 分', q: 'Hakodate Tropical Botanical Garden', links: [['植物園官網', 'https://hako-eco.com/']], img: 'botanical' },
      { time: '14:30-16:30', kind: 'spot', title: '湯倉神社 → 美鈴咖啡湯川店 → 市區', desc: '順訪神社及隔壁美鈴咖啡（10:00-18:00），點咖啡霜淇淋。湯の川搭市電往市區。', move: '植物園走回湯の川站一帶抓 15-20 分', q: 'Yukura Shrine', links: [['植物園到神社', 'https://www.google.com/maps/dir/?api=1&origin=Hakodate+Tropical+Botanical+Garden&destination=Yukura+Shrine&travelmode=walking'], ['美鈴湯川店', 'https://www.google.com/maps/search/?api=1&query=Misuzu+Coffee+Yukawa+Hakodate']], img: 'yukura', food: 'misuzu' },
      { time: '18:00｜已訂', kind: 'food', tag: '已訂', title: '旭川成吉思汗 大黑屋 函館五稜郭店', desc: '2 位，訂位 #54675。大黑屋 5 品套餐含帶骨羊排，飲料放題 90 分鐘，¥7,150／人，共 ¥14,300。飯後搭市電回市役所前，再步行回函館國際酒店。', move: '湯の川搭市電至五稜郭公園前，步行約 2 分到店', addr: '函館市本町21-5 第7LC館 1F', q: '旭川成吉思汗 大黒屋 函館五稜郭店', links: [['五稜郭店定位', 'https://www.google.com/maps/search/?api=1&query=%E6%97%AD%E5%B7%9D%E6%88%90%E5%90%89%E6%80%9D%E6%B1%97%20%E5%A4%A7%E9%BB%92%E5%B1%8B%20%E5%87%BD%E9%A4%A8%E4%BA%94%E7%A8%9C%E9%83%AD%E5%BA%97']], food: 'daikokuya' }
    ],
    notes: [
      '週日あじさい本店排隊較久，可先在五稜郭塔上抽號前先看隊伍長度。'
    ]
  },
  {
    n: 8, date: '2026-12-21', dow: '一', city: '函館 → 台灣',
    title: '星宇航空 JX861｜18:00 函館起飛 → 21:40 桃園第一航廈',
    cover: 'bayArea',
    stay: 2,
    items: [
      { time: '08:00-11:00', kind: 'hotel', title: '飯店早餐、整理行李、退房', desc: '11:00 前退房，先向櫃檯寄放行李。', q: 'Hakodate Kokusai Hotel' },
      { time: '11:00-14:15', kind: 'shop', title: '午餐與最後採買', desc: '到函館站或港灣周邊用餐、補買伴手禮。14:15 左右回函館國際酒店取行李。', q: 'Hakodate Station', img: 'bayArea' },
      { time: '14:45-15:00 出發', kind: 'bus', tag: '待確認', title: '函館國際酒店 → 函館機場', desc: '目標 15:15-15:30 抵達。飯店前機場巴士約 30 分，12/21 確切班次與票價待公布。若沒有合適班次，請飯店協助叫車。', q: 'Hakodate Airport', links: [['機場巴士官方', 'https://www.hakotaxi.co.jp/shuttlebus/index.shtml'], ['飯店到機場', 'https://www.google.com/maps/dir/?api=1&origin=Hakodate+Kokusai+Hotel&destination=Hakodate+Airport&travelmode=transit']], img: 'hkdAirport' },
      { time: '18:00 日本時間', kind: 'flight', title: '星宇航空 JX861｜函館機場 HKD 起飛', desc: 'Airbus A330-900neo，飛行約 4 小時 40 分。', q: 'Hakodate Airport' },
      { time: '21:40 台灣時間', kind: 'flight', tag: '待確認', title: '抵達桃園國際機場 TPE 第一航廈', desc: '領行李、入境。台灣端機場接送待確認。', q: 'Taoyuan International Airport Terminal 1' }
    ],
    notes: [
      '交通預算（兩人）：12/14-16 參考 ¥8,680；12/17 北斗＋道南巴士＋札幌地鐵約 ¥14,600；12/18 北斗＋道南巴士約 ¥13,300。函館市電、纜車、門票、機場巴士與團費另計。',
      '液體、刀具與伴手禮中的果醬類請放託運行李。'
    ]
  }
];

/* ---------- 餐廳 ----------
   status：'已訂'｜'行程內'｜'備案'｜'補充推薦'
   營業時間、公休查不到可靠資料時寫 '待確認'，不要自己猜。
   photo：可填照片網址，例如自己在 Google Maps 存的圖。留空會顯示插畫。 */
const FOODS = {
  toriton:   { name: 'Toriton 回轉壽司 北8条光星店', area: '札幌', day: 1, type: '回轉壽司', status: '行程內', hours: '11:00-22:00', closed: '無固定公休', price: '約 ¥2,000-4,000／人', dish: '干貝、鮭魚卵、鮪魚', dist: '飯店搭地鐵 6 分＋步行 12-15 分', addr: '札幌市東區北8条東5丁目19-1', q: 'Toriton Kita 8 Jo Kosei' },
  bonanza:   { name: 'BONANZA 湯咖哩', area: '札幌', day: 1, type: '湯咖哩', status: '備案', hours: '11:30-15:00、17:00-20:15', closed: '無固定公休', price: '待確認', dish: '兩人分一份', dist: 'Toriton 步行 10-15 分', addr: '札幌市東區北7条東3丁目15-23 Town Royal 73 1F', q: 'Bonanza Soup Curry Sapporo' },
  espressod: { name: 'Espresso D Works（COCONO SUSUKINO）', area: '札幌', day: 2, type: '咖啡外帶', status: '行程內', hours: '08:00-24:00（週日至 23:00）', closed: '無固定公休', price: '待確認', dish: '咖啡、布丁（布丁外帶現場問）', dist: '飯店步行 10-15 分', q: 'Espresso D Works COCONO SUSUKINO' },
  seicomart: { name: 'Seicomart THE KNOT 札幌店', area: '札幌', day: 2, type: '便利商店宵夜', status: '行程內', hours: '24 小時', closed: '無', price: '¥500 內', dish: 'Hot Chef 炸雞、熱飯糰、豬排丼', dist: '回飯店走 8-12 分', q: 'Seicomart THE KNOT Sapporo' },
  hokudai:   { name: '北大 Marche Café & Labo', area: '札幌', day: 3, type: '咖啡・乳製甜點', status: '行程內', hours: '10:00-16:00', closed: '無固定公休', price: '北大牛乳 ¥600；甜點套餐約 ¥1,500', dish: '北大牛乳、自製 Gelato、乳製甜點', dist: '飯店步行 30-40 分', addr: '札幌市北區北9条西5丁目 北海道大學百年紀念會館 1F', q: 'Hokudai Marche Cafe and Labo' },
  garaku:    { name: 'GARAKU sitatte sapporo', area: '札幌', day: 3, type: '湯咖哩', status: '行程內', hours: '11:30-15:00、17:00-20:30', closed: '無固定公休', price: '約 ¥1,400-1,700', dish: '雞腿蔬菜、炙燒豬角煮', dist: '北大步行 18-25 分；到 JR 月台 10-15 分', q: 'Soup Curry GARAKU sitatte sapporo' },
  zen:       { name: '札幌「禅」壽喜燒', area: '札幌', day: 3, type: '壽喜燒', status: '已訂', hours: '17:00-23:00（訂位 20:30 到店）', closed: '無固定公休', price: '套餐 ¥11,000／人', dish: '壽喜燒套餐', dist: '狸小路步行約 10 分', addr: '札幌市中央區南2条西1丁目 山口中央大樓 B1F', q: '牛しゃぶ・すき焼専門店 禅 札幌 山口中央ビル' },
  garakuMain:{ name: 'SOUPCURRY GARAKU 札幌本店', area: '札幌', day: 3, type: '湯咖哩', status: '補充推薦', hours: '11:30-15:00、17:00-20:30', closed: '無固定公休', price: '約 ¥1,390-1,640', dish: '柔嫩雞腿蔬菜、炙燒豬角煮', dist: '東急 Stay 札幌步行約 5-8 分', addr: '札幌市中央區南2条西2丁目6-1 おくむらビル B1', q: 'SOUPCURRY GARAKU Sapporo Main Store', why: 'sitatte 店排隊太久時的同品牌備案，離飯店更近。' },
  letao:     { name: 'LeTAO 本店', area: '小樽', day: 3, type: '甜點', status: '行程內', hours: '09:00-18:00', closed: '無固定公休', price: '待確認', dish: '霜淇淋、雙層乳酪蛋糕', dist: '音樂盒堂過街即到', q: 'LeTAO Main Store Otaru' },
  yoichiya:  { name: '世壹屋 海膽專門店 小樽運河店', area: '小樽', day: 3, type: '海膽丼', status: '行程內', hours: '10:00-17:00', closed: '無固定公休', price: '五大海膽比較丼 ¥7,150；頂級款可達 ¥16,500', dish: '海膽丼（兩人共食先問）', dist: '北一 Hall 沿堺町通走 12-18 分', addr: '小樽市堺町2-18', q: 'Yoichiya Otaru Canal' },
  naruto:    { name: '若鶏時代なると 本店', area: '小樽', day: 3, type: '炸半雞', status: '補充推薦', hours: '11:00-21:00', closed: '無固定公休', price: '若鶏半身揚 約 ¥980（參考價）', dish: '若鶏半身揚（可外帶）', dist: '小樽站步行約 6-7 分', addr: '小樽市稲穂3丁目16-13', q: 'Wakadori Jidai Naruto Main Store Otaru', why: '小樽人的靈魂食物，就在回小樽站的路上，可外帶到車上或當宵夜。' },
  levent:    { name: '乃之風 Le Vent 自助餐', area: '洞爺湖', day: 4, type: '飯店自助餐', status: '行程內', hours: '晚餐約 17:00-21:00（LO 20:30）；早餐 07:00-10:00', closed: '—', price: '含於住宿（以訂房內容為準）', dish: '自助晚餐', dist: '飯店內', q: 'The Lake View Toya Nonokaze Resort' },
  boyotei:   { name: 'Restaurant 望羊蹄', area: '洞爺湖', day: 4, type: '老字號洋食', status: '補充推薦', hours: '11:00-14:30、17:00-19:30（週四午餐至 14:00）', closed: '週三', price: '約 ¥2,000-2,500', dish: '豬排 Pork Chop', dist: '洞爺湖溫泉巴士總站步行約 3 分', addr: '虻田郡洞爺湖町洞爺湖溫泉36-12', q: 'Restaurant Boyotei Toyako', why: '1946 年開業的洋食店，正好解決 12/17 午餐「放溫泉街」還沒決定的空檔。12/17 是週四，午餐只到 14:00。' },
  mogmog:    { name: 'Soup Curry mog mog', area: '洞爺湖', day: 4, type: '湯咖哩', status: '補充推薦', hours: '11:00-14:30、18:00-20:30（週二僅午餐）', closed: '週三', price: '待確認', dish: '湯咖哩', dist: '洞爺湖溫泉街內', addr: '虻田郡洞爺湖町洞爺湖溫泉124-4', q: 'Soup Curry mog mog Toyako', why: '12/17 是週四有營業（午餐 11:00-14:30），想吃熱湯可選這家。' },
  luckypierrot: { name: '幸運小丑 灣區本店', area: '函館', day: 5, type: '漢堡', status: '行程內', hours: '10:00-21:00', closed: '無固定公休', price: '約 ¥500-1,000', dish: '中華雞腿漢堡', dist: '飯店步行 10-15 分', q: 'Lucky Pierrot Bay Area Main Store' },
  hasegawa:  { name: 'Hasegawa Store 灣區店', area: '函館', day: 5, type: '烤肉便當', status: '行程內', hours: '07:00-22:00', closed: '無固定公休', price: '約 ¥500-1,000', dish: 'やきとり弁当（小份分食）', dist: '沿港邊走回飯店', q: 'Hasegawa Store Bay Area Hakodate' },
  chamu:     { name: '朝市の味処 茶夢', area: '函館', day: 6, type: '海鮮丼・定食', status: '行程內', hours: '07:00-14:00', closed: '無固定公休', price: '約 ¥1,200-2,000', dish: '海鮮丼、花枝生魚片定食（附多道小菜）', dist: '函館站步行 1-2 分', addr: '函館市若松町9-15', q: '朝市の味処 茶夢 函館' },
  kikuyo:    { name: 'きくよ食堂 本店', area: '函館', day: 6, type: '海鮮丼', status: '補充推薦', hours: '06:00-14:00', closed: '無固定公休', price: '待確認', dish: '元祖函館巴丼（海膽、鮭魚卵、干貝）', dist: '函館站步行約 2-3 分', addr: '函館市若松町11-15', q: 'Kikuyo Shokudo Main Store Hakodate', why: '函館朝市海鮮丼的始祖，茶夢客滿時的替代。' },
  angelique: { name: 'Angelique Voyage 本店', area: '函館', day: 6, type: '可麗餅', status: '行程內', hours: '10:00-19:00（售完提早關）', closed: '無固定公休', price: '待確認', dish: '現做可麗餅（兩人分一份）', dist: '元町公園步行 5-10 分', q: 'Angelique Voyage Hakodate' },
  yoshiya:   { name: 'Yoshiya 日式洋食', area: '函館', day: 6, type: '洋食', status: '行程內', hours: '11:00-15:00；晚餐 17:00-19:30 只在週三、六、日、一', closed: '無固定公休（12/19 週六午晚餐都有）', price: '待確認', dish: '大炸蝦＋漢堡排、牛排', dist: '可麗餅店步行 10-15 分', q: 'Restaurant Yoshiya Hakodate' },
  enjin:     { name: 'HAKODATE NOODLES 炎陣', area: '函館', day: 6, type: '拉麵', status: '備案', hours: '11:00-14:30、17:00-20:30', closed: '週日（12/19 週六有開）', price: '待確認', dish: '鹽拉麵', dist: '函館站步行約 2 分', addr: '函館市若松町14-10', q: 'HAKODATE NOODLES 炎陣' },
  goshoken:  { name: '五島軒本店 Restaurant 雪河亭', area: '函館', day: 6, type: '百年洋食', status: '補充推薦', hours: '11:30-15:00、17:00-20:30', closed: '週二', price: '午 ¥2,000-3,000／晚 ¥3,000-4,000', dish: '明治洋食＆咖哩套餐', dist: '函館山纜車山麓站步行約 10 分；十字街電停步行 5 分', addr: '函館市末廣町4-5', q: 'Gotoken Main Store Hakodate', why: '1879 年創業，下函館山後走路就到，適合 12/19「晚餐待選」。' },
  ajisaiBay: { name: '函館麺厨房あじさい 紅店', area: '函館', day: 6, type: '鹽拉麵', status: '補充推薦', hours: '11:00-22:00', closed: '週四（本週顯示休息）', price: '約 ¥1,000-1,500', dish: '味彩鹽拉麵', dist: '金森紅磚倉庫旁、看完花火步行即到', addr: '函館市豐川町12-7 函館 Bay 美食俱樂部', q: 'Ajisai Kurenai Hakodate Bay', why: '12/19 看完 18:00 花火後最近的熱湯麵；若想把 12/20 本店改成別的行程也可來這。' },
  ajisai:    { name: '函館麺厨房あじさい 本店', area: '函館', day: 7, type: '鹽拉麵', status: '行程內', hours: '11:00-20:25', closed: '本週顯示週三休（12/20 週日有開）', price: '味彩鹽拉麵 約 ¥1,080', dish: '味彩鹽拉麵', dist: '五稜郭塔步行 2-5 分', addr: '函館市五稜郭町29-22', q: '函館麺厨房あじさい本店' },
  misuzu:    { name: '美鈴咖啡 湯川店', area: '函館', day: 7, type: '咖啡', status: '行程內', hours: '10:00-18:00', closed: '無固定公休', price: '待確認', dish: '咖啡霜淇淋', dist: '湯倉神社隔壁', q: 'Misuzu Coffee Yukawa Hakodate' },
  daikokuya: { name: '旭川成吉思汗 大黑屋 函館五稜郭店', area: '函館', day: 7, type: '成吉思汗烤羊肉', status: '已訂', hours: '16:00-23:30', closed: '無固定公休', price: '5 品套餐＋飲料放題 ¥7,150／人', dish: '帶骨羊排', dist: '五稜郭公園前電停步行約 2 分', addr: '函館市本町21-5 第7LC館 1F', q: '旭川成吉思汗 大黒屋 函館五稜郭店' }
};

/* ---------- 預算分類（金額為台幣預算，可在網站上直接修改） ---------- */
const BUDGET_CATS = [
  { id: 'flight', name: '機票', budget: 0 },
  { id: 'car', name: '租車', budget: 0 },
  { id: 'hotel', name: '住宿', budget: 0 },
  { id: 'etc', name: 'ETC／高速公路費', budget: 0 },
  { id: 'fuel', name: '油錢', budget: 0 },
  { id: 'food', name: '餐飲', budget: 0 },
  { id: 'shop', name: '購物', budget: 0 },
  { id: 'ticket', name: '景點門票', budget: 0 },
  { id: 'transport', name: '交通（JR／巴士／市電）', budget: 0 },
  { id: 'other', name: '其他支出', budget: 0 }
];

/* 預設帶入的支出（PDF 已確定的金額）。第一次開網站時會自動放進預算表，之後可自由修改。 */
const BUDGET_SEED = [
  { date: '2026-12-16', cat: 'food', item: '札幌「禅」壽喜燒 2 位', amount: 22000, cur: 'JPY', payer: '未指定', split: 'share', note: 'PDF 已訂' },
  { date: '2026-12-17', cat: 'transport', item: '特急北斗 6 號 札幌→洞爺 2 位', amount: 13380, cur: 'JPY', payer: '未指定', split: 'share', note: 'PDF 已訂' },
  { date: '2026-12-20', cat: 'food', item: '大黑屋函館五稜郭店 2 位', amount: 14300, cur: 'JPY', payer: '未指定', split: 'share', note: 'PDF 已訂 #54675' }
];

/* ---------- 旅行清單 ---------- */
const CHECKLIST = [
  { group: '護照及重要文件', items: ['護照（效期 6 個月以上）', 'Visit Japan Web 入境資料填寫', '日幣現金與信用卡', '海外旅平險保單', '飯店訂房確認（東急 Stay、乃之風、函館國際）'] },
  { group: '機票及交通文件', items: ['CI130 去程電子機票', 'JX861 回程電子機票', '12/15 美瑛富良野一日遊憑證', '12/17 北斗 6 號取票資料（PDF 第 10 頁）', '12/18 北斗 10 號指定席（購買後填這裡）', '台灣端機場接送資訊'] },
  { group: '保暖衣物', items: ['發熱衣褲 ×2 套', '羽絨外套（防風防潑水）', '毛衣或刷毛中層', '厚襪子', '暖暖包（貼式＋手握）'] },
  { group: '防滑鞋', items: ['防水防滑雪靴', '簡易冰爪（鞋底防滑釘）'] },
  { group: '手套、圍巾、帽子', items: ['觸控手套', '圍巾或脖圍', '毛帽（可蓋耳朵）'] },
  { group: '相機及充電設備', items: ['手機與充電線', '行動電源（隨身，不可託運）', '相機與備用電池（低溫耗電快）', '日本 eSIM／網卡', '轉接頭（日本 A 型兩孔，可直接用）'] },
  { group: '盥洗用品', items: ['保濕乳液與護唇膏（非常乾燥）', '個人藥品', '隱形眼鏡用品'] },
  { group: '雪地自駕用品', items: ['（PDF 行程無自駕，如改租車再勾選）國際駕照＋台灣駕照', '確認租車含冬季雪胎與 ETC 卡', '車用手機架', '雪刷（租車通常附）'] },
  { group: '出發前確認事項', items: ['11/18 09:00（台灣時間）購買 12/18 北斗 10 號指定席 2 位', '確認 12/15 一日遊報到位置、發車時間、團費', '詢問乃之風 12/17 私湯（16:00-23:00 整點場）', '查 12/21 飯店→函館機場巴士班次', '兌換日幣、開通信用卡海外交易', '下載 Google Maps 離線地圖（札幌、小樽、洞爺湖、函館）'] }
];

/* ---------- 天氣地點 ---------- */
const WEATHER_PLACES = [
  { name: '札幌', en: 'Sapporo', lat: 43.0618, lon: 141.3545, days: '12/14–12/17' },
  { name: '小樽', en: 'Otaru', lat: 43.1907, lon: 140.9947, days: '12/16' },
  { name: '美瑛', en: 'Biei', lat: 43.5883, lon: 142.4670, days: '12/15' },
  { name: '洞爺湖溫泉', en: 'Toyako Onsen', lat: 42.5650, lon: 140.8187, days: '12/17–12/18' },
  { name: '函館', en: 'Hakodate', lat: 41.7687, lon: 140.7290, days: '12/18–12/21' }
];

/* ---------- 行前待確認／PDF 矛盾提醒 ---------- */
const ISSUES = [
  { level: '急', title: '12/18 北斗 10 號指定席：11/18 台灣時間 09:00 開賣', text: 'PDF 第 10 頁註明普通車指定席 2 位待訂，開賣時間為日本時間 10:00。' },
  { level: '矛盾', title: '交通方式：需求寫「自駕」，PDF 全程大眾運輸', text: 'PDF 沒有租車，全程以 JR、地鐵、道南巴士、市電與一日遊團移動。網站依 PDF 製作，預算保留「租車／ETC／油錢」類別，用不到填 0 即可。若之後改成自駕，請告訴我再調整路線與停車資訊。' },
  { level: '矛盾', title: '天數：需求同時寫了「六天五夜」與「八天七夜」', text: '12/14–12/21 實際為 8 天 7 夜，PDF 也有 Day 1–Day 8，網站以 8 天 7 夜呈現。' },
  { level: '確認', title: '12/15 一日遊細節', text: '報到 11:20／發車 11:30、北口乘車區 5 號都是暫填，團費、景點順序、青池是否看點燈需看憑證。' },
  { level: '時間', title: '12/19 可麗餅 → Yoshiya 的時間重疊', text: 'Angelique Voyage 排 11:45-12:15，Yoshiya 從 12:15 開始，但兩店之間步行 10-15 分，實際約 12:30 到。Yoshiya 午餐 LO 14:00，影響不大。' },
  { level: '待補', title: '台灣端機場接送（去回程）', text: '上車地點、時間、車資待補。' },
  { level: '待補', title: '乃之風私湯', text: '尚未成功預約，入住時再問 12/17 晚上兩位是否有空。' },
  { level: '待補', title: '12/21 機場巴士', text: '確切班次與票價待公布；若沒有合適班次，請飯店協助叫車。' },
  { level: '安全', title: 'JR 取票代碼沒有放上網站', text: '網站可以用網址分享，為避免他人看到後代領車票，PDF 第 10 頁的預約號碼與取票代碼沒有放進網站，請直接用 PDF 或電子郵件取票。' }
];

/* ---------- 冬季安全提醒（每日頁與天氣頁會顯示） ---------- */
const WINTER_TIPS = [
  { t: '日落很早', d: '12 月中札幌、函館日落約 16:00 出頭，戶外景點與拍照盡量排在 15:30 前。網站每日頁有自動計算的日出日落時間。' },
  { t: '人行道結冰', d: '北海道冬季人行道常是光滑的壓實雪或冰面，鞋底要有防滑紋，下坡（函館元町、小樽堺町）放慢腳步，雙手不要插口袋。' },
  { t: 'JR 與巴士延誤', d: '暴風雪時 JR 特急可能延誤或停駛，出發前查 JR 北海道運行資訊；轉乘時間抓寬一點。' },
  { t: '室內外溫差', d: '室內暖氣很強，洋蔥式穿法最方便；低溫下手機與相機電池掉得很快，行動電源放內側口袋。' },
  { t: '若改成自駕', d: '確認租車含冬季雪胎；雪地車速放慢、跟車距離拉長，留意路面看起來濕亮的「黑冰」；天黑後山區路段盡量不要開。' }
];

const LINKS_SAFETY = [
  ['JR 北海道 運行資訊', 'https://www3.jrhokkaido.co.jp/webunkou/'],
  ['日本氣象廳 警報・注意報', 'https://www.jma.go.jp/bosai/warning/'],
  ['日本氣象廳 天氣預報', 'https://www.jma.go.jp/bosai/forecast/'],
  ['tenki.jp 北海道', 'https://tenki.jp/forecast/1/'],
  ['台灣銀行 牌告匯率', 'https://rate.bot.com.tw/xrt?Lang=zh-TW']
];
