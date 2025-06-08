import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import * as fs from 'fs';
import * as path from 'path';

export class MainSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const queryRunner = dataSource.createQueryRunner();
    const filePath = path.join(__dirname, 'fixtures', 'seed.sql');
    const sql = fs.readFileSync(filePath, 'utf8');

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const statements = sql
        .split(/;\s*[\r\n]+/)
        .filter((stmt) => stmt.trim().length > 0)
        .filter(
          (stmt) =>
            stmt.trim().length > 0 &&
            !stmt.trim().startsWith('--') &&
            !stmt.trim().startsWith('/*'),
        );

      for (const statement of statements) {
        await queryRunner.query(statement);
      }

      await queryRunner.commitTransaction();
      console.log('✅ SQL seed exécuté avec succès');
    } catch (err) {
      await queryRunner.rollbackTransaction();
      console.error('❌ Erreur lors du seeding SQL:', err);
    } finally {
      await queryRunner.release();
    }
  }
}
