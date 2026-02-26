import React, { useState } from 'react';
import { MapPin, RefreshCw, Star } from 'lucide-react';

const destinations = [
  {
    prefecture: '北海道',
    city: '富良野市',
    reason: '広大なラベンダー畑と大自然。子供が走り回れる広い草原、牧場体験も楽しめます。',
  },
  {
    prefecture: '北海道',
    city: '函館市',
    reason: '夜景・朝市・イカ釣り体験。子供向け体験型施設が充実し、海鮮グルメも絶品。',
  },
  {
    prefecture: '青森県',
    city: '青森市',
    reason: 'ねぶた祭りの迫力や三内丸山遺跡で縄文文化を体験。りんご狩りも人気。',
  },
  {
    prefecture: '宮城県',
    city: '仙台市',
    reason: 'うみの杜水族館で海の生き物と触れ合い。七夕まつりは子供も大喜び。',
  },
  {
    prefecture: '福島県',
    city: 'いわき市',
    reason: 'スパリゾートハワイアンズで一年中水遊び。アクアマリンふくしまも人気の水族館。',
  },
  {
    prefecture: '栃木県',
    city: '日光市',
    reason: '東照宮の壮大な建築と華厳の滝。自然豊かで温泉もあり、ファミリーに最適。',
  },
  {
    prefecture: '群馬県',
    city: '草津町',
    reason: '日本一の温泉地。家族で湯もみ体験ができ、周辺の自然景観も素晴らしい。',
  },
  {
    prefecture: '千葉県',
    city: '浦安市',
    reason: '東京ディズニーリゾートの夢の世界。子供の笑顔が溢れる最高の思い出づくり。',
  },
  {
    prefecture: '神奈川県',
    city: '横浜市',
    reason: 'みなとみらいの夜景、八景島シーパラダイス。中華街でグルメも楽しめる。',
  },
  {
    prefecture: '山梨県',
    city: '富士吉田市',
    reason: '富士山を間近に望む絶景。富士急ハイランドのスリルと河口湖の自然を満喫。',
  },
  {
    prefecture: '長野県',
    city: '軽井沢町',
    reason: '涼しい高原リゾート。アウトレットや自然体験施設が充実し、家族で一日中楽しめる。',
  },
  {
    prefecture: '長野県',
    city: '松本市',
    reason: '国宝・松本城と美しい街並み。アルプス公園で子供が思いきり遊べる。',
  },
  {
    prefecture: '静岡県',
    city: '浜松市',
    reason: '浜名湖体験学習施設やアクトシティ。うなぎグルメも外せない。',
  },
  {
    prefecture: '愛知県',
    city: '名古屋市',
    reason: 'レゴランドジャパンで大興奮。名古屋城や科学館など教育的な施設も多い。',
  },
  {
    prefecture: '三重県',
    city: '伊勢市',
    reason: '伊勢神宮参拝と食べ歩き。おかげ横丁の食文化を子供と一緒に体験できる。',
  },
  {
    prefecture: '三重県',
    city: '鳥羽市',
    reason: '鳥羽水族館は日本最大級。ジュゴンや珍しい深海魚に子供が釘付けに。',
  },
  {
    prefecture: '京都府',
    city: '京都市',
    reason: '千年の歴史と文化。着物体験や金閣寺、嵐山など子供の記憶に残る日本の原風景。',
  },
  {
    prefecture: '大阪府',
    city: '大阪市',
    reason: 'ユニバーサル・スタジオ・ジャパンで大冒険。たこ焼きやお好み焼きも子供に大人気。',
  },
  {
    prefecture: '兵庫県',
    city: '神戸市',
    reason: '神戸どうぶつ王国や須磨海浜水族園。異国情緒あふれる街並みで家族旅行を満喫。',
  },
  {
    prefecture: '奈良県',
    city: '奈良市',
    reason: '奈良公園の鹿と触れ合い。東大寺の大仏の迫力は子供に大きな感動を与えます。',
  },
  {
    prefecture: '和歌山県',
    city: '白浜町',
    reason: 'アドベンチャーワールドでパンダと遊び、透明度抜群の白良浜ビーチを満喫。',
  },
  {
    prefecture: '広島県',
    city: '廿日市市',
    reason: '宮島の厳島神社は世界遺産。鹿と一緒に歩き、もみじ饅頭を食べながら歴史探訪。',
  },
  {
    prefecture: '岡山県',
    city: '倉敷市',
    reason: '美観地区の白壁と川下り体験。鷲羽山ハイランドで絶叫アトラクションも楽しめる。',
  },
  {
    prefecture: '香川県',
    city: '善通寺市',
    reason: 'レオマワールドは四国最大の遊園地。うどん作り体験も子供に大人気。',
  },
  {
    prefecture: '愛媛県',
    city: '松山市',
    reason: '道後温泉で家族風呂を楽しみ、松山城からの眺望も格別。みきゃんと記念撮影も。',
  },
  {
    prefecture: '福岡県',
    city: '福岡市',
    reason: 'マリノアシティや海の中道海浜公園。博多ラーメンや屋台グルメも家族で楽しめる。',
  },
  {
    prefecture: '長崎県',
    city: '長崎市',
    reason: 'ハウステンボスで豪華なアトラクション。異国情緒あふれる街並みと歴史も学べる。',
  },
  {
    prefecture: '熊本県',
    city: '熊本市',
    reason: 'くまモンに会いに行こう！熊本城や水前寺公園で歴史と自然を一度に体験。',
  },
  {
    prefecture: '大分県',
    city: '別府市',
    reason: '地獄めぐりで迫力の温泉を見学。家族で入れる温泉施設が充実している温泉天国。',
  },
  {
    prefecture: '宮崎県',
    city: '宮崎市',
    reason: 'フェニックス自然動物園でコアラと記念撮影。青島神社と鬼の洗濯板も見どころ。',
  },
  {
    prefecture: '鹿児島県',
    city: '指宿市',
    reason: '砂蒸し温泉は子供も大喜びの体験。池田湖のイッシー探しも旅の思い出に。',
  },
  {
    prefecture: '沖縄県',
    city: '恩納村',
    reason: '透き通るエメラルドグリーンの海でシュノーケリング。美ら海水族館も近くて最高。',
  },
  {
    prefecture: '沖縄県',
    city: '那覇市',
    reason: '首里城と国際通りで沖縄文化を体感。ブルーシールアイスは子供のお気に入りに。',
  },
  {
    prefecture: '新潟県',
    city: '湯沢町',
    reason: '冬はスキー、夏は高原ハイキング。東京から新幹線で約80分のアクセスも魅力。',
  },
  {
    prefecture: '石川県',
    city: '金沢市',
    reason: '兼六園の美しい庭園と近江町市場の食文化。金沢21世紀美術館も子供に人気。',
  },
  {
    prefecture: '岐阜県',
    city: '白川村',
    reason: '世界遺産・白川郷の合掌造り集落。冬のライトアップは息をのむ絶景です。',
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
          {result ? 'もう一度決める' : '行き先を決める！'}
        </button>

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
    transform: 'scale(0.98)',
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
    animation: 'fadeIn 0.4s ease',
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
    textTransform: 'uppercase',
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
    fontSize: 22,
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
    fontSize: 28,
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
  footer: {
    fontSize: 12,
    color: '#a8a29e',
    margin: 0,
  },
};
