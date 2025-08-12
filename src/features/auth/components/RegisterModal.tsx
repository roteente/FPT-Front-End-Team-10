import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { RegisterFormContainer } from '../containers/RegisterForm.container'

export interface RegisterModalProps {
  isOpen: boolean
  onClose: () => void
  onSwitchToLogin?: () => void
}

export function RegisterModal({ isOpen, onClose, onSwitchToLogin }: RegisterModalProps) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white shadow-xl transition-all">
                <div className="flex">
                  {/* Left side - Register Form */}
                  <div className="flex-1 px-8 py-8">
                    {/* Close button */}
                    <div className="flex justify-end mb-4">
                      <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        <XMarkIcon className="h-6 w-6" />
                      </button>
                    </div>

                    <div className="max-w-sm mx-auto">
                      <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">
                          Tạo tài khoản mới
                        </h2>
                        <p className="text-sm text-gray-600">
                          Tham gia cùng Tiki để khám phá thế giới mua sắm
                        </p>
                      </div>

                      <RegisterFormContainer onSuccess={onClose} />

                      <div className="text-center mt-6">
                        <p className="text-sm text-gray-600">
                          Đã có tài khoản?{' '}
                          <button 
                            onClick={() => {
                              if (onSwitchToLogin) {
                                onSwitchToLogin()
                              } else {
                                onClose()
                              }
                            }}
                            className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
                          >
                            Đăng nhập ngay
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Right side - Illustration */}
                  <div className="hidden md:block flex-1 bg-gradient-to-br from-green-50 to-blue-100 relative">
                    <div className="absolute inset-0 flex items-center justify-center p-8">
                      <div className="text-center">
                        {/* Logo Image */}
                        <div className="mb-8 flex justify-center">
                          <img 
                            src="/logo_login.svg" 
                            alt="Tiki Register" 
                            className="w-48 h-48 object-contain"
                          />
                        </div>
                        
                        {/* Text */}
                        <div className="space-y-4">
                          <h3 className="text-2xl font-bold text-green-600">
                            Chào mừng đến với Tiki
                          </h3>
                          <p className="text-green-500 max-w-sm mx-auto leading-relaxed">
                            Khám phá hàng triệu sản phẩm chất lượng
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
