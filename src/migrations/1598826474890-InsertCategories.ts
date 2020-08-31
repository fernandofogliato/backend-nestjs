import {MigrationInterface, QueryRunner} from "typeorm";

export class InsertCategories1598826474890 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`INSERT INTO category (name) VALUES
            ("Category 1"), ("Category 2"), ("Category 3"), ("Category 4"),
            ("Category 5"), ("Category 6"), ("Category 7"), ("Category 8"),
            ("Category 9"), ("Category 10")`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query('DELETE FROM category');
    }

}
