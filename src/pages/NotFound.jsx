import { useNavigate } from 'react-router-dom';
import { useCloud } from '../context/CloudContext.jsx';

export default function NotFound() {
  const navigate = useNavigate();
  const { user } = useCloud();

  return (
    <div className="not-found-container" style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '80vh',
      textAlign: 'center',
      padding: '20px'
    }}>
      <div className="not-found-icon" style={{
        fontSize: '6rem',
        marginBottom: '1rem',
        background: 'linear-gradient(135deg, var(--gold-400), var(--gold-600))',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        filter: 'drop-shadow(0 0 10px var(--accent-glow))'
      }}>
        404
      </div>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Halaman Tidak Ditemukan</h1>
      <p style={{ color: 'var(--text-secondary)', maxWidth: '450px', marginBottom: '2.5rem', lineHeight: '1.6' }}>
        Maaf, halaman yang Anda cari tidak ada atau telah berpindah alamat. 
        Jangan khawatir, data Anda tetap aman.
      </p>
      
      <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <button 
          className="btn btn-primary" 
          onClick={() => navigate('/')}
          style={{ padding: '12px 28px' }}
        >
          Kembali ke Beranda
        </button>
        {user && (
          <button 
            className="btn btn-secondary" 
            onClick={() => navigate('/app')}
            style={{ padding: '12px 28px' }}
          >
            Buka Dashboard
          </button>
        )}
      </div>

      <div style={{ marginTop: '4rem', opacity: 0.3 }}>
        <img src="/favicon.svg" alt="Buwuhan Logo" width="48" height="48" />
      </div>
    </div>
  );
}
