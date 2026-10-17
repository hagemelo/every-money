import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1792245421031 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "mastra_threads" (
                "id" TEXT NOT NULL,
                "resourceId" TEXT NOT NULL,
                "title" TEXT NOT NULL,
                "metadata" JSONB,
                "createdAt" TIMESTAMP NOT NULL,
                "updatedAt" TIMESTAMP NOT NULL,
                CONSTRAINT "PK_mastra_threads_id" PRIMARY KEY ("id")
            )
        `);

        await queryRunner.query(`
            CREATE TABLE "mastra_messages" (
                "id" TEXT NOT NULL,
                "thread_id" TEXT NOT NULL,
                "content" TEXT NOT NULL,
                "role" TEXT NOT NULL,
                "type" TEXT NOT NULL,
                "createdAt" TIMESTAMP NOT NULL,
                "resourceId" TEXT,
                CONSTRAINT "PK_mastra_messages_id" PRIMARY KEY ("id")
            )
        `);

        await queryRunner.query(`
            CREATE INDEX "mastra_threads_resourceid_createdat_idx"
            ON "mastra_threads" ("resourceId", "createdAt" DESC)
        `);

        await queryRunner.query(`
            CREATE INDEX "mastra_messages_thread_id_createdat_idx"
            ON "mastra_messages" ("thread_id", "createdAt" DESC)
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP INDEX "mastra_messages_thread_id_createdat_idx"
        `);

        await queryRunner.query(`
            DROP INDEX "mastra_threads_resourceid_createdat_idx"
        `);

        await queryRunner.query(`
            DROP TABLE "mastra_messages"
        `);

        await queryRunner.query(`
            DROP TABLE "mastra_threads"
        `);
    }

}
