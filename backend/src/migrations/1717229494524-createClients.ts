import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateClients1717229494524 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.connection
      .createQueryBuilder()
      .insert()
      .into('clients')
      .values([
        {
          name: 'Club Félin du Maroc',
          email: 'contact@clubfelindumaroc.com',
          siret: '',
          adress: 'Rue 1, N° 1, Rabat',
          phone: '+212681171486',
        },
      ])
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
