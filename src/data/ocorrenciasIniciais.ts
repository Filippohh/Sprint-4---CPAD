import { Ocorrencia } from '../types/ocorrencia';

export const ocorrenciasIniciais: Ocorrencia[] = [
  {
    id: 1,
    descricao: 'Vegetação densa cobrindo placa de sinalização de limite no acostamento',
    local: 'Rodovia CCR SP-330 - KM 48 Sul',
    risco: 'alto',
    data: '2026-10-20',
  },
  {
    id: 2,
    descricao: 'Moto apreendida com vazamento de fluido identificada no setor de triagem',
    local: 'Pátio Central Motiva - Setor B',
    risco: 'medio',
    data: '2026-10-21',
  },
  {
    id: 3,
    descricao: 'Desgaste moderado na pintura de demarcação de vagas e rotas de inspeção',
    local: 'Pátio Operacional - Vaga 14',
    risco: 'baixo',
    data: '2026-10-22',
  },
];
