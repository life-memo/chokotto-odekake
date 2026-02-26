import React, { useState } from 'react';
import { MapPin, RefreshCw, Star } from 'lucide-react';

const destinations = [
  {
    prefecture: '北海道',
    city: '富良野市',
    reason: '一面に広がるラベンダー畑と牧草地。子供が思いきり走り回れる広大な自然が魅力。',
  },
  {
    prefecture: '北海道',
    city: '斜里町（知床）',
    reason: '世界遺産の大自然。クルーズ船から野生のヒグマやシャチを間近に観察できる。',
  },
  {
    prefecture: '北海道',
    city: '函館市',
    reason: '朝市でイカをさばく体験や海鮮丼。元町の坂と夜景を歩いて旅情たっぷり。',
  },
  {
    prefecture: '青森県',
    city: '弘前市',
    reason: '弘前城の桜まつりとりんご狩り体験。津軽の食文化と歴史が子供の記憶に残る。',
  },
  {
    prefecture: '岩手県',
    city: '平泉町',
    reason: '世界遺産・中尊寺金色堂。奥州藤原氏の栄華と平安の歴史を親子で学べる。',
  },
  {
    prefecture: '秋田県',
    city: '仙北市',
    reason: '角館の武家屋敷と桜並木、田沢湖の透明な水。東北の四季と文化が凝縮されている。',
  },
  {
    prefecture: '山形県',
    city: '鶴岡市',
    reason: '羽黒山の杉並木は圧巻の雰囲気。庄内米や芋煮など豊かな食文化も楽しめる。',
  },
  {
    prefecture: '栃木県',
    city: '日光市',
    reason: '華厳の滝と戦場ヶ原の湿原ハイキング。大自然の中で子供と本物の絶景に出会える。',
  },
  {
    prefecture: '群馬県',
    city: '草津町',
    reason: '日本一の温泉地で湯もみ体験。湯畑の迫力は子供も圧倒される温泉街の原風景。',
  },
  {
    prefecture: '新潟県',
    city: '佐渡市',
    reason: 'トキが舞う島で金山遺跡を探検。島を丸ごとアドベンチャーできる非日常の体験。',
  },
  {
    prefecture: '新潟県',
    city: '湯沢町',
    reason: '冬はスキー、夏は高原ハイキング。雪遊びと川遊びの両方が楽しめる山の町。',
  },
  {
    prefecture: '長野県',
    city: '大町市',
    reason: '黒部ダムの圧倒的スケールと北アルプスの絶景。子供の「でかい！」が止まらない。',
  },
  {
    prefecture: '長野県',
    city: '松本市',
    reason: '国宝・松本城と城下町散策、そば打ち体験。信州の食と歴史がぎゅっと詰まった街。',
  },
  {
    prefecture: '山梨県',
    city: '山中湖村',
    reason: '富士山を望む湖畔でカヌーや釣り体験。雄大な富士の姿が子供の心に刻まれる。',
  },
  {
    prefecture: '静岡県',
    city: '伊豆市',
    reason: '浄蓮の滝とわさび田の散策、海沿いのドライブ。伊豆の豊かな自然と海鮮グルメを満喫。',
  },
  {
    prefecture: '石川県',
    city: '金沢市',
    reason: '兼六園と東茶屋街の散策、金箔体験。加賀百万石の文化を親子でじっくり味わえる。',
  },
  {
    prefecture: '岐阜県',
    city: '白川村',
    reason: '世界遺産の合掌造り集落。冬のライトアップは息をのむ絶景で、子供の感性が育つ。',
  },
  {
    prefecture: '滋賀県',
    city: '長浜市',
    reason: '琵琶湖のほとりでカヤック体験、黒壁スクエアでガラス工芸。湖の大きさに子供も驚く。',
  },
  {
    prefecture: '三重県',
    city: '伊勢市',
    reason: '伊勢神宮参拝とおかげ横丁の食べ歩き。日本のこころを親子で感じる旅。',
  },
  {
    prefecture: '京都府',
    city: '京都市',
    reason: '千年の歴史と嵐山の竹林、着物での散策。日本の原風景が子供の記憶に深く刻まれる。',
  },
  {
    prefecture: '奈良県',
    city: '奈良市',
    reason: '奈良公園で鹿に直接えさやり、東大寺の大仏の迫力。自然と歴史が共存する唯一の場所。',
  },
  {
    prefecture: '和歌山県',
    city: '白浜町',
    reason: '透明度抜群の白良浜ビーチと熊野の大自然。海と山の両方が楽しめる南紀の旅。',
  },
  {
    prefecture: '兵庫県',
    city: '城崎温泉',
    reason: '外湯めぐりと温泉街の下駄散歩。浴衣で街を歩く体験は子供も大喜びの思い出に。',
  },
  {
    prefecture: '広島県',
    city: '廿日市市（宮島）',
    reason: '世界遺産・厳島神社と海の上の鳥居。潮が引いた砂浜で鹿と一緒に歩ける特別な島。',
  },
  {
    prefecture: '岡山県',
    city: '倉敷市',
    reason: '美観地区の白壁と柳並木を川下り体験。のどかな水郷の景色に心がほっこりする。',
  },
  {
    prefecture: '島根県',
    city: '出雲市',
    reason: '出雲大社の厳かな雰囲気と出雲そば体験。日本最古の神話の地で歴史ロマンを感じる。',
  },
  {
    prefecture: '香川県',
    city: '小豆島町',
    reason: 'オリーブ畑と迷路のまちを散策、海沿いサイクリング。うどん打ち体験も楽しい島旅。',
  },
  {
    prefecture: '高知県',
    city: '四万十市',
    reason: '日本最後の清流・四万十川でカヌー体験と川遊び。水の透明さに子供が歓声をあげる。',
  },
  {
    prefecture: '福岡県',
    city: '糸島市',
    reason: '美しい海岸線と冬の牡蠣小屋体験、糸島グルメ。都市から近い海の絶景リゾート。',
  },
  {
    prefecture: '長崎県',
    city: '島原市',
    reason: '湧水の街と雲仙の温泉・火山地帯。九州の自然の力を体感できる旅。',
  },
  {
    prefecture: '熊本県',
    city: '阿蘇市',
    reason: '世界最大級のカルデラと広大な草原。大地の息吹を感じる火山の景観は子供も大興奮。',
  },
  {
    prefecture: '大分県',
    city: '別府市',
    reason: '地獄めぐりで迫力の温泉を見学し、家族で温泉文化を体感。湯煙の迫力は本物。',
  },
  {
    prefecture: '宮崎県',
    city: '高千穂町',
    reason: '高千穂峡でボート体験と滝の絶景。神話の地で日本の原風景と伝説に触れられる。',
  },
  {
    prefecture: '鹿児島県',
    city: '屋久島町',
    reason: '縄文杉と苔むす神秘の森。世界遺産の大自然の中で本物の大冒険ができる島。',
  },
  {
    prefecture: '鹿児島県',
    city: '指宿市',
    reason: '砂蒸し温泉は子供も大喜びの珍体験。知林ヶ島への砂州渡りも潮が引いたときだけの奇跡。',
  },
  {
    prefecture: '沖縄県',
    city: '竹富島',
    reason: '水牛車と星砂の浜、琉球の原風景。車が走らない島でのんびり沖縄文化を体感できる。',
  },
  {
    prefecture: '沖縄県',
    city: '本部町',
    reason: '珊瑚礁の透明な海でシュノーケリング、備瀬のフクギ並木散策。沖縄の自然を全身で感じる。',
  },
];

