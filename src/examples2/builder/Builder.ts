/* eslint-disable @typescript-eslint/no-unused-vars */

// 완성된 제품
export interface Computer {
    cpu: string
    ram: string
    ssd: string
    gpu: string
    motherboard: string
    powerSupply: string
}

// Builder 인터페이스
export interface IComputerBuilder {
    setCPU(cpu: string): this
    setRAM(ram: string): this
    setSSD(ssd: string): this
    setGPU(gpu: string): this
    setMotherboard(motherboard: string): this
    setPowerSupply(powerSupply: string): this
    build(): Computer
    reset(): void
}

// Concrete Builder
export class ComputerBuilder implements IComputerBuilder {
    private computer: Computer = {
        cpu: '기본 CPU',
        ram: '기본 RAM',
        ssd: '기본 SSD',
        gpu: '기본 GPU',
        motherboard: '기본 마더보드',
        powerSupply: '기본 파워'
    }

    setCPU(cpu: string): this {
        this.computer.cpu = cpu
        return this
    }

    setRAM(ram: string): this {
        this.computer.ram = ram
        return this
    }

    setSSD(ssd: string): this {
        this.computer.ssd = ssd
        return this
    }

    setGPU(gpu: string): this {
        this.computer.gpu = gpu
        return this
    }

    setMotherboard(motherboard: string): this {
        this.computer.motherboard = motherboard
        return this
    }

    setPowerSupply(powerSupply: string): this {
        this.computer.powerSupply = powerSupply
        return this
    }

    build(): Computer {
        return this.computer
    }

    reset(): void {
        this.computer = {
            cpu: '기본 CPU',
            ram: '기본 RAM',
            ssd: '기본 SSD',
            gpu: '기본 GPU',
            motherboard: '기본 마더보드',
            powerSupply: '기본 파워'
        }
    }
}

// Director (여러 빌더를 활용한 미리 정의된 조합)
export class ComputerDirector {
    private builder: IComputerBuilder

    constructor(builder: IComputerBuilder) {
        this.builder = builder
    }

    // 게이밍 PC 빌드
    buildGamingPC(): Computer {
        this.builder.reset()
        return this.builder
            .setCPU('Intel i9-13900K')
            .setRAM('DDR5 64GB')
            .setSSD('NVMe 1TB')
            .setGPU('RTX 4090')
            .setMotherboard('ASUS ROG')
            .setPowerSupply('1000W Gold')
            .build()
    }

    // 오피스 PC 빌드
    buildOfficePC(): Computer {
        this.builder.reset()
        return this.builder
            .setCPU('Intel i5-13400')
            .setRAM('DDR4 16GB')
            .setSSD('SATA 512GB')
            .setGPU('Integrated Graphics')
            .setMotherboard('ASUS Prime')
            .setPowerSupply('400W Bronze')
            .build()
    }

    // 작업용 PC 빌드
    buildWorkstationPC(): Computer {
        this.builder.reset()
        return this.builder
            .setCPU('AMD Ryzen 9 7950X')
            .setRAM('DDR5 128GB')
            .setSSD('NVMe 2TB')
            .setGPU('RTX 6000 Ada')
            .setMotherboard('ASUS ProArt')
            .setPowerSupply('1600W Platinum')
            .build()
    }
}
