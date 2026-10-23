import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Risco } from '../types/ocorrencia';

type Props = {
  risco: Risco;
  tamanho?: 'pequeno' | 'grande';
};

const CONFIG_RISCO: Record<
  Risco,
  { label: string; bg: string; border: string; text: string; dot: string }
> = {
  baixo: {
    label: 'Baixo',
    bg: '#DCFCE7',
    border: '#86EFAC',
    text: '#166534',
    dot: '#22C55E',
  },
  medio: {
    label: 'Médio',
    bg: '#FEF3C7',
    border: '#FCD34D',
    text: '#92400E',
    dot: '#F59E0B',
  },
  alto: {
    label: 'Alto',
    bg: '#FEE2E2',
    border: '#FCA5A5',
    text: '#991B1B',
    dot: '#EF4444',
  },
};

export function RiscoBadge({ risco, tamanho = 'pequeno' }: Props) {
  const config = CONFIG_RISCO[risco] || CONFIG_RISCO.baixo;
  const isGrande = tamanho === 'grande';

  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: config.bg,
          borderColor: config.border,
          paddingVertical: isGrande ? 6 : 4,
          paddingHorizontal: isGrande ? 12 : 8,
        },
      ]}
    >
      <View
        style={[
          styles.dot,
          {
            backgroundColor: config.dot,
            width: isGrande ? 8 : 6,
            height: isGrande ? 8 : 6,
          },
        ]}
      />
      <Text
        style={[
          styles.texto,
          {
            color: config.text,
            fontSize: isGrande ? 13 : 11,
          },
        ]}
      >
        {isGrande ? `Risco ${config.label}` : config.label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 999,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  dot: {
    borderRadius: 999,
    marginRight: 6,
  },
  texto: {
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
});
