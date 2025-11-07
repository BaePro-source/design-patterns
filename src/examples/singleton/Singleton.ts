// 싱글톤 클래스 정의 (Eager Initialization)
export class Singleton {
    // 클래스가 로드될 때 단 한 번 인스턴스 생성
    private static readonly instance: Singleton = new Singleton();

    // 외부에서 new Singleton()을 못 하도록 private 생성자
    private constructor() {}

    // 전역적으로 인스턴스를 반환하는 정적 메서드
    public static getInstance(): Singleton {
        return Singleton.instance;
    }

    // 테스트용 메서드
    public sayHello(): string {
        return "안녕하세요! 저는 싱글톤 인스턴스입니다 👋";
    }
}
