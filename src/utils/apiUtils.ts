// Simple API integration for recommendations
export const fetchRecommendations = async (userData: {
  name: string;
  education: string;
  location: string;
  skills: string[];
  sectors: string[];
}) => {
  try {
    // Transform form data to API format
    const apiData = {
      skills: userData.skills.join(', '),
      education: userData.education,
      interests: userData.sectors.join(', '),
      location: userData.location,
    };

    const response = await fetch('http://localhost:8000/recommend', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(apiData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.status !== 'success') {
      throw new Error(`API error: ${data.message || 'Unknown error'}`);
    }

    return data.recommendations;
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    throw error;
  }
};

// Helper functions
export const getRelevanceColor = (relevance: string): string => {
  switch (relevance.toLowerCase()) {
    case 'high':
      return 'bg-green-100 text-green-700';
    case 'medium':
      return 'bg-blue-100 text-blue-700';
    case 'low':
      return 'bg-amber-100 text-amber-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};

export const getMatchPercentage = (score: number): number => {
  return Math.round(score * 100);
};