import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ocorrencia } from '../types/ocorrencia';
import { RiscoBadge } from './RiscoBadge';

type Props = {
  ocorrencia: Ocorrencia;
  onPress: (id: number) => void;
};

export function OcorrenciaCard({ ocorrencia, onPress }: Props) {
  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.7}
      onPress={() => onPress(ocorrencia.id)}
    >
      <View style={styles.topRow}>
        <Text style={styles.idTag}>#{String(ocorrencia.id).padStart(3, '0')}</Text>
        <RiscoBadge risco={ocorrencia.risco} />
      </View>

      <Text style={styles.descricao} numberOfLines={2}>
        {ocorrencia.descricao}
      </Text>

      <View style={styles.footerRow}>
        <View style={styles.metaItem}>
          <Text style={styles.metaIcon}>📍</Text>
          <Text style={styles.metaText} numberOfLines={1}>
            {ocorrencia.local}
          </Text>
        </View>

        <View style={styles.metaItem}>
          <Text style={styles.metaIcon}>📅</Text>
          <Text style={styles.metaText}>{ocorrencia.data}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  idTag: {
    fontSize: 12,
    fontWeight: '700',
    color: '#64748B',
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  descricao: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1E293B',
    lineHeight: 22,
    marginBottom: 12,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingTop: 10,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: '55%',
  },
  metaIcon: {
    fontSize: 12,
    marginRight: 4,
  },
  metaText: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
});
