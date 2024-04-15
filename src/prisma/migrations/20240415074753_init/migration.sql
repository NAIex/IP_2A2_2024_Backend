-- CreateTable
CREATE TABLE "cursuri" (
    "id" SMALLINT NOT NULL,
    "titlu_curs" VARCHAR(52) NOT NULL,
    "an" DECIMAL(1,0),
    "semestru" DECIMAL(1,0),
    "credite" DECIMAL(2,0),
    "created_at" TIMESTAMPTZ(6),
    "updated_at" TIMESTAMPTZ(6),

    CONSTRAINT "cursuri_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "didactic" (
    "id" SMALLINT NOT NULL,
    "id_profesor" SMALLINT NOT NULL,
    "id_curs" SMALLINT NOT NULL,
    "created_at" TIMESTAMPTZ(6),
    "updated_at" TIMESTAMPTZ(6),

    CONSTRAINT "didactic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "note" (
    "id" SMALLINT NOT NULL,
    "id_student" SMALLINT NOT NULL,
    "id_curs" SMALLINT NOT NULL,
    "valoare" DECIMAL(2,0),
    "data_notare" DATE,
    "created_at" TIMESTAMPTZ(6),
    "updated_at" TIMESTAMPTZ(6),

    CONSTRAINT "note_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "prieteni" (
    "id" SMALLINT NOT NULL,
    "id_student1" SMALLINT NOT NULL,
    "id_student2" SMALLINT NOT NULL,
    "created_at" TIMESTAMPTZ(6),
    "updated_at" TIMESTAMPTZ(6),

    CONSTRAINT "prieteni_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profesori" (
    "id" SMALLINT NOT NULL,
    "nume" VARCHAR(15) NOT NULL,
    "prenume" VARCHAR(30) NOT NULL,
    "grad_didactic" VARCHAR(20),
    "created_at" TIMESTAMPTZ(6),
    "updated_at" TIMESTAMPTZ(6),

    CONSTRAINT "profesori_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "studenti" (
    "id" SMALLINT NOT NULL,
    "nr_matricol" VARCHAR(6) NOT NULL,
    "nume" VARCHAR(15) NOT NULL,
    "prenume" VARCHAR(30) NOT NULL,
    "an" DECIMAL(1,0),
    "grupa" CHAR(2),
    "bursa" DECIMAL(6,2),
    "data_nastere" DATE,
    "email" VARCHAR(40),
    "created_at" TIMESTAMPTZ(6),
    "updated_at" TIMESTAMPTZ(6),

    CONSTRAINT "studenti_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50),
    "age" INTEGER,
    "email" VARCHAR(100),
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "test" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50),
    "age" INTEGER,
    "email" VARCHAR(100),
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "test_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "no_duplicates" ON "prieteni"("id_student1", "id_student2");

-- AddForeignKey
ALTER TABLE "didactic" ADD CONSTRAINT "fk_didactic_id_curs" FOREIGN KEY ("id_curs") REFERENCES "cursuri"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "didactic" ADD CONSTRAINT "fk_didactic_id_profesor" FOREIGN KEY ("id_profesor") REFERENCES "profesori"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "note" ADD CONSTRAINT "fk_note_id_curs" FOREIGN KEY ("id_curs") REFERENCES "cursuri"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "note" ADD CONSTRAINT "fk_note_id_student" FOREIGN KEY ("id_student") REFERENCES "studenti"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "prieteni" ADD CONSTRAINT "fk_prieteni_id_student1" FOREIGN KEY ("id_student1") REFERENCES "studenti"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "prieteni" ADD CONSTRAINT "fk_prieteni_id_student2" FOREIGN KEY ("id_student2") REFERENCES "studenti"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
