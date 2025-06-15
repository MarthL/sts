import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import * as fs from 'fs';
import * as path from 'path';

export class MainSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const queryRunner = dataSource.createQueryRunner();

    const sqlFiles = ['citys.sql', 'clients.sql'];
    const tablesToTruncate = ['clients', 'citys'];

    await queryRunner.connect();
    await queryRunner.startTransaction();

    // 🔥 Make all tables empty
    for (const table of tablesToTruncate) {
      console.log(`🧹 Cleaning table : ${table}`);
      await queryRunner.query(`DELETE FROM \`${table}\`;`);
    }

    try {
      for (const fileName of sqlFiles) {
        const filePath = path.join(__dirname, 'fixtures', fileName);
        console.log(`📄 Lecture du fichier : ${fileName}`);
        const sql = fs.readFileSync(filePath, 'utf8');

        const statements = sql
          .split(/;\s*[\r\n]+/)
          .map((stmt) => stmt.trim())
          .filter(
            (stmt) =>
              stmt.length > 0 &&
              !stmt.startsWith('--') &&
              !stmt.startsWith('/*'),
          );

        for (const [index, statement] of statements.entries()) {
          try {
            console.log(
              `➡️  [${fileName} - stmt ${
                index + 1
              }] Exécution : ${statement.slice(0, 80)}...`,
            );
            await queryRunner.query(statement);
          } catch (stmtErr) {
            console.error(
              `❌ Erreur dans ${fileName}, requête ${index + 1} :`,
              stmtErr,
            );
            throw stmtErr;
          }
        }
      }

      await queryRunner.commitTransaction();
      console.log('✅ Tous les seeds SQL ont été exécutés avec succès');
    } catch (err) {
      await queryRunner.rollbackTransaction();
      console.error('❌ Erreur globale lors du seeding SQL:', err);
    } finally {
      await queryRunner.release();
    }
  }
}
