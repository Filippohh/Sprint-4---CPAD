export type Risco = 'baixo' | 'medio' | 'alto';

export type Ocorrencia = {
  id: number;
  descricao: string;
  local: string;
  risco: Risco;
  data: string; // Formato ISO AAAA-MM-DD
};
