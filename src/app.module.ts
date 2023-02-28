import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JogadoresModule } from './jogadores/jogadores.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://jamesribeiro:mongodb@cluster0.xthh0tg.mongodb.net/smartranking?retryWrites=true&w=majority'), JogadoresModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}