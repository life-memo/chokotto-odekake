const { useState } = React;
const { Clock, Baby, MapPin, AlertCircle, Calendar, Coffee, Edit3 } = lucide;

function BabyOutingPlanner() {
  const [babyHabits, setBabyHabits] = useState({
    feedingInterval: 180, // 3時間
    diaperInterval: 120, // 2時間
    name: ''
  });

  const [outingPlan, setOutingPlan] = useState({
    destination: '', // 目的地名
    arrivalTime: '10:00',
    stayDuration: 120, // 2時間
    travelTime: 30, // 30分
  });

  const [showResults, setShowResults] = useState(false);
  const [activeTab, setActiveTab] = useState('input');
  const [schedule, setSchedule] = useState(null);

  // 時間を分に変換
  const timeToMinutes = (time) => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  };

  // 分を時間に変換
  const minutesToTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
  };

  // スケジュールを計算
  const calculateSchedule = () => {
    const arrivalMinutes = timeToMinutes(outingPlan.arrivalTime);
    const totalPreparationTime = 30; // 準備時間
    
    // 逆算開始
    const departureMinutes = arrivalMinutes - outingPlan.travelTime;
    const lastFeedingTime = departureMinutes - 20; // 出発20分前に授乳
    const lastDiaperTime = departureMinutes - 15; // 出発15分前におむつ
    const preparationStartTime = lastFeedingTime - totalPreparationTime;

    // 帰宅時間の計算
    const returnDepartureMinutes = arrivalMinutes + outingPlan.stayDuration;
    const returnArrivalMinutes = returnDepartureMinutes + outingPlan.travelTime;

    // 外出中のケアタイミング
    const duringStayEvents = [];
    const stayStartMinutes = arrivalMinutes;
    const stayEndMinutes = returnDepartureMinutes;
    
    // 授乳タイミング
    let nextFeeding = lastFeedingTime + babyHabits.feedingInterval;
    while (nextFeeding < stayEndMinutes) {
      if (nextFeeding >= stayStartMinutes && nextFeeding <= stayEndMinutes) {
        duringStayEvents.push({
          time: nextFeeding,
          type: 'feeding',
          label: '授乳タイム'
        });
      }
      nextFeeding += babyHabits.feedingInterval;
    }

    // おむつ交換タイミング
    let nextDiaper = lastDiaperTime + babyHabits.diaperInterval;
    while (nextDiaper < stayEndMinutes) {
      if (nextDiaper >= stayStartMinutes && nextDiaper <= stayEndMinutes) {
        duringStayEvents.push({
          time: nextDiaper,
          type: 'diaper',
          label: 'おむつ交換'
        });
      }
      nextDiaper += babyHabits.diaperInterval;
    }

    duringStayEvents.sort((a, b) => a.time - b.time);

    return {
      preparationStart: minutesToTime(preparationStartTime),
      lastFeeding: minutesToTime(lastFeedingTime),
      lastDiaper: minutesToTime(lastDiaperTime),
      departure: minutesToTime(departureMinutes),
      arrival: outingPlan.arrivalTime,
      returnDeparture: minutesToTime(returnDepartureMinutes),
      returnArrival: minutesToTime(returnArrivalMinutes),
      duringStayEvents
    };
  };

  const handleSubmit = () => {
    const newSchedule = calculateSchedule();
    setSchedule(newSchedule);
    setActiveTab('result');
  };

  // バリデーション: すべての必須項目が入力されているかチェック
  const isFormValid = () => {
    return (
      babyHabits.feedingInterval !== '' && 
      babyHabits.feedingInterval > 0 &&
      babyHabits.diaperInterval !== '' && 
      babyHabits.diaperInterval > 0 &&
      outingPlan.arrivalTime !== '' &&
      outingPlan.stayDuration !== '' && 
      outingPlan.stayDuration > 0 &&
      outingPlan.travelTime !== '' && 
      outingPlan.travelTime > 0
    );
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #FFF5F7 0%, #FFF9E6 50%, #E8F4F8 100%)',
      fontFamily: "'Nunito', 'Quicksand', sans-serif",
      padding: '2rem 1rem'
    }}>
      <div style={{
        maxWidth: '900px',
        margin: '0 auto'
      }}>
        {/* ヘッダー */}
        <div style={{
          textAlign: 'center',
          marginBottom: '3rem',
          animation: 'fadeInDown 0.8s ease-out'
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '1rem',
            background: 'white',
            padding: '1rem 2rem',
            borderRadius: '50px',
            boxShadow: '0 10px 40px rgba(255, 182, 193, 0.2)',
            marginBottom: '1rem'
          }}>
            <Baby size={40} color="#FF9AB5" strokeWidth={2.5} />
            <h1 style={{
              margin: 0,
              fontSize: '2rem',
              background: 'linear-gradient(135deg, #FF9AB5 0%, #FFB8D1 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: '800'
            }}>
              赤ちゃんとちょっとお出かけプランナー
            </h1>
          </div>
          <p style={{
            color: '#8B7B9E',
            fontSize: '1rem',
            margin: 0
          }}>
            授乳・おむつのタイミングから出発時刻を逆算
          </p>
        </div>

        {/* タブ切り替え */}
        <div style={{
          display: 'flex',
          gap: '1rem',
          marginBottom: '2rem',
          justifyContent: 'center'
        }}>
          <button
            onClick={() => setActiveTab('input')}
            style={{
              padding: '0.75rem 2rem',
              border: 'none',
              borderRadius: '25px',
              fontSize: '1rem',
              fontWeight: '700',
              cursor: 'pointer',
              background: activeTab === 'input' 
                ? 'linear-gradient(135deg, #A8D8EA 0%, #B8E6F3 100%)'
                : 'white',
              color: activeTab === 'input' ? 'white' : '#8B7B9E',
              boxShadow: activeTab === 'input' 
                ? '0 5px 20px rgba(168, 216, 234, 0.3)'
                : '0 2px 10px rgba(0, 0, 0, 0.05)',
              transition: 'all 0.3s ease',
              transform: activeTab === 'input' ? 'translateY(-2px)' : 'none'
            }}
          >
            📝 入力・編集
          </button>
          <button
            onClick={() => schedule && setActiveTab('result')}
            disabled={!schedule}
            style={{
              padding: '0.75rem 2rem',
              border: 'none',
              borderRadius: '25px',
              fontSize: '1rem',
              fontWeight: '700',
              cursor: schedule ? 'pointer' : 'not-allowed',
              background: activeTab === 'result' 
                ? 'linear-gradient(135deg, #FFD93D 0%, #FFEB99 100%)'
                : 'white',
              color: activeTab === 'result' ? 'white' : schedule ? '#8B7B9E' : '#D0D0D0',
              boxShadow: activeTab === 'result' 
                ? '0 5px 20px rgba(255, 217, 61, 0.3)'
                : '0 2px 10px rgba(0, 0, 0, 0.05)',
              transition: 'all 0.3s ease',
              transform: activeTab === 'result' ? 'translateY(-2px)' : 'none',
              opacity: schedule ? 1 : 0.5
            }}
          >
            ✨ 作成したプラン
          </button>
        </div>

        {/* 入力フォーム */}
        {activeTab === 'input' && (
          <div style={{
            background: 'white',
            borderRadius: '30px',
            padding: '2.5rem',
            boxShadow: '0 15px 50px rgba(0, 0, 0, 0.08)',
            animation: 'fadeIn 0.5s ease-out'
          }}>
            {/* 赤ちゃんの基本情報 */}
            <h2 style={{
              fontSize: '1.5rem',
              color: '#FF9AB5',
              marginBottom: '2rem',
              fontWeight: '800',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <Baby size={28} />
              赤ちゃんの基本情報
            </h2>

            <div style={{ display: 'grid', gap: '1.5rem' }}>
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  color: '#6B5B7A',
                  fontWeight: '700',
                  fontSize: '0.95rem'
                }}>
                  赤ちゃんの名前（任意）
                </label>
                <input
                  type="text"
                  value={babyHabits.name}
                  onChange={(e) => setBabyHabits({...babyHabits, name: e.target.value})}
                  placeholder="例：はるとくん"
                  style={{
                    width: '100%',
                    padding: '1rem',
                    border: '2px solid #FFE4ED',
                    borderRadius: '15px',
                    fontSize: '1rem',
                    fontFamily: 'inherit',
                    transition: 'all 0.3s ease',
                    outline: 'none'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#FF9AB5'}
                  onBlur={(e) => e.target.style.borderColor = '#FFE4ED'}
                />
              </div>

              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  color: '#6B5B7A',
                  fontWeight: '700',
                  fontSize: '0.95rem'
                }}>
                  🍼 授乳間隔（分）
                </label>
                <input
                  type="number"
                  value={babyHabits.feedingInterval}
                  onChange={(e) => setBabyHabits({...babyHabits, feedingInterval: e.target.value === '' ? '' : Number(e.target.value)})}
                  style={{
                    width: '100%',
                    padding: '1rem',
                    border: '2px solid #FFE4ED',
                    borderRadius: '15px',
                    fontSize: '1rem',
                    fontFamily: 'inherit',
                    transition: 'all 0.3s ease',
                    outline: 'none'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#FF9AB5'}
                  onBlur={(e) => e.target.style.borderColor = '#FFE4ED'}
                />
                <p style={{
                  fontSize: '0.85rem',
                  color: '#A8A8B8',
                  marginTop: '0.5rem'
                }}>
                  目安：新生児 120-180分、3ヶ月以降 180-240分
                </p>
              </div>

              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  color: '#6B5B7A',
                  fontWeight: '700',
                  fontSize: '0.95rem'
                }}>
                  🧷 おむつ交換間隔（分）
                </label>
                <input
                  type="number"
                  value={babyHabits.diaperInterval}
                  onChange={(e) => setBabyHabits({...babyHabits, diaperInterval: e.target.value === '' ? '' : Number(e.target.value)})}
                  style={{
                    width: '100%',
                    padding: '1rem',
                    border: '2px solid #FFE4ED',
                    borderRadius: '15px',
                    fontSize: '1rem',
                    fontFamily: 'inherit',
                    transition: 'all 0.3s ease',
                    outline: 'none'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#FF9AB5'}
                  onBlur={(e) => e.target.style.borderColor = '#FFE4ED'}
                />
                <p style={{
                  fontSize: '0.85rem',
                  color: '#A8A8B8',
                  marginTop: '0.5rem'
                }}>
                  目安：新生児 60-120分、3ヶ月以降 120-180分
                </p>
              </div>
            </div>

            {/* 区切り線 */}
            <div style={{
              margin: '3rem 0',
              height: '2px',
              background: 'linear-gradient(90deg, transparent, #E0E0E0, transparent)'
            }}></div>

            {/* おでかけ計画 */}
            <h2 style={{
              fontSize: '1.5rem',
              color: '#A8D8EA',
              marginBottom: '2rem',
              fontWeight: '800',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <MapPin size={28} />
              おでかけ計画
            </h2>

            <div style={{ display: 'grid', gap: '1.5rem' }}>
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  color: '#6B5B7A',
                  fontWeight: '700',
                  fontSize: '0.95rem'
                }}>
                  📍 目的地の名前（任意）
                </label>
                <input
                  type="text"
                  value={outingPlan.destination}
                  onChange={(e) => setOutingPlan({...outingPlan, destination: e.target.value})}
                  placeholder="例：◯◯公園、イオンモール"
                  style={{
                    width: '100%',
                    padding: '1rem',
                    border: '2px solid #D6EEF7',
                    borderRadius: '15px',
                    fontSize: '1rem',
                    fontFamily: 'inherit',
                    transition: 'all 0.3s ease',
                    outline: 'none'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#A8D8EA'}
                  onBlur={(e) => e.target.style.borderColor = '#D6EEF7'}
                />
              </div>

              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  color: '#6B5B7A',
                  fontWeight: '700',
                  fontSize: '0.95rem'
                }}>
                  🎯 目的地到着時刻
                </label>
                <input
                  type="time"
                  value={outingPlan.arrivalTime}
                  onChange={(e) => setOutingPlan({...outingPlan, arrivalTime: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '1rem',
                    border: '2px solid #D6EEF7',
                    borderRadius: '15px',
                    fontSize: '1rem',
                    fontFamily: 'inherit',
                    transition: 'all 0.3s ease',
                    outline: 'none'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#A8D8EA'}
                  onBlur={(e) => e.target.style.borderColor = '#D6EEF7'}
                />
              </div>

              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  color: '#6B5B7A',
                  fontWeight: '700',
                  fontSize: '0.95rem'
                }}>
                  ⏱️ 目的地での滞在時間（分）
                </label>
                <input
                  type="number"
                  value={outingPlan.stayDuration}
                  onChange={(e) => setOutingPlan({...outingPlan, stayDuration: e.target.value === '' ? '' : Number(e.target.value)})}
                  style={{
                    width: '100%',
                    padding: '1rem',
                    border: '2px solid #D6EEF7',
                    borderRadius: '15px',
                    fontSize: '1rem',
                    fontFamily: 'inherit',
                    transition: 'all 0.3s ease',
                    outline: 'none'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#A8D8EA'}
                  onBlur={(e) => e.target.style.borderColor = '#D6EEF7'}
                />
              </div>

              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  color: '#6B5B7A',
                  fontWeight: '700',
                  fontSize: '0.95rem'
                }}>
                  🚃 移動時間（片道・分）
                </label>
                <input
                  type="number"
                  value={outingPlan.travelTime}
                  onChange={(e) => setOutingPlan({...outingPlan, travelTime: e.target.value === '' ? '' : Number(e.target.value)})}
                  style={{
                    width: '100%',
                    padding: '1rem',
                    border: '2px solid #D6EEF7',
                    borderRadius: '15px',
                    fontSize: '1rem',
                    fontFamily: 'inherit',
                    transition: 'all 0.3s ease',
                    outline: 'none'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#A8D8EA'}
                  onBlur={(e) => e.target.style.borderColor = '#D6EEF7'}
                />
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={!isFormValid()}
              style={{
                marginTop: '2rem',
                width: '100%',
                padding: '1rem',
                border: 'none',
                borderRadius: '15px',
                background: isFormValid() 
                  ? 'linear-gradient(135deg, #A8D8EA 0%, #B8E6F3 100%)'
                  : '#E0E0E0',
                color: 'white',
                fontSize: '1.1rem',
                fontWeight: '700',
                cursor: isFormValid() ? 'pointer' : 'not-allowed',
                boxShadow: isFormValid() 
                  ? '0 5px 20px rgba(168, 216, 234, 0.3)'
                  : 'none',
                transition: 'all 0.3s ease',
                opacity: isFormValid() ? 1 : 0.6
              }}
              onMouseOver={(e) => {
                if (isFormValid()) e.target.style.transform = 'translateY(-3px)';
              }}
              onMouseOut={(e) => {
                if (isFormValid()) e.target.style.transform = 'translateY(0)';
              }}
            >
              スケジュールを計算 ✨
            </button>
            
            {/* 未入力項目の警告 */}
            {!isFormValid() && (
              <div style={{
                marginTop: '1rem',
                padding: '1rem',
                background: '#FFF3CD',
                border: '2px solid #FFE69C',
                borderRadius: '15px',
                color: '#856404',
                fontSize: '0.95rem',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                animation: 'fadeIn 0.3s ease-out'
              }}>
                <AlertCircle size={20} />
                すべての項目を入力してください
              </div>
            )}
          </div>
        )}

        {/* 結果表示 */}
        {activeTab === 'result' && schedule && (
          <div 
            data-capture="schedule"
            style={{
            marginTop: '2rem',
            animation: 'fadeInUp 0.8s ease-out'
          }}>
            {/* 出発時刻カード */}
            <div style={{
              background: 'linear-gradient(135deg, #FFD93D 0%, #FFEB99 100%)',
              borderRadius: '30px',
              padding: '2.5rem',
              boxShadow: '0 15px 50px rgba(255, 217, 61, 0.3)',
              marginBottom: '2rem',
              textAlign: 'center'
            }}>
              {/* 名前と目的地 */}
              {(babyHabits.name || outingPlan.destination) && (
                <div style={{
                  marginBottom: '1.5rem',
                  paddingBottom: '1.5rem',
                  borderBottom: '2px solid rgba(139, 90, 0, 0.2)'
                }}>
                  {babyHabits.name && (
                    <div style={{
                      fontSize: '1.3rem',
                      fontWeight: '800',
                      color: '#8B5A00',
                      marginBottom: '0.5rem'
                    }}>
                      {babyHabits.name}のおでかけ
                    </div>
                  )}
                  {outingPlan.destination && (
                    <div style={{
                      fontSize: '1.1rem',
                      fontWeight: '700',
                      color: '#A0765B',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem'
                    }}>
                      📍 {outingPlan.destination}
                    </div>
                  )}
                </div>
              )}
              
              <Clock size={48} color="#F97316" style={{ marginBottom: '1rem' }} />
              <h2 style={{
                fontSize: '1.2rem',
                color: '#8B5A00',
                marginBottom: '0.5rem',
                fontWeight: '700'
              }}>
                家を出る時刻
              </h2>
              <div style={{
                fontSize: '3.5rem',
                fontWeight: '900',
                color: '#F97316',
                marginBottom: '0.5rem',
                textShadow: '2px 2px 10px rgba(249, 115, 22, 0.2)'
              }}>
                {schedule.departure}
              </div>
              <p style={{
                color: '#A0765B',
                fontSize: '1rem'
              }}>
                準備開始: {schedule.preparationStart}
              </p>
            </div>

            {/* タイムラインカード */}
            <div style={{
              background: 'white',
              borderRadius: '30px',
              padding: '2.5rem',
              boxShadow: '0 15px 50px rgba(0, 0, 0, 0.08)'
            }}>
              <h2 style={{
                fontSize: '1.5rem',
                color: '#FF9AB5',
                marginBottom: '2rem',
                fontWeight: '800',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <Calendar size={28} />
                詳細スケジュール
              </h2>

              {/* 出発前 */}
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{
                  fontSize: '1.2rem',
                  color: '#A8D8EA',
                  marginBottom: '1rem',
                  fontWeight: '700'
                }}>
                  🏠 出発前の準備
                </h3>
                <div style={{ display: 'grid', gap: '1rem' }}>
                  <TimelineItem 
                    time={schedule.preparationStart}
                    icon="📝"
                    label="準備開始"
                    desc="着替え、荷物チェック、おもちゃ準備"
                    color="#FFB347"
                  />
                  <TimelineItem 
                    time={schedule.lastFeeding}
                    icon="🍼"
                    label="出発前の授乳"
                    desc="しっかり飲ませて満足させる"
                    color="#FF9AB5"
                  />
                  <TimelineItem 
                    time={schedule.lastDiaper}
                    icon="👶"
                    label="出発直前のおむつ交換"
                    desc="清潔な状態で出発"
                    color="#A8D8EA"
                  />
                  <TimelineItem 
                    time={schedule.departure}
                    icon="🚪"
                    label="出発！"
                    desc="準備完了、いってらっしゃい"
                    color="#7DD3C0"
                  />
                </div>
              </div>

              {/* 移動中 */}
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{
                  fontSize: '1.2rem',
                  color: '#A8D8EA',
                  marginBottom: '1rem',
                  fontWeight: '700'
                }}>
                  🚃 移動中
                </h3>
                <TimelineItem 
                  time={schedule.arrival}
                  icon="📍"
                  label="目的地到着"
                  desc={`移動時間: ${outingPlan.travelTime}分`}
                  color="#A8D8EA"
                />
              </div>

              {/* 滞在中 */}
              {schedule.duringStayEvents.length > 0 && (
                <div style={{ marginBottom: '2rem' }}>
                  <h3 style={{
                    fontSize: '1.2rem',
                    color: '#A8D8EA',
                    marginBottom: '1rem',
                    fontWeight: '700'
                  }}>
                    ☕ 滞在中のケア
                  </h3>
                  <div style={{ display: 'grid', gap: '1rem' }}>
                    {schedule.duringStayEvents.map((event, idx) => (
                      <TimelineItem 
                        key={idx}
                        time={minutesToTime(event.time)}
                        icon={event.type === 'feeding' ? '🍼' : event.type === 'diaper' ? '👶' : '👶'}
                        label={event.label}
                        desc={event.type === 'feeding' ? '授乳室を探す' : event.type === 'diaper' ? 'おむつ交換台を使用' : '抱っこを休憩、ベビーカーに移動'}
                        color={event.type === 'feeding' ? '#FF9AB5' : event.type === 'diaper' ? '#A8D8EA' : '#FFB347'}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* 帰宅 */}
              <div>
                <h3 style={{
                  fontSize: '1.2rem',
                  color: '#A8D8EA',
                  marginBottom: '1rem',
                  fontWeight: '700'
                }}>
                  🏠 帰宅
                </h3>
                <div style={{ display: 'grid', gap: '1rem' }}>
                  <TimelineItem 
                    time={schedule.returnDeparture}
                    icon="👋"
                    label="目的地を出発"
                    desc="帰宅の準備"
                    color="#B8E6F3"
                  />
                  <TimelineItem 
                    time={schedule.returnArrival}
                    icon="🏡"
                    label="自宅到着予定"
                    desc="お疲れさまでした！"
                    color="#7DD3C0"
                  />
                </div>
              </div>
            </div>

            {/* おむつ枚数の案内 */}
            <div style={{
              background: 'linear-gradient(135deg, #FFE4ED 0%, #FFF0F5 100%)',
              borderRadius: '30px',
              padding: '2rem',
              marginTop: '2rem',
              border: '2px solid #FFB8D1',
              boxShadow: '0 10px 30px rgba(255, 154, 181, 0.15)',
              textAlign: 'center'
            }}>
              <div style={{
                fontSize: '3rem',
                marginBottom: '0.5rem'
              }}>
                🧷
              </div>
              <h3 style={{
                fontSize: '1.1rem',
                color: '#FF9AB5',
                marginBottom: '1rem',
                fontWeight: '700'
              }}>
                おむつの必要枚数
              </h3>
              <div style={{
                fontSize: '2rem',
                fontWeight: '900',
                color: '#FF9AB5',
                marginBottom: '0.5rem'
              }}>
                {(() => {
                  const totalOutingMinutes = (outingPlan.travelTime * 2) + outingPlan.stayDuration;
                  const requiredDiapers = Math.ceil(totalOutingMinutes / babyHabits.diaperInterval);
                  const recommendedDiapers = requiredDiapers + 2;
                  return `${recommendedDiapers}枚`;
                })()}
              </div>
              <p style={{
                color: '#A8A8B8',
                fontSize: '0.95rem',
                margin: 0
              }}>
                {(() => {
                  const totalOutingMinutes = (outingPlan.travelTime * 2) + outingPlan.stayDuration;
                  const requiredDiapers = Math.ceil(totalOutingMinutes / babyHabits.diaperInterval);
                  return `（必要${requiredDiapers}枚 + 予備2枚）`;
                })()}
              </p>
            </div>

            {/* アクションボタン */}
            <div style={{
              display: 'grid',
              gap: '1rem',
              marginTop: '2rem'
            }}>
              {/* 画像として保存 */}
              <button
                onClick={() => {
                  // minutesToTime関数をローカルに定義
                  const formatTime = (minutes) => {
                    const hours = Math.floor(minutes / 60);
                    const mins = minutes % 60;
                    return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
                  };
                  
                  // スクリーンショット風の画像を生成
                  const canvas = document.createElement('canvas');
                  canvas.width = 800;
                  canvas.height = 1400;
                  const ctx = canvas.getContext('2d');
                  
                  // 背景
                  ctx.fillStyle = '#FFFFFF';
                  ctx.fillRect(0, 0, canvas.width, canvas.height);
                  
                  // タイトル
                  ctx.fillStyle = '#FF9AB5';
                  ctx.font = 'bold 36px sans-serif';
                  ctx.textAlign = 'center';
                  ctx.fillText('赤ちゃんとちょっとお出かけプラン', 400, 60);
                  
                  let yPos = 130;
                  
                  // 名前と目的地
                  if (babyHabits.name) {
                    ctx.fillStyle = '#8B5A00';
                    ctx.font = 'bold 28px sans-serif';
                    ctx.fillText(`${babyHabits.name}のおでかけ`, 400, yPos);
                    yPos += 50;
                  }
                  if (outingPlan.destination) {
                    ctx.fillStyle = '#A0765B';
                    ctx.font = 'bold 24px sans-serif';
                    ctx.fillText(`📍 ${outingPlan.destination}`, 400, yPos);
                    yPos += 60;
                  } else {
                    yPos += 20;
                  }
                  
                  // 出発時刻（大きく）
                  ctx.fillStyle = '#FFD93D';
                  ctx.fillRect(50, yPos, 700, 150);
                  ctx.fillStyle = '#F97316';
                  ctx.font = 'bold 60px sans-serif';
                  ctx.fillText(schedule.departure, 400, yPos + 70);
                  ctx.fillStyle = '#8B5A00';
                  ctx.font = '24px sans-serif';
                  ctx.fillText('家を出る時刻', 400, yPos + 110);
                  ctx.font = '18px sans-serif';
                  ctx.fillText(`準備開始: ${schedule.preparationStart}`, 400, yPos + 140);
                  yPos += 180;
                  
                  // スケジュール詳細
                  ctx.fillStyle = '#333333';
                  ctx.font = 'bold 24px sans-serif';
                  ctx.textAlign = 'left';
                  ctx.fillText('📋 スケジュール', 60, yPos);
                  yPos += 40;
                  
                  const scheduleItems = [
                    `${schedule.preparationStart} - 準備開始`,
                    `${schedule.lastFeeding} - 出発前の授乳`,
                    `${schedule.lastDiaper} - おむつ交換`,
                    `${schedule.departure} - 出発！`,
                    `${schedule.arrival} - 目的地到着`,
                  ];
                  
                  // 滞在中のイベント
                  if (schedule.duringStayEvents && schedule.duringStayEvents.length > 0) {
                    schedule.duringStayEvents.forEach(event => {
                      scheduleItems.push(`${formatTime(event.time)} - ${event.label}`);
                    });
                  }
                  
                  scheduleItems.push(`${schedule.returnDeparture} - 帰宅開始`);
                  scheduleItems.push(`${schedule.returnArrival} - 自宅到着`);
                  
                  ctx.font = '20px sans-serif';
                  ctx.fillStyle = '#666666';
                  scheduleItems.forEach((item, idx) => {
                    ctx.fillText(item, 80, yPos + (idx * 35));
                  });
                  yPos += scheduleItems.length * 35 + 40;
                  
                  // おむつ枚数
                  const totalOutingMinutes = (outingPlan.travelTime * 2) + outingPlan.stayDuration;
                  const requiredDiapers = Math.ceil(totalOutingMinutes / babyHabits.diaperInterval);
                  const recommendedDiapers = requiredDiapers + 2;
                  
                  ctx.fillStyle = '#FFE4ED';
                  ctx.fillRect(50, yPos, 700, 80);
                  ctx.fillStyle = '#FF9AB5';
                  ctx.font = 'bold 32px sans-serif';
                  ctx.textAlign = 'center';
                  ctx.fillText(`おむつ ${recommendedDiapers}枚`, 400, yPos + 40);
                  ctx.font = '18px sans-serif';
                  ctx.fillStyle = '#A8A8B8';
                  ctx.fillText(`（必要${requiredDiapers}枚 + 予備2枚）`, 400, yPos + 65);
                  
                  // 画像をダウンロード
                  try {
                    canvas.toBlob((blob) => {
                      if (blob) {
                        const url = URL.createObjectURL(blob);
                        const link = document.createElement('a');
                        const date = new Date();
                        const dateStr = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}`;
                        link.download = `お出かけプラン_${dateStr}.png`;
                        link.href = url;
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                        URL.revokeObjectURL(url);
                      }
                    }, 'image/png');
                  } catch (error) {
                    // フォールバック: dataURLを使用
                    const link = document.createElement('a');
                    const date = new Date();
                    const dateStr = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}`;
                    link.download = `お出かけプラン_${dateStr}.png`;
                    link.href = canvas.toDataURL('image/png');
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }
                }}
                style={{
                  padding: '1rem',
                  border: 'none',
                  borderRadius: '15px',
                  background: 'linear-gradient(135deg, #A8D8EA 0%, #B8E6F3 100%)',
                  color: 'white',
                  fontSize: '1rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                  boxShadow: '0 5px 20px rgba(168, 216, 234, 0.3)',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem'
                }}
                onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
                onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
              >
                📷 画像として保存
              </button>

              {/* LINEで共有 */}
              <button
                onClick={() => {
                  const totalOutingMinutes = (outingPlan.travelTime * 2) + outingPlan.stayDuration;
                  const requiredDiapers = Math.ceil(totalOutingMinutes / babyHabits.diaperInterval);
                  const recommendedDiapers = requiredDiapers + 2;
                  
                  let text = '';
                  
                  // タイトル部分
                  if (outingPlan.destination && babyHabits.name) {
                    text = `${babyHabits.name}と${outingPlan.destination}へのお出かけプラン🍼\n\n`;
                  } else if (outingPlan.destination) {
                    text = `${outingPlan.destination}へのお出かけプラン🍼\n\n`;
                  } else if (babyHabits.name) {
                    text = `${babyHabits.name}とのお出かけプラン🍼\n\n`;
                  } else {
                    text = `赤ちゃんとお出かけプラン🍼\n\n`;
                  }
                  
                  // 主要時刻
                  text += `🏠 ${schedule.preparationStart} - 準備開始\n`;
                  text += `🍼 ${schedule.lastFeeding} - 出発前の授乳\n`;
                  text += `👶 ${schedule.lastDiaper} - おむつ交換\n`;
                  text += `🚪 ${schedule.departure} - 出発！\n`;
                  text += `📍 ${schedule.arrival} - 到着\n`;
                  
                  // 滞在中のケア
                  if (schedule.duringStayEvents.length > 0) {
                    text += `\n☕ 滞在中のケア\n`;
                    schedule.duringStayEvents.forEach(event => {
                      const icon = event.type === 'feeding' ? '🍼' : '👶';
                      text += `${icon} ${minutesToTime(event.time)} - ${event.label}\n`;
                    });
                  }
                  
                  // 帰宅
                  text += `\n👋 ${schedule.returnDeparture} - 帰宅開始\n`;
                  text += `🏡 ${schedule.returnArrival} - 自宅到着予定\n`;
                  
                  // おむつ枚数
                  text += `\n🧷 おむつ ${recommendedDiapers}枚\n`;
                  text += `（必要${requiredDiapers}枚 + 予備2枚）`;
                  
                  const lineUrl = `https://line.me/R/share?text=${encodeURIComponent(text)}`;
                  window.open(lineUrl, '_blank');
                }}
                style={{
                  padding: '1rem',
                  border: 'none',
                  borderRadius: '15px',
                  background: 'linear-gradient(135deg, #06C755 0%, #00B900 100%)',
                  color: 'white',
                  fontSize: '1rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                  boxShadow: '0 5px 20px rgba(6, 199, 85, 0.3)',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem'
                }}
                onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
                onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
              >
                💬 LINEで共有
              </button>

              {/* 編集ボタン */}
              <button
                onClick={() => setActiveTab('input')}
                style={{
                  padding: '1rem',
                  border: '2px solid #E0E0E0',
                  borderRadius: '15px',
                  background: 'white',
                  color: '#8B7B9E',
                  fontSize: '1rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem'
                }}
                onMouseOver={(e) => {
                  e.target.style.borderColor = '#A8D8EA';
                  e.target.style.background = '#F8FCFD';
                }}
                onMouseOut={(e) => {
                  e.target.style.borderColor = '#E0E0E0';
                  e.target.style.background = 'white';
                }}
              >
                <Edit3 size={20} />
                計画を編集する
              </button>
            </div>
          </div>
        )}

        {/* フッター */}
        <div style={{
          textAlign: 'center',
          marginTop: '3rem',
          padding: '2rem',
          color: '#A8A8B8',
          fontSize: '0.9rem'
        }}>
          <p style={{ margin: 0 }}>
            💝 赤ちゃんとの楽しいおでかけを応援しています
          </p>
          <p style={{ margin: '0.5rem 0 0', fontSize: '0.8rem' }}>
            ※このツールは目安です。赤ちゃんの様子を見ながら柔軟に調整してください
          </p>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;700;800;900&family=Quicksand:wght@400;600;700&display=swap');
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        input[type="number"]::-webkit-inner-spin-button,
        input[type="number"]::-webkit-outer-spin-button {
          opacity: 1;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}

function TimelineItem({ time, icon, label, desc, color }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'flex-start',
      gap: '1rem',
      padding: '1.25rem',
      background: `linear-gradient(135deg, ${color}15 0%, ${color}08 100%)`,
      borderRadius: '18px',
      border: `2px solid ${color}40`,
      transition: 'all 0.3s ease'
    }}>
      <div style={{
        fontSize: '2rem',
        minWidth: '50px',
        textAlign: 'center'
      }}>
        {icon}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{
          fontSize: '1.3rem',
          fontWeight: '900',
          color: color,
          marginBottom: '0.25rem'
        }}>
          {time}
        </div>
        <div style={{
          fontSize: '1.05rem',
          fontWeight: '700',
          color: '#6B5B7A',
          marginBottom: '0.25rem'
        }}>
          {label}
        </div>
        <div style={{
          fontSize: '0.9rem',
          color: '#A8A8B8'
        }}>
          {desc}
        </div>
      </div>
    </div>
  );
}
