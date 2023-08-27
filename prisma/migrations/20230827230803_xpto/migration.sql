-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('PROFESSIONAL', 'PACIENT');

-- CreateEnum
CREATE TYPE "BreathingType" AS ENUM ('DIAFRAGMATICO', 'COSTAL', 'MISTO');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "type" "UserType" NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Evolution" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "pacientId" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "text" TEXT NOT NULL,
    "pictures" TEXT[] DEFAULT ARRAY[]::TEXT[],

    CONSTRAINT "Evolution_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pacient" (
    "id" SERIAL NOT NULL,
    "doctorId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Pacient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Report" (
    "id" SERIAL NOT NULL,
    "pacientId" INTEGER NOT NULL,
    "doctorId" INTEGER NOT NULL,

    CONSTRAINT "Report_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PacientData" (
    "id" SERIAL NOT NULL,
    "reportId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "sex" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "maritalStatus" TEXT NOT NULL,
    "weight" TEXT NOT NULL,
    "height" TEXT NOT NULL,
    "educationDegree" TEXT NOT NULL,
    "profession" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "cellphone" TEXT NOT NULL,
    "consultationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "consultatedBy" TEXT NOT NULL,
    "reasonForConsultation" TEXT NOT NULL,
    "followUp" TEXT NOT NULL,

    CONSTRAINT "PacientData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClinicalData" (
    "id" SERIAL NOT NULL,
    "reportId" INTEGER NOT NULL,
    "qp" TEXT NOT NULL,
    "hda" TEXT NOT NULL,
    "hpp" TEXT NOT NULL,
    "familyHistory" TEXT NOT NULL,
    "hasAllergy" BOOLEAN NOT NULL,
    "hasDiabetes" BOOLEAN NOT NULL,
    "hasHas" BOOLEAN NOT NULL,
    "hasPneumonia" BOOLEAN NOT NULL,
    "isCardiopath" BOOLEAN NOT NULL,
    "isObese" BOOLEAN NOT NULL,
    "isSmoker" BOOLEAN NOT NULL,
    "painType" TEXT NOT NULL,
    "medication" TEXT NOT NULL,

    CONSTRAINT "ClinicalData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClinicalPhysicalExamData" (
    "id" SERIAL NOT NULL,
    "reportId" INTEGER NOT NULL,
    "fr" TEXT NOT NULL,
    "fc" TEXT NOT NULL,
    "articulationAmplitude" TEXT NOT NULL,
    "goniometry" TEXT NOT NULL,
    "muscleStrength" TEXT NOT NULL,
    "instrospection" TEXT NOT NULL,
    "marchType" TEXT NOT NULL,
    "pa" TEXT NOT NULL,
    "palpation" TEXT NOT NULL,
    "periometry" TEXT NOT NULL,
    "complementaryExams" TEXT NOT NULL,

    CONSTRAINT "ClinicalPhysicalExamData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AvaliationData" (
    "id" SERIAL NOT NULL,
    "reportId" INTEGER NOT NULL,
    "breathingType" "BreathingType" NOT NULL,
    "characteristics" TEXT NOT NULL,
    "cognitiveDeficit" BOOLEAN NOT NULL,
    "fracture" BOOLEAN NOT NULL,
    "fractureLocation" TEXT NOT NULL,
    "limitation" TEXT NOT NULL,
    "otherObservations" TEXT,
    "painCharacteristics" TEXT NOT NULL,
    "painDuration" TEXT NOT NULL,
    "painHappens" BOOLEAN NOT NULL,
    "painIntensity" TEXT NOT NULL,
    "painLocation" TEXT NOT NULL,
    "spasm" BOOLEAN NOT NULL,
    "spasmLocation" TEXT NOT NULL,
    "visualDeficit" BOOLEAN NOT NULL,
    "auditoryDeficit" BOOLEAN NOT NULL,

    CONSTRAINT "AvaliationData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TreatmentData" (
    "id" SERIAL NOT NULL,
    "reportId" INTEGER NOT NULL,
    "fisioterapeuticDiagnosis" TEXT NOT NULL,
    "fisioterapeuticTreatment" TEXT NOT NULL,
    "observations" TEXT NOT NULL,

    CONSTRAINT "TreatmentData_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "PacientData_reportId_key" ON "PacientData"("reportId");

-- CreateIndex
CREATE UNIQUE INDEX "ClinicalData_reportId_key" ON "ClinicalData"("reportId");

-- CreateIndex
CREATE UNIQUE INDEX "ClinicalPhysicalExamData_reportId_key" ON "ClinicalPhysicalExamData"("reportId");

-- CreateIndex
CREATE UNIQUE INDEX "AvaliationData_reportId_key" ON "AvaliationData"("reportId");

-- CreateIndex
CREATE UNIQUE INDEX "TreatmentData_reportId_key" ON "TreatmentData"("reportId");

-- AddForeignKey
ALTER TABLE "Evolution" ADD CONSTRAINT "Evolution_pacientId_fkey" FOREIGN KEY ("pacientId") REFERENCES "Pacient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pacient" ADD CONSTRAINT "Pacient_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_pacientId_fkey" FOREIGN KEY ("pacientId") REFERENCES "Pacient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PacientData" ADD CONSTRAINT "PacientData_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "Report"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClinicalData" ADD CONSTRAINT "ClinicalData_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "Report"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClinicalPhysicalExamData" ADD CONSTRAINT "ClinicalPhysicalExamData_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "Report"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AvaliationData" ADD CONSTRAINT "AvaliationData_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "Report"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TreatmentData" ADD CONSTRAINT "TreatmentData_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "Report"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
