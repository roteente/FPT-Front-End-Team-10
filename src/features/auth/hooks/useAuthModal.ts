import { useState } from 'react'

export function useAuthModal() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false)

  const openLoginModal = () => {
    setIsLoginModalOpen(true)
    setIsRegisterModalOpen(false)
  }

  const openRegisterModal = () => {
    setIsRegisterModalOpen(true)
    setIsLoginModalOpen(false)
  }

  const closeModals = () => {
    setIsLoginModalOpen(false)
    setIsRegisterModalOpen(false)
  }

  return {
    isLoginModalOpen,
    isRegisterModalOpen,
    openLoginModal,
    openRegisterModal,
    closeModals,
  }
}
