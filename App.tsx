import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  Platform,
  StatusBar as RNStatusBar,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ocorrencia } from './src/types/ocorrencia';
import {
  carregarOcorrencias,
  salvarOcorrencia,
} from './src/storage/ocorrenciasStorage';
import {
  ListaOcorrenciasScreen,
  CadastroOcorrenciaScreen,
  DetalheOcorrenciaScreen,
} from './src/screens';

type Tela = 'lista' | 'cadastro' | 'detalhe';

export default function App() {
  const [tela, setTela] = useState<Tela>('lista');
  const [idSelecionado, setIdSelecionado] = useState<number | null>(null);
  const [ocorrencias, setOcorrencias] = useState<Ocorrencia[]>([]);
  const [carregando, setCarregando] = useState<boolean>(true);
  const [atualizando, setAtualizando] = useState<boolean>(false);

  // Inicialização e leitura do AsyncStorage
  useEffect(() => {
    async function inicializar() {
      try {
        const dados = await carregarOcorrencias();
        setOcorrencias(dados);
      } catch (error) {
        console.error('Falha ao carregar ocorrências:', error);
      } finally {
        setCarregando(false);
      }
    }

    inicializar();
  }, []);

  // Recarregar dados manualmente (Pull-to-refresh)
  async function recarregarDados() {
    setAtualizando(true);
    try {
      const dados = await carregarOcorrencias();
      setOcorrencias(dados);
    } catch (error) {
      console.error('Falha ao recarregar:', error);
    } finally {
      setAtualizando(false);
    }
  }

  // Ação de Salvar Ocorrência (Persiste no AsyncStorage e atualiza estado)
  async function handleSalvar(nova: Omit<Ocorrencia, 'id'>) {
    const listaAtualizada = await salvarOcorrencia(nova, ocorrencias);
    setOcorrencias(listaAtualizada);
    setTela('lista');
  }

  // Navegar para detalhes
  function handleVerDetalhe(id: number) {
    setIdSelecionado(id);
    setTela('detalhe');
  }

  // Conteúdo da tela de acordo com o estado condicional
  function renderConteudo() {
    if (carregando) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0284C7" />
          <Text style={styles.loadingTexto}>
            Carregando ocorrências da Motiva...
          </Text>
        </View>
      );
    }

    if (tela === 'cadastro') {
      return (
        <CadastroOcorrenciaScreen
          onSalvar={handleSalvar}
          onCancelar={() => setTela('lista')}
        />
      );
    }

    if (tela === 'detalhe' && idSelecionado !== null) {
      const ocorrenciaEncontrada = ocorrencias.find(
        (o) => o.id === idSelecionado
      );

      if (ocorrenciaEncontrada) {
        return (
          <DetalheOcorrenciaScreen
            ocorrencia={ocorrenciaEncontrada}
            onVoltar={() => {
              setIdSelecionado(null);
              setTela('lista');
            }}
          />
        );
      }
    }

    return (
      <ListaOcorrenciasScreen
        ocorrencias={ocorrencias}
        onVerDetalhe={handleVerDetalhe}
        onNovaOcorrencia={() => setTela('cadastro')}
        onAtualizar={recarregarDados}
        atualizando={atualizando}
      />
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" backgroundColor="#0F172A" />
      <View style={styles.container}>{renderConteudo()}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0F172A',
    paddingTop: Platform.OS === 'android' ? RNStatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8FAFC',
    padding: 20,
  },
  loadingTexto: {
    marginTop: 12,
    fontSize: 14,
    color: '#64748B',
    fontWeight: '600',
  },
});
