import * as React from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { LoginModal } from "@/features/auth/components/LoginModal";
import { RegisterModal } from "@/features/auth/components/RegisterModal";
import { useAuthModal } from "@/features/auth/hooks/useAuthModal";

// ErrorBoundary toàn trang để không bao giờ trắng màn hình
class GlobalErrorBoundary extends React.Component<
  { children?: React.ReactNode },
  { hasError: boolean; error?: any }
> {
  state = { hasError: false, error: undefined as any };

  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }
  componentDidCatch(error: any, info: any) {
    console.error("[Global UI Error]", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#F5F5FA]">
          <Header />
          <main className="max-w-[1392px] mx-auto px-6 py-8">
            <div className="rounded-[8px] border border-[#EBEBF0] bg-white p-6">
              <div className="text-red-600 font-semibold mb-2">Có lỗi giao diện</div>
              <div className="text-sm text-gray-600">
                Mở Console để xem lỗi chi tiết. Trang đã hiển thị fallback để tránh trắng màn hình.
              </div>
            </div>
          </main>
          <Footer />
        </div>
      );
    }
    return this.props.children ?? null;
  }
}

export function MainLayout({ children }: { children?: React.ReactNode }) {
  const { 
    isLoginModalOpen, 
    isRegisterModalOpen, 
    openLoginModal, 
    openRegisterModal, 
    closeModals 
  } = useAuthModal();

  return (
    <div className="min-h-screen bg-[#F5F5FA]">
      <Header onLoginClick={openLoginModal} />
      <GlobalErrorBoundary>
        <main>{children}</main>
      </GlobalErrorBoundary>
      <Footer />
      
      {/* Login Modal */}
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={closeModals} 
        onSwitchToRegister={openRegisterModal}
      />
      
      {/* Register Modal */}
      <RegisterModal 
        isOpen={isRegisterModalOpen} 
        onClose={closeModals} 
        onSwitchToLogin={openLoginModal}
      />
    </div>
  );
}
