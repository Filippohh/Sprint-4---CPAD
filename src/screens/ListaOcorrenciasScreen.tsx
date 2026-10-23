import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { Ocorrencia } from '../types/ocorrencia';
import { OcorrenciaCard } from '../components/OcorrenciaCard';

type Props = {
  ocorrencias: Ocorrencia[];
  onVerDetalhe: (id: number) => void;
  onNovaOcorrencia: () => void;
  onAtualizar: () => void;
  atualizando: boolean;
};

export function ListaOcorrenciasScreen({
  ocorrencias,
  onVerDetalhe,
  onNovaOcorrencia,
  onAtualizar,
  atualizando,
}: Props) {
  const contadores = {
    total: ocorrencias.length,
    alto: ocorrencias.filter((o) => o.risco === 'alto').length,
    medio: ocorrencias.filter((o) => o.risco === 'medio').length,
    baixo: ocorrencias.filter((o) => o.risco === 'baixo').length,
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.subtitulo}>SISTEMA DE MONITORAMENTO MOTIVA</Text>
          <Text style={styles.titulo}>Ocorrências em Pátios e Rodovias</Text>
        </View>
        <TouchableOpacity
          style={styles.botaoNova}
          activeOpacity={0.8}
          onPress={onNovaOcorrencia}
        >
          <Text style={styles.botaoNovaTexto}>+ Nova</Text>
        </TouchableOpacity>
      </View>

      {/* Estatísticas Rápidas */}
      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statValor}>{contadores.total}</Text>
          <Text style={styles.statRotulo}>Total</Text>
        </View>

        <View style={[styles.statBox, styles.statBoxAlto]}>
          <Text style={[styles.statValor, styles.statTextoAlto]}>
            {contadores.alto}
          </Text>
          <Text style={styles.statRotulo}>Alto</Text>
        </View>

        <View style={[styles.statBox, styles.statBoxMedio]}>
          <Text style={[styles.statValor, styles.statTextoMedio]}>
            {contadores.medio}
          </Text>
          <Text style={styles.statRotulo}>Médio</Text>
        </View>

        <View style={[styles.statBox, styles.statBoxBaixo]}>
          <Text style={[styles.statValor, styles.statTextoBaixo]}>
            {contadores.baixo}
          </Text>
          <Text style={styles.statRotulo}>Baixo</Text>
        </View>
      </View>

      {/* Lista de Ocorrências */}
      <FlatList
        data={ocorrencias}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <OcorrenciaCard ocorrencia={item} onPress={onVerDetalhe} />
        )}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl refreshing={atualizando} onRefresh={onAtualizar} />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>📋</Text>
            <Text style={styles.emptyTitulo}>Nenhuma ocorrência registrada</Text>
            <Text style={styles.emptySubtitulo}>
              Toque no botão "+ Nova" acima para cadastrar a primeira ocorrência.
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 16,
    backgroundColor: '#0F172A',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subtitulo: {
    fontSize: 10,
    color: '#38BDF8',
    fontWeight: '800',
    letterSpacing: 1,
  },
  titulo: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginTop: 2,
  },
  botaoNova: {
    backgroundColor: '#059669',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
    shadowColor: '#059669',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  botaoNovaTexto: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    gap: 8,
  },
  statBox: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statBoxAlto: {
    backgroundColor: '#FEE2E2',
  },
  statBoxMedio: {
    backgroundColor: '#FEF3C7',
  },
  statBoxBaixo: {
    backgroundColor: '#DCFCE7',
  },
  statValor: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1E293B',
  },
  statTextoAlto: {
    color: '#991B1B',
  },
  statTextoMedio: {
    color: '#92400E',
  },
  statTextoBaixo: {
    color: '#166534',
  },
  statRotulo: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '600',
    marginTop: 2,
  },
  listContent: {
    padding: 16,
    paddingBottom: 32,
  },
  emptyContainer: {
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderStyle: 'dashed',
  },
  emptyIcon: {
    fontSize: 40,
    marginBottom: 12,
  },
  emptyTitulo: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 6,
  },
  emptySubtitulo: {
    fontSize: 13,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 18,
  },
});
