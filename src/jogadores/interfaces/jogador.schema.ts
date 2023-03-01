import * as mongoose from 'mongoose';

export const JogadorSchema = new mongoose.Schema(
  {
    celular: String,
    email: { type: String, unique: true },
    nome: String,
    ranking: String,
    posicao: Number,
    urlFoto: String,
  },
  { timestamps: true, collection: 'jogadores' },
);
