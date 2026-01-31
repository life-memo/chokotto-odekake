// React elementsをグローバルに展開
const { useState } = React;
const { createRoot } = ReactDOM;
const h = React.createElement;

console.log('App.js loaded!');

// シンプルなテストアプリ
function TestApp() {
  return h('div', {
    style: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #FFF5F7 0%, #FFF9E6 50%, #E8F4F8 100%)',
      padding: '2rem',
      fontFamily: "'Nunito', 'Quicksand', sans-serif"
    }
  },
    h('div', {
      style: {
        maxWidth: '900px',
        margin: '0 auto',
        textAlign: 'center'
      }
    },
      h('div', {
        style: {
          background: 'white',
          padding: '2rem',
          borderRadius: '30px',
          boxShadow: '0 10px 40px rgba(255, 182, 193, 0.2)'
        }
      },
        h('h1', {
          style: {
            fontSize: '2rem',
            background: 'linear-gradient(135deg, #FF9AB5 0%, #FFB8D1 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: '800',
            marginBottom: '1rem'
          }
        }, '👶 赤ちゃんとちょっとお出かけプランナー'),
        h('p', {
          style: {
            color: '#8B7B9E',
            fontSize: '1rem',
            marginBottom: '2rem'
          }
        }, '授乳・おむつのタイミングから出発時刻を逆算'),
        h('div', {
          style: {
            background: '#FFE4ED',
            padding: '1.5rem',
            borderRadius: '15px',
            fontSize: '1.2rem',
            color: '#FF9AB5',
            fontWeight: '700'
          }
        }, '🎉 アプリが正常に読み込まれました！'),
        h('p', {
          style: {
            marginTop: '1rem',
            color: '#A8A8B8',
            fontSize: '0.9rem'
          }
        }, '完全版のアプリは現在準備中です...')
      )
    )
  );
}

// アプリをマウント
const root = createRoot(document.getElementById('root'));
root.render(h(TestApp));

console.log('App rendered!');