function getRandomDestination(current) {
  let next;
  do {
    next = destinations[Math.floor(Math.random() * destinations.length)];
  } while (current && next.prefecture === current.prefecture && next.city === current.city);
  return next;
}

export default function FamilyTripRecommender() {
  const [result, setResult] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);

  const handleRecommend = () => {
    setIsSpinning(true);
    setTimeout(() => {
      setResult(getRandomDestination(result));
      setIsSpinning(false);
    }, 600);
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.header}>
          <MapPin size={32} color="#f97316" />
          <h1 style={styles.title}>子連れ旅行、どこ行く？</h1>
          <p style={styles.subtitle}>ボタンを押せば行き先を決めてあげます！</p>
        </div>

        {!result && (
          <button
            onClick={handleRecommend}
            disabled={isSpinning}
            style={{
              ...styles.button,
              ...(isSpinning ? styles.buttonDisabled : {}),
            }}
          >
            <RefreshCw
              size={22}
              style={{
                marginRight: 8,
                animation: isSpinning ? 'spin 0.6s linear' : 'none',
                display: 'inline-block',
                verticalAlign: 'middle',
              }}
            />
            行き先を決める！
          </button>
        )}

        {result && (
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <Star size={18} color="#f97316" fill="#f97316" />
              <span style={styles.cardHeaderText}>おすすめの行き先</span>
              <Star size={18} color="#f97316" fill="#f97316" />
            </div>
            <div style={styles.location}>
              <span style={styles.prefecture}>{result.prefecture}</span>
              <span style={styles.arrow}>›</span>
              <span style={styles.city}>{result.city}</span>
            </div>
            <div style={styles.divider} />
            <p style={styles.reason}>{result.reason}</p>
            <button
              onClick={handleRecommend}
              disabled={isSpinning}
              style={{
                ...styles.retryButton,
                ...(isSpinning ? styles.retryButtonDisabled : {}),
              }}
            >
              <RefreshCw
                size={16}
                style={{
                  marginRight: 6,
                  animation: isSpinning ? 'spin 0.6s linear' : 'none',
                  display: 'inline-block',
                  verticalAlign: 'middle',
                }}
              />
              やり直し
            </button>
          </div>
        )}

        <p style={styles.footer}>全国{destinations.length}か所の中からランダムにピックアップ</p>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #fff7ed 0%, #fef3c7 50%, #ecfdf5 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px 16px',
    fontFamily: "'Hiragino Kaku Gothic ProN', 'Noto Sans JP', sans-serif",
  },
  container: {
    maxWidth: 480,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 24,
  },
  header: {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: 800,
    color: '#1c1917',
    margin: 0,
    letterSpacing: '-0.5px',
  },
  subtitle: {
    fontSize: 15,
    color: '#78716c',
    margin: 0,
  },
  button: {
    background: 'linear-gradient(135deg, #f97316, #ef4444)',
    color: '#fff',
    border: 'none',
    borderRadius: 16,
    padding: '18px 40px',
    fontSize: 18,
    fontWeight: 700,
    cursor: 'pointer',
    boxShadow: '0 4px 20px rgba(249,115,22,0.4)',
    transition: 'transform 0.1s, box-shadow 0.1s',
    letterSpacing: '0.5px',
    display: 'flex',
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.7,
    cursor: 'not-allowed',
    boxShadow: '0 2px 10px rgba(249,115,22,0.2)',
  },
  card: {
    background: '#fff',
    borderRadius: 20,
    padding: '28px 32px',
    width: '100%',
    boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
    border: '2px solid #fed7aa',
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  cardHeaderText: {
    fontSize: 13,
    fontWeight: 600,
    color: '#f97316',
    letterSpacing: '1px',
  },
  location: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    flexWrap: 'wrap',
  },
  prefecture: {
    fontSize: 20,
    fontWeight: 700,
    color: '#ea580c',
    background: '#fff7ed',
    padding: '6px 16px',
    borderRadius: 99,
    border: '2px solid #fed7aa',
  },
  arrow: {
    fontSize: 24,
    color: '#d1d5db',
    fontWeight: 300,
  },
  city: {
    fontSize: 26,
    fontWeight: 800,
    color: '#1c1917',
  },
  divider: {
    height: 1,
    background: '#f3f4f6',
    borderRadius: 99,
  },
  reason: {
    fontSize: 15,
    lineHeight: 1.8,
    color: '#44403c',
    margin: 0,
    textAlign: 'center',
  },
  retryButton: {
    background: 'none',
    color: '#f97316',
    border: '2px solid #fed7aa',
    borderRadius: 12,
    padding: '10px 24px',
    fontSize: 15,
    fontWeight: 700,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background 0.15s',
    alignSelf: 'center',
  },
  retryButtonDisabled: {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
  footer: {
    fontSize: 12,
    color: '#a8a29e',
    margin: 0,
  },
};
