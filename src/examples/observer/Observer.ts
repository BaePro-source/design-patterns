// Observer 인터페이스
export interface Observer {
    update(price: number): void;
}

// Subject 인터페이스
export interface Subject {
    register(observer: Observer): void;
    unregister(observer: Observer): void;
    notify(): void;
}

// Concrete Subject (주체)
export class Stock implements Subject {
    private observers: Observer[] = [];
    private price: number = 0;

    register(observer: Observer): void {
        this.observers.push(observer);
        console.log(`✅ 관찰자 등록됨 (총 ${this.observers.length}명)`);
    }

    unregister(observer: Observer): void {
        const index = this.observers.indexOf(observer);
        if (index > -1) {
            this.observers.splice(index, 1);
            console.log(`❌ 관찰자 해제됨 (총 ${this.observers.length}명)`);
        }
    }

    setPrice(newPrice: number): void {
        console.log(`\n💰 주가 변경: ${this.price} → ${newPrice}`);
        this.price = newPrice;
        this.notify(); // 상태 변화 시 자동 알림
    }

    getPrice(): number {
        return this.price;
    }

    notify(): void {
        console.log(`📢 ${this.observers.length}명의 관찰자에게 알림 전송`);
        for (const observer of this.observers) {
            observer.update(this.price);
        }
    }

    getObserverCount(): number {
        return this.observers.length;
    }
}

// Concrete Observers (관찰자들)
export class PriceDisplay implements Observer {
    update(price: number): void {
        console.log(`📺 화면에 표시: 현재 주가 = ${price}원`);
    }
}

export class PriceAlert implements Observer {
    private threshold: number;

    constructor(threshold: number = 100) {
        this.threshold = threshold;
    }

    update(price: number): void {
        if (price > this.threshold) {
            console.log(`🚨 알림: 주가 ${price}원 - 목표가(${this.threshold}원) 초과!`);
        }
    }
}

export class PriceLogger implements Observer {
    private logs: string[] = [];

    update(price: number): void {
        const timestamp = new Date().toLocaleTimeString('ko-KR');
        const log = `📝 로그 기록: [${timestamp}] 주가 = ${price}원`;
        this.logs.push(log);
        console.log(log);
    }

    getLogs(): string[] {
        return this.logs;
    }
}
