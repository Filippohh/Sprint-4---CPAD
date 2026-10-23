import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ocorrencia } from '../types/ocorrencia';
import { ocorrenciasIniciais } from '../data/ocorrenciasIniciais';

const STORAGE_KEY = '@motiva:ocorrencias_v1';

/**
 * Carrega a lista de ocorrências salvas no dispositivo.
 * Caso não haja nada salvo (primeiro acesso), inicializa o armazenamento
 * com os dados mock iniciais e os retorna.
 */
export async function carregarOcorrencias(): Promise<Ocorrencia[]> {
  try {
    const jsonArmazenado = await AsyncStorage.getItem(STORAGE_KEY);
    if (jsonArmazenado) {
      const parsed = JSON.parse(jsonArmazenado);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
    // Inicialização com dados iniciais
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(ocorrenciasIniciais));
    return ocorrenciasIniciais;
  } catch (error) {
    console.error('Erro ao ler ocorrências do AsyncStorage:', error);
    return ocorrenciasIniciais;
  }
}

/**
 * Salva uma nova ocorrência no AsyncStorage e devolve a lista atualizada.
 * A nova ocorrência é adicionada ao início da lista (ordem decrescente de criação).
 */
export async function salvarOcorrencia(
  nova: Omit<Ocorrencia, 'id'>,
  ocorrenciasAtuais: Ocorrencia[]
): Promise<Ocorrencia[]> {
  try {
    const proximoId =
      ocorrenciasAtuais.length > 0
        ? Math.max(...ocorrenciasAtuais.map((o) => o.id)) + 1
        : 1;

    const novaOcorrencia: Ocorrencia = {
      id: proximoId,
      ...nova,
    };

    const listaAtualizada = [novaOcorrencia, ...ocorrenciasAtuais];
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(listaAtualizada));
    return listaAtualizada;
  } catch (error) {
    console.error('Erro ao salvar nova ocorrência no AsyncStorage:', error);
    throw error;
  }
}

/**
 * Restaura o armazenamento com os dados iniciais do projeto.
 */
export async function redefinirOcorrencias(): Promise<Ocorrencia[]> {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(ocorrenciasIniciais));
    return ocorrenciasIniciais;
  } catch (error) {
    console.error('Erro ao resetar AsyncStorage:', error);
    return ocorrenciasIniciais;
  }
}
