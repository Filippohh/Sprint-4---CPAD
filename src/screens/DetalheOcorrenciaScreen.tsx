import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ocorrencia } from '../types/ocorrencia';
import { RiscoBadge } from '../components/RiscoBadge';

type Props = {
  ocorrencia: Ocorrencia;
  onVoltar: () => void;
};

const PROTOCOLO_RISCO = {
  alto: {
    titulo: 'Protocolo de Emergência (Nível Crítico)',
    acao: 'Acionamento imediato da equipe de intervenção operacional de campo. Prioridade máxima na fila de atendimento da Motiva.',
    corFundo: '#FEF2F2',
    corBorda: '#FCA5A5',
    corTexto: '#991B1B',
  },
  medio: {
    titulo: 'Protocolo de Alerta (Atenção Operacional)',
    acao: 'Inspeção técnica presencial programada para as próximas 24 horas. Registro enviado para monitoramento da central.',
    corFundo: '#FFFBEB',
    corBorda: '#FCD34D',
    corTexto: '#92400E',
  },
  baixo: {
    titulo: 'Protocolo Preventivo (Rotina Operacional)',
    acao: 'Inclusão da ocorrência no cronograma de rotina de conservação e manutenção periódica.',
    corFundo: '#F0FDF4',
    corBorda: '#86EFAC',
    corTexto: '#166534',
  },
};

export function DetalheOcorrenciaScreen({ ocorrencia, onVoltar }: Props) {
  const protocolo = PROTOCOLO_RISCO[ocorrencia.risco] || PROTOCOLO_RISCO.baixo;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Botão Voltar */}
      <TouchableOpacity
        style={styles.botaoVoltar}
        onPress={onVoltar}
        activeOpacity={0.7}
      >
        <Text style={styles.botaoVoltarTexto}>← Voltar para lista</Text>
      </TouchableOpacity>

      {/* Cartão Principal */}
      <View style={styles.cardPrincipal}>
        {/* Cabeçalho do Card */}
        <View style={styles.cardHeader}>
          <View>
            <Text style={styles.tagRegistro}>OCORRÊNCIA REGISTRADA</Text>
            <Text style={styles.tituloId}>
              #{String(ocorrencia.id).padStart(3, '0')}
            </Text>
          </View>
          <RiscoBadge risco={ocorrencia.risco} tamanho="grande" />
        </View>

        {/* Linha Divisória */}
        <View style={styles.divisor} />

        {/* Detalhes */}
        <View style={styles.secao}>
          <Text style={styles.secaoTitulo}>DESCRIÇÃO</Text>
          <Text style={styles.secaoTexto}>{ocorrencia.descricao}</Text>
        </View>

        <View style={styles.secao}>
          <Text style={styles.secaoTitulo}>LOCAL DE ATUAÇÃO</Text>
          <View style={styles.rowLocal}>
            <Text style={styles.iconeLocal}>📍</Text>
            <Text style={styles.secaoTextoDestaque}>{ocorrencia.local}</Text>
          </View>
        </View>

        <View style={styles.secao}>
          <Text style={styles.secaoTitulo}>DATA DO REGISTRO</Text>
          <View style={styles.rowLocal}>
            <Text style={styles.iconeLocal}>📅</Text>
            <Text style={styles.secaoTexto}>{ocorrencia.data}</Text>
          </View>
        </View>

        {/* Box de Ação Operacional Recomendada */}
        <View
          style={[
            styles.boxProtocolo,
            {
              backgroundColor: protocolo.corFundo,
              borderColor: protocolo.corBorda,
            },
          ]}
        >
          <Text
            style={[styles.boxProtocoloTitulo, { color: protocolo.corTexto }]}
          >
            {protocolo.titulo}
          </Text>
          <Text
            style={[styles.boxProtocoloAcao, { color: protocolo.corTexto }]}
          >
            {protocolo.acao}
          </Text>
        </View>

        {/* Persistência Confirmada */}
        <View style={styles.boxPersistencia}>
          <Text style={styles.textoPersistencia}>
            💾 Persistido localmente no dispositivo via AsyncStorage (@motiva:ocorrencias_v1)
          </Text>
        </View>
      </View>

      {/* Botão de Rodapé */}
      <TouchableOpacity
        style={styles.botaoRetornar}
        activeOpacity={0.8}
        onPress={onVoltar}
      >
        <Text style={styles.botaoRetornarTexto}>Retornar ao Painel Principal</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  botaoVoltar: {
    marginBottom: 16,
    alignSelf: 'flex-start',
  },
  botaoVoltarTexto: {
    fontSize: 14,
    color: '#0284C7',
    fontWeight: '700',
  },
  cardPrincipal: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tagRegistro: {
    fontSize: 10,
    fontWeight: '800',
    color: '#64748B',
    letterSpacing: 0.8,
  },
  tituloId: {
    fontSize: 26,
    fontWeight: '800',
    color: '#0F172A',
    marginTop: 2,
  },
  divisor: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 18,
  },
  secao: {
    marginBottom: 16,
  },
  secaoTitulo: {
    fontSize: 11,
    fontWeight: '800',
    color: '#94A3B8',
    letterSpacing: 0.6,
    marginBottom: 4,
  },
  secaoTexto: {
    fontSize: 15,
    color: '#1E293B',
    lineHeight: 22,
  },
  rowLocal: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  iconeLocal: {
    fontSize: 14,
    marginRight: 6,
  },
  secaoTextoDestaque: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0F172A',
  },
  boxProtocolo: {
    marginTop: 8,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
  },
  boxProtocoloTitulo: {
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 4,
  },
  boxProtocoloAcao: {
    fontSize: 12,
    lineHeight: 18,
  },
  boxPersistencia: {
    marginTop: 14,
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  textoPersistencia: {
    fontSize: 11,
    color: '#64748B',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  botaoRetornar: {
    marginTop: 20,
    backgroundColor: '#0F172A',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  botaoRetornarTexto: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
});
