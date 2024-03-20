import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Links } from './links.entity';
import { LinksService } from './links.service';
import { LinksController } from './links.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Links])],
    controllers: [LinksController],
    providers: [LinksService],
    exports: [LinksService, TypeOrmModule.forFeature([Links])]
})

export class LinksModule {}