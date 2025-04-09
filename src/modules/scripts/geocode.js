const fetch = require('node-fetch');

/**
 * Recebe a string ou array de coordenadas e retorna o endereço formatado.
 * Lança erro com mensagem apropriada se formato inválido ou falha na API.
 */
async function parseAndReverseGeocode(localizacaoReporteRaw) {
  let localizacaoReporte;

  // Validação e parsing
  try {
    if (typeof localizacaoReporteRaw === 'string') {
      if (localizacaoReporteRaw.includes(',')) {
        localizacaoReporte = localizacaoReporteRaw.split(',').map(coord => parseFloat(coord.trim()));
      } else {
        localizacaoReporte = JSON.parse(localizacaoReporteRaw);
      }
    } else {
      localizacaoReporte = localizacaoReporteRaw;
    }

    if (!Array.isArray(localizacaoReporte) || localizacaoReporte.length !== 2) {
      throw new Error();
    }
  } catch (err) {
    const error = new Error('Formato inválido para localizacaoReporte. Use [lat, long] ou "lat,long"');
    error.code = 400;
    throw error;
  }

  const [latitude, longitude] = localizacaoReporte;

  // Reverse geocoding com timeout
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000); // 5 segundos

    const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'blackbox-app/1.0 (eduwmaldaner@gmail.com)' // coloque seu email real aqui
      },
      signal: controller.signal
    });

    clearTimeout(timeout);

    if (!response.ok) {
      console.error(`Erro da API Nominatim: ${response.status} - ${response.statusText}`);
      throw new Error(`Erro na requisição à API de geocodificação: ${response.statusText}`);
    }

    const data = await response.json();
    const rua = data.address?.road || data.name || 'Endereço desconhecido';
    const cidade = data.address?.city || data.address?.town || data.address?.village || 'Cidade desconhecida';
    const estado = data.address?.state || 'Estado desconhecido';

    return {
      endereco: `${rua}, ${cidade}, ${estado}`,
      latitude,
      longitude
    };
  } catch (err) {
    if (err.name === 'AbortError') {
      console.error('Timeout na requisição de reverse geocoding.');
      throw new Error('Timeout na API de geocodificação');
    }
    console.error('Erro ao fazer reverse geocoding:', err.message, err.stack);
    throw new Error('Falha ao converter coordenadas em endereço');
  }
}

module.exports = {
  parseAndReverseGeocode
};
