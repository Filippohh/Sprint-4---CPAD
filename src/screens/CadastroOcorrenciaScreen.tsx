import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ocorrencia, Risco } from '../types/ocorrencia';

type Props = {
  onSalvar: (nova: Omit<Ocorrencia, 'id'>) => Promise<void>;
  onCancelar: () => void;
};

export function CadastroOcorrenciaScreen({ onSalvar, onCancelar }: Props) {
  const [descricao, setDescricao] = useState('');
  const [local, setLocal] = useState('');
  const [risco, setRisco] = useState<Risco>('medio');
  const [erro, setErro] = useState('');
  const [salvando, setSalvando] = useState(false);

  async function handleSalvar() {
    if (!descricao.trim()) {
      setErro('Informe uma descrição clara para a ocorrência.');
      return;
    }

    if (!local.trim()) {
      setErro('Informe o local da ocorrência (pátio, setor ou km rodoviário).');
      return;
    }

    setErro('');
    setSalvando(true);

    try {
      const dataAtual = new Date().toISOString().slice(0, 10);
      await onSalvar({
        descricao: descricao.trim(),
        local: local.trim(),
        risco,
        data: dataAtual,
      });
    } catch (e) {
      setErro('Não foi possível salvar a ocorrência. Tente novamente.');
      setSalvando(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.keyboardContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.container}>
        {/* Topo / Voltar */}
        <TouchableOpacity
          style={styles.botaoVoltar}
          onPress={onCancelar}
          activeOpacity={0.7}
        >
          <Text style={styles.botaoVoltarTexto}>← Voltar para lista</Text>
        </TouchableOpacity>

        <Text style={styles.titulo}>Nova Ocorrência</Text>
        <Text style={styles.subtitulo}>
          Cadastre incidentes operacionais, riscos em pátios ou vias sob concessão da Motiva.
        </Text>

        <View style={styles.cardForm}>
          {/* Campo Descrição */}
          <View style={styles.campoGrupo}>
            <Text style={styles.label}>
              Descrição da Ocorrência <Text style={styles.obrigatorio}>*</Text>
            </Text>
            <TextInput
              style={[styles.input, styles.inputMultiline]}
              value={descricao}
              onChangeText={(txt) => {
                setDescricao(txt);
                if (erro) setErro('');
              }}
              placeholder="Ex: Obstrução parcial da pista por galhos caídos no acostamento"
              placeholderTextColor="#94A3B8"
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>

          {/* Campo Local */}
          <View style={styles.campoGrupo}>
            <Text style={styles.label}>
              Localização <Text style={styles.obrigatorio}>*</Text>
            </Text>
            <TextInput
              style={styles.input}
              value={local}
              onChangeText={(txt) => {
                setLocal(txt);
                if (erro) setErro('');
              }}
              placeholder="Ex: Rodovia SP-070 KM 52 ou Pátio Motiva Leste"
              placeholderTextColor="#94A3B8"
            />
          </View>

          {/* Seletor de Risco */}
          <View style={styles.campoGrupo}>
            <Text style={styles.label}>Classificação de Risco Operacional</Text>
            <View style={styles.riscoContainer}>
              {/* Baixo */}
              <TouchableOpacity
                style={[
                  styles.riscoBotao,
                  styles.riscoBaixo,
                  risco === 'baixo' && styles.riscoAtivoBaixo,
                ]}
                activeOpacity={0.8}
                onPress={() => setRisco('baixo')}
              >
                <View
                  style={[
                    styles.riscoRadio,
                    risco === 'baixo' && styles.riscoRadioAtivoBaixo,
                  ]}
                />
                <Text
                  style={[
                    styles.riscoTexto,
                    risco === 'baixo' && styles.riscoTextoAtivoBaixo,
                  ]}
                >
                  Baixo
                </Text>
              </TouchableOpacity>

              {/* Médio */}
              <TouchableOpacity
                style={[
                  styles.riscoBotao,
                  styles.riscoMedio,
                  risco === 'medio' && styles.riscoAtivoMedio,
                ]}
                activeOpacity={0.8}
                onPress={() => setRisco('medio')}
              >
                <View
                  style={[
                    styles.riscoRadio,
                    risco === 'medio' && styles.riscoRadioAtivoMedio,
                  ]}
                />
                <Text
                  style={[
                    styles.riscoTexto,
                    risco === 'medio' && styles.riscoTextoAtivoMedio,
                  ]}
                >
                  Médio
                </Text>
              </TouchableOpacity>

              {/* Alto */}
              <TouchableOpacity
                style={[
                  styles.riscoBotao,
                  styles.riscoAlto,
                  risco === 'alto' && styles.riscoAtivoAlto,
                ]}
                activeOpacity={0.8}
                onPress={() => setRisco('alto')}
              >
                <View
                  style={[
                    styles.riscoRadio,
                    risco === 'alto' && styles.riscoRadioAtivoAlto,
                  ]}
                />
                <Text
                  style={[
                    styles.riscoTexto,
                    risco === 'alto' && styles.riscoTextoAtivoAlto,
                  ]}
                >
                  Alto
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Mensagem de Erro */}
          {Boolean(erro) && (
            <View style={styles.erroBox}>
              <Text style={styles.erroTexto}>⚠️ {erro}</Text>
            </View>
          )}

          {/* Botões de Ação */}
          <View style={styles.acoesContainer}>
            <TouchableOpacity
              style={[styles.botaoSalvar, salvando && styles.botaoDesabilitado]}
              activeOpacity={0.8}
              onPress={handleSalvar}
              disabled={salvando}
            >
              <Text style={styles.botaoSalvarTexto}>
                {salvando ? 'Salvando no AsyncStorage...' : 'Salvar Ocorrência'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.botaoCancelar}
              activeOpacity={0.7}
              onPress={onCancelar}
              disabled={salvando}
            >
              <Text style={styles.botaoCancelarTexto}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  container: {
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
  titulo: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 4,
  },
  subtitulo: {
    fontSize: 13,
    color: '#64748B',
    lineHeight: 18,
    marginBottom: 20,
  },
  cardForm: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  campoGrupo: {
    marginBottom: 18,
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    color: '#334155',
    marginBottom: 6,
  },
  obrigatorio: {
    color: '#EF4444',
  },
  input: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 14,
    color: '#0F172A',
  },
  inputMultiline: {
    minHeight: 90,
  },
  riscoContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  riscoBotao: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1.5,
  },
  riscoRadio: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 6,
    borderWidth: 1.5,
    borderColor: '#94A3B8',
  },
  riscoTexto: {
    fontSize: 13,
    fontWeight: '700',
  },
  riscoBaixo: {
    backgroundColor: '#F0FDF4',
    borderColor: '#BBF7D0',
  },
  riscoAtivoBaixo: {
    backgroundColor: '#DCFCE7',
    borderColor: '#16A34A',
  },
  riscoRadioAtivoBaixo: {
    borderColor: '#16A34A',
    backgroundColor: '#16A34A',
  },
  riscoTextoAtivoBaixo: {
    color: '#15803D',
  },
  riscoMedio: {
    backgroundColor: '#FFFBEB',
    borderColor: '#FDE68A',
  },
  riscoAtivoMedio: {
    backgroundColor: '#FEF3C7',
    borderColor: '#D97706',
  },
  riscoRadioAtivoMedio: {
    borderColor: '#D97706',
    backgroundColor: '#D97706',
  },
  riscoTextoAtivoMedio: {
    color: '#B45309',
  },
  riscoAlto: {
    backgroundColor: '#FEF2F2',
    borderColor: '#FECACA',
  },
  riscoAtivoAlto: {
    backgroundColor: '#FEE2E2',
    borderColor: '#DC2626',
  },
  riscoRadioAtivoAlto: {
    borderColor: '#DC2626',
    backgroundColor: '#DC2626',
  },
  riscoTextoAtivoAlto: {
    color: '#B91C1C',
  },
  erroBox: {
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#F87171',
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
  },
  erroTexto: {
    color: '#991B1B',
    fontSize: 13,
    fontWeight: '600',
  },
  acoesContainer: {
    marginTop: 8,
    gap: 10,
  },
  botaoSalvar: {
    backgroundColor: '#0F172A',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  botaoDesabilitado: {
    opacity: 0.6,
  },
  botaoSalvarTexto: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  botaoCancelar: {
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  botaoCancelarTexto: {
    color: '#64748B',
    fontSize: 14,
    fontWeight: '600',
  },
});
