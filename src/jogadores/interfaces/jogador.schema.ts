import * as mongoose from 'mongoose';

export const JogadorSchema = new mongoose.Schema(
  {
    celular: { type: String, unique: true },
    email: { type: String, unique: true },
    nome: String,
    ranking: String,
    posicao: Number,
    urlFoto: String,
  },
  { timestamps: true, collection: 'jogadores' },
);