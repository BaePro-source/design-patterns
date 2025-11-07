// 1. Product 인터페이스 (버튼의 공통 인터페이스)
export interface Button {
    render(): string
    onClick(): string
}

// 2. 구체적인 Product 클래스들
export class WindowsButton implements Button {
    render(): string {
        return "🪟 윈도우 스타일 버튼 렌더링"
    }
    onClick(): string {
        return "🖱️ 윈도우 버튼 클릭 이벤트 처리"
    }
}

export class MacButton implements Button {
    render(): string {
        return "🍎 맥 스타일 버튼 렌더링"
    }
    onClick(): string {
        return "🖱️ 맥 버튼 클릭 이벤트 처리"
    }
}

export class LinuxButton implements Button {
    render(): string {
        return "🐧 리눅스 스타일 버튼 렌더링"
    }
    onClick(): string {
        return "🖱️ 리눅스 버튼 클릭 이벤트 처리"
    }
}

// 3. Creator 추상 클래스 (팩토리 메서드 정의)
export abstract class Dialog {
    // 팩토리 메서드 (하위 클래스가 구현)
    abstract createButton(): Button

    // 비즈니스 로직 (공통 로직)
    renderDialog(): { render: string; click: string } {
        const button = this.createButton()
        return {
            render: button.render(),
            click: button.onClick()
        }
    }
}

// 4. 구체적인 Creator 클래스들
export class WindowsDialog extends Dialog {
    createButton(): Button {
        return new WindowsButton()
    }
}

export class MacDialog extends Dialog {
    createButton(): Button {
        return new MacButton()
    }
}

export class LinuxDialog extends Dialog {
    createButton(): Button {
        return new LinuxButton()
    }
}

// 5. 클라이언트 코드 (헬퍼 함수)
export function createDialog(osType: string): Dialog {
    switch (osType) {
        case "Windows":
            return new WindowsDialog()
        case "Mac":
            return new MacDialog()
        case "Linux":
            return new LinuxDialog()
        default:
            return new WindowsDialog()
    }
}