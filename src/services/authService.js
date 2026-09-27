// Service d'authentification partagé pour les pages de satisfaction
class AuthService {
  constructor() {
    this.correctPassword = 'ajGXd8MyHTSqi36';
    this.storageKey = 'satisfaction_auth_session';
  }

  // Vérifier si l'utilisateur est authentifié
  isAuthenticated() {
    const session = sessionStorage.getItem(this.storageKey);
    if (!session) return false;
    
    try {
      const { timestamp, authenticated } = JSON.parse(session);
      // Session valide pendant 24 heures
      const sessionDuration = 24 * 60 * 60 * 1000; // 24h en millisecondes
      const isValid = Date.now() - timestamp < sessionDuration;
      
      if (!isValid) {
        this.logout();
        return false;
      }
      
      return authenticated;
    } catch (error) {
      this.logout();
      return false;
    }
  }

  // Authentifier l'utilisateur
  authenticate(password) {
    if (password === this.correctPassword) {
      const session = {
        authenticated: true,
        timestamp: Date.now()
      };
      sessionStorage.setItem(this.storageKey, JSON.stringify(session));
      return true;
    }
    return false;
  }

  // Déconnecter l'utilisateur
  logout() {
    sessionStorage.removeItem(this.storageKey);
  }

  // Écouter les changements d'authentification
  onAuthChange(callback) {
    const handleStorageChange = (e) => {
      if (e.key === this.storageKey) {
        callback(this.isAuthenticated());
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Retourner une fonction de nettoyage
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }
}

// Exporter une instance unique (singleton)
const authService = new AuthService();
export default authService;