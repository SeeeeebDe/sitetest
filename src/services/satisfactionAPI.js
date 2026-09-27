// Service pour gérer les appels API de satisfaction
class SatisfactionAPI {
  constructor() {
    // URL de base de l'API - à adapter selon votre domaine
    this.baseURL = window.location.origin + '/api/satisfaction.php';
  }

  // Soumettre une nouvelle réponse
  async submitResponse(surveyData) {
    try {
      const response = await fetch(this.baseURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(surveyData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erreur lors de l\'envoi');
      }

      return data;
    } catch (error) {
      console.error('Erreur API submitResponse:', error);
      throw error;
    }
  }

  // Récupérer toutes les réponses (nécessite authentification)
  async getResponses(password) {
    try {
      const url = new URL(this.baseURL);
      url.searchParams.append('password', password);

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erreur lors de la récupération');
      }

      return data;
    } catch (error) {
      console.error('Erreur API getResponses:', error);
      throw error;
    }
  }

  // Supprimer des réponses (nécessite authentification)
  async deleteResponses(ids, password) {
    try {
      const url = new URL(this.baseURL);
      url.searchParams.append('password', password);

      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ids })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erreur lors de la suppression');
      }

      return data;
    } catch (error) {
      console.error('Erreur API deleteResponses:', error);
      throw error;
    }
  }

  // Vérifier si l'utilisateur peut soumettre (limite quotidienne)
  async canSubmitToday() {
    try {
      const url = new URL(this.baseURL);
      url.searchParams.append('action', 'check_limit');

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erreur lors de la vérification');
      }

      return data.canSubmit;
    } catch (error) {
      console.error('Erreur lors de la vérification:', error);
      // En cas d'erreur, on autorise par défaut
      return true;
    }
  }
}

// Créer une instance unique
const satisfactionAPI = new SatisfactionAPI();

export default satisfactionAPI;