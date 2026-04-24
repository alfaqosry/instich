"use client";
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import '../../../public/asset/asset/login.css';

// Import loginAction yang sudah kita bahas sebelumnya
import { loginAction } from '@/lib/actions/auth';

export default function LoginPage() {
  const router = useRouter();
  
  // 1. Ganti 'email' menjadi 'identifier'
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const [isLoading, setIsLoading] = useState(false);
  const [errorAlert, setErrorAlert] = useState('');
  const [identifierError, setIdentifierError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorAlert('');
    setIdentifierError('');
    setPasswordError('');

    let valid = true;

    // 2. Validasi identifier (tidak harus format email lagi)
    if (!identifier) {
      setIdentifierError('Username atau Email tidak boleh kosong.');
      valid = false;
    }

    if (!password || password.length < 6) {
      setPasswordError(!password ? 'Kata sandi tidak boleh kosong.' : 'Kata sandi minimal 6 karakter.');
      valid = false;
    }

    if (!valid) return;

    setIsLoading(true);

    // 3. Panggil Server Action 'loginAction' yang asli
    // Jangan pakai setTimeout simulasi lagi, langsung tembak ke backend!
    try {
      const result = await loginAction({
        identifier: identifier,
        password: password
      });

      if (result?.error) {
        setErrorAlert(result.error);
        setIsLoading(false);
        setPassword('');
      }
      // Jika berhasil, redirect diatur otomatis oleh loginAction (redirectTo: "/dashboard")
    } catch (err) {
      setIsLoading(false);
      setErrorAlert("Terjadi kesalahan koneksi.");
    }
  };

  return (
    <div className="login-page">
      <div className="panel-left">
        <div className="left-dots"></div>
        <div className="left-brand">
          <div className="left-logo">T</div>
          <div className="left-brand-text">
            <strong>TPI Jurnal</strong>
            <small>Digital Repository</small>
          </div>
        </div>

        <div className="left-content">
          <h2 className="left-tagline">Portal Admin<br />Jurnal <em>Ilmiah Indonesia.</em></h2>
          <p className="left-desc">Kelola submission, pantau proses review, dan publikasikan karya ilmiah terbaik bangsa.</p>
          <div className="left-features">
            <div className="feature-pill"><i className="fas fa-shield-halved"></i><span>Akses terproteksi</span></div>
            <div className="feature-pill"><i className="fas fa-chart-line"></i><span>Statistik real-time</span></div>
          </div>
        </div>

        <div className="left-stats">
          <div><span className="left-stat-num">12+</span><span className="left-stat-lbl">Jurnal</span></div>
          <div><span className="left-stat-num">500+</span><span className="left-stat-lbl">Artikel</span></div>
        </div>
      </div>

      <div className="panel-right">
        <div className={`form-card ${errorAlert ? 'shake-animation' : ''}`}>
          <Link href="/" className="back-link">
            <i className="fas fa-arrow-left"></i> Kembali ke Situs
          </Link>

          <div className="form-header">
            <div className="form-eyebrow"><i className="fas fa-lock"></i> Admin Panel</div>
            <h1 className="form-title">Selamat Datang</h1>
            <p className="form-subtitle">Gunakan Username atau Alamat Email Anda.</p>
          </div>

          {errorAlert && (
            <div className="alert-error show">
              <i className="fas fa-circle-exclamation"></i>
              <span>{errorAlert}</span>
            </div>
          )}

          <form className="form-body" onSubmit={handleSubmit} noValidate>
            {/* Input Identifier (Username/Email) */}
            <div className="field">
              <label className="field-label">Username / Email <span>*</span></label>
              <div className="input-wrap">
                <input
                  type="text"
                  className={`field-input ${identifierError ? 'error' : ''}`}
                  placeholder="Masukkan username atau email"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                />
                <i className="fas fa-user input-icon"></i>
              </div>
              {identifierError && (
                <div className="field-error show">
                  <i className="fas fa-circle-exclamation"></i>
                  <span>{identifierError}</span>
                </div>
              )}
            </div>

            <div className="field">
              <label className="field-label">Kata Sandi <span>*</span></label>
              <div className="input-wrap">
                <input
                  type={showPassword ? "text" : "password"}
                  className={`field-input ${passwordError ? 'error' : ''}`}
                  placeholder="Masukkan kata sandi"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <i className="fas fa-lock input-icon"></i>
                <button
                  type="button"
                  className="pw-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                </button>
              </div>
              {passwordError && (
                <div className="field-error show">
                  <i className="fas fa-circle-exclamation"></i>
                  <span>{passwordError}</span>
                </div>
              )}
            </div>

            <button type="submit" className={`btn-login ${isLoading ? 'loading' : ''}`} disabled={isLoading}>
              <div className="btn-spinner"></div>
              <span className="btn-text">
                <i className="fas fa-arrow-right-to-bracket"></i> {isLoading ? 'Memproses...' : 'Masuk ke Panel'}
              </span>
            </button>

            <div className="form-divider"><span>atau</span></div>
            <p className="form-footer">Belum punya akun? <a href="#">Hubungi administrator</a></p>
          </form>
        </div>
      </div>

      <style jsx>{`
        .shake-animation { animation: shake 0.4s ease; }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-8px); }
          40% { transform: translateX(8px); }
        }
      `}</style>
    </div>
  );
}